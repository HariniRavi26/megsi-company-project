import { FileText } from 'lucide-react';
import Panel, { ViewAllButton } from './Panel.jsx';
import StatusBadge from './StatusBadge.jsx';
import { contractRenewals } from '../data/mockData.js';

export default function ContractRenewals() {
  return (
    <Panel icon={FileText} title="Upcoming Contract Renewals" action={<ViewAllButton />}>
      <div className="table-scroll">
        <table className="tbl tbl--renewals">
          <thead>
            <tr>
              <th>Client</th>
              <th>Contract Type</th>
              <th>End Date</th>
              <th className="col-center">Days Left</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contractRenewals.map((c) => (
              <tr key={c.id}>
                <td>{c.client}</td>
                <td>{c.type}</td>
                <td className="nowrap">{c.endDate}</td>
                <td className="col-center">{c.daysLeft}</td>
                <td>
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
