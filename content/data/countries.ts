import { CountryListSchema, type Country } from './schema'

// NOTE: not currently imported by the About page. The globe was switched
// from point markers (using this file) to Aceternity-style arcs
// (content/data/globeArcs.ts, currently dummy placeholder data) — see
// IMPLEMENTATION-SUMMARY.md's Globe-swap entry. Kept in place, unmodified,
// because it's still real and validated: derived directly from the distinct
// `country` values in photos.ts (Phase 1), so it can't drift from what the
// photo gallery actually shows. Intended to be the eventual source for real
// arc endpoints once globeArcs.ts's dummy data is replaced.
//
// Coordinates are approximate country centroids, only meant to place a
// marker on a globe, not to be geographically precise.
const rawCountries: Country[] = [
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'Nepal', lat: 28.3949, lng: 84.124 },
  { name: 'United States', lat: 37.0902, lng: -95.7129 },
]

export const countries: Country[] = CountryListSchema.parse(rawCountries)
