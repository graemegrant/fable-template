/**
 * Urban demo content: The Ardlow. Swapped in for lib/data.ts when built
 * with DEMO=urban (see demos/README.md); exports exactly what lib/data.ts
 * does (demos/check.ts enforces it). English only, invented for the demo.
 *
 * Photos are free Unsplash photos (Unsplash License), each resolved through
 * unsplash.com/photos/<id>/download, which only succeeds for free photos.
 * The photographer and place are noted beside each. Bedrooms, food,
 * weddings and portraits are the template's own generic photos, which suit
 * a dark, wood-panelled townhouse.
 */
import type {
  RoomI18n, ExperienceI18n, OfferI18n, JournalPostI18n, TestimonialI18n, TeamMemberI18n,
} from '../../lib/types';
import type { LocaleField } from '../../lib/locales';

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Same keys as the template's IMG (shared page loaders use them), filled
 *  with city photos; the extra keys are for this demo's own content. */
export const IMG = {
  heroHouse: u('photo-1705335564097-db5ab053950d'), // Johnny Briggs: Ashton Lane at dusk, Glasgow
  exterior: u('photo-1705335566571-eb63560055d4'), // Johnny Briggs: cobbled lane at dusk, Glasgow
  glen: u('photo-1704322624412-84ca3103ecfa'), // Phil Reid: the Clyde and the Finnieston Crane, Glasgow
  forest: u('photo-1571494146906-86de15d3817b'), // Adam Marikar: the Clyde through the city, Glasgow
  loch: u('photo-1590392452408-642c4498274c'), // Euan Cameron: the M8 at night, Glasgow
  room1: u('photo-1611892440504-42a792e24d32'),
  room2: u('photo-1590490360182-c33d57733427'),
  room3: u('photo-1582719478250-c89cae4dc85b'),
  room4: u('photo-1566665797739-1674de7a421a'),
  room5: u('photo-1578683010236-d716f9a3f461'),
  room6: u('photo-1505693416388-ac5ce068fe85'),
  bath: u('photo-1552858725-2758b5fb1286'),
  dining1: u('photo-1515347115-0b191ae564e7'), // Hein van Tonder: dark dining room
  dining2: u('photo-1727816563570-f94ae1bbd0ad'), // Valeria Kodra: lamplit dining room
  food1: u('photo-1467003909585-2f8a72700288'),
  food2: u('photo-1504674900247-0877df9cc836'),
  whisky: u('photo-1729863254255-41ae48c03301'), // David Utt: a drink poured at the bar
  spa: u('photo-1544161515-4ab6ce6db874'),
  wedding1: u('photo-1519225421980-715cb0215aed'),
  wedding2: u('photo-1511795409834-ef04bbd61622'),
  garden: u('photo-1678654723105-825dc5084702'), // Geo Chierchia: Kelvingrove Art Gallery and Museum, Glasgow
  fire: u('photo-1709548145082-04d0cde481d4'), // Oliver Guhr: the bar after dark
  walk: u('photo-1550349957-1ad49b79ed63'), // Crawford Jolly: Sauchiehall Lane, Glasgow
  fishing: u('photo-1559051368-c4c714c253dc'), // Brian Taylor: whisky casks at a Scottish cooperage
  portrait1: u('photo-1560250097-0b93528c311a', 900),
  portrait2: u('photo-1573496359142-b8d87734a5a2', 900),
  portrait3: u('photo-1472099645785-5658abf4ff4e', 900),
  portrait4: u('photo-1438761681033-6461ffad8d80', 900),
  portrait5: u('photo-1500648767791-00dcc994a43e', 900),
  portrait6: u('photo-1544005313-94ddf0286df2', 900),
  gig: u('photo-1604177052603-c2b4cff228db'), // Filip Andrejevic: a band on stage
  lochLomond: u('photo-1609511400549-b49b69d5a0ca'), // Sam Barber: jetty on Loch Lomond
  clydeAerial: u('photo-1623401586941-7c26e4355151'), // Stephen O'Donnell: the Clyde from above, Glasgow
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
    roomType: en('The Loft'),
    slug: 'the-loft',
    hook: en('The whole top floor, under the original roof beams, with a bath in the middle of the room.'),
    roomCount: 1,
    description: en(
      'The top floor of the old warehouse, opened up under its original timber beams. A freestanding bath sits in the middle of the room, a record player sits by the window, and the city skyline does the rest. Big enough to host a few friends for a drink before dinner, if you are that kind of guest.',
    ),
    heroImage: IMG.room1,
    gallery: [IMG.room1, IMG.bath, IMG.room2, IMG.loch],
    rate: 345,
    sqm: 58,
    occupancy: 3,
    floor: 'Fourth floor',
    view: 'Over the Merchant City rooftops',
    amenities: [
      en('Super-king bed'),
      en('Freestanding bath'),
      en('Walk-in rainfall shower'),
      en('Record player and a crate of vinyl'),
      en('Bar cart with a bottle of local gin'),
      en('Bluetooth speaker'),
      en('Scottish-made toiletries'),
      en('Coffee machine'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('The Merchant'),
    slug: 'the-merchant',
    hook: en('Tall windows, a writing desk and the best view down the lane.'),
    roomCount: 2,
    description: en(
      'Our signature room: tall Victorian windows over Ardlow Lane, dark panelled walls, a proper writing desk and a deep armchair. The kind of room people book for one night and extend to three.',
    ),
    heroImage: IMG.room2,
    gallery: [IMG.room2, IMG.room3, IMG.bath, IMG.exterior],
    rate: 245,
    sqm: 34,
    occupancy: 2,
    floor: 'First and second floors',
    view: 'Down Ardlow Lane',
    amenities: [
      en('King bed'),
      en('Writing desk'),
      en('Walk-in shower'),
      en('Armchair by the window'),
      en('Scottish-made toiletries'),
      en('Coffee machine'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('The Atelier'),
    slug: 'the-atelier',
    hook: en('A corner room full of light, named for the artists who rented it a century ago.'),
    roomCount: 1,
    description: en(
      'A corner room with windows on two sides and light all afternoon. In the 1920s it was let to painters from the art school up the hill; we kept the north light and added a very good bed.',
    ),
    heroImage: IMG.room3,
    gallery: [IMG.room3, IMG.room4, IMG.bath, IMG.garden],
    rate: 225,
    sqm: 30,
    occupancy: 2,
    floor: 'Third floor',
    view: 'North and east, over the city',
    amenities: [
      en('King bed'),
      en('Windows on two sides'),
      en('Walk-in shower'),
      en('Reading chair'),
      en('Scottish-made toiletries'),
      en('Coffee machine'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('The Snug'),
    slug: 'the-snug',
    hook: en('Small, dark and very comfortable. A favourite for gig nights.'),
    roomCount: 6,
    description: en(
      'Our smallest rooms, and some of the most booked. Dark walls, a big bed, blackout curtains and everything you need for a night in the city and a long sleep afterwards.',
    ),
    heroImage: IMG.room4,
    gallery: [IMG.room4, IMG.room5, IMG.bath, IMG.walk],
    rate: 165,
    sqm: 18,
    occupancy: 2,
    floor: 'Various floors',
    view: 'The courtyard',
    amenities: [
      en('Double bed'),
      en('Blackout curtains'),
      en('Walk-in shower'),
      en('Scottish-made toiletries'),
      en('Coffee machine'),
    ],
    active: true,
  },
  {
    roomType: en('No. 9'),
    slug: 'no-9',
    hook: en('A quiet room at the back of the house, over the courtyard.'),
    roomCount: 4,
    description: en(
      'Set back from the lane, over the courtyard, and the quietest rooms in the building. Exposed brick, a generous bed and a bathroom with both bath and shower.',
    ),
    heroImage: IMG.room5,
    gallery: [IMG.room5, IMG.room6, IMG.bath, IMG.fire],
    rate: 195,
    sqm: 26,
    occupancy: 2,
    floor: 'First to third floors',
    view: 'The courtyard',
    amenities: [
      en('King or twin beds'),
      en('Bath and shower'),
      en('Exposed brick'),
      en('Scottish-made toiletries'),
      en('Coffee machine'),
    ],
    active: true,
  },
  {
    roomType: en('The Mews'),
    slug: 'the-mews',
    hook: en('A ground-floor room with its own door to the courtyard. Dogs welcome.'),
    roomCount: 2,
    description: en(
      'Two rooms in the old stable block at the back of the courtyard, each with its own front door. Step-free throughout, and the rooms to book if you are travelling with a dog.',
    ),
    heroImage: IMG.room6,
    gallery: [IMG.room6, IMG.room2, IMG.bath, IMG.exterior],
    rate: 215,
    sqm: 28,
    occupancy: 2,
    floor: 'Ground floor',
    view: 'The courtyard',
    amenities: [
      en('King or twin beds'),
      en('Own door to the courtyard'),
      en('Step-free'),
      en('Dog-friendly'),
      en('Walk-in shower'),
      en('Scottish-made toiletries'),
    ],
    active: true,
  },
];

export const experiences: ExperienceI18n[] = [
  {
    name: en('Whisky Tasting in the Bar'),
    slug: 'whisky-tasting',
    category: 'Food & Drink',
    description: en(
      'An hour with our bar manager and six drams from across Scotland, from soft Lowland malts to the smoke of Islay. You will leave knowing which one you like, and why.',
    ),
    heroImage: IMG.whisky,
    duration: en('1 hour'),
    price: en('From £45 per person'),
    seasons: ['Year round'],
    includes: [en('Six guided drams'), en('Tasting notes to take home'), en('Something to eat from the kitchen'), en('10% off a bottle from the bar')],
  },
  {
    name: en('A Distillery on the Clyde'),
    slug: 'distillery-on-the-clyde',
    category: 'Food & Drink',
    description: en(
      'A short walk along the river to a working distillery, a tour of the stills and the warehouse, and a tasting at the end. We book the tickets and point you the right way.',
    ),
    heroImage: IMG.fishing,
    duration: en('2 hours'),
    price: en('From £35 per person'),
    seasons: ['Year round'],
    includes: [en('Tour tickets booked for you'), en('Walking map along the river'), en('Tasting at the end'), en('A dram back at the bar')],
  },
  {
    name: en('Mural Trail Walk'),
    slug: 'mural-trail',
    category: 'On foot',
    description: en(
      'Glasgow’s city centre is covered in huge murals. Walk the trail with a local guide who knows the artists, the stories and the best café on the way round.',
    ),
    heroImage: IMG.walk,
    duration: en('2 hours'),
    price: en('From £25 per person'),
    seasons: ['Year round'],
    includes: [en('Local guide'), en('Coffee on the way'), en('Map of the full trail'), en('Umbrellas, if needed')],
  },
  {
    name: en('Kelvingrove and the West End'),
    slug: 'kelvingrove-and-the-west-end',
    category: 'Culture',
    description: en(
      'A morning in Kelvingrove Art Gallery and Museum, lunch on Ashton Lane, and an afternoon wandering the West End. We plan the route and book the table.',
    ),
    heroImage: IMG.garden,
    duration: en('Half day'),
    price: en('From £30 per person'),
    seasons: ['Year round'],
    includes: [en('A planned route'), en('Lunch booked on Ashton Lane'), en('Subway tickets'), en('Our list of West End favourites')],
  },
  {
    name: en('Gig Night'),
    slug: 'gig-night',
    category: 'Nightlife',
    description: en(
      'Glasgow is one of the best music cities in the world. Tell us who is playing and we will sort an early dinner, a taxi to the venue and a late breakfast the morning after.',
    ),
    heroImage: IMG.gig,
    duration: en('One evening'),
    price: en('From £40 per person'),
    seasons: ['Year round'],
    includes: [en('Early dinner in the restaurant'), en('Taxi to the venue'), en('Late breakfast until 11.30am'), en('Late check-out')],
  },
  {
    name: en('Day Trip to Loch Lomond'),
    slug: 'loch-lomond',
    category: 'Out of town',
    description: en(
      'Forty-five minutes from the front door to the bonnie banks. A driver, a boat trip on the loch and a pub lunch in Luss, back in time for dinner.',
    ),
    heroImage: IMG.lochLomond,
    duration: en('Full day'),
    price: en('From £120 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [en('Private driver'), en('Boat trip on the loch'), en('Lunch in Luss'), en('Back in the city by 6pm')],
  },
];

export const offers: OfferI18n[] = [
  {
    title: en('Gig Night'),
    slug: 'gig-night-stay',
    subtitle: en('Dinner, the show, a long lie-in'),
    description: en(
      'A room for the night, an early dinner before the doors open, and breakfast served until 11.30am the morning after. Late check-out included, because you will need it.',
    ),
    tag: en('Most popular'),
    image: IMG.gig,
    inclusions: [en('One night with breakfast'), en('Two-course early dinner'), en('Breakfast until 11.30am'), en('Check-out at 2pm')],
    type: 'Stay',
  },
  {
    title: en('Winter in the City'),
    slug: 'winter-in-the-city',
    subtitle: en('November to March'),
    description: en(
      'Two nights in the city when it is at its cosiest: dark afternoons, busy bars and the Christmas lights on George Square. Includes a whisky tasting and dinner on your first night.',
    ),
    tag: en('Seasonal'),
    image: IMG.fire,
    inclusions: [en('Two nights with breakfast'), en('Dinner on your first night'), en('Whisky tasting for two'), en('Late check-out')],
    validFrom: '2026-11-01',
    validUntil: '2027-03-31',
    type: 'Seasonal',
  },
  {
    title: en('Midweek in Merchant City'),
    slug: 'midweek-merchant-city',
    subtitle: en('Sunday to Thursday'),
    description: en(
      'The city does not slow down midweek, but our prices do. Fifteen percent off stays from Sunday to Thursday, plus a drink at the bar on us.',
    ),
    tag: en('Best value'),
    image: IMG.glen,
    inclusions: [en('15% off room rates'), en('A drink at the bar each night'), en('Flexible cancellation to 48 hours'), en('Late check-out on request')],
    type: 'Stay',
  },
  {
    title: en('The Celebration Stay'),
    slug: 'celebration-stay',
    subtitle: en('Mark it properly'),
    description: en(
      'Birthdays, anniversaries and long-overdue weekends away. Champagne in the room when you arrive, a table in the restaurant, and an upgrade to the best available room when we can.',
    ),
    tag: en('Occasions'),
    image: IMG.room1,
    inclusions: [en('Room upgrade when available'), en('Champagne on arrival'), en('Dinner for two'), en('Late check-out')],
    type: 'Occasion',
  },
];

export const journalPosts: JournalPostI18n[] = [
  {
    title: en('A Night Out in Merchant City'),
    slug: 'a-night-out-in-merchant-city',
    category: 'The City',
    author: 'Morven Kerr',
    publishedAt: '2026-02-12',
    readingTime: en('5 min read'),
    excerpt: en('Where to eat, where to drink and where to end up, all within ten minutes of the front door.'),
    heroImage: IMG.heroHouse,
    featured: true,
    body: {
      en: [
        block('Merchant City is the oldest part of Glasgow and, on a Friday night, the liveliest. The streets around the hotel were built for tobacco lords and cloth merchants; today they are full of bars, restaurants and people who have no intention of going home early.'),
        block('Start early', 'h2'),
        block('Book dinner for seven, which in Glasgow counts as early. The restaurants on the streets around us are small and busy, so a reservation matters. We are happy to make it for you.'),
        block('Then wander', 'h2'),
        block('The best plan after dinner is no plan at all. Walk the lanes, follow the music, and stop wherever looks good. You are never more than ten minutes from your bed.'),
        block('People make Glasgow. They also make a very good night out.', 'blockquote'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('Six Murals Worth the Walk'),
    slug: 'six-murals',
    category: 'Culture',
    author: 'Callum Bryce',
    publishedAt: '2025-10-08',
    readingTime: en('6 min read'),
    excerpt: en('Glasgow’s city centre is an open-air gallery. Our concierge picks the six murals you should not miss.'),
    heroImage: IMG.walk,
    featured: true,
    body: {
      en: [
        block('Over the last fifteen years, Glasgow has covered its gable ends with some of the best street art in Europe. The official mural trail is long; this is the short version, starting and finishing at our front door.'),
        block('Start nearby', 'h2'),
        block('Several of the biggest pieces are within a few minutes’ walk of the hotel. Ask at the desk for our map and we will mark the route.'),
        block('Head west', 'h2'),
        block('The trail continues west through the city centre. Allow two hours at a stroll, more if you stop for coffee, which you should.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('Behind the Bar: Our Whisky List'),
    slug: 'behind-the-bar',
    category: 'Food & Drink',
    author: 'Ailsa Duncan',
    publishedAt: '2025-11-20',
    readingTime: en('5 min read'),
    excerpt: en('A hundred and twenty whiskies, and how we chose every one.'),
    heroImage: IMG.whisky,
    featured: true,
    body: {
      en: [
        block('When we opened the bar, we set ourselves a rule: every bottle on the shelf has to earn its place. A hundred and twenty bottles later, the rule still stands.'),
        block('A map in a glass', 'h2'),
        block('The list is arranged by region, so you can travel the country one dram at a time: the soft, grassy Lowlands, the rich Speyside malts, the smoky islands. Ask us for a flight and we will build one around what you like.'),
        block('Not just whisky', 'h2'),
        block('There is also a short list of Scottish gins, a few good beers from Glasgow breweries, and cocktails that make the most of all of the above.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('The Best Small Venues in Glasgow'),
    slug: 'small-venues',
    category: 'Nightlife',
    author: 'Jamie Rennie',
    publishedAt: '2025-08-14',
    readingTime: en('4 min read'),
    excerpt: en('The big arenas get the headlines. The small rooms are where the city’s music really lives.'),
    heroImage: IMG.gig,
    body: {
      en: [
        block('Glasgow has a music scene out of all proportion to its size, and most of it happens in rooms that hold a few hundred people at most. These are the nights guests tell us about at breakfast.'),
        block('How to choose', 'h2'),
        block('Check what is on before you book your room, then ask us. We know which venues are a short walk, which need a taxi, and which do the best late food.'),
      ],
    } as LocaleField<unknown[]>,
  },
];

export const testimonials: TestimonialI18n[] = [
  {
    guestName: 'L. & K. Morrison',
    quote: en('The Loft is the best hotel room we have stayed in anywhere. We spent half the weekend in the bath and the other half in the bar downstairs.'),
    rating: 5,
    roomStayed: 'The Loft',
    date: '2026-03-14',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'Dan W.',
    quote: en('Came up for a gig, stayed in The Snug, slept until eleven and had the best breakfast of my life. I will not be staying anywhere else in Glasgow.'),
    rating: 5,
    roomStayed: 'The Snug',
    date: '2025-11-02',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'The Patel family',
    quote: en('The Mews was perfect with our dog, and the team gave us a list of every dog-friendly café in the city. Glasgow felt like home within an hour.'),
    rating: 5,
    roomStayed: 'The Mews',
    date: '2025-09-21',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'S. Haddow',
    quote: en('I travel for work every week and this is the only hotel I look forward to. Quiet room, good desk, great whisky, and nobody rushes you out in the morning.'),
    rating: 5,
    roomStayed: 'No. 9',
    date: '2026-01-28',
    source: 'Direct review',
    featured: true,
  },
];

export const team: TeamMemberI18n[] = [
  {
    name: 'Morven Kerr',
    role: en('General Manager'),
    bio: en('Glasgow born, and back home after a decade running hotels in Edinburgh and London. Knows every good table in the city, and will book you one.'),
    headshot: IMG.portrait2,
    department: 'Management',
    displayOrder: 1,
  },
  {
    name: 'Rory Lennox',
    role: en('Head Chef'),
    bio: en('Trained in Glasgow and Copenhagen. Cooks Scottish produce with a light touch and very little fuss.'),
    headshot: IMG.portrait3,
    department: 'Kitchen',
    displayOrder: 2,
  },
  {
    name: 'Ailsa Duncan',
    role: en('Bar Manager'),
    bio: en('Built the whisky list one bottle at a time, and can talk about every one of them. Also makes the best Old Fashioned in the Merchant City.'),
    headshot: IMG.portrait4,
    department: 'Bar',
    displayOrder: 3,
  },
  {
    name: 'Jamie Rennie',
    role: en('Front of House Manager'),
    bio: en('Runs the desk day and night. Has seen every band worth seeing in Glasgow, and has an opinion on all of them.'),
    headshot: IMG.portrait5,
    department: 'Front of House',
    displayOrder: 4,
  },
  {
    name: 'Callum Bryce',
    role: en('Concierge'),
    bio: en('Walks the mural trail most weeks and knows the city’s shortcuts. Ask him anything.'),
    headshot: IMG.portrait1,
    department: 'Front of House',
    displayOrder: 5,
  },
  {
    name: 'Fiona Hay',
    role: en('Head of Housekeeping'),
    bio: en('Keeps sixteen rooms in perfect order and the quietest corridors in the city. Has strong views on pillows.'),
    headshot: IMG.portrait6,
    department: 'Housekeeping',
    displayOrder: 6,
  },
];

export const facilities: Array<{ title: LocaleField; detail: LocaleField }> = [
  { title: en('24-hour reception'), detail: en('Someone is on the desk day and night, so arrive whenever suits you.') },
  { title: en('Breakfast included'), detail: en('A full Scottish breakfast in every room rate, served until 11am at weekends.') },
  { title: en('The bar'), detail: en('A hundred and twenty whiskies and a short list of very good cocktails.') },
  { title: en('Late check-out'), detail: en('Check-out at noon as standard, and 2pm when you book direct.') },
  { title: en('Dog-friendly'), detail: en('Dogs are welcome in The Mews, with its own door to the courtyard.') },
  { title: en('Free Wi-Fi'), detail: en('Fast and free throughout the building.') },
];

export const policies: Array<{ title: LocaleField; body: LocaleField }> = [
  { title: en('Check-in & check-out'), body: en('Check-in is from 3pm and check-out is by noon, or 2pm when you book direct. Reception is open 24 hours, so arrive whenever suits you.') },
  { title: en('Breakfast'), body: en('A full breakfast is included in every room rate, served until 10.30am on weekdays and 11am at weekends.') },
  { title: en('Booking, payment & cancellations'), body: en('The cancellation terms and any deposit depend on the rate you choose. They are shown before you confirm your booking, and again in your confirmation email.') },
  { title: en('Children'), body: en('Children are welcome. Cots and extra beds are available in The Loft and No. 9.') },
  { title: en('Dogs'), body: en('Dogs are welcome in The Mews, at £20 per dog per stay.') },
  { title: en('Accessibility'), body: en('The Mews, reception, the bar and the restaurant are step-free, and there is a lift to every floor. Call us and we will talk through your needs.') },
  { title: en('Parking'), body: en('We have no parking of our own. There is a 24-hour car park two minutes’ walk away; ask us for directions.') },
  { title: en('Weddings & private hire'), body: en('Weddings and private hire have their own terms. Ask us for details.') },
];

export const faqs = [
  { q: en('What are your check-in and check-out times?'), a: en('Check-in is from 3pm and check-out by noon, or 2pm if you booked direct. Reception is open 24 hours.') },
  { q: en('Is there parking?'), a: en('We have no car park of our own, but there is a 24-hour car park two minutes’ walk away. Most guests arrive by train; Glasgow Central is a five-minute walk.') },
  { q: en('Are dogs welcome?'), a: en('Dogs are welcome in The Mews, which has its own door to the courtyard. £20 per dog per stay.') },
  { q: en('Can you book restaurants and tickets for us?'), a: en('Yes, happily. Tell us what you like and when, and we will book the table, the tickets or both.') },
  { q: en('Can you cater for dietary requirements?'), a: en('Yes. Tell us when you book and the kitchen will plan properly. Vegetarian and vegan dishes are on every menu.') },
  { q: en('Is the hotel accessible?'), a: en('There is a lift to every floor, and The Mews, reception, the bar and the restaurant are step-free. Call us and we will talk through your needs.') },
];

export const attractions = [
  { name: 'Kelvingrove Art Gallery and Museum', distance: '15 minutes', description: en('One of the most visited museums in Britain, free to enter, with a Dalí, a Spitfire and an organ recital most days.') },
  { name: 'Glasgow Cathedral and the Necropolis', distance: '10 minutes on foot', description: en('A medieval cathedral and a Victorian city of the dead on the hill behind it, with the best view over the city.') },
  { name: 'Riverside Museum', distance: '15 minutes', description: en('Glasgow’s transport museum, in a striking building on the Clyde, with a tall ship moored outside.') },
  { name: 'The Lighthouse', distance: '5 minutes on foot', description: en('Scotland’s centre for design and architecture, in a building by Charles Rennie Mackintosh. Climb the tower for the view.') },
  { name: 'The Barras', distance: '10 minutes on foot', description: en('The city’s famous weekend market, and the legendary music venue above it.') },
  { name: 'Loch Lomond', distance: '45 minutes', description: en('The bonnie banks, a boat trip and a pub lunch, close enough for an easy day out.') },
];

export const directions = [
  { mode: en('By rail'), detail: en('Glasgow Central is a five-minute walk and Queen Street a few minutes more, with direct trains from London, Edinburgh and across Scotland.') },
  { mode: en('By car'), detail: en('Leave the M8 at junction 15 and follow signs for the city centre. There is a 24-hour car park two minutes from the hotel.') },
  { mode: en('By air'), detail: en('Glasgow Airport is twenty minutes away by taxi or the airport bus. Edinburgh Airport is about an hour.') },
  { mode: en('On foot'), detail: en('Most of the city centre, Merchant City and the river are within a fifteen-minute walk. Ask us for a map.') },
];

/** None for the demo: press quotes must be real, from real coverage. */
export const pressMentions: Array<{ outlet: string; quote: LocaleField }> = [];

export const menus = [
  {
    name: en('Breakfast'),
    note: en('Served until 10.30am, 11am at weekends'),
    items: [
      { dish: en('The full Scottish'), detail: en('Lorne sausage, black pudding, tattie scone, bacon, eggs and beans') },
      { dish: en('Kedgeree'), detail: en('Smoked haddock, rice, a soft egg and plenty of spice') },
      { dish: en('Porridge'), detail: en('Made with milk, with brown sugar or a dram') },
      { dish: en('Avocado on sourdough'), detail: en('With chilli, lime and a poached egg') },
    ],
  },
  {
    name: en('Dinner'),
    note: en('Served 5.30 to 10pm'),
    items: [
      { dish: en('Cullen skink'), detail: en('Smoked haddock, potato and leek soup, with bread from the bakery next door') },
      { dish: en('Scottish beef'), detail: en('Dry-aged sirloin, triple-cooked chips and peppercorn sauce') },
      { dish: en('Hake from Peterhead'), detail: en('Mussels, leeks and a butter sauce') },
      { dish: en('Cranachan'), detail: en('Raspberries, cream, toasted oats, honey and a splash of whisky') },
    ],
  },
  {
    name: en('The Bar'),
    note: en('Open until 1am, food until 11pm'),
    items: [
      { dish: en('Whisky flights'), detail: en('Three drams, chosen around what you like') },
      { dish: en('The Ardlow Old Fashioned'), detail: en('Speyside malt, demerara and orange') },
      { dish: en('Haggis bonbons'), detail: en('With whisky mustard mayonnaise') },
      { dish: en('Cheese board'), detail: en('Three Scottish cheeses, oatcakes and chutney') },
    ],
  },
];

export const voucherTypes = [
  {
    name: en('The Monetary Voucher'),
    price: 'From £50',
    description: en('Any amount from fifty pounds, to spend on rooms, dinner, drinks and every experience we arrange.'),
    image: IMG.exterior,
  },
  {
    name: en('Dinner and Drinks for Two'),
    price: '£120',
    description: en('Three courses in the restaurant and a whisky flight in the bar afterwards. A proper night out in the city.'),
    image: IMG.dining1,
  },
  {
    name: en('A Night in the City'),
    price: 'From £225',
    description: en('A night for two with breakfast, a drink at the bar and late check-out. The easiest gift there is.'),
    image: IMG.room2,
  },
];
