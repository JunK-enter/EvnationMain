/** County & city lists for local SEO — Southern CA, Central CA, Nevada (+ Arizona) */

export function toCountySlug(name) {
  return name
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-county-county/g, '-county')
}

export const SERVICE_REGIONS = [
  {
    id: 'southern-california',
    name: 'Southern California',
    summary: 'Licensed EV charger, solar, and panel upgrade installation across SoCal counties from Orange County to San Diego.',
  },
  {
    id: 'central-california',
    name: 'Central California',
    summary: 'Home EV charging and electrical upgrades throughout the Central Coast and San Luis Obispo County.',
  },
  {
    id: 'nevada',
    name: 'Nevada',
    summary: 'Residential and commercial EV charger installation across Clark County and the greater Las Vegas metro.',
  },
  {
    id: 'arizona',
    name: 'Arizona',
    summary: 'EV charger installation in Maricopa County and the greater Phoenix metro area.',
  },
]

export const SERVICE_COUNTIES = [
  {
    slug: 'orange-county',
    name: 'Orange County',
    state: 'CA',
    regionId: 'southern-california',
    cities: [
      'Aliso Viejo', 'Anaheim', 'Brea', 'Buena Park', 'Capistrano Beach', 'Corona Del Mar', 'Costa Mesa',
      'Cypress', 'Dana Point', 'Foothill Ranch', 'Fountain Valley', 'Fullerton', 'Garden Grove',
      'Huntington Beach', 'Irvine', 'La Habra', 'La Palma', 'Ladera Ranch', 'Laguna Beach', 'Laguna Hills',
      'Laguna Niguel', 'Laguna Woods', 'Lake Forest', 'Los Alamitos', 'Midway City', 'Mission Viejo',
      'Newport Beach', 'Newport Coast', 'Orange', 'Placentia', 'Rancho Santa Margarita', 'San Clemente',
      'San Juan Capistrano', 'Santa Ana', 'Seal Beach', 'Silverado', 'Stanton', 'Sunset Beach', 'Surfside',
      'Trabuco Canyon', 'Tustin', 'Villa Park', 'Westminster', 'Yorba Linda',
    ],
  },
  {
    slug: 'san-luis-obispo',
    name: 'San Luis Obispo',
    state: 'CA',
    regionId: 'central-california',
    cities: [
      'Arroyo Grande', 'Atascadero', 'Avila Beach', 'Cambria', 'Cayucos', 'Creston', 'Grover Beach',
      'Harmony', 'Los Osos', 'Morro Bay', 'Nipomo', 'Oceano', 'Paso Robles', 'Pismo Beach',
      'San Luis Obispo', 'San Miguel', 'San Simeon', 'Santa Margarita', 'Shandon', 'Templeton',
    ],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'CA',
    regionId: 'southern-california',
    cities: [
      'Acton', 'Agoura Hills', 'Alhambra', 'Altadena', 'Arcadia', 'Artesia', 'Avalon', 'Azusa',
      'Baldwin Park', 'Bell Gardens', 'Bellflower', 'Beverly Hills', 'Burbank', 'Calabasas', 'Canoga Park',
      'Canyon Country', 'Carson', 'Castaic', 'Cerritos', 'Chatsworth', 'Claremont', 'Compton', 'Covina',
      'Culver City', 'Diamond Bar', 'Downey', 'Duarte', 'El Monte', 'El Segundo', 'Encino', 'Gardena',
      'Glendale', 'Glendora', 'Granada Hills', 'Hacienda Heights', 'Harbor City', 'Hawaiian Gardens',
      'Hawthorne', 'Hermosa Beach', 'Huntington Park', 'Inglewood', 'La Canada Flintridge', 'La Crescenta',
      'La Mirada', 'La Puente', 'La Verne', 'Lake Hughes', 'Lakewood', 'Lancaster', 'Lawndale', 'Littlerock',
      'Llano', 'Lomita', 'Long Beach', 'Los Angeles', 'Lynwood', 'Malibu', 'Manhattan Beach',
      'Marina Del Rey', 'Maywood', 'Mission Hills', 'Monrovia', 'Montebello', 'Monterey Park', 'Montrose',
      'Mount Wilson', 'Newhall', 'North Hills', 'North Hollywood', 'Northridge', 'Norwalk',
      'Pacific Palisades', 'Pacoima', 'Palmdale', 'Palos Verdes Peninsula', 'Panorama City', 'Paramount',
      'Pasadena', 'Pearblossom', 'Pico Rivera', 'Playa Del Rey', 'Playa Vista', 'Pomona', 'Porter Ranch',
      'Rancho Palos Verdes', 'Redondo Beach', 'Reseda', 'Rosemead', 'Rowland Heights', 'San Dimas',
      'San Fernando', 'San Gabriel', 'San Marino', 'San Pedro', 'Santa Clarita', 'Santa Fe Springs',
      'Santa Monica', 'Sherman Oaks', 'Sierra Madre', 'Signal Hill', 'South El Monte', 'South Gate',
      'South Pasadena', 'Stevenson Ranch', 'Studio City', 'Sun Valley', 'Sunland', 'Sylmar', 'Tarzana',
      'Temple City', 'Topanga', 'Torrance', 'Tujunga', 'Valencia', 'Valley Village', 'Valyermo', 'Van Nuys',
      'Venice', 'Verdugo City', 'Walnut', 'West Covina', 'West Hills', 'West Hollywood', 'Whittier',
      'Wilmington', 'Winnetka', 'Woodland Hills',
    ],
  },
  {
    slug: 'san-bernardino',
    name: 'San Bernardino',
    state: 'CA',
    regionId: 'southern-california',
    cities: [
      'Adelanto', 'Amboy', 'Angelus Oaks', 'Apple Valley', 'Baker', 'Barstow', 'Big Bear City',
      'Big Bear Lake', 'Bloomington', 'Blue Jay', 'Bryn Mawr', 'Cedar Glen', 'Cedarpines Park', 'Chino',
      'Chino Hills', 'Cima', 'Colton', 'Crestline', 'Daggett', 'Earp', 'Essex', 'Fawnskin', 'Fontana',
      'Forest Falls', 'Fort Irwin', 'Grand Terrace', 'Green Valley Lake', 'Guasti', 'Helendale', 'Hesperia',
      'Highland', 'Hinkley', 'Joshua Tree', 'Lake Arrowhead', 'Landers', 'Loma Linda', 'Lucerne Valley',
      'Ludlow', 'Lytle Creek', 'Mentone', 'Montclair', 'Morongo Valley', 'Mountain Pass', 'Mt Baldy',
      'Needles', 'Newberry Springs', 'Nipton', 'Ontario', 'Oro Grande', 'Parker Dam', 'Phelan',
      'Pinon Hills', 'Pioneertown', 'Rancho Cucamonga', 'Redlands', 'Rialto', 'Rimforest',
      'Running Springs', 'San Bernardino', 'Skyforest', 'Sugarloaf', 'Trona', 'Twentynine Palms',
      'Twin Peaks', 'Upland', 'Victorville', 'Vidal', 'Wrightwood', 'Yermo', 'Yucaipa', 'Yucca Valley',
    ],
  },
  {
    slug: 'riverside',
    name: 'Riverside',
    state: 'CA',
    regionId: 'southern-california',
    cities: [
      'Banning', 'Beaumont', 'Blythe', 'Calimesa', 'Canyon Lake', 'Cathedral City', 'Coachella', 'Corona',
      'Desert Hot Springs', 'Eastvale', 'Hemet', 'Indian Wells', 'Indio', 'Jurupa Valley', 'La Quinta',
      'Lake Elsinore', 'Menifee', 'Moreno Valley', 'Murrieta', 'Norco', 'Palm Desert', 'Palm Springs',
      'Perris', 'Rancho Mirage', 'Riverside', 'San Jacinto', 'Temecula', 'Wildomar',
    ],
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    state: 'CA',
    regionId: 'southern-california',
    cities: [
      'Alpine', 'Bonita', 'Bonsall', 'Borrego Springs', 'Boulevard', 'Camp Pendleton', 'Campo',
      'Cardiff By The Sea', 'Carlsbad', 'Chula Vista', 'Coronado', 'Del Mar', 'Descanso', 'Dulzura',
      'El Cajon', 'Encinitas', 'Escondido', 'Fallbrook', 'Guatay', 'Imperial Beach', 'Jacumba', 'Jamul',
      'Julian', 'La Jolla', 'La Mesa', 'Lakeside', 'Lemon Grove', 'Mount Laguna', 'National City',
      'Oceanside', 'Pala', 'Palomar Mountain', 'Pauma Valley', 'Pine Valley', 'Potrero', 'Poway', 'Ramona',
      'Ranchita', 'Rancho Santa Fe', 'San Diego', 'San Luis Rey', 'San Marcos', 'San Ysidro', 'Santa Ysabel',
      'Santee', 'Solana Beach', 'Spring Valley', 'Tecate', 'Valley Center', 'Vista', 'Warner Springs',
    ],
  },
  {
    slug: 'ventura-county',
    name: 'Ventura County',
    state: 'CA',
    regionId: 'southern-california',
    cities: [
      'Camarillo', 'Fillmore', 'Moorpark', 'Ojai', 'Oxnard', 'Port Hueneme', 'Santa Paula',
      'Simi Valley', 'Thousand Oaks', 'Ventura', 'Westlake Village',
    ],
  },
  {
    slug: 'clark-county',
    name: 'Clark County',
    state: 'NV',
    regionId: 'nevada',
    cities: [
      'Boulder City', 'Henderson', 'Las Vegas', 'Mesquite', 'North Las Vegas', 'Laughlin', 'Paradise',
      'Spring Valley', 'Summerlin South', 'Sunrise Manor', 'Whitney', 'Winchester', 'Enterprise',
      'Blue Diamond', 'Goodsprings', 'Indian Springs', 'Jean', 'Mount Charleston', 'Sandy Valley',
      'Searchlight',
    ],
  },
  {
    slug: 'maricopa-county',
    name: 'Maricopa County',
    state: 'AZ',
    regionId: 'arizona',
    cities: [
      'Apache Junction', 'Avondale', 'Buckeye', 'Carefree', 'Cave Creek', 'Chandler', 'El Mirage',
      'Fountain Hills', 'Gila Bend', 'Gilbert', 'Glendale', 'Goodyear', 'Guadalupe', 'Litchfield Park',
      'Mesa', 'Paradise Valley', 'Peoria', 'Phoenix', 'Queen Creek', 'Scottsdale', 'Sun City',
      'Sun City West', 'Surprise', 'Tempe', 'Tolleson', 'Wickenburg', 'Youngtown',
    ],
  },
]

