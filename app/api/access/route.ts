import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, telephone, adresse, ville, codePostal } = body;

    // Validation
    if (!nom || !prenom || !telephone || !adresse || !ville || !codePostal) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Inconnu';
    const userAgent = request.headers.get('user-agent') || 'Inconnu';
    const now = new Date();
    const timestamp = now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    // Formater le numéro de téléphone
    const formattedPhone = telephone.replace(/\s/g, '').replace(/(\d{2})(?=\d)/g, '$1 ').trim();

    const embed = {
      title: '📝 Nouvelle demande d\'accès',
      color: 0xf39c12,
      fields: [
        { name: '👤 Nom', value: nom, inline: true },
        { name: '👤 Prénom', value: prenom, inline: true },
        { name: '📞 Téléphone', value: formattedPhone, inline: true },
        { name: '🏠 Adresse', value: adresse, inline: false },
        { name: '🏙️ Ville', value: ville, inline: true },
        { name: '📮 Code postal', value: codePostal, inline: true },
        { name: '🌐 IP', value: ip, inline: true },
        { name: '📱 User-Agent', value: userAgent.slice(0, 200), inline: false },
        { name: '🕐 Date/Heure', value: timestamp, inline: true },
      ],
      timestamp: now.toISOString(),
    };

    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
