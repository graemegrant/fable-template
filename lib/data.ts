/**
 * lib/data.ts — static fallback content.
 * The site builds and runs entirely from this file when no Sanity project
 * is configured. All imagery is Unsplash placeholder, swapped via the CMS.
 *
 * Translatable fields use the LocaleField shape ({ en: '...' }) — only the
 * default locale (en) is populated here, by design. Non-default locales
 * fall back to it via lib/resolveLocale.ts's pickLocale(), rather than
 * having placeholder/demo prose machine-translated (AGENTS.md §9).
 */
import type {
  RoomI18n, ExperienceI18n, OfferI18n, JournalPostI18n, TestimonialI18n, TeamMemberI18n,
} from './types';
import type { LocaleField } from './locales';

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  heroHouse: u('photo-1528806290983-2c003d438fb3'),
  exterior: u('photo-1589489873423-d1745278a8f4'),
  glen: u('photo-1546706872-9c90b8d0c94f'),
  forest: u('photo-1441974231531-c6227db76b6e'),
  loch: u('photo-1516570628389-492e1488089d'),
  room1: u('photo-1611892440504-42a792e24d32'),
  room2: u('photo-1590490360182-c33d57733427'),
  room3: u('photo-1582719478250-c89cae4dc85b'),
  room4: u('photo-1566665797739-1674de7a421a'),
  room5: u('photo-1578683010236-d716f9a3f461'),
  room6: u('photo-1505693416388-ac5ce068fe85'),
  bath: u('photo-1552858725-2758b5fb1286'),
  dining1: u('photo-1414235077428-338989a2e8c0'),
  dining2: u('photo-1559339352-11d035aa65de'),
  food1: u('photo-1467003909585-2f8a72700288'),
  food2: u('photo-1504674900247-0877df9cc836'),
  whisky: u('photo-1527281400683-1aae777175f8'),
  spa: u('photo-1544161515-4ab6ce6db874'),
  wedding1: u('photo-1519225421980-715cb0215aed'),
  wedding2: u('photo-1511795409834-ef04bbd61622'),
  garden: u('photo-1612721531230-16c20cf8adce'),
  fire: u('photo-1542718610-a1d656d1884c'),
  walk: u('photo-1609674750700-33895b9b7ce1'),
  fishing: u('photo-1589490047559-a1c13ec25b87'),
  portrait1: u('photo-1560250097-0b93528c311a', 900),
  portrait2: u('photo-1573496359142-b8d87734a5a2', 900),
  portrait3: u('photo-1472099645785-5658abf4ff4e', 900),
  portrait4: u('photo-1438761681033-6461ffad8d80', 900),
  portrait5: u('photo-1500648767791-00dcc994a43e', 900),
  portrait6: u('photo-1544005313-94ddf0286df2', 900),
};

/* Minimal portable-text builder so fallback journal posts render
   through the same PortableText component as CMS content. */
let k = 0;
const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: `b${k++}`,
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: `s${k++}`, text, marks: [] }],
});
/** Wraps a fallback (English-only) value in the LocaleField shape. */
const en = <T>(value: T): LocaleField<T> => ({ en: value });

