import { useState } from 'react';
import { AlertTriangle, ArrowUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Panel, { SelectControl } from './Panel.jsx';
import { incidentsByRange } from '../data/mockData.js';

const OPTIONS = Object.entries(incidentsByRange).map(([value, v]) => ({ value, label: v.label }));

export default function IncidentsChart() {
  const [range, setRange] = useState('7');
  const current = incidentsByRange[range];

  return (
    <Panel
      icon={AlertTriangle}
      tone="red"
      title="Incidents Overview"
      action={<SelectControl label="Incidents range" value={range} onChange={setRange} options={OPTIONS} />}
    >
      <div className="incidents">
        <div className="chart-box chart-box--line">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={current.data} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="incidentFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1d63f0" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#1d63f0" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#e8edf5" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: '#6b7a96' }}
                interval="preserveStartEnd"
                minTickGap={6}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: '#6b7a96' }}
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                allowDecimals={false}
              />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e3e9f2', fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="value"
                name="Incidents"
                stroke="#1d63f0"
                strokeWidth={2}
                fill="url(#incidentFill)"
                dot={{ r: 3, fill: '#1d63f0', stroke: '#1d63f0' }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="incidents__summary">
          <div className="incidents__total">
            <strong>{current.total}</strong>
            <span className="trend trend--bad">
              <ArrowUp size={11} aria-hidden="true" />
              {current.change.replace('+', '')}
            </span>
          </div>
          <p className="incidents__caption">Total incidents</p>
          <ul className="legend-list legend-list--compact">
            {current.breakdown.map((b) => (
              <li key={b.name}>
                <span className="legend-list__dot" style={{ background: b.color }} />
                <span className="legend-list__name">{b.name}</span>
                <span className="legend-list__value">{b.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
