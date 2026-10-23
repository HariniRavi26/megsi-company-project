import { Circle, CheckCircle2, Clock3 } from 'lucide-react';

const VARIANTS = {
  'On Duty': { tone: 'green', icon: 'dot' },
  Active: { tone: 'green', icon: 'dot' },
  'On Hold': { tone: 'orange', icon: 'dot' },
  Open: { tone: 'red', icon: 'dot' },
  Resolved: { tone: 'green', icon: 'check' },
  Closed: { tone: 'gray', icon: 'dot' },
  Upcoming: { tone: 'amber', icon: 'clock' },
  Normal: { tone: 'green', icon: 'dot' },
  'On Going': { tone: 'green', icon: 'dot' },
  'In Progress': { tone: 'blue', icon: 'dot' },
  'At Risk': { tone: 'orange', icon: 'dot' },
  Completed: { tone: 'green', icon: 'dot' },
  High: { tone: 'red', icon: 'dot' },
  Medium: { tone: 'orange', icon: 'dot' },
  Low: { tone: 'green', icon: 'dot' },
};

export default function StatusBadge({ status }) {
  const variant = VARIANTS[status] || { tone: 'gray', icon: 'dot' };
  return (
    <span className={`status status--${variant.tone}`}>
      {variant.icon === 'check' && <CheckCircle2 size={11} aria-hidden="true" />}
      {variant.icon === 'clock' && <Clock3 size={11} aria-hidden="true" />}
      {variant.icon === 'dot' && <Circle size={8} fill="currentColor" strokeWidth={0} aria-hidden="true" />}
      {status}
    </span>
  );
}
