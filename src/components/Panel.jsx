export default function Panel({ icon: Icon, tone = 'blue', title, action, className = '', children }) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel__head">
        <div className="panel__title">
          {Icon && (
            <span className={`panel__icon tone-${tone}`} aria-hidden="true">
              <Icon size={16} />
            </span>
          )}
          <h2>{title}</h2>
        </div>
        {action}
      </header>
      <div className="panel__body">{children}</div>
    </section>
  );
}

export function ViewAllButton({ label = 'View All', onClick }) {
  return (
    <button type="button" className="btn-outline btn-outline--sm" onClick={onClick}>
      {label}
    </button>
  );
}

export function SelectControl({ value, onChange, options, label }) {
  return (
    <label className="select-control">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
