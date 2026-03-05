'use client'

import PropertyMap from './PropertyMap'

interface Location {
  lat: number
  lng: number
  units: number
}

export default function PropertyMapWrapper({ locations }: { locations: Location[] }) {
  return <PropertyMap locations={locations} />
}
