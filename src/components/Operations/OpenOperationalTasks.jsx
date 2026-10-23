import { ClipboardList } from 'lucide-react';
import Panel, { ViewAllButton } from '../Panel.jsx';
import { DataTable, badge } from './DataRows.jsx';

export default function OpenOperationalTasks({ store, open }) {
  const cols = [{ h: 'Task', k: 'task' }, { h: 'Assigned To', k: 'who' }, { h: 'Due Date', k: 'due', cls: 'nowrap' }, { h: 'Priority', cell: badge('priority') }];
  const rows = store.tasks.filter((t) => t.listed && t.status === 'Open');
  return (
    <Panel icon={ClipboardList} title="Open Operational Tasks" action={<ViewAllButton onClick={() => open({ kind: 'list', which: 'tasks' })} />}>
      <DataTable columns={cols} rows={rows} className="table-scroll--fixed" onRow={(r) => open({ kind: 'task', id: r.id })} />
    </Panel>
  );
}
