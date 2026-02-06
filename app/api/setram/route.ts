import { NextRequest, NextResponse } from 'next/server';

const formatDateParis = (d: Date) => {
  const options: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Paris' };
  return {
    day: d.toLocaleDateString('fr-FR', { ...options, day: '2-digit' }).slice(0, 2),
    month: d.toLocaleDateString('fr-FR', { ...options, month: '2-digit' }).slice(0, 2),
    year: d.toLocaleDateString('fr-FR', { ...options, year: '2-digit' }),
    hours: d.toLocaleTimeString('fr-FR', { ...options, hour: '2-digit', hour12: false }).slice(0, 2),
    minutes: d.toLocaleTimeString('fr-FR', { ...options, minute: '2-digit' }).slice(-2),
  };
};

const getParisHour = (d: Date) => {
  return parseInt(d.toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', hour12: false }).slice(0, 2));
};

const generateCode = () => 
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100).toString().padStart(2, '0')).join("'");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get('content')?.toLowerCase() ?? '';
  
  const now = new Date();
  const { day, month, year, hours, minutes } = formatDateParis(now);
  const code = generateCode();

  let reply = 'Ce message ne correspond à aucun titre de transport.';

  if (message === '1h') {
    const parisHour = getParisHour(now);
    const endHours = ((parisHour + 1) % 24).toString().padStart(2, '0');
    reply = `Réseau Setram
Ticket 1 heure

Valable le ${day}.${month}.${year}
De ${hours}:${minutes} à ${endHours}:${minutes}

1.50€ TTC

A présenter au conducteur

${code}

bit.ly/3IFHUiV`;
  } else if (message === '24h') {
    const endDate = new Date(now.getTime() + 86400000 - 60000);
    const end = formatDateParis(endDate);
    reply = `Réseau Setram
Ticket 24 heures

Valable du ${day}.${month}.${year} à ${hours}:${minutes} au ${end.day}.${end.month}.${end.year} à ${end.hours}:${end.minutes}

4.20€ TTC

A présenter au conducteur

${code}

bit.ly/3IFHUiV`;
  }

  return new NextResponse(reply, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
