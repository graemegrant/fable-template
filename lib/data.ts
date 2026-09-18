/**
 * lib/data.ts — static fallback content.
 * The site builds and runs entirely from this file when no Sanity project
 * is configured. All imagery is Unsplash placeholder, swapped via the CMS.
 *
 * Translatable fields use the LocaleField shape ({ en, fr, de, es }), via
 * the t4() helper below. This is template demo copy, not a real client's
 * marketing content — AGENTS.md §9's rule against machine-translating a
 * real client's prose doesn't apply here; every locale is fully written
 * out (not machine-translated placeholder text) so the template reads
 * correctly in fr/de/es out of the box for prospective clients evaluating
 * the multilingual template. A real client repo replaces this file
 * entirely with the client's own copy — translate only the locales that
 * client actually has real copy for; pickLocale() falls back to the
 * default locale for the rest, same as always.
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
/** Builds a fully-translated LocaleField across all four shipped locales. */
const t4 = (en: string, fr: string, de: string, es: string): LocaleField => ({ en, fr, de, es });

export const rooms: RoomI18n[] = [
  {
    // Craigmore is the "named-room" edge case (SANITY-SCHEMA.md): every
    // room is genuinely one-of-a-kind, so its proper name goes directly
    // in roomType rather than a shared category — roomCount stays 1.
    roomType: t4('The Schiehallion Suite', 'La Suite Schiehallion', 'Die Schiehallion-Suite', 'La Suite Schiehallion'),
    slug: 'schiehallion-suite',
    roomCount: 1,
    description: t4(
      'The principal suite, occupying the south-west corner of the second floor. A separate sitting room with open fire, a bedroom hung with estate maps, and a bathroom built around a cast-iron bath that looks straight down the glen. On a clear evening you can watch the light leave Schiehallion without lifting your head from the pillow.',
      'La suite principale, à l’angle sud-ouest du deuxième étage. Un salon indépendant avec feu de cheminée, une chambre ornée de cartes du domaine, et une salle de bain organisée autour d’une baignoire en fonte qui donne directement sur le glen. Par une soirée claire, vous pouvez regarder la lumière quitter le Schiehallion sans lever la tête de l’oreiller.',
      'Die Hauptsuite in der Südwestecke des zweiten Stocks. Ein separates Wohnzimmer mit offenem Kamin, ein Schlafzimmer mit historischen Landkarten des Anwesens und ein Badezimmer um eine gusseiserne Wanne herum, die direkt ins Tal blickt. An einem klaren Abend können Sie beobachten, wie das Licht den Schiehallion verlässt, ohne den Kopf vom Kissen zu heben.',
      'La suite principal, en la esquina suroeste de la segunda planta. Un salón independiente con chimenea, un dormitorio decorado con mapas de la finca y un baño construido en torno a una bañera de hierro fundido con vistas directas al valle. En una tarde despejada, puede ver cómo la luz abandona el Schiehallion sin levantar la cabeza de la almohada.',
    ),
    heroImage: IMG.room1,
    gallery: [IMG.room1, IMG.bath, IMG.room2, IMG.glen],
    rate: 595,
    sqm: 64,
    occupancy: 3,
    floor: 'Second floor',
    view: 'West, over the loch to Schiehallion',
    amenities: [
      t4('Super-king bed', 'Lit super king', 'Super-King-Size-Bett', 'Cama super king'),
      t4('Separate sitting room with open fire', 'Salon indépendant avec feu de cheminée', 'Separates Wohnzimmer mit offenem Kamin', 'Salón independiente con chimenea'),
      t4('Cast-iron roll-top bath', 'Baignoire à pieds en fonte', 'Freistehende gusseiserne Badewanne', 'Bañera exenta de hierro fundido'),
      t4('Walk-in shower', 'Douche à l’italienne', 'Begehbare Dusche', 'Ducha a ras de suelo'),
      t4('Estate-blend whisky decanter', 'Carafe de whisky de l’assemblage du domaine', 'Karaffe mit hauseigenem Whisky-Verschnitt', 'Decantador de whisky de la mezcla de la finca'),
      t4('Roberts radio', 'Radio Roberts', 'Roberts-Radio', 'Radio Roberts'),
      t4('Bramley toiletries', 'Produits de toilette Bramley', 'Bramley-Pflegeprodukte', 'Productos de baño Bramley'),
      t4('Daily pressed linen', 'Linge repassé quotidiennement', 'Täglich gebügelte Bettwäsche', 'Ropa de cama planchada a diario'),
      t4('Tea tray with home baking', 'Plateau de thé et pâtisseries maison', 'Teetablett mit hausgebackenem Gebäck', 'Bandeja de té con repostería casera'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: t4('The Atholl Suite', 'La Suite Atholl', 'Die Atholl-Suite', 'La Suite Atholl'),
    slug: 'atholl-suite',
    roomCount: 1,
    description: t4(
      'A first-floor suite over the south lawn, with the longest view in the house — down the avenue of limes to the river. Panelled walls, a writing desk that guests tend to photograph, and a dressing room that makes a week-long stay feel sensible.',
      'Une suite au premier étage donnant sur la pelouse sud, avec la plus belle vue de la maison — le long de l’allée de tilleuls jusqu’à la rivière. Murs lambrissés, un bureau que les hôtes ont tendance à photographier, et un dressing qui rend un séjour d’une semaine tout à fait raisonnable.',
      'Eine Suite im ersten Stock mit Blick auf den südlichen Rasen und der weitesten Aussicht im Haus — die Lindenallee hinunter bis zum Fluss. Getäfelte Wände, ein Schreibtisch, den Gäste gerne fotografieren, und ein Ankleidezimmer, das einen einwöchigen Aufenthalt durchaus vernünftig erscheinen lässt.',
      'Una suite en la primera planta con vistas al jardín sur, con las vistas más largas de la casa: la avenida de tilos hasta el río. Paredes revestidas de madera, un escritorio que los huéspedes suelen fotografiar y un vestidor que hace que una semana de estancia parezca de lo más sensato.',
    ),
    heroImage: IMG.room2,
    gallery: [IMG.room2, IMG.room3, IMG.bath, IMG.garden],
    rate: 495,
    sqm: 58,
    occupancy: 2,
    floor: 'First floor',
    view: 'South, over the lawn to the Tay valley',
    amenities: [
      t4('Super-king bed', 'Lit super king', 'Super-King-Size-Bett', 'Cama super king'),
      t4('Dressing room', 'Dressing', 'Ankleidezimmer', 'Vestidor'),
      t4('Roll-top bath and walk-in shower', 'Baignoire à pieds et douche à l’italienne', 'Freistehende Badewanne und begehbare Dusche', 'Bañera exenta y ducha a ras de suelo'),
      t4('Writing desk', 'Bureau', 'Schreibtisch', 'Escritorio'),
      t4('Open fire', 'Feu de cheminée', 'Offener Kamin', 'Chimenea'),
      t4('Estate-blend whisky decanter', 'Carafe de whisky de l’assemblage du domaine', 'Karaffe mit hauseigenem Whisky-Verschnitt', 'Decantador de whisky de la mezcla de la finca'),
      t4('Bramley toiletries', 'Produits de toilette Bramley', 'Bramley-Pflegeprodukte', 'Productos de baño Bramley'),
      t4('Tea tray with home baking', 'Plateau de thé et pâtisseries maison', 'Teetablett mit hausgebackenem Gebäck', 'Bandeja de té con repostería casera'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: t4('The Garry', 'La Garry', 'Das Garry-Zimmer', 'La Garry'),
    slug: 'the-garry',
    roomCount: 1,
    description: t4(
      'A generous first-floor double overlooking the walled garden. The bed faces the window deliberately — mornings here are the argument for the room. Bathroom in honed marble with both bath and shower.',
      'Une chambre double spacieuse au premier étage, avec vue sur le jardin clos. Le lit fait face à la fenêtre, à dessein — les matins ici sont le meilleur argument en faveur de la chambre. Salle de bain en marbre adouci avec baignoire et douche.',
      'Ein großzügiges Doppelzimmer im ersten Stock mit Blick auf den ummauerten Garten. Das Bett ist bewusst zum Fenster ausgerichtet — die Morgen hier sind das beste Argument für dieses Zimmer. Badezimmer aus geschliffenem Marmor mit Badewanne und Dusche.',
      'Una amplia habitación doble en la primera planta con vistas al jardín amurallado. La cama está orientada deliberadamente hacia la ventana: las mañanas aquí son el mejor argumento a favor de la habitación. Baño de mármol pulido con bañera y ducha.',
    ),
    heroImage: IMG.room3,
    gallery: [IMG.room3, IMG.bath, IMG.garden, IMG.room4],
    rate: 340,
    sqm: 38,
    occupancy: 2,
    floor: 'First floor',
    view: 'East, over the walled garden',
    amenities: [
      t4('King bed', 'Lit king', 'King-Size-Bett', 'Cama king'),
      t4('Bath and walk-in shower', 'Baignoire et douche à l’italienne', 'Badewanne und begehbare Dusche', 'Bañera y ducha a ras de suelo'),
      t4('Window seat', 'Banquette sous fenêtre', 'Fensterbank-Sitzecke', 'Asiento en la ventana'),
      t4('Roberts radio', 'Radio Roberts', 'Roberts-Radio', 'Radio Roberts'),
      t4('Bramley toiletries', 'Produits de toilette Bramley', 'Bramley-Pflegeprodukte', 'Productos de baño Bramley'),
      t4('Tea tray with home baking', 'Plateau de thé et pâtisseries maison', 'Teetablett mit hausgebackenem Gebäck', 'Bandeja de té con repostería casera'),
    ],
    featured: true,
    active: true,
  },
  {
    roomType: t4('The Tummel', 'La Tummel', 'Das Tummel-Zimmer', 'La Tummel'),
    slug: 'the-tummel',
    roomCount: 1,
    description: t4(
      'Second floor, river side. Sloped ceilings, a deep window with a view of the water, and the quietest corridor in the house. Popular with returning guests who book it by name.',
      'Deuxième étage, côté rivière. Plafonds mansardés, une fenêtre profonde avec vue sur l’eau, et le couloir le plus silencieux de la maison. Très prisée des hôtes fidèles qui la réservent nommément.',
      'Zweiter Stock, zur Flussseite. Schräge Decken, ein tiefes Fenster mit Blick aufs Wasser und der ruhigste Flur im Haus. Beliebt bei Stammgästen, die es namentlich buchen.',
      'Segunda planta, lado del río. Techos abuhardillados, una ventana profunda con vistas al agua y el pasillo más silencioso de la casa. Muy solicitada por los huéspedes habituales, que la reservan por su nombre.',
    ),
    heroImage: IMG.room4,
    gallery: [IMG.room4, IMG.room5, IMG.bath, IMG.loch],
    rate: 320,
    sqm: 36,
    occupancy: 2,
    floor: 'Second floor',
    view: 'North, over the river',
    amenities: [
      t4('King bed', 'Lit king', 'King-Size-Bett', 'Cama king'),
      t4('Walk-in shower', 'Douche à l’italienne', 'Begehbare Dusche', 'Ducha a ras de suelo'),
      t4('Window seat', 'Banquette sous fenêtre', 'Fensterbank-Sitzecke', 'Asiento en la ventana'),
      t4('Roberts radio', 'Radio Roberts', 'Roberts-Radio', 'Radio Roberts'),
      t4('Bramley toiletries', 'Produits de toilette Bramley', 'Bramley-Pflegeprodukte', 'Productos de baño Bramley'),
      t4('Tea tray with home baking', 'Plateau de thé et pâtisseries maison', 'Teetablett mit hausgebackenem Gebäck', 'Bandeja de té con repostería casera'),
    ],
    active: true,
  },
  {
    roomType: t4('The Birnam', 'La Birnam', 'Das Birnam-Zimmer', 'La Birnam'),
    slug: 'the-birnam',
    roomCount: 1,
    description: t4(
      'A ground-floor double off the garden corridor, with its own door to the courtyard — the room to take if you travel with a dog or simply prefer to slip out early. Compact, warm, and quietly handsome.',
      'Une chambre double au rez-de-chaussée, donnant sur le couloir du jardin, avec sa propre porte sur la cour — la chambre à choisir si vous voyagez avec un chien ou préférez simplement sortir tôt sans déranger. Compacte, chaleureuse et discrètement élégante.',
      'Ein Doppelzimmer im Erdgeschoss am Gartenkorridor mit eigener Tür zum Innenhof — das richtige Zimmer, wenn Sie mit Hund reisen oder einfach gerne früh und unauffällig aufbrechen. Kompakt, warm und von stiller Eleganz.',
      'Una habitación doble en la planta baja junto al pasillo del jardín, con puerta propia al patio: la habitación ideal si viaja con perro o simplemente prefiere salir temprano sin llamar la atención. Compacta, cálida y de una elegancia discreta.',
    ),
    heroImage: IMG.room5,
    gallery: [IMG.room5, IMG.room6, IMG.bath, IMG.fire],
    rate: 240,
    sqm: 26,
    occupancy: 2,
    floor: 'Ground floor',
    view: 'Courtyard',
    amenities: [
      t4('King or twin beds', 'Lit king ou lits jumeaux', 'King-Size- oder Einzelbetten', 'Cama king o camas gemelas'),
      t4('Walk-in shower', 'Douche à l’italienne', 'Begehbare Dusche', 'Ducha a ras de suelo'),
      t4('Direct courtyard access', 'Accès direct à la cour', 'Direkter Zugang zum Innenhof', 'Acceso directo al patio'),
      t4('Dog-friendly', 'Chiens acceptés', 'Hundefreundlich', 'Admite perros'),
      t4('Bramley toiletries', 'Produits de toilette Bramley', 'Bramley-Pflegeprodukte', 'Productos de baño Bramley'),
      t4('Tea tray with home baking', 'Plateau de thé et pâtisseries maison', 'Teetablett mit hausgebackenem Gebäck', 'Bandeja de té con repostería casera'),
    ],
    active: true,
  },
  {
    roomType: t4('The Faskally', 'La Faskally', 'Das Faskally-Zimmer', 'La Faskally'),
    slug: 'the-faskally',
    roomCount: 1,
    description: t4(
      'Tucked under the eaves on the second floor with a porthole view of the woodland. The smallest room in the house and, by some accounts, the best loved — all the comfort, none of the ceremony.',
      'Nichée sous les combles au deuxième étage, avec une vue en hublot sur les bois. La plus petite chambre de la maison et, selon certains, la plus aimée — tout le confort, sans la moindre cérémonie.',
      'Unter dem Dach im zweiten Stock gelegen, mit einem bullaugenartigen Blick auf den Wald. Das kleinste Zimmer im Haus und, manchen zufolge, das beliebteste — aller Komfort, ganz ohne Förmlichkeit.',
      'Escondida bajo el tejado en la segunda planta, con una vista tipo ojo de buey sobre el bosque. La habitación más pequeña de la casa y, según algunos, la más querida: toda la comodidad, sin ceremonias.',
    ),
    heroImage: IMG.room6,
    gallery: [IMG.room6, IMG.forest, IMG.bath, IMG.room5],
    rate: 255,
    sqm: 28,
    occupancy: 2,
    floor: 'Second floor',
    view: 'Woodland',
    amenities: [
      t4('King bed', 'Lit king', 'King-Size-Bett', 'Cama king'),
      t4('Walk-in shower', 'Douche à l’italienne', 'Begehbare Dusche', 'Ducha a ras de suelo'),
      t4('Reading chair', 'Fauteuil de lecture', 'Lesesessel', 'Sillón de lectura'),
      t4('Roberts radio', 'Radio Roberts', 'Roberts-Radio', 'Radio Roberts'),
      t4('Bramley toiletries', 'Produits de toilette Bramley', 'Bramley-Pflegeprodukte', 'Productos de baño Bramley'),
      t4('Tea tray with home baking', 'Plateau de thé et pâtisseries maison', 'Teetablett mit hausgebackenem Gebäck', 'Bandeja de té con repostería casera'),
    ],
    active: true,
  },
];

export const experiences: ExperienceI18n[] = [
  {
    name: t4('Private Whisky Tasting', 'Dégustation de whisky privée', 'Private Whisky-Verkostung', 'Cata privada de whisky'),
    slug: 'private-whisky-tasting',
    category: 'Food & Drink',
    description: t4(
      'An evening in the library with our keeper of the cellar: six drams, poured chronologically, from Lowland softness to the peat of the islands — finishing with the Craigmore estate blend, bottled for the house alone.',
      'Une soirée à la bibliothèque avec notre maître de chai : six drams, servis dans l’ordre chronologique, de la douceur des Lowlands à la tourbe des îles — pour finir avec l’assemblage du domaine de Craigmore, mis en bouteille pour la seule maison.',
      'Ein Abend in der Bibliothek mit unserem Kellermeister: sechs Drams, chronologisch serviert, von der Sanftheit der Lowlands bis zum Torf der Inseln — zum Abschluss der Craigmore-Hausverschnitt, exklusiv für das Haus abgefüllt.',
      'Una velada en la biblioteca con nuestro maestro de bodega: seis drams, servidos en orden cronológico, desde la suavidad de las Lowlands hasta la turba de las islas, terminando con la mezcla de la finca Craigmore, embotellada exclusivamente para la casa.',
    ),
    heroImage: IMG.whisky,
    duration: t4('2 hours', '2 heures', '2 Stunden', '2 horas'),
    price: t4('From £85 per person', 'À partir de 85 £ par personne', 'Ab 85 £ pro Person', 'Desde 85 £ por persona'),
    seasons: ['Year round'],
    includes: [
      t4('Six guided drams', 'Six drams commentés', 'Sechs geführte Drams', 'Seis drams guiados'),
      t4('Estate blend tasting', 'Dégustation de l’assemblage du domaine', 'Verkostung des Hausverschnitts', 'Cata de la mezcla de la finca'),
      t4('Oatcakes and cheese from the pantry', 'Galettes d’avoine et fromages du garde-manger', 'Haferkekse und Käse aus der Vorratskammer', 'Galletas de avena y quesos de la despensa'),
      t4('Tasting notes to take home', 'Notes de dégustation à emporter', 'Verkostungsnotizen zum Mitnehmen', 'Notas de cata para llevar'),
    ],
  },
  {
    name: t4('Highland Estate Walk', 'Randonnée sur le domaine des Highlands', 'Wanderung durchs Hochland-Anwesen', 'Paseo por la finca de las Highlands'),
    slug: 'highland-estate-walk',
    category: 'Outdoors',
    description: t4(
      'Four hundred acres, one ghillie, no agenda. Hamish has walked this ground for thirty years and will show you the heronry, the old shielings, and where the red deer cross at dusk. Boots provided if the weather turns.',
      'Quatre cents acres, un garde-chasse, aucun programme. Hamish arpente ce terrain depuis trente ans et vous montrera la héronnière, les anciennes bergeries, et l’endroit où les cerfs traversent au crépuscule. Bottes fournies si le temps tourne.',
      'Vierhundert Morgen, ein Wildhüter, kein Programm. Hamish geht seit dreißig Jahren über dieses Land und zeigt Ihnen die Reiherkolonie, die alten Sennhütten und die Stelle, an der die Rothirsche in der Dämmerung queren. Gummistiefel werden bei Wetterumschwung gestellt.',
      'Cuatrocientos acres, un guarda de caza, sin planes fijos. Hamish lleva treinta años recorriendo estas tierras y le mostrará la colonia de garzas, las antiguas majadas y el lugar donde los ciervos cruzan al atardecer. Se proporcionan botas si el tiempo cambia.',
    ),
    heroImage: IMG.walk,
    duration: t4('3 hours', '3 heures', '3 Stunden', '3 horas'),
    price: t4('From £40 per person', 'À partir de 40 £ par personne', 'Ab 40 £ pro Person', 'Desde 40 £ por persona'),
    seasons: ['Year round'],
    includes: [
      t4('Private ghillie guide', 'Guide privé (garde-chasse)', 'Privater Wildhüter als Guide', 'Guía privado (guarda de caza)'),
      t4('Estate boots and waterproofs', 'Bottes et vêtements imperméables du domaine', 'Gummistiefel und Regenkleidung des Anwesens', 'Botas y ropa impermeable de la finca'),
      t4('Hip flask and shortbread', 'Flasque et shortbread', 'Flachmann und Shortbread', 'Petaca y shortbread'),
      t4('Map of the routes for the rest of your stay', 'Carte des itinéraires pour le reste de votre séjour', 'Wanderkarte für den Rest Ihres Aufenthalts', 'Mapa de rutas para el resto de su estancia'),
    ],
  },
  {
    name: t4('Fly Fishing on the Tay', 'Pêche à la mouche sur la Tay', 'Fliegenfischen am Tay', 'Pesca con mosca en el Tay'),
    slug: 'fly-fishing-on-the-tay',
    category: 'Outdoors',
    description: t4(
      'A full day on a private beat of the Tay with tuition pitched precisely to you — first cast or fortieth season. Salmon in spring and autumn, brown trout through the summer. Lunch comes down to the bank in a hamper.',
      'Une journée complète sur un parcours privé de la Tay, avec un enseignement ajusté précisément à votre niveau — premier lancer ou quarantième saison. Saumon au printemps et en automne, truite fario tout l’été. Le déjeuner est apporté sur la berge dans un panier.',
      'Ein ganzer Tag an einem privaten Fischereiabschnitt des Tay, mit Unterricht, der genau auf Sie zugeschnitten ist — erster Wurf oder vierzigste Saison. Lachs im Frühling und Herbst, Bachforelle den ganzen Sommer über. Das Mittagessen kommt in einem Picknickkorb ans Ufer.',
      'Un día completo en un tramo privado del río Tay, con enseñanza adaptada exactamente a su nivel: primer lance o cuadragésima temporada. Salmón en primavera y otoño, trucha marrón durante el verano. El almuerzo se sirve junto a la orilla en una cesta.',
    ),
    heroImage: IMG.fishing,
    duration: t4('Full day', 'Journée complète', 'Ganzer Tag', 'Día completo'),
    price: t4('From £180 per person', 'À partir de 180 £ par personne', 'Ab 180 £ pro Person', 'Desde 180 £ por persona'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [
      t4('Private beat and permits', 'Parcours privé et permis', 'Privater Fischereiabschnitt und Erlaubnisscheine', 'Tramo privado y permisos'),
      t4('All tackle and waders', 'Tout le matériel et cuissardes', 'Komplette Ausrüstung und Watstiefel', 'Todo el equipo y botas de vadeo'),
      t4('Riverside hamper lunch', 'Déjeuner en panier au bord de l’eau', 'Picknickkorb-Mittagessen am Flussufer', 'Almuerzo en cesta junto al río'),
      t4('Your catch prepared by the kitchen', 'Votre prise préparée par la cuisine', 'Ihr Fang, zubereitet von der Küche', 'Su captura preparada por la cocina'),
    ],
  },
  {
    name: t4('Wild Swimming & Sauna', 'Baignade sauvage et sauna', 'Wildschwimmen & Sauna', 'Baño salvaje y sauna'),
    slug: 'wild-swimming-and-sauna',
    category: 'Wellness',
    description: t4(
      'A short walk through the pines to the loch, a swim that will reorganise your priorities, and a wood-fired sauna on the shore to put them back. Towels, robes and hot chocolate at the jetty.',
      'Une courte marche à travers les pins jusqu’au loch, une baignade qui bouleversera vos priorités, et un sauna au bois sur la rive pour les remettre en ordre. Serviettes, peignoirs et chocolat chaud sur le ponton.',
      'Ein kurzer Spaziergang durch die Kiefern zum Loch, ein Bad, das Ihre Prioritäten neu ordnet, und eine holzbefeuerte Sauna am Ufer, um sie wieder zurechtzurücken. Handtücher, Bademäntel und heiße Schokolade am Steg.',
      'Un breve paseo entre pinos hasta el lago, un baño que reordenará sus prioridades, y una sauna de leña en la orilla para volver a ponerlas en su sitio. Toallas, albornoces y chocolate caliente en el embarcadero.',
    ),
    heroImage: IMG.loch,
    duration: t4('2 hours', '2 heures', '2 Stunden', '2 horas'),
    price: t4('From £60 per person', 'À partir de 60 £ par personne', 'Ab 60 £ pro Person', 'Desde 60 £ por persona'),
    seasons: ['Year round'],
    includes: [
      t4('Guided swim with safety cover', 'Baignade encadrée avec surveillance', 'Begleitetes Schwimmen mit Sicherheitsaufsicht', 'Baño guiado con cobertura de seguridad'),
      t4('Wood-fired lochside sauna', 'Sauna au bois au bord du loch', 'Holzbefeuerte Sauna am Loch', 'Sauna de leña junto al lago'),
      t4('Robes, towels and changing hut', 'Peignoirs, serviettes et cabine de change', 'Bademäntel, Handtücher und Umkleidehütte', 'Albornoces, toallas y caseta de cambio'),
      t4('Hot chocolate or a dram at the jetty', 'Chocolat chaud ou dram sur le ponton', 'Heiße Schokolade oder ein Dram am Steg', 'Chocolate caliente o un dram en el embarcadero'),
    ],
  },
  {
    name: t4('Falconry on the Lawn', 'Fauconnerie sur la pelouse', 'Falknerei auf dem Rasen', 'Cetrería en el jardín'),
    slug: 'falconry-on-the-lawn',
    category: 'Heritage',
    description: t4(
      'An hour and a half with hawks and a falconer whose family has flown birds in this glen for four generations. The moment a Harris hawk first lands on your glove is not one you will forget.',
      'Une heure et demie avec des rapaces et un fauconnier dont la famille dresse des oiseaux dans ce glen depuis quatre générations. Le moment où une buse de Harris se pose pour la première fois sur votre gant ne s’oublie pas.',
      'Anderthalb Stunden mit Greifvögeln und einem Falkner, dessen Familie seit vier Generationen Vögel in diesem Tal fliegt. Der Moment, in dem ein Wüstenbussard zum ersten Mal auf Ihrem Handschuh landet, werden Sie nicht vergessen.',
      'Una hora y media con aves rapaces y un cetrero cuya familia lleva cuatro generaciones volando aves en este valle. El momento en que un busardo de Harris se posa por primera vez en su guante no se olvida.',
    ),
    heroImage: IMG.glen,
    duration: t4('90 minutes', '90 minutes', '90 Minuten', '90 minutos'),
    price: t4('From £95 per person', 'À partir de 95 £ par personne', 'Ab 95 £ pro Person', 'Desde 95 £ por persona'),
    seasons: ['Year round'],
    includes: [
      t4('Private falconer', 'Fauconnier privé', 'Privater Falkner', 'Cetrero privado'),
      t4('Hawk handling and flying', 'Manipulation et vol des rapaces', 'Umgang mit und Flug der Greifvögel', 'Manejo y vuelo de las aves'),
      t4('Gloves and equipment', 'Gants et équipement', 'Handschuhe und Ausrüstung', 'Guantes y equipo'),
      t4('Photographs of the session', 'Photographies de la session', 'Fotos der Session', 'Fotografías de la sesión'),
    ],
  },
  {
    name: t4('Foraging with the Chef', 'Cueillette sauvage avec le chef', 'Wildsammeln mit dem Küchenchef', 'Recolección silvestre con el chef'),
    slug: 'foraging-with-the-chef',
    category: 'Food & Drink',
    description: t4(
      'A morning in the woods and hedgerows with our head chef, gathering whatever the season offers — chanterelles, wild garlic, elderflower, sloes — followed by lunch built around the basket you carried home.',
      'Une matinée dans les bois et les haies avec notre chef, à récolter ce que la saison offre — girolles, ail des ours, fleurs de sureau, prunelles — suivie d’un déjeuner construit autour du panier rapporté.',
      'Ein Vormittag in Wald und Hecken mit unserem Küchenchef, beim Sammeln dessen, was die Saison bietet — Pfifferlinge, Bärlauch, Holunderblüten, Schlehen — gefolgt von einem Mittagessen, das ganz um Ihren mitgebrachten Korb herum entsteht.',
      'Una mañana en los bosques y setos con nuestro chef, recolectando lo que ofrezca la temporada: rebozuelos, ajo silvestre, flor de saúco, endrinas, seguida de un almuerzo elaborado en torno a la cesta recogida.',
    ),
    heroImage: IMG.forest,
    duration: t4('Half day', 'Demi-journée', 'Halber Tag', 'Medio día'),
    price: t4('From £120 per person', 'À partir de 120 £ par personne', 'Ab 120 £ pro Person', 'Desde 120 £ por persona'),
    seasons: ['Spring', 'Summer', 'Autumn'],
    includes: [
      t4('Foraging walk with the head chef', 'Marche de cueillette avec le chef', 'Sammelspaziergang mit dem Küchenchef', 'Paseo de recolección con el chef'),
      t4('Basket and knife to use', 'Panier et couteau fournis', 'Korb und Messer zur Nutzung', 'Cesta y cuchillo para usar'),
      t4('Three-course lunch from your haul', 'Déjeuner trois services à partir de votre récolte', 'Dreigängiges Mittagessen aus Ihrer Ernte', 'Almuerzo de tres platos con su recolecta'),
      t4('Recipe cards to take home', 'Fiches recettes à emporter', 'Rezeptkarten zum Mitnehmen', 'Tarjetas de recetas para llevar'),
    ],
  },
];

export const offers: OfferI18n[] = [
  {
    title: t4('The Long Weekend', 'Le Long Week-end', 'Das lange Wochenende', 'El fin de semana largo'),
    slug: 'the-long-weekend',
    subtitle: t4('Three nights, properly taken', 'Trois nuits, comme il se doit', 'Drei Nächte, wie es sich gehört', 'Tres noches, como es debido'),
    description: t4(
      'Arrive Friday, leave Monday, and let the house do the rest. Dinner on your first evening, a late checkout on your last morning, and the weekend left deliberately unplanned in between.',
      'Arrivez le vendredi, repartez le lundi, et laissez la maison faire le reste. Dîner le premier soir, départ tardif la dernière matinée, et le week-end volontairement laissé sans programme entre les deux.',
      'Kommen Sie am Freitag an, reisen Sie am Montag ab, und überlassen Sie den Rest dem Haus. Abendessen am ersten Abend, später Check-out am letzten Morgen, und das Wochenende dazwischen bewusst ohne Programm.',
      'Llegue el viernes, márchese el lunes, y deje que la casa se encargue del resto. Cena la primera noche, salida tardía la última mañana, y el fin de semana deliberadamente sin planificar entre medias.',
    ),
    tag: t4('Most popular', 'Le plus demandé', 'Am beliebtesten', 'El más popular'),
    image: IMG.exterior,
    inclusions: [
      t4('Three nights bed & breakfast', 'Trois nuits en chambre et petit-déjeuner', 'Drei Nächte mit Frühstück', 'Tres noches con desayuno'),
      t4('Three-course dinner on arrival night', 'Dîner trois services le soir d’arrivée', 'Dreigängiges Abendessen am Anreiseabend', 'Cena de tres platos la noche de llegada'),
      t4('Late checkout until 1pm', 'Départ tardif jusqu’à 13h', 'Später Check-out bis 13 Uhr', 'Salida tardía hasta las 13:00'),
      t4('Welcome dram on arrival', 'Dram de bienvenue à l’arrivée', 'Willkommens-Dram bei der Ankunft', 'Dram de bienvenida a la llegada'),
    ],
    type: 'Stay',
  },
  {
    title: t4('Winter by the Fire', 'L’hiver au coin du feu', 'Winter am Kamin', 'Invierno junto al fuego'),
    slug: 'winter-by-the-fire',
    subtitle: t4('November to March', 'De novembre à mars', 'November bis März', 'De noviembre a marzo'),
    description: t4(
      'The house at its most persuasive: fires lit by breakfast, the glen dusted white, and the tasting menu at its richest. Two nights minimum, hot water bottles administered without irony.',
      'La maison à son plus convaincant : feux allumés dès le petit-déjeuner, le glen saupoudré de blanc, et le menu dégustation à son plus riche. Deux nuits minimum, bouillottes distribuées sans la moindre ironie.',
      'Das Haus in seiner überzeugendsten Form: Kamine brennen schon zum Frühstück, das Tal in Weiß getaucht, und das Degustationsmenü in seiner reichhaltigsten Form. Mindestens zwei Nächte, Wärmflaschen werden völlig ernst gemeint gereicht.',
      'La casa en su forma más persuasiva: chimeneas encendidas desde el desayuno, el valle espolvoreado de blanco y el menú degustación en su versión más generosa. Dos noches mínimo, bolsas de agua caliente servidas sin ninguna ironía.',
    ),
    tag: t4('Seasonal', 'Saisonnier', 'Saisonal', 'De temporada'),
    image: IMG.fire,
    inclusions: [
      t4('Two nights bed & breakfast', 'Deux nuits en chambre et petit-déjeuner', 'Zwei Nächte mit Frühstück', 'Dos noches con desayuno'),
      t4('Six-course tasting menu one evening', 'Menu dégustation six services un soir', 'Sechsgängiges Degustationsmenü an einem Abend', 'Menú degustación de seis platos una noche'),
      t4('Whisky nightcap by the library fire', 'Whisky du soir au coin du feu de la bibliothèque', 'Whisky zum Schlummertrunk am Bibliothekskamin', 'Whisky de sobremesa junto al fuego de la biblioteca'),
      t4('20% off spa and sauna experiences', '20 % de réduction sur le spa et le sauna', '20 % Rabatt auf Spa- und Saunaerlebnisse', '20 % de descuento en spa y sauna'),
    ],
    validFrom: '2026-11-01',
    validUntil: '2027-03-31',
    type: 'Seasonal',
  },
  {
    title: t4('The Midweek Escape', 'L’escapade de semaine', 'Die Wochenmitte-Auszeit', 'La escapada entre semana'),
    slug: 'midweek-escape',
    subtitle: t4('Sunday to Thursday', 'Du dimanche au jeudi', 'Sonntag bis Donnerstag', 'De domingo a jueves'),
    description: t4(
      'The hills do not know it is Tuesday. Fifteen percent off bed and breakfast stays midweek, when the house is at its quietest and the trails are yours alone.',
      'Les collines ignorent que l’on est mardi. Quinze pour cent de réduction sur les séjours chambre et petit-déjeuner en semaine, quand la maison est la plus paisible et les sentiers pour vous seul.',
      'Die Hügel wissen nicht, dass Dienstag ist. Fünfzehn Prozent Rabatt auf Übernachtungen mit Frühstück unter der Woche, wenn das Haus am ruhigsten und die Wege ganz Ihnen allein gehören.',
      'Las colinas no saben que es martes. Quince por ciento de descuento en estancias con desayuno entre semana, cuando la casa está en su momento más tranquilo y los senderos son solo para usted.',
    ),
    tag: t4('Best value', 'Meilleur rapport qualité-prix', 'Bestes Preis-Leistungs-Verhältnis', 'Mejor relación calidad-precio'),
    image: IMG.glen,
    inclusions: [
      t4('15% off bed & breakfast rates', '15 % de réduction sur les tarifs chambre et petit-déjeuner', '15 % Rabatt auf Übernachtung mit Frühstück', '15 % de descuento en tarifas de alojamiento y desayuno'),
      t4('Flexible cancellation to 48 hours', 'Annulation flexible jusqu’à 48 heures', 'Flexible Stornierung bis 48 Stunden vorher', 'Cancelación flexible hasta 48 horas antes'),
      t4('Complimentary estate walk map', 'Carte des randonnées du domaine offerte', 'Kostenlose Wanderkarte des Anwesens', 'Mapa de senderismo de la finca de cortesía'),
      t4('Priority dinner reservations', 'Réservations de dîner prioritaires', 'Bevorzugte Abendessen-Reservierungen', 'Reservas de cena prioritarias'),
    ],
    type: 'Stay',
  },
  {
    title: t4('The Celebration Stay', 'Le séjour de célébration', 'Der Feieraufenthalt', 'La estancia de celebración'),
    slug: 'celebration-stay',
    subtitle: t4('Mark it properly', 'Célébrez comme il se doit', 'Feiern Sie es richtig', 'Celébrelo como se merece'),
    description: t4(
      'Anniversaries, decades, escapes that needed an excuse. Champagne on ice when you arrive, flowers from the walled garden in the room, and an upgrade to the best available suite when the house allows.',
      'Anniversaires, décennies, échappées qui avaient besoin d’un prétexte. Champagne au frais à votre arrivée, fleurs du jardin clos dans la chambre, et surclassement vers la meilleure suite disponible lorsque la maison le permet.',
      'Jahrestage, runde Geburtstage, Auszeiten, die einen Anlass brauchten. Champagner auf Eis bei Ihrer Ankunft, Blumen aus dem ummauerten Garten im Zimmer, und ein Upgrade auf die beste verfügbare Suite, wenn es das Haus erlaubt.',
      'Aniversarios, décadas, escapadas que necesitaban una excusa. Champán en hielo a su llegada, flores del jardín amurallado en la habitación, y una mejora a la mejor suite disponible cuando la casa lo permite.',
    ),
    tag: t4('Occasions', 'Occasions spéciales', 'Anlässe', 'Ocasiones especiales'),
    image: IMG.room1,
    inclusions: [
      t4('Suite upgrade when available', 'Surclassement en suite selon disponibilité', 'Suiten-Upgrade nach Verfügbarkeit', 'Mejora a suite según disponibilidad'),
      t4('Champagne and walled-garden flowers', 'Champagne et fleurs du jardin clos', 'Champagner und Blumen aus dem ummauerten Garten', 'Champán y flores del jardín amurallado'),
      t4('Breakfast in bed, no judgement', 'Petit-déjeuner au lit, sans jugement', 'Frühstück im Bett, ganz ohne Vorbehalte', 'Desayuno en la cama, sin reproches'),
      t4('Late checkout until 1pm', 'Départ tardif jusqu’à 13h', 'Später Check-out bis 13 Uhr', 'Salida tardía hasta las 13:00'),
    ],
    type: 'Occasion',
  },
];

export const journalPosts: JournalPostI18n[] = [
  {
    title: t4('A Year in the Walled Garden', 'Une année dans le jardin clos', 'Ein Jahr im ummauerten Garten', 'Un año en el jardín amurallado'),
    slug: 'a-year-in-the-walled-garden',
    category: 'Garden',
    author: 'Tom Drummond',
    publishedAt: '2026-04-14',
    readingTime: t4('6 min read', '6 min de lecture', '6 Min. Lesezeit', '6 min de lectura'),
    excerpt: t4(
      'Our head gardener on frost, rhubarb, and the quiet politics of growing for a kitchen that wants everything a fortnight early.',
      'Notre chef jardinier évoque le gel, la rhubarbe, et la politique discrète de cultiver pour une cuisine qui veut tout avec deux semaines d’avance.',
      'Unser Chefgärtner über Frost, Rhabarber und die stille Politik des Anbaus für eine Küche, die alles zwei Wochen zu früh haben will.',
      'Nuestro jefe de jardinería habla sobre las heladas, el ruibarbo y la silenciosa política de cultivar para una cocina que lo quiere todo con dos semanas de antelación.',
    ),
    heroImage: IMG.garden,
    featured: true,
    body: {
      en: [
        block('The wall was built in 1847 to keep deer out and heat in, and it still does both better than anything we could buy. Inside it, a year moves differently. January is paper — seed orders, grudges from last season, optimism in catalogue form. By February the rhubarb is up under its forcing pots, pale and indecently pink, and the kitchen starts telephoning.'),
        block('What the kitchen wants', 'h2'),
        block('Chefs, in my experience, believe vegetables are a scheduling problem. Calum is better than most, but even he asks for courgette flowers in May. The garden answers to the glen, not the menu, and the glen runs a fortnight behind the rest of Scotland and a month behind London. The negotiation is the job.'),
        block('We grow what the ground does well: brassicas that shrug at frost, potatoes in seven varieties, gooseberries on the south wall, and herbs in quantities that would look like madness anywhere else. Everything walks to the kitchen. Nothing sees a van.'),
        block('The quiet months', 'h2'),
        block('Guests ask what we do in winter. The honest answer is: prune, plan, and drink tea in the potting shed while the robin supervises. The garden is never finished and never empty. That is rather the point of it.'),
        block('If you are staying with us, the garden gate is never locked. Come in, walk the paths, take a gooseberry if the season allows. Just close the gate — the wall keeps the deer out, but only if we help it.', 'blockquote'),
      ],
      fr: [
        block('Le mur a été construit en 1847 pour tenir les cerfs à distance et garder la chaleur, et il continue de faire les deux mieux que tout ce que nous pourrions acheter. À l’intérieur, une année s’écoule différemment. Janvier, c’est du papier — commandes de graines, rancunes de la saison passée, optimisme en forme de catalogue. Dès février, la rhubarbe pointe sous ses cloches de forçage, pâle et indécemment rose, et la cuisine commence à téléphoner.'),
        block('Ce que veut la cuisine', 'h2'),
        block('Les chefs, d’après mon expérience, considèrent les légumes comme un problème de planning. Calum est meilleur que la plupart, mais même lui réclame des fleurs de courgette en mai. Le jardin répond au glen, pas au menu, et le glen a deux semaines de retard sur le reste de l’Écosse et un mois sur Londres. La négociation, c’est le métier.'),
        block('Nous cultivons ce que la terre fait bien : des brassicacées qui haussent les épaules face au gel, des pommes de terre en sept variétés, des groseilles à maquereau sur le mur sud, et des herbes en quantités qui paraîtraient de la folie ailleurs. Tout se rend à la cuisine à pied. Rien ne voit l’intérieur d’une camionnette.'),
        block('Les mois tranquilles', 'h2'),
        block('Les hôtes demandent ce que nous faisons en hiver. La réponse honnête est : tailler, planifier, et boire du thé dans la remise à empoter pendant que le rouge-gorge supervise. Le jardin n’est jamais terminé et jamais vide. C’est bien là tout son intérêt.'),
        block('Si vous séjournez chez nous, le portail du jardin n’est jamais verrouillé. Entrez, parcourez les allées, prenez une groseille à maquereau si la saison le permet. Refermez simplement le portail — le mur tient les cerfs à l’écart, mais seulement si nous l’y aidons.', 'blockquote'),
      ],
      de: [
        block('Die Mauer wurde 1847 gebaut, um Rehe fernzuhalten und Wärme zu speichern, und sie tut beides bis heute besser als alles, was wir kaufen könnten. In ihrem Inneren verläuft ein Jahr anders. Der Januar ist Papier — Samenbestellungen, Groll aus der letzten Saison, Optimismus in Katalogform. Bis Februar steht der Rhabarber unter seinen Treibtöpfen, blass und unanständig rosa, und die Küche beginnt anzurufen.'),
        block('Was die Küche will', 'h2'),
        block('Köche halten Gemüse meiner Erfahrung nach für ein Terminproblem. Calum ist besser als die meisten, aber selbst er verlangt im Mai nach Zucchiniblüten. Der Garten richtet sich nach dem Tal, nicht nach der Speisekarte, und das Tal hinkt dem übrigen Schottland zwei Wochen und London einen Monat hinterher. Das Verhandeln ist die eigentliche Arbeit.'),
        block('Wir bauen an, was der Boden gut kann: Kohlgewächse, die dem Frost die Schulter zucken, Kartoffeln in sieben Sorten, Stachelbeeren an der Südmauer, und Kräuter in Mengen, die anderswo wie Wahnsinn wirken würden. Alles geht zu Fuß in die Küche. Nichts sieht je einen Lieferwagen.'),
        block('Die stillen Monate', 'h2'),
        block('Gäste fragen, was wir im Winter tun. Die ehrliche Antwort lautet: beschneiden, planen, und Tee trinken im Gartenschuppen, während das Rotkehlchen die Aufsicht führt. Der Garten ist nie fertig und nie leer. Das ist eigentlich der ganze Sinn der Sache.'),
        block('Wenn Sie bei uns zu Gast sind, ist das Gartentor nie verschlossen. Kommen Sie herein, gehen Sie die Wege entlang, nehmen Sie sich eine Stachelbeere, wenn die Saison es erlaubt. Schließen Sie nur das Tor — die Mauer hält die Rehe fern, aber nur, wenn wir ihr dabei helfen.', 'blockquote'),
      ],
      es: [
        block('El muro se construyó en 1847 para mantener a los ciervos fuera y el calor dentro, y sigue haciendo ambas cosas mejor que cualquier cosa que pudiéramos comprar. En su interior, el año transcurre de otra manera. Enero es papel: pedidos de semillas, rencores de la temporada pasada, optimismo en forma de catálogo. Para febrero, el ruibarbo ya asoma bajo sus campanas de forzado, pálido e indecentemente rosado, y la cocina empieza a llamar.'),
        block('Lo que quiere la cocina', 'h2'),
        block('Los chefs, según mi experiencia, creen que las verduras son un problema de calendario. Calum es mejor que la mayoría, pero incluso él pide flores de calabacín en mayo. El jardín responde al valle, no al menú, y el valle va dos semanas por detrás del resto de Escocia y un mes por detrás de Londres. La negociación es el verdadero trabajo.'),
        block('Cultivamos lo que la tierra hace bien: brasicáceas que se ríen de las heladas, patatas en siete variedades, grosellas espinosas en el muro sur, y hierbas aromáticas en cantidades que en cualquier otro lugar parecerían una locura. Todo llega a la cocina a pie. Nada ve el interior de una furgoneta.'),
        block('Los meses tranquilos', 'h2'),
        block('Los huéspedes preguntan qué hacemos en invierno. La respuesta honesta es: podar, planificar y tomar té en el cobertizo mientras el petirrojo supervisa. El jardín nunca está terminado ni nunca está vacío. En eso consiste, precisamente.'),
        block('Si se aloja con nosotros, la puerta del jardín nunca está cerrada con llave. Entre, recorra los senderos, tome una grosella espinosa si la temporada lo permite. Solo cierre la puerta: el muro mantiene a los ciervos fuera, pero solo si nosotros le ayudamos.', 'blockquote'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: t4('The Quiet Season: Why Winter Suits Perthshire', 'La saison tranquille : pourquoi l’hiver sied au Perthshire', 'Die stille Saison: Warum der Winter zu Perthshire passt', 'La temporada tranquila: por qué el invierno le sienta bien a Perthshire'),
    slug: 'the-quiet-season',
    category: 'The Glen',
    author: 'Eleanor Brodie',
    publishedAt: '2026-01-20',
    readingTime: t4('5 min read', '5 min de lecture', '5 Min. Lesezeit', '5 min de lectura'),
    excerpt: t4(
      'The case for coming when everyone else has gone home: short days, long dinners, and a glen that keeps its best light for the patient.',
      'Plaidoyer pour venir quand tout le monde est rentré chez soi : journées courtes, dîners longs, et un glen qui réserve sa plus belle lumière aux patients.',
      'Ein Plädoyer dafür, zu kommen, wenn alle anderen längst nach Hause gefahren sind: kurze Tage, lange Abendessen, und ein Tal, das sein schönstes Licht den Geduldigen vorbehält.',
      'El argumento a favor de venir cuando todos los demás ya se han ido a casa: días cortos, cenas largas, y un valle que reserva su mejor luz para los pacientes.',
    ),
    heroImage: IMG.fire,
    body: {
      en: [
        block('There is a fortnight in deep winter when the sun never quite clears the ridge, and the whole glen sits in a kind of blue half-light from ten until three. Most hotels would apologise for it. We would argue it is the best thing we offer.'),
        block('Winter compresses the day into something honest. You walk in the morning because the light is leaving. You are back by the fire at four because there is nowhere better to be. Dinner takes three hours because nobody can think of a reason it should not.'),
        block('What to actually do', 'h2'),
        block('The estate walk is at its best in hard frost — the bog freezes and routes open that are impassable all summer. The sauna by the loch becomes a conviction rather than a novelty. And the kitchen, freed from the tyranny of summer lightness, cooks the way this country has always wanted to be cooked: slowly, richly, with gravity.'),
        block('Come in February. Bring boots and a book. Leave the rest to the house.'),
      ],
      fr: [
        block('Il y a une quinzaine de jours en plein hiver où le soleil ne franchit jamais tout à fait la crête, et tout le glen baigne dans une sorte de demi-jour bleu de dix heures à quinze heures. La plupart des hôtels s’en excuseraient. Nous soutenons que c’est la meilleure chose que nous offrons.'),
        block('L’hiver comprime la journée en quelque chose d’honnête. On marche le matin parce que la lumière s’en va. On est de retour près du feu à seize heures parce qu’il n’y a nulle part de mieux où être. Le dîner dure trois heures parce que personne ne trouve de raison pour qu’il en soit autrement.'),
        block('Que faire, concrètement', 'h2'),
        block('La promenade sur le domaine est à son meilleur par grand gel — la tourbière gèle et des chemins s’ouvrent qui sont impraticables tout l’été. Le sauna près du loch devient une conviction plutôt qu’une nouveauté. Et la cuisine, libérée de la tyrannie de la légèreté estivale, cuisine comme ce pays a toujours voulu être cuisiné : lentement, richement, avec gravité.'),
        block('Venez en février. Apportez des bottes et un livre. Laissez le reste à la maison.'),
      ],
      de: [
        block('Es gibt einen vierzehntägigen Abschnitt im tiefsten Winter, in dem die Sonne den Grat nie ganz überwindet und das ganze Tal von zehn bis fünfzehn Uhr in einer Art blauem Halblicht liegt. Die meisten Hotels würden sich dafür entschuldigen. Wir behaupten, es sei das Beste, was wir bieten.'),
        block('Der Winter verdichtet den Tag zu etwas Ehrlichem. Man geht morgens spazieren, weil das Licht verschwindet. Man ist um vier wieder am Kamin, weil es nirgendwo einen besseren Ort gibt. Das Abendessen dauert drei Stunden, weil niemandem ein Grund einfällt, warum es das nicht sollte.'),
        block('Was man wirklich tun sollte', 'h2'),
        block('Der Spaziergang über das Anwesen ist bei starkem Frost am schönsten — das Moor gefriert, und Wege öffnen sich, die den ganzen Sommer über unpassierbar sind. Die Sauna am Loch wird von einer Neuheit zu einer Überzeugung. Und die Küche, befreit von der Tyrannei sommerlicher Leichtigkeit, kocht so, wie dieses Land immer gekocht werden wollte: langsam, reichhaltig, mit Gewicht.'),
        block('Kommen Sie im Februar. Bringen Sie Stiefel und ein Buch mit. Den Rest überlassen Sie dem Haus.'),
      ],
      es: [
        block('Hay una quincena en pleno invierno en la que el sol nunca llega a superar del todo la cresta, y todo el valle queda sumido en una especie de penumbra azulada de diez de la mañana a tres de la tarde. La mayoría de los hoteles pedirían disculpas por ello. Nosotros sostenemos que es lo mejor que ofrecemos.'),
        block('El invierno comprime el día en algo honesto. Se pasea por la mañana porque la luz se va. Se regresa junto al fuego a las cuatro porque no hay mejor lugar donde estar. La cena dura tres horas porque a nadie se le ocurre una razón para que no sea así.'),
        block('Qué hacer, en la práctica', 'h2'),
        block('El paseo por la finca está en su mejor momento con heladas intensas: la turbera se congela y se abren rutas que son intransitables todo el verano. La sauna junto al lago pasa de ser una novedad a una convicción. Y la cocina, liberada de la tiranía de la ligereza veraniega, cocina como este país siempre ha querido que se cocine: despacio, con generosidad, con peso.'),
        block('Venga en febrero. Traiga botas y un libro. Deje el resto en manos de la casa.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: t4('Meet the Maker: Glen Ericht Distillery', 'Rencontre avec l’artisan : la distillerie Glen Ericht', 'Begegnung mit dem Hersteller: die Glen-Ericht-Destillerie', 'Conozca al artesano: la destilería Glen Ericht'),
    slug: 'meet-the-maker-glen-ericht',
    category: 'Provenance',
    author: 'Calum Ross',
    publishedAt: '2025-11-08',
    readingTime: t4('7 min read', '7 min de lecture', '7 Min. Lesezeit', '7 min de lectura'),
    excerpt: t4(
      'Four miles downriver, a distillery of nine people makes the single malt that anchors our estate blend. We went to see why it tastes of the same water we cook with.',
      'À six kilomètres en aval, une distillerie de neuf personnes produit le single malt qui constitue la base de notre assemblage maison. Nous sommes allés voir pourquoi il a le goût de la même eau que celle avec laquelle nous cuisinons.',
      'Sechs Kilometer flussabwärts stellt eine Destillerie mit neun Mitarbeitern den Single Malt her, der unserem Hausverschnitt seinen Anker gibt. Wir wollten herausfinden, warum er nach demselben Wasser schmeckt, mit dem wir kochen.',
      'A seis kilómetros río abajo, una destilería de nueve personas elabora el whisky de malta que da cuerpo a la mezcla de la finca. Fuimos a ver por qué sabe al mismo agua con la que cocinamos.',
    ),
    heroImage: IMG.whisky,
    body: {
      en: [
        block('Every bottle of the Craigmore estate blend starts four miles from the front door, at a distillery most maps decline to mention. Glen Ericht employs nine people, two of whom are brothers, one of whom is eighty-one and still noses every cask personally.'),
        block('The same water', 'h2'),
        block('The burn that feeds their mash tuns rises on the same hill as the spring that supplies our kitchen. I am not romantic about much, but I am romantic about that: the whisky in your glass after dinner and the water that cooked the dinner fell as the same rain.'),
        block('Our blend takes their twelve-year-old as its spine, softened with a Lowland grain and finished in sherry wood for eighteen months in our own cellar. We bottle around six hundred a year. It is for the house, the bar, and guests who ask nicely. It is not for sale anywhere else, which is, we admit, half the pleasure of it.'),
        block('You can visit Glen Ericht with us — the private tasting in the library ends with a dram of their newest cask, and the distillery walk runs most Thursdays in season.'),
      ],
      fr: [
        block('Chaque bouteille de l’assemblage du domaine de Craigmore commence à six kilomètres de la porte d’entrée, dans une distillerie que la plupart des cartes omettent de mentionner. Glen Ericht emploie neuf personnes, dont deux frères, et l’une d’elles, âgée de quatre-vingt-un ans, nez encore personnellement chaque fût.'),
        block('La même eau', 'h2'),
        block('Le ruisseau qui alimente leurs cuves de brassage prend sa source sur la même colline que la source qui alimente notre cuisine. Je ne suis pas d’un naturel romantique, mais sur ce point, je le suis : le whisky dans votre verre après le dîner et l’eau qui a cuit ce dîner sont tombés sous forme de la même pluie.'),
        block('Notre assemblage prend leur douze ans comme colonne vertébrale, adouci par un grain des Lowlands et affiné en fûts de xérès pendant dix-huit mois dans notre propre cave. Nous en mettons environ six cents bouteilles en bouteille par an. C’est pour la maison, le bar, et les hôtes qui le demandent gentiment. Il n’est en vente nulle part ailleurs, ce qui, nous l’admettons, en fait la moitié du plaisir.'),
        block('Vous pouvez visiter Glen Ericht avec nous — la dégustation privée à la bibliothèque se termine par un dram de leur fût le plus récent, et la promenade jusqu’à la distillerie a lieu la plupart des jeudis en saison.'),
      ],
      de: [
        block('Jede Flasche des Craigmore-Hausverschnitts beginnt sechs Kilometer von unserer Haustür entfernt, in einer Destillerie, die die meisten Karten nicht einmal verzeichnen. Glen Ericht beschäftigt neun Menschen, zwei davon Brüder, einer davon einundachtzig Jahre alt und noch immer persönlich damit befasst, jedes Fass zu beriechen.'),
        block('Dasselbe Wasser', 'h2'),
        block('Der Bach, der ihre Maischebottiche speist, entspringt am selben Hügel wie die Quelle, die unsere Küche versorgt. Ich bin nicht für vieles romantisch veranlagt, aber dafür schon: der Whisky in Ihrem Glas nach dem Essen und das Wasser, mit dem das Essen gekocht wurde, fielen als derselbe Regen.'),
        block('Unser Verschnitt nimmt deren Zwölfjährigen als Rückgrat, abgemildert mit einem Lowland-Grain und achtzehn Monate lang in Sherryfässern in unserem eigenen Keller nachgereift. Wir füllen rund sechshundert Flaschen im Jahr ab. Sie sind für das Haus, die Bar, und Gäste, die freundlich fragen. Er ist nirgendwo sonst käuflich zu erwerben, was, das geben wir zu, die halbe Freude daran ausmacht.'),
        block('Sie können Glen Ericht mit uns besuchen — die private Verkostung in der Bibliothek endet mit einem Dram aus ihrem neuesten Fass, und der Spaziergang zur Destillerie findet in der Saison an den meisten Donnerstagen statt.'),
      ],
      es: [
        block('Cada botella de la mezcla de la finca Craigmore comienza a seis kilómetros de nuestra puerta, en una destilería que la mayoría de los mapas ni siquiera mencionan. Glen Ericht emplea a nueve personas, dos de ellas hermanos, y una de ellas, de ochenta y un años, todavía cata personalmente cada barril.'),
        block('La misma agua', 'h2'),
        block('El arroyo que alimenta sus cubas de maceración nace en la misma colina que el manantial que abastece nuestra cocina. No soy de naturaleza romántica en muchas cosas, pero en esta sí: el whisky en su copa después de la cena y el agua con la que se cocinó esa cena cayeron como la misma lluvia.'),
        block('Nuestra mezcla toma su whisky de doce años como columna vertebral, suavizado con un grano de las Lowlands y terminado en barricas de jerez durante dieciocho meses en nuestra propia bodega. Embotellamos unas seiscientas botellas al año. Son para la casa, el bar, y los huéspedes que lo piden amablemente. No está a la venta en ningún otro lugar, lo cual, admitimos, es la mitad del placer.'),
        block('Puede visitar Glen Ericht con nosotros: la cata privada en la biblioteca termina con un dram de su barril más reciente, y el paseo a la destilería tiene lugar la mayoría de los jueves en temporada.'),
      ],
    } as LocaleField<unknown[]>,
  },
  {
    title: t4('Six Walks from the Front Door', 'Six randonnées depuis la porte d’entrée', 'Sechs Wanderungen ab der Haustür', 'Seis rutas desde la puerta principal'),
    slug: 'six-walks-from-the-front-door',
    category: 'Outdoors',
    author: 'Hamish Begg',
    publishedAt: '2025-09-15',
    readingTime: t4('8 min read', '8 min de lecture', '8 Min. Lesezeit', '8 min de lectura'),
    excerpt: t4(
      'No car required. The estate ghillie ranks the six routes that start on the gravel outside reception, from a gentle hour to a full day on the ridge.',
      'Aucune voiture nécessaire. Le garde-chasse du domaine classe les six itinéraires qui débutent sur le gravier devant la réception, d’une heure tranquille à une journée complète sur la crête.',
      'Kein Auto nötig. Der Wildhüter des Anwesens ordnet die sechs Routen, die auf dem Kies vor der Rezeption beginnen, von einer sanften Stunde bis zu einem ganzen Tag auf dem Grat.',
      'No hace falta coche. El guarda de caza de la finca clasifica las seis rutas que comienzan en la grava frente a la recepción, desde una hora tranquila hasta un día completo en la cresta.',
    ),
    heroImage: IMG.walk,
    body: {
      en: [
        block('People drive an hour from here to start walks worse than the ones that begin on our gravel. Here are the six I send guests on, easiest first. All of them start and end at the front door, which matters more than people think — the best walk is the one between you and dinner.'),
        block('One: The River Circuit', 'h2'),
        block('An hour, flat, impossible to lose. Down the lime avenue, along the Tay to the old ford, back through the oak wood. Herons guaranteed; otters if you are quiet and lucky.'),
        block('Two: The Walled Garden Loop', 'h2'),
        block('Forty minutes through the policies — the old ornamental grounds — taking in the garden, the icehouse, and the folly the fourth laird built to annoy his brother. Good with a coffee from the hall table.'),
        block('Three to Five: The Hill Tracks', 'h2'),
        block('Three routes climb out of the glen on old stalkers’ paths: the Shieling Track (two hours), the Crag (three, steep, worth it), and the March Wall (four, big views, take lunch). Ask at the desk and we will mark the day’s best choice on a map — wind decides.'),
        block('Six: The Ridge', 'h2'),
        block('A full day, proper boots, packed lunch from the kitchen. The whole glen at your feet and, on a clear day, Schiehallion looking close enough to touch. I have done it some four hundred times. It has not once been the same walk twice.'),
      ],
      fr: [
        block('Des gens roulent une heure depuis ici pour commencer des randonnées moins belles que celles qui débutent sur notre gravier. Voici les six que je conseille à nos hôtes, de la plus facile à la plus difficile. Elles commencent et se terminent toutes à la porte d’entrée, ce qui compte plus qu’on ne le pense — la meilleure randonnée est celle qui vous sépare du dîner.'),
        block('Un : le circuit de la rivière', 'h2'),
        block('Une heure, plat, impossible de se perdre. En descendant l’allée de tilleuls, le long de la Tay jusqu’au vieux gué, retour par le bois de chênes. Hérons garantis ; loutres si vous êtes silencieux et chanceux.'),
        block('Deux : la boucle du jardin clos', 'h2'),
        block('Quarante minutes à travers le parc paysager — les anciens jardins d’agrément — en passant par le jardin, la glacière, et la folie que le quatrième laird a fait construire pour agacer son frère. Idéal avec un café pris à la table du hall.'),
        block('Trois à cinq : les sentiers de montagne', 'h2'),
        block('Trois itinéraires grimpent hors du glen sur d’anciens sentiers de traqueurs : le sentier des Bergeries (deux heures), le Crag (trois heures, pentu, ça vaut le coup), et le Mur de Mars (quatre heures, vues superbes, prévoyez un pique-nique). Demandez à la réception et nous marquerons le meilleur choix du jour sur une carte — le vent décide.'),
        block('Six : la crête', 'h2'),
        block('Une journée entière, de bonnes chaussures, un pique-nique préparé par la cuisine. Tout le glen à vos pieds et, par temps clair, le Schiehallion qui semble assez proche pour être touché. Je l’ai parcourue environ quatre cents fois. Ce n’a jamais été deux fois la même randonnée.'),
      ],
      de: [
        block('Manche Leute fahren eine Stunde von hier, um Wanderungen zu beginnen, die schlechter sind als jene, die auf unserem Kies starten. Hier sind die sechs, die ich Gästen empfehle, die einfachste zuerst. Sie alle beginnen und enden an der Haustür, was wichtiger ist, als man denkt — die beste Wanderung ist die zwischen Ihnen und dem Abendessen.'),
        block('Eins: Die Flussrunde', 'h2'),
        block('Eine Stunde, flach, unmöglich, sich zu verlaufen. Die Lindenallee hinunter, am Tay entlang bis zur alten Furt, zurück durch den Eichenwald. Reiher garantiert; Otter, wenn Sie leise und mit etwas Glück unterwegs sind.'),
        block('Zwei: Die Runde um den ummauerten Garten', 'h2'),
        block('Vierzig Minuten durch die Parkanlagen — die alten Ziergärten — vorbei am Garten, am Eishaus und an der Folly, die der vierte Laird erbaute, um seinen Bruder zu ärgern. Gut mit einem Kaffee vom Tisch in der Eingangshalle.'),
        block('Drei bis fünf: Die Bergpfade', 'h2'),
        block('Drei Routen führen auf alten Pirschpfaden aus dem Tal hinaus: der Shieling-Pfad (zwei Stunden), der Crag (drei Stunden, steil, lohnt sich) und die March Wall (vier Stunden, großartige Aussichten, Lunchpaket mitnehmen). Fragen Sie an der Rezeption, und wir markieren Ihnen die beste Wahl des Tages auf einer Karte — der Wind entscheidet.'),
        block('Sechs: Der Grat', 'h2'),
        block('Ein ganzer Tag, feste Stiefel, ein Lunchpaket aus der Küche. Das ganze Tal zu Ihren Füßen, und an einem klaren Tag scheint der Schiehallion zum Greifen nah. Ich bin sie ungefähr vierhundertmal gegangen. Kein einziges Mal war es dieselbe Wanderung.'),
      ],
      es: [
        block('Hay personas que conducen una hora desde aquí para empezar rutas peores que las que comienzan en nuestra grava. Estas son las seis que recomiendo a los huéspedes, de más fácil a más difícil. Todas empiezan y terminan en la puerta principal, lo cual importa más de lo que la gente cree: la mejor ruta es la que hay entre usted y la cena.'),
        block('Uno: el circuito del río', 'h2'),
        block('Una hora, llano, imposible de perderse. Bajando por la avenida de tilos, junto al Tay hasta el antiguo vado, de vuelta por el bosque de robles. Garzas garantizadas; nutrias si va en silencio y tiene suerte.'),
        block('Dos: el circuito del jardín amurallado', 'h2'),
        block('Cuarenta minutos por los antiguos jardines ornamentales, pasando por el jardín, la casa del hielo y el capricho arquitectónico que el cuarto laird construyó para fastidiar a su hermano. Ideal con un café de la mesa del vestíbulo.'),
        block('Tres a cinco: los senderos de montaña', 'h2'),
        block('Tres rutas suben desde el valle por antiguos senderos de rastreadores: el sendero de las Majadas (dos horas), el Crag (tres horas, empinado, merece la pena) y el Muro de March (cuatro horas, vistas espectaculares, lleve almuerzo). Pregunte en recepción y le marcaremos la mejor opción del día en un mapa: el viento decide.'),
        block('Seis: la cresta', 'h2'),
        block('Un día completo, botas adecuadas, almuerzo preparado por la cocina. Todo el valle a sus pies y, en un día despejado, el Schiehallion parece estar lo bastante cerca como para tocarlo. La he recorrido unas cuatrocientas veces. Ni una sola vez ha sido la misma ruta.'),
      ],
    } as LocaleField<unknown[]>,
  },
];

export const testimonials: TestimonialI18n[] = [
  {
    guestName: 'A. & J. Pemberton',
    quote: t4(
      'We have stayed in grander hotels and slept worse in all of them. Craigmore understands the difference between luxury and fuss, and chooses correctly every single time.',
      'Nous avons séjourné dans des hôtels plus grandioses et y avons toujours moins bien dormi. Craigmore comprend la différence entre le luxe et l’ostentation, et fait le bon choix à chaque fois.',
      'Wir haben in prunkvolleren Hotels übernachtet und dort durchweg schlechter geschlafen. Craigmore versteht den Unterschied zwischen Luxus und Aufwand und trifft jedes Mal die richtige Wahl.',
      'Nos hemos alojado en hoteles más grandiosos y hemos dormido peor en todos ellos. Craigmore entiende la diferencia entre el lujo y la ostentación, y elige correctamente cada vez.',
    ),
    rating: 5,
    roomStayed: 'The Atholl Suite',
    date: '2026-03-02',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'Margaret L.',
    quote: t4(
      'Dinner was the best I have eaten in Scotland, and I say that as someone who came principally for the fishing. The fishing, incidentally, was also the best I have had in Scotland.',
      'Le dîner a été le meilleur que j’aie mangé en Écosse, et je le dis en tant que personne venue principalement pour la pêche. La pêche, d’ailleurs, a également été la meilleure que j’aie connue en Écosse.',
      'Das Abendessen war das beste, das ich je in Schottland gegessen habe, und das sage ich als jemand, der hauptsächlich wegen des Angelns gekommen ist. Das Angeln war übrigens ebenfalls das beste, das ich in Schottland erlebt habe.',
      'La cena fue la mejor que he probado en Escocia, y lo digo como alguien que vino principalmente por la pesca. La pesca, por cierto, también fue la mejor que he tenido en Escocia.',
    ),
    rating: 5,
    roomStayed: 'The Tummel',
    date: '2026-05-18',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'The Okafor family',
    quote: t4(
      'Three generations, four days, zero complaints — a family first. The staff remembered everyone’s name by breakfast on day one, including the dog’s.',
      'Trois générations, quatre jours, zéro plainte — une première pour notre famille. Le personnel connaissait le nom de chacun dès le petit-déjeuner du premier jour, y compris celui du chien.',
      'Drei Generationen, vier Tage, keine einzige Beschwerde — eine Premiere für unsere Familie. Das Personal kannte bereits beim Frühstück am ersten Tag jeden Namen, auch den des Hundes.',
      'Tres generaciones, cuatro días, cero quejas: una primera vez para la familia. El personal se sabía el nombre de todos ya en el desayuno del primer día, incluido el del perro.',
    ),
    rating: 5,
    roomStayed: 'The Birnam & The Garry',
    date: '2025-10-26',
    source: 'Guest book',
    featured: true,
  },
  {
    guestName: 'D. Whitfield',
    quote: t4(
      'I came for two nights to finish a book and stayed five. The library fire, the silence, and the woman who kept appearing with exactly the right pot of tea are jointly responsible.',
      'Je suis venu pour deux nuits afin de terminer un livre, et j’y suis resté cinq. Le feu de la bibliothèque, le silence, et la femme qui réapparaissait sans cesse avec exactement la bonne théière en sont conjointement responsables.',
      'Ich kam für zwei Nächte, um ein Buch zu beenden, und blieb fünf. Das Kaminfeuer der Bibliothek, die Stille, und die Frau, die immer wieder mit genau der richtigen Kanne Tee auftauchte, tragen gemeinsam die Schuld daran.',
      'Vine para dos noches con la intención de terminar un libro, y me quedé cinco. La chimenea de la biblioteca, el silencio y la mujer que seguía apareciendo con la tetera perfecta son responsables, a partes iguales.',
    ),
    rating: 5,
    roomStayed: 'The Faskally',
    date: '2026-02-09',
    source: 'Direct review',
    featured: true,
  },
  {
    guestName: 'S. & R. Maxwell',
    quote: t4(
      'We were married on the south lawn in September. A year on, guests still bring it up unprompted. Flawless is an overused word; I am using it anyway.',
      'Nous nous sommes mariés sur la pelouse sud en septembre. Un an plus tard, nos invités en parlent encore spontanément. « Parfait » est un mot galvaudé ; je l’emploie quand même.',
      'Wir haben im September auf dem südlichen Rasen geheiratet. Ein Jahr später sprechen unsere Gäste immer noch unaufgefordert davon. „Makellos“ ist ein überstrapaziertes Wort; ich benutze es trotzdem.',
      'Nos casamos en el jardín sur en septiembre. Un año después, los invitados todavía lo mencionan sin que se lo pidamos. «Perfecto» es una palabra sobreutilizada; la uso de todos modos.',
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
    role: t4('General Manager', 'Directrice générale', 'Geschäftsführerin', 'Directora general'),
    bio: t4(
      'Twenty years in country house hotels on both sides of the border, and a firm belief that the best service is the kind you only notice afterwards. Keeper of the guest book and its secrets.',
      'Vingt ans dans les hôtels de charme des deux côtés de la frontière, et la ferme conviction que le meilleur service est celui que l’on ne remarque qu’après coup. Gardienne du livre d’or et de ses secrets.',
      'Zwanzig Jahre in Landhotels auf beiden Seiten der Grenze, und die feste Überzeugung, dass der beste Service der ist, den man erst im Nachhinein bemerkt. Hüterin des Gästebuchs und seiner Geheimnisse.',
      'Veinte años en hoteles rurales a ambos lados de la frontera, y la firme convicción de que el mejor servicio es el que solo se nota después. Guardiana del libro de visitas y de sus secretos.',
    ),
    headshot: IMG.portrait2,
    department: 'Management',
    displayOrder: 1,
  },
  {
    name: 'Calum Ross',
    role: t4('Head Chef', 'Chef cuisinier', 'Küchenchef', 'Chef ejecutivo'),
    bio: t4(
      'Perthshire born, trained in Edinburgh and Lyon, returned on the understanding that the larder would be the glen itself. Cooks what the estate, the river and the walled garden hand him.',
      'Né dans le Perthshire, formé à Édimbourg et à Lyon, revenu avec la conviction que le garde-manger serait le glen lui-même. Cuisine ce que le domaine, la rivière et le jardin clos lui offrent.',
      'Geboren in Perthshire, ausgebildet in Edinburgh und Lyon, zurückgekehrt in dem Verständnis, dass die Vorratskammer das Tal selbst sein würde. Kocht, was ihm das Anwesen, der Fluss und der ummauerte Garten in die Hand geben.',
      'Nacido en Perthshire, formado en Edimburgo y Lyon, regresó con la idea de que la despensa sería el propio valle. Cocina lo que le ofrecen la finca, el río y el jardín amurallado.',
    ),
    headshot: IMG.portrait3,
    department: 'Kitchen',
    displayOrder: 2,
  },
  {
    name: 'Isla McAllister',
    role: t4('Front of House Manager', 'Responsable de la réception', 'Empfangsleiterin', 'Directora de recepción'),
    bio: t4(
      'The first voice most guests hear and the reason most of them come back. Knows every train time, every walk, and every guest’s usual table by their second visit.',
      'La première voix qu’entendent la plupart des hôtes, et la raison pour laquelle la plupart d’entre eux reviennent. Connaît tous les horaires de train, toutes les randonnées, et la table habituelle de chaque hôte dès sa deuxième visite.',
      'Die erste Stimme, die die meisten Gäste hören, und der Grund, warum die meisten wiederkommen. Kennt jede Zugzeit, jeden Spaziergang und beim zweiten Besuch schon den Stammtisch jedes Gastes.',
      'La primera voz que escuchan la mayoría de los huéspedes, y la razón por la que la mayoría regresa. Conoce todos los horarios de tren, todas las rutas, y la mesa habitual de cada huésped desde su segunda visita.',
    ),
    headshot: IMG.portrait4,
    department: 'Front of House',
    displayOrder: 3,
  },
  {
    name: 'Tom Drummond',
    role: t4('Head Gardener', 'Chef jardinier', 'Chefgärtner', 'Jefe de jardinería'),
    bio: t4(
      'Custodian of the 1847 walled garden and its seven varieties of potato. Negotiates daily with the kitchen and, by his own account, usually wins.',
      'Gardien du jardin clos de 1847 et de ses sept variétés de pommes de terre. Négocie quotidiennement avec la cuisine et, selon ses propres dires, l’emporte généralement.',
      'Hüter des ummauerten Gartens von 1847 und seiner sieben Kartoffelsorten. Verhandelt täglich mit der Küche und behält nach eigener Aussage meist die Oberhand.',
      'Custodio del jardín amurallado de 1847 y sus siete variedades de patata. Negocia a diario con la cocina y, según él mismo, suele ganar.',
    ),
    headshot: IMG.portrait5,
    department: 'Estate',
    displayOrder: 4,
  },
  {
    name: 'Hamish Begg',
    role: t4('Estate Ghillie', 'Garde-chasse du domaine', 'Wildhüter des Anwesens', 'Guarda de caza de la finca'),
    bio: t4(
      'Thirty years on this ground. Guide to the hill tracks, keeper of the beats, and the only member of staff with a standing excuse to be late: the river wanted watching.',
      'Trente ans sur ce terrain. Guide des sentiers de montagne, gardien des parcours de pêche, et le seul membre du personnel disposant d’une excuse permanente pour arriver en retard : la rivière avait besoin d’être surveillée.',
      'Dreißig Jahre auf diesem Grund. Führer auf den Bergpfaden, Hüter der Fischereiabschnitte, und der einzige Mitarbeiter mit einer dauerhaften Entschuldigung fürs Zuspätkommen: der Fluss musste beobachtet werden.',
      'Treinta años en estas tierras. Guía de los senderos de montaña, guardián de los tramos de pesca, y el único miembro del personal con una excusa permanente para llegar tarde: el río necesitaba vigilancia.',
    ),
    headshot: IMG.portrait1,
    department: 'Estate',
    displayOrder: 5,
  },
  {
    name: 'Marie Laurent',
    role: t4('Head of Housekeeping', 'Gouvernante générale', 'Leiterin der Hauswirtschaft', 'Jefa de limpieza'),
    bio: t4(
      'Runs the quietest department in the house to the highest standard in it. Believes a properly made bed is a moral position, and makes a persuasive case nightly.',
      'Dirige le service le plus discret de la maison selon les normes les plus exigeantes. Croit qu’un lit bien fait est une question de principe, et le prouve chaque soir avec conviction.',
      'Leitet die stillste Abteilung des Hauses nach dem höchsten Standard darin. Ist überzeugt, dass ein ordentlich gemachtes Bett eine Frage der Haltung ist, und führt diesen Beweis jeden Abend überzeugend.',
      'Dirige el departamento más discreto de la casa según los estándares más exigentes. Cree que una cama bien hecha es una cuestión de principios, y lo demuestra cada noche de forma convincente.',
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
  {
    q: t4('What are your check-in and check-out times?', 'Quels sont vos horaires d’arrivée et de départ ?', 'Wie sind Ihre Check-in- und Check-out-Zeiten?', '¿Cuáles son sus horarios de entrada y salida?'),
    a: t4(
      'Check-in is from 3pm and check-out by 11am. Early arrivals are welcome to leave luggage and take the run of the house; late checkout until 1pm can usually be arranged.',
      'L’arrivée se fait à partir de 15h et le départ avant 11h. Les arrivées anticipées peuvent laisser leurs bagages et profiter librement de la maison ; un départ tardif jusqu’à 13h peut généralement être organisé.',
      'Der Check-in ist ab 15 Uhr, der Check-out bis 11 Uhr. Frühe Ankömmlinge können gerne ihr Gepäck deponieren und das Haus schon nutzen; ein später Check-out bis 13 Uhr lässt sich meist einrichten.',
      'El check-in es a partir de las 15:00 y el check-out antes de las 11:00. Quienes lleguen antes pueden dejar el equipaje y disfrutar libremente de la casa; normalmente se puede organizar una salida tardía hasta las 13:00.',
    ),
  },
  {
    q: t4('Are dogs welcome?', 'Les chiens sont-ils acceptés ?', 'Sind Hunde willkommen?', '¿Se admiten perros?'),
    a: t4(
      'Dogs are welcome in The Birnam, which has direct courtyard access, and throughout the grounds on a lead. We provide beds, bowls and a map of the best sniffs. £25 per dog per stay.',
      'Les chiens sont acceptés dans la chambre Birnam, qui dispose d’un accès direct à la cour, ainsi que dans tout le domaine en laisse. Nous fournissons paniers, gamelles et une carte des meilleurs coins à renifler. 25 £ par chien et par séjour.',
      'Hunde sind im Birnam-Zimmer willkommen, das über einen direkten Zugang zum Innenhof verfügt, sowie überall auf dem Gelände an der Leine. Wir stellen Körbchen, Näpfe und eine Karte der besten Schnüffelrouten zur Verfügung. 25 £ pro Hund und Aufenthalt.',
      'Los perros son bienvenidos en la habitación Birnam, que tiene acceso directo al patio, y en toda la finca con correa. Proporcionamos camas, cuencos y un mapa de los mejores rincones para olfatear. 25 £ por perro y estancia.',
    ),
  },
  {
    q: t4('Do you welcome children?', 'Accueillez-vous les enfants ?', 'Sind Kinder bei Ihnen willkommen?', '¿Admiten niños?'),
    a: t4(
      'We welcome children of all ages. Cots and extra beds are available in the suites, the kitchen cooks a proper children’s supper at 5.30pm, and the estate absorbs energy better than any screen.',
      'Nous accueillons les enfants de tout âge. Berceaux et lits d’appoint sont disponibles dans les suites, la cuisine prépare un véritable souper pour enfants à 17h30, et le domaine absorbe l’énergie bien mieux qu’un écran.',
      'Wir heißen Kinder jeden Alters willkommen. Kinderbetten und Zustellbetten sind in den Suiten erhältlich, die Küche kocht um 17:30 Uhr ein richtiges Kinderabendessen, und das Anwesen absorbiert Energie besser als jeder Bildschirm.',
      'Recibimos a niños de todas las edades. Hay cunas y camas adicionales disponibles en las suites, la cocina prepara una auténtica cena infantil a las 17:30, y la finca absorbe energía mejor que cualquier pantalla.',
    ),
  },
  {
    q: t4('Can you cater for dietary requirements?', 'Pouvez-vous prendre en compte des régimes alimentaires particuliers ?', 'Können Sie besondere Ernährungsbedürfnisse berücksichtigen?', '¿Pueden atender necesidades dietéticas especiales?'),
    a: t4(
      'Yes — tell us when you book and the kitchen will plan properly rather than improvise. Vegetarian and vegan menus stand on their own merits; allergies are handled with full separation.',
      'Oui — indiquez-le nous lors de la réservation et la cuisine s’organisera en conséquence plutôt que d’improviser. Les menus végétariens et végétaliens tiennent sur leurs propres mérites ; les allergies sont traitées avec une séparation totale.',
      'Ja — teilen Sie es uns bei der Buchung mit, dann plant die Küche richtig statt zu improvisieren. Vegetarische und vegane Menüs stehen für sich; Allergien werden mit vollständiger Trennung gehandhabt.',
      'Sí; indíquenoslo al reservar y la cocina lo planificará correctamente en lugar de improvisar. Los menús vegetarianos y veganos tienen entidad propia; las alergias se gestionan con separación total.',
    ),
  },
  {
    q: t4('Is there parking and EV charging?', 'Y a-t-il un parking et des bornes de recharge électrique ?', 'Gibt es Parkplätze und Ladestationen für Elektrofahrzeuge?', '¿Hay aparcamiento y recarga para vehículos eléctricos?'),
    a: t4(
      'Free parking on the gravel for all guests, with two 22kW EV chargers in the courtyard. No charge for charging.',
      'Parking gratuit sur le gravier pour tous les hôtes, avec deux bornes de recharge de 22 kW dans la cour. La recharge est gratuite.',
      'Kostenlose Parkplätze auf dem Kies für alle Gäste, mit zwei 22-kW-Ladestationen im Innenhof. Das Laden ist kostenlos.',
      'Aparcamiento gratuito en la grava para todos los huéspedes, con dos puntos de recarga de 22 kW en el patio. La recarga es gratuita.',
    ),
  },
  {
    q: t4('How accessible is the house?', 'Dans quelle mesure la maison est-elle accessible ?', 'Wie barrierefrei ist das Haus?', '¿Qué tan accesible es la casa?'),
    a: t4(
      'The Birnam and all ground-floor public rooms are step-free, and we have a ramp for the front steps. The house is Victorian and honest about it — call us and we will talk through your needs candidly.',
      'La chambre Birnam et toutes les pièces communes du rez-de-chaussée sont de plain-pied, et nous disposons d’une rampe pour les marches d’entrée. La maison est victorienne et l’assume — appelez-nous et nous discuterons franchement de vos besoins.',
      'Das Birnam-Zimmer und alle öffentlichen Räume im Erdgeschoss sind stufenfrei, und wir haben eine Rampe für die Eingangsstufen. Das Haus ist viktorianisch und steht offen dazu — rufen Sie uns an, und wir besprechen Ihre Bedürfnisse ganz offen.',
      'La habitación Birnam y todas las salas comunes de la planta baja están sin escalones, y disponemos de una rampa para los escalones de entrada. La casa es victoriana y lo reconoce abiertamente: llámenos y hablaremos con franqueza sobre sus necesidades.',
    ),
  },
];

export const attractions = [
  {
    name: 'Blair Castle', distance: '20 minutes',
    description: t4(
      'Seven centuries of Atholl history, white-walled and unmissable, with grounds that reward a full afternoon.',
      'Sept siècles d’histoire d’Atholl, aux murs blancs et incontournable, avec des jardins qui méritent une après-midi entière.',
      'Sieben Jahrhunderte Atholl-Geschichte, weiß getüncht und unübersehbar, mit einem Gelände, das einen ganzen Nachmittag lohnt.',
      'Siete siglos de historia de Atholl, de muros blancos e imprescindible, con unos jardines que merecen una tarde entera.',
    ),
  },
  {
    name: 'The Queen’s View', distance: '15 minutes',
    description: t4(
      'The most photographed view in Scotland, looking the length of Loch Tummel to Schiehallion. Go early, before the coaches.',
      'La vue la plus photographiée d’Écosse, qui s’étend sur toute la longueur du Loch Tummel jusqu’au Schiehallion. Allez-y tôt, avant les cars de tourisme.',
      'Der meistfotografierte Ausblick Schottlands, über die gesamte Länge des Loch Tummel bis zum Schiehallion. Gehen Sie früh hin, vor den Reisebussen.',
      'La vista más fotografiada de Escocia, que recorre todo el Loch Tummel hasta el Schiehallion. Vaya temprano, antes de que lleguen los autocares.',
    ),
  },
  {
    name: 'Pitlochry Festival Theatre', distance: '12 minutes',
    description: t4(
      'A genuinely good repertory theatre in the hills. Pre-theatre supper at the house, curtain at 7.30, nightcap by the fire after.',
      'Un véritable bon théâtre de répertoire niché dans les collines. Souper avant spectacle à la maison, lever de rideau à 19h30, digestif au coin du feu ensuite.',
      'Ein wirklich gutes Repertoiretheater in den Hügeln. Abendessen vor der Vorstellung im Haus, Vorhang um 19:30 Uhr, Schlummertrunk am Kamin danach.',
      'Un teatro de repertorio genuinamente bueno en las colinas. Cena previa al teatro en la casa, telón a las 19:30, copa junto al fuego después.',
    ),
  },
  {
    name: 'The Pass of Killiecrankie', distance: '10 minutes',
    description: t4(
      'A wooded gorge of real drama — site of the 1689 battle and the famous Soldier’s Leap. Best in October colour.',
      'Une gorge boisée d’un vrai spectacle — site de la bataille de 1689 et du célèbre Saut du Soldat. Idéal avec les couleurs d’octobre.',
      'Eine bewaldete Schlucht von echter Dramatik — Schauplatz der Schlacht von 1689 und des berühmten Soldier’s Leap. Am schönsten in den Oktoberfarben.',
      'Un desfiladero boscoso de gran dramatismo, escenario de la batalla de 1689 y el célebre Salto del Soldado. En su mejor momento con los colores de octubre.',
    ),
  },
  {
    name: 'Dunkeld & The Hermitage', distance: '25 minutes',
    description: t4(
      'A handsome cathedral town and a Douglas-fir walk to the Black Linn falls. The bakery on the square is worth the detour alone.',
      'Une belle ville cathédrale et une promenade parmi les sapins de Douglas jusqu’aux chutes de Black Linn. La boulangerie de la place vaut le détour à elle seule.',
      'Eine hübsche Kathedralenstadt und ein Spaziergang durch Douglasien bis zu den Black-Linn-Fällen. Allein die Bäckerei am Platz ist den Umweg wert.',
      'Una hermosa ciudad catedralicia y un paseo entre abetos de Douglas hasta las cascadas de Black Linn. La panadería de la plaza merece el desvío por sí sola.',
    ),
  },
  {
    name: 'Glen Ericht Distillery', distance: '10 minutes',
    description: t4(
      'The nine-person distillery behind our estate blend. Tours by arrangement through the house — ask at the desk.',
      'La distillerie de neuf personnes à l’origine de notre assemblage maison. Visites sur demande via la maison — renseignez-vous à la réception.',
      'Die neunköpfige Destillerie hinter unserem Hausverschnitt. Führungen nach Vereinbarung über das Haus — fragen Sie an der Rezeption.',
      'La destilería de nueve personas detrás de nuestra mezcla de la finca. Visitas concertadas a través de la casa: pregunte en recepción.',
    ),
  },
];

export const directions = [
  {
    mode: t4('By car', 'En voiture', 'Mit dem Auto', 'En coche'),
    detail: t4(
      'Leave the A9 at the Pitlochry junction and follow the B-road west for four miles. The gates are marked by two stone herons; the drive takes another half mile. Edinburgh and Glasgow are both around 90 minutes.',
      'Quittez l’A9 à l’échangeur de Pitlochry et suivez la route secondaire vers l’ouest sur six kilomètres. Les grilles sont signalées par deux hérons de pierre ; l’allée ajoute encore huit cents mètres. Édimbourg et Glasgow sont toutes deux à environ 90 minutes.',
      'Verlassen Sie die A9 an der Anschlussstelle Pitlochry und folgen Sie der B-Straße sechs Kilometer nach Westen. Die Tore sind an zwei steinernen Reihern zu erkennen; die Zufahrt dauert weitere achthundert Meter. Edinburgh und Glasgow sind beide etwa 90 Minuten entfernt.',
      'Salga de la A9 en el cruce de Pitlochry y siga la carretera secundaria hacia el oeste durante seis kilómetros. Las puertas están señaladas por dos garzas de piedra; el camino de entrada añade otros ochocientos metros. Edimburgo y Glasgow están ambas a unos 90 minutos.',
    ),
  },
  {
    mode: t4('By rail', 'En train', 'Mit dem Zug', 'En tren'),
    detail: t4(
      'Pitlochry station is on the Highland Main Line, with direct trains from Edinburgh, Glasgow, Inverness and the Caledonian Sleeper from London. We will collect you from the platform — just tell us your train.',
      'La gare de Pitlochry se trouve sur la ligne principale des Highlands, avec des trains directs depuis Édimbourg, Glasgow, Inverness et le train de nuit Caledonian Sleeper depuis Londres. Nous viendrons vous chercher sur le quai — indiquez-nous simplement votre train.',
      'Der Bahnhof Pitlochry liegt an der Highland Main Line, mit Direktzügen aus Edinburgh, Glasgow, Inverness und dem Caledonian Sleeper aus London. Wir holen Sie vom Bahnsteig ab — teilen Sie uns einfach Ihren Zug mit.',
      'La estación de Pitlochry está en la Highland Main Line, con trenes directos desde Edimburgo, Glasgow, Inverness y el tren nocturno Caledonian Sleeper desde Londres. Le recogeremos en el andén; solo díganos su tren.',
    ),
  },
  {
    mode: t4('By air', 'En avion', 'Mit dem Flugzeug', 'En avión'),
    detail: t4(
      'Edinburgh Airport is 90 minutes by car, Glasgow a few minutes more. Private transfers can be arranged; the drive up the A9 is the gentlest possible decompression.',
      'L’aéroport d’Édimbourg est à 90 minutes en voiture, celui de Glasgow quelques minutes de plus. Des transferts privés peuvent être organisés ; le trajet par l’A9 est la décompression la plus douce qui soit.',
      'Der Flughafen Edinburgh ist 90 Minuten mit dem Auto entfernt, Glasgow ein paar Minuten mehr. Private Transfers können arrangiert werden; die Fahrt über die A9 ist die sanftestmögliche Art der Entspannung.',
      'El aeropuerto de Edimburgo está a 90 minutos en coche, el de Glasgow unos minutos más. Se pueden organizar traslados privados; el trayecto por la A9 es la forma más suave posible de desconectar.',
    ),
  },
  {
    mode: t4('By helicopter', 'En hélicoptère', 'Mit dem Hubschrauber', 'En helicóptero'),
    detail: t4(
      'The south lawn takes a helicopter at the pilot’s discretion. Give us 48 hours’ notice and we will have the windsock up and the dram poured.',
      'La pelouse sud peut accueillir un hélicoptère, à la discrétion du pilote. Prévenez-nous 48 heures à l’avance et nous aurons la manche à air hissée et le dram servi.',
      'Der südliche Rasen kann nach Ermessen des Piloten einen Hubschrauber aufnehmen. Geben Sie uns 48 Stunden Vorlauf, und wir haben den Windsack gehisst und den Dram eingeschenkt.',
      'El jardín sur puede recibir un helicóptero a discreción del piloto. Avísenos con 48 horas de antelación y tendremos la manga de viento izada y el dram servido.',
    ),
  },
];

export const pressMentions = [
  { outlet: 'Condé Nast Traveller', quote: t4('The new benchmark for the Highland country house.', 'La nouvelle référence de l’hôtel de charme des Highlands.', 'Der neue Maßstab für das Landhotel im Hochland.', 'El nuevo referente del hotel rural de las Highlands.') },
  { outlet: 'The Times', quote: t4('Twelve rooms, four hundred acres, and not a single false note.', 'Douze chambres, quatre cents acres, et pas une seule fausse note.', 'Zwölf Zimmer, vierhundert Morgen, und nicht ein einziger falscher Ton.', 'Doce habitaciones, cuatrocientos acres, y ni una sola nota discordante.') },
  { outlet: 'Country Life', quote: t4('Craigmore does what the great houses always did — it simply does it better.', 'Craigmore fait ce que les grandes demeures ont toujours fait — elle le fait simplement mieux.', 'Craigmore tut, was die großen Häuser immer getan haben — nur besser.', 'Craigmore hace lo que las grandes casas siempre han hecho: simplemente lo hace mejor.') },
  { outlet: 'The Telegraph', quote: t4('Worth the drive north. Worth, frankly, any drive at all.', 'Le trajet vers le nord en vaut la peine. Honnêtement, n’importe quel trajet en vaudrait la peine.', 'Die Fahrt nach Norden lohnt sich. Ehrlich gesagt, lohnt sich jede Fahrt dorthin.', 'Merece la pena el viaje hacia el norte. Francamente, merece la pena cualquier viaje.') },
];

export const menus = [
  {
    name: t4('Breakfast', 'Petit-déjeuner', 'Frühstück', 'Desayuno'),
    note: t4('Served 7.30–10am, table or tray', 'Servi de 7h30 à 10h, à table ou sur plateau', 'Serviert von 7:30 bis 10 Uhr, am Tisch oder auf dem Tablett', 'Servido de 7:30 a 10:00, en mesa o en bandeja'),
    items: [
      { dish: t4('The full Craigmore', 'Le Craigmore complet', 'Das große Craigmore-Frühstück', 'El Craigmore completo'), detail: t4('Estate sausage, Stornoway black pudding, tattie scone, hen-of-the-morning eggs', 'Saucisse du domaine, boudin noir de Stornoway, galette de pommes de terre, œufs du matin', 'Wurst vom Anwesen, Stornoway Black Pudding, Kartoffelfladen, frische Eier vom Morgen', 'Salchicha de la finca, morcilla de Stornoway, tortita de patata, huevos frescos de la mañana') },
      { dish: t4('Porridge with cream and heather honey', 'Porridge à la crème et au miel de bruyère', 'Porridge mit Sahne und Heidehonig', 'Porridge con nata y miel de brezo'), detail: t4('Or with a dram, after 9am, no questions', 'Ou avec un dram, après 9h, sans poser de questions', 'Oder mit einem Dram, nach 9 Uhr, ohne Fragen', 'O con un dram, después de las 9:00, sin preguntas') },
      { dish: t4('Smoked haddock omelette', 'Omelette à l’églefin fumé', 'Omelett mit geräuchertem Schellfisch', 'Tortilla de eglefino ahumado'), detail: t4('Arbroath smokie, Mull cheddar, chives from the wall', 'Arbroath smokie, cheddar de Mull, ciboulette du mur', 'Arbroath Smokie, Mull-Cheddar, Schnittlauch von der Gartenmauer', 'Arbroath smokie, cheddar de Mull, cebollino del muro') },
      { dish: t4('Walled garden compote', 'Compote du jardin clos', 'Kompott aus dem ummauerten Garten', 'Compota del jardín amurallado'), detail: t4('Whatever Tom surrendered this week, with crowdie and oats', 'Ce que Tom a bien voulu céder cette semaine, avec du crowdie et de l’avoine', 'Was auch immer Tom diese Woche hergegeben hat, mit Crowdie und Hafer', 'Lo que Tom haya cedido esta semana, con crowdie y avena') },
    ],
  },
  {
    name: t4('Dinner — À la carte', 'Dîner — à la carte', 'Abendessen — à la carte', 'Cena — a la carta'),
    note: t4('Served 6.30–9pm in the dining room', 'Servi de 18h30 à 21h dans la salle à manger', 'Serviert von 18:30 bis 21 Uhr im Speisesaal', 'Servida de 18:30 a 21:00 en el comedor'),
    items: [
      { dish: t4('Hand-dived Orkney scallop', 'Coquille Saint-Jacques d’Orkney pêchée à la main', 'Handgetauchte Orkney-Jakobsmuschel', 'Vieira de Orkney capturada a mano'), detail: t4('Brown butter, sea aster, roe from the shell', 'Beurre noisette, aster maritime, corail du coquillage', 'Braune Butter, Strandaster, Rogen aus der Schale', 'Mantequilla avellana, aster marino, coral de la concha') },
      { dish: t4('Roe deer from the hill', 'Chevreuil de la colline', 'Reh vom Hügel', 'Corzo de la colina'), detail: t4('Loin and faggot, beetroot, blackberries, juniper', 'Longe et faggot, betterave, mûres, genièvre', 'Rücken und Faggot, Rote Bete, Brombeeren, Wacholder', 'Lomo y faggot, remolacha, moras, enebro') },
      { dish: t4('Tay salmon, when the river allows', 'Saumon de la Tay, quand la rivière le permet', 'Tay-Lachs, wenn der Fluss es zulässt', 'Salmón del Tay, cuando el río lo permite'), detail: t4('Sorrel, garden cucumber, smoked bone sauce', 'Oseille, concombre du jardin, sauce aux os fumés', 'Sauerampfer, Gartengurke, Sauce aus geräucherten Knochen', 'Acedera, pepino del jardín, salsa de hueso ahumado') },
      { dish: t4('Gooseberry and elderflower tart', 'Tarte à la groseille à maquereau et à la fleur de sureau', 'Stachelbeer-Holunderblüten-Tarte', 'Tarta de grosella espinosa y flor de saúco'), detail: t4('From the south wall, with meadowsweet cream', 'Du mur sud, avec une crème à la reine-des-prés', 'Von der Südmauer, mit Mädesüß-Creme', 'Del muro sur, con crema de ulmaria') },
    ],
  },
  {
    name: t4('The Tasting Menu', 'Le menu dégustation', 'Das Degustationsmenü', 'El menú degustación'),
    note: t4('Six courses, whole table, £95 — with pairings £150', 'Six services, table entière, 95 £ — avec accords mets-vins 150 £', 'Sechs Gänge, für den ganzen Tisch, 95 £ — mit Weinbegleitung 150 £', 'Seis platos, para toda la mesa, 95 £ — con maridaje 150 £'),
    items: [
      { dish: t4('Six courses from the estate', 'Six services du domaine', 'Sechs Gänge vom Anwesen', 'Seis platos de la finca'), detail: t4('The glen, the river, the garden and the cellar, in that order', 'Le glen, la rivière, le jardin et la cave, dans cet ordre', 'Das Tal, der Fluss, der Garten und der Keller, in dieser Reihenfolge', 'El valle, el río, el jardín y la bodega, en ese orden') },
      { dish: t4('Pairings from the cellar', 'Accords de la cave', 'Weinbegleitung aus dem Keller', 'Maridaje de la bodega'), detail: t4('Old-world wines and the occasional insubordinate dram', 'Vins de l’Ancien Monde et, à l’occasion, un dram insubordonné', 'Weine der Alten Welt und gelegentlich ein widerspenstiger Dram', 'Vinos del Viejo Mundo y, de vez en cuando, un dram insubordinado') },
      { dish: t4('The cheese course', 'Le plateau de fromages', 'Der Käsegang', 'El plato de quesos'), detail: t4('A trolley of Scottish farmhouse cheeses, oatcakes baked at 4pm', 'Un chariot de fromages fermiers écossais, galettes d’avoine cuites à 16h', 'Ein Wagen mit schottischen Bauernhofkäsen, um 16 Uhr gebackene Haferkekse', 'Un carrito de quesos artesanos escoceses, galletas de avena horneadas a las 16:00') },
      { dish: t4('To finish', 'Pour finir', 'Zum Abschluss', 'Para terminar'), detail: t4('The estate blend, by the fire, in no hurry whatsoever', 'L’assemblage du domaine, au coin du feu, sans la moindre hâte', 'Der Hausverschnitt, am Kamin, ganz ohne Eile', 'La mezcla de la finca, junto al fuego, sin ninguna prisa') },
    ],
  },
];

export const voucherTypes = [
  {
    name: t4('The Monetary Voucher', 'Le bon d’achat', 'Der Wertgutschein', 'El vale monetario'),
    price: 'From £50',
    description: t4(
      'Any amount from fifty pounds, valid against rooms, dinner, the cellar and every experience on the estate. The flexible option for people whose taste you trust.',
      'N’importe quel montant à partir de cinquante livres, valable sur les chambres, le dîner, la cave et toutes les expériences du domaine. L’option flexible pour les personnes dont vous connaissez les goûts.',
      'Jeder Betrag ab fünfzig Pfund, einlösbar für Zimmer, Abendessen, den Keller und jedes Erlebnis auf dem Anwesen. Die flexible Option für Menschen, deren Geschmack Sie vertrauen.',
      'Cualquier importe a partir de cincuenta libras, válido para habitaciones, cena, la bodega y todas las experiencias de la finca. La opción flexible para quienes confían en el gusto de otra persona.',
    ),
    image: IMG.exterior,
  },
  {
    name: t4('Dinner for Two', 'Dîner pour deux', 'Abendessen für zwei', 'Cena para dos'),
    price: '£190',
    description: t4(
      'The six-course tasting menu for two, with a glass of champagne in the library first. The kitchen’s full argument, made on someone else’s behalf.',
      'Le menu dégustation six services pour deux, avec une coupe de champagne à la bibliothèque en préambule. L’argumentaire complet de la cuisine, offert de votre part.',
      'Das sechsgängige Degustationsmenü für zwei, zuvor ein Glas Champagner in der Bibliothek. Das vollständige Plädoyer der Küche, in Ihrem Namen überreicht.',
      'El menú degustación de seis platos para dos, con una copa de champán en la biblioteca antes. El argumento completo de la cocina, ofrecido en nombre de otra persona.',
    ),
    image: IMG.dining1,
  },
  {
    name: t4('The Night Away', 'La nuit d’évasion', 'Die Auszeit-Übernachtung', 'La noche de escapada'),
    price: 'From £340',
    description: t4(
      'A night in a deluxe room with breakfast and dinner for two. The gift that is actually an instruction: go to the glen, switch the phone off.',
      'Une nuit en chambre Deluxe avec petit-déjeuner et dîner pour deux. Le cadeau qui est en réalité une instruction : allez au glen, éteignez le téléphone.',
      'Eine Nacht in einem Deluxe-Zimmer mit Frühstück und Abendessen für zwei. Das Geschenk, das eigentlich eine Anweisung ist: fahren Sie ins Tal, schalten Sie das Telefon aus.',
      'Una noche en una habitación Deluxe con desayuno y cena para dos. El regalo que en realidad es una instrucción: vaya al valle, apague el teléfono.',
    ),
    image: IMG.room3,
  },
];
