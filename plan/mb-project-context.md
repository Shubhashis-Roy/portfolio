# Medici Biologicals — full project context primer

> Paste this whole file into a fresh Claude Code / CLI session (or point it at this path)
> when the agent needs the complete picture of the product, the stack and every vendor
> integration. `CLAUDE.md` at the repo root is the *enforced rules* file; this file is the
> *map*. Where they disagree, CLAUDE.md wins.
>
> Generated 2026-11-24 by walking the codebase. Source of truth stays
> `packages/db/src/schema.ts`, `packages/env/src/server.ts`, `apps/api/src/routes/**`, `docs/`.

---

## 1. What the product is

A **peptide-therapy telehealth platform** (brand: Medici Peptides / Medici Biologicals),
plus a **clinic side** (Medici Health) that shares the same backend.

Member journey:

1. Phone-OTP sign-up → onboarding (profile + 3 consent flags). **No payment.**
2. **AI intake consult** with "Dr Gabi" → AI drafts a treatment plan. **Free.**
3. **Member proposal** — a priced pre-basket. The member reads the clinical case, sees
   per-therapy prices and an *estimated* total, may remove lines, adds a shipping address,
   then submits it for physician review. **Free.**
4. **Physician review** in the admin portal → approve / reject / revise / refresh.
5. **Approval + checkout are one screen** — the only real total in the journey:
   treatments + consultation fee + shipping + tax.
6. Order goes to the pharmacy (Pharmetika) or ships on our own UPS account; reconciled by
   webhooks + cron.
7. Scheduled **protocol check-ins** with Dr Gabi during the protocol; renewal/reorder/reintake
   flows at the end of it.
8. A separate free-form **Dr Gabi chat** and a **physician ↔ patient message thread** run alongside.

**Approve-then-pay, and money moves ONCE.** Everything up to and including the physician's
review is free. The member is charged a single time, after approval, for the consultation
fee + peptides + shipping + tax.

**Membership is retired, not deleted.** The `hide_subscription` config row (default true)
hides every member-facing subscription surface and makes `requireActiveSubscription` a no-op.
Legacy subscribers keep billing, keep reconciling, and keep a **consultation-fee waiver**.
Flip the config row to restore the paywall with no deploy (`apps/api/src/lib/subscription-flag.ts`).

**Where prices appear.** Proposal = *estimate* (floor + `+`; shipping/tax read `TBC`).
Physician-review screen = no prices at all. Post-approval checkout = the only **total due**.

**Standalone product.** Shares only a Supabase project (DB + storage + BAA) with "Dr Gabi BE" —
no shared code, runtime calls or JWT secrets.

---

## 2. Monorepo layout

```
apps/
  api/        Hono on Bun — the backend, /v1/*            (bun --hot src/index.ts)
  web/        Next.js 16 PWA — member app + marketing     (:3001)
  admin/      Next.js 16 — doctor / admin / clinic portal (:3002)
  products/   Next.js 16 — peptide marketing pages        (:3003)
packages/
  db/              Drizzle schema + 131 SQL migrations (public schema) + seeds
  types/           Zod schemas + TS types per domain — the wire-shape contract
  env/             Zod-validated env (/server and /web entry points)
  ui/              ShadCN + Base UI + Tailwind v4 components/hooks
  clients/         Vendor SDK adapters: netvalve, pharmetika, taxcloud, ups, elation,
                   openai, bedrock, google, posthog
  notifications/   Customer.io provider + semantic event catalog
  analytics/       PostHog event taxonomy + React provider (web + products)
  observability/   Sentry client/server wrappers for the Next apps
  auth/            Shared auth helpers (React Query peer dep)
  api-client/      Typed API client
  config/          Shared tsconfig/eslint, security headers, storage assets
docs/              plan.md, prd.md, tech-stack.md, plans/ (38 numbered plans),
                   backlog/, implementation-notes/, BACKEND-PLAYBOOK.md
```

Package manager **Bun 1.2.22**, monorepo **Turborepo 2.9**, deploy **Vercel** (all four apps).

Current versions: api 0.89.x · web 0.53.x · admin 0.44.x · products 0.5.x.

---

## 3. Tech stack (locked)

| Layer | Choice |
|---|---|
| Runtime / API | Bun · Hono 4.13 + hono-openapi + @scalar/hono-api-reference |
| Frontend | Next.js 16.4 App Router (CSR-first) · React 19.2 · React Query · Nuqs · React Hook Form + Zod · Framer Motion · Streamdown (markdown streaming) |
| Styling / UI | Tailwind v4 · ShadCN + Base UI (`packages/ui`) · Recharts / d3 (admin analytics) |
| ORM / DB | Drizzle 0.45 (`schemaFilter: ["public"]`) · Supabase Postgres (HIPAA BAA) |
| Auth | Supabase Auth (phone OTP via Twilio), cookie sessions `mb_access` / `mb_refresh` |
| AI | Vercel AI SDK 6 (`ai`, `@ai-sdk/openai`, `@ai-sdk/amazon-bedrock`) + raw `openai` SDK for Conversations |
| Payments | Netvalve (hosted payment page: one-time + recurring + refunds) |
| Pharmacy | Pharmetika partner API (order submit + webhooks) |
| Own shipping | UPS (Ship + Rating + Tracking + Declared-Value insurance) |
| Tax | TaxCloud (calculate / createOrder / returnOrder) |
| EHR sync | Elation (daily tagged-patient export) |
| Notifications | Customer.io (events + audiences) · AWS SES over SMTP |
| Product analytics | PostHog (browser + node, plus HogQL queries read by admin analytics) |
| Address lookup | Google Places |
| Rate limiting | hono-rate-limiter + Upstash Redis |
| Observability | OpenTelemetry → Better Stack (traces + log drain), evlog wide events, pino shim, Sentry (web/admin), Braintrust (AI eval logging) |
| Docs/UI for API | `GET /api/openapi.json`, `GET /api/docs` (Scalar) |

---

## 4. The four apps

