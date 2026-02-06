"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
    ville: "",
    codePostal: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Formater le numéro de téléphone (XX XX XX XX XX)
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 10);
    return numbers.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  };

  // Formater le code postal (5 chiffres)
  const formatCodePostal = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 5);
  };

  // Formater le nom/prénom (lettres, espaces, tirets, accents)
  const formatName = (value: string) => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s-]/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case 'telephone':
        formattedValue = formatPhoneNumber(value);
        break;
      case 'codePostal':
        formattedValue = formatCodePostal(value);
        break;
      case 'nom':
      case 'prenom':
        formattedValue = formatName(value);
        break;
      case 'ville':
        formattedValue = formatName(value);
        break;
    }

    setFormData({ ...formData, [name]: formattedValue });
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim() || formData.nom.length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.prenom.trim() || formData.prenom.length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    const phoneDigits = formData.telephone.replace(/\s/g, '');
    if (phoneDigits.length !== 10 || !/^0[1-9]/.test(phoneDigits)) {
      newErrors.telephone = 'Numéro de téléphone invalide (10 chiffres, commençant par 0)';
    }

    if (!formData.adresse.trim() || formData.adresse.length < 5) {
      newErrors.adresse = 'Adresse trop courte (min. 5 caractères)';
    }

    if (!formData.ville.trim() || formData.ville.length < 2) {
      newErrors.ville = 'Ville invalide';
    }

    if (formData.codePostal.length !== 5) {
      newErrors.codePostal = 'Code postal invalide (5 chiffres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 40 }}>
      <h1>NavigoSansGo</h1>
      <p style={{ color: "#666", marginTop: 10 }}>
        Générateur de faux tickets de transport.
      </p>

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      <h2>À propos</h2>
      <p style={{ lineHeight: 1.6, marginTop: 10 }}>
        Cette application génère des faux tickets SMS pour les réseaux de transport en commun.
      </p>

      <p style={{ color: "#888", marginTop: 20, fontSize: 14 }}>
        ⚠️ L&apos;utilisation de faux tickets est illégale.
      </p>

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      <h2>Réseaux supportés</h2>
      <ul style={{ marginTop: 10, lineHeight: 2, listStyle: "disc", paddingLeft: 20 }}>
        <li><strong>Setram</strong> — Le Mans</li>
      </ul>

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      {!submitted && (
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <h2 style={{ marginBottom: 20 }}>Demande d&apos;accès</h2>
          
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, color: "#666" }}>
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                placeholder="Doe"
                value={formData.nom}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  fontSize: 14,
                  backgroundColor: "transparent",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, color: "#666" }}>
                Prénom *
              </label>
              <input
                type="text"
                name="prenom"
                placeholder="John"
                value={formData.prenom}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  fontSize: 14,
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 14, color: "#666" }}>
              Téléphone *
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              placeholder="06 12 34 56 78"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #333",
                borderRadius: "6px",
                fontSize: 14,
                backgroundColor: "transparent",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 14, color: "#666" }}>
              Adresse *
            </label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              placeholder="4 rue de la Paix"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #333",
                borderRadius: "6px",
                fontSize: 14,
                backgroundColor: "transparent",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, color: "#666" }}>
                Code postal *
              </label>
              <input
                type="text"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                required
                placeholder="75001"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  fontSize: 14,
                  backgroundColor: "transparent",
                }}
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, color: "#666" }}>
                Ville *
              </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                required
                placeholder="Paris"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  fontSize: 14,
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </div>

          <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "#666" : "#22c55e",
                color: "#fff",
                border: "none",
                padding: "16px 32px",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                width: "100%",
                boxShadow: isLoading ? "none" : "0 4px 14px rgba(34, 197, 94, 0.4)",
              }}
            >
              {isLoading ? "Envoi en cours..." : "Envoyer la demande"}
            </button>
        </form>
      )}

      {submitted && (
        <div style={{ 
          padding: 24, 
          backgroundColor: "#d4edda", 
          borderRadius: 8, 
          border: "1px solid #c3e6cb",
          marginTop: 20 
        }}>
          <p style={{ color: "#155724", margin: 0, fontWeight: 600, fontSize: 16 }}>
            ✅ Votre demande d&apos;accès a été envoyée !
          </p>
          <p style={{ color: "#155724", margin: "12px 0 0 0", fontSize: 14, lineHeight: 1.6 }}>
            Vous recevrez un SMS sur votre téléphone pour confirmer que votre demande a été validée. Cela peut prendre plusieurs jours.
          </p>
        </div>
      )}

      <hr style={{ border: "none", borderTop: "1px solid #333", margin: "30px 0" }} />

      <h2>Liens</h2>
      <ul style={{ marginTop: 10, lineHeight: 2, listStyle: "disc", paddingLeft: 20 }}>
        <li><Link href="/docs" style={{ textDecoration: "underline" }}>Documentation API</Link></li>
      </ul>
    </div>
  );
}
