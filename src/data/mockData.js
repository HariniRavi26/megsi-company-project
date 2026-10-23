// All dashboard data is mock data. Nothing here comes from a backend.

export const currentUser = {
  name: 'James Carter',
  firstName: 'James',
  role: 'Operations Manager',
  initials: 'JC',
  notifications: 8,
};

export const mockNow = {
  dateLabel: 'Tue, 20 Oct 2026',
  time: '14:30',
};

export const kpis = [
  {
    id: 'clients',
    label: 'Clients',
    value: '24',
    sub: '20 active clients',
    trend: '+9%',
    trendDir: 'up',
    icon: 'users',
    tone: 'blue',
  },
  {
    id: 'sites',
    label: 'Sites',
    value: '68',
    sub: '62 active sites',
    trend: '+6%',
    trendDir: 'up',
    icon: 'building',
    tone: 'purple',
  },
  {
    id: 'guards',
    label: 'Guards',
    value: '312',
    sub: '298 on duty today',
    trend: '+4%',
    trendDir: 'up',
    icon: 'user',
    tone: 'green',
  },
  {
    id: 'shifts',
    label: 'Total Shifts',
    value: '1,248',
    sub: 'Today: 168 shifts',
    trend: '+8%',
    trendDir: 'up',
    icon: 'calendar',
    tone: 'blue',
  },
  {
    id: 'incidents',
    label: 'Incidents',
    value: '12',
    sub: 'vs last month',
    trend: '+25%',
    trendDir: 'down',
    icon: 'alert',
    tone: 'red',
  },
  {
    id: 'invoices',
    label: 'Outstanding Invoices',
    value: '£8,450',
    sub: '3 overdue',
    subTone: 'danger',
    icon: 'file',
    tone: 'orange',
  },
];

export const quickActions = [
  {
    id: 'client',
    label: 'Add Client',
    icon: 'userPlus',
    title: 'Add Client',
    confirm: 'Client added (demo only, nothing was saved).',
    fields: [
      { name: 'name', label: 'Client name', type: 'text', placeholder: 'e.g. Riverside SC' },
      { name: 'contact', label: 'Contact email', type: 'email', placeholder: 'name@company.co.uk' },
      { name: 'type', label: 'Contract type', type: 'select', options: ['Manned Guarding', 'Mobile Patrol', 'Key Holding', 'Security Services'] },
    ],
  },
  {
    id: 'site',
    label: 'Add Site',
    icon: 'building',
    title: 'Add Site',
    confirm: 'Site added (demo only, nothing was saved).',
    fields: [
      { name: 'name', label: 'Site name', type: 'text', placeholder: 'e.g. Main Entrance' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Manchester' },
      { name: 'guards', label: 'Guards required', type: 'number', placeholder: '4' },
    ],
  },
  {
    id: 'guard',
    label: 'Add Guard',
    icon: 'userPlus',
    title: 'Add Guard',
    confirm: 'Guard added (demo only, nothing was saved).',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', placeholder: 'e.g. Michael Reed' },
      { name: 'badge', label: 'Badge number', type: 'text', placeholder: 'G-1130' },
      { name: 'site', label: 'Assigned site', type: 'select', options: ['Main Entrance', 'Car Park', 'Service Entrance', 'Delivery Gate', 'Office Block'] },
    ],
  },
  {
    id: 'shift',
    label: 'Create Shift',
    icon: 'calendarPlus',
    title: 'Create Shift',
    confirm: 'Shift created (demo only, nothing was saved).',
    fields: [
      { name: 'site', label: 'Site', type: 'select', options: ['Main Entrance', 'Car Park', 'Service Entrance', 'Delivery Gate', 'Office Block'] },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'time', label: 'Shift', type: 'select', options: ['08:00 – 16:00', '16:00 – 00:00', '00:00 – 08:00'] },
    ],
  },
  {
    id: 'incident',
    label: 'Log Incident',
    icon: 'alert',
    danger: true,
    title: 'Log Incident',
    confirm: 'Incident logged (demo only, nothing was saved).',
    fields: [
      { name: 'site', label: 'Site', type: 'select', options: ['Main Entrance', 'Car Park', 'Service Entrance', 'Delivery Gate', 'Office Block'] },
      { name: 'type', label: 'Incident type', type: 'select', options: ['Suspicious Activity', 'Vehicle Incident', 'Access Control', 'Theft Attempt', 'Health & Safety'] },
      { name: 'notes', label: 'Description', type: 'textarea', placeholder: 'Describe what happened...' },
    ],
  },
];