### apps/api — Hono on Bun, every route under `/v1/*`
Middleware order (outermost first, `src/index.ts`): security headers → CORS → OTEL HTTP
instrumentation → log-drain flush → evlog wide event → request context (request_id, trace ids,
user_id) → global rate limit → body limits → `onError` envelope. Served via `Bun.serve` with
`idleTimeout: 240` because the internal plan-backfill endpoint holds a response open for a
full Bedrock call.

### apps/web — member PWA + marketing (`:3001`)
- Marketing group: `/`, `/treatments/[slug]`, `/instructions`, `/privacy`, `/terms`, `/shipping`.
- Campaign/landing: `/learn/[campaign]`, `/cid/[slug]`, `/skin-care/copper-peptides`,
  `/start-age`, `/start-looks`, `/start-recover`, `/start-weightloss`.
- **B5 sign-up stream** (`/start/*`): `page` → `account` → `verify` → `details` → `care` →
  `gabi` (Dr Gabi picks + shipping address + Submit) → `payment` (+ `success` / `cancel`) →
  `orders/[id]`; plus `waitlist` and `unavailable` (state not served).
- Member app (`/app/*`): `plan`, `plan/[peptideId]` (+ `/review`, `/checkout`, `/chat`),
  `assessment`, `chat`, `orders`, `records`, `reorder`, `account`, `billing`, `settings`, `support`.
- Edge middleware only resolves the cookie-consent jurisdiction (`x-vercel-ip-country`) and
  writes a readable cookie; it deliberately does NOT do auth, to keep pages static.
- Consent via `@c15t/nextjs`; analytics via PostHog + Customer.io CDP + Meta Pixel.

### apps/admin — clinical + ops portal (`:3002`)
`/treatment-plans` (+ `/[id]` review screen), `/intakes` (+ `/[id]`), `/stuck-intakes`,
`/member-adjusted-plans`, `/treatment-plan-jobs`, `/plan-backfill`, `/orders`, `/refunds`,
`/discounts`, `/users`, `/referrals`, `/referral-sales`, `/analytics`,
`/chat-reviews/ask-dr-gabi`, `/rx-pad` (clinic prescription pad), `/sign-in`, `/verify-otp`.

### apps/products — peptide marketing site (`:3003`)
Static pathway pages (`/endure`, `/mend`, `/pulse`, `/rest`, `/[slug]`) whose CTA funnels into
the main app intake. Shares the `@medici-biologicals/analytics` taxonomy with `platform: "products"`.

---

## 5. Data model (`public` schema, Drizzle)

Identity = Supabase Auth (`auth.users`). `users_meta.userId` is MB-owned; durable identity is
the phone number. No FK to `auth.users`; a BEFORE DELETE trigger guards MB data. Money is always
`*_cents` integers. Timestamps are `timestamptz`. Enums are native Postgres enums (documented
exception: `subscriptions.cancellation_survey_reason` is `text`, validated by Zod, because the
option list is product copy).

**Identity & CRM** — `users_meta` (phone, email, name, dob, gender, height/weight, `role`,
`userType`, `status`, `consentedAt`, `referrerId`, `deletedAt`), `addresses` (immutable book —
never DELETE a row in use), `referrers` (admin-created influencer/partner codes),
`elation_patient_registry` (daily Elation dump + create/link/park decision), `user_events`
(append-only audit/analytics ledger), `config` (runtime key→JSON config / feature flags).

**Consult & AI** — `peptides` (one consult/protocol; `summary` = clinical intake record,
`status`, `intakeTriageOutcome`, `sessionType`, `conversationContextId`, `clinicalOverride`,
`overrideSourcePeptideId`), `peptide_messages`, `medical_records` (uploads + extraction state),
`chat_conversations` / `chat_messages` (Dr Gabi free chat, 1 per user), `chat_reviews`
(physician sign-off on Ask-Dr-Gabi transcripts), `protocol_checkins` / `checkin_messages`,
`support_conversations` / `support_messages` (physician ↔ patient thread, kind `physician`).

**Plans** — `treatment_plans` (`planJson`, prompt/version stamps, `reorderOffsetDays`,
`protocolDurationDays`, purchased-plan columns, `status`), `treatment_plan_jobs` (durable
generation queue, PK = peptideId), `user_peptides` (plan line items: dosage, quantity,
instructions, `source`, `reviewStatus`), `doctor_reviews` (append-only decisions),
`peptide_items` (catalog: sku, name, type, `unitPriceCents`, `costPriceCents`, `active`,
`instructions` text[] synced from the Pharmetika formulary).

**Commerce** — `orders` (userId, treatmentPlanId, addressId, `providerOrderId`, `status`,
`consultationFeeCents`, `freeConsultation`, `totalCents`, `shippingRoute`, `referrerId`, refs),
`order_items` (the frozen purchased stack), `order_events` / `netvalve_events` /
`pharmetika_events` / `ups_events` (append-only vendor audit logs), `order_errors`
(typed failure ledger with source/reason/type enums), `ups_shipments` (one per order — the
duplicate-label guard — plus insurance + charge columns), `discount_rules` /
`discount_redemptions`, `peptide_state_shipping` (per-US-state price, telehealth eligibility,
`primary_pharmacy_shippable`), `protocol_reorder_reminders`.

**Subscriptions (legacy, retired)** — `subscriptions`, `subscription_intents`,
`subscription_events`, `subscription_periods` (period ledger).

### Key enums
- `user_role`: `user, doctor, admin, operator, quality_control, data_analyst, clinic`
- `user_type`: `mp_user, mh_user, mp_mh_user` · `user_status`: `active, pending, joined_waitlist`
- `peptide_status`: `in_progress, pending_member_review, pending_doctor_review, approved, rejected, revised, closed, deleted`
- `treatment_plan_status`: `pending_member_review, pending_review, approved, rejected, revised, superseded, closed, deleted`
- `treatment_plan_job_status`: `queued, processing, completed, failed, canceled`
- `intake_triage_outcome`, `intake_session_type` (`initial | reorder | supplementary` …)
- `protocol_checkin_status`: `in_progress, completed` · outcome: `COMPLETE, ESCALATE, RED`
- `medical_record_status`: `pending_upload … processed, failed`
- `order_status`: `pending_payment, paid, payment_failed, submitted_to_pharmacy, pharmacy_accepted, shipped, delivered, refunded, canceled`
- `order_shipping_route`: `pharmetika, ups` · `ups_shipment_status`: `creating, created, needs_review, voided, failed`
- `ups_event_outcome` / `pharmetika_delivery_outcome`: `processed, orphan, unmappable, stale_duplicate, route_ignored, apply_failed`
- `subscription_status`: `active, paused, inactive, payment_pending, payment_failed, canceled`

