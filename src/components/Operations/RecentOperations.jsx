import { AlertTriangle } from 'lucide-react';
import Panel, { ViewAllButton } from '../Panel.jsx';
import { DataTable, badge } from './DataRows.jsx';

export default function RecentOperations({ store, open }) {
  const cols = [{ h: 'Date & Time', k: 'when', cls: 'nowrap' }, { h: 'Operation', k: 'op' }, { h: 'Site', k: 'site' }, { h: 'Result', cell: badge('result') }];
  return (
    <Panel icon={AlertTriangle} tone="red" title="Recent Operations" action={<ViewAllButton onClick={() => open({ kind: 'list', which: 'recent' })} />}>
      <DataTable columns={cols} rows={store.recent.slice(0, 5)} onRow={(r) => open({ kind: 'recent', id: r.id })} />
    </Panel>
  );
}
