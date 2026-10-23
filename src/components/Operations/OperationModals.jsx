import { useState } from 'react';
import Modal from '../Modal.jsx';
import StatusBadge from '../StatusBadge.jsx';
import { GUARDS, SITES } from '../../data/operationsMockData.js';
import { DataTable, Person, badge } from './DataRows.jsx';
import { InteractiveMap, mapPins } from './OperationsMap.jsx';

const FORMS = {
  shift: { title: 'Assign Shift', ok: 'Assign Shift', fields: [
    { n: 'guard', l: 'Guard', t: 'select', o: GUARDS }, { n: 'site', l: 'Site', t: 'select', o: SITES },
    { n: 'date', l: 'Date', t: 'date', d: '2026-10-20', req: true }, { n: 'start', l: 'Start time', t: 'time', d: '08:00', req: true }, { n: 'end', l: 'End time', t: 'time', d: '16:00', req: true }] },
  deploy: { title: 'Deploy Guard', ok: 'Deploy Guard', fields: [
    { n: 'guard', l: 'Guard', t: 'select', o: GUARDS }, { n: 'site', l: 'Site', t: 'select', o: SITES },
    { n: 'time', l: 'Deployment time', t: 'time', d: '14:30', req: true }, { n: 'notes', l: 'Notes (optional)', t: 'textarea' }] },
  task: { title: 'Create Task', ok: 'Create Task', fields: [
    { n: 'task', l: 'Task name', t: 'text', req: true }, { n: 'who', l: 'Assignee', t: 'select', o: GUARDS },
    { n: 'due', l: 'Due date', t: 'date', d: '2026-10-23', req: true }, { n: 'priority', l: 'Priority', t: 'select', o: ['High', 'Medium', 'Low'], d: 'Medium' }] },
  log: { title: 'Log Operation', ok: 'Log Operation', fields: [
    { n: 'type', l: 'Operation type', t: 'select', o: ['Site Patrol', 'Access Control', 'Perimeter Check', 'Key Holding', 'Incident Follow-up'] },
    { n: 'site', l: 'Site', t: 'select', o: SITES }, { n: 'guard', l: 'Assigned guard', t: 'select', o: GUARDS },
    { n: 'time', l: 'Time', t: 'time', d: '14:30', req: true }, { n: 'notes', l: 'Notes', t: 'textarea' }] },
  issue: { title: 'Report Issue', ok: 'Report Issue', danger: true, fields: [
    { n: 'cat', l: 'Issue category', t: 'select', o: ['Access breach', 'Equipment fault', 'Staffing gap', 'Safety hazard'] },
    { n: 'site', l: 'Site', t: 'select', o: SITES }, { n: 'sev', l: 'Severity', t: 'select', o: ['Low', 'Medium', 'High'], d: 'Medium' },
    { n: 'desc', l: 'Description', t: 'textarea', req: true }, { n: 'time', l: 'Reporting time', t: 'time', d: '14:30', req: true }] },
};

function Field({ f, value, error, onChange }) {
  return (
    <label className="field">
      <span>{f.l}</span>
      {f.t === 'select' ? <select value={value} onChange={(e) => onChange(e.target.value)}>{f.o.map((o) => <option key={o}>{o}</option>)}</select>
        : f.t === 'textarea' ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input type={f.t} value={value} onChange={(e) => onChange(e.target.value)} />}
      {error && <small className="field__error">{error}</small>}
    </label>
  );
}

function FormModal({ form, store, onClose }) {
  const cfg = FORMS[form];
  const [v, setV] = useState(() => Object.fromEntries(cfg.fields.map((f) => [f.n, f.d ?? (f.t === 'select' ? f.o[0] : '')])));
  const [err, setErr] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    cfg.fields.forEach((f) => { if (f.req && !String(v[f.n]).trim()) er[f.n] = 'This field is required.'; });
    if (form === 'shift' && v.start && v.end && v.end <= v.start) er.end = 'End time must be after the start time.';
    setErr(er);
    if (Object.keys(er).length) return;
    store.submit(form, v);
    onClose();
  };
  return (
    <Modal title={cfg.title} onClose={onClose}>
      <form className="form" onSubmit={submit} noValidate>
        {cfg.fields.map((f) => <Field key={f.n} f={f} value={v[f.n]} error={err[f.n]} onChange={(x) => setV({ ...v, [f.n]: x })} />)}
        <div className="form__actions">
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className={`btn-primary${cfg.danger ? ' btn-primary--danger' : ''}`}>{cfg.ok}</button>
        </div>
      </form>
    </Modal>
  );
}