### State machines
```
Peptide:        in_progress → pending_member_review → pending_doctor_review
                → approved | rejected | revised → closed ; any → deleted
Treatment plan: pending_member_review → pending_review → approved | rejected | revised | superseded
                ; non-superseded → closed | deleted
Order:          pending_payment → paid → submitted_to_pharmacy → pharmacy_accepted → shipped → delivered
                pending_payment → payment_failed (retry) ; paid → refunded ; non-terminal → canceled
Subscription:   active ⇄ paused/payment_pending/payment_failed → canceled ; inactive
Onboarding:     computed, not stored — computeNextStep() in packages/types/src/utils
```

---

## 6. API surface (`/v1/*`)

Mounted in `apps/api/src/index.ts`:
`/v1/config`, `/v1/landing`, `/v1/auth`, `/v1/profile`, `/v1/peptides`, `/v1/admin`, `/v1/chat`,
`/v1/checkins`, `/v1/support-messages`, `/v1/subscription`, `/v1/checkout`, `/v1/tax`,
`/v1/orders`, `/v1/webhooks/{netvalve,pharmetika}`, `/v1/simulation/{pharmetika,netvalve,error}`,
`/v1/internal/{cron,treatment-plans}`, `/v1/invoice`, `/api/health`, `/api/openapi.json`, `/api/docs`.

**Auth** — `POST send-otp | verify-otp | resend-otp | refresh | sign-out`.

**Profile** — `GET|POST|PATCH|DELETE /` (POST is the atomic onboarding write: profile + consents
+ stub address), `POST /waitlist`. Addresses: `GET /`, `GET /by-zip`, `GET /autocomplete`
(Google Places), `GET /lookup/:placeId`, `GET|POST|PATCH|DELETE /:id`.

**Peptides / consult** — `POST /` (create or resume, free), `POST /reorder`, `POST /reintake`,
`GET /:id/reintake-context`, `GET /`, `GET /:id`, `POST /:id/resume-cleared` (clinical override),
`PATCH /:id/shipping-address`, `POST /:id/close`, `POST /:id/begin-protocol`,
`POST /:id/lab-waiver`, medical records (`upload-url`, `GET`, `DELETE /:recordId`),
`POST|GET /:id/messages` (SSE intake stream / keyset history),
`/protocol-activation/sync`, `/:id/protocol-start-notice`.

**Treatment plan (member side)** — `GET /:id/treatment-plan` (per-line prices + server-computed
estimate), `PATCH /:id/treatment-plan/items/:itemId` (remove/restore a line pre-submit),
`POST /:id/treatment-plan/submit` (send to physician queue — free, idempotent),
`POST …/retry`, `POST …/regenerate`, `POST …/generate`.

**Chat** — `POST|GET /`, `POST /messages` (SSE), `GET /:id/messages`.

**Check-ins** — `GET|POST /peptides/:id/checkins`, `POST …/:checkinId/lab/upload-url`,
`POST …/:checkinId/lab/attach`, `GET /checkins/:checkinId`, `POST|GET /checkins/:checkinId/messages`.

**Support messages** — `GET /`, `GET /:id`, `POST /:id/attachments/upload-url`,
`POST /:id/messages`, `POST /:id/read`.

**Checkout** — `POST /quote`, `POST /session` (Netvalve HPP order), `GET /intent/:orderId`.
**Orders** — `GET /` (cursor; hides stale 24h+ pending), `GET /:id`.
**Tax** — `POST /calculate`. **Invoice** — `POST /generate`. **Config** — `GET /` (client flags).
**Landing** — `GET /` (founding-member count), `POST /learn-requests`.

**Subscription (legacy)** — `GET /plans`, `GET /`, `GET /preview`, `POST /checkout-session`,
`POST /cancel`, `POST /retry-payment`, `GET /intent/:id`.

**Admin** (`/v1/admin/*`, role-gated by `middleware/require-role.ts` reading `users_meta.role`):
- `treatment-plans` — list, `counts`, `:id`, `mark-viewed`, `overrides`, `user-peptides`,
  `reopen`, `refresh`, `submit-review`, `:id/checkins[/:checkinId]`, `backfill`
- `treatment-plan-jobs` — list, `:id/cancel`, `:id/retry` · `stuck-intakes` — list, `:id/resume`
- `member-adjusted-plans` — list, `count`, `:id/acknowledge` · `clinical-overrides/:peptideId`
- `user-peptides/:id` (PATCH/DELETE) · `peptide-items` (+ `/prescribable`)
- `orders` — list, `counts`, `csv`, `:id`, `:id/timeline`, `:id/fulfilment` (manual update),
  `:id/refund`, `:id/tax-return`, `:id/ups-shipment/label|quote`, `POST :id/ups-shipment`
- `users` — list, `csv`, `:id`, `:id/peptides` · `discounts` — CRUD + `csv`
- `referrals` — CRUD · `reports` — `referrer-sales(+csv)`, `stopped-intakes(+count, transcript, review)`
- `analytics` — `account-creations`, `funnel-trend`, `daily-sources`, `source-performance`,
  `funnel-by-source/cohort`, `funnel-by-source/spend` (PostHog-backed)
- `support-messages` — `:id`, `:id/messages`, `:id/resolve`, `:id/reopen`, `:id/read`
- `chat-reviews` — list, `:id`, `:id/messages`, `:id/sign-off`
- `rx-patients` (GET/POST) and `rx-prescriptions` (`/validate`, `POST /`) — the **clinic RX pad**

