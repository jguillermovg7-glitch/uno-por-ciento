export const metadata = {
  title: 'Política de Privacidad — Uno por Ciento',
};

export default function PrivacidadPage() {
  return (
    <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', color: '#0B1418', background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Política de Privacidad</h1>
        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '48px' }}>Uno por Ciento · Última actualización: julio de 2026</p>

        <p style={{ marginBottom: '16px' }}>En <strong>Uno por Ciento</strong> nos tomamos en serio la privacidad de quienes usan nuestra plataforma, en cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>1. Responsable del tratamiento</h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '6px' }}><strong>Nombre:</strong> Guillermo García (persona física)</li>
          <li style={{ marginBottom: '6px' }}><strong>Plataforma:</strong> Uno por Ciento</li>
          <li style={{ marginBottom: '6px' }}><strong>Correo:</strong> <a href="mailto:j.guillermovg7@gmail.com" style={{ color: '#0E7C7B' }}>j.guillermovg7@gmail.com</a></li>
          <li style={{ marginBottom: '6px' }}><strong>Ubicación:</strong> León, Guanajuato, México</li>
        </ul>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>2. Datos que recopilamos</h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '6px' }}><strong>Doctores:</strong> nombre, especialidad, correo, teléfono/WhatsApp, foto, servicios, precios y token de Google Calendar.</li>
          <li style={{ marginBottom: '6px' }}><strong>Pacientes:</strong> nombre completo y número de WhatsApp para registrar y confirmar la cita.</li>
          <li style={{ marginBottom: '6px' }}><strong>Uso del sitio:</strong> IP, navegador, páginas visitadas, fecha y hora de acceso (analítica interna).</li>
        </ul>
        <p style={{ marginBottom: '16px' }}>No recopilamos datos de salud, diagnósticos ni expedientes clínicos.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>3. Datos de pago</h2>
        <p style={{ marginBottom: '16px' }}>Los pagos se procesan a través de <strong>Stripe</strong> (certificado PCI-DSS). Uno por Ciento no almacena números de tarjeta, fechas de vencimiento ni códigos de seguridad.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>4. Google Calendar</h2>
        <p style={{ marginBottom: '16px' }}>El token de OAuth se usa exclusivamente para consultar disponibilidad y crear eventos de cita. No accedemos a correos, contactos ni otros datos. El doctor puede revocar el acceso desde <a href="https://myaccount.google.com/permissions" target="_blank" style={{ color: '#0E7C7B' }}>myaccount.google.com/permissions</a>.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>5. Proveedores de servicios</h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '6px' }}><strong>Supabase</strong> — base de datos y autenticación</li>
          <li style={{ marginBottom: '6px' }}><strong>Vercel</strong> — hospedaje de la aplicación</li>
          <li style={{ marginBottom: '6px' }}><strong>Stripe</strong> — procesamiento de pagos</li>
          <li style={{ marginBottom: '6px' }}><strong>Resend</strong> — notificaciones por correo</li>
          <li style={{ marginBottom: '6px' }}><strong>Google LLC</strong> — autenticación y Calendar API</li>
          <li style={{ marginBottom: '6px' }}><strong>Meta</strong> — plataforma publicitaria (solo Plan Campaña)</li>
        </ul>
        <p style={{ marginBottom: '16px' }}>No vendemos ni compartimos tus datos con terceros con fines comerciales propios.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>6. Conservación de datos</h2>
        <p style={{ marginBottom: '16px' }}>Los datos del doctor se eliminan en un máximo de 30 días tras cancelar el servicio. Los datos de pacientes se conservan 12 meses asociados a la cita y luego se eliminan automáticamente.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>7. Derechos ARCO</h2>
        <p style={{ marginBottom: '16px' }}>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos. Escríbenos a <a href="mailto:j.guillermovg7@gmail.com" style={{ color: '#0E7C7B' }}>j.guillermovg7@gmail.com</a>. Respondemos en máximo 20 días hábiles.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>8. Cookies</h2>
        <p style={{ marginBottom: '16px' }}>Usamos cookies de sesión estrictamente necesarias para autenticación. No usamos cookies de rastreo publicitario propio.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>9. Seguridad</h2>
        <p style={{ marginBottom: '16px' }}>Implementamos HTTPS/TLS, acceso restringido a base de datos y almacenamiento seguro de tokens. En caso de brecha de seguridad, notificaremos conforme a la legislación aplicable.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>10. Transferencias internacionales</h2>
        <p style={{ marginBottom: '16px' }}>Algunos proveedores operan servidores fuera de México. Al usar la plataforma aceptas que tus datos puedan procesarse en otros países bajo los estándares de protección de dichos proveedores.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>11. Cambios a esta política</h2>
        <p style={{ marginBottom: '16px' }}>Actualizaciones relevantes serán notificadas por correo a usuarios registrados. La fecha de última actualización siempre estará visible al inicio de este documento.</p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '40px 0 12px', color: '#0E7C7B' }}>12. Contacto</h2>
        <p style={{ marginBottom: '16px' }}>Preguntas sobre privacidad: <a href="mailto:j.guillermovg7@gmail.com" style={{ color: '#0E7C7B' }}>j.guillermovg7@gmail.com</a></p>

        <hr style={{ border: 'none', borderTop: '1px solid #E5EBEA', margin: '48px 0' }} />
        <p style={{ fontSize: '0.8rem', color: '#999' }}>Uno por Ciento · © 2026 Todos los derechos reservados.</p>
      </div>
    </main>
  );
}