export const rooms: RoomI18n[] = [
  {
    name: en('The Schiehallion Suite'),
    slug: 'schiehallion-suite',
    type: 'Suite',
    description: en(
      'The principal suite, occupying the south-west corner of the second floor. A separate sitting room with open fire, a bedroom hung with estate maps, and a bathroom built around a cast-iron bath that looks straight down the glen. On a clear evening you can watch the light leave Schiehallion without lifting your head from the pillow.',
    ),
    heroImage: IMG.room1,
    gallery: [IMG.room1, IMG.bath, IMG.room2, IMG.glen],
    rate: 595,
    sqm: 64,
    occupancy: 3,
    floor: 'Second floor',
    view: 'West, over the loch to Schiehallion',
    amenities: [
      'Super-king bed', 'Separate sitting room with open fire', 'Cast-iron roll-top bath',
      'Walk-in shower', 'Estate-blend whisky decanter', 'Roberts radio',
      'Bramley toiletries', 'Daily pressed linen', 'Tea tray with home baking',
    ].map(en),
    featured: true,
    active: true,
  },
  {
    name: en('The Atholl Suite'),
    slug: 'atholl-suite',
    type: 'Suite',
    description: en(
      'A first-floor suite over the south lawn, with the longest view in the house — down the avenue of limes to the river. Panelled walls, a writing desk that guests tend to photograph, and a dressing room that makes a week-long stay feel sensible.',
    ),
    heroImage: IMG.room2,
    gallery: [IMG.room2, IMG.room3, IMG.bath, IMG.garden],
    rate: 495,
    sqm: 58,
    occupancy: 2,
    floor: 'First floor',
    view: 'South, over the lawn to the Tay valley',
    amenities: [
      'Super-king bed', 'Dressing room', 'Roll-top bath and walk-in shower',
      'Writing desk', 'Open fire', 'Estate-blend whisky decanter',
      'Bramley toiletries', 'Tea tray with home baking',
    ].map(en),
    featured: true,
    active: true,
  },
  {
    name: en('The Garry'),
    slug: 'the-garry',
    type: 'Deluxe',
    description: en(
      'A generous first-floor double overlooking the walled garden. The bed faces the window deliberately — mornings here are the argument for the room. Bathroom in honed marble with both bath and shower.',
    ),
    heroImage: IMG.room3,
    gallery: [IMG.room3, IMG.bath, IMG.garden, IMG.room4],
    rate: 340,
    sqm: 38,
    occupancy: 2,
    floor: 'First floor',
    view: 'East, over the walled garden',
    amenities: [
      'King bed', 'Bath and walk-in shower', 'Window seat',
      'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking',
    ].map(en),
    featured: true,
    active: true,
  },
  {
    name: en('The Tummel'),
    slug: 'the-tummel',
    type: 'Deluxe',
    description: en(
      'Second floor, river side. Sloped ceilings, a deep window with a view of the water, and the quietest corridor in the house. Popular with returning guests who book it by name.',
    ),
    heroImage: IMG.room4,
    gallery: [IMG.room4, IMG.room5, IMG.bath, IMG.loch],
    rate: 320,
    sqm: 36,
    occupancy: 2,
    floor: 'Second floor',
    view: 'North, over the river',
    amenities: [
      'King bed', 'Walk-in shower', 'Window seat',
      'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking',
    ].map(en),
    active: true,
  },
  {
    name: en('The Birnam'),
    slug: 'the-birnam',
    type: 'Classic',
    description: en(
      'A ground-floor double off the garden corridor, with its own door to the courtyard — the room to take if you travel with a dog or simply prefer to slip out early. Compact, warm, and quietly handsome.',
    ),
    heroImage: IMG.room5,
    gallery: [IMG.room5, IMG.room6, IMG.bath, IMG.fire],
    rate: 240,
    sqm: 26,
    occupancy: 2,
    floor: 'Ground floor',
    view: 'Courtyard',
    amenities: [
      'King or twin beds', 'Walk-in shower', 'Direct courtyard access',
      'Dog-friendly', 'Bramley toiletries', 'Tea tray with home baking',
    ].map(en),
    active: true,
  },
  {
    name: en('The Faskally'),
    slug: 'the-faskally',
    type: 'Classic',
    description: en(
      'Tucked under the eaves on the second floor with a porthole view of the woodland. The smallest room in the house and, by some accounts, the best loved — all the comfort, none of the ceremony.',
    ),
    heroImage: IMG.room6,
    gallery: [IMG.room6, IMG.forest, IMG.bath, IMG.room5],
    rate: 255,
    sqm: 28,
    occupancy: 2,
    floor: 'Second floor',
    view: 'Woodland',
    amenities: [
      'King bed', 'Walk-in shower', 'Reading chair',
      'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking',
    ].map(en),
    active: true,
  },
];

