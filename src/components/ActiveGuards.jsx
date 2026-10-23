import { UserCheck } from 'lucide-react';
import Panel, { ViewAllButton } from './Panel.jsx';
import StatusBadge from './StatusBadge.jsx';
import { activeGuards } from '../data/mockData.js';

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

export default function ActiveGuards() {
  return (
    <Panel icon={UserCheck} title="Active Guards (Live)" action={<ViewAllButton />}>
      {activeGuards.length === 0 ? (
        <p className="empty">No guards are on duty right now.</p>
      ) : (
        <div className="table-scroll">
          <table className="tbl tbl--guards">
            <thead>
              <tr>
                <th className="col-num">#</th>
                <th>Name</th>
                <th>Badge No.</th>
                <th>Site</th>
                <th>Shift</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeGuards.map((g) => (
                <tr key={g.id}>
                  <td className="col-num">{g.id}</td>
                  <td>
                    <span className="person">
                      <span className="avatar" style={{ background: g.color }} aria-hidden="true">
                        {initials(g.name)}
                      </span>
                      {g.name}
                    </span>
                  </td>
                  <td>{g.badge}</td>
                  <td>{g.site}</td>
                  <td className="nowrap">{g.shift}</td>
                  <td>
                    <StatusBadge status={g.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
