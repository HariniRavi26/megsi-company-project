import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Panel, { SelectControl } from '../Panel.jsx';
import { STATUS_META, STATUS_BY_RANGE } from '../../data/operationsMockData.js';

const OPTIONS = Object.entries(STATUS_BY_RANGE).map(([value, v]) => ({ value, label: v.label }));

export default function OperationStatusChart({ open }) {
  const [range, setRange] = useState('week');
  const [hidden, setHidden] = useState([]);
  const values = STATUS_BY_RANGE[range].values;
  const data = STATUS_META.map((m, i) => ({ ...m, value: hidden.includes(i) ? 0 : values[i] }));
  const toggle = (i) => setHidden((h) => (h.includes(i) ? h.filter((x) => x !== i) : [...h, i]));
  const detail = (i) => open({ kind: 'info', title: `${STATUS_META[i].name} operations`, rows: [['Share', `${values[i]}%`], ['Operations', `${Math.round((values[i] * 36) / 100)} of 36`], ['Period', STATUS_BY_RANGE[range].label]] });

  return (
    <Panel icon={ShieldCheck} title="Operation Status"
      action={<SelectControl label="Operation status period" value={range} onChange={setRange} options={OPTIONS} />}>
      <div className="attendance">
        <div className="donut">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270} stroke="#fff" strokeWidth={2} isAnimationActive={false} onClick={(_, i) => detail(i)} cursor="pointer">
                {data.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="donut__center">
            <strong>{hidden.includes(0) ? '—' : `${values[0]}%`}</strong>
            <span>Operations</span>
            <span>On Track</span>
          </div>
        </div>
        <ul className="legend-list">
          {STATUS_META.map((m, i) => (
            <li key={m.name} className={`legend-click${hidden.includes(i) ? ' is-off' : ''}`} role="button" tabIndex={0} aria-pressed={!hidden.includes(i)}
              onClick={() => toggle(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle(i))}>
              <span className="legend-list__dot" style={{ background: m.color }} />
              <span>{m.name}</span>
              <span className="legend-list__value">{values[i]}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