/* ---------- Charts ---------- */

export const attendanceByRange = {
  '14': {
    label: 'Last 14 Days',
    rate: '96.2%',
    items: [
      { name: 'On Time', value: 96.2, color: '#12a150' },
      { name: 'Late', value: 2.4, color: '#f5a30b' },
      { name: 'Absent', value: 1.0, color: '#e5322d' },
      { name: 'Not Scheduled', value: 0.4, color: '#9aa5b8' },
    ],
  },
  '7': {
    label: 'Last 7 Days',
    rate: '96.8%',
    items: [
      { name: 'On Time', value: 96.8, color: '#12a150' },
      { name: 'Late', value: 2.0, color: '#f5a30b' },
      { name: 'Absent', value: 0.9, color: '#e5322d' },
      { name: 'Not Scheduled', value: 0.3, color: '#9aa5b8' },
    ],
  },
  '30': {
    label: 'Last 30 Days',
    rate: '95.7%',
    items: [
      { name: 'On Time', value: 95.7, color: '#12a150' },
      { name: 'Late', value: 2.8, color: '#f5a30b' },
      { name: 'Absent', value: 1.1, color: '#e5322d' },
      { name: 'Not Scheduled', value: 0.4, color: '#9aa5b8' },
    ],
  },
};

const buildCoverage = (totals, inProgress, missed) =>
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
    day,
    total: totals[i],
    inProgress: inProgress[i],
    missed: missed[i],
    completed: totals[i] - inProgress[i] - missed[i],
  }));

export const shiftCoverageByRange = {
  week: {
    label: 'This Week',
    data: buildCoverage(
      [162, 168, 170, 168, 165, 158, 157],
      [18, 22, 24, 20, 19, 16, 15],
      [2, 1, 2, 1, 2, 3, 3],
    ),
  },
  lastWeek: {
    label: 'Last Week',
    data: buildCoverage(
      [160, 166, 169, 167, 164, 156, 155],
      [0, 0, 0, 0, 0, 0, 0],
      [3, 2, 2, 3, 2, 4, 3],
    ),
  },
};

export const incidentsByRange = {
  '7': {
    label: 'Last 7 Days',
    total: 12,
    change: '+25%',
    breakdown: [
      { name: 'Security Incident', value: 5, color: '#e5322d' },
      { name: 'Health & Safety', value: 3, color: '#f5820b' },
      { name: 'Access Control', value: 2, color: '#f5b50b' },
      { name: 'Other', value: 2, color: '#1d63f0' },
    ],
    data: [
      { label: '14 Oct', value: 1 },
      { label: '15 Oct', value: 2 },
      { label: '16 Oct', value: 1 },
      { label: '17 Oct', value: 3 },
      { label: '18 Oct', value: 2 },
      { label: '19 Oct', value: 1 },
      { label: '20 Oct', value: 2 },
    ],
  },
  '14': {
    label: 'Last 14 Days',
    total: 23,
    change: '+8%',
    breakdown: [
      { name: 'Security Incident', value: 9, color: '#e5322d' },
      { name: 'Health & Safety', value: 6, color: '#f5820b' },
      { name: 'Access Control', value: 4, color: '#f5b50b' },
      { name: 'Other', value: 4, color: '#1d63f0' },
    ],
    data: [
      { label: '7 Oct', value: 2 },
      { label: '8 Oct', value: 1 },
      { label: '9 Oct', value: 3 },
      { label: '10 Oct', value: 1 },
      { label: '11 Oct', value: 2 },
      { label: '12 Oct', value: 1 },
      { label: '13 Oct', value: 1 },
      { label: '14 Oct', value: 1 },
      { label: '15 Oct', value: 2 },
      { label: '16 Oct', value: 1 },
      { label: '17 Oct', value: 3 },
      { label: '18 Oct', value: 2 },
      { label: '19 Oct', value: 1 },
      { label: '20 Oct', value: 2 },
    ],
  },
};

/* ---------- Tables ---------- */