**Webhooks** — `POST /v1/webhooks/netvalve` (`x-netvalve-secret`),
`POST /v1/webhooks/pharmetika` (`x-pharmetika-secret`, with a prod→dev mirror guarded by
`x-mb-mirrored` so it can never loop). *The UPS Track Alert webhook was removed in favour of
query-based polling.*

**Simulation** (deliberately live in every environment, each with its own guard):
`/v1/simulation/pharmetika` (sim webhook feed), `/v1/simulation/netvalve/force-grace`
(internal secret + sandbox-phone allow-list, hidden from OpenAPI),
`/v1/simulation/error` (Better Stack alert validation, kill-switched by
`simulation.error_endpoint_enabled`).

---

## 7. Vendor integrations — the detail

### 7.1 Netvalve — payments (`packages/clients/src/netvalve`, `apps/api/src/lib/netvalve.ts`)
Two hosts: the **HPP host** (`NETVALVE_HPP_BASE_URL`, `/hpp/*`) and the **main payment API**
(`NETVALVE_BASE_URL`). Methods: `createHppOrder`, `getOrder`, `getTransaction`,
`refundTransaction`, `createSubscription`, `cancelSubscription`, `updateSubscription`,
`payManagedRecurring`, `getSubscription`, `listSubscriptions`.

Behaviour that matters:
- **Request bodies are strictly Zod-validated; responses are parsed loosely** — Netvalve DTOs
  are inconsistent across endpoints, so a schema mismatch logs `netvalve.*.schema_mismatch`
  and falls back to the raw body.
- **HTTP 200 ≠ approved.** A declined refund is still a 200. `classifyRefundResponse()` is
  three-way: approved / declined / **unconfirmed** (an unrecognised answer may still have gone
  through). Refunds never auto-retry on 5xx.
- Checkout flow: `POST /v1/checkout/session` prices the order server-side, creates a
  `pending_payment` order, mints an HPP order and redirects the member; the webhook plus the
  30-minute `reconcile-orders` cron settle it. `GET /v1/checkout/intent/:orderId` is the poll.
- Webhook (`x-netvalve-secret`) writes `netvalve_events`, projects order events through
  `applyOrderEvent`, and maps the subscription-domain events to `user_events`.
- Refunds (`services/order-refund.ts`, plan 33) are admin-initiated, gated by
  `checkout.refund_via_provider` and a refund window, and also file a TaxCloud `returnOrder`.

### 7.2 Pharmetika — the compounding pharmacy (`packages/clients/src/pharmetika`)
Single host `https://partner-api.pharmetika.com` for sandbox and prod (sandbox = pharmacy id 214).
OAuth client-credentials (`PHARMETIKA_CLIENT_ID/SECRET`) with a cached token.
Methods: `validate` (dry-run the order), `submit` (create the medication order),
`registerWebhook`, `getToken`.

- `services/pharmacy-submission.ts` builds the payload from the paid order, the plan, the
  address and `pharmacy-constants.ts` (brand, pharmacy, prescriber, priority, entry defaults).
  A `forceSample` test override can send a static sandbox payload — production must pass false.
- **Webhook → status**: `packages/clients/src/pharmetika/workflow.ts` maps every
  `event_data.medication_order_status.workflow_status` (data_entry_queue, lab_formulation,
  dispensed, ready, shipped, delivered, …) to a coarse `orders.status`, a user-facing timeline
  label and a rank. Runtime ordering uses the numeric `_event_request_id`, not the rank.
- Every authenticated, schema-valid delivery lands one append-only `pharmetika_events` row
  tagged `processed | orphan | unmappable | stale_duplicate | route_ignored | apply_failed`
  (capture-all, plan 19). Only `processed` advances an order.
- A prod→dev **mirror** (`PHARMETIKA_WEBHOOK_MIRROR_URL`) fans deliveries out to the dev
  instance; the `x-mb-mirrored` marker prevents loops.
- `services/pharmetika-sim.ts` + `/v1/simulation/pharmetika` + the `advance-pharmetika-sim`
  cron drive a fake pharmacy lifecycle for QA.

### 7.3 UPS — our own shipping lane (`packages/clients/src/ups`, plans 35 + 36)
Used when the primary pharmacy cannot ship to the member's state
(`peptide_state_shipping.primary_pharmacy_shippable = false`). `orders.shipping_route` is
stamped at checkout (`pharmetika | ups`; NULL = read as pharmetika).

- Host is a **code constant**, not env: CIE `wwwcie.ups.com` outside production,
  `onlinetools.ups.com` in production — a Ship call in production creates a real, billed shipment.
  Auth: `UPS_CLIENT_ID/SECRET` OAuth + `UPS_ACCOUNT_NUMBER`.
- **Ship** (`POST /api/shipments/v2409/ship`) is triggered by the Pharmetika receiver right
  after a trigger event on a `ups` order — no cron. UPS has no idempotency key, so
  `ups_shipments.order_id` is unique: that row *is* the duplicate-label guard.
  Statuses `creating → created | needs_review | failed | voided`.
- **Label** is stored in private Supabase storage (`MB_SHIPPING_LABEL_STORAGE_BUCKET`,
  default `mb-shipping-labels`) — the path is stored, never the image. Admin downloads it at
  `GET /v1/admin/orders/:id/ups-shipment/label`. The label is also emailed as a signed link
  plus an order copy to the pharmacy shipping inbox in **every** environment (dev subjects get
  a `TEST ` prefix).
- **Rating** (`POST …/ups-shipment/quote`, admin only) answers "is this service offered to this
  address, and what does it cost" without booking. **Re-create** (`POST …/ups-shipment`) is
  allowed only when `status = failed`, with service `13`/`01`/`14`.
- **Insurance** = UPS Declared Value, capped at **$999.00** per package (UPS Tariff §55.1).
  `splitUpsDeclaredValue()` splits the insured value into `insurance_covered_cents` (declared)
  and `own_risk_cents` (above the cap). Charges land in `ups_insurance_charge_cents` and
  `ups_shipping_charge_cents`.
