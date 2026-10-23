import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from 'recharts';
import Panel, { SelectControl } from './Panel.jsx';
import { shiftCoverageByRange } from '../data/mockData.js';

const COLORS = { completed: '#1d63f0', inProgress: '#8fbaff', missed: '#e5322d' };
const OPTIONS = Object.entries(shiftCoverageByRange).map(([value, v]) => ({ value, label: v.label }));

function TotalLabel({ x, y, width, index, data }) {
  const row = data[index];
  if (!row) return null;
  return (
    <text x={x + width / 2} y={y - 6} textAnchor="middle" fontSize={11} fontWeight={600} fill="#14213d">
      {row.total}
    </text>
  );
}

export default function ShiftCoverageChart() {
  const [range, setRange] = useState('week');
  const { data } = shiftCoverageByRange[range];

  return (
    <Panel
      icon={BarChart3}
      title="Shift Coverage"
      action={<SelectControl label="Shift coverage range" value={range} onChange={setRange} options={OPTIONS} />}
    >
      <div className="chart-box chart-box--bars">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 22, right: 4, left: 4, bottom: 0 }} barCategoryGap="22%">
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7a96' }} />
            <YAxis hide domain={[0, 200]} />
            <Tooltip
              cursor={{ fill: 'rgba(29,99,240,0.06)' }}
              contentStyle={{ borderRadius: 8, border: '1px solid #e3e9f2', fontSize: 12 }}
            />
            <Bar dataKey="completed" name="Completed" stackId="s" fill={COLORS.completed} isAnimationActive={false} />
            <Bar dataKey="inProgress" name="In Progress" stackId="s" fill={COLORS.inProgress} isAnimationActive={false} />
            <Bar dataKey="missed" name="Missed" stackId="s" fill={COLORS.missed} radius={[3, 3, 0, 0]} isAnimationActive={false}>
              <LabelList content={(props) => <TotalLabel {...props} data={data} />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="legend-inline">
        <li><span style={{ background: COLORS.completed }} /> Completed</li>
        <li><span style={{ background: COLORS.inProgress }} /> In Progress</li>
        <li><span style={{ background: COLORS.missed }} /> Missed</li>
      </ul>
    </Panel>
  );
}