export const activeGuards = [
  { id: 1, name: 'Michael Reed', badge: 'G-1024', site: 'Main Entrance', shift: '08:00–16:00', status: 'On Duty', color: '#1d63f0' },
  { id: 2, name: 'Daniel Scott', badge: 'G-1045', site: 'Car Park', shift: '16:00–00:00', status: 'On Duty', color: '#7d2ae8' },
  { id: 3, name: 'Olivia Brown', badge: 'G-1078', site: 'Service Entrance', shift: '08:00–16:00', status: 'On Duty', color: '#d9467a' },
  { id: 4, name: 'James Carter', badge: 'G-1102', site: 'Office Block', shift: '00:00–08:00', status: 'On Duty', color: '#0e8f6e' },
  { id: 5, name: 'Priya Sharma', badge: 'G-1120', site: 'Delivery Gate', shift: '08:00–16:00', status: 'On Duty', color: '#e07b12' },
];

export const sitesStatus = [
  { id: 1, name: 'Main Entrance', location: 'Manchester', guards: 5, status: 'Active' },
  { id: 2, name: 'Car Park', location: 'Manchester', guards: 4, status: 'Active' },
  { id: 3, name: 'Service Entrance', location: 'Manchester', guards: 3, status: 'Active' },
  { id: 4, name: 'Delivery Gate', location: 'Manchester', guards: 2, status: 'Active' },
  { id: 5, name: 'Office Block', location: 'Manchester', guards: 6, status: 'On Hold' },
];

export const mapCenter = { lat: 53.4808, lng: -2.2426, zoom: 14 };

export const mapSites = [
  { id: 'car-park', name: 'Car Park', lat: 53.4893, lng: -2.2398, color: '#1d63f0', guards: 4, status: 'Active' },
  { id: 'main-entrance', name: 'Main Entrance', lat: 53.4838, lng: -2.2478, color: '#12a150', guards: 5, status: 'Active' },
  { id: 'office-block', name: 'Office Block', lat: 53.4818, lng: -2.2272, color: '#e5322d', guards: 6, status: 'On Hold' },
  { id: 'service-entrance', name: 'Service Entrance', lat: 53.4768, lng: -2.2562, color: '#7d2ae8', guards: 3, status: 'Active' },
  { id: 'delivery-gate', name: 'Delivery Gate', lat: 53.4722, lng: -2.2352, color: '#f59e0b', guards: 2, status: 'Active' },
];

export const recentIncidents = [
  { id: 1, date: '20 Oct 2026 14:25', site: 'Main Entrance', type: 'Suspicious Activity', status: 'Open' },
  { id: 2, date: '19 Oct 2026 10:12', site: 'Car Park', type: 'Vehicle Incident', status: 'Resolved' },
  { id: 3, date: '18 Oct 2026 22:40', site: 'Service Entrance', type: 'Access Control', status: 'Resolved' },
  { id: 4, date: '17 Oct 2026 16:15', site: 'Delivery Gate', type: 'Theft Attempt', status: 'Resolved' },
  { id: 5, date: '16 Oct 2026 09:30', site: 'Office Block', type: 'Health & Safety', status: 'Closed' },
];

export const contractRenewals = [
  { id: 1, client: 'Riverside SC', type: 'Manned Guarding', endDate: '01 Dec 2026', daysLeft: 42, status: 'Upcoming' },
  { id: 2, client: 'Green Park Ltd', type: 'Mobile Patrol', endDate: '15 Dec 2026', daysLeft: 56, status: 'Upcoming' },
  { id: 3, client: 'City Retail Group', type: 'Key Holding', endDate: '31 Dec 2026', daysLeft: 72, status: 'Upcoming' },
  { id: 4, client: 'LogiTech Plc', type: 'Security Services', endDate: '10 Jan 2027', daysLeft: 82, status: 'Normal' },
  { id: 5, client: 'Westfield Centre', type: 'Manned Guarding', endDate: '25 Jan 2027', daysLeft: 97, status: 'Normal' },
];

export const recentActivities = [
  { id: 1, icon: 'building', tone: 'green', text: 'John Smith added a new site (Car Park)', time: '20 Oct 2026 11:25' },
  { id: 2, icon: 'calendarCheck', tone: 'blue', text: 'Sarah Williams updated guard schedule', time: '20 Oct 2026 10:40' },
  { id: 3, icon: 'alert', tone: 'red', text: 'Incident #INC-1042 marked as resolved', time: '19 Oct 2026 16:20' },
  { id: 4, icon: 'userPlus', tone: 'green', text: 'New client contact added (Emma Taylor)', time: '19 Oct 2026 14:15' },
  { id: 5, icon: 'file', tone: 'blue', text: 'Invoice #INV-0064 generated', time: '19 Oct 2026 11:30' },
];