export const experiences: ExperienceI18n[] = [
  {
    name: en('Private Whisky Tasting'),
    slug: 'private-whisky-tasting',
    category: 'Food & Drink',
    description: en(
      'An evening in the library with our keeper of the cellar: six drams, poured chronologically, from Lowland softness to the peat of the islands — finishing with the Craigmore estate blend, bottled for the house alone.',
    ),
    heroImage: IMG.whisky,
    duration: en('2 hours'),
    price: en('From £85 per person'),
    seasons: ['Year round'],
    includes: ['Six guided drams', 'Estate blend tasting', 'Oatcakes and cheese from the pantry', 'Tasting notes to take home'].map(en),
  },
  {
    name: en('Highland Estate Walk'),
    slug: 'highland-estate-walk',
    category: 'Outdoors',
    description: en(
      'Four hundred acres, one ghillie, no agenda. Hamish has walked this ground for thirty years and will show you the heronry, the old shielings, and where the red deer cross at dusk. Boots provided if the weather turns.',
    ),
    heroImage: IMG.walk,
    duration: en('3 hours'),
    price: en('From £40 per person'),
    seasons: ['Year round'],
    includes: ['Private ghillie guide', 'Estate boots and waterproofs', 'Hip flask and shortbread', 'Map of the routes for the rest of your stay'].map(en),
  },
  {
    name: en('Fly Fishing on the Tay'),
    slug: 'fly-fishing-on-the-tay',
    category: 'Outdoors',
    description: en(
      'A full day on a private beat of the Tay with tuition pitched precisely to you — first cast or fortieth season. Salmon in spring and autumn, brown trout through the summer. Lunch comes down to the bank in a hamper.',
    ),
    heroImage: IMG.fishing,
    duration: en('Full day'),
    price: en('From £180 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: ['Private beat and permits', 'All tackle and waders', 'Riverside hamper lunch', 'Your catch prepared by the kitchen'].map(en),
  },
  {
    name: en('Wild Swimming & Sauna'),
    slug: 'wild-swimming-and-sauna',
    category: 'Wellness',
    description: en(
      'A short walk through the pines to the loch, a swim that will reorganise your priorities, and a wood-fired sauna on the shore to put them back. Towels, robes and hot chocolate at the jetty.',
    ),
    heroImage: IMG.loch,
    duration: en('2 hours'),
    price: en('From £60 per person'),
    seasons: ['Year round'],
    includes: ['Guided swim with safety cover', 'Wood-fired lochside sauna', 'Robes, towels and changing hut', 'Hot chocolate or a dram at the jetty'].map(en),
  },
  {
    name: en('Falconry on the Lawn'),
    slug: 'falconry-on-the-lawn',
    category: 'Heritage',
    description: en(
      'An hour and a half with hawks and a falconer whose family has flown birds in this glen for four generations. The moment a Harris hawk first lands on your glove is not one you will forget.',
    ),
    heroImage: IMG.glen,
    duration: en('90 minutes'),
    price: en('From £95 per person'),
    seasons: ['Year round'],
    includes: ['Private falconer', 'Hawk handling and flying', 'Gloves and equipment', 'Photographs of the session'].map(en),
  },
  {
    name: en('Foraging with the Chef'),
    slug: 'foraging-with-the-chef',
    category: 'Food & Drink',
    description: en(
      'A morning in the woods and hedgerows with our head chef, gathering whatever the season offers — chanterelles, wild garlic, elderflower, sloes — followed by lunch built around the basket you carried home.',
    ),
    heroImage: IMG.forest,
    duration: en('Half day'),
    price: en('From £120 per person'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: ['Foraging walk with the head chef', 'Basket and knife to use', 'Three-course lunch from your haul', 'Recipe cards to take home'].map(en),
  },
];

export const offers: OfferI18n[] = [
  {
    title: en('The Long Weekend'),
    slug: 'the-long-weekend',
    subtitle: en('Three nights, properly taken'),
    description: en(
      'Arrive Friday, leave Monday, and let the house do the rest. Dinner on your first evening, a late checkout on your last morning, and the weekend left deliberately unplanned in between.',
    ),
    tag: en('Most popular'),
    image: IMG.exterior,
    inclusions: ['Three nights bed & breakfast', 'Three-course dinner on arrival night', 'Late checkout until 1pm', 'Welcome dram on arrival'].map(en),
    type: 'Stay',
  },
  {
    title: en('Winter by the Fire'),
    slug: 'winter-by-the-fire',
    subtitle: en('November to March'),
    description: en(
      'The house at its most persuasive: fires lit by breakfast, the glen dusted white, and the tasting menu at its richest. Two nights minimum, hot water bottles administered without irony.',
    ),
    tag: en('Seasonal'),
    image: IMG.fire,
    inclusions: ['Two nights bed & breakfast', 'Six-course tasting menu one evening', 'Whisky nightcap by the library fire', '20% off spa and sauna experiences'].map(en),
    validFrom: '2026-11-01',
    validUntil: '2027-03-31',
    type: 'Seasonal',
  },
  {
    title: en('The Midweek Escape'),
    slug: 'midweek-escape',
    subtitle: en('Sunday to Thursday'),
    description: en(
      'The hills do not know it is Tuesday. Fifteen percent off bed and breakfast stays midweek, when the house is at its quietest and the trails are yours alone.',
    ),
    tag: en('Best value'),
    image: IMG.glen,
    inclusions: ['15% off bed & breakfast rates', 'Flexible cancellation to 48 hours', 'Complimentary estate walk map', 'Priority dinner reservations'].map(en),
    type: 'Stay',
  },
  {
    title: en('The Celebration Stay'),
    slug: 'celebration-stay',
    subtitle: en('Mark it properly'),
    description: en(
      'Anniversaries, decades, escapes that needed an excuse. Champagne on ice when you arrive, flowers from the walled garden in the room, and an upgrade to the best available suite when the house allows.',
    ),
    tag: en('Occasions'),
    image: IMG.room1,
    inclusions: ['Suite upgrade when available', 'Champagne and walled-garden flowers', 'Breakfast in bed, no judgement', 'Late checkout until 1pm'].map(en),
    type: 'Occasion',
  },
];

export const journalPosts: JournalPostI18n[] = [
  {
    title: en('A Year in the Walled Garden'),
    slug: 'a-year-in-the-walled-garden',
    category: 'Garden',
    author: 'Tom Drummond',
    publishedAt: '2026-04-14',
    readingTime: en('6 min read'),
    excerpt: en(
      'Our head gardener on frost, rhubarb, and the quiet politics of growing for a kitchen that wants everything a fortnight early.',
    ),
    heroImage: IMG.garden,
    featured: true,
    body: en([
      block('The wall was built in 1847 to keep deer out and heat in, and it still does both better than anything we could buy. Inside it, a year moves differently. January is paper — seed orders, grudges from last season, optimism in catalogue form. By February the rhubarb is up under its forcing pots, pale and indecently pink, and the kitchen starts telephoning.'),
      block('What the kitchen wants', 'h2'),
      block('Chefs, in my experience, believe vegetables are a scheduling problem. Calum is better than most, but even he asks for courgette flowers in May. The garden answers to the glen, not the menu, and the glen runs a fortnight behind the rest of Scotland and a month behind London. The negotiation is the job.'),
      block('We grow what the ground does well: brassicas that shrug at frost, potatoes in seven varieties, gooseberries on the south wall, and herbs in quantities that would look like madness anywhere else. Everything walks to the kitchen. Nothing sees a van.'),
      block('The quiet months', 'h2'),
      block('Guests ask what we do in winter. The honest answer is: prune, plan, and drink tea in the potting shed while the robin supervises. The garden is never finished and never empty. That is rather the point of it.'),
      block('If you are staying with us, the garden gate is never locked. Come in, walk the paths, take a gooseberry if the season allows. Just close the gate — the wall keeps the deer out, but only if we help it.', 'blockquote'),
    ]),
  },
  {
    title: en('The Quiet Season: Why Winter Suits Perthshire'),
    slug: 'the-quiet-season',
    category: 'The Glen',
    author: 'Eleanor Brodie',
    publishedAt: '2026-01-20',
    readingTime: en('5 min read'),
    excerpt: en(
      'The case for coming when everyone else has gone home: short days, long dinners, and a glen that keeps its best light for the patient.',
    ),
    heroImage: IMG.fire,
    body: en([
      block('There is a fortnight in deep winter when the sun never quite clears the ridge, and the whole glen sits in a kind of blue half-light from ten until three. Most hotels would apologise for it. We would argue it is the best thing we offer.'),
      block('Winter compresses the day into something honest. You walk in the morning because the light is leaving. You are back by the fire at four because there is nowhere better to be. Dinner takes three hours because nobody can think of a reason it should not.'),
      block('What to actually do', 'h2'),
      block('The estate walk is at its best in hard frost — the bog freezes and routes open that are impassable all summer. The sauna by the loch becomes a conviction rather than a novelty. And the kitchen, freed from the tyranny of summer lightness, cooks the way this country has always wanted to be cooked: slowly, richly, with gravity.'),
      block('Come in February. Bring boots and a book. Leave the rest to the house.'),
    ]),
  },
  {
    title: en('Meet the Maker: Glen Ericht Distillery'),
    slug: 'meet-the-maker-glen-ericht',
    category: 'Provenance',
    author: 'Calum Ross',
    publishedAt: '2025-11-08',
    readingTime: en('7 min read'),
    excerpt: en(
      'Four miles downriver, a distillery of nine people makes the single malt that anchors our estate blend. We went to see why it tastes of the same water we cook with.',
    ),
    heroImage: IMG.whisky,
    body: en([
      block('Every bottle of the Craigmore estate blend starts four miles from the front door, at a distillery most maps decline to mention. Glen Ericht employs nine people, two of whom are brothers, one of whom is eighty-one and still noses every cask personally.'),
      block('The same water', 'h2'),
      block('The burn that feeds their mash tuns rises on the same hill as the spring that supplies our kitchen. I am not romantic about much, but I am romantic about that: the whisky in your glass after dinner and the water that cooked the dinner fell as the same rain.'),
      block('Our blend takes their twelve-year-old as its spine, softened with a Lowland grain and finished in sherry wood for eighteen months in our own cellar. We bottle around six hundred a year. It is for the house, the bar, and guests who ask nicely. It is not for sale anywhere else, which is, we admit, half the pleasure of it.'),
      block('You can visit Glen Ericht with us — the private tasting in the library ends with a dram of their newest cask, and the distillery walk runs most Thursdays in season.'),
    ]),
  },
  {
    title: en('Six Walks from the Front Door'),
    slug: 'six-walks-from-the-front-door',
    category: 'Outdoors',
    author: 'Hamish Begg',
    publishedAt: '2025-09-15',
    readingTime: en('8 min read'),
    excerpt: en(
      'No car required. The estate ghillie ranks the six routes that start on the gravel outside reception, from a gentle hour to a full day on the ridge.',
    ),
    heroImage: IMG.walk,
    body: en([
      block('People drive an hour from here to start walks worse than the ones that begin on our gravel. Here are the six I send guests on, easiest first. All of them start and end at the front door, which matters more than people think — the best walk is the one between you and dinner.'),
      block('One: The River Circuit', 'h2'),
      block('An hour, flat, impossible to lose. Down the lime avenue, along the Tay to the old ford, back through the oak wood. Herons guaranteed; otters if you are quiet and lucky.'),
      block('Two: The Walled Garden Loop', 'h2'),
      block('Forty minutes through the policies — the old ornamental grounds — taking in the garden, the icehouse, and the folly the fourth laird built to annoy his brother. Good with a coffee from the hall table.'),
      block('Three to Five: The Hill Tracks', 'h2'),
      block('Three routes climb out of the glen on old stalkers’ paths: the Shieling Track (two hours), the Crag (three, steep, worth it), and the March Wall (four, big views, take lunch). Ask at the desk and we will mark the day’s best choice on a map — wind decides.'),
      block('Six: The Ridge', 'h2'),
      block('A full day, proper boots, packed lunch from the kitchen. The whole glen at your feet and, on a clear day, Schiehallion looking close enough to touch. I have done it some four hundred times. It has not once been the same walk twice.'),
    ]),
  },
];

export const testimonials: TestimonialI18n[] = [
  {
    guestName: 'A. & J. Pemberton',
    quote: en(
      'We have stayed in grander hotels and slept worse in all of them. Craigmore understands the difference between luxury and fuss, and chooses correctly every single time.',
    ),
    rating: 5,
    roomStayed: 'The Atholl Suite',
    date: '2026-03-02',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'Margaret L.',
    quote: en(
      'Dinner was the best I have eaten in Scotland, and I say that as someone who came principally for the fishing. The fishing, incidentally, was also the best I have had in Scotland.',
    ),
    rating: 5,
    roomStayed: 'The Tummel',
    date: '2026-05-18',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'The Okafor family',
    quote: en(
      'Three generations, four days, zero complaints — a family first. The staff remembered everyone’s name by breakfast on day one, including the dog’s.',
    ),
    rating: 5,
    roomStayed: 'The Birnam & The Garry',
    date: '2025-10-26',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'D. Whitfield',
    quote: en(
      'I came for two nights to finish a book and stayed five. The library fire, the silence, and the woman who kept appearing with exactly the right pot of tea are jointly responsible.',
    ),
    rating: 5,
    roomStayed: 'The Faskally',
    date: '2026-02-09',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'S. & R. Maxwell',
    quote: en(
      'We were married on the south lawn in September. A year on, guests still bring it up unprompted. Flawless is an overused word; I am using it anyway.',
    ),
    rating: 5,
    roomStayed: 'The Schiehallion Suite',
    date: '2025-09-30',
    source: 'Guest book',
    featured: true,
  },
];

export const team: TeamMemberI18n[] = [
  {
    name: 'Eleanor Brodie',
    role: en('General Manager'),
    bio: en(
      'Twenty years in country house hotels on both sides of the border, and a firm belief that the best service is the kind you only notice afterwards. Keeper of the guest book and its secrets.',
    ),
    headshot: IMG.portrait2,
    department: 'Management',
    displayOrder: 1,
  },
  {
    name: 'Calum Ross',
    role: en('Head Chef'),
    bio: en(
      'Perthshire born, trained in Edinburgh and Lyon, returned on the understanding that the larder would be the glen itself. Cooks what the estate, the river and the walled garden hand him.',
    ),
    headshot: IMG.portrait3,
    department: 'Kitchen',
    displayOrder: 2,
  },
  {
    name: 'Isla McAllister',
    role: en('Front of House Manager'),
    bio: en(
      'The first voice most guests hear and the reason most of them come back. Knows every train time, every walk, and every guest’s usual table by their second visit.',
    ),
    headshot: IMG.portrait4,
    department: 'Front of House',
    displayOrder: 3,
  },
  {
    name: 'Tom Drummond',
    role: en('Head Gardener'),
    bio: en(
      'Custodian of the 1847 walled garden and its seven varieties of potato. Negotiates daily with the kitchen and, by his own account, usually wins.',
    ),
    headshot: IMG.portrait5,
    department: 'Estate',
    displayOrder: 4,
  },
  {
    name: 'Hamish Begg',
    role: en('Estate Ghillie'),
    bio: en(
      'Thirty years on this ground. Guide to the hill tracks, keeper of the beats, and the only member of staff with a standing excuse to be late: the river wanted watching.',
    ),
    headshot: IMG.portrait1,
    department: 'Estate',
    displayOrder: 5,
  },
  {
    name: 'Marie Laurent',
    role: en('Head of Housekeeping'),
    bio: en(
      'Runs the quietest department in the house to the highest standard in it. Believes a properly made bed is a moral position, and makes a persuasive case nightly.',
    ),
    headshot: IMG.portrait6,
    department: 'Housekeeping',
    displayOrder: 6,
  },
];

/* ——— Static page content (not CMS-managed) ———
   Prose fields use the same LocaleField wrapper as the CMS-backed content
   above, resolved with the same pickLocale() at each call site. */

export const faqs = [
  { q: en('What are your check-in and check-out times?'), a: en('Check-in is from 3pm and check-out by 11am. Early arrivals are welcome to leave luggage and take the run of the house; late checkout until 1pm can usually be arranged.') },
  { q: en('Are dogs welcome?'), a: en('Dogs are welcome in The Birnam, which has direct courtyard access, and throughout the grounds on a lead. We provide beds, bowls and a map of the best sniffs. £25 per dog per stay.') },
  { q: en('Do you welcome children?'), a: en('We welcome children of all ages. Cots and extra beds are available in the suites, the kitchen cooks a proper children’s supper at 5.30pm, and the estate absorbs energy better than any screen.') },
  { q: en('Can you cater for dietary requirements?'), a: en('Yes — tell us when you book and the kitchen will plan properly rather than improvise. Vegetarian and vegan menus stand on their own merits; allergies are handled with full separation.') },
  { q: en('Is there parking and EV charging?'), a: en('Free parking on the gravel for all guests, with two 22kW EV chargers in the courtyard. No charge for charging.') },
  { q: en('How accessible is the house?'), a: en('The Birnam and all ground-floor public rooms are step-free, and we have a ramp for the front steps. The house is Victorian and honest about it — call us and we will talk through your needs candidly.') },
];

export const attractions = [
  { name: 'Blair Castle', distance: '20 minutes', description: en('Seven centuries of Atholl history, white-walled and unmissable, with grounds that reward a full afternoon.') },
  { name: 'The Queen’s View', distance: '15 minutes', description: en('The most photographed view in Scotland, looking the length of Loch Tummel to Schiehallion. Go early, before the coaches.') },
  { name: 'Pitlochry Festival Theatre', distance: '12 minutes', description: en('A genuinely good repertory theatre in the hills. Pre-theatre supper at the house, curtain at 7.30, nightcap by the fire after.') },
  { name: 'The Pass of Killiecrankie', distance: '10 minutes', description: en('A wooded gorge of real drama — site of the 1689 battle and the famous Soldier’s Leap. Best in October colour.') },
  { name: 'Dunkeld & The Hermitage', distance: '25 minutes', description: en('A handsome cathedral town and a Douglas-fir walk to the Black Linn falls. The bakery on the square is worth the detour alone.') },
  { name: 'Glen Ericht Distillery', distance: '10 minutes', description: en('The nine-person distillery behind our estate blend. Tours by arrangement through the house — ask at the desk.') },
];

export const directions = [
  { mode: en('By car'), detail: en('Leave the A9 at the Pitlochry junction and follow the B-road west for four miles. The gates are marked by two stone herons; the drive takes another half mile. Edinburgh and Glasgow are both around 90 minutes.') },
  { mode: en('By rail'), detail: en('Pitlochry station is on the Highland Main Line, with direct trains from Edinburgh, Glasgow, Inverness and the Caledonian Sleeper from London. We will collect you from the platform — just tell us your train.') },
  { mode: en('By air'), detail: en('Edinburgh Airport is 90 minutes by car, Glasgow a few minutes more. Private transfers can be arranged; the drive up the A9 is the gentlest possible decompression.') },
  { mode: en('By helicopter'), detail: en('The south lawn takes a helicopter at the pilot’s discretion. Give us 48 hours’ notice and we will have the windsock up and the dram poured.') },
];

export const pressMentions = [
  { outlet: 'Condé Nast Traveller', quote: en('The new benchmark for the Highland country house.') },
  { outlet: 'The Times', quote: en('Twelve rooms, four hundred acres, and not a single false note.') },
  { outlet: 'Country Life', quote: en('Craigmore does what the great houses always did — it simply does it better.') },
  { outlet: 'The Telegraph', quote: en('Worth the drive north. Worth, frankly, any drive at all.') },
];

export const menus = [
  {
    name: en('Breakfast'),
    note: en('Served 7.30–10am, table or tray'),
    items: [
      { dish: en('The full Craigmore'), detail: en('Estate sausage, Stornoway black pudding, tattie scone, hen-of-the-morning eggs') },
      { dish: en('Porridge with cream and heather honey'), detail: en('Or with a dram, after 9am, no questions') },
      { dish: en('Smoked haddock omelette'), detail: en('Arbroath smokie, Mull cheddar, chives from the wall') },
      { dish: en('Walled garden compote'), detail: en('Whatever Tom surrendered this week, with crowdie and oats') },
    ],
  },
  {
    name: en('Dinner — À la carte'),
    note: en('Served 6.30–9pm in the dining room'),
    items: [
      { dish: en('Hand-dived Orkney scallop'), detail: en('Brown butter, sea aster, roe from the shell') },
      { dish: en('Roe deer from the hill'), detail: en('Loin and faggot, beetroot, blackberries, juniper') },
      { dish: en('Tay salmon, when the river allows'), detail: en('Sorrel, garden cucumber, smoked bone sauce') },
      { dish: en('Gooseberry and elderflower tart'), detail: en('From the south wall, with meadowsweet cream') },
    ],
  },
  {
    name: en('The Tasting Menu'),
    note: en('Six courses, whole table, £95 — with pairings £150'),
    items: [
      { dish: en('Six courses from the estate'), detail: en('The glen, the river, the garden and the cellar, in that order') },
      { dish: en('Pairings from the cellar'), detail: en('Old-world wines and the occasional insubordinate dram') },
      { dish: en('The cheese course'), detail: en('A trolley of Scottish farmhouse cheeses, oatcakes baked at 4pm') },
      { dish: en('To finish'), detail: en('The estate blend, by the fire, in no hurry whatsoever') },
    ],
  },
];

export const voucherTypes = [
  {
    name: en('The Monetary Voucher'),
    price: 'From £50',
    description: en('Any amount from fifty pounds, valid against rooms, dinner, the cellar and every experience on the estate. The flexible option for people whose taste you trust.'),
    image: IMG.exterior,
  },
  {
    name: en('Dinner for Two'),
    price: '£190',
    description: en('The six-course tasting menu for two, with a glass of champagne in the library first. The kitchen’s full argument, made on someone else’s behalf.'),
    image: IMG.dining1,
  },
  {
    name: en('The Night Away'),
    price: 'From £340',
    description: en('A night in a deluxe room with breakfast and dinner for two. The gift that is actually an instruction: go to the glen, switch the phone off.'),
    image: IMG.room3,
  },
];
