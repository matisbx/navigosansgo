export default function Home() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Setram SMS API</h1>
      <p style={{ marginBottom: '20px' }}>API pour générer des tickets Setram.</p>
      
      <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Endpoints:</h2>
      <ul style={{ lineHeight: '2' }}>
        <li>
          <a href="/api/sms?msg=1h" style={{ color: '#0070f3' }}>/api/sms?msg=1h</a> - Ticket 1 heure
        </li>
        <li>
          <a href="/api/sms?msg=24h" style={{ color: '#0070f3' }}>/api/sms?msg=24h</a> - Ticket 24 heures
        </li>
      </ul>
    </div>
  );
}
