import { GlobeArcListSchema, type GlobeArc } from './schema'

// Real travel destinations, connected as a sequential chain in the order
// visited. Coordinates are city-level (not country centroids), sourced for
// this list specifically. arcAlt is scaled roughly by hop distance (short
// regional hops ~0.15, cross-country ~0.2-0.3, intercontinental ~0.4-0.5).
// Colors cycle through a fixed palette; `order` increments per hop so arcs
// animate in visited sequence.

const colors = ["#f87171", "#ef4444", "#dc2626"];

const rawGlobeArcs: GlobeArc[] = [
  {
    order: 1,
    startLat: 49.2827,
    startLng: -123.1207, // Vancouver, Canada
    endLat: 60.7212,
    endLng: -135.0568, // Whitehorse, Canada
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 60.7212,
    startLng: -135.0568, // Whitehorse, Canada
    endLat: 34.0522,
    endLng: -118.2437, // Los Angeles, US
    arcAlt: 0.25,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: 34.0522,
    startLng: -118.2437, // Los Angeles, US
    endLat: 40.7128,
    endLng: -74.006, // New York, US
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 40.7128,
    startLng: -74.006, // New York, US
    endLat: 36.5054,
    endLng: -117.0794, // Death Valley, US
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 36.5054,
    startLng: -117.0794, // Death Valley, US
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo, Japan
    arcAlt: 0.45,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 35.6762,
    startLng: 139.6503, // Tokyo, Japan
    endLat: 27.7172,
    endLng: 85.324, // Kathmandu, Nepal
    arcAlt: 0.35,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 27.7172,
    startLng: 85.324, // Kathmandu, Nepal
    endLat: 28.2096,
    endLng: 83.9856, // Pokhara, Nepal
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 28.2096,
    startLng: 83.9856, // Pokhara, Nepal
    endLat: 34.6937,
    endLng: 135.5023, // Osaka, Japan
    arcAlt: 0.35,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 34.6937,
    startLng: 135.5023, // Osaka, Japan
    endLat: 45.4091,
    endLng: 141.6733, // Wakkanai, Japan
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: 45.4091,
    startLng: 141.6733, // Wakkanai, Japan
    endLat: 43.0618,
    endLng: 141.3545, // Sapporo, Japan
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: 43.0618,
    startLng: 141.3545, // Sapporo, Japan
    endLat: 43.7706,
    endLng: 142.3649, // Asahikawa, Japan
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 43.7706,
    startLng: 142.3649, // Asahikawa, Japan
    endLat: 34.0658,
    endLng: 134.5593, // Tokushima, Japan
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: 34.0658,
    startLng: 134.5593, // Tokushima, Japan
    endLat: 41.7688,
    endLng: 140.7291, // Hakodate, Japan
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 14,
    startLat: 41.7688,
    startLng: 140.7291, // Hakodate, Japan
    endLat: -26.2041,
    endLng: 28.0473, // Johannesburg, South Africa
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 15,
    startLat: -26.2041,
    startLng: 28.0473, // Johannesburg, South Africa
    endLat: -33.9249,
    endLng: 18.4241, // Cape Town, South Africa
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 16,
    startLat: -33.9249,
    startLng: 18.4241, // Cape Town, South Africa
    endLat: 42.3601,
    endLng: -71.0589, // Boston, US
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 17,
    startLat: 42.3601,
    startLng: -71.0589, // Boston, US
    endLat: 40.2732,
    endLng: -76.8867, // Harrisburg, US
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 18,
    startLat: 40.2732,
    startLng: -76.8867, // Harrisburg, US
    endLat: 37.5665,
    endLng: 126.978, // Seoul, South Korea
    arcAlt: 0.45,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 19,
    startLat: 37.5665,
    startLng: 126.978, // Seoul, South Korea
    endLat: 22.3193,
    endLng: 114.1694, // Hong Kong
    arcAlt: 0.25,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 20,
    startLat: 22.3193,
    startLng: 114.1694, // Hong Kong
    endLat: 39.9042,
    endLng: 116.4074, // Beijing, China
    arcAlt: 0.25,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
]

export const globeArcs: GlobeArc[] = GlobeArcListSchema.parse(rawGlobeArcs)
