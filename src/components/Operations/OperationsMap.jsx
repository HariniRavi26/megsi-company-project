import { useState } from 'react';
import { Map as MapIcon, MapPin, Plus, Minus } from 'lucide-react';
import Panel, { ViewAllButton } from '../Panel.jsx';
import StatusBadge from '../StatusBadge.jsx';
import { MAP_PINS } from '../../data/operationsMockData.js';

export const mapPins = (deployments) =>
  MAP_PINS.map((p) => { const d = deployments.find((x) => x.site === p.site); return { ...p, guards: d?.deployed ?? 0, status: d?.status ?? 'Active' }; });

// Local SVG street map of central Manchester. No tiles, no API key, always visible.
export function InteractiveMap({ pins, onDetails, tall = false }) {
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState(null);
  const pos = (v) => 50 + (v - 50) * zoom; // markers follow the zoomed map without scaling
  const sel = pins.find((p) => p.site === active);
  const step = (d) => setZoom((z) => Math.min(2, Math.max(1, +(z + d).toFixed(2))));
  const blocks = [[8,6,52,30],[70,6,44,34],[128,8,60,28],[208,6,56,32],[280,8,64,28],[356,6,36,34],[10,56,44,28],[66,52,52,32],[132,54,48,26],[196,52,56,30],[266,50,50,32],[330,52,62,30],[12,102,58,28],[84,106,44,28],[142,100,50,34],[210,104,52,26],[282,102,50,30],[346,104,46,28]];
  return (
    <div className={`opsmap${tall ? ' opsmap--tall' : ''}`} role="region" aria-label="Operations map of Manchester">
      <div className="opsmap__layer" style={{ transform: `scale(${zoom})` }} onClick={() => setActive(null)}>
        <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
          <rect width="400" height="160" fill="#eceae4" />
          <path d="M0 128C70 112 130 146 220 126S350 100 400 108V160H0Z" fill="#cfe2ef" />
          <rect x="300" y="12" width="70" height="26" rx="4" fill="#d6e8cf" />
          {blocks.map((b, i) => <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]} rx="3" fill="#dedbd2" />)}
          <g stroke="#fff" strokeWidth="5" fill="none"><path d="M0 44H400M0 94H400M62 0V160M124 0V160M192 0V160M262 0V160M326 0V160" /></g>
          <g stroke="#f4d37a" strokeWidth="3.2" fill="none" strokeLinecap="round"><path d="M0 18L400 142M150 0L270 160" /></g>
          <g stroke="#c9c6bc" strokeWidth="1" fill="none"><path d="M0 70H400M92 0V160M228 0V160M296 0V160" /></g>
        </svg>
        <span className="opsmap__lbl opsmap__lbl--city">Manchester</span>
        <span className="opsmap__lbl opsmap__lbl--area" style={{ left: '4%', top: '36%' }}>Salford</span>
        <span className="opsmap__lbl opsmap__lbl--road" style={{ left: '3%', top: '60%' }}>M602</span>
        <span className="opsmap__lbl opsmap__lbl--road" style={{ left: '90%', top: '8%' }}>A6</span>
        <span className="opsmap__lbl opsmap__lbl--road" style={{ left: '84%', top: '62%' }}>A57</span>
      </div>
      {pins.map((p) => (
        <button type="button" key={p.site} className={`opspin${active === p.site ? ' is-active' : ''}`} style={{ left: `${pos(p.x)}%`, top: `${pos(p.y)}%` }}
          onClick={() => setActive(p.site)} aria-label={`${p.site} – open details`}>
          <MapPin size={30} fill={p.color} color="#fff" strokeWidth={1.7} />
          <span className="opspin__label">{p.site}</span>
        </button>
      ))}
      {sel && (
        <div className={`opspopup${sel.y < 40 ? ' opspopup--below' : ''}${sel.x > 66 ? ' opspopup--left' : ''}`} style={{ left: `${pos(sel.x)}%`, top: `${pos(sel.y)}%` }} role="group" aria-label={`${sel.site} details`}>
          <strong>{sel.site}</strong>
          <p>{sel.addr}</p>
          <p>Guards deployed: <b>{sel.guards}</b></p>
          <div className="opspopup__row"><StatusBadge status={sel.status} />
            <button type="button" className="btn-outline btn-outline--sm" onClick={() => { onDetails(sel); setActive(null); }}>View Details</button></div>
          <button type="button" className="opspopup__x" onClick={() => setActive(null)} aria-label="Close popup">×</button>
        </div>
      )}
      <div className="opsmap__zoom">
        <button type="button" onClick={() => step(0.25)} aria-label="Zoom in" disabled={zoom >= 2}><Plus size={16} /></button>
        <button type="button" onClick={() => step(-0.25)} aria-label="Zoom out" disabled={zoom <= 1}><Minus size={16} /></button>
      </div>
    </div>
  );
}

export default function OperationsMap({ store, open }) {
  const pins = mapPins(store.deployments);
  return (
    <Panel icon={MapIcon} title="Operations Map" action={<ViewAllButton onClick={() => open({ kind: 'map' })} />}>
      <InteractiveMap pins={pins} onDetails={(p) => open({ kind: 'site', site: p.site })} />
    </Panel>
  );
}
