import { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Panel, { SelectControl } from './Panel.jsx';
import { attendanceByRange } from '../data/mockData.js';

const OPTIONS = Object.entries(attendanceByRange).map(([value, v]) => ({ value, label: v.label }));

export default function AttendanceChart() {
  const [range, setRange] = useState('14');
  const current = attendanceByRange[range];

  return (
    <Panel
      icon={CalendarCheck}
      title="Guard Attendance"
      action={<SelectControl label="Attendance range" value={range} onChange={setRange} options={OPTIONS} />}
    >
      <div className="attendance">
        <div className="donut" role="img" aria-label={`On-time rate ${current.rate}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={current.items}
                dataKey="value"
                nameKey="name"
                innerRadius="70%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke="#fff"
                strokeWidth={1}
                isAnimationActive={false}
              >
                {current.items.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="donut__center">
            <strong>{current.rate}</strong>
            <span>On-time rate</span>
          </div>
        </div>

        <ul className="legend-list">
          {current.items.map((item) => (
            <li key={item.name}>
              <span className="legend-list__dot" style={{ background: item.color }} />
              <span className="legend-list__name">{item.name}</span>
              <span className="legend-list__value">{item.value.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
