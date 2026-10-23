// Operations page mock data. Kept separate from the Dashboard's mockData.js.
export const GUARDS = ['Michael Reed', 'Daniel Scott', 'Olivia Brown', 'James Carter', 'Priya Sharma'];
export const SITES = ['Main Entrance', 'Car Park', 'Service Entrance', 'Office Block', 'Delivery Gate'];
export const AVATAR_COLORS = ['#1d63f0', '#7d2ae8', '#12a150', '#f59e0b', '#e5322d'];

export const initialOps = [
  { id: 1, op: 'Site Patrol', site: 'Main Entrance', guard: 'Michael Reed', start: '08:00', status: 'On Going' },
  { id: 2, op: 'Access Control', site: 'Car Park', guard: 'Daniel Scott', start: '08:00', status: 'On Going' },
  { id: 3, op: 'Perimeter Check', site: 'Service Entrance', guard: 'Olivia Brown', start: '09:00', status: 'On Going' },
  { id: 4, op: 'Key Holding', site: 'Office Block', guard: 'James Carter', start: '09:30', status: 'In Progress' },
  { id: 5, op: 'Incident Follow-up', site: 'Delivery Gate', guard: 'Priya Sharma', start: '10:00', status: 'In Progress' },
];
export const initialDeployments = [
  { id: 1, site: 'Main Entrance', scheduled: 6, deployed: 6, status: 'Active' },
  { id: 2, site: 'Car Park', scheduled: 4, deployed: 4, status: 'Active' },
  { id: 3, site: 'Service Entrance', scheduled: 3, deployed: 3, status: 'Active' },
  { id: 4, site: 'Office Block', scheduled: 6, deployed: 5, status: 'At Risk' },
  { id: 5, site: 'Delivery Gate', scheduled: 2, deployed: 2, status: 'Active' },
];
export const initialRecent = [
  { id: 1, when: '20 Oct 2026 13:45', op: 'Site Patrol', site: 'Main Entrance', result: 'Completed' },
  { id: 2, when: '20 Oct 2026 12:30', op: 'Access Control', site: 'Car Park', result: 'Completed' },
  { id: 3, when: '19 Oct 2026 17:20', op: 'Perimeter Check', site: 'Service Entrance', result: 'Completed' },
  { id: 4, when: '19 Oct 2026 15:10', op: 'Incident Follow-up', site: 'Delivery Gate', result: 'Resolved' },
  { id: 5, when: '18 Oct 2026 11:05', op: 'Key Holding', site: 'Office Block', result: 'Completed' },
];

