import { profile } from '@/data/content';
import { DownloadIcon } from './Icons';

export default function ResumeButton({ icon = true }: { icon?: boolean }) {
  if (profile.resumeUrl) {
    return (
      <a className="btn btn-ghost" href={profile.resumeUrl} download>
        Download Resume {icon && <DownloadIcon />}
      </a>
    );
  }
  return (
    <a className="btn btn-ghost" href="#contact" title="Connect to your resume PDF">
      Download Resume {icon && <DownloadIcon />}
    </a>
  );
}
