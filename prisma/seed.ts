import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create sample leads
  const leads = [
    {
      name: 'María González',
      email: 'maria@ejemplo.cl',
      phone: '+56 9 1234 5678',
      address: 'Av. Providencia 1234',
      comuna: 'Providencia',
      propertyType: '2BR',
      surface: 65,
      furnished: true,
      parking: true,
      amenities: ['terraza', 'lavaseca', 'wifi_rapido'],
      estimatedRevenue: 980000,
      investmentRequired: 4200000,
      roiProjected: 0.40,
      status: 'EVALUATING' as const,
      priority: 'HIGH' as const,
      source: 'evaluacion',
      notes: 'Muy interesada, tiene un depto disponible inmediatamente.',
    },
    {
      name: 'Carlos Pérez',
      email: 'carlos.perez@gmail.com',
      phone: '+56 9 8765 4321',
      address: 'El Golf 150',
      comuna: 'Las Condes',
      propertyType: '1BR',
      surface: 42,
      furnished: false,
      parking: true,
      amenities: ['gimnasio', 'piscina'],
      estimatedRevenue: 650000,
      status: 'NEW' as const,
      priority: 'MEDIUM' as const,
      source: 'contacto',
    },
    {
      name: 'Andrea Muñoz',
      email: 'andrea.m@hotmail.com',
      phone: '+56 9 5555 1234',
      address: 'Irarrázaval 3456',
      comuna: 'Ñuñoa',
      propertyType: '3BR',
      surface: 85,
      furnished: true,
      parking: false,
      amenities: ['cocina_equipada', 'smart_tv', 'wifi_rapido'],
      estimatedRevenue: 1100000,
      status: 'PROPOSAL_SENT' as const,
      priority: 'HIGH' as const,
      source: 'evaluacion',
      notes: 'Propuesta enviada el 15/02. Seguimiento pendiente.',
    },
    {
      name: 'Roberto Silva',
      email: 'rsilva@empresa.cl',
      comuna: 'Santiago Centro',
      propertyType: '1BR',
      surface: 35,
      furnished: false,
      parking: false,
      amenities: [],
      estimatedRevenue: 420000,
      status: 'NEW' as const,
      priority: 'LOW' as const,
      source: 'blog',
    },
    {
      name: 'Patricia Rojas',
      email: 'patricia.rojas@gmail.com',
      phone: '+56 9 9876 5432',
      address: 'Vitacura 8900',
      comuna: 'Vitacura',
      propertyType: 'Casa',
      surface: 180,
      furnished: true,
      parking: true,
      amenities: ['piscina', 'jacuzzi', 'terraza', 'vista', 'aire_acondicionado'],
      estimatedRevenue: 2800000,
      investmentRequired: 8500000,
      roiProjected: 0.55,
      status: 'NEGOTIATING' as const,
      priority: 'URGENT' as const,
      source: 'evaluacion',
      notes: 'Casa premium en Vitacura. Alta prioridad.',
    },
    {
      name: 'Juan Martínez',
      email: 'juan.martinez@yahoo.com',
      address: 'Gran Avenida 5678',
      comuna: 'San Miguel',
      propertyType: '2BR',
      surface: 55,
      furnished: false,
      parking: true,
      amenities: ['lavaseca'],
      estimatedRevenue: 550000,
      status: 'CLOSED_WON' as const,
      priority: 'MEDIUM' as const,
      source: 'contacto',
      notes: 'Contrato firmado. Inicio operación marzo 2026.',
    },
  ]

  for (const lead of leads) {
    const created = await prisma.lead.create({ data: lead })
    console.log(`Created lead: ${created.name}`)

    // Add sample activity
    await prisma.activity.create({
      data: {
        leadId: created.id,
        type: 'note',
        title: 'Lead creado',
        body: `Lead ingresado desde ${created.source}`,
      },
    })
  }

  // Create sample blog posts
  const posts = [
    {
      slug: 'guia-completa-ganar-airbnb-santiago',
      title: 'Guía Completa: Cómo Maximizar tus Ingresos con Airbnb en Santiago',
      excerpt: 'Descubre las estrategias probadas que usamos en MR BnB para generar hasta un 30% más de ingresos.',
      content: 'Contenido completo del artículo...',
      author: 'Felipe Ruiz Paredes',
      tags: ['inversión', 'airbnb', 'santiago'],
      published: true,
      publishedAt: new Date('2026-02-15'),
    },
    {
      slug: 'mejores-comunas-inversion-renta-corta',
      title: 'Las 10 Mejores Comunas para Invertir en Renta Corta 2026',
      excerpt: 'Análisis detallado de las comunas con mejor retorno basado en datos reales.',
      content: 'Contenido completo del artículo...',
      author: 'Pedro Pablo Tort',
      tags: ['inversión', 'comunas', 'análisis'],
      published: true,
      publishedAt: new Date('2026-02-01'),
    },
  ]

  for (const post of posts) {
    const created = await prisma.blogPost.create({ data: post })
    console.log(`Created blog post: ${created.title}`)
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