export const PROGRESS_META = [
  { name: 'Site Checks', color: '#12a150' },
  { name: 'Patrols', color: '#1d63f0' },
  { name: 'Access Control', color: '#1d63f0' },
  { name: 'Incident Follow-up', color: '#f59e0b' },
  { name: 'Reports', color: '#1d63f0' },
];
const listed = [
  ['Check CCTV Coverage', 'Michael Reed', '20 Oct 2026', 'High', 'Site Checks'],
  ['Update Site Log', 'Daniel Scott', '20 Oct 2026', 'Medium', 'Reports'],
  ['Investigate Access Alert', 'Olivia Brown', '21 Oct 2026', 'High', 'Access Control'],
  ['Verify Patrol Route', 'James Carter', '21 Oct 2026', 'Medium', 'Patrols'],
  ['Submit Operation Report', 'Priya Sharma', '22 Oct 2026', 'Low', 'Reports'],
];
const fillerNames = ['Review shift handover notes', 'Inspect fire exits', 'Calibrate guard tour tags', 'Audit visitor log', 'Replace radio batteries', 'Check perimeter lighting', 'Reconcile keyholding register', 'Confirm contractor access'];
// 5 tasks shown in the panel + 22 further open tasks = 27 pending (matches the summary card).
export const initialTasks = [
  ...listed.map(([task, who, due, priority, cat], i) => ({ id: i + 1, task, who, due, priority, cat, status: 'Open', listed: true })),
  ...Array.from({ length: 22 }, (_, i) => ({
    id: 6 + i, task: fillerNames[i % 8], who: GUARDS[i % 5], due: `${23 + (i % 8)} Oct 2026`,
    priority: ['Medium', 'Low', 'High'][i % 3], cat: PROGRESS_META[i % 5].name, status: 'Open', listed: false,
  })),
];
export const initialActivities = [
  { id: 1, type: 'deploy', text: 'Shift deployed at Main Entrance', when: '20 Oct 2026 14:20' },
  { id: 2, type: 'update', text: 'Operation updated (Car Park)', when: '20 Oct 2026 13:10' },
  { id: 3, type: 'done', text: 'Task completed (Site Patrol)', when: '20 Oct 2026 12:45' },
  { id: 4, type: 'issue', text: 'Operational issue reported (Office Block)', when: '19 Oct 2026 16:30' },
  { id: 5, type: 'closed', text: 'Operation closed (Incident Follow-up)', when: '19 Oct 2026 15:25' },
];
export const initialIssues = [
  { id: 1, cat: 'Staffing gap', site: 'Office Block', sev: 'High', desc: 'One guard short on the day shift.', when: '19 Oct 2026 16:30' },
  { id: 2, cat: 'Equipment fault', site: 'Car Park', sev: 'Medium', desc: 'Barrier arm sensor intermittent.', when: '19 Oct 2026 09:10' },
  { id: 3, cat: 'Access breach', site: 'Service Entrance', sev: 'High', desc: 'Door held open during deliveries.', when: '18 Oct 2026 20:45' },
  { id: 4, cat: 'Safety hazard', site: 'Delivery Gate', sev: 'Low', desc: 'Wet floor near loading bay.', when: '17 Oct 2026 13:20' },
  { id: 5, cat: 'Equipment fault', site: 'Main Entrance', sev: 'Low', desc: 'CCTV camera 3 out of focus.', when: '16 Oct 2026 11:05' },
];
export const initialShifts = initialOps.map((o, i) => ({ id: i + 1, guard: o.guard, site: o.site, date: '20 Oct 2026', start: o.start, end: i < 3 ? '16:00' : '18:00', added: false }));

export const STATUS_META = [
  { name: 'On Track', color: '#12a150' },
  { name: 'In Progress', color: '#f59e0b' },
  { name: 'At Risk', color: '#e5322d' },
  { name: 'Not Started', color: '#a9a4c9' },
];
export const STATUS_BY_RANGE = {
  today: { label: 'Today', values: [88.1, 7.4, 3.2, 1.3] },
  week: { label: 'This Week', values: [86.4, 8.3, 3.1, 2.2] },
  month: { label: 'This Month', values: [84.9, 9.2, 3.9, 2.0] },
};
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mk = (c, p, i) => days.map((day, n) => ({ day, completed: c[n], progress: p[n], issues: i[n], total: c[n] + p[n] }));
export const TREND_BY_RANGE = {
  last7: { label: 'Last 7 Days', data: mk([24, 26, 27, 30, 26, 25, 29], [6, 6, 7, 6, 7, 6, 7], [1, 0, 1, 0, 2, 0, 1]) },
  week: { label: 'This Week', data: mk([22, 25, 27, 29, 27, 24, 28], [6, 6, 6, 7, 6, 6, 7], [0, 1, 1, 0, 1, 0, 2]) },
  month: { label: 'This Month', data: mk([26, 28, 30, 31, 29, 27, 31], [6, 6, 6, 7, 6, 6, 6], [1, 1, 0, 1, 1, 0, 1]) },
};
export const PROGRESS_BY_RANGE = {
  today: { label: 'Today', values: [95, 90, 86, 80, 92] },
  week: { label: 'This Week', values: [92, 88, 84, 76, 90] },
  month: { label: 'This Month', values: [90, 86, 82, 72, 88] },
};
// Pin positions are percentages of the schematic Manchester map.
export const MAP_PINS = [
  { site: 'Main Entrance', x: 63, y: 17, color: '#1d63f0', addr: '14 Deansgate, Manchester M3 2BW' },
  { site: 'Car Park', x: 52, y: 38, color: '#12a150', addr: '8 Quay Street, Manchester M3 3HN' },
  { site: 'Office Block', x: 85, y: 43, color: '#e5322d', addr: '120 Chapel Street, Salford M3 5DP' },
  { site: 'Service Entrance', x: 28, y: 80, color: '#7d2ae8', addr: '3 Trafford Road, Salford M5 3EQ' },
  { site: 'Delivery Gate', x: 80, y: 80, color: '#f59e0b', addr: '22 Ordsall Lane, Manchester M5 4RW' },
];
