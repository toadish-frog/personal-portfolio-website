import { GlobeArcListSchema, type GlobeArc } from './schema'

// Real travel destinations, city-level coordinates, chained in visit order.
// arcAlt scales with hop distance (~0.15 regional, ~0.2-0.3 cross-country,
// ~0.4-0.5 intercontinental); `order` increments per hop for animation.

const colors = ['#f87171', '#ef4444', '#dc2626']

const rawGlobeArcs: GlobeArc[] = [
  {
    order: 1,
    startLat: 49.2827,
    startLng: -123.1207, // Vancouver, Canada
    endLat: 50.1163,
    endLng: -122.9574, // Whistler, BC
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 50.1163,
    startLng: -122.9574, // Whistler, BC
    endLat: 50.3167,
    endLng: -122.8, // Pemberton, BC
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: 50.3167,
    startLng: -122.8, // Pemberton, BC
    endLat: 53.9171,
    endLng: -122.7497, // Prince George, BC
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 53.9171,
    startLng: -122.7497, // Prince George, BC
    endLat: 58.4386,
    endLng: -130.0068, // Dease Lake, BC
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 58.4386,
    startLng: -130.0068, // Dease Lake, BC
    endLat: 60.7212,
    endLng: -135.0568, // Whitehorse, Canada
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 49.2827,
    startLng: -123.1207, // Vancouver, Canada
    endLat: 49.153,
    endLng: -125.9066, // Tofino, BC
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 60.7212,
    startLng: -135.0568, // Whitehorse, Canada
    endLat: 34.0522,
    endLng: -118.2437, // Los Angeles, US
    arcAlt: 0.25,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 34.0522,
    startLng: -118.2437, // Los Angeles, US
    endLat: 40.7128,
    endLng: -74.006, // New York, US
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 40.7128,
    startLng: -74.006, // New York, US
    endLat: 36.5054,
    endLng: -117.0794, // Death Valley, US
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: 36.5054,
    startLng: -117.0794, // Death Valley, US
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo, Japan
    arcAlt: 0.45,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: 35.6762,
    startLng: 139.6503, // Tokyo, Japan
    endLat: 27.7172,
    endLng: 85.324, // Kathmandu, Nepal
    arcAlt: 0.35,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 27.7172,
    startLng: 85.324, // Kathmandu, Nepal
    endLat: 28.2096,
    endLng: 83.9856, // Pokhara, Nepal
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: 28.2096,
    startLng: 83.9856, // Pokhara, Nepal
    endLat: 34.6937,
    endLng: 135.5023, // Osaka, Japan
    arcAlt: 0.35,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 14,
    startLat: 34.6937,
    startLng: 135.5023, // Osaka, Japan
    endLat: 45.4091,
    endLng: 141.6733, // Wakkanai, Japan
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 15,
    startLat: 45.4091,
    startLng: 141.6733, // Wakkanai, Japan
    endLat: 43.0618,
    endLng: 141.3545, // Sapporo, Japan
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 16,
    startLat: 43.0618,
    startLng: 141.3545, // Sapporo, Japan
    endLat: 43.7706,
    endLng: 142.3649, // Asahikawa, Japan
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 17,
    startLat: 43.7706,
    startLng: 142.3649, // Asahikawa, Japan
    endLat: 34.0658,
    endLng: 134.5593, // Tokushima, Japan
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 18,
    startLat: 34.0658,
    startLng: 134.5593, // Tokushima, Japan
    endLat: 41.7688,
    endLng: 140.7291, // Hakodate, Japan
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 19,
    startLat: 41.7688,
    startLng: 140.7291, // Hakodate, Japan
    endLat: -26.2041,
    endLng: 28.0473, // Johannesburg, South Africa
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 20,
    startLat: -26.2041,
    startLng: 28.0473, // Johannesburg, South Africa
    endLat: -33.9249,
    endLng: 18.4241, // Cape Town, South Africa
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 21,
    startLat: -33.9249,
    startLng: 18.4241, // Cape Town, South Africa
    endLat: 42.3601,
    endLng: -71.0589, // Boston, US
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 22,
    startLat: 42.3601,
    startLng: -71.0589, // Boston, US
    endLat: 40.2732,
    endLng: -76.8867, // Harrisburg, US
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 23,
    startLat: 40.2732,
    startLng: -76.8867, // Harrisburg, US
    endLat: 37.5665,
    endLng: 126.978, // Seoul, South Korea
    arcAlt: 0.45,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 24,
    startLat: 37.5665,
    startLng: 126.978, // Seoul, South Korea
    endLat: 22.3193,
    endLng: 114.1694, // Hong Kong
    arcAlt: 0.25,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 25,
    startLat: 22.3193,
    startLng: 114.1694, // Hong Kong
    endLat: 30.5728,
    endLng: 104.0668, // Chengdu, Sichuan
    arcAlt: 0.25,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 26,
    startLat: 30.5728,
    startLng: 104.0668, // Chengdu, Sichuan
    endLat: 39.9042,
    endLng: 116.4074, // Beijing, China
    arcAlt: 0.25,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 27,
    startLat: 39.9042,
    startLng: 116.4074, // Beijing, China
    endLat: 45.8038,
    endLng: 126.535, // Harbin, Heilongjiang
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 28,
    startLat: 45.8038,
    startLng: 126.535, // Harbin, Heilongjiang
    endLat: 38.914,
    endLng: 121.6147, // Dalian, Liaoning
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 29,
    startLat: 38.914,
    startLng: 121.6147, // Dalian, Liaoning
    endLat: 40.1272,
    endLng: 124.3947, // Dandong, Liaoning (across the river from North Korea)
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 30,
    startLat: 40.1272,
    startLng: 124.3947, // Dandong, Liaoning
    endLat: 47.6062,
    endLng: -122.3321, // Seattle, WA
    arcAlt: 0.45,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 31,
    startLat: 47.6062,
    startLng: -122.3321, // Seattle, WA
    endLat: 37.7749,
    endLng: -122.4194, // San Francisco, CA
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 32,
    startLat: 37.7749,
    startLng: -122.4194, // San Francisco, CA
    endLat: 34.4133,
    endLng: -119.861, // Isla Vista, Santa Barbara, CA
    arcAlt: 0.15,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
]

export const globeArcs: GlobeArc[] = GlobeArcListSchema.parse(rawGlobeArcs)
