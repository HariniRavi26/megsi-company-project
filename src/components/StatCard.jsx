import {
  Users,
  Building2,
  User,
  CalendarDays,
  AlertTriangle,
  FileText,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const ICONS = {
  users: Users,
  building: Building2,
  user: User,
  calendar: CalendarDays,
  alert: AlertTriangle,
  file: FileText,
};

export default function StatCard({ item }) {
  const Icon = ICONS[item.icon] || FileText;
  const TrendIcon = item.trendDir === 'down' ? ArrowDown : ArrowUp;
  const trendTone = item.tone === 'red' ? 'trend--bad' : 'trend--good';

  return (
    <article className="stat">
      <div className={`stat__icon bg-${item.tone}`} aria-hidden="true">
        <Icon size={28} strokeWidth={2} />
      </div>
      <div className="stat__body">
        <p className="stat__label">{item.label}</p>
        <div className="stat__value-row">
          <span className="stat__value">{item.value}</span>
          {item.trend && (
            <span className={`trend ${trendTone}`}>
              <TrendIcon size={11} aria-hidden="true" />
              {item.trend}
            </span>
          )}
        </div>
        <p className={`stat__sub${item.subTone === 'danger' ? ' stat__sub--danger' : ''}`}>{item.sub}</p>
      </div>
    </article>
  );
}
