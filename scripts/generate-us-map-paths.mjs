import { readFileSync, writeFileSync } from 'fs'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const topo = JSON.parse(readFileSync('tmp-states-albers.json', 'utf8'))
const pathGen = geoPath(null)

const nation = feature(topo, topo.objects.nation)
const nationPath = pathGen(nation)

const statesFeature = feature(topo, topo.objects.states)
const servicedFips = {
  CA: '06',
  NV: '32',
  AZ: '04',
  IL: '17',
  TX: '48',
  NJ: '34',
}

const statePaths = {}
for (const f of statesFeature.features) {
  if (Object.values(servicedFips).includes(f.id)) {
    statePaths[f.id] = pathGen(f)
  }
}

// Match us-atlas Albers USA layout (975×610)
const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])

const markers = [
  { id: 'southern-california', lat: 33.67, lng: -117.78 },
  { id: 'central-california', lat: 35.28, lng: -120.66 },
  { id: 'northern-california', lat: 37.9, lng: -122.2 },
  { id: 'nevada', lat: 36.2, lng: -115.9 },
  { id: 'arizona', lat: 33.45, lng: -112.07 },
  { id: 'illinois', lat: 41.88, lng: -87.63 },
  { id: 'texas', lat: 29.42, lng: -98.49 },
  { id: 'new-jersey', lat: 40.73, lng: -74.17 },
]

const markerPoints = markers.map((m) => {
  const p = projection([m.lng, m.lat])
  return { id: m.id, x: Math.round(p[0] * 10) / 10, y: Math.round(p[1] * 10) / 10 }
})

function pathBounds(d) {
  const re = /[-+]?(?:\d*\.\d+|\d+)/g
  const nums = d.match(re).map(Number)
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (let i = 0; i < nums.length; i += 2) {
    minX = Math.min(minX, nums[i])
    maxX = Math.max(maxX, nums[i])
    minY = Math.min(minY, nums[i + 1])
    maxY = Math.max(maxY, nums[i + 1])
  }
  return { minX, maxX, minY, maxY }
}

const MAP_VIEW = { width: 975, height: 610 }
const bounds = pathBounds(nationPath)
const padX = 24
const padY = 20
const MAP_CLIP = {
  x: Math.floor(Math.min(0, bounds.minX - padX)),
  y: Math.floor(Math.max(0, bounds.minY - padY)),
  width: Math.ceil(Math.max(MAP_VIEW.width, bounds.maxX + padX) - Math.min(0, bounds.minX - padX)),
  height: Math.ceil(Math.min(MAP_VIEW.height, bounds.maxY + padY) - Math.max(0, bounds.minY - padY)),
}

const output = `/** Auto-generated from us-atlas states-albers-10m — run: node scripts/generate-us-map-paths.mjs */

export const MAP_VIEW = { width: ${MAP_VIEW.width}, height: ${MAP_VIEW.height} }

/** Full horizontal span with padded vertical crop */
export const MAP_CLIP = ${JSON.stringify(MAP_CLIP)}

export const NATION_PATH = ${JSON.stringify(nationPath)}

export const SERVICED_STATE_PATHS = ${JSON.stringify(statePaths)}

export const MARKER_POINTS = ${JSON.stringify(Object.fromEntries(markerPoints.map((m) => [m.id, { x: m.x, y: m.y }])), null, 2)}
`

writeFileSync('src/data/usMapPaths.js', output)
console.log('Generated src/data/usMapPaths.js')
console.log('Marker points:', markerPoints)
