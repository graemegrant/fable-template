/**
 * Cinematic demo content: Wythe Glass. Swapped in for lib/data.ts when built
 * with DEMO=cinematic (see demos/README.md); exports exactly what
 * lib/data.ts does (demos/check.ts enforces it). English only, invented for
 * the demo. Wythe Water is a fictional lake; the places around it are real.
 *
 * Photos are free Unsplash photos (Unsplash License), each checked on its
 * photo page, with the photographer and, where stated, the place noted
 * beside it. Bathrooms, food, weddings and portraits are the template's own
 * generic photos.
 */
import type {
  RoomI18n, ExperienceI18n, OfferI18n, JournalPostI18n, TestimonialI18n, TeamMemberI18n,
} from '../../lib/types';
import type { LocaleField } from '../../lib/locales';

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Same keys as the template's IMG (shared page loaders use them), filled
 *  with lake and fell photos; the extra keys are for this demo's own content. */
export const IMG = {
  heroHouse: u('photo-1776595900864-674b5c4b7b79'), // Sam Burrough: misty lake, trees reflected in still water
  exterior: u('photo-1782392455081-a09db8267afb'), // Maverick Frame: a timber-and-glass house among trees
  glen: u('photo-1615393911241-32add28288a5'), // James Armes: Buttermere and its fells, Lake District
  forest: u('photo-1628616043557-78460cc89ab7'), // Josh Kirk: Haystacks, Lake District
  loch: u('photo-1516537042526-141061d2483b'), // Elliot Pannaman: a jetty in the mist, Windermere
  room1: u('photo-1781572725438-ac8c41476752'), // João Emanuel: bedroom opening onto green
  room2: u('photo-1765862835319-18fb6f8caff6'), // Puscas Adryan: calm minimalist bedroom
  room3: u('photo-1779364867798-386fb7213a2c'), // Kseniia Lapshina: white bed in morning sun
  room4: u('photo-1757344454333-cc666252e596'), // Poojan Thanekar: bedroom in warm timber
  room5: u('photo-1774311237295-a65a4c1ff38a'), // Clay Banks: a room with a wide window onto trees
  room6: u('photo-1774199679021-db3b421867c3'), // Clay Banks: living room with glass walls onto woodland
  bath: u('photo-1552858725-2758b5fb1286'),
  dining1: u('photo-1778694277039-5cbf0b9a1fcf'), // Romain Gal: a long table by candlelight
  dining2: u('photo-1773578978637-c9771e7a9913'), // Clay Banks: dining room with tall windows
  food1: u('photo-1467003909585-2f8a72700288'),
  food2: u('photo-1504674900247-0877df9cc836'),
  whisky: u('photo-1724931498964-a1f392ba9ace'), // Clay Banks: a wood-burning stove
  spa: u('photo-1788515917792-790e6b1d9af5'), // Auroom Wellness: a glass-fronted sauna on a lakeshore
  wedding1: u('photo-1519225421980-715cb0215aed'),
  wedding2: u('photo-1511795409834-ef04bbd61622'),
  garden: u('photo-1560247524-752d448a5c58'), // Steve Taylor: the shore at Buttermere, Lake District
  fire: u('photo-1648536474504-7bbf8a1ee3ab'), // Alona Gross: a fire behind glass
  walk: u('photo-1609432907191-5b18b010fbbd'), // Ian Cylkowski: Latrigg above Derwentwater, Lake District
  fishing: u('photo-1427606694672-8f86d75947ce'), // Robert Crawford: a rowing boat on still water
  portrait1: u('photo-1560250097-0b93528c311a', 900),
  portrait2: u('photo-1573496359142-b8d87734a5a2', 900),
  portrait3: u('photo-1472099645785-5658abf4ff4e', 900),
  portrait4: u('photo-1438761681033-6461ffad8d80', 900),
  portrait5: u('photo-1500648767791-00dcc994a43e', 900),
  portrait6: u('photo-1544005313-94ddf0286df2', 900),
  ullswater: u('photo-1740525030760-5a8614c377dd'), // Samuel Arkwright: Ullswater from the hill, Lake District
  sailing: u('photo-1606065399197-5f697be15c7e'), // JOGphotos: sailing on Windermere
  derwentwater: u('photo-1678578389555-ff74eaf27855'), // Rodion Kutsaiev: Derwentwater at dusk, Keswick
  glasshouse: u('photo-1760661829532-4822e399abed'), // Dmitry Spravko: a glasshouse lit at dusk
  sauna: u('photo-1786800005702-5d65229a3e5c'), // Clay Banks: inside a timber sauna
};

