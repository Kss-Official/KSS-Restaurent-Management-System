// Indoor Dining Tables (10 Tables)
export const indoorTables = [
  {
    id: 'T01',
    name: 'Table T01',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Northwest Salon',
    hall: 'Indoor Hall',
    desc: 'Intimate two-guest table along the northwest corridor with warm golden glow',
    image: '/table_thumb_t01.jpg',
    position: { top: '31.7%', left: '19.1%' }
  },
  {
    id: 'T02',
    name: 'Table T02',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'West Archway Promenade',
    hall: 'Indoor Hall',
    desc: 'Cozy two-guest round table beside the architectural wall sconces',
    image: '/table_thumb_t02.jpg',
    position: { top: '52.1%', left: '18.0%' }
  },
  {
    id: 'T03',
    name: 'Table T03',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Southwest Terrace',
    hall: 'Indoor Hall',
    desc: 'Spacious two-guest table beside the lush indoor palm arrangements',
    image: '/table_thumb_t03.jpg',
    position: { top: '75.9%', left: '15.8%' }
  },
  {
    id: 'T04',
    name: 'Table T04',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Grand Chandelier Aisle (North)',
    hall: 'Indoor Hall',
    desc: 'Central four-guest round dining table directly below the crystal chandelier',
    image: '/table_thumb_t04.jpg',
    position: { top: '32.2%', left: '41.3%' }
  },
  {
    id: 'T05',
    name: 'Table T05',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Central Marble Atrium',
    hall: 'Indoor Hall',
    desc: 'Prime central round dining table with burgundy velvet armchairs & grand view',
    image: '/table_thumb_t05.jpg',
    position: { top: '52.5%', left: '38.1%' }
  },
  {
    id: 'T06',
    name: 'Table T06',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Foyer Garden Aisle',
    hall: 'Indoor Hall',
    desc: 'Four-guest round table flanking the palm greenery and main dining hall view',
    image: '/table_thumb_t06.jpg',
    position: { top: '76.6%', left: '39.0%' }
  },
  {
    id: 'T07',
    name: 'Table T07',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Northeast Banquet Corner',
    hall: 'Indoor Hall',
    desc: 'Square four-guest table framed by illuminated archways and marble reflections',
    image: '/table_thumb_t07.jpg',
    position: { top: '31.2%', left: '72.8%' }
  },
  {
    id: 'T08',
    name: 'Table T08',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'East Archway Salon',
    hall: 'Indoor Hall',
    desc: 'Custom square dining table with plush velvet chairs near the east archways',
    image: '/table_thumb_t08.jpg',
    position: { top: '52.3%', left: '58.3%' }
  },
  {
    id: 'T09',
    name: 'Table T09',
    type: '6-Seater',
    capacity: 6,
    seats: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    area: 'Southeast Grand Banquet',
    hall: 'Indoor Hall',
    desc: 'Six-guest rectangular banquet table for celebrations and dinner parties',
    image: '/table_thumb_t09.jpg',
    position: { top: '77.4%', left: '66.2%' }
  },
  {
    id: 'T10',
    name: 'Table T10',
    type: '6-Seater',
    capacity: 6,
    seats: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    area: 'East VIP Promenade',
    hall: 'Indoor Hall',
    desc: 'Spacious rectangular six-guest banquet table overlooking the grand double doors',
    image: '/table_thumb_t10.jpg',
    position: { top: '53.0%', left: '82.9%' }
  }
];

// Outdoor Sky Terrace Tables (6 Tables)
export const outdoorTables = [
  {
    id: 'T11',
    name: 'Table T11',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Balcony Promenade West',
    hall: 'Outdoor Sky Terrace',
    desc: 'Intimate two-guest table along the rooftop balustrade overlooking the glittering skyline',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '36.8%', left: '37.6%' },
    isOutdoor: true
  },
  {
    id: 'T12',
    name: 'Table T12',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Balcony Promenade East',
    hall: 'Outdoor Sky Terrace',
    desc: 'Intimate two-guest table along the rooftop balustrade with panoramic evening views',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '36.8%', left: '69.2%' },
    isOutdoor: true
  },
  {
    id: 'T13',
    name: 'Table T13',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Sunset West Terrace',
    hall: 'Outdoor Sky Terrace',
    desc: 'Four-guest round dining table beneath the lighted palm canopy on the west terrace',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '50.6%', left: '25.2%' },
    isOutdoor: true
  },
  {
    id: 'T14',
    name: 'Table T14',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Central Palm Court',
    hall: 'Outdoor Sky Terrace',
    desc: 'Signature four-guest round dining table in the heart of the illuminated outdoor terrace',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '46.8%', left: '53.4%' },
    isOutdoor: true
  },
  {
    id: 'T15',
    name: 'Table T15',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Skyline East Terrace',
    hall: 'Outdoor Sky Terrace',
    desc: 'Four-guest round dining table framing the glowing architectural glass facade & lanterns',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '52.0%', left: '81.2%' },
    isOutdoor: true
  },
  {
    id: 'T16',
    name: 'Table T16',
    type: '6-Seater',
    capacity: 6,
    seats: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    area: 'Terrace Grand Courtyard',
    hall: 'Outdoor Sky Terrace',
    desc: 'Six-guest grand circular banquet dining table with premium center floral display',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '70.8%', left: '50.0%' },
    isOutdoor: true
  }
];

export const allTables = [...indoorTables, ...outdoorTables];
