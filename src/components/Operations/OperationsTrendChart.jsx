import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import Panel, { SelectControl } from '../Panel.jsx';
import { TREND_BY_RANGE } from '../../data/operationsMockData.js';

const OPTIONS = Object.entries(TREND_BY_RANGE).map(([value, v]) => ({ value, label: v.label }));
const tick = { fontSize: 10, fill: '#6b7a96' };

export default function OperationsTrendChart({ open }) {
  const [range, setRange] = useState('last7');
  const data = TREND_BY_RANGE[range].data;
  const onBar = (d) => d && open({ kind: 'info', title: `Operations – ${d.day}`, rows: [['Completed', d.completed], ['In progress', d.progress], ['Issues', d.issues], ['Total operations', d.total]] });
  return (
    <Panel icon={BarChart3} title="Operations Trend"
      action={<SelectControl label="Operations trend period" value={range} onChange={setRange} options={OPTIONS} />}>
      <div className="chart-box chart-box--bars">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 8, left: -22, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e8edf5" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={tick} />
            <YAxis tickLine={false} axisLine={false} tick={tick} domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} />
            <Tooltip cursor={{ fill: 'rgba(29,99,240,0.06)' }} contentStyle={{ borderRadius: 8, border: '1px solid #e3e9f2', fontSize: 12 }} />
            <Bar dataKey="completed" name="Completed" stackId="a" fill="#1d63f0" barSize={30} isAnimationActive={false} onClick={onBar} cursor="pointer" />
            <Bar dataKey="progress" name="In Progress" stackId="a" fill="#a9c8fa" barSize={30} isAnimationActive={false} onClick={onBar} cursor="pointer">
              <LabelList dataKey="total" position="top" style={{ fontSize: 11.5, fontWeight: 700, fill: '#0f1f3d' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="legend-inline">
        <li><span style={{ background: '#1d63f0' }} />Completed</li>
        <li><span style={{ background: '#a9c8fa' }} />In Progress</li>
        <li><span style={{ background: '#e5322d' }} />Issues</li>
      </ul>
    </Panel>
  );
}
