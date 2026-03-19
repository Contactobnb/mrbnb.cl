# CLAUDE.md — mrbnb.cl

## Proyecto
Sitio web + CRM de **Mr.BnB**, empresa de administración de arriendos cortos en Santiago, Chile.
Next.js 14 + TypeScript + Prisma + PostgreSQL. Deploy automático en **Render** al pushear a `main`.

## Stack
- **Framework**: Next.js 14.2, React 18, TypeScript 5
- **DB**: PostgreSQL (Render) + Prisma 5.22
- **CSS**: Tailwind 3.4
- **i18n**: next-intl (es/en), rutas bajo `[locale]/`
- **Email**: Mailgun (`felipe@mrbnb.cl` para propuestas, `notificaciones@mrbnb.cl` para alertas internas)
- **PDF**: jsPDF (client: `generateEvaluacionPdf.ts`, server: `generateEvaluacionPdfServer.ts`)
- **Auth**: JWT via `jose`, cookie `mrbnb_admin_token`
- **Charts**: Recharts
- **Maps**: Leaflet / react-leaflet

## Comandos
```bash
npm run dev          # Dev server
npm run build        # prisma generate && next build
npm run lint         # ESLint
npm test             # Vitest
npm run db:push      # Prisma → DB sync
npm run db:studio    # Prisma Studio
```

## Entorno local
- **No hay DATABASE_URL local** — el build falla en "Collecting page data" y es normal. La compilación TS pasa OK.
- **Migraciones en .gitignore** — usar `npx prisma db push` en el shell de Render para aplicar cambios de schema.
- **GitHub**: cuenta **Contactobnb** (verificar con `gh auth status` antes de push/PR).

## Estructura clave
```
src/
├── app/
│   ├── [locale]/          # Páginas públicas (blog, contacto, evaluacion, etc.)
│   ├── admin/             # CRM (login, dashboard, leads, métricas) — sin locale
│   └── api/
│       ├── auth/          # Login JWT
│       ├── contact/       # Formulario contacto
│       ├── evaluacion/    # Evaluación pública
│       ├── leads/         # CRUD leads (protegido)
│       ├── leads/[id]/evaluacion/  # Crear evaluación → envía email con PDF
│       ├── leads/export/  # Exportar leads
│       ├── metricas/      # Datos métricas
│       ├── portfolio/     # Stats portfolio
│       └── cron/          # daily-digest, weekly-summary, process-followups
├── components/            # Header, Footer, Hero, SimuladorROI, etc.
├── lib/
│   ├── auth.ts            # JWT create/verify
│   ├── email.ts           # Mailgun: contacto, propuesta, follow-ups, digest
│   ├── evaluacion.ts      # Cálculo cash flow (ADR, occupancy, NOI, ROI)
│   ├── generateEvaluacionPdf.ts       # PDF client-side (drawPdfContent compartido)
│   ├── generateEvaluacionPdfServer.ts # PDF server-side (usa fs para logo)
│   ├── prisma.ts          # Prisma client singleton
│   ├── rate-limit.ts      # Rate limiting
│   └── mrbnb-api.ts       # API interna mrbnb-ops
├── i18n/                  # Configuración next-intl
└── middleware.ts          # Auth, rate-limit, i18n routing
```

## Modelos Prisma
- **Lead** — Pipeline CRM (status: NEW → EVALUATING → PROPOSAL_SENT → NEGOTIATING → CLOSED_WON/LOST)
- **Activity** — Log de actividades por lead (note, email, call, status_change, proposal)
- **Evaluation** — Simulación financiera (ADR, occupancy x12, costos, NOI, pctSobreRenta)
- **ProposalEmail** — Email de propuesta + 3 follow-ups (día 3, 10, 20). Se detiene si lead es CLOSED_LOST.
- **BlogPost** — Artículos (slug, locale, published)
- **ContactSubmission** — Formulario de contacto

## Flujo de propuestas
1. Se crea evaluación → se calcula cash flow → se genera PDF server-side
2. Se envía email al lead con PDF adjunto (sendMailgunWithAttachment)
3. Se crea ProposalEmail con fechas de follow-up (+3, +10, +20 días)
4. Lead pasa a PROPOSAL_SENT si estaba en NEW/EVALUATING
5. Cron diario (`/api/cron/process-followups`) envía follow-ups pendientes
6. Si el lead se marca CLOSED_LOST, los follow-ups se saltan

## Paleta de colores
- **Navy** (primario): `#1e3a5f`
- **Navy dark**: `#152a45`
- **Red accent**: `#c53030`
- **Red light**: `#e53e3e`
- **Cream** (fondo): `#faf8f5`

## Variables de entorno (Render)
DATABASE_URL, ADMIN_PASSWORD, MAILGUN_API_KEY, MAILGUN_DOMAIN, CRON_SECRET, GEMINI_API_KEY, MRBNB_OPS_API_URL, MRBNB_OPS_API_KEY, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GOOGLE_MAPS_KEY, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_WHATSAPP, CONTACT_EMAIL

## API protegidas
- `/api/leads/*`, `/api/metricas` — requieren JWT
- `/api/cron/*` — requieren `Authorization: Bearer {CRON_SECRET}`
- `/admin/*` — requieren cookie JWT (excepto `/admin/login`)

## Rate limits
- `/api/auth` — 5 req / 15 min
- `/api/contact`, `/api/evaluacion` — 5 req / 5 min
