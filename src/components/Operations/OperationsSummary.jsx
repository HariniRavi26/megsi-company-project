import StatCard from '../StatCard.jsx';

export default function OperationsSummary({ store, open }) {
  const { ops, deployments, shifts, issues, tasks, deployed } = store;
  const openTasks = tasks.filter((t) => t.status === 'Open');
  const cards = [
    { id: 1, icon: 'users', tone: 'blue', label: 'Active Operations', value: 36, trend: '+12%', sub: 'vs last 7 days',
      list: { title: 'Active Operations', rows: ops, cols: [['Operation', 'op'], ['Site', 'site'], ['Guard', 'guard'], ['Start', 'start'], ['Status', 'status', 'badge']], rowKind: 'op' } },
    { id: 2, icon: 'building', tone: 'purple', label: 'Sites in Operation', value: 68, trend: '+6%', sub: '62 active sites',
      list: { title: 'Sites in Operation (today’s deployment)', rows: deployments, cols: [['Site', 'site'], ['Scheduled', 'scheduled'], ['Deployed', 'deployed'], ['Status', 'status', 'badge']], rowKind: 'dep' } },
    { id: 3, icon: 'user', tone: 'green', label: 'Guards Deployed', value: 312 + deployed.length, trend: '+4%', sub: '298 on duty today',
      list: { title: 'Guards Deployed', rows: [...deployed.map((d) => ({ id: `d${d.id}`, guard: d.guard, site: d.site, since: d.time })), ...ops.map((o) => ({ id: `o${o.id}`, guard: o.guard, site: o.site, since: o.start }))],
        cols: [['Guard', 'guard'], ['Site', 'site'], ['Since', 'since']] } },
    { id: 4, icon: 'calendar', tone: 'blue', label: 'Shifts Running', value: 168 + shifts.filter((s) => s.added).length, trend: '+8%', sub: 'Total: 1,248 shifts',
      list: { title: 'Shifts Running', rows: shifts, cols: [['Guard', 'guard'], ['Site', 'site'], ['Date', 'date'], ['Start', 'start'], ['End', 'end']] } },
    { id: 5, icon: 'alert', tone: 'red', label: 'Operational Issues', value: issues.length, trend: '-37%', trendDir: 'down', sub: 'vs last 7 days',
      list: { title: 'Operational Issues', rows: issues, cols: [['Reported', 'when'], ['Category', 'cat'], ['Site', 'site'], ['Severity', 'sev', 'badge'], ['Description', 'desc']] } },
    { id: 6, icon: 'file', tone: 'orange', label: 'Tasks Pending', value: openTasks.length, sub: '3 overdue', subTone: 'danger',
      list: { title: 'Tasks Pending', rows: openTasks, cols: [['Task', 'task'], ['Assigned To', 'who'], ['Due', 'due'], ['Priority', 'priority', 'badge']], rowKind: 'task' } },
  ];
  return (
    <section className="grid grid--kpi" aria-label="Operations key metrics">
      {cards.map(({ list, ...item }) => (
        <div key={item.id} className="stat-click" role="button" tabIndex={0} aria-label={`${item.label}: ${item.value}. Open details`}
          onClick={() => open({ kind: 'table', ...list })}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open({ kind: 'table', ...list }))}>
          <StatCard item={item} />
        </div>
      ))}
    </section>
  );
}
