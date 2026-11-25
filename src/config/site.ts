/**
 * Site-wide settings — change behaviour here without touching components.
 */
export const siteConfig = {
  experience: {
    /**
     * true  → years/months of experience count up automatically from `careerStart`.
     * false → always show `fixed` below.
     */
    autoIncrement: true,

    /**
     * First month of professional work (month is 1-12). Used when autoIncrement is true.
     * Both the start month and the current month count, e.g. Jan 2023 → Nov 2026 = 3y 11m.
     */
    careerStart: { year: 2023, month: 1 },

    /** Shown as-is when autoIncrement is false. */
    fixed: { years: 3, months: 11 },
  },
};
