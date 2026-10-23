import { useEffect, useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, CalendarDays, CheckCircle2, Clock3, Download, Footprints,
  MapPin, Play, Plus, Route, ShieldAlert, ShieldCheck, UserRound, UserRoundPlus, X, Zap,
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import Panel, { ViewAllButton } from '../components/Panel.jsx';
import { InteractiveMap } from '../components/Operations/OperationsMap.jsx';
import { MAP_PINS, GUARDS, SITES } from '../data/operationsMockData.js';

const initialPatrols = [
  { id: 1, date: '20 Oct 2026 13:45', guard: 'Daniel Scott', site: 'Manchester', route: 'Main Gate Route', status: 'Completed', findings: 'All clear' },
  { id: 2, date: '20 Oct 2026 12:30', guard: 'Olivia Brown', site: 'Salford', route: 'Building A Route', status: 'Completed', findings: 'All clear' },
  { id: 3, date: '20 Oct 2026 11:15', guard: 'James Carter', site: 'Liverpool', route: 'Perimeter Route', status: 'Completed', findings: 'No issues' },
  { id: 4, date: '20 Oct 2026 10:00', guard: 'Priya Sharma', site: 'Birmingham', route: 'Car Park Route', status: 'Missed', findings: 'Not checked in' },
  { id: 5, date: '20 Oct 2026 08:45', guard: 'Michael Reed', site: 'Leeds', route: 'Office Block Route', status: 'Completed', findings: 'All clear' },
];
const performance = [
  { guard: 'Daniel Scott', total: 12, completed: 12, missed: 0 },
  { guard: 'Olivia Brown', total: 11, completed: 10, missed: 1 },
  { guard: 'James Carter', total: 10, completed: 10, missed: 0 },
  { guard: 'Priya Sharma', total: 8, completed: 6, missed: 2 },
  { guard: 'Michael Reed', total: 7, completed: 7, missed: 0 },
];
const upcomingSeed = [
  { date: '20 Oct 2026 16:00', guard: 'Daniel Scott', site: 'Manchester', route: 'Main Gate Route' },
  { date: '20 Oct 2026 17:00', guard: 'Olivia Brown', site: 'Salford', route: 'Building A Route' },
  { date: '20 Oct 2026 18:00', guard: 'James Carter', site: 'Liverpool', route: 'Perimeter Route' },
  { date: '20 Oct 2026 19:00', guard: 'Priya Sharma', site: 'Birmingham', route: 'Car Park Route' },
  { date: '20 Oct 2026 20:00', guard: 'Michael Reed', site: 'Leeds', route: 'Office Block Route' },
];
const trend7 = [
  { day: '14 Oct', completed: 24, missed: 9 }, { day: '15 Oct', completed: 32, missed: 13 },
  { day: '16 Oct', completed: 30, missed: 13 }, { day: '17 Oct', completed: 37, missed: 13 },
  { day: '18 Oct', completed: 30, missed: 13 }, { day: '19 Oct', completed: 32, missed: 12 },
  { day: '20 Oct', completed: 40, missed: 21 },
];
const siteData = [{ site: 'Manchester', total: 12 }, { site: 'Salford', total: 10 }, { site: 'Liverpool', total: 8 }, { site: 'Birmingham', total: 7 }, { site: 'Leeds', total: 6 }];
const loadSaved = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

function Metric({ icon: Icon, color, title, value, trend, note, down = false }) {
  return <article className="patrol-metric"><div className={`patrol-metric__icon ${color}`}><Icon size={27} fill="currentColor" strokeWidth={2.3} /></div><div className="patrol-metric__copy"><span>{title}</span><strong>{value}</strong><small className={down ? 'is-down' : 'is-up'}>{trend}</small><p>{note}</p></div></article>;
}
function Badge({ status }) { return <span className={`patrol-badge ${status.toLowerCase().replaceAll(' ', '-')}`}><i />{status}</span>; }
function Action({ icon: Icon, children, onClick, danger = false }) { return <button className={`patrol-action${danger ? ' patrol-action--danger' : ''}`} onClick={onClick} type="button"><Icon size={22} fill={Icon === Play ? 'currentColor' : 'none'} /><span>{children}</span></button>; }

export default function Patrols() {
  const [patrols, setPatrols] = useState(() => loadSaved('megsi-patrols', initialPatrols));
  const [upcoming, setUpcoming] = useState(() => loadSaved('megsi-upcoming-patrols', upcomingSeed));
  const [activities, setActivities] = useState(() => loadSaved('megsi-patrol-activities', ['Patrol completed at Main Gate', 'Route assigned to Daniel Scott', 'Guard check-in recorded at Car Park']));
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [range, setRange] = useState('7');
  const [siteRange, setSiteRange] = useState('week');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ guard: GUARDS[0], site: SITES[0], route: 'Main Gate Route', date: '2026-10-20', time: '16:00', findings: '', incident: 'Safety concern' });
  useEffect(() => { localStorage.setItem('megsi-patrols', JSON.stringify(patrols)); }, [patrols]);
  useEffect(() => { localStorage.setItem('megsi-upcoming-patrols', JSON.stringify(upcoming)); }, [upcoming]);
  useEffect(() => { localStorage.setItem('megsi-patrol-activities', JSON.stringify(activities)); }, [activities]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 3200); return () => clearTimeout(t); }, [toast]);
  const visiblePatrols = useMemo(() => patrols.filter(p => (filter === 'All' || p.status === filter) && `${p.guard} ${p.site} ${p.route}`.toLowerCase().includes(search.toLowerCase())), [patrols, filter, search]);
  const pins = MAP_PINS.map(p => ({ ...p, guards: 2, status: 'Active' }));
  const openForm = (kind) => setModal(kind);
  const addActivity = (message) => setActivities(a => [message, ...a].slice(0, 8));
  const submit = (e) => {
    e.preventDefault();
    const dateLabel = new Date(`${form.date}T12:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    if (modal === 'schedule') {
      setUpcoming(u => [{ date: `${dateLabel} ${form.time}`, guard: form.guard, site: form.site, route: form.route }, ...u]);
      addActivity(`New patrol scheduled for ${form.guard} at ${form.site}`); setToast('Patrol scheduled successfully');
    } else if (modal === 'start') {
      setPatrols(p => [{ id: Date.now(), date: `${dateLabel} ${form.time}`, guard: form.guard, site: form.site, route: form.route, status: 'In Progress', findings: 'Patrol started' }, ...p]);
      addActivity(`Patrol started: ${form.route} — ${form.guard}`); setToast('Patrol started successfully');
    } else if (modal === 'assign') {
      setUpcoming(u => [{ date: `${dateLabel} ${form.time}`, guard: form.guard, site: form.site, route: form.route }, ...u]);
      addActivity(`${form.guard} assigned to ${form.site}`); setToast('Guard assigned successfully');
    } else if (modal === 'incident') {
      setPatrols(p => [{ id: Date.now(), date: `${dateLabel} ${form.time}`, guard: form.guard, site: form.site, route: form.route, status: 'Incident', findings: form.incident }, ...p]);
      addActivity(`Incident logged at ${form.site}: ${form.incident}`); setToast('Incident logged successfully');
    }
    setModal(null);
  };
  const exportCsv = () => {
    const rows = [['Date & Time', 'Guard', 'Site', 'Route', 'Status', 'Findings'], ...visiblePatrols.map(p => [p.date, p.guard, p.site, p.route, p.status, p.findings])];
    const csv = rows.map(r => r.map(v => `"${String(v ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); const a = document.createElement('a'); a.href = url; a.download = 'megsi-patrols.csv'; a.click(); URL.revokeObjectURL(url); setToast('Patrol data exported');
  };
  const markCompleted = (p) => { setPatrols(list => list.map(x => x.id === p.id ? { ...x, status: 'Completed', findings: x.findings === 'Patrol started' ? 'All clear' : x.findings } : x)); addActivity(`Patrol marked completed: ${p.route}`); setToast('Patrol marked completed'); };
  const modalTitle = ({ schedule: 'Schedule Patrol', start: 'Start Patrol', assign: 'Assign Guard', incident: 'Log Patrol Incident' })[modal];
  return <div className="dashboard patrols-page">
    <section className="patrols-heading"><div><nav className="breadcrumb"><Footprints size={12}/><span>Patrols</span></nav><h1>Patrols</h1><p>Monitor guard patrols, track routes, and ensure site security coverage.</p></div><button className="datetime datetime--btn" type="button" onClick={() => setToast('Current reporting date: 20 Oct 2026')}><CalendarDays size={16}/><span>Tue, 20 Oct 2026</span><strong>14:30</strong></button></section>
    <section className="patrol-metrics" aria-label="Patrol summary">
      <Metric icon={UserRound} color="blue" title="Total Patrols" value={48 + patrols.length - initialPatrols.length} trend="↑ +12%" note="vs last week" />
      <Metric icon={Clock3} color="purple" title="Completed Patrols" value={46 + patrols.filter(p => p.status === 'Completed').length - initialPatrols.filter(p => p.status === 'Completed').length} trend="↑ +15%" note="vs last week" />
      <Metric icon={AlertTriangle} color="green" title="Missed Patrols" value={patrols.filter(p => p.status === 'Missed').length + 1} trend="↓ -60%" note="vs last week" down />
      <Metric icon={Route} color="orange" title="Active Routes" value="8" trend="↑ +14%" note="vs last week" />
      <Metric icon={Clock3} color="blue" title="Avg. Patrol Duration" value="42 min" trend="↑ +8%" note="vs last week" />
      <Metric icon={ShieldAlert} color="red" title="Incidents Found" value={3 + patrols.filter(p => p.status === 'Incident').length} trend="↑ +50%" note="vs last week" />
    </section>
    <section className="grid grid--analytics patrol-grid-top">
      <Panel icon={Activity} title="Patrols Overview" action={<label className="patrol-select"><span className="sr-only">Chart range</span><select value={range} onChange={e => setRange(e.target.value)}><option value="7">Last 7 Days</option><option value="14">Last 14 Days</option><option value="30">Last 30 Days</option></select></label>}>
        <div className="patrol-line-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend7} margin={{ top: 8, right: 10, left: -12, bottom: 0 }}><CartesianGrid stroke="#e2ecf8" vertical /><XAxis dataKey="day" tick={{ fontSize: 10, fill: '#153a83' }} axisLine={false} tickLine={false}/><YAxis domain={[0, 50]} ticks={[0,10,20,30,40,50]} tick={{ fontSize: 10, fill: '#153a83' }} axisLine={false} tickLine={false}/><Tooltip/><Line type="monotone" dataKey="completed" name="Completed" stroke="#0869f7" strokeWidth={2} dot={{ r: 3, fill: '#0869f7' }} activeDot={{ r: 5 }}/><Line type="monotone" dataKey="missed" name="Missed" stroke="#8b2cff" strokeWidth={2} dot={{ r: 3, fill: '#8b2cff' }}/></LineChart></ResponsiveContainer></div><div className="patrol-legend"><span><i className="blue-dot"/>Completed</span><span><i className="purple-dot"/>Missed</span></div>
      </Panel>
      <Panel icon={Activity} title="Patrol Status"><div className="patrol-status-wrap"><div className="patrol-donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{name:'Completed',value:46},{name:'Missed',value:2}]} dataKey="value" innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270} stroke="#fff" strokeWidth={1} isAnimationActive={false}><Cell fill="#0869f7"/><Cell fill="#ef3038"/></Pie></PieChart></ResponsiveContainer><div className="patrol-donut__center"><strong>48</strong><span>Total Patrols</span></div></div><div className="patrol-status-legend"><div><i className="blue-dot"/><span>Completed</span><b>46</b><small>95.8%</small></div><div><i className="red-dot"/><span>Missed</span><b>2</b><small>4.2%</small></div></div></div></Panel>
      <Panel icon={Activity} title="Patrols by Site" action={<label className="patrol-select"><span className="sr-only">Site chart range</span><select value={siteRange} onChange={e => setSiteRange(e.target.value)}><option value="week">This Week</option><option value="month">This Month</option></select></label>}><div className="patrol-site-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={siteData.map(x => ({ ...x, total: siteRange === 'month' ? x.total * 4 : x.total }))} margin={{ top: 12, right: 4, left: -16, bottom: 0 }}><CartesianGrid stroke="#e2ecf8" vertical={false}/><XAxis dataKey="site" tick={{ fontSize: 9, fill: '#153a83' }} axisLine={false} tickLine={false}/><YAxis domain={[0, siteRange === 'month' ? 60 : 15]} tick={{ fontSize: 10, fill: '#153a83' }} axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="total" fill="#0869f7" radius={[2,2,0,0]} maxBarSize={40} label={{ position: 'top', fill: '#153a83', fontSize: 10 }}/></BarChart></ResponsiveContainer></div></Panel>
    </section>
    <section className="grid patrol-grid-mid">
      <Panel icon={UserRound} title="Recent Patrols" action={<div className="patrol-table-actions"><select aria-label="Filter patrol status" value={filter} onChange={e => setFilter(e.target.value)}><option>All</option><option>Completed</option><option>Missed</option><option>In Progress</option><option>Incident</option></select><button className="btn-outline btn-outline--sm" onClick={() => openForm('schedule')} type="button">Add Patrol</button></div>}>
        <div className="patrol-table-tools"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search guard, site or route…" aria-label="Search patrols"/><button className="btn-outline btn-outline--sm" onClick={exportCsv} type="button"><Download size={13}/> Export</button></div>
        <div className="patrol-table-scroll"><table className="tbl patrol-table"><thead><tr><th>#</th><th>Date &amp; Time</th><th>Guard Name</th><th>Site</th><th>Route</th><th>Status</th><th>Findings</th><th>Action</th></tr></thead><tbody>{visiblePatrols.slice(0, 8).map((p, i) => <tr key={p.id}><td>{i + 1}</td><td>{p.date}</td><td>{p.guard}</td><td>{p.site}</td><td>{p.route}</td><td><Badge status={p.status}/></td><td>{p.findings}</td><td>{p.status === 'In Progress' ? <button className="patrol-mini-btn" onClick={() => markCompleted(p)} type="button">Complete</button> : <button className="patrol-mini-btn" onClick={() => setToast(`${p.route}: ${p.findings}`)} type="button">Details</button>}</td></tr>)}</tbody></table>{visiblePatrols.length === 0 && <p className="patrol-empty">No patrols match your search.</p>}</div>
      </Panel>
      <Panel icon={Clock3} title="Patrol Locations" action={<ViewAllButton onClick={() => setToast('Select any map pin to view site details.')} />}><InteractiveMap pins={pins} onDetails={p => setToast(`${p.site} — ${p.addr}`)} /></Panel>
    </section>
    <section className="grid patrol-grid-bottom">
      <Panel icon={UserRound} title="Guard Performance" action={<ViewAllButton onClick={() => setToast('Showing all guard performance records.')} />}><div className="patrol-table-scroll"><table className="tbl patrol-table"><thead><tr><th>#</th><th>Guard Name</th><th>Total Patrols</th><th>Completed</th><th>Missed</th><th>Completion Rate</th></tr></thead><tbody>{performance.map((g,i) => <tr key={g.guard}><td>{i+1}</td><td>{g.guard}</td><td>{g.total}</td><td>{g.completed}</td><td>{g.missed}</td><td><div className="patrol-progress"><span>{Math.round(g.completed/g.total*100)}%</span><i><b style={{width:`${g.completed/g.total*100}%`}}/></i></div></td></tr>)}</tbody></table></div></Panel>
      <Panel icon={Clock3} title="Upcoming Patrols" action={<ViewAllButton onClick={() => setToast(`${upcoming.length} patrols scheduled.`)} />}><div className="patrol-table-scroll"><table className="tbl patrol-table"><thead><tr><th>Date &amp; Time</th><th>Guard Name</th><th>Site</th><th>Route</th></tr></thead><tbody>{upcoming.slice(0, 6).map((p,i)=><tr key={`${p.date}-${p.guard}-${i}`}><td>{p.date}</td><td>{p.guard}</td><td>{p.site}</td><td>{p.route}</td></tr>)}</tbody></table></div></Panel>
      <Panel icon={Zap} title="Quick Actions"><div className="patrol-actions-grid"><Action icon={Play} onClick={() => openForm('start')}>Start Patrol</Action><Action icon={MapPin} onClick={() => setToast('Map is interactive: select a pin for site details.')}>View Patrol Routes</Action><Action icon={UserRoundPlus} onClick={() => openForm('assign')}>Assign Guard</Action><Action icon={AlertTriangle} danger onClick={() => openForm('incident')}>Log Incident</Action><Action icon={CalendarDays} onClick={() => openForm('schedule')}>Schedule Patrol</Action><Action icon={Download} onClick={exportCsv}>Export Patrol Data</Action></div><div className="patrol-activity-mini"><strong>Recent Activity</strong>{activities.slice(0,3).map((a,i)=><p key={`${a}-${i}`}><CheckCircle2 size={13}/>{a}</p>)}</div></Panel>
    </section>
    {modal && <div className="patrol-modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && setModal(null)}><section className="patrol-modal" role="dialog" aria-modal="true" aria-labelledby="patrol-modal-title"><header><h2 id="patrol-modal-title">{modalTitle}</h2><button type="button" onClick={() => setModal(null)} aria-label="Close dialog"><X size={18}/></button></header><form onSubmit={submit}><label>Guard<select required value={form.guard} onChange={e => setForm({...form,guard:e.target.value})}>{GUARDS.map(g=><option key={g}>{g}</option>)}</select></label><label>Site<select required value={form.site} onChange={e => setForm({...form,site:e.target.value})}>{[...SITES,'Manchester','Salford','Liverpool','Birmingham','Leeds'].filter((v,i,a)=>a.indexOf(v)===i).map(s=><option key={s}>{s}</option>)}</select></label><label>Route<input required value={form.route} onChange={e => setForm({...form,route:e.target.value})}/></label><div className="patrol-form-row"><label>Date<input type="date" required value={form.date} onChange={e => setForm({...form,date:e.target.value})}/></label><label>Time<input type="time" required value={form.time} onChange={e => setForm({...form,time:e.target.value})}/></label></div>{modal==='incident' && <label>Incident details<input required value={form.incident} onChange={e => setForm({...form,incident:e.target.value})} placeholder="Describe the issue"/></label>}<footer><button type="button" className="btn-outline" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="patrol-submit">{modal==='start'?'Start Patrol':modal==='incident'?'Log Incident':modal==='assign'?'Assign Guard':'Save Patrol'}</button></footer></form></section></div>}
    {toast && <div className="toast" role="status"><CheckCircle2 size={18}/><span>{toast}</span><button onClick={() => setToast('')} aria-label="Dismiss message"><X size={14}/></button></div>}
  </div>;
}
