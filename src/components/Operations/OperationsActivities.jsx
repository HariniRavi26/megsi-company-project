import { Clock, Rocket, RefreshCw, CheckCircle2, AlertTriangle, Flag } from 'lucide-react';
import Panel, { ViewAllButton } from '../Panel.jsx';

export const ACTIVITY_ICONS = {
  deploy: [Rocket, 'blue'], update: [RefreshCw, 'green'], done: [CheckCircle2, 'green'], issue: [AlertTriangle, 'red'], closed: [Flag, 'blue'],
};
export default function OperationsActivities({ store, open }) {
  return (
    <Panel icon={Clock} title="Recent Activities" action={<ViewAllButton onClick={() => open({ kind: 'list', which: 'acts' })} />}>
      <ul className="activities activities--click">
        {store.activities.slice(0, 5).map((a) => {
          const [Icon, tone] = ACTIVITY_ICONS[a.type];
          return (
            <li key={a.id}>
              <button type="button" onClick={() => open({ kind: 'act', id: a.id })}>
                <span className={`activities__icon bg-${tone}`} aria-hidden="true"><Icon size={15} /></span>
                <span className="activities__text">{a.text}</span>
                <time className="activities__time">{a.when}</time>
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