- **Tracking is query-based** (`POST /v1/internal/cron/poll-ups-tracking`, every 2h). The Track
  Alert webhook and its OAuth endpoint were removed. One `ups_events` row per **new** scan
  (deduped on tracking number + type + code + activity time); 404s are normal before the first
  scan and only alert after a grace period; polling stops on an undelivered parcel after N days.
  Scans feed the same mapping + fulfilment engine the webhook used.

### 7.4 The shared fulfilment engine
`services/order-fulfilment.ts` → `applyFulfilmentTransition()` is the ONE function that applies
a status/tracking change, writes it, and notifies. Pharmetika webhooks, UPS tracking and manual
admin updates all funnel through it, so the three channels cannot drift in either the writes or
the notifications. Member comms go out through `fulfilment-comms.ts`; clinic (mh_user) comms
through `clinic-comms.ts` with the parallel `mh_*` events.

### 7.5 TaxCloud — sales tax (`packages/clients/src/taxcloud`)
`calculateTax` at quote and session time, `createOrder` on capture (tax filing),
`returnOrder` on refund. The consultation fee carries its own TIC **91000** (telehealth
consultation) and sits outside the product discount base. `TAXCLOUD_API_KEY` + `TAXCLOUD_CONNECTION_ID`.

### 7.6 Elation — EHR patient sync (`packages/clients/src/elation`, plan 34)
Daily cron (`sync-elation-patients`, 00:30 UTC) pulls patients tagged `Austin EA`,
`Austin VIP EA`, `Austin Peptides` or `VIP` and **creates / links / parks** each one in
`elation_patient_registry` (status `pending, created, linked, needs_review, failed`).
Matching is on phone + last name + DOB; conflicts park the row with a no-PHI `reviewReason`
slug. Creating a patient also stores their Elation address once. The base URLs are code
constants chosen by environment (dev host on dev/local, prod host in production) so the
`ELATION_EXPORT_KEY` must match the host. A needs-review digest is posted to
`#medici-portal-support` via `SLACK_MEDICI_PORTAL_SUPPORT_WEBHOOK` — the one place the app
talks to Slack directly.

### 7.7 Clinic side (Medici Health)
`user_type` distinguishes `mp_user` (our onboarding), `mh_user` (clinic only, from Elation or
the RX pad) and `mp_mh_user` (both). The **clinic RX pad** (`/v1/admin/rx-patients`,
`/v1/admin/rx-prescriptions`, admin UI `/rx-pad`, role `clinic`) lets a prescriber create an
order straight to Pharmetika: it validates first, pre-fills Instructions from
`peptide_items.instructions` (synced from the Pharmetika formulary `default_sigs` by
`apps/api/scripts/pharmetika-sync-instructions.ts`), and the prescriber's edit goes to the
pharmacy only, never back to the catalog.

### 7.8 Customer.io + SES — member comms (`packages/notifications`)
`NOTIFICATION_EVENTS` is a vendor-neutral semantic catalog; the binding to a campaign/template
lives in the Customer.io dashboard. Events include `account_created`, `intake_started`,
`intake_stopped`, `intake_questions_pending`, `intake_override_cleared`,
`physician_review_pending`, `treatment_plan_ready` / `treatment_plan_failed`,
`not_eligible_or_declined`, `follow_up_questions_requested`, `physician_message_received`,
`protocol_approved`, `protocol_started`, `protocol_reorder_ready`, `checkout_started`,
`payment_succeeded` / `payment_failed` / `payment_abandoned` / `payment_retry_ready`,
`first_order_created`, `fulfilment_started`, `tracking_number_added`, `shipment_dispatched`,
`shipment_delivered`, `refund_issued`, `coa_batch_approved`, `cycle_renewed`,
`renewal_payment_failed`, `subscription_churned`, `membership_activated`, `waitlist_joined`,
`consult_booking_prompted`, plus the `mh_*` clinic mirrors. Identifiers + `program_goal` only —
**never clinical PHI**. Transactional mail goes over **AWS SES SMTP**; sender identity and
internal inboxes live in `apps/api/src/lib/email-constants.ts`.

### 7.9 PostHog, Sentry, Better Stack, Braintrust
- **PostHog**: browser SDK in web/products (taxonomy in `packages/analytics/src/events.ts` —
  website-*, product_*, onboarding_*, auth_otp_*, plan_*, payment_*, chat_*), node SDK in the
  API, and HogQL queries (`daily_cohort_funnel_by_source`, `daily_ad_spend`) read by the admin
  analytics endpoints.
- **Sentry** (`packages/observability`) in web + admin only.
- **Better Stack** receives OTEL traces and the evlog log drain. Alerting is owned there, not in
  the app: failures emit stable structured events (e.g. `treatment_plan_job.dead_letter`) that
  Better Stack rules match. Renaming such an event means updating the alert.
- **Braintrust** (`BRAINTRUST_API_KEY/PROJECT`) for AI call logging/eval.
- Logging: evlog wide event per request + a pino-compatible shim over ~212 discrete call sites,
  with an auto-redaction policy for PHI-bearing keys before both console and drain.

### 7.10 Supabase
Postgres + Auth (phone OTP via Twilio) + private Storage (`MB_STORAGE_BUCKET`,
`MB_INVOICE_STORAGE_BUCKET`, `MB_SHIPPING_LABEL_STORAGE_BUCKET`, `MB_ASSETS_STORAGE_BUCKET`).
`SUPABASE_URL` is the **custom domain** where one is active (`platform.medicipeptides.com` /
`platform-dev.medicipeptides.com`); `SUPABASE_PROJECT_URL` keeps the original
`https://<ref>.supabase.co` whose login-token issuer is also accepted
(`lib/supabase-jwt.ts`, plan 37). **web and admin have no Supabase client** — every Supabase
call goes through the API.

---

## 8. AI architecture

Three agents + a specialist tier + a durable job engine. **No `@openai/agents` dependency** —
re-adding it is a regression (its trace exporter auto-uploads full transcripts to OpenAI,
violating the BAA).

