import { AlertTriangle } from 'lucide-react';
import Panel, { ViewAllButton } from './Panel.jsx';
import StatusBadge from './StatusBadge.jsx';
import { recentIncidents } from '../data/mockData.js';

export default function RecentIncidents() {
  return (
    <Panel icon={AlertTriangle} tone="red" title="Recent Incidents" action={<ViewAllButton />}>
      <div className="table-scroll">
        <table className="tbl tbl--incidents">
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Site</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentIncidents.map((i) => (
              <tr key={i.id}>
                <td className="nowrap">{i.date}</td>
                <td>{i.site}</td>
                <td>{i.type}</td>
                <td>
                  <StatusBadge status={i.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