let k = 0;
const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: `b${k++}`,
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: `s${k++}`, text, marks: [] }],
});
/** English-only field: this demo is published in English alone. */
const en = (text: string): LocaleField => ({ en: text });

export const rooms: RoomI18n[] = [
  {
    roomType: en('The Pavilion Suite'),
    slug: 'pavilion-suite',
    hook: en('The end of the glass wing, with water on three sides and a bath facing the lake.'),
    roomCount: 1,
    description: en(
      'The last room in the glass wing, where the building reaches out over the shore. Water on three sides, a freestanding bath turned to face the lake, and a terrace a few steps above the jetty. Wake early and you will watch the mist leave the water from bed.',
    ),
    heroImage: IMG.room1,
    gallery: [IMG.room1, IMG.bath, IMG.room6, IMG.heroHouse],
    rate: 620,
    sqm: 62,
    occupancy: 3,
    floor: 'Ground floor, glass wing',
    view: 'Water on three sides',
    amenities: [
      en('Super-king bed'),
      en('Freestanding bath facing the lake'),
      en('Walk-in rainfall shower'),
      en('Private terrace above the jetty'),
      en('Wood-burning stove'),
      en('Cumbrian-made toiletries'),
      en('Coffee machine and a pantry of local things'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('Lakeside'),
    slug: 'lakeside',
    hook: en('A wall of glass, the lake beyond it, and nothing in between.'),
    roomCount: 3,
    description: en(
      'Our signature rooms: the whole lake wall is glass, floor to ceiling, so the bed sits in the view. Linen blinds for when you want them, a deep chair by the window for when you do not.',
    ),
    heroImage: IMG.room2,
    gallery: [IMG.room2, IMG.room3, IMG.bath, IMG.garden],
    rate: 420,
    sqm: 38,
    occupancy: 2,
    floor: 'Ground and first floors',
    view: 'Straight across Wythe Water',
    amenities: [
      en('King bed'),
      en('Floor-to-ceiling lake window'),
      en('Walk-in shower'),
      en('Reading chair by the glass'),
      en('Cumbrian-made toiletries'),
      en('Coffee machine'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('Fellside'),
    slug: 'fellside',
    hook: en('Facing the slope behind the house, all morning sun and birdsong.'),
    roomCount: 2,
    description: en(
      'On the fell side of the building, looking up through birch and bracken to the open hill. These are the brightest rooms in the morning, and the quietest at night.',
    ),
    heroImage: IMG.room3,
    gallery: [IMG.room3, IMG.room4, IMG.bath, IMG.forest],
    rate: 340,
    sqm: 32,
    occupancy: 2,
    floor: 'First floor',
    view: 'Up the fell through the birches',
    amenities: [
      en('King or twin beds'),
      en('Morning sun'),
      en('Walk-in shower'),
      en('Cumbrian-made toiletries'),
      en('Coffee machine'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('The Boathouse'),
    slug: 'the-boathouse',
    hook: en('A timber room over the old boathouse, with its own steps down to the water.'),
    roomCount: 1,
    description: en(
      'Built into the roof of the old stone boathouse, lined in larch and warm on the coldest night. Its own steps lead down to the boats, so the first row of the morning is yours.',
    ),
    heroImage: IMG.room4,
    gallery: [IMG.room4, IMG.fishing, IMG.bath, IMG.loch],
    rate: 390,
    sqm: 34,
    occupancy: 2,
    floor: 'Over the boathouse',
    view: 'The jetty and the lake',
    amenities: [
      en('King bed'),
      en('Own steps to the jetty'),
      en('Larch-lined walls'),
      en('Walk-in shower'),
      en('Cumbrian-made toiletries'),
    ],
    active: true,
  },
  {
    roomType: en('The Reed Room'),
    slug: 'reed-room',
    hook: en('Low to the ground, looking out through the reed beds at the water.'),
    roomCount: 1,
    description: en(
      'A ground-floor room at the reedy end of the shore, where the herons fish in the morning. Step-free from the car to the bed, with a wet room and space to move.',
    ),
    heroImage: IMG.room5,
    gallery: [IMG.room5, IMG.room2, IMG.bath, IMG.garden],
    rate: 360,
    sqm: 36,
    occupancy: 2,
    floor: 'Ground floor',
    view: 'Through the reeds to the water',
    amenities: [
      en('King or twin beds'),
      en('Step-free throughout'),
      en('Wet room'),
      en('Cumbrian-made toiletries'),
      en('Coffee machine'),
    ],
    active: true,
  },
  {
    roomType: en('The Hide'),
    slug: 'the-hide',
    hook: en('A small glass room in the trees, for two people and a lot of quiet.'),
    roomCount: 1,
    description: en(
      'Our smallest room, set apart among the trees a short walk along the shore. Glass on two sides, a stove, a very good bed and nothing else to do.',
    ),
    heroImage: IMG.room6,
    gallery: [IMG.room6, IMG.fire, IMG.bath, IMG.exterior],
    rate: 290,
    sqm: 24,
    occupancy: 2,
    floor: 'Among the trees',
    view: 'Woodland and a glimpse of water',
    amenities: [
      en('Double bed'),
      en('Wood-burning stove'),
      en('Glass on two sides'),
      en('Walk-in shower'),
      en('Cumbrian-made toiletries'),
    ],
    active: true,
  },
];

export const experiences: ExperienceI18n[] = [
  {
    name: en('First Light on the Water'),
    slug: 'first-light-row',
    category: 'On the water',
    description: en(
      'Take a rowing boat out before breakfast, while the mist is still on the lake. We leave a flask of coffee on the jetty and the oars in the boat. Nobody else will be out there.',
    ),
    heroImage: IMG.fishing,
    duration: en('As long as you like'),
    price: en('Included in every stay'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [en('A rowing boat and life jackets'), en('A flask of coffee on the jetty'), en('A map of the lake'), en('Breakfast when you are back')],
  },
  {
    name: en('Sauna and Cold Water'),
    slug: 'sauna-and-cold-water',
    category: 'Wellbeing',
    description: en(
      'The glass-fronted sauna sits on the shore, ten steps from the water. Heat, then the lake, then heat again, the way they do it in the north. Book an hour for two, morning or evening.',
    ),
    heroImage: IMG.spa,
    duration: en('1 hour'),
    price: en('Included in every stay'),
    seasons: ['Year round'],
    includes: [en('Private hour for two'), en('Robes and towels'), en('Herbal tea afterwards'), en('A swim guide for the lake')],
  },
  {
    name: en('A Fell Walk with Ruth'),
    slug: 'fell-walk',
    category: 'On the fells',
    description: en(
      'A guided walk from the door up onto the open fell with Ruth, who has walked these hills all her life. The route depends on the weather and on you; the view from the top does not.',
    ),
    heroImage: IMG.walk,
    duration: en('Half day'),
    price: en('From £45 per person'),
    seasons: ['Year round'],
    includes: [en('Local guide'), en('Packed lunch from the kitchen'), en('Walking poles and maps'), en('A drink by the stove when you return')],
  },
  {
    name: en('Sailing on Windermere'),
    slug: 'sailing-windermere',
    category: 'Days out',
    description: en(
      'A day on England’s longest lake, with a skipper and a small yacht. No experience needed: you can take the helm or simply watch the fells go by.',
    ),
    heroImage: IMG.sailing,
    duration: en('Full day'),
    price: en('From £140 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [en('Skipper and yacht'), en('Lunch on board'), en('Transfers from the hotel'), en('Waterproofs if needed')],
  },
  {
    name: en('The Buttermere Round'),
    slug: 'buttermere-round',
    category: 'On the fells',
    description: en(
      'One of the loveliest low-level walks in the country: all the way round Buttermere, through the tunnel in the rock and back along the shore. We drop you off and collect you.',
    ),
    heroImage: IMG.garden,
    duration: en('3 hours'),
    price: en('From £20 per person'),
    seasons: ['Year round'],
    includes: [en('Drop-off and collection'), en('Route card'), en('Picnic from the kitchen'), en('Tea and cake on your return')],
  },
  {
    name: en('Derwentwater at Dusk'),
    slug: 'derwentwater-at-dusk',
    category: 'Days out',
    description: en(
      'An early supper in Keswick, then the last launch of the day round Derwentwater as the light goes. Back at the house in time for a nightcap by the fire.',
    ),
    heroImage: IMG.derwentwater,
    duration: en('One evening'),
    price: en('From £55 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [en('Return transfers'), en('Supper booked in Keswick'), en('Launch tickets'), en('A nightcap on us')],
  },
];

export const offers: OfferI18n[] = [
  {
    title: en('Midweek on the Water'),
    slug: 'midweek-on-the-water',
    subtitle: en('Sunday to Thursday'),
    description: en(
      'The lake is quietest midweek, and so are our prices. Fifteen percent off stays from Sunday to Thursday, with an extra hour in the sauna on us.',
    ),
    tag: en('Best value'),
    image: IMG.glen,
    inclusions: [en('15% off room rates'), en('An extra sauna hour'), en('Breakfast each morning'), en('Late check-out on request')],
    type: 'Stay',
  },
  {
    title: en('Winter Glass'),
    slug: 'winter-glass',
    subtitle: en('November to March'),
    description: en(
      'Two nights when the fells are white and the stove is lit: snow on the hill, frost on the jetty and dinner by the fire. The best time of year to be behind glass.',
    ),
    tag: en('Seasonal'),
    image: IMG.fire,
    inclusions: [en('Two nights with breakfast'), en('Dinner on your first night'), en('Sauna every evening'), en('Late check-out')],
    validFrom: '2026-11-01',
    validUntil: '2027-03-31',
    type: 'Seasonal',
  },
  {
    title: en('Sauna and Supper'),
    slug: 'sauna-and-supper',
    subtitle: en('Heat, the lake, then dinner'),
    description: en(
      'A night with an evening sauna, a swim in the lake if you are brave, and the tasting menu afterwards. Most popular in the darker months.',
    ),
    tag: en('Most popular'),
    image: IMG.spa,
    inclusions: [en('One night with breakfast'), en('Evening sauna for two'), en('Tasting menu for two'), en('Robes to keep')],
    type: 'Stay',
  },
  {
    title: en('The Celebration Stay'),
    slug: 'celebration-stay',
    subtitle: en('Mark it properly'),
    description: en(
      'Birthdays, anniversaries and long-overdue weekends away. Champagne in the room, a table by the glass, and an upgrade to the Pavilion Suite when we can.',
    ),
    tag: en('Occasions'),
    image: IMG.room1,
    inclusions: [en('Room upgrade when available'), en('Champagne on arrival'), en('Dinner for two'), en('Late check-out')],
    type: 'Occasion',
  },
];

export const journalPosts: JournalPostI18n[] = [
  {
    title: en('Why We Built in Glass'),
    slug: 'why-we-built-in-glass',
    category: 'The House',
    author: 'Imogen Hale',
    publishedAt: '2026-03-02',
    readingTime: en('5 min read'),
    excerpt: en('The lake changes every hour. We wanted rooms that let you watch it do so.'),
    heroImage: IMG.exterior,
    featured: true,
    body: {
      en: [
        block('When we first stood on this shore, the lake did four different things in an hour: mist, then sun, then a squall coming down off the fell, then flat calm. The whole idea of the house came from that afternoon.'),
        block('Walls that get out of the way', 'h2'),
        block('So the walls facing the water are glass, floor to ceiling, and everything else is quiet: larch, stone, linen. The building is there to frame the view, not to compete with it.'),
        block('Warm, not just beautiful', 'h2'),
        block('Glass in the Lake District has to work hard. Ours is triple-glazed, the floors are heated by a ground-source pump, and every room has blinds for the nights you want to shut the weather out.'),
        block('The best room in the house is the lake. We just put a bed in front of it.', 'blockquote'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('Five Fell Walks from the Door'),
    slug: 'five-fell-walks',
    category: 'On the Fells',
    author: 'Ruth Pattinson',
    publishedAt: '2025-10-14',
    readingTime: en('6 min read'),
    excerpt: en('No car needed. Our guide picks five walks that start at the jetty.'),
    heroImage: IMG.walk,
    featured: true,
    body: {
      en: [
        block('You can leave the car where it is for the whole of your stay. These five walks all start and finish at the front door, from an hour by the water to a full day on the tops.'),
        block('Start low', 'h2'),
        block('The shore path is flat, easy and beautiful in any weather. Go early, and you will have the herons for company.'),
        block('Then climb', 'h2'),
        block('The fell behind the house is a steady two-hour climb with a view over five lakes at the top. Ask at the desk and we will pack you lunch.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('The Sauna Habit'),
    slug: 'the-sauna-habit',
    category: 'Wellbeing',
    author: 'Imogen Hale',
    publishedAt: '2025-12-08',
    readingTime: en('4 min read'),
    excerpt: en('Heat, cold water, repeat. How a Finnish tradition found a home on a Cumbrian lake.'),
    heroImage: IMG.spa,
    featured: true,
    body: {
      en: [
        block('The sauna was the first thing we built, before the house had a roof. We wanted guests to have a reason to get into the lake in every season, and nothing makes you braver than a hot sauna ten steps away.'),
        block('How to do it', 'h2'),
        block('Ten minutes of heat, a slow walk into the water, then back to the bench. Three rounds is plenty. Tea afterwards is not optional.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('A Short Guide to the Western Lakes'),
    slug: 'western-lakes',
    category: 'The Lakes',
    author: 'Tom Birkett',
    publishedAt: '2025-08-20',
    readingTime: en('5 min read'),
    excerpt: en('Buttermere, Crummock, Loweswater and Ennerdale: the quieter side of the Lake District.'),
    heroImage: IMG.ullswater,
    body: {
      en: [
        block('Most visitors never get further west than Keswick. Their loss. The western lakes are smaller, quieter and, we would argue, lovelier.'),
        block('Where to start', 'h2'),
        block('Buttermere first, for the walk round the shore. Then Crummock Water, then Loweswater for a pint at the inn. Ennerdale, the wildest of them all, can wait for another day.'),
      ],
    } as LocaleField<unknown[]>,
  },
];

export const testimonials: TestimonialI18n[] = [
  {
    guestName: 'H. & R. Lindqvist',
    quote: en('We spent the whole weekend watching the lake change from the bath in the Pavilion Suite. The sauna at dusk, then dinner by the glass. We have already booked to come back.'),
    rating: 5,
    roomStayed: 'The Pavilion Suite',
    date: '2026-04-18',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'Priya M.',
    quote: en('Rowed out at six in the morning with the mist still on the water and not another soul about. The most peaceful hour I have had in years.'),
    rating: 5,
    roomStayed: 'The Boathouse',
    date: '2025-09-07',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'The Okafor family',
    quote: en('The team thought of everything, from the step-free Reed Room to the packed lunches for the fells. The food was some of the best we have eaten in the Lakes.'),
    rating: 5,
    roomStayed: 'The Reed Room',
    date: '2025-07-26',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'J. Whitfield',
    quote: en('Snow on the fells, the stove lit, and a whole wall of glass between us and the weather. Winter is the time to come.'),
    rating: 5,
    roomStayed: 'Lakeside',
    date: '2026-01-31',
    source: 'Direct review',
    featured: true,
  },
];

export const team: TeamMemberI18n[] = [
  {
    name: 'Imogen Hale',
    role: en('Owner'),
    bio: en('Grew up two valleys over, trained as an architect and came home to build the house she always wanted to stay in.'),
    headshot: IMG.portrait2,
    department: 'Management',
    displayOrder: 1,
  },
  {
    name: 'Tom Birkett',
    role: en('Head Chef'),
    bio: en('Cumbrian born, trained in Copenhagen and London. Cooks with what the fells, the lake and a few good farms give him.'),
    headshot: IMG.portrait3,
    department: 'Kitchen',
    displayOrder: 2,
  },
  {
    name: 'Ruth Pattinson',
    role: en('Fell Guide'),
    bio: en('Has walked every fell in the western Lakes, most of them more than once, and knows where the weather will turn before it does.'),
    headshot: IMG.portrait4,
    department: 'Experiences',
    displayOrder: 3,
  },
  {
    name: 'Sami Virtanen',
    role: en('Sauna Master'),
    bio: en('Brought the sauna habit from Finland and will happily explain, at length, why the lake is never too cold.'),
    headshot: IMG.portrait5,
    department: 'Wellbeing',
    displayOrder: 4,
  },
  {
    name: 'Owen Nicholson',
    role: en('Front of House'),
    bio: en('Runs the desk, the boats and the bar. Ask him which fell to climb today and he will check the sky before he answers.'),
    headshot: IMG.portrait1,
    department: 'Front of House',
    displayOrder: 5,
  },
  {
    name: 'Freya Sharp',
    role: en('Head of Housekeeping'),
    bio: en('Keeps nine rooms and a great deal of glass spotless, which in the Lake District is no small thing.'),
    headshot: IMG.portrait6,
    department: 'Housekeeping',
    displayOrder: 6,
  },
];

export const facilities: Array<{ title: LocaleField; detail: LocaleField }> = [
  { title: en('The lakeshore sauna'), detail: en('Glass-fronted, wood-fired and ten steps from the water. An hour for two is included in every stay.') },
  { title: en('Rowing boats'), detail: en('Six boats on the jetty, free whenever the lake is calm.') },
  { title: en('Breakfast included'), detail: en('Served by the glass until 10am, with eggs from the farm up the lane.') },
  { title: en('Free parking & EV charging'), detail: en('Parking for every room, with two chargers by the barn.') },
  { title: en('Drying room'), detail: en('For wet boots and coats after a day on the fells.') },
  { title: en('Free Wi-Fi'), detail: en('Throughout the house, though we hope you will not need it much.') },
];

export const policies: Array<{ title: LocaleField; body: LocaleField }> = [
  { title: en('Check-in & check-out'), body: en('Check-in is from 3pm and check-out is by 11am. Reception is open from 7am to 11pm; arriving later, ring the bell.') },
  { title: en('Breakfast'), body: en('Breakfast is included in every room rate, served until 10am.') },
  { title: en('Booking, payment & cancellations'), body: en('The cancellation terms and any deposit depend on the rate you choose. They are shown before you confirm your booking, and again in your confirmation email.') },
  { title: en('Children'), body: en('Children over eight are welcome. The lake is deep close to the shore, so children must be with an adult by the water.') },
  { title: en('Dogs'), body: en('We are not able to take dogs, as the house is shared with a great deal of wildlife.') },
  { title: en('Accessibility'), body: en('The Reed Room, reception, the restaurant and the path to the sauna are step-free. Call us and we will talk through your needs.') },
  { title: en('Swimming & boats'), body: en('Swimming and rowing are at your own risk. Life jackets are on the jetty and must be worn in the boats.') },
  { title: en('Weddings & private hire'), body: en('Weddings and private hire have their own terms. Ask us for details.') },
];

export const faqs = [
  { q: en('What are your check-in and check-out times?'), a: en('Check-in is from 3pm and check-out by 11am. Reception is open from 7am to 11pm.') },
  { q: en('Is there parking?'), a: en('Yes, free parking for every room, with two EV chargers by the barn.') },
  { q: en('Can we swim in the lake?'), a: en('Yes, at your own risk. The water is cold all year, which is rather the point after the sauna.') },
  { q: en('Do you need a car?'), a: en('It helps. The nearest station is Workington, about thirty minutes away, and we can collect you by arrangement.') },
  { q: en('Can you cater for dietary requirements?'), a: en('Yes. Tell us when you book and the kitchen will plan properly. Vegetarian and vegan dishes are on every menu.') },
  { q: en('Are dogs welcome?'), a: en('We are sorry, but we do not take dogs.') },
];

export const attractions = [
  { name: 'Buttermere', distance: '15 minutes', description: en('Perhaps the loveliest lake in the Lakes, with an easy walk all the way round the shore.') },
  { name: 'Crummock Water', distance: '10 minutes', description: en('Long, quiet and overlooked by the fells, with a waterfall a short walk away.') },
  { name: 'Keswick and Derwentwater', distance: '30 minutes', description: en('The busy little capital of the northern Lakes, with launches round the lake and a famous pencil museum.') },
  { name: 'Honister Pass', distance: '25 minutes', description: en('A dramatic mountain road, and England’s last working slate mine at the top.') },
  { name: 'Cockermouth', distance: '20 minutes', description: en('A handsome market town and the birthplace of Wordsworth.') },
  { name: 'Ennerdale', distance: '35 minutes', description: en('The wildest of the lakes, with no road along its shore.') },
];

export const directions = [
  { mode: en('By rail'), detail: en('Workington is the nearest station, about thirty minutes away. Penrith, on the West Coast Main Line, is an hour. We can collect you from either.') },
  { mode: en('By car'), detail: en('Leave the M6 at junction 40 and take the A66 west past Keswick. The last few miles are narrow lanes; we send directions when you book.') },
  { mode: en('By air'), detail: en('Manchester and Glasgow airports are both about two and a half hours by car.') },
  { mode: en('On foot'), detail: en('The Coast to Coast walk passes within a few miles. Walkers are very welcome, and the drying room is ready.') },
];

/** None for the demo: press quotes must be real, from real coverage. */
export const pressMentions: Array<{ outlet: string; quote: LocaleField }> = [];

export const menus = [
  {
    name: en('Breakfast'),
    note: en('Served by the glass until 10am'),
    items: [
      { dish: en('The Cumbrian'), detail: en('Cumberland sausage, bacon, black pudding, eggs from up the lane and grilled tomato') },
      { dish: en('Smoked trout'), detail: en('Lightly smoked in the house, with scrambled eggs and rye') },
      { dish: en('Porridge'), detail: en('With fell honey and a spoon of cream') },
      { dish: en('Sourdough and jam'), detail: en('From the bakery in Cockermouth, with damson jam') },
    ],
  },
  {
    name: en('Dinner'),
    note: en('Served 6.30 to 9pm'),
    items: [
      { dish: en('Lake trout'), detail: en('Cured, with cucumber, dill and buttermilk') },
      { dish: en('Herdwick lamb'), detail: en('From a fell farm in the next valley, with wild garlic and potatoes') },
      { dish: en('Hen of the woods'), detail: en('Roasted mushroom, celeriac and hazelnut') },
      { dish: en('Damson'), detail: en('Damson tart, brown butter ice cream') },
    ],
  },
  {
    name: en('The Glass Bar'),
    note: en('Open until midnight'),
    items: [
      { dish: en('Damson gin and tonic'), detail: en('With gin from a Cumbrian distillery') },
      { dish: en('The Wythe Martini'), detail: en('Very cold, very dry, with a pine-needle tincture') },
      { dish: en('Cumbrian ales'), detail: en('Three on tap from breweries within twenty miles') },
      { dish: en('Cheese board'), detail: en('Three northern cheeses, oatcakes and chutney') },
    ],
  },
];

export const voucherTypes = [
  {
    name: en('The Monetary Voucher'),
    price: 'From £50',
    description: en('Any amount from fifty pounds, to spend on rooms, dinner and everything we arrange.'),
    image: IMG.exterior,
  },
  {
    name: en('Sauna and Supper for Two'),
    price: '£180',
    description: en('An evening sauna by the lake, then the tasting menu by the glass. The best night of the week.'),
    image: IMG.spa,
  },
  {
    name: en('A Night on the Water'),
    price: 'From £290',
    description: en('A night for two with breakfast, the sauna and a boat on the lake. The easiest gift there is.'),
    image: IMG.room2,
  },
];
