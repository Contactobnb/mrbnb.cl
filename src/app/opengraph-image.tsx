import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mr.BnB — Transformamos Departamentos en Hoteles'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #152a45 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'white',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1e3a5f',
            }}
          >
            MB
          </div>
          <span
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Mr.BnB
          </span>
        </div>

        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Transformamos Departamentos en Hoteles
        </div>

        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.4,
            marginBottom: '40px',
          }}
        >
          Administración profesional de renta corta en Santiago
        </div>

        <div
          style={{
            display: 'flex',
            gap: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#c53030' }}>+60</span>
            <span style={{ fontSize: '16px', color: '#94a3b8' }}>Propiedades</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#c53030' }}>4.81</span>
            <span style={{ fontSize: '16px', color: '#94a3b8' }}>Rating Airbnb</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#c53030' }}>+30%</span>
            <span style={{ fontSize: '16px', color: '#94a3b8' }}>vs Arriendo Tradicional</span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '18px',
            color: '#64748b',
          }}
        >
          mrbnb.cl
        </div>
      </div>
    ),
    { ...size }
  )
}