Model constants live in **code**, never env (`apps/api/src/lib/ai-models.ts`):
- `OPENAI_CHAT_MODEL_ID = "gpt-6-sol"` — Dr Gabi chat **and** the intake conversation.
- `DOCUMENT_EXTRACTION_MODEL = us.anthropic.claude-opus-5-5` — uploaded records + check-in labs.
- `TREATMENT_PLAN_MODEL = global.anthropic.claude-sonnet-5-5` — plan generation / refresh / backfill.
- `INTAKE_RECORD_MODEL = global.anthropic.claude-sonnet-5-5`, effort `medium`.
- `CHECKIN_MODEL = global.anthropic.claude-sonnet-5-5`, effort `medium`.
Bedrock ids MUST be cross-region inference profiles. Sonnet 5.5 exists on the account only as
`global.`, which is an **open residency decision** recorded in CLAUDE.md guardrail 5.

**Pieces:**
- **Triage / interviewer** (`services/triage-agent.ts`) — AI SDK `ToolLoopAgent` on OpenAI inside
  the consult's OpenAI Conversation (`peptides.conversation_context_id`), `stepCountIs(12)`.
  Sends only the new message each turn; the intake prompt goes in
  `providerOptions.openai.instructions` (per request, never stored in the conversation).
  The conversation is minted lazily on the first turn and seeded from `peptide_messages` when
  the consult already has turns. The intake never reads labs or uploads.
- **Intake record builder** (`services/intake-record-builder.ts`) — the interviewer never writes
  the record. `historyComplete({ triageClassification, recordNote })` calls `buildIntakeRecord`,
  which sends Bedrock Sonnet the same intake instructions plus the transcript rebuilt from
  `peptide_messages` and returns the PEPTIDE INTAKE SUMMARY through `generateObjectWithTool`.
  It runs *inside* the tool call so a "Not asked" item bounces back while the member is present.
  The builder may not contradict the filed outcome (GREEN may come back YELLOW, nothing else moves).
- **Check-ins** (`services/checkin-agent.ts`) — stateless `ToolLoopAgent` on Bedrock; the route
  rebuilds the transcript from `checkin_messages` every turn; the full plan JSON is one cached
  system message; terminal tool `checkinComplete`. Outcomes `COMPLETE | ESCALATE | RED` are
  record + badge only (deliberately no notification pipeline).
- **Dr Gabi chat** (`services/chat-agent.ts`) — one-shot `streamText` on OpenAI with Conversations
  memory, no tools.
- **Specialist tools** (`services/agent-tools.ts`) — `lookupPeptideCatalog`, `historyComplete`,
  `finalizeReview`. Document extraction runs in the plan job
  (`services/medical-record-summary.ts`, `document-extraction-pipeline.ts`), never mid-intake.
- **Treatment-plan jobs** (`services/treatment-plan-jobs.ts`) — durable queue with
  `claimDueJobs` / `runClaimedJob` / `reapExhaustedJobs`, driven by the 1-minute cron and
  self-kicked when intake completes. Uses `generateObjectWithTool` (never `generateObject`:
  Claude 5.5 on Bedrock rejects both of its paths) with the schema as a submit tool under `auto`
  tool choice, validated in code, plus `treatmentPlanModelOptions()` (no temperature, adaptive
  thinking at `low`).
- **Conversation self-heal** — `isConversationCorruptedError()` (`lib/conversation-recovery.ts`)
  detects unusable OpenAI conversations; chat rotates to a fresh one, intake repairs a dangling
  tool call in place or rotates to a conversation seeded from stored turns. Extend the matcher;
  never bypass it.
- **Clinical override** (`services/clinical-override.ts`, plan 32) — a RED intake files as usual;
  a physician records cleared / not-cleared from the worklist; a clearance notifies the member,
  and the link mints a NEW session with `override_source_peptide_id` set. Every turn rebuilds a
  byte-exact `CLINICAL OVERRIDE` block; `historyComplete` stamps `override_applied` and refuses
  a GREEN (a resumed RED closes YELLOW at best).
- **Prompts** live in `apps/api/src/services/prompts/**` (facade: `services/prompts.ts`), split
  into `intake/`, `returning-intake/`, `chat/`, `checkin/`, `document-extraction/`,
  `treatment-plan/` (system, schema, user, formulary, refresh, backfill, purchased-refresh) and
  `shared/` (safety, intake-blocks, intake-schema, intake-record, member-context, prompt-version).
  **Every prompt change must walk the §15 Prompt ↔ Code Contract checklist in CLAUDE.md** and
  re-run `bun test apps/api/src/services/prompts.characterization.test.ts`.

### Renewal-flow naming (one name per layer)
| Name | Layer |
|---|---|
| `reorder` | `session_type` (code/DB) |
| `returning_refill` | stored `intake_type`, model-facing |
| `EXPIRING TREATMENT PLAN` | prompt block header |
| renewal | member-facing copy |

The separate new-goal flow is `supplementary` / `returning_supplementary`, which the code calls
"reintake" (plan 29). The prompt copy still says "refresh" on purpose.

---

## 9. Scheduled work (`POST /v1/internal/cron/*`, Bearer `CRON_SECRET` or `x-mb-internal-token`)

| Endpoint | Cadence | What it does |
|---|---|---|
| `run-treatment-plan-jobs` | 1m (+ self-kick) | Drains the durable plan-generation queue |
| `reconcile-orders` | 30m | Pulls Netvalve state for unsettled orders |
| `poll-ups-tracking` | 2h | Query-based UPS tracking → order shipped/delivered |
| `sweep-support-uploads` | 1h | Deletes unreferenced physician-thread uploads after 24h |
| `resume-stuck-intakes` | — | Recovers intakes wedged mid-turn |
| `protocol-reorder-reminders` | — | Fires `protocol_reorder_ready` at the renewal window |
| `activate-delivered-protocols` | — | Starts the protocol clock once the parcel lands |
| `rerun-purchased-plans` | 12h | Rewrites plan prose for partially purchased orders |
| `reconcile-subscriptions` | 23h | Legacy subscription state pull |
| `sync-elation-patients` | daily 00:30 UTC | Elation tagged-patient sync |
| `advance-pharmetika-sim`, `simulate-ups-tracking` | QA only | Drive the simulators |

