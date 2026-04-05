export type GalleryImage = {
  id: string;
  src: string;
  title: string;
  tag: string;
  alt: string;
  aspectRatio: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'twilight-glass-residence',
    src: 'https://images.pexels.com/photos/13752348/pexels-photo-13752348.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=2',
    title: 'Twilight Glass Residence',
    tag: 'Residence 01',
    alt: 'Contemporary glass villa photographed at dusk with warm interior glow.',
    aspectRatio: '4 / 3',
  },
  {
    id: 'courtyard-spiral-villa',
    src: 'https://images.pexels.com/photos/29170012/pexels-photo-29170012.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=2',
    title: 'Courtyard Spiral Villa',
    tag: 'Residence 02',
    alt: 'Luxury modern villa with sculpted landscaping and a spiral exterior staircase.',
    aspectRatio: '4 / 5',
  },
  {
    id: 'residential-facade-study',
    src: 'https://images.pexels.com/photos/6414289/pexels-photo-6414289.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=2',
    title: 'Residential Facade Study',
    tag: 'Facade Detail',
    alt: 'Modern residential villa facade framed by greenery in a refined neighborhood setting.',
    aspectRatio: '3 / 2',
  },
  {
    id: 'stair-gallery-interior',
    src: 'https://images.unsplash.com/photo-1753808636871-aa91a2011197?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    title: 'Stair Gallery Interior',
    tag: 'Interior View',
    alt: 'Modern architectural interior with layered circulation, handrails, and strong spatial lines.',
    aspectRatio: '4 / 5',
  },
  {
    id: 'desert-light-villa',
    src: 'https://images.pexels.com/photos/35141528/pexels-photo-35141528.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=2',
    title: 'Desert Light Villa',
    tag: 'Climate House',
    alt: 'Minimal desert-toned villa with clean geometry and palm landscaping.',
    aspectRatio: '4 / 5',
  },
  {
    id: 'timber-atrium-light',
    src: 'https://images.unsplash.com/photo-1762246433271-e7bdb518f793?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    title: 'Timber Atrium Light',
    tag: 'Material Study',
    alt: 'Architectural interior with timber columns, rhythmic ceiling lines, and soft daylight.',
    aspectRatio: '3 / 2',
  },
  {
    id: 'mansion-landscape-frame',
    src: 'https://images.pexels.com/photos/8082323/pexels-photo-8082323.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=2',
    title: 'Mansion Landscape Frame',
    tag: 'Exterior View',
    alt: 'Large modern mansion facade with crisp landscaping and wide residential frontage.',
    aspectRatio: '4 / 3',
  },
  {
    id: 'deck-line-house',
    src: 'https://images.unsplash.com/photo-1693560821176-f26424b2d5d4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    title: 'Deck Line House',
    tag: 'Arrival Court',
    alt: 'Modern house fronted by a curved timber deck and landscaped approach.',
    aspectRatio: '3 / 2',
  },
];

export const HOME_GALLERY_IMAGES = GALLERY_IMAGES.slice(0, 6);