const KV = ({ rows }) => (
  <dl className="kv">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
);
const Sel = ({ label, value, options, onChange }) => (
  <label className="field"><span>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>
);
const toIso = (label) => { const d = new Date(`${label} 12:00`); return Number.isNaN(+d) ? '' : d.toISOString().slice(0, 10); };

const LISTS = {
  ops: { title: 'Live Operations', rowKind: 'op', rows: (s) => s.ops, cols: [{ h: 'Operation', k: 'op' }, { h: 'Site', k: 'site' }, { h: 'Guard', cell: (r) => <Person name={r.guard} /> }, { h: 'Start', k: 'start' }, { h: 'Status', cell: badge('status') }] },
  deps: { title: "Today's Deployment", rowKind: 'dep', rows: (s) => s.deployments, cols: [{ h: 'Site', k: 'site' }, { h: 'Scheduled', k: 'scheduled' }, { h: 'Deployed', k: 'deployed' }, { h: 'Status', cell: badge('status') }] },
  recent: { title: 'Operation History', rowKind: 'recent', rows: (s) => s.recent, cols: [{ h: 'Date & Time', k: 'when' }, { h: 'Operation', k: 'op' }, { h: 'Site', k: 'site' }, { h: 'Result', cell: badge('result') }] },
  tasks: { title: 'All Operational Tasks', rowKind: 'task', rows: (s) => s.tasks, cols: [{ h: 'Task', k: 'task' }, { h: 'Assigned To', k: 'who' }, { h: 'Due', k: 'due' }, { h: 'Priority', cell: badge('priority') }, { h: 'Status', k: 'status' }] },
  acts: { title: 'Activity History', rowKind: 'act', rows: (s) => s.activities, cols: [{ h: 'Activity', k: 'text' }, { h: 'When', k: 'when' }] },
};

