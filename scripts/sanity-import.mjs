/**
 * sanity-import.mjs
 * Imports all static fallback content into your Sanity project.
 *
 * BEFORE RUNNING:
 * 1. Create a write token in Sanity: sanity.io/manage → API → Tokens → Add API token (Editor)
 * 2. Run from your project folder:
 *    SANITY_TOKEN=<your-token> node scripts/sanity-import.mjs
 *
 * On Windows PowerShell:
 *    $env:SANITY_TOKEN="<your-token>"; node scripts/sanity-import.mjs
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 'ydo9s14w'
const DATASET = 'production'
const TOKEN = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error('\n❌  SANITY_TOKEN is not set.\n')
  console.error('Create a write token at: https://sanity.io/manage → API → Tokens')
  console.error('\nWindows PowerShell:')
  console.error('  $env:SANITY_TOKEN="your-token-here"; node scripts/sanity-import.mjs\n')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── Helpers ────────────────────────────────────────────────────────────────

let _k = 0
const key = () => `k${++_k}`
const slug = (current) => ({ _type: 'slug', current })

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

async function uploadImage(url, label) {
  try {
    process.stdout.write(`    📸 ${label} ... `)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, {
      filename: `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`,
      contentType: 'image/jpeg',
    })
    console.log('✓')
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (e) {
    console.log(`✗ skipped (${e.message})`)
    return undefined
  }
}

async function create(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id })
  if (existing) {
    await client.patch(doc._id).set(doc).commit()
    return 'updated'
  }
  await client.create(doc)
  return 'created'
}

// ─── Image URLs ──────────────────────────────────────────────────────────────

const u = (id, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const URLS = {
  heroHouse: u('photo-1506744038136-46273834b3fb'),
  exterior:  u('photo-1520250497591-112f2f40a3f4'),
  glen:      u('photo-1506905925346-21bda4d32df4'),
  forest:    u('photo-1441974231531-c6227db76b6e'),
  loch:      u('photo-1469474968028-56623f02e42e'),
  room1:     u('photo-1611892440504-42a792e24d32'),
  room2:     u('photo-1590490360182-c33d57733427'),
  room3:     u('photo-1582719478250-c89cae4dc85b'),
  room4:     u('photo-1566665797739-1674de7a421a'),
  room5:     u('photo-1578683010236-d716f9a3f461'),
  room6:     u('photo-1505693416388-ac5ce068fe85'),
  bath:      u('photo-1552858725-2758b5fb1286'),
  dining1:   u('photo-1414235077428-338989a2e8c0'),
  fire:      u('photo-1542718610-a1d656d1884c'),
  whisky:    u('photo-1527281400683-1aae777175f8'),
  garden:    u('photo-1416879595882-3373a0480b5b'),
  walk:      u('photo-1551632811-561732d1e306'),
  fishing:   u('photo-1499242611767-cf8b9be02854'),
  portrait1: u('photo-1560250097-0b93528c311a', 900),
  portrait2: u('photo-1573496359142-b8d87734a5a2', 900),
  portrait3: u('photo-1472099645785-5658abf4ff4e', 900),
  portrait4: u('photo-1438761681033-6461ffad8d80', 900),
  portrait5: u('photo-1500648767791-00dcc994a43e', 900),
  portrait6: u('photo-1544005313-94ddf0286df2', 900),
}

// ─── Import functions ─────────────────────────────────────────────────────────

async function importRooms(imgs) {
  console.log('\n🛏  Rooms')

  const rooms = [
    {
      _id: 'room-schiehallion-suite',
      _type: 'room',
      name: 'The Schiehallion Suite',
      slug: slug('schiehallion-suite'),
      type: 'Suite',
      description: 'The principal suite, occupying the south-west corner of the second floor. A separate sitting room with open fire, a bedroom hung with estate maps, and a bathroom built around a cast-iron bath that looks straight down the glen. On a clear evening you can watch the light leave Schiehallion without lifting your head from the pillow.',
      heroImage: imgs.room1,
      gallery: [imgs.room1, imgs.bath, imgs.room2, imgs.glen].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 595, sqm: 64, occupancy: 3,
      floor: 'Second floor',
      view: 'West, over the loch to Schiehallion',
      amenities: ['Super-king bed', 'Separate sitting room with open fire', 'Cast-iron roll-top bath', 'Walk-in shower', 'Estate-blend whisky decanter', 'Roberts radio', 'Bramley toiletries', 'Daily pressed linen', 'Tea tray with home baking'],
      featured: true, active: true,
    },
    {
      _id: 'room-atholl-suite',
      _type: 'room',
      name: 'The Atholl Suite',
      slug: slug('atholl-suite'),
      type: 'Suite',
      description: 'A first-floor suite over the south lawn, with the longest view in the house — down the avenue of limes to the river. Panelled walls, a writing desk that guests tend to photograph, and a dressing room that makes a week-long stay feel sensible.',
      heroImage: imgs.room2,
      gallery: [imgs.room2, imgs.room3, imgs.bath, imgs.garden].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 495, sqm: 58, occupancy: 2,
      floor: 'First floor',
      view: 'South, over the lawn to the Tay valley',
      amenities: ['Super-king bed', 'Dressing room', 'Roll-top bath and walk-in shower', 'Writing desk', 'Open fire', 'Estate-blend whisky decanter', 'Bramley toiletries', 'Tea tray with home baking'],
      featured: true, active: true,
    },
    {
      _id: 'room-the-garry',
      _type: 'room',
      name: 'The Garry',
      slug: slug('the-garry'),
      type: 'Deluxe',
      description: 'A generous first-floor double overlooking the walled garden. The bed faces the window deliberately — mornings here are the argument for the room. Bathroom in honed marble with both bath and shower.',
      heroImage: imgs.room3,
      gallery: [imgs.room3, imgs.bath, imgs.garden, imgs.room4].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 340, sqm: 38, occupancy: 2,
      floor: 'First floor',
      view: 'East, over the walled garden',
      amenities: ['King bed', 'Bath and walk-in shower', 'Window seat', 'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking'],
      featured: true, active: true,
    },
    {
      _id: 'room-the-tummel',
      _type: 'room',
      name: 'The Tummel',
      slug: slug('the-tummel'),
      type: 'Deluxe',
      description: 'Second floor, river side. Sloped ceilings, a deep window with a view of the water, and the quietest corridor in the house. Popular with returning guests who book it by name.',
      heroImage: imgs.room4,
      gallery: [imgs.room4, imgs.room5, imgs.bath, imgs.loch].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 320, sqm: 36, occupancy: 2,
      floor: 'Second floor',
      view: 'North, over the river',
      amenities: ['King bed', 'Walk-in shower', 'Window seat', 'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking'],
      active: true,
    },
    {
      _id: 'room-the-birnam',
      _type: 'room',
      name: 'The Birnam',
      slug: slug('the-birnam'),
      type: 'Classic',
      description: 'A ground-floor double off the garden corridor, with its own door to the courtyard — the room to take if you travel with a dog or simply prefer to slip out early. Compact, warm, and quietly handsome.',
      heroImage: imgs.room5,
      gallery: [imgs.room5, imgs.room6, imgs.bath, imgs.fire].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 240, sqm: 26, occupancy: 2,
      floor: 'Ground floor',
      view: 'Courtyard',
      amenities: ['King or twin beds', 'Walk-in shower', 'Direct courtyard access', 'Dog-friendly', 'Bramley toiletries', 'Tea tray with home baking'],
      active: true,
    },
    {
      _id: 'room-the-faskally',
      _type: 'room',
      name: 'The Faskally',
      slug: slug('the-faskally'),
      type: 'Classic',
      description: 'Tucked under the eaves on the second floor with a porthole view of the woodland. The smallest room in the house and, by some accounts, the best loved — all the comfort, none of the ceremony.',
      heroImage: imgs.room6,
      gallery: [imgs.room6, imgs.forest, imgs.bath, imgs.room5].filter(Boolean).map(i => ({ ...i, _key: key() })),
      rate: 255, sqm: 28, occupancy: 2,
      floor: 'Second floor',
      view: 'Woodland',
      amenities: ['King bed', 'Walk-in shower', 'Reading chair', 'Roberts radio', 'Bramley toiletries', 'Tea tray with home baking'],
      active: true,
    },
  ]

  for (const room of rooms) {
    const status = await create(room)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${room.name}`)
  }
}

async function importExperiences(imgs) {
  console.log('\n🎣  Experiences')

  const experiences = [
    {
      _id: 'exp-whisky-tasting',
      _type: 'experience',
      name: 'Private Whisky Tasting',
      slug: slug('private-whisky-tasting'),
      category: 'Food & Drink',
      description: 'An evening in the library with our keeper of the cellar: six drams, poured chronologically, from Lowland softness to the peat of the islands — finishing with the Craigmore estate blend, bottled for the house alone.',
      heroImage: imgs.whisky,
      duration: '2 hours',
      price: 'From £85 per person',
      seasons: ['Year round'],
      includes: ['Six guided drams', 'Estate blend tasting', 'Oatcakes and cheese from the pantry', 'Tasting notes to take home'],
    },
    {
      _id: 'exp-estate-walk',
      _type: 'experience',
      name: 'Highland Estate Walk',
      slug: slug('highland-estate-walk'),
      category: 'Outdoors',
      description: 'Four hundred acres, one ghillie, no agenda. Hamish has walked this ground for thirty years and will show you the heronry, the old shielings, and where the red deer cross at dusk. Boots provided if the weather turns.',
      heroImage: imgs.walk,
      duration: '3 hours',
      price: 'From £40 per person',
      seasons: ['Year round'],
      includes: ['Private ghillie guide', 'Estate boots and waterproofs', 'Hip flask and shortbread', 'Map of the routes for the rest of your stay'],
    },
    {
      _id: 'exp-fly-fishing',
      _type: 'experience',
      name: 'Fly Fishing on the Tay',
      slug: slug('fly-fishing-on-the-tay'),
      category: 'Outdoors',
      description: 'A full day on a private beat of the Tay with tuition pitched precisely to you — first cast or fortieth season. Salmon in spring and autumn, brown trout through the summer. Lunch comes down to the bank in a hamper.',
      heroImage: imgs.fishing,
      duration: 'Full day',
      price: 'From £180 per person',
      seasons: ['Spring', 'Summer', 'Autumn'],
      includes: ['Private beat and permits', 'All tackle and waders', 'Riverside hamper lunch', 'Your catch prepared by the kitchen'],
    },
    {
      _id: 'exp-wild-swimming',
      _type: 'experience',
      name: 'Wild Swimming & Sauna',
      slug: slug('wild-swimming-and-sauna'),
      category: 'Wellness',
      description: 'A short walk through the pines to the loch, a swim that will reorganise your priorities, and a wood-fired sauna on the shore to put them back. Towels, robes and hot chocolate at the jetty.',
      heroImage: imgs.loch,
      duration: '2 hours',
      price: 'From £60 per person',
      seasons: ['Year round'],
      includes: ['Guided swim with safety cover', 'Wood-fired lochside sauna', 'Robes, towels and changing hut', 'Hot chocolate or a dram at the jetty'],
    },
    {
      _id: 'exp-falconry',
      _type: 'experience',
      name: 'Falconry on the Lawn',
      slug: slug('falconry-on-the-lawn'),
      category: 'Heritage',
      description: 'An hour and a half with hawks and a falconer whose family has flown birds in this glen for four generations. The moment a Harris hawk first lands on your glove is not one you will forget.',
      heroImage: imgs.glen,
      duration: '90 minutes',
      price: 'From £95 per person',
      seasons: ['Year round'],
      includes: ['Private falconer', 'Hawk handling and flying', 'Gloves and equipment', 'Photographs of the session'],
    },
    {
      _id: 'exp-foraging',
      _type: 'experience',
      name: 'Foraging with the Chef',
      slug: slug('foraging-with-the-chef'),
      category: 'Food & Drink',
      description: 'A morning in the woods and hedgerows with our head chef, gathering whatever the season offers — chanterelles, wild garlic, elderflower, sloes — followed by lunch built around the basket you carried home.',
      heroImage: imgs.forest,
      duration: 'Half day',
      price: 'From £120 per person',
      seasons: ['Spring', 'Summer', 'Autumn'],
      includes: ['Foraging walk with the head chef', 'Basket and knife to use', 'Three-course lunch from your haul', 'Recipe cards to take home'],
    },
  ]

  for (const exp of experiences) {
    const status = await create(exp)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${exp.name}`)
  }
}

async function importOffers(imgs) {
  console.log('\n🎁  Offers')

  const offers = [
    {
      _id: 'offer-long-weekend',
      _type: 'offer',
      title: 'The Long Weekend',
      slug: slug('the-long-weekend'),
      subtitle: 'Three nights, properly taken',
      description: 'Arrive Friday, leave Monday, and let the house do the rest. Dinner on your first evening, a late checkout on your last morning, and the weekend left deliberately unplanned in between.',
      tag: 'Most popular',
      image: imgs.exterior,
      inclusions: ['Three nights bed & breakfast', 'Three-course dinner on arrival night', 'Late checkout until 1pm', 'Welcome dram on arrival'],
      type: 'Stay',
    },
    {
      _id: 'offer-winter-fire',
      _type: 'offer',
      title: 'Winter by the Fire',
      slug: slug('winter-by-the-fire'),
      subtitle: 'November to March',
      description: 'The house at its most persuasive: fires lit by breakfast, the glen dusted white, and the tasting menu at its richest. Two nights minimum, hot water bottles administered without irony.',
      tag: 'Seasonal',
      image: imgs.fire,
      inclusions: ['Two nights bed & breakfast', 'Six-course tasting menu one evening', 'Whisky nightcap by the library fire', '20% off spa and sauna experiences'],
      validFrom: '2026-11-01',
      validUntil: '2027-03-31',
      type: 'Seasonal',
    },
    {
      _id: 'offer-midweek',
      _type: 'offer',
      title: 'The Midweek Escape',
      slug: slug('midweek-escape'),
      subtitle: 'Sunday to Thursday',
      description: 'The hills do not know it is Tuesday. Fifteen percent off bed and breakfast stays midweek, when the house is at its quietest and the trails are yours alone.',
      tag: 'Best value',
      image: imgs.glen,
      inclusions: ['15% off bed & breakfast rates', 'Flexible cancellation to 48 hours', 'Complimentary estate walk map', 'Priority dinner reservations'],
      type: 'Stay',
    },
    {
      _id: 'offer-celebration',
      _type: 'offer',
      title: 'The Celebration Stay',
      slug: slug('celebration-stay'),
      subtitle: 'Mark it properly',
      description: 'Anniversaries, decades, escapes that needed an excuse. Champagne on ice when you arrive, flowers from the walled garden in the room, and an upgrade to the best available suite when the house allows.',
      tag: 'Occasions',
      image: imgs.room1,
      inclusions: ['Suite upgrade when available', 'Champagne and walled-garden flowers', 'Breakfast in bed, no judgement', 'Late checkout until 1pm'],
      type: 'Occasion',
    },
  ]

  for (const offer of offers) {
    const status = await create(offer)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${offer.title}`)
  }
}

async function importTestimonials() {
  console.log('\n💬  Testimonials')

  const testimonials = [
    {
      _id: 'testimonial-pemberton',
      _type: 'testimonial',
      guestName: 'A. & J. Pemberton',
      quote: 'We have stayed in grander hotels and slept worse in all of them. Craigmore understands the difference between luxury and fuss, and chooses correctly every single time.',
      rating: 5, roomStayed: 'The Atholl Suite', date: '2026-03-02', source: 'Guest book', featured: true,
    },
    {
      _id: 'testimonial-margaret',
      _type: 'testimonial',
      guestName: 'Margaret L.',
      quote: 'Dinner was the best I have eaten in Scotland, and I say that as someone who came principally for the fishing. The fishing, incidentally, was also the best I have had in Scotland.',
      rating: 5, roomStayed: 'The Tummel', date: '2026-05-18', source: 'Direct review', featured: true,
    },
    {
      _id: 'testimonial-okafor',
      _type: 'testimonial',
      guestName: 'The Okafor family',
      quote: 'Three generations, four days, zero complaints — a family first. The staff remembered everyone\'s name by breakfast on day one, including the dog\'s.',
      rating: 5, roomStayed: 'The Birnam & The Garry', date: '2025-10-26', source: 'Guest book', featured: true,
    },
    {
      _id: 'testimonial-whitfield',
      _type: 'testimonial',
      guestName: 'D. Whitfield',
      quote: 'I came for two nights to finish a book and stayed five. The library fire, the silence, and the woman who kept appearing with exactly the right pot of tea are jointly responsible.',
      rating: 5, roomStayed: 'The Faskally', date: '2026-02-09', source: 'Direct review', featured: true,
    },
    {
      _id: 'testimonial-maxwell',
      _type: 'testimonial',
      guestName: 'S. & R. Maxwell',
      quote: 'We were married on the south lawn in September. A year on, guests still bring it up unprompted. Flawless is an overused word; I am using it anyway.',
      rating: 5, roomStayed: 'The Schiehallion Suite', date: '2025-09-30', source: 'Guest book', featured: true,
    },
  ]

  for (const t of testimonials) {
    const status = await create(t)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${t.guestName}`)
  }
}

async function importJournal(imgs) {
  console.log('\n📰  Journal posts')

  const posts = [
    {
      _id: 'journal-walled-garden',
      _type: 'journalPost',
      title: 'A Year in the Walled Garden',
      slug: slug('a-year-in-the-walled-garden'),
      category: 'Garden',
      author: 'Tom Drummond',
      publishedAt: '2026-04-14',
      readingTime: '6 min read',
      excerpt: 'Our head gardener on frost, rhubarb, and the quiet politics of growing for a kitchen that wants everything a fortnight early.',
      heroImage: imgs.garden,
      featured: true,
      body: [
        block('The wall was built in 1847 to keep deer out and heat in, and it still does both better than anything we could buy. Inside it, a year moves differently. January is paper — seed orders, grudges from last season, optimism in catalogue form. By February the rhubarb is up under its forcing pots, pale and indecently pink, and the kitchen starts telephoning.'),
        block('What the kitchen wants', 'h2'),
        block('Chefs, in my experience, believe vegetables are a scheduling problem. Calum is better than most, but even he asks for courgette flowers in May. The garden answers to the glen, not the menu, and the glen runs a fortnight behind the rest of Scotland and a month behind London. The negotiation is the job.'),
        block('We grow what the ground does well: brassicas that shrug at frost, potatoes in seven varieties, gooseberries on the south wall, and herbs in quantities that would look like madness anywhere else. Everything walks to the kitchen. Nothing sees a van.'),
        block('The quiet months', 'h2'),
        block('Guests ask what we do in winter. The honest answer is: prune, plan, and drink tea in the potting shed while the robin supervises. The garden is never finished and never empty. That is rather the point of it.'),
        block('If you are staying with us, the garden gate is never locked. Come in, walk the paths, take a gooseberry if the season allows. Just close the gate — the wall keeps the deer out, but only if we help it.', 'blockquote'),
      ],
    },
    {
      _id: 'journal-quiet-season',
      _type: 'journalPost',
      title: 'The Quiet Season: Why Winter Suits Perthshire',
      slug: slug('the-quiet-season'),
      category: 'The Glen',
      author: 'Eleanor Brodie',
      publishedAt: '2026-01-20',
      readingTime: '5 min read',
      excerpt: 'The case for coming when everyone else has gone home: short days, long dinners, and a glen that keeps its best light for the patient.',
      heroImage: imgs.fire,
      featured: true,
      body: [
        block('There is a fortnight in deep winter when the sun never quite clears the ridge, and the whole glen sits in a kind of blue half-light from ten until three. Most hotels would apologise for it. We would argue it is the best thing we offer.'),
        block('Winter compresses the day into something honest. You walk in the morning because the light is leaving. You are back by the fire at four because there is nowhere better to be. Dinner takes three hours because nobody can think of a reason it should not.'),
        block('What to actually do', 'h2'),
        block('The estate walk is at its best in hard frost — the bog freezes and routes open that are impassable all summer. The sauna by the loch becomes a conviction rather than a novelty. And the kitchen, freed from the tyranny of summer lightness, cooks the way this country has always wanted to be cooked: slowly, richly, with gravity.'),
        block('Come in February. Bring boots and a book. Leave the rest to the house.'),
      ],
    },
    {
      _id: 'journal-glen-ericht',
      _type: 'journalPost',
      title: 'Meet the Maker: Glen Ericht Distillery',
      slug: slug('meet-the-maker-glen-ericht'),
      category: 'Provenance',
      author: 'Calum Ross',
      publishedAt: '2025-11-08',
      readingTime: '4 min read',
      excerpt: 'Ten minutes up the glen road is a nine-person distillery making whisky the way it was always supposed to be made. We went to see how they do it.',
      heroImage: imgs.whisky,
      featured: true,
      body: [
        block('The still house smells of warm copper and something older — the particular sweetness of barley giving itself up to water and time. Glen Ericht have been at this for eleven years on a site that was a sawmill for a century before that. The team is nine people. The output is seventeen thousand litres a year. By any measure of the industry, this is very small. By any measure of quality, it is not.'),
        block('The estate blend', 'h2'),
        block('Three years ago, I drove up with a proposal: could we work together on a whisky for the house? Something that reflected the glen, the kitchen, the particular kind of evening we try to create. What came back, eighteen months later, was a single malt finished in Oloroso sherry casks, with enough peat to know where it came from and enough fruit to make it welcome before dinner.'),
        block('It sits in every room now, in a decanter with the estate seal. Guests finish it. We take that as the review.'),
        block('You can visit Glen Ericht through the house — tours run on request and are arranged by the desk. I would suggest going late afternoon, when the light comes through the still house windows at an angle that makes everything look, briefly, like it is made of gold. Which, in a sense, it is.'),
      ],
    },
    {
      _id: 'journal-six-walks',
      _type: 'journalPost',
      title: 'Six Walks from the Front Door',
      slug: slug('six-walks-from-the-front-door'),
      category: 'The Glen',
      author: 'Hamish Begg',
      publishedAt: '2025-09-15',
      readingTime: '7 min read',
      excerpt: 'The estate ghillie on the six walks that leave from our front steps — from forty minutes to a full day, with notes on what to look for and when.',
      heroImage: imgs.walk,
      featured: true,
      body: [
        block('I have been walking this ground for thirty years and I am still finding things. A shieling I did not know about. A view that only opens in winter. An otter slide on the burn that was not there last season. The estate does not hold still; it is simply large enough that you have to keep looking.'),
        block('One: The River Circuit', 'h2'),
        block('An hour, flat, impossible to lose. Down the lime avenue, along the Tay to the old ford, back through the oak wood. Herons guaranteed; otters if you are quiet and lucky.'),
        block('Two: The Walled Garden Loop', 'h2'),
        block('Forty minutes through the policies — the old ornamental grounds — taking in the garden, the icehouse, and the folly the fourth laird built to annoy his brother. Good with a coffee from the hall table.'),
        block('Three to Five: The Hill Tracks', 'h2'),
        block('Three routes climb out of the glen on old stalkers\' paths: the Shieling Track (two hours), the Crag (three, steep, worth it), and the March Wall (four, big views, take lunch). Ask at the desk and we will mark the day\'s best choice on a map — wind decides.'),
        block('Six: The Ridge', 'h2'),
        block('A full day, proper boots, packed lunch from the kitchen. The whole glen at your feet and, on a clear day, Schiehallion looking close enough to touch. I have done it some four hundred times. It has not once been the same walk twice.'),
      ],
    },
  ]

  for (const post of posts) {
    const status = await create(post)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${post.title}`)
  }
}

async function importTeam(imgs) {
  console.log('\n👥  Team')

  const team = [
    {
      _id: 'team-eleanor',
      _type: 'teamMember',
      name: 'Eleanor Brodie',
      role: 'General Manager',
      bio: 'Twenty years in country house hotels on both sides of the border, and a firm belief that the best service is the kind you only notice afterwards. Keeper of the guest book and its secrets.',
      headshot: imgs.portrait2,
      department: 'Management',
      displayOrder: 1,
    },
    {
      _id: 'team-calum',
      _type: 'teamMember',
      name: 'Calum Ross',
      role: 'Head Chef',
      bio: 'Perthshire born, trained in Edinburgh and Lyon, returned on the understanding that the larder would be the glen itself. Cooks what the estate, the river and the walled garden hand him.',
      headshot: imgs.portrait3,
      department: 'Kitchen',
      displayOrder: 2,
    },
    {
      _id: 'team-isla',
      _type: 'teamMember',
      name: 'Isla McAllister',
      role: 'Front of House Manager',
      bio: 'The first voice most guests hear and the reason most of them come back. Knows every train time, every walk, and every guest\'s usual table by their second visit.',
      headshot: imgs.portrait4,
      department: 'Front of House',
      displayOrder: 3,
    },
    {
      _id: 'team-tom',
      _type: 'teamMember',
      name: 'Tom Drummond',
      role: 'Head Gardener',
      bio: 'Custodian of the 1847 walled garden and its seven varieties of potato. Negotiates daily with the kitchen and, by his own account, usually wins.',
      headshot: imgs.portrait5,
      department: 'Estate',
      displayOrder: 4,
    },
    {
      _id: 'team-hamish',
      _type: 'teamMember',
      name: 'Hamish Begg',
      role: 'Estate Ghillie',
      bio: 'Thirty years on this ground. Guide to the hill tracks, keeper of the beats, and the only member of staff with a standing excuse to be late: the river wanted watching.',
      headshot: imgs.portrait1,
      department: 'Estate',
      displayOrder: 5,
    },
    {
      _id: 'team-marie',
      _type: 'teamMember',
      name: 'Marie Laurent',
      role: 'Head of Housekeeping',
      bio: 'Runs the quietest department in the house to the highest standard in it. Believes a properly made bed is a moral position, and makes a persuasive case nightly.',
      headshot: imgs.portrait6,
      department: 'Housekeeping',
      displayOrder: 6,
    },
  ]

  for (const member of team) {
    const status = await create(member)
    console.log(`  ${status === 'created' ? '✓' : '↺'} ${member.name}`)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🏰  Craigmore House — Sanity Import`)
  console.log(`    Project: ${PROJECT_ID} / ${DATASET}\n`)

  console.log('📸  Uploading images (this takes a minute)...')
  const imgs = {}
  for (const [name, url] of Object.entries(URLS)) {
    imgs[name] = await uploadImage(url, name)
  }

  await importRooms(imgs)
  await importExperiences(imgs)
  await importOffers(imgs)
  await importTestimonials()
  await importJournal(imgs)
  await importTeam(imgs)

  console.log('\n✅  Import complete! Refresh your Studio and the site to see the content.\n')
}

main().catch((err) => {
  console.error('\n❌ ', err.message)
  process.exit(1)
})