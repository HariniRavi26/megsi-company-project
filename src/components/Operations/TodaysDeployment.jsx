import { CalendarCheck } from 'lucide-react';
import Panel, { ViewAllButton } from '../Panel.jsx';
import { DataTable, badge } from './DataRows.jsx';

export default function TodaysDeployment({ store, open }) {
  const cols = [
    { h: '#', cls: 'col-num', cell: (_, i) => i + 1 }, { h: 'Site Name', k: 'site' },
    { h: 'Scheduled Guards', k: 'scheduled' }, { h: 'Deployed', k: 'deployed' }, { h: 'Status', cell: badge('status') },
  ];
  return (
    <Panel icon={CalendarCheck} title="Today's Deployment" action={<ViewAllButton onClick={() => open({ kind: 'list', which: 'deps' })} />}>
      <DataTable columns={cols} rows={store.deployments} onRow={(r) => open({ kind: 'dep', id: r.id })} />
    </Panel>
  );
}
