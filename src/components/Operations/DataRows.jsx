import { AVATAR_COLORS } from '../../data/operationsMockData.js';
import StatusBadge from '../StatusBadge.jsx';

export const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);
export const Person = ({ name }) => (
  <span className="person">
    <span className="avatar avatar--sm" style={{ background: AVATAR_COLORS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 5] }} aria-hidden="true">{initials(name)}</span>
    {name}
  </span>
);
// Clickable table used by every Operations panel and list modal.
export function DataTable({ columns, rows, onRow, className = '' }) {
  return (
    <div className={`table-scroll ${className}`}>
      <table className="tbl tbl--click">
        <thead><tr>{columns.map((c) => <th key={c.h} className={c.cls}>{c.h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id ?? i} tabIndex={onRow ? 0 : undefined} onClick={() => onRow?.(r)} onKeyDown={(e) => e.key === 'Enter' && onRow?.(r)}>
              {columns.map((c) => <td key={c.h} className={c.cls}>{c.cell ? c.cell(r, i) : r[c.k]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export const badge = (k) => (r) => <StatusBadge status={r[k]} />;