---

## 10. Config table / feature flags (`config`, key → JSON, no deploy needed)

`hide_subscription` · `checkout.consultation_fee_cents` (default 4900) ·
`checkout.refund_via_provider` · `reorder_enabled` · `reintake_enabled` ·
`sandbox_phone_numbers` · `pharmacy_sandbox` · `simulation.error_endpoint_enabled` ·
`referral.enabled` · `subscription.plans` · `subscription.payment_failed_grace_days` ·
`landing.founding_member_count` · `waitlist.users_threshold`.

**Consultation fee rules** (`services/consultation-fee.ts` — the only place that decides it):
resolved server-side per order, waived for live subscribers, **99 % discounted (floored at 1¢)
for sandbox testers**, and waived outright by a `free_consultation` discount rule. It is a
SERVICE: outside the discount base, outside `subtotalCents`, with TIC 91000. A fee of 0 renders
in exactly two ways — subscription waiver (or a pre-fee order) ⇒ **omit the row**; discount-rule
waiver ⇒ render **FREE**. Never compute it on the client.

---

## 11. Conventions

- **Routing**: base `/v1`, lowercase kebab-case plural nouns, webhooks `/v1/webhooks/{vendor}`.
- **Envelope**: `{ "data": T, "meta": {...} }` / `{ "error": { "code": "SCREAMING_SNAKE", "message", "details" }, "request_id" }`.
- **Status codes**: 200/201/204, 400, 401, 403, 404, 409, 413 (`PAYLOAD_TOO_LARGE`), 422, 429, 500, 502/503.
- **Validation**: Zod at the route boundary via hono-openapi, `.strict()` on inbound bodies,
  IDs `z.string().uuid()`, money `z.number().int().nonnegative()`. Register request **and**
  response schemas on every route.
- **Pagination**: keyset/cursor only — `?limit=20&cursor=<base64>`, `meta.next_cursor`.
- **Casing**: TS camelCase · types PascalCase · SQL snake_case + plural tables · JSON wire
  camelCase · headers lowercase kebab-case · env SCREAMING_SNAKE · error codes SCREAMING_SNAKE.
  Model-facing JSON keys stay snake_case because the prompt defines them.
- **Auth transport**: end user = HTTP-only `mb_access` (~1h) + `mb_refresh` (30d), `credentials: "include"`,
  JWKS verify via `jose` with issuer+audience enforced and no HS256; use `lib/cookies.ts`.
  Doctor/admin = the same session plus a role read from `users_meta` at request time.
  Webhook = shared-secret header. Cron = Bearer `CRON_SECRET` / `x-mb-internal-token`.
- **Idempotency**: POSTs with external effects accept `Idempotency-Key`; webhooks dedupe on
  `(source, external_event_id)`.
- **Logging**: structured, never `console.*`. Required fields `request_id`, `user_id`, `route`,
  `status`, `latency_ms`. Never log PHI, OTP codes or tokens — IDs and `err.name` only.
- **Migrations**: all DDL through Drizzle (`packages/db/migrations/`), one concern per file,
  forward-only in production. Agents never get DB credentials.
- **Rate limiting**: middleware-first (`post(path, limiter, zValidator, handler)`);
  `MB_RATE_LIMIT_DISABLED=true` for local dev.

### Hard guardrails
1. Never import Dr Gabi code or share JWT secrets; every MB table lives in `public`.
2. No PHI in logs. Money = integer cents. Phone = E.164. `.strict()` on inbound.
3. OpenAPI registration on every route.
4. Cookie auth only — raw tokens never in bodies, logs or FE state.
5. Bedrock ids must be cross-region inference profiles; residency decision is open and recorded.
6. Self-heal corrupted OpenAI conversations; extend the matcher rather than bypassing it.
7. AI SDK is the standard — `ToolLoopAgent` / `streamText` / `tool()`; no hand-rolled stream translation.
8. The consultation fee is resolved server-side, once, per the rules in §10.
9. Never re-add `@openai/agents`.

---

## 12. Environment variables (`packages/env/src/server.ts` is the source of truth)

