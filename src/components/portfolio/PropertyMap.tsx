'use client'

import { useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface Location {
  lat: number
  lng: number
  units: number
}

interface PropertyMapProps {
  locations: Location[]
}

function offsetCoord(val: number, seed: number): number {
  const offset = ((seed * 9301 + 49297) % 233280) / 233280 * 0.004 - 0.002
  return val + offset
}

export default function PropertyMap({ locations }: PropertyMapProps) {
  const allMarkers = useMemo(() => {
    const result: { lat: number; lng: number }[] = []
    locations.forEach((loc, locIdx) => {
      for (let i = 0; i < loc.units; i++) {
        result.push({
          lat: offsetCoord(loc.lat, locIdx * 100 + i),
          lng: offsetCoord(loc.lng, locIdx * 100 + i + 50),
        })
      }
    })
    return result
  }, [locations])

  return (
    <MapContainer
      center={[-33.43, -70.615]}
      zoom={13}
      scrollWheelZoom={true}
      dragging={true}
      zoomControl={true}
      doubleClickZoom={true}
      touchZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {allMarkers.map((m, idx) => (
        <CircleMarker
          key={idx}
          center={[m.lat, m.lng]}
          radius={6}
          interactive={false}
          pathOptions={{
            color: '#1e3a5f',
            fillColor: '#c53030',
            fillOpacity: 0.75,
            weight: 2,
          }}
        />
      ))}
    </MapContainer>
  )
}
