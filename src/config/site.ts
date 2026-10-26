import { asset } from '../lib/asset'

// ─────────────────────────────────────────────────────────────
// Frosted Freaks Services — site configuration
// Edit this file to change contact details, the form endpoint,
// the service list and the service areas. Nothing else needs
// to change for those.
// ─────────────────────────────────────────────────────────────

/** Business contact details. Replace every [PLACEHOLDER] before launch. */
export const CONTACT = {
  businessName: 'Frosted Freaks Services',
  phone: '[PHONE]',
  email: '[EMAIL]',
  address: '[BUSINESS ADDRESS]',
} as const

/** True while a value is still an unfilled [PLACEHOLDER]. */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value)

/** Quote form settings. */
export const FORM = {
  /**
   * POST endpoint for quote requests (Formspree, Basin, your own API, …).
   * Leave empty and the form runs in stub mode: it validates, then tells
   * the visitor plainly that nothing was sent.
   */
  endpoint: '',
  /** Set true to make the phone field required. */
  phoneRequired: false,
  /**
   * Optional consent checkbox (for example, permission to text).
   * Only turn on once the wording has been checked for your situation.
   */
  consent: {
    enabled: false,
    label: 'I agree to be contacted about my quote request.',
  },
} as const

export type Service = {
  id: string
  name: string
  short: string
  long: string[]
  /** Photo for the Services page. Optional. */
  image?: { src: string; alt: string; width: number; height: number }
}

/** Services. Order here is the order shown everywhere. */
export const SERVICES: Service[] = [
  {
    id: 'driveway',
    name: 'Driveway clearing',
    short: 'Room to get the car out, and back in, without wading through drifts.',
    long: [
      'We shovel your driveway so you can get the car out and back in without fighting the snow first.',
      'Tell us how long and wide the driveway is, whether it slopes, and where you would like the snow piled. We plan the work around your property.',
    ],
  },
  {
    id: 'walkway',
    name: 'Walkway and sidewalk clearing',
    short: 'A clear line from the street to your door for you, guests and deliveries.',
    long: [
      'We clear the walkway from your driveway or the street to your front door, and the public sidewalk along your property if you want it done.',
      'A clear path makes it easier for family, guests, mail and deliveries to reach the house.',
    ],
  },
  {
    id: 'steps',
    name: 'Steps, porches and entryways',
    short: 'The last few feet to the door, where snow tends to pile up.',
    long: [
      'Front steps, stoops, porches and the landing outside your door get cleared by hand.',
      'Let us know about railings, planters or anything else near the steps so we can work carefully around them.',
    ],
  },
  {
    id: 'residential',
    name: 'Residential snow shoveling',
    short: 'Help with the shoveling around your home that does not fit a box.',
    long: [
      'Some homes need more than a driveway and a path: a side gate, a patio door, the route to the trash bins, a second walkway.',
      'Describe what you need in your request and we will tell you what we can help with.',
    ],
  },
]

export type Area = {
  id: string
  name: string
  blurb: string
  image: { src: string; alt: string; width: number; height: number }
}

/** Service areas. Only list places you actually serve. */
export const AREAS: Area[] = [
  {
    id: 'reston',
    name: 'Reston',
    blurb:
      'From cluster homes and townhouses near the lakes to single-family streets off Reston Parkway, we help Reston homeowners clear driveways, walkways and front steps.',
    image: {
      src: asset('/images/reston-town-center.jpg'),
      alt: 'Reston Town Center streets with tall buildings and bare winter trees',
      width: 1400,
      height: 722,
    },
  },
  {
    id: 'herndon',
    name: 'Herndon',
    blurb:
      'Around downtown Herndon and the neighborhoods beyond it, we shovel driveways, sidewalks and porches for homeowners who would rather not.',
    image: {
      src: asset('/images/herndon-va.jpg'),
      alt: 'Historic downtown Herndon, Virginia, with a brick building and street lamps',
      width: 1024,
      height: 768,
    },
  },
  {
    id: 'great-falls',
    name: 'Great Falls',
    blurb:
      'Great Falls homes often sit on larger lots with long driveways. Tell us about yours and we will look at what it takes to clear it.',
    image: {
      src: asset('/images/great-falls-winter.jpg'),
      alt: 'The Great Falls of the Potomac River in winter, white water between dark rocks',
      width: 1400,
      height: 931,
    },
  },
]

/** Footer picture credits. Remove an entry if its picture is removed. */
export const CREDITS = [
  {
    title: 'Great Falls, Virginia',
    by: 'NPS Photo; Monica',
    licence: 'public domain',
    licenceUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    page: 'https://commons.wikimedia.org/wiki/File:The_Great_Falls_of_the_Potomac_are_a_popular_scenic_view_just_minutes_outside_of_DC._While_millions_flock_to_them_today,_George_(8f5a57fc-1dd8-b71b-0b1f-6eb27f4ced21).JPG',
  },
  {
    title: 'GreatFallsPotomocRiverWinter',
    by: 'MamaGeek',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    page: 'https://commons.wikimedia.org/wiki/File:GreatFallsPotomocRiverWinter.jpg',
  },
  {
    title: 'Reston town center',
    by: 'Payton Chung',
    licence: 'CC BY 2.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/2.0',
    page: 'https://commons.wikimedia.org/wiki/File:Reston_town_center.jpg',
  },
  {
    title: 'Herndon, VA',
    by: 'Dion Hinchcliffe',
    licence: 'CC BY-SA 2.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    page: 'https://commons.wikimedia.org/wiki/File:Herndon,_VA.jpg',
  },
  {
    title: '38 Jan 1979 Shoveling snow Chicago',
    by: 'Downtowngal',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    page: 'https://commons.wikimedia.org/wiki/File:38_Jan_1979_Shoveling_snow_Chicago.jpg',
  },
]
