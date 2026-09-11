export const metadata = {
  title: 'Términos de Servicio — Uno por Ciento',
};

export default function TerminosPage() {
  return (
    <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', color: '#0B1418', background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Términos de Servicio</h1>
        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '48px' }}>Uno por Ciento · Última actualización: septiembre de 2026</p>

        <p style={{ marginBottom: '16px' }}>Al contratar o utilizar cualquier servicio de <strong>Uno por Ciento</strong>, el usuario acepta los presentes Términos de Servicio en su totalidad.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>1. Descripción del servicio</h2>
        <p style={{ marginBottom: '16px' }}>Uno por Ciento ofrece a profesionales de la salud en México servicios de presencia digital y publicidad por suscripción mensual:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '6px' }}><strong>Plan Sitio Web (SEO Autopilot):</strong> diseño, publicación y mantenimiento de sitio web profesional con agenda automática conectada a Google Calendar.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Campaña:</strong> gestión de anuncios en Facebook e Instagram con agenda automática incluida.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Starter:</strong> campaña de anuncios en Facebook, sin sitio web.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Pro:</strong> anuncios en Google Ads más landing page incluida.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Superior:</strong> anuncios en Facebook y Google Ads más sitio web completo.</li>
          <li style={{ marginBottom: '6px' }}><strong>Servicios adicionales:</strong> registro de dominio, soporte técnico y reportes en tiempo real.</li>
        </ul>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>2. Registro y cuenta</h2>
        <p style={{ marginBottom: '16px' }}>El usuario debe registrarse con información veraz. Es responsable de mantener la confidencialidad de sus credenciales. Uno por Ciento puede suspender cuentas que incumplan estos términos.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>3. Precios, pagos y cobro automático</h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '6px' }}><strong>Plan Sitio Web:</strong> $300 MXN pago único por dominio + $600 MXN/mes.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Campaña:</strong> $600 MXN/mes.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Starter:</strong> $699 MXN/mes.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Pro:</strong> $999 MXN/mes.</li>
          <li style={{ marginBottom: '6px' }}><strong>Plan Superior:</strong> $1,499 MXN/mes.</li>
        </ul>
        <p style={{ marginBottom: '16px', padding: '16px', background: '#fff8e1', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
          <strong>Cobro automático mensual:</strong> Al activar cualquier plan, el usuario autoriza expresamente a Uno por Ciento a realizar cargos automáticos y recurrentes a la tarjeta registrada, con la periodicidad mensual indicada, hasta que el usuario cancele su suscripción. El primer cargo se realiza al momento de la activación y los siguientes se cobran automáticamente cada 30 días en la misma fecha.
        </p>
        <p style={{ marginBottom: '16px' }}>Los pagos se procesan mediante <strong>Stripe</strong>. Uno por Ciento no almacena datos de tarjetas bancarias — estos son gestionados de forma segura por Stripe. La inversión en pauta publicitaria (anuncios en Meta o Google) es cubierta directamente por el doctor y no está incluida en la suscripción mensual.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>4. Cancelación y reembolsos</h2>
        <p style={{ marginBottom: '16px' }}>El usuario puede cancelar su suscripción en cualquier momento desde su panel, sin penalización ni permanencia mínima. La cancelación surte efecto al término del período mensual ya pagado — el servicio seguirá activo hasta esa fecha y no se realizarán cargos posteriores.</p>
        <p style={{ marginBottom: '16px' }}>No se realizan reembolsos por períodos parciales ya iniciados, salvo en caso de falla técnica imputable a Uno por Ciento. El dominio es propiedad del doctor y puede transferirse a otro proveedor en cualquier momento.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>5. Google Calendar e integraciones</h2>
        <p style={{ marginBottom: '16px' }}>La agenda automática requiere conectar Google Calendar vía OAuth 2.0. Uno por Ciento accede únicamente para leer disponibilidad y crear eventos de cita. El usuario puede revocar el acceso desde su cuenta de Google en cualquier momento.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>6. Responsabilidades del usuario</h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '6px' }}>Proporcionar información profesional veraz en su perfil público.</li>
          <li style={{ marginBottom: '6px' }}>Atender las citas agendadas o notificar su cancelación con anticipación.</li>
          <li style={{ marginBottom: '6px' }}>No utilizar la plataforma para actividades ilícitas o contrarias a la ética médica.</li>
          <li style={{ marginBottom: '6px' }}>Mantener actualizada su disponibilidad en Google Calendar.</li>
        </ul>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>7. Limitación de responsabilidad</h2>
        <p style={{ marginBottom: '16px' }}>Uno por Ciento no se responsabiliza por interrupciones causadas por terceros (Google, Meta, Stripe, Vercel), ni por resultados específicos de SEO o campañas publicitarias. La responsabilidad máxima no excederá el monto pagado en los tres meses previos al evento.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>8. Propiedad intelectual</h2>
        <p style={{ marginBottom: '16px' }}>El software, diseño y marca de Uno por Ciento son propiedad exclusiva de la Plataforma. El usuario retiene la propiedad de su dominio, fotografías e información personal.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>9. Modificaciones</h2>
        <p style={{ marginBottom: '16px' }}>Estos términos pueden actualizarse. Los cambios relevantes se notificarán con al menos 15 días de anticipación al correo registrado.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>10. Ley aplicable</h2>
        <p style={{ marginBottom: '16px' }}>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se someterá a los tribunales competentes del estado de Guanajuato, México.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>11. Contacto</h2>
        <p style={{ marginBottom: '16px' }}>Dudas, cancelaciones o aclaraciones: <a href="mailto:j.guillermovg7@gmail.com" style={{ color: '#0E7C7B' }}>j.guillermovg7@gmail.com</a> o por WhatsApp al <a href="https://wa.me/524441905298" style={{ color: '#0E7C7B' }}>+52 444 190 5298</a>.</p>

        <hr style={{ border: 'none', borderTop: '1px solid #E5EBEA', margin: '48px 0' }} />
        <p style={{ fontSize: '0.8rem', color: '#999' }}>Uno por Ciento · © 2026 Todos los derechos reservados.</p>
      </div>
    </main>
  );
}
