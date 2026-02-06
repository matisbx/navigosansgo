# NavigoSansGo 🚇

> **Fake public transport SMS ticket generator** — A learning project built with Next.js to explore API routes, App Router, and full-stack web development.

## 📚 About

NavigoSansGo is an **educational project** that generates fake SMS-style tickets for French public transit networks. It was built to learn and practice:

- Building **REST API routes** with Next.js App Router
- Full-stack development with **React 19** and **TypeScript**
- Form handling, input validation, and formatting
- Webhook integrations (Discord notifications)

> ⚠️ **Disclaimer**: This project is for **educational purposes only**. Using fake transport tickets is illegal.

## ✨ Features

- 🎫 Generate fake SMS tickets for the **Setram** network (Le Mans, France)
- 📝 Access request form with client-side validation
- 🔔 Discord webhook notifications on new requests
- 📄 Built-in API documentation page
- ⏱️ Supports 1-hour and 24-hour ticket types

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16 | React framework with App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Static typing |
| **ESLint** | 9 | Code linting |

## 📁 Project Structure

```
app/
├── api/
│   ├── access/      # Access request API route (POST)
│   └── setram/      # Fake ticket generator API route (GET)
├── docs/            # API documentation page
├── layout.tsx       # Root layout
└── page.tsx         # Homepage with access request form
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env.local` file at the project root:

```bash
cp .env.example .env.local
```

Add the required environment variables:

```env
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build && npm start
```

## 📡 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/access` | POST | Submit an access request |
| `/api/setram?content=1h` | GET | Generate a 1-hour Setram ticket |
| `/api/setram?content=24h` | GET | Generate a 24-hour Setram ticket |

## 📖 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 📝 Keywords

`nextjs` · `react` · `typescript` · `api-routes` · `transport` · `sms-ticket` · `fake-ticket-generator` · `educational-project` · `app-router` · `discord-webhook` · `setram` · `le-mans` · `french-transit`

---

**Description for the repository:**

> 🚇 Fake public transport SMS ticket generator built with Next.js 16, React 19 & TypeScript. Educational project exploring API routes, App Router, and webhook integrations.

---

> This project is strictly for educational and learning purposes.
