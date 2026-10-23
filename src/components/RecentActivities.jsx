import { Clock, Building2, CalendarCheck, AlertTriangle, UserPlus, FileText } from 'lucide-react';
import Panel, { ViewAllButton } from './Panel.jsx';
import { recentActivities } from '../data/mockData.js';

const ICONS = {
  building: Building2,
  calendarCheck: CalendarCheck,
  alert: AlertTriangle,
  userPlus: UserPlus,
  file: FileText,
};

export default function RecentActivities() {
  return (
    <Panel icon={Clock} title="Recent Activities" action={<ViewAllButton />}>
      <ul className="activities">
        {recentActivities.map((a) => {
          const Icon = ICONS[a.icon] || FileText;
          return (
            <li key={a.id}>
              <span className={`activities__icon bg-${a.tone}`} aria-hidden="true">
                <Icon size={15} />
              </span>
              <span className="activities__text">{a.text}</span>
              <time className="activities__time">{a.time}</time>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
