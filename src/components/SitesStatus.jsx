import { MapPin } from 'lucide-react';
import Panel, { ViewAllButton } from './Panel.jsx';
import StatusBadge from './StatusBadge.jsx';
import { sitesStatus } from '../data/mockData.js';

export default function SitesStatus() {
  return (
    <Panel icon={MapPin} title="Sites Status" action={<ViewAllButton />}>
      <div className="table-scroll">
        <table className="tbl tbl--sites">
          <thead>
            <tr>
              <th className="col-num">#</th>
              <th>Site Name</th>
              <th>Location</th>
              <th className="col-center">Guards</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sitesStatus.map((s) => (
              <tr key={s.id}>
                <td className="col-num">{s.id}</td>
                <td>{s.name}</td>
                <td>{s.location}</td>
                <td className="col-center">{s.guards}</td>
                <td>
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
