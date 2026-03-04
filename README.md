# MR BnB — mrbnb.cl

Plataforma web + CRM para MR BnB, empresa de administración profesional de propiedades en renta corta en Santiago, Chile.

## Stack Técnico

- **Frontend**: Next.js 14 + TailwindCSS + TypeScript
- **Backend**: Next.js API Routes
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Deploy**: Render

## Requisitos

- Node.js 18+
- PostgreSQL (local o remoto)
- npm

## Instalación Local

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd mrbnb.cl

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Configurar base de datos
npx prisma db push
npx prisma generate

# 5. (Opcional) Seed de datos de prueba
npm run db:seed

# 6. Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `DATABASE_URL` | Connection string PostgreSQL | Si |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | No |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps API Key | No |
| `ADMIN_PASSWORD` | Contraseña panel admin | Si (prod) |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio | Si |
| `NEXT_PUBLIC_WHATSAPP` | Número WhatsApp | No |
| `CONTACT_EMAIL` | Email de contacto | No |

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx           # Landing page
│   ├── servicios/         # Detalle servicios
│   ├── proceso/           # Flujo comercial 5 pasos
│   ├── evaluacion/        # Simulador ROI interactivo
│   ├── portfolio/         # Mapa + propiedades
│   ├── nosotros/          # Team + filosofía
│   ├── blog/              # Hub de contenido SEO
│   ├── contacto/          # Formularios + info
│   ├── admin/             # Dashboard CRM
│   └── api/               # API endpoints
├── components/
│   ├── layout/            # Header, Footer
│   ├── home/              # Componentes landing
│   ├── evaluacion/        # Simulador ROI
│   ├── admin/             # Componentes CRM
│   └── ui/                # Componentes reutilizables
├── lib/
│   ├── prisma.ts          # Cliente Prisma
│   ├── pricing.ts         # Algoritmo pricing
│   └── utils.ts           # Utilidades
└── data/
    ├── properties.ts      # 64 propiedades
    └── blog-posts.ts      # Contenido blog
```

## Deploy en Render

1. Crear cuenta en [render.com](https://render.com)
2. Conectar repositorio Git
3. Render detectará `render.yaml` automáticamente
4. Configurar variables de entorno adicionales (GA_ID, etc.)
5. Deploy automático en cada push

El archivo `render.yaml` configura:
- Servicio web Node.js (Starter plan)
- Base de datos PostgreSQL (Starter plan)
- Build command con Prisma generate

## CRM Admin

Acceder en `/admin`. Funcionalidades:
- Dashboard con métricas de pipeline
- Gestión de leads con estados (Nuevo > Evaluando > Propuesta > Negociación > Cerrado)
- Vista detalle con historial de actividades
- Filtros y búsqueda
- Scoring automático de propiedades

## API Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/leads` | GET | Listar leads |
| `/api/leads` | POST | Crear lead |
| `/api/leads/[id]` | GET | Detalle lead |
| `/api/leads/[id]` | PATCH | Actualizar lead |
| `/api/leads/[id]` | DELETE | Eliminar lead |
| `/api/evaluacion` | POST | Evaluación + crear lead |
| `/api/contact` | POST | Formulario contacto |

## Scripts

```bash
npm run dev        # Servidor desarrollo
npm run build      # Build producción
npm run start      # Iniciar producción
npm run lint       # Linting
npm run db:push    # Push schema a DB
npm run db:seed    # Seed datos prueba
npm run db:studio  # Prisma Studio (GUI)
```
