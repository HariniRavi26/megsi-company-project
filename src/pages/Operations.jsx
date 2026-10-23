import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import OperationsHeader from '../components/Operations/OperationsHeader.jsx';
import OperationsSummary from '../components/Operations/OperationsSummary.jsx';
import OperationStatusChart from '../components/Operations/OperationStatusChart.jsx';
import OperationsTrendChart from '../components/Operations/OperationsTrendChart.jsx';
import TaskProgress from '../components/Operations/TaskProgress.jsx';
import LiveOperations from '../components/Operations/LiveOperations.jsx';
import TodaysDeployment from '../components/Operations/TodaysDeployment.jsx';
import OperationsMap from '../components/Operations/OperationsMap.jsx';
import RecentOperations from '../components/Operations/RecentOperations.jsx';
import OpenOperationalTasks from '../components/Operations/OpenOperationalTasks.jsx';
import OperationsActivities from '../components/Operations/OperationsActivities.jsx';
import OperationModals from '../components/Operations/OperationModals.jsx';
import { mockNow } from '../data/mockData.js';
import * as D from '../data/operationsMockData.js';

let uid = 1000;
const status = (d) => ({ ...d, status: d.deployed < d.scheduled ? 'At Risk' : 'Active' });
const fmtDate = (iso) => new Date(`${iso}T12:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function Operations() {
  const [clock, setClock] = useState(mockNow);
  const [ops, setOps] = useState(D.initialOps);
  const [deployments, setDeployments] = useState(D.initialDeployments);
  const [recent, setRecent] = useState(D.initialRecent);
  const [tasks, setTasks] = useState(D.initialTasks);
  const [activities, setActivities] = useState(D.initialActivities);
  const [issues, setIssues] = useState(D.initialIssues);
  const [shifts, setShifts] = useState(D.initialShifts);
  const [deployed, setDeployed] = useState([]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const closeModal = useCallback(() => setModal(null), []);
  const today = clock.dateLabel.replace(/^\w+, /, '');
  const addActivity = (text, type, time = clock.time) => setActivities((a) => [{ id: ++uid, text, type, when: `${today} ${time}` }, ...a]);

  const store = useMemo(() => ({
    ops, deployments, recent, tasks, activities, issues, shifts, deployed, clock, fmtDate,
    setClockFrom(iso, time) {
      const label = new Date(`${iso}T12:00`).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).replace(/^(\w+) /, '$1, ');
      setClock({ dateLabel: label, time });
      setToast('Date and time updated');
    },
    submit(form, v) {
      if (form === 'shift') {
        setShifts((s) => [{ id: ++uid, guard: v.guard, site: v.site, date: fmtDate(v.date), start: v.start, end: v.end, added: true }, ...s]);
        addActivity(`Shift assigned (${v.site})`, 'deploy', v.start); setToast('Shift assigned successfully');
      }
      if (form === 'deploy') {
        setDeployed((d) => [{ id: ++uid, guard: v.guard, site: v.site, time: v.time }, ...d]);
        setDeployments((l) => l.map((d) => (d.site === v.site && d.deployed < d.scheduled ? status({ ...d, deployed: d.deployed + 1 }) : d)));
        addActivity(`Shift deployed at ${v.site}`, 'deploy', v.time); setToast('Guard deployed successfully');
      }
      if (form === 'task') {
        setTasks((t) => [{ id: ++uid, task: v.task.trim(), who: v.who, due: fmtDate(v.due), priority: v.priority, cat: 'Site Checks', status: 'Open', listed: true }, ...t]);
        addActivity(`Task created (${v.task.trim()})`, 'update'); setToast('Task created successfully');
      }
      if (form === 'log') {
        setRecent((r) => [{ id: ++uid, when: `${today} ${v.time}`, op: v.type, site: v.site, result: 'Completed' }, ...r]);
        addActivity(`Operation logged (${v.type}, ${v.site})`, 'update', v.time); setToast('Operation logged successfully');
      }
      if (form === 'issue') {
        setIssues((i) => [{ id: ++uid, cat: v.cat, site: v.site, sev: v.sev, desc: v.desc.trim(), when: `${today} ${v.time}` }, ...i]);
        addActivity(`Operational issue reported (${v.site})`, 'issue', v.time); setToast('Issue reported successfully');
      }
    },
    updateOp(id, s) {
      const o = ops.find((x) => x.id === id);
      setOps((l) => l.map((x) => (x.id === id ? { ...x, status: s } : x)));
      addActivity(`Operation updated (${o.site})`, 'update'); setToast('Operation status updated');
    },
    assignGuard(id, guard) {
      const d = deployments.find((x) => x.id === id);
      if (d.deployed >= d.scheduled) { setToast(`${d.site} is already fully staffed`); return; }
      setDeployments((l) => l.map((x) => (x.id === id ? status({ ...x, deployed: x.deployed + 1 }) : x)));
      setDeployed((l) => [{ id: ++uid, guard, site: d.site, time: clock.time }, ...l]);
      addActivity(`${guard} assigned to ${d.site}`, 'deploy'); setToast('Guard assigned');
    },
    adjustDeployment(id, n) { setDeployments((l) => l.map((x) => (x.id === id ? status({ ...x, deployed: Math.max(0, Math.min(x.scheduled, x.deployed + n)) }) : x))); },
    completeDeployment(id) {
      const d = deployments.find((x) => x.id === id);
      addActivity(`Deployment completed (${d.site})`, 'closed'); setToast('Deployment marked as completed');
    },
    editTask(id, patch) { setTasks((l) => l.map((t) => (t.id === id ? { ...t, ...patch } : t))); setToast('Task updated'); },
    completeTask(id) {
      const t = tasks.find((x) => x.id === id);
      setTasks((l) => l.map((x) => (x.id === id ? { ...x, status: 'Completed' } : x)));
      addActivity(`Task completed (${t.task})`, 'done'); setToast('Task marked as completed');
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [ops, deployments, recent, tasks, activities, issues, shifts, deployed, clock]);

  return (
    <div className="dashboard operations">
      <OperationsHeader clock={clock} open={setModal} />
      <OperationsSummary store={store} open={setModal} />
      <section className="grid grid--analytics" aria-label="Operations analytics">
        <OperationStatusChart open={setModal} />
        <OperationsTrendChart open={setModal} />
        <TaskProgress store={store} open={setModal} />
      </section>
      <section className="grid grid--ops" aria-label="Live operations">
        <LiveOperations store={store} open={setModal} />
        <TodaysDeployment store={store} open={setModal} />
        <OperationsMap store={store} open={setModal} />
      </section>
      <section className="grid grid--activity" aria-label="Operations activity">
        <RecentOperations store={store} open={setModal} />
        <OpenOperationalTasks store={store} open={setModal} />
        <OperationsActivities store={store} open={setModal} />
      </section>
      <OperationModals modal={modal} store={store} onClose={closeModal} open={setModal} />
      {toast && (
        <div className="toast" role="status"><CheckCircle2 size={18} aria-hidden="true" /><span>{toast}</span></div>
      )}
    </div>
  );
}
