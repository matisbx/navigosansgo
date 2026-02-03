import { NextRequest, NextResponse } from 'next/server';

const formatDate = (d: Date) => ({
  day: d.getDate().toString().padStart(2, '0'),
  month: (d.getMonth() + 1).toString().padStart(2, '0'),
  year: d.getFullYear().toString().slice(-2),
  hours: d.getHours().toString().padStart(2, '0'),
  minutes: d.getMinutes().toString().padStart(2, '0'),
});

const generateCode = () => 
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 100).toString().padStart(2, '0')).join("'");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get('msg')?.toLowerCase() ?? '';
  
  const now = new Date();
  const { day, month, year, hours, minutes } = formatDate(now);
  const code = generateCode();

  let reply = 'Ce message ne correspond à aucun titre de transport.';

  if (message === '1h') {
    const endHours = (now.getHours() + 1).toString().padStart(2, '0');
    reply = `Réseau Setram
Ticket 1 heure

Valable le ${day}.${month}.${year}
De ${hours}:${minutes} à ${endHours}:${minutes}

1.50€ TTC

A présenter au conducteur

${code}

bit.ly/3IFHUiV`;
  } else if (message === '24h') {
    const end = formatDate(new Date(now.getTime() + 86400000));
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
