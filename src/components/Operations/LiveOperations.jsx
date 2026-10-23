import { Radio } from 'lucide-react';
import Panel, { ViewAllButton } from '../Panel.jsx';
import { DataTable, Person, badge } from './DataRows.jsx';

export default function LiveOperations({ store, open }) {
  const cols = [
    { h: '#', cls: 'col-num', cell: (_, i) => i + 1 }, { h: 'Operation', k: 'op' }, { h: 'Site', k: 'site' },
    { h: 'Guard(s)', cell: (r) => <Person name={r.guard} /> }, { h: 'Start Time', k: 'start', cls: 'nowrap' }, { h: 'Status', cell: badge('status') },
  ];
  return (
    <Panel icon={Radio} title="Live Operations (Active)" action={<ViewAllButton onClick={() => open({ kind: 'list', which: 'ops' })} />}>
      <DataTable columns={cols} rows={store.ops.slice(0, 5)} onRow={(r) => open({ kind: 'op', id: r.id })} />
    </Panel>
  );
}
