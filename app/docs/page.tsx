import Link from "next/link";

export default function Docs() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 40 }}>
      <Link href="/" style={{ color: "#666", fontSize: 14 }}>← Retour</Link>

      <h1 style={{ marginTop: 20 }}>Documentation API</h1>
      <p style={{ color: "#666", marginTop: 10 }}>
        API REST pour générer des tickets de transport.
      </p>

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      <h2>Base URL</h2>
      <pre style={{ background: "#111", padding: 15, marginTop: 10, overflow: "auto" }}>
        /api/{"{nom_du_reseau}"}
      </pre>

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      <h2>Endpoints</h2>

      <h3 style={{ marginTop: 20 }}>GET /api/{"{nom_du_reseau}"}</h3>
      <p style={{ color: "#888", marginTop: 5 }}>Génère un ticket de transport pour le réseau spécifié.</p>

      <h4 style={{ marginTop: 15 }}>Paramètres</h4>
      <table style={{ width: "100%", marginTop: 10, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #333" }}>
            <th style={{ textAlign: "left", padding: "10px 0" }}>Param</th>
            <th style={{ textAlign: "left", padding: "10px 0" }}>Type</th>
            <th style={{ textAlign: "left", padding: "10px 0" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #222" }}>
            <td style={{ padding: "10px 0" }}>content</td>
            <td style={{ padding: "10px 0", color: "#888" }}>string</td>
            <td style={{ padding: "10px 0", color: "#888" }}>Type de ticket (ex: &quot;1h&quot;, &quot;24h&quot;)</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      <h2>Exemple</h2>

      <pre style={{ background: "#111", padding: 15, marginTop: 10, overflow: "auto" }}>
GET /api/setram?content=1h
      </pre>

      <h4 style={{ marginTop: 20 }}>Exemple de réponse (Setram)</h4>
      <pre style={{ background: "#111", padding: 15, marginTop: 10, overflow: "auto", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
{`Réseau Setram
Ticket 1 heure

Valable le 04.02.26
De 17:12 à 18:12

1.50€ TTC

A présenter au conducteur

23'78'67'00'66'45

bit.ly/3IFHUiV`}
      </pre>

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      <h2>Erreur</h2>
      <p style={{ color: "#888", marginTop: 10 }}>
        Si le paramètre content est invalide ou absent :
      </p>
      <pre style={{ background: "#111", padding: 15, marginTop: 10, overflow: "auto" }}>
Ce message ne correspond à aucun titre de transport.
      </pre>
    </div>
  );
}