Core: `API_PORT`, `NODE_ENV`, `APP_ENV`, `APP_BASE_URL`, `COOKIE_DOMAIN`, `DATABASE_URL`,
`SUPABASE_URL`, `SUPABASE_PROJECT_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`.
Storage: `MB_STORAGE_BUCKET`, `MB_INVOICE_STORAGE_BUCKET`, `MB_SHIPPING_LABEL_STORAGE_BUCKET`,
`MB_ASSETS_STORAGE_BUCKET`.
AI: `OPENAI_API_KEY`, `BEDROCK_REGION`, `AWS_BEDROCK_ROLE_ARN` (Bedrock's **only** auth — an IAM
role assumed through Vercel OIDC; locally run `vercel env pull` for `VERCEL_OIDC_TOKEN`, which
expires in 12h). Model ids are NOT env.
Payments: `NETVALVE_BASE_URL`, `NETVALVE_HPP_BASE_URL`, `NETVALVE_CLIENT_ID`, `NETVALVE_API_KEY`,
`NETVALVE_MID_ID`, `MB_NETVALVE_WEBHOOK_SECRET`.
Pharmacy: `PHARMETIKA_CLIENT_ID`, `PHARMETIKA_CLIENT_SECRET`, `PHARMETIKA_WEBHOOK_SECRET`,
`PHARMETIKA_WEBHOOK_MIRROR_URL`.
Shipping: `UPS_CLIENT_ID`, `UPS_CLIENT_SECRET`, `UPS_ACCOUNT_NUMBER`.
Tax/email: `TAXCLOUD_API_KEY`, `TAXCLOUD_CONNECTION_ID`, `SES_SMTP_HOST/PORT/USER/PASSWORD`.
Comms: `CUSTOMERIO_SITE_ID`, `CUSTOMERIO_TRACK_API_KEY`, `CUSTOMERIO_APP_API_KEY`,
`CUSTOMERIO_REGION`, `SLACK_MEDICI_PORTAL_SUPPORT_WEBHOOK`.
EHR: `ELATION_EXPORT_KEY`. Address: `GOOGLE_PLACES_API_KEY`.
Analytics/observability: `POSTHOG_API_KEY`, `POSTHOG_PROJECT_API_KEY`, `POSTHOG_PROJECT_ID`,
`POSTHOG_API_HOST`, `POSTHOG_INGEST_HOST`, `OTEL_SERVICE_NAME`, `OTEL_EXPORTER_OTLP_ENDPOINT`,
`OTEL_EXPORTER_OTLP_HEADERS`, `OTEL_TRACES_SAMPLER_RATIO`, `LOG_LEVEL`,
`BRAINTRUST_API_KEY`, `BRAINTRUST_PROJECT`.
Cron/limits: `CRON_SECRET`, `MB_INTERNAL_SERVICE_TOKEN`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`,
`MB_RATE_LIMIT_DISABLED`, `MB_TREATMENT_PLAN_JOB_HOLD_SECONDS`.
FE: `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_APP_BASE_URL`, `NEXT_PUBLIC_APP_ENV`,
`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`.

CORS origins are **hard-coded** in `apps/api/src/middleware/cors.ts`.
Subscription plan config lives in `services/subscription-plans.ts`; sender identity and internal
inboxes in `lib/email-constants.ts`.

---

## 13. Commands and dev gotchas

```bash
bun install
bun run dev               # all apps (turbo)
bun run dev:api | dev:web | dev:admin | dev:products
bun run build · bun run check-types      # bunx turbo check-types --continue
bun test                                  # apps/api 7 files, apps/web 2, packages/types 2
cd packages/db && bunx drizzle-kit generate | push | studio
npx shadcn@latest add <component> -c packages/ui     # from repo root
```

- **`bun --hot` does NOT reload `.env`** — restart the API after any env change.
- **`bun --hot` does NOT drain in-flight requests** — saving a watched file mid-request rolls the
  DB transaction back even after a 2xx was written. "Phantom 2xx with no DB row" is an edit-timing
  artefact, not a code bug. Safe under `bun run start`.
- No lint script in any workspace; knip is not installed. Only admin, api, api-client, auth and ui
  have `check-types` — `apps/web`, `apps/products` and packages clients/db/env/types/config do not.

### Versioning
Each app owns `package.json#version` + `CHANGELOG.md`. Bump only the apps whose behaviour
changed (a `packages/*` change counts for every consumer); feature → minor, fix/copy/config →
patch; prepend a `## x.y.z` section with one plain-language bullet per change; commit as
`chore: bump <apps> versions`. Edit the files directly — do not add `.changeset/*.md`.

---

## 14. Doc map

| Topic | File |
|---|---|
| Architecture, data model, flows | `docs/plan.md`, `docs/prd.md`, `docs/tech-stack.md` |
| Conventions | `docs/plans/00-conventions.md` |
| Backend tactical guide | `docs/BACKEND-PLAYBOOK.md` |
| Auth · onboarding · consult · doctor review · frontend | `docs/plans/01..05` |
| Dr Gabi chat · subscription · checkout · notifications | `docs/plans/06..10` |
| Pharmetika submit / tracking / capture-all / per-line | `docs/plans/12, 13, 19, 22, 31` |
| Discounts · sandbox phones · waitlist | `docs/plans/14, 15, 16` |
| Manual + unified fulfilment | `docs/plans/17, 18` |
| SEO / page-speed | `docs/plans/20, 21, 23, 24` |
| Physician ↔ patient messaging · image upload | `docs/plans/26, 34-image-upload-doctor-chat.md` |
| Referral capture · user-event attribution | `docs/plans/27, 28`, `docs/plans/referral.md` |
| Reintake · subscription period ledger · nav guards | `docs/plans/29, 30, 31-navigation-guards.md` |
| Clinical override · refunds · Elation sync | `docs/plans/32, 33, 34` |
| Purchased-plan rerun · UPS shipping · UPS insurance | `docs/plans/35-purchased-plan-rerun.md, 35-ups-shipping.md, 36-ups-insurance.md` |
| Order address snapshot · B5 member app · Supabase custom domain · bag-to-intake | `docs/plans/36, 37, 38` |
| UPS scan → order status (new-dev guide) | `docs/implementation-notes/ups-tracking-statuses.md` |
| Fulfilment → Customer.io events | `docs/implementation-notes/fulfilment-customerio-events.md` |
| Cookie-auth implementation | `docs/implementation-notes/cookie-auth-guide.md` |
| Divergences from the design reference (read before "fixing" UI back to it) | `docs/implementation-notes/design-reference-divergences.md` |
| Prompt files, version stamps, shared constants | `apps/api/src/services/prompts/README.md` |

---

## 15. Live context an agent should know before changing things

- **The member-proposal step is back.** `feat/skip-member-proposal-step` (2026-10-01 → 11-16) made
  the generation job write `pending_review` directly; it is reverted in code (migration 0088 stays,
  forward-only). Plans land at `pending_member_review` and the physician-queue notifications fire
  from `POST …/treatment-plan/submit`. **Do NOT merge `feat/retire-member-proposal-step`.**
- **Known violation** (2026-09-28): `buildAllergiesBlock` in `pharmacy-submission.ts` parses the raw
  `peptides.summary` without `hydrateIntakeFromColumns`, so every pharmacy order goes out
  "no known allergies".
- The stored intake and plan JSON are **split** across columns
  (`splitIntakeForPersistence` / `splitTreatmentPlanForPersistence`); any reader parsing
  `peptides.summary` must call `hydrateIntakeFromColumns` first or the parse fails silently.
- Working conventions: the user owns git (do not commit unless asked); never run migrations
  against the dev DB (test locally, hand them to the user); when asked "fixes?" describe the
  change rather than writing code.
