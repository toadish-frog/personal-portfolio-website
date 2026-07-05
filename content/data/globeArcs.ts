import { GlobeArcListSchema, type GlobeArc } from './schema'

// DUMMY / PLACEHOLDER DATA — not real trips.
//
// This swaps the About-page globe's old point-marker visualization (real
// countries, derived from photos.ts) for Aceternity UI's "Github Globe"
// arc-based look instead. Real arc data (e.g. home base -> each place
// actually visited, derived from photos.ts / countries.ts) is a follow-up,
// not done here — these coordinates are only meant to prove out the new
// visual. Shape matches Aceternity's own `Position` type exactly so it can
// be swapped for real data later with zero component changes.
const rawGlobeArcs: GlobeArc[] = [
  {
    order: 1,
    startLat: 49.2827,
    startLng: -123.1207, // Vancouver
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo
    arcAlt: 0.3,
    color: '#ef4444',
  },
  {
    order: 1,
    startLat: 49.2827,
    startLng: -123.1207, // Vancouver
    endLat: 51.5072,
    endLng: -0.1276, // London
    arcAlt: 0.4,
    color: '#f97316',
  },
  {
    order: 2,
    startLat: 35.6762,
    startLng: 139.6503, // Tokyo
    endLat: 27.7172,
    endLng: 85.324, // Kathmandu
    arcAlt: 0.25,
    color: '#eab308',
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276, // London
    endLat: 1.3521,
    endLng: 103.8198, // Singapore
    arcAlt: 0.5,
    color: '#22c55e',
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093, // Sydney
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo
    arcAlt: 0.3,
    color: '#3b82f6',
  },
  {
    order: 3,
    startLat: 40.7128,
    startLng: -74.006, // New York
    endLat: 49.2827,
    endLng: -123.1207, // Vancouver
    arcAlt: 0.2,
    color: '#a855f7',
  },
]

export const globeArcs: GlobeArc[] = GlobeArcListSchema.parse(rawGlobeArcs)
