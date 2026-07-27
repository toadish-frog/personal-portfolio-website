import { CountryListSchema, type Country } from './schema'

// Not currently imported — the globe switched from point markers (this
// file) to arcs (globeArcs.ts, still dummy data). Kept as real, validated
// data (derived from photos.ts's country values) for when arcs get real
// endpoints. Coordinates are approximate centroids, not precise.
const rawCountries: Country[] = [
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'Nepal', lat: 28.3949, lng: 84.124 },
  { name: 'United States', lat: 37.0902, lng: -95.7129 },
]

export const countries: Country[] = CountryListSchema.parse(rawCountries)
