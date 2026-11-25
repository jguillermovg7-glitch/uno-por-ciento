export function PlanCards({ planes, href }) {
  return (
    <div className="mk-plans">
      {planes.map((p) => (
        <div key={p.nombre} className={"mk-plan" + (p.nombre === "Superior" ? " mk-plan-top" : "")}>
          {p.nombre === "Superior" && <span className="mk-badge">Mayor resultado</span>}
          <h3>{p.nombre}</h3>
          <div className="mk-price"><b>{"$" + p.precio.toLocaleString("en-US")}</b><span>/mes</span></div>
          <p>{p.incluye}</p>
          <a className="btn-primary" href={href}>{"Elegir " + p.nombre + " →"}</a>
        </div>
      ))}
    </div>
  );
}

export function Chips() {
  return (
    <ul className="mk-chips">
      <li>Desde $699 al mes</li>
      <li>Sin contratos</li>
      <li>Listo en 5 minutos</li>
    </ul>
  );
}

export function FlotanteWA({ href }) {
  return (
    <a className="mk-wa" href={href} aria-label="Escribir por WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.3 2 11.6c0 1.9.6 3.6 1.6 5.1L2.5 21.5l5-1.3c1.4.7 2.9 1.1 4.5 1.1 5.5 0 10-4.3 10-9.6S17.5 2 12 2z"/></svg>
    </a>
  );
}