export default function OperationModals({ modal, store, onClose, open }) {
  if (!modal) return null;
  const { kind } = modal;
  if (kind === 'form') return <FormModal form={modal.form} store={store} onClose={onClose} />;
  if (kind === 'clock') return <ClockModal store={store} onClose={onClose} />;
  if (kind === 'info') return <Modal title={modal.title} onClose={onClose}><div className="modal__body"><KV rows={modal.rows} /></div></Modal>;
  if (kind === 'list') {
    const L = LISTS[modal.which];
    return <Modal wide title={L.title} onClose={onClose}><div className="modal__body"><DataTable columns={L.cols} rows={L.rows(store)} onRow={(r) => open({ kind: L.rowKind, id: r.id })} /></div></Modal>;
  }
  if (kind === 'table') {
    const cols = modal.cols.map(([h, k, type]) => ({ h, k, cell: type === 'badge' ? badge(k) : undefined }));
    return <Modal wide title={modal.title} onClose={onClose}><div className="modal__body">
      {modal.rows.length ? <DataTable columns={cols} rows={modal.rows} onRow={modal.rowKind ? (r) => open({ kind: modal.rowKind, id: r.id }) : undefined} /> : <p className="empty">No records to show.</p>}</div></Modal>;
  }
  if (kind === 'map') {
    const pins = mapPins(store.deployments);
    return <Modal wide title="Operations Map – All Locations" onClose={onClose}><div className="modal__body">
      <InteractiveMap pins={pins} tall onDetails={(p) => open({ kind: 'site', site: p.site })} />
      <DataTable columns={[{ h: 'Site', k: 'site' }, { h: 'Address', k: 'addr' }, { h: 'Guards', k: 'guards' }, { h: 'Status', cell: badge('status') }]} rows={pins.map((p) => ({ ...p, id: p.site }))} onRow={(p) => open({ kind: 'site', site: p.site })} className="opsmap__table" />
    </div></Modal>;
  }
  if (kind === 'site') {
    const p = mapPins(store.deployments).find((x) => x.site === modal.site);
    const d = store.deployments.find((x) => x.site === modal.site);
    return <Modal title={p.site} onClose={onClose}><div className="modal__body">
      <KV rows={[['Address', p.addr], ['Guards deployed', p.guards], ['Scheduled guards', d.scheduled], ['Status', <StatusBadge status={p.status} />], ['Live operations', store.ops.filter((o) => o.site === p.site).map((o) => o.op).join(', ') || 'None']]} />
      <div className="form__actions"><button type="button" className="btn-outline" onClick={() => open({ kind: 'dep', id: d.id })}>Manage deployment</button></div></div></Modal>;
  }
  if (kind === 'op') {
    const o = store.ops.find((x) => x.id === modal.id); if (!o) return null;
    return <Modal title={o.op} onClose={onClose}><div className="modal__body">
      <KV rows={[['Site', o.site], ['Assigned guard', <Person name={o.guard} />], ['Start time', o.start], ['Status', <StatusBadge status={o.status} />], ['Shift', 'Day shift, 08:00–16:00'], ['Check-ins', '3 of 4 completed'], ['Supervisor', 'James Carter']]} />
      <Sel label="Update status" value={o.status} options={['On Going', 'In Progress', 'Completed']} onChange={(s) => store.updateOp(o.id, s)} /></div></Modal>;
  }
  if (kind === 'dep') {
    const d = store.deployments.find((x) => x.id === modal.id); if (!d) return null;
    return <Modal title={`${d.site} deployment`} onClose={onClose}><div className="modal__body">
      <KV rows={[['Scheduled guards', d.scheduled], ['Deployed', d.deployed], ['Status', <StatusBadge status={d.status} />]]} />
      <div className="kv-actions">
        <Sel label="Assign a guard" value="Select guard" options={['Select guard', ...GUARDS]} onChange={(g) => g !== 'Select guard' && store.assignGuard(d.id, g)} />
        <div className="form__actions">
          <button type="button" className="btn-outline" onClick={() => store.adjustDeployment(d.id, -1)}>Deployed −1</button>
          <button type="button" className="btn-outline" onClick={() => store.adjustDeployment(d.id, 1)}>Deployed +1</button>
          <button type="button" className="btn-primary" onClick={() => { store.completeDeployment(d.id); onClose(); }}>Mark completed</button>
        </div></div></div></Modal>;
  }
  if (kind === 'recent') {
    const r = store.recent.find((x) => x.id === modal.id); if (!r) return null;
    return <Modal title={r.op} onClose={onClose}><div className="modal__body"><KV rows={[['Date & time', r.when], ['Site', r.site], ['Result', <StatusBadge status={r.result} />], ['Report', 'Filed and archived']]} /></div></Modal>;
  }
  if (kind === 'task') {
    const t = store.tasks.find((x) => x.id === modal.id); if (!t) return null;
    return <Modal title={t.task} onClose={onClose}><div className="modal__body">
      <KV rows={[['Description', `${t.task} (${t.cat}), as per the operations checklist.`], ['Assigned to', t.who], ['Due date', t.due], ['Priority', <StatusBadge status={t.priority} />], ['Status', t.status]]} />
      <div className="kv-actions">
        <Sel label="Priority" value={t.priority} options={['High', 'Medium', 'Low']} onChange={(p) => store.editTask(t.id, { priority: p })} />
        <Sel label="Assignee" value={t.who} options={GUARDS} onChange={(w) => store.editTask(t.id, { who: w })} />
        <label className="field"><span>Due date</span><input type="date" value={toIso(t.due)} onChange={(e) => e.target.value && store.editTask(t.id, { due: store.fmtDate(e.target.value) })} /></label>
        {t.status === 'Open' && <div className="form__actions"><button type="button" className="btn-primary" onClick={() => { store.completeTask(t.id); onClose(); }}>Mark as completed</button></div>}
      </div></div></Modal>;
  }
  if (kind === 'act') {
    const a = store.activities.find((x) => x.id === modal.id); if (!a) return null;
    return <Modal title="Activity details" onClose={onClose}><div className="modal__body"><KV rows={[['Event', a.text], ['When', a.when], ['Type', a.type[0].toUpperCase() + a.type.slice(1)], ['Logged by', 'James Carter']]} /></div></Modal>;
  }
  return null;
}

function ClockModal({ store, onClose }) {
  const [d, setD] = useState('2026-10-20');
  const [t, setT] = useState(store.clock.time);
  return (
    <Modal title="Date & time" onClose={onClose}>
      <form className="form" onSubmit={(e) => { e.preventDefault(); if (!d || !t) return; store.setClockFrom(d, t); onClose(); }}>
        <label className="field"><span>Date</span><input type="date" value={d} onChange={(e) => setD(e.target.value)} required /></label>
        <label className="field"><span>Time</span><input type="time" value={t} onChange={(e) => setT(e.target.value)} required /></label>
        <div className="form__actions"><button type="button" className="btn-outline" onClick={onClose}>Cancel</button><button type="submit" className="btn-primary">Apply</button></div>
      </form>
    </Modal>
  );
}