export function getCountyBySlug(slug) {
  return SERVICE_COUNTIES.find((c) => c.slug === slug) || null
}

export function getRegionById(id) {
  return SERVICE_REGIONS.find((r) => r.id === id) || null
}

export function getCountiesByRegion(regionId) {
  return SERVICE_COUNTIES.filter((c) => c.regionId === regionId)
}

export function getAllCountySlugs() {
  return SERVICE_COUNTIES.map((c) => c.slug)
}

export function getTotalCityCount() {
  return SERVICE_COUNTIES.reduce((sum, c) => sum + c.cities.length, 0)
}

/** Top cities for meta descriptions */
export function getFeaturedCities(county, limit = 6) {
  return county.cities.slice(0, limit).join(', ')
}

export function buildCountyTitle(county) {
  return `EV Charger Installation in ${county.name}, ${county.state}`
}

export function buildCountyDescription(county) {
  const featured = getFeaturedCities(county, 8)
  return `Licensed Level 2 EV charger, panel upgrade & solar installation in ${county.name}, ${county.state}. Serving ${featured} and ${county.cities.length}+ communities. Free quotes from evNation.`
}

export const localSeoKeywords = SERVICE_COUNTIES.flatMap((county) => [
  `EV charger installation ${county.name}`,
  `Level 2 charger installer ${county.name} ${county.state}`,
  `panel upgrade ${county.name}`,
  `home EV charging ${county.name}`,
])
