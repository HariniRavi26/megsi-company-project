import { useState } from 'react';
import { ListChecks } from 'lucide-react';
import Panel, { SelectControl } from '../Panel.jsx';
import { PROGRESS_META, PROGRESS_BY_RANGE } from '../../data/operationsMockData.js';

const OPTIONS = Object.entries(PROGRESS_BY_RANGE).map(([value, v]) => ({ value, label: v.label }));

export default function TaskProgress({ store, open }) {
  const [range, setRange] = useState('week');
  const values = PROGRESS_BY_RANGE[range].values;
  const show = (name) =>
    open({ kind: 'table', title: `${name} tasks`, rowKind: 'task',
      rows: store.tasks.filter((t) => t.cat === name && t.status === 'Open'),
      cols: [['Task', 'task'], ['Assigned To', 'who'], ['Due', 'due'], ['Priority', 'priority', 'badge']] });
  return (
    <Panel icon={ListChecks} title="Task Progress"
      action={<SelectControl label="Task progress period" value={range} onChange={setRange} options={OPTIONS} />}>
      <div className="progress-list">
        {PROGRESS_META.map((m, i) => (
          <button type="button" key={m.name} className="progress-row" onClick={() => show(m.name)}>
            <span>{m.name}</span>
            <span className="progress-track" aria-hidden="true"><span style={{ width: `${values[i]}%`, background: m.color }} /></span>
            <strong>{values[i]}%</strong>
          </button>
        ))}
      </div>
    </Panel>
  );
}
