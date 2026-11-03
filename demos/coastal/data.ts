/**
 * Coastal demo content: Polvarra Cove. Swapped in for lib/data.ts when built
 * with DEMO=coastal (see demos/README.md); exports exactly what lib/data.ts
 * does (demos/check.ts enforces it). English only, invented for the demo.
 *
 * Photos are free Unsplash photos (Unsplash License), each resolved through
 * unsplash.com/photos/<id>/download, which only succeeds for free photos.
 * The photographer and location are noted beside each. Portraits are the
 * template's own generic ones.
 */
import type {
  RoomI18n, ExperienceI18n, OfferI18n, JournalPostI18n, TestimonialI18n, TeamMemberI18n,
} from '../../lib/types';
import type { LocaleField } from '../../lib/locales';

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Same keys as the template's IMG (shared page loaders use them), filled
 *  with coastal photos; the extra keys are for this demo's own content. */
export const IMG = {
  heroHouse: u('photo-1693163709358-2df42174b979'), // Samuel Girven: cliffs and cove, North Cornwall
  exterior: u('photo-1571690355594-14a53a3b522a'), // Simon Godfrey: white houses above the harbour, St Ives
  glen: u('photo-1534517535933-e38e7658663f'), // Ben Elliott: Porthcurno cove from above
  forest: u('photo-1638732325324-b0b3a933a19d'), // Tina Kuper: path through the dunes
  loch: u('photo-1702031617375-f71096eb385d'), // Amy Vann: Gwithian beach at sunset
  room1: u('photo-1501117716987-c8c394bb29df'), // Johannes W: the sea through open doors
  room2: u('photo-1634207523205-cf9ef97a31d1'), // Mitchell Luo: blue walls, white bed
  room3: u('photo-1722286542992-47268b29aa6b'), // Andrea Davis: white bed under a timber ceiling
  room4: u('photo-1592159714772-b44f85216622'), // Tina Witherspoon: light, airy bedroom
  room5: u('photo-1741559935512-3b018321e35f'), // Bruno Cervera: white bedroom in sunlight
  room6: u('photo-1620633484172-9efeaf685cf4'), // Albert Vincent Wu: white bed by a window
  bath: u('photo-1552858725-2758b5fb1286'),
  dining1: u('photo-1752610877644-c83e616d9fd3'), // Ekaterina Bogdan: table looking out to sea
  dining2: u('photo-1676089774723-0acd27ce32ab'), // Romeo A: terrace table at sunset
  food1: u('photo-1633321094192-388268512e0f'), // Anima Visual: oysters with lemon
  food2: u('photo-1650847821830-2c24e212213f'), // Anima Visual: oysters to share
  whisky: u('photo-1694157294702-e8e86487a327'), // Darren Tolley: Mevagissey harbour boats
  spa: u('photo-1544161515-4ab6ce6db874'),
  wedding1: u('photo-1718152220007-6fb2c02fec95'), // Josh Withers: wedding arch on the sand
  wedding2: u('photo-1511795409834-ef04bbd61622'),
  garden: u('photo-1455310669943-0231113add2f'), // Bill McBee: green headland and sea
  fire: u('photo-1774927475366-7c4d31588d98'), // Clay Banks: armchair by the fire
  walk: u('photo-1558464919-690deda1ca00'), // Danilo D'Agostino: coast path near St Agnes
  fishing: u('photo-1687706418918-1c95d829b478'), // Nick Fewings: trawler coming into Mevagissey
  portrait1: u('photo-1560250097-0b93528c311a', 900),
  portrait2: u('photo-1573496359142-b8d87734a5a2', 900),
  portrait3: u('photo-1472099645785-5658abf4ff4e', 900),
  portrait4: u('photo-1438761681033-6461ffad8d80', 900),
  portrait5: u('photo-1500648767791-00dcc994a43e', 900),
  portrait6: u('photo-1544005313-94ddf0286df2', 900),
  surf: u('photo-1528538251270-8a339714765e'), // George Hiles: surfers at Fistral, Newquay
  surfSchool: u('photo-1536517076075-e9cc97d4993a'), // Louis Reed: surf lesson from above, Cornwall
  swim: u('photo-1692171295305-e84a1d62a842'), // Vitalii Khodzinskyi: a swimmer in the sea
  engineHouse: u('photo-1694975452433-9a3b3ceed2a0'), // Fabian Jones: engine house on the cliff, St Agnes
  portIsaac: u('photo-1596449055243-11b1217518c4'), // Greg Willson: Port Isaac harbour
  balcony: u('photo-1725282640718-d16283bf5abe'), // Ira Avtukhova: the sea from a balcony
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
    roomType: en('The Lookout'),
    slug: 'the-lookout',
    hook: en('The top-floor suite, with doors that open straight onto the Atlantic.'),
    roomCount: 1,
    description: en(
      'The whole top of the house, given over to one suite and one view. Folding doors open onto a balcony above the cove, there is a sofa placed for watching weather come in, and the bath sits under the window so you can count the surfers. On a still evening you can hear the sea from the pillow.',
    ),
    heroImage: IMG.room1,
    gallery: [IMG.room1, IMG.balcony, IMG.heroHouse, IMG.loch],
    rate: 445,
    sqm: 52,
    occupancy: 3,
    floor: 'Second floor',
    view: 'West, straight out to sea',
    amenities: [
      en('Super-king bed'),
      en('Private balcony over the cove'),
      en('Freestanding bath by the window'),
      en('Walk-in rainfall shower'),
      en('Binoculars and a tide table'),
      en('Roberts radio'),
      en('Cornish botanical toiletries'),
      en('Tea tray with saffron buns'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en("The Captain's Room"),
    slug: 'the-captains-room',
    hook: en("The mine captain's own bedroom, with a bay window built to watch the harbour."),
    roomCount: 1,
    description: en(
      "When the house was built in 1898, this was the captain's room, and he chose it for the bay window that looks down the coast towards the harbour. It is still the room guests ask for by name: deep blue walls, a window seat made for reading, and the morning sun across the bed.",
    ),
    heroImage: IMG.room2,
    gallery: [IMG.room2, IMG.room4, IMG.exterior, IMG.portIsaac],
    rate: 395,
    sqm: 44,
    occupancy: 2,
    floor: 'First floor',
    view: 'South-west, down the coast',
    amenities: [
      en('Super-king bed'),
      en('Bay window seat'),
      en('Roll-top bath and walk-in shower'),
      en('Writing desk'),
      en('Roberts radio'),
      en('Cornish botanical toiletries'),
      en('Tea tray with saffron buns'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('Driftwood'),
    slug: 'driftwood',
    hook: en('Tucked under the timber roof, with a skylight for the stars.'),
    roomCount: 1,
    description: en(
      'An attic room under the old roof timbers, with a skylight over the bed and a round window that frames the headland. Small enough to feel like a cabin, light enough that you will not want to close the blinds.',
    ),
    heroImage: IMG.room3,
    gallery: [IMG.room3, IMG.room5, IMG.garden, IMG.engineHouse],
    rate: 285,
    sqm: 30,
    occupancy: 2,
    floor: 'Second floor',
    view: 'North, over the headland',
    amenities: [
      en('King bed'),
      en('Skylight over the bed'),
      en('Walk-in shower'),
      en('Reading chair'),
      en('Cornish botanical toiletries'),
      en('Tea tray with saffron buns'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: en('Sea Pink'),
    slug: 'sea-pink',
    hook: en('Named for the flowers on the cliff outside, which bloom right on cue each May.'),
    roomCount: 1,
    description: en(
      'A bright first-floor double named for the thrift that covers the cliff each spring. Pale walls, a bed facing the sea, and a shower room tiled in the green of a rock pool.',
    ),
    heroImage: IMG.room4,
    gallery: [IMG.room4, IMG.room6, IMG.glen, IMG.garden],
    rate: 245,
    sqm: 26,
    occupancy: 2,
    floor: 'First floor',
    view: 'West, over the cove',
    amenities: [
      en('King bed'),
      en('Walk-in shower'),
      en('Sea view from the bed'),
      en('Roberts radio'),
      en('Cornish botanical toiletries'),
      en('Tea tray with saffron buns'),
    ],
    active: true,
  },
  {
    roomType: en('Shell'),
    slug: 'shell',
    hook: en('The sunniest room in the house, and the smallest. Nobody minds.'),
    roomCount: 1,
    description: en(
      'A small, sunny double on the corner of the house, with windows on two sides and light from breakfast until dinner. Everything you need and nothing you would trip over.',
    ),
    heroImage: IMG.room5,
    gallery: [IMG.room5, IMG.room4, IMG.loch, IMG.walk],
    rate: 225,
    sqm: 22,
    occupancy: 2,
    floor: 'First floor',
    view: 'South, along the coast',
    amenities: [
      en('Double bed'),
      en('Walk-in shower'),
      en('Windows on two sides'),
      en('Cornish botanical toiletries'),
      en('Tea tray with saffron buns'),
    ],
    active: true,
  },
  {
    roomType: en('The Boathouse'),
    slug: 'the-boathouse',
    hook: en('Its own door to the garden and the coast path: the room for dogs and early swims.'),
    roomCount: 1,
    description: en(
      'A ground-floor room in the old boathouse at the end of the garden, with its own door to the lawn and the coast path beyond. Made for anyone travelling with a dog, a wetsuit or both. There is an outdoor shower for sandy feet, sandy paws and sandy boards.',
    ),
    heroImage: IMG.room6,
    gallery: [IMG.room6, IMG.room3, IMG.walk, IMG.forest],
    rate: 260,
    sqm: 28,
    occupancy: 2,
    floor: 'Ground floor',
    view: 'The garden, with the sea beyond',
    amenities: [
      en('King or twin beds'),
      en('Own door to the garden'),
      en('Outdoor shower'),
      en('Dog-friendly'),
      en('Wetsuit and board rack'),
      en('Cornish botanical toiletries'),
    ],
    active: true,
  },
];

export const experiences: ExperienceI18n[] = [
  {
    name: en('Surf Lessons in the Cove'),
    slug: 'surf-lessons',
    category: 'On the water',
    description: en(
      'Two hours with Ben and a soft board on the beach below the house. First lesson or first in years, the cove is sheltered enough to learn in and lively enough to be fun. Most people stand up before the session ends; everyone gets a hot shower and a cocoa after it.',
    ),
    heroImage: IMG.surf,
    duration: en('2 hours'),
    price: en('From £55 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [en('Qualified instructor'), en('Wetsuit and soft board'), en('Hot shower and cocoa after'), en('Photos of your best wave')],
  },
  {
    name: en('Coast Path Walk with a Guide'),
    slug: 'coast-path-walk',
    category: 'On foot',
    description: en(
      'The South West Coast Path runs past the garden gate. Walk the clifftops to the old engine houses with someone who knows which cove the seals favour and where the choughs nest. A pasty from the village is part of the route.',
    ),
    heroImage: IMG.walk,
    duration: en('3 hours'),
    price: en('From £35 per person'),
    seasons: ['Year round'],
    includes: [en('Local walking guide'), en('Pasty and a flask of tea'), en('Binoculars to borrow'), en('Route map for the rest of your stay')],
  },
  {
    name: en('Mackerel Fishing Trip'),
    slug: 'mackerel-fishing',
    category: 'On the water',
    description: en(
      'Out of the harbour at first light with a skipper who has fished this coast for thirty years. Hand lines, open water and, most mornings, a bucket of mackerel that the kitchen will cook for your lunch.',
    ),
    heroImage: IMG.fishing,
    duration: en('Half day'),
    price: en('From £70 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [en('Skipper and boat'), en('All tackle and lifejackets'), en('Breakfast roll on board'), en('Your catch cooked by the kitchen')],
  },
  {
    name: en('Sea Swim & Sauna'),
    slug: 'sea-swim-and-sauna',
    category: 'Wellness',
    description: en(
      'A guided swim in the cove, as gentle or as bracing as you like, then into the wood-fired sauna on the rocks to warm through. Robes, towels and a hot drink waiting at the top of the steps.',
    ),
    heroImage: IMG.swim,
    duration: en('90 minutes'),
    price: en('From £40 per person'),
    seasons: ['Year round'],
    includes: [en('Guided swim with safety cover'), en('Wood-fired sauna on the rocks'), en('Robes, towels and changing hut'), en('Hot chocolate or a hot toddy')],
  },
  {
    name: en('Seashore Foraging with the Chef'),
    slug: 'seashore-foraging',
    category: 'Food & Drink',
    description: en(
      'A low-tide morning with Jory, gathering what the shore and dunes offer: rock samphire, sea beet, sea purslane, and the odd mussel bed. Then back to the kitchen for a lunch built around whatever made it into the basket.',
    ),
    heroImage: IMG.forest,
    duration: en('Half day'),
    price: en('From £95 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [en('Foraging walk with the head chef'), en('Basket and knife to use'), en('Three-course lunch from your haul'), en('Recipe cards to take home')],
  },
  {
    name: en('A Morning at the Harbour'),
    slug: 'harbour-morning',
    category: 'Food & Drink',
    description: en(
      'Meet the boats as they come in, see the morning catch landed and sold, and meet the families who supply our kitchen. It finishes with a crab sandwich on the harbour wall, which is where every good morning in Cornwall should finish.',
    ),
    heroImage: IMG.whisky,
    duration: en('3 hours'),
    price: en('From £45 per person'),
    seasons: ['Year round'],
    includes: [en('Transport to and from the harbour'), en('Time with the fishermen'), en('Crab sandwich on the harbour wall'), en('A box of smoked fish to take home')],
  },
];

export const offers: OfferI18n[] = [
  {
    title: en('Storm Watching'),
    slug: 'storm-watching',
    subtitle: en('November to March'),
    description: en(
      'The Atlantic at its most theatrical, seen from a warm room with a good view. Two nights, a fire lit in the lounge, and the tasting menu on the night the weather is wildest. Waterproofs to borrow for anyone who wants to be out in it.',
    ),
    tag: en('Seasonal'),
    image: IMG.fire,
    inclusions: [en('Two nights bed & breakfast'), en('Five-course tasting menu one evening'), en('Hot toddy by the fire each evening'), en('Late checkout until 1pm')],
    validFrom: '2026-11-01',
    validUntil: '2027-03-31',
    type: 'Seasonal',
  },
  {
    title: en('Surf & Stay'),
    slug: 'surf-and-stay',
    subtitle: en('Two nights, two lessons'),
    description: en(
      'Two nights, two lessons in the cove, and a dinner big enough for anyone who has spent the day falling off a board. The quickest way we know to fall for this coast.',
    ),
    tag: en('Most popular'),
    image: IMG.surfSchool,
    inclusions: [en('Two nights bed & breakfast'), en('Two surf lessons with Ben'), en('Wetsuit and board for your stay'), en('Dinner on your first night')],
    type: 'Stay',
  },
  {
    title: en('Midweek by the Sea'),
    slug: 'midweek-by-the-sea',
    subtitle: en('Sunday to Thursday'),
    description: en(
      'The beach does not know it is Tuesday. Fifteen percent off midweek stays, when the cove is at its quietest and the coast path is yours alone.',
    ),
    tag: en('Best value'),
    image: IMG.glen,
    inclusions: [en('15% off bed & breakfast rates'), en('Flexible cancellation to 48 hours'), en('Coast path map and a packed lunch'), en('Priority dinner reservations')],
    type: 'Stay',
  },
  {
    title: en('The Celebration Stay'),
    slug: 'celebration-stay',
    subtitle: en('Mark it properly'),
    description: en(
      'Anniversaries, birthdays, and escapes that needed an excuse. Cornish fizz on ice when you arrive, flowers from the garden in the room, and an upgrade to the best available room when the house allows.',
    ),
    tag: en('Occasions'),
    image: IMG.room1,
    inclusions: [en('Room upgrade when available'), en('Cornish sparkling wine and flowers'), en('Breakfast in bed'), en('Late checkout until 1pm')],
    type: 'Occasion',
  },
];

export const journalPosts: JournalPostI18n[] = [
  {
    title: en('Storm Season: Why We Love the Winter Sea'),
    slug: 'storm-season',
    category: 'The Cove',
    author: 'Tamsin Rowe',
    publishedAt: '2026-01-18',
    readingTime: en('5 min read'),
    excerpt: en(
      'Summer is for swimming. Winter is for watching. The case for coming when the Atlantic puts on its best show.',
    ),
    heroImage: IMG.heroHouse,
    featured: true,
    body: {
      en: [
        block('Every November someone asks whether we close for the winter. We understand the question. The car park empties, the surf school stacks its boards, and the village takes a long breath. But winter is when this coast is at its most spectacular, and we would not miss it for anything.'),
        block('The show', 'h2'),
        block('When a big swell arrives, the cove fills with white water and the spray reaches the garden wall. From the lounge, with the fire going, it is better than anything on television. Guests who came for a quiet weekend find themselves at the window for hours, mug in hand, cheering particular waves.'),
        block('What to do between storms', 'h2'),
        block('The coast path is at its best on a clear winter day, when the light is low and gold and you have the clifftops to yourself. The sauna on the rocks earns its keep. And the kitchen, with no salads to make, cooks what this coast has always cooked in winter: fish stews, slow lamb, and a lot of saffron.'),
        block('Bring a big coat and a good book. The sea will provide the entertainment.', 'blockquote'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('Six Coves You Can Walk To'),
    slug: 'six-coves',
    category: 'Outdoors',
    author: 'Ben Trewin',
    publishedAt: '2025-09-12',
    readingTime: en('7 min read'),
    excerpt: en(
      'No car needed. The six coves within walking distance of the garden gate, from a ten-minute stroll to a proper day out.',
    ),
    heroImage: IMG.engineHouse,
    featured: true,
    body: {
      en: [
        block('People drive for an hour to reach beaches that are worse than the ones on our doorstep. Here are the six I send guests to, nearest first. All of them start at the garden gate, which matters: the best walk is the one that ends at dinner.'),
        block('One: Polvarra Cove', 'h2'),
        block('The one below the house. Three minutes down the steps, sandy at low tide, sheltered from the north wind, and home to the best rock pools on this stretch of coast.'),
        block('Two and three: the harbour and the next cove along', 'h2'),
        block('Twenty minutes along the path, past the old engine house, to the village harbour and the cove beyond it. Good for a pasty, a pint and a look at the boats.'),
        block('Four to six: the long walk', 'h2'),
        block('A full day on the clifftops, taking in three more coves, each wilder than the last. Pack lunch, take a swim if the tide allows, and ask us to collect you from the far end if your legs give out. We will.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('Meet the Fisherman: Where Our Mackerel Comes From'),
    slug: 'meet-the-fisherman',
    category: 'Provenance',
    author: 'Jory Pascoe',
    publishedAt: '2025-11-03',
    readingTime: en('6 min read'),
    excerpt: en(
      'Our mackerel is caught by hand line, by one boat, a few miles from the dining room. We went out at dawn to see how.',
    ),
    heroImage: IMG.fishing,
    featured: true,
    body: {
      en: [
        block('Most mornings, before the kitchen is even awake, a small boat leaves the harbour and heads out with a bucket of hand lines. By nine, whatever it caught is on our pass. That is the whole supply chain, and it is the reason the mackerel on our menu tastes the way it does.'),
        block('Hand lines, not nets', 'h2'),
        block('Hand-lining is slow. One line, a handful of hooks, one fish at a time. It means no by-catch and no bruising, and it means the fish arrive in better condition than anything that has spent a night in a net. It also means that some days there is no mackerel, and the menu changes. We think that is a fair trade.'),
        block('Out at dawn', 'h2'),
        block('Guests can join the boat on our mackerel fishing trip. You will be cold, you will probably get wet, and you will remember the first fish you land for a long time. The kitchen will cook it for your lunch.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: en('Learning to Surf at Any Age'),
    slug: 'learning-to-surf',
    category: 'Outdoors',
    author: 'Ben Trewin',
    publishedAt: '2025-07-21',
    readingTime: en('4 min read'),
    excerpt: en(
      'Our oldest first-time surfer was seventy-three. Our youngest was six. Here is what they had in common.',
    ),
    heroImage: IMG.surf,
    body: {
      en: [
        block('The question I am asked most is whether someone is too old, too unfit or too nervous to learn. The answer is almost always no. The cove below the house is about as friendly a place to learn as Cornwall has: sandy, sheltered, and with waves that break gently enough to forgive mistakes.'),
        block('What it takes', 'h2'),
        block('Patience, mostly, and a sense of humour. Everyone falls off. The people who enjoy it most are the ones who laugh about it and paddle back out. Standing up comes eventually, and when it does, it is one of the best feelings there is.'),
        block('After the lesson', 'h2'),
        block('Hot showers, cocoa, and a big lunch. Then, if you are anything like our seventy-three-year-old, another lesson the next morning.'),
      ],
    } as LocaleField<unknown[]>,
  },
];

export const testimonials: TestimonialI18n[] = [
  {
    guestName: 'C. & M. Lawrence',
    quote: en('We woke up to the sound of the sea every morning and went to sleep to it every night. The Lookout is the best hotel room we have ever stayed in, and we have stayed in a few.'),
    rating: 5,
    roomStayed: 'The Lookout',
    date: '2026-06-14',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'Priya S.',
    quote: en('I had never surfed in my life. By the second lesson I was standing up, and by the end of the week I had booked to come back next summer.'),
    rating: 5,
    roomStayed: 'Sea Pink',
    date: '2025-08-30',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'The Hughes family',
    quote: en('Two children, one dog, a lot of sand. The staff never once looked worried. The Boathouse was perfect, and the outdoor shower saved our sanity.'),
    rating: 5,
    roomStayed: 'The Boathouse',
    date: '2025-10-05',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'R. Hammond',
    quote: en('We came in February for the storms and were not disappointed. Watching the waves from the lounge with a hot toddy is now my favourite thing.'),
    rating: 5,
    roomStayed: "The Captain's Room",
    date: '2026-02-22',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'J. & T. Ellis',
    quote: en('We were married on the terrace with the cove behind us. Everyone still talks about the food, the light, and the moment the seals turned up during the vows.'),
    rating: 5,
    roomStayed: 'The Lookout',
    date: '2025-09-20',
    source: 'Guest book',
    featured: true,
  },
];

export const team: TeamMemberI18n[] = [
  {
    name: 'Tamsin Rowe',
    role: en('General Manager'),
    bio: en('Grew up two coves along and came home after fifteen years running hotels in London and Lisbon. Believes the best hospitality feels like being looked after by a friend who happens to be very organised.'),
    headshot: IMG.portrait2,
    department: 'Management',
    displayOrder: 1,
  },
  {
    name: 'Jory Pascoe',
    role: en('Head Chef'),
    bio: en('Cornish born, trained in Bristol and Bordeaux, and back on this coast to cook what the boats and the shore bring in each morning.'),
    headshot: IMG.portrait3,
    department: 'Kitchen',
    displayOrder: 2,
  },
  {
    name: 'Kerensa Hall',
    role: en('Front of House Manager'),
    bio: en('The voice on the phone and the reason the welcome feels so easy. Knows every tide time, every bus and every good spot for a picnic.'),
    headshot: IMG.portrait4,
    department: 'Front of House',
    displayOrder: 3,
  },
  {
    name: 'Ben Trewin',
    role: en('Surf & Activities Lead'),
    bio: en('Has taught hundreds of people to surf in the cove, from six-year-olds to seventy-somethings. Also runs the coast path walks, and knows where the seals go.'),
    headshot: IMG.portrait5,
    department: 'Activities',
    displayOrder: 4,
  },
  {
    name: 'Will Carne',
    role: en('Head of Maintenance'),
    bio: en('Keeps an old house by the sea in working order, which is a full-time job. Also stokes the sauna, by popular demand.'),
    headshot: IMG.portrait1,
    department: 'Estate',
    displayOrder: 5,
  },
  {
    name: 'Lowenna Hicks',
    role: en('Head of Housekeeping'),
    bio: en('Runs the quietest team in the house to the highest standard in it. Has a particular way with sand, and a firm view on sea-view pillows.'),
    headshot: IMG.portrait6,
    department: 'Housekeeping',
    displayOrder: 6,
  },
];

export const facilities: Array<{ title: LocaleField; detail: LocaleField }> = [
  { title: en('Free parking & EV charging'), detail: en('Free parking for all guests, with two EV chargers by the garden.') },
  { title: en('Breakfast included'), detail: en('A full Cornish breakfast is included in every stay.') },
  { title: en('The dining room'), detail: en('Seafood from the harbour and a tasting menu that changes daily.') },
  { title: en('Dog-friendly'), detail: en('Dogs are welcome in The Boathouse and on the beach below.') },
  { title: en('Sauna on the rocks'), detail: en('A wood-fired sauna above the cove, free for guests each evening.') },
  { title: en('Free Wi-Fi'), detail: en('Throughout the house and garden, at no extra cost.') },
];

export const policies: Array<{ title: LocaleField; body: LocaleField }> = [
  { title: en('Check-in & check-out'), body: en('Check-in is from 3pm and check-out is by 11am. Early arrivals are welcome to leave luggage and head to the beach; late checkout until 1pm can usually be arranged.') },
  { title: en('Breakfast'), body: en('A full breakfast is included in every room rate, served in the dining room or on the terrace in good weather.') },
  { title: en('Booking, payment & cancellations'), body: en('The cancellation terms and any deposit depend on the rate you choose. They are shown before you confirm your booking, and again in your confirmation email.') },
  { title: en('Children'), body: en('Children of all ages are welcome. Cots and extra beds are available in The Lookout and The Boathouse.') },
  { title: en('Dogs'), body: en('Dogs are welcome in The Boathouse, at £20 per dog per stay. Please check the local beach rules for summer dog restrictions.') },
  { title: en('Accessibility'), body: en('The Boathouse, the dining room and the terrace are step-free. The beach is reached by steps. Call us and we will talk through your needs.') },
  { title: en('Parking & EV charging'), body: en('Parking is free for all guests, with two EV chargers by the garden.') },
  { title: en('Weddings & exclusive use'), body: en('Weddings and exclusive-use stays have their own terms. Ask us for details.') },
];

export const faqs = [
  {
    q: en('What are your check-in and check-out times?'),
    a: en('Check-in is from 3pm and check-out by 11am. If you arrive early, leave your bags with us and head for the beach; late checkout until 1pm can usually be arranged.'),
  },
  {
    q: en('Are dogs welcome?'),
    a: en('Dogs are welcome in The Boathouse, which has its own door to the garden and an outdoor shower for sandy paws. £20 per dog per stay.'),
  },
  {
    q: en('Do you welcome children?'),
    a: en('Very much so. Cots and extra beds are available, the kitchen does a proper children’s tea at 5.30pm, and we lend out buckets and nets for the rock pools.'),
  },
  {
    q: en('Can you cater for dietary requirements?'),
    a: en('Yes. Tell us when you book and the kitchen will plan properly rather than improvise. Vegetarian and vegan menus are written for their own sake, and allergies are handled with care.'),
  },
  {
    q: en('Can I swim in the cove?'),
    a: en('Yes, and many guests do, year round. Check the tide times at reception, swim within your depth, and join one of our guided swims if you would like company.'),
  },
  {
    q: en('How accessible is the hotel?'),
    a: en('The Boathouse, the dining room and the terrace are step-free. The beach is reached by steps, so call us and we will talk through what will work for you.'),
  },
];

export const attractions = [
  { name: 'Chapel Porth & the engine houses', distance: '10 minutes', description: en('National Trust clifftops, the most photographed engine house in Cornwall, and a beach café famous for its hedgehog ice cream.') },
  { name: 'Fistral Beach, Newquay', distance: '25 minutes', description: en('Cornwall’s best-known surf beach. Go to watch the experts, then come back to the cove to practise.') },
  { name: 'Tate St Ives', distance: '40 minutes', description: en('Modern art in a gallery that looks straight out over Porthmeor Beach. Combine it with lunch by the harbour.') },
  { name: 'Truro Cathedral', distance: '20 minutes', description: en('A Gothic Revival cathedral in Cornwall’s only city, with good shops and cafés around it.') },
  { name: 'The Eden Project', distance: '45 minutes', description: en('The famous biomes in an old clay pit. Allow a full day, and book ahead in summer.') },
  { name: 'St Michael’s Mount', distance: '50 minutes', description: en('A castle on a tidal island. Walk the causeway at low tide, take the little boat back when it comes in.') },
];

export const directions = [
  { mode: en('By car'), detail: en('Leave the A30 at Chiverton Cross and follow the signs for St Agnes. Cove Lane is on the right just before the village. Exeter is around two hours; London around five.') },
  { mode: en('By rail'), detail: en('Truro station is twenty minutes away, with direct trains from London Paddington and the Night Riviera sleeper. We will collect you from the station; just tell us your train.') },
  { mode: en('By air'), detail: en('Cornwall Airport Newquay is twenty-five minutes away, with flights from London and around the UK. We can arrange a transfer.') },
  { mode: en('On foot'), detail: en('The South West Coast Path passes the garden gate. If you are walking the path, we will hold your bags and keep a pot of tea ready.') },
];

/** None for the demo: press quotes must be real, from real coverage. */
export const pressMentions: Array<{ outlet: string; quote: LocaleField }> = [];

export const menus = [
  {
    name: en('Breakfast'),
    note: en('Served 7.30 to 10am, inside or on the terrace'),
    items: [
      { dish: en('The full Cornish'), detail: en('Local sausage, hog’s pudding, bacon, eggs from up the lane, and a saffron bun for later') },
      { dish: en('Smoked mackerel on toast'), detail: en('From the smokehouse in the harbour, with horseradish and watercress') },
      { dish: en('Granola and yoghurt'), detail: en('Made in the kitchen, with whatever fruit is good this week') },
      { dish: en('Crab omelette'), detail: en('Brown and white crab, chives, and a lot of butter') },
    ],
  },
  {
    name: en('Dinner'),
    note: en('Served 6.30 to 9pm in the dining room'),
    items: [
      { dish: en('Oysters from the Helford'), detail: en('Natural, or with shallot vinegar and Tabasco') },
      { dish: en('Day-boat fish'), detail: en('Whatever came in this morning, with samphire and brown butter') },
      { dish: en('Cornish lamb'), detail: en('Slow-cooked shoulder, sea beet, and potatoes roasted in the drippings') },
      { dish: en('Saffron cake and clotted cream'), detail: en('Warm from the oven, as it should be') },
    ],
  },
  {
    name: en('The Tasting Menu'),
    note: en('Five courses, whole table, £75. With wine pairings, £120'),
    items: [
      { dish: en('Five courses from the coast'), detail: en('The boats, the shore and the fields above the cove, in that order') },
      { dish: en('Pairings'), detail: en('Cornish sparkling wine, and good bottles from further afield') },
      { dish: en('The cheese course'), detail: en('Cornish Yarg, Kern and Cornish Blue, with crackers baked that afternoon') },
      { dish: en('To finish'), detail: en('Coffee and fudge on the terrace, watching the light go') },
    ],
  },
];

export const voucherTypes = [
  {
    name: en('The Monetary Voucher'),
    price: 'From £50',
    description: en('Any amount from fifty pounds, valid against rooms, dinner and every experience we offer. The flexible option for people whose taste you trust.'),
    image: IMG.exterior,
  },
  {
    name: en('Dinner for Two'),
    price: '£150',
    description: en('The five-course tasting menu for two, with a glass of Cornish fizz on the terrace first. A night out by the sea, on someone else.'),
    image: IMG.dining1,
  },
  {
    name: en('A Night by the Sea'),
    price: 'From £295',
    description: en('A night in a sea-view room with breakfast and dinner for two. The gift that is really an instruction: go to the coast, switch your phone off.'),
    image: IMG.room4,
  },
];
