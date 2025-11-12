export interface DestinationInfo {
  id: string
  name: string
  image: string
  summary: string
  priceRange?: string
  highlights: string[]
  bestSeason?: string
  link?: string
}

const DESTINATION_CATALOG: Record<string, DestinationInfo> = {
  cartagena: {
    id: "cartagena",
    name: "Cartagena de Indias, Colombia",
    image: "/images/destinations/cartagena.jpg",
    summary: "Ciudad amurallada, playas caribeñas y vida nocturna vibrante.",
    priceRange: "$120 – $250 por noche",
    highlights: [
      "Centro histórico Patrimonio UNESCO",
      "Castillo de San Felipe",
      "Excursiones a Islas del Rosario",
    ],
    bestSeason: "Diciembre a abril",
    link: "https://www.cartagenadeindias.travel/",
  },
  medellin: {
    id: "medellin",
    name: "Medellín, Colombia",
    image: "/images/destinations/medellin.jpg",
    summary: "Clima primaveral, innovación urbana y paisajes montañosos.",
    priceRange: "$80 – $200 por noche",
    highlights: [
      "Comuna 13 y sus graffitis",
      "Metrocable y vistas panorámicas",
      "Excursión a Guatapé y el Peñol",
    ],
    bestSeason: "Todo el año",
  },
  bogota: {
    id: "bogota",
    name: "Bogotá, Colombia",
    image: "/images/destinations/bogota.jpg",
    summary: "Capital cultural, museos de primer nivel y gastronomía en auge.",
    priceRange: "$90 – $220 por noche",
    highlights: [
      "Museo del Oro y Museo Botero",
      "Monserrate y La Candelaria",
      "Escena gastronómica en Zona G",
    ],
    bestSeason: "Junio a septiembre (menos lluvia)",
  },
  tayrona: {
    id: "tayrona",
    name: "Parque Tayrona, Colombia",
    image: "/images/destinations/tayrona.jpg",
    summary: "Selva tropical, playas vírgenes y biodiversidad en la costa Caribe.",
    priceRange: "$60 – $180 por noche",
    highlights: [
      "Cabo San Juan del Guía",
      "Senderos por la selva",
      "Snorkel en La Piscina",
    ],
    bestSeason: "Diciembre a marzo",
  },
  sanandres: {
    id: "sanandres",
    name: "San Andrés, Colombia",
    image: "/images/destinations/sanandres.jpg",
    summary: "Playas de arena blanca y el famoso mar de los siete colores.",
    priceRange: "$110 – $260 por noche",
    highlights: [
      "Johnny Cay y Acuario",
      "Buceo en arrecifes coralinos",
      "Spratt Bight y Cayo Bolívar",
    ],
    bestSeason: "Enero a abril",
  },
  cancun: {
    id: "cancun",
    name: "Cancún, México",
    image: "/images/destinations/cancun.jpg",
    summary: "Resorts frente al mar, ruinas mayas cercanas y vida nocturna energética.",
    priceRange: "$150 – $400 por noche",
    highlights: [
      "Playas de la Zona Hotelera",
      "Chichén Itzá y Tulum",
      "Isla Mujeres",
    ],
    bestSeason: "Diciembre a abril",
  },
  tulum: {
    id: "tulum",
    name: "Tulum, México",
    image: "/images/destinations/tulum.jpg",
    summary: "Ruinas frente al mar, cenotes cristalinos y hoteles boutique.",
    priceRange: "$140 – $350 por noche",
    highlights: [
      "Ruinas Mayas en los acantilados",
      "Cenotes Dos Ojos y Gran Cenote",
      "Reserva de Sian Ka’an",
    ],
    bestSeason: "Noviembre a abril",
  },
  newyork: {
    id: "newyork",
    name: "Nueva York, Estados Unidos",
    image: "/images/destinations/newyork.jpg",
    summary: "Ciudad icónica con arte, gastronomía, Broadway y rascacielos legendarios.",
    priceRange: "$180 – $500 por noche",
    highlights: [
      "Times Square y Broadway",
      "Central Park",
      "Museo Metropolitano y MoMA",
    ],
    bestSeason: "Abril-junio o septiembre-octubre",
  },
  miami: {
    id: "miami",
    name: "Miami, Estados Unidos",
    image: "/images/destinations/miami.jpg",
    summary: "Playas, Art Deco, compras y vibrante vida nocturna latina.",
    priceRange: "$170 – $420 por noche",
    highlights: [
      "South Beach y Ocean Drive",
      "Wynwood Walls",
      "Little Havana",
    ],
    bestSeason: "Noviembre a abril",
  },
  paris: {
    id: "paris",
    name: "París, Francia",
    image: "/images/destinations/paris.jpg",
    summary: "Capital romántica con museos emblemáticos y gastronomía exquisita.",
    priceRange: "€150 – €400 por noche",
    highlights: [
      "Torre Eiffel y Louvre",
      "Catedral de Notre Dame",
      "Barrio de Montmartre",
    ],
    bestSeason: "Abril-junio o septiembre-octubre",
  },
  barcelona: {
    id: "barcelona",
    name: "Barcelona, España",
    image: "/images/destinations/barcelona.jpg",
    summary: "Arquitectura modernista, playas urbanas y cultura mediterránea.",
    priceRange: "€120 – €320 por noche",
    highlights: [
      "Sagrada Familia y Park Güell",
      "Las Ramblas y Barrio Gótico",
      "Playas de la Barceloneta",
    ],
    bestSeason: "Mayo, junio, septiembre",
  },
  madrid: {
    id: "madrid",
    name: "Madrid, España",
    image: "/images/destinations/madrid.jpg",
    summary: "Capital cultural con museos de renombre y vibrante vida nocturna.",
    priceRange: "€100 – €280 por noche",
    highlights: [
      "Museo del Prado",
      "Parque del Retiro",
      "Barrio de La Latina",
    ],
    bestSeason: "Marzo-junio o septiembre-noviembre",
  },
  rome: {
    id: "rome",
    name: "Roma, Italia",
    image: "/images/destinations/rome.jpg",
    summary: "Historia milenaria, ruinas romanas y cocina italiana auténtica.",
    priceRange: "€110 – €300 por noche",
    highlights: [
      "Coliseo y Foro Romano",
      "Fontana di Trevi",
      "Ciudad del Vaticano",
    ],
    bestSeason: "Abril-junio o septiembre-octubre",
  },
  santorini: {
    id: "santorini",
    name: "Santorini, Grecia",
    image: "/images/destinations/santorini.jpg",
    summary: "Acantilados volcánicos, pueblos blancos y puestas de sol inolvidables.",
    priceRange: "€180 – €450 por noche",
    highlights: [
      "Oia y Fira",
      "Playas Roja y Negra",
      "Cruceros por la caldera",
    ],
    bestSeason: "Mayo-junio o septiembre",
  },
  dubai: {
    id: "dubai",
    name: "Dubái, Emiratos Árabes Unidos",
    image: "/images/destinations/dubai.jpg",
    summary: "Rascacielos futuristas, lujo sin límites y desierto a minutos.",
    priceRange: "$160 – $500 por noche",
    highlights: [
      "Burj Khalifa y Dubai Mall",
      "Palm Jumeirah",
      "Safari por el desierto",
    ],
    bestSeason: "Noviembre a marzo",
  },
  bali: {
    id: "bali",
    name: "Bali, Indonesia",
    image: "/images/destinations/bali.jpg",
    summary: "Isla tropical con templos, arrozales y playas para surf.",
    priceRange: "$70 – $220 por noche",
    highlights: [
      "Templo de Uluwatu",
      "Arrozales de Ubud",
      "Playas de Seminyak y Canggu",
    ],
    bestSeason: "Abril a octubre",
  },
  tokyo: {
    id: "tokyo",
    name: "Tokio, Japón",
    image: "/images/destinations/tokyo.jpg",
    summary: "Megaciudad futurista con contraste de tradición y tecnología.",
    priceRange: "¥12,000 – ¥35,000 por noche",
    highlights: [
      "Shibuya y Shinjuku",
      "Templo Sensoji",
      "Mercado de Tsukiji",
    ],
    bestSeason: "Marzo-abril (sakura) o octubre-noviembre",
  },
  sydney: {
    id: "sydney",
    name: "Sídney, Australia",
    image: "/images/destinations/sydney.jpg",
    summary: "Icono australiano con playas, ópera y clima templado.",
    priceRange: "AU$140 – AU$350 por noche",
    highlights: [
      "Ópera y Harbour Bridge",
      "Bondi Beach",
      "Royal Botanic Garden",
    ],
    bestSeason: "Septiembre-noviembre o marzo-mayo",
  },
  capetown: {
    id: "capetown",
    name: "Ciudad del Cabo, Sudáfrica",
    image: "/images/destinations/capetown.jpg",
    summary: "Naturaleza espectacular entre montaña y océano.",
    priceRange: "$100 – $280 por noche",
    highlights: [
      "Table Mountain",
      "Cabo de Buena Esperanza",
      "Viñedos de Stellenbosch",
    ],
    bestSeason: "Octubre-abril",
  },
  queenstown: {
    id: "queenstown",
    name: "Queenstown, Nueva Zelanda",
    image: "/images/destinations/queenstown.jpg",
    summary: "Capital mundial de la aventura rodeada de paisajes alpinos.",
    priceRange: "$150 – $320 por noche",
    highlights: [
      "Deportes de aventura",
      "Milford Sound",
      "Lago Wakatipu",
    ],
    bestSeason: "Diciembre-febrero (verano) o junio-agosto (ski)",
  },
  marrakech: {
    id: "marrakech",
    name: "Marrakech, Marruecos",
    image: "/images/destinations/marrakech.jpg",
    summary: "Palacios, zocos y sabores intensos en la Puerta del Desierto.",
    priceRange: "$90 – $250 por noche",
    highlights: [
      "Plaza Jemaa el-Fna",
      "Jardines Majorelle",
      "Palacio Bahía",
    ],
    bestSeason: "Marzo-mayo o septiembre-noviembre",
  },
  reykjavik: {
    id: "reykjavik",
    name: "Reikiavik, Islandia",
    image: "/images/destinations/reykjavik.jpg",
    summary: "Capital nórdica ideal para auroras boreales y termas geotérmicas.",
    priceRange: "$180 – $420 por noche",
    highlights: [
      "Blue Lagoon",
      "Hallgrímskirkja",
      "Golden Circle",
    ],
    bestSeason: "Septiembre-marzo (auroras) / junio-agosto (verano)",
  },

  // === Destinos nuevos para experiencias ===
  banff: {
    id: "banff",
    name: "Banff, Canadá",
    image: "/images/destinations/banff.jpg",
    summary: "Lagos turquesa, picos rocosos y vida salvaje en las Montañas Rocosas.",
    priceRange: "$120 – $280 por noche",
    highlights: ["Lake Louise", "Moraine Lake", "Banff Gondola"],
    bestSeason: "Junio a septiembre",
  },
  zermatt: {
    id: "zermatt",
    name: "Zermatt, Suiza",
    image: "/images/destinations/zermatt.jpg",
    summary: "Pueblo alpino icónico al pie del Matterhorn.",
    priceRange: "CHF 150 – 380 por noche",
    highlights: ["Matterhorn", "Gornergrat Bahn", "Ski todo el año"],
    bestSeason: "Diciembre-marzo (ski) / junio-septiembre (verano)",
  },
  chamonix: {
    id: "chamonix",
    name: "Chamonix, Francia",
    image: "/images/destinations/chamonix.jpg",
    summary: "Capital del alpinismo al pie del Mont Blanc.",
    priceRange: "€120 – €300 por noche",
    highlights: ["Aiguille du Midi", "Mer de Glace", "Senderos alpinos"],
    bestSeason: "Invierno (ski) / verano (trekking)",
  },
  interlaken: {
    id: "interlaken",
    name: "Interlaken, Suiza",
    image: "/images/destinations/interlaken.jpg",
    summary: "Entre lagos y montañas, epicentro de deportes de aventura.",
    priceRange: "CHF 130 – 300 por noche",
    highlights: ["Lagos Thun y Brienz", "Jungfrau", "Parapente"],
    bestSeason: "Mayo a septiembre",
  },
  hallstatt: {
    id: "hallstatt",
    name: "Hallstatt, Austria",
    image: "/images/destinations/hallstatt.jpg",
    summary: "Pueblo alpino de cuento junto a un lago cristalino.",
    priceRange: "€110 – €260 por noche",
    highlights: ["Lago Hallstatt", "Miradores panorámicos", "Arquitectura alpina"],
    bestSeason: "Mayo a octubre",
  },
  sedona: {
    id: "sedona",
    name: "Sedona, Estados Unidos",
    image: "/images/destinations/sedona.jpg",
    summary: "Formaciones rocosas rojas, rutas de senderismo y onsen espirituales.",
    priceRange: "$100 – $220 por noche",
    highlights: ["Cathedral Rock", "Bell Rock", "Chapel of the Holy Cross"],
    bestSeason: "Marzo-mayo, septiembre-noviembre",
  },
  yosemite: {
    id: "yosemite",
    name: "Parque Yosemite, Estados Unidos",
    image: "/images/destinations/yosemite.jpg",
    summary: "Valles glaciares, cascadas y paredes de granito legendarias.",
    priceRange: "$120 – $300 por noche",
    highlights: ["El Capitan", "Half Dome", "Yosemite Falls"],
    bestSeason: "Mayo a octubre",
  },
  niseko: {
    id: "niseko",
    name: "Niseko, Japón",
    image: "/images/destinations/niseko.jpg",
    summary: "Nieve polvo de clase mundial, vistas al Monte Yōtei y onsen tradicionales.",
    priceRange: "¥14,000 – ¥35,000 por noche",
    highlights: ["Ski powder", "Monte Yōtei", "Onsen"],
    bestSeason: "Diciembre a marzo",
  },
  cortina: {
    id: "cortina",
    name: "Cortina d’Ampezzo, Italia",
    image: "/images/destinations/cortina.jpg",
    summary: "Dolomitas italianas con glamur alpino, ski y rutas panorámicas.",
    priceRange: "€140 – €320 por noche",
    highlights: ["Dolomitas", "Ski & snowboard", "Excursiones panorámicas"],
    bestSeason: "Invierno y verano",
  },
  bled: {
    id: "bled",
    name: "Lago Bled, Eslovenia",
    image: "/images/destinations/bled.jpg",
    summary: "Lago esmeralda, isla con iglesia y castillo medieval en las alturas.",
    priceRange: "€90 – €220 por noche",
    highlights: ["Isla de Bled", "Castillo de Bled", "Barcas tradicionales"],
    bestSeason: "Mayo a septiembre",
  },
  maldives: {
    id: "maldives",
    name: "Maldivas",
    image: "/images/destinations/maldives.jpg",
    summary: "Atolones con aguas turquesa y bungalows sobre el mar.",
    priceRange: "$250 – $800 por noche",
    highlights: ["Snorkel", "Resorts de lujo", "Playas prístinas"],
    bestSeason: "Noviembre a abril",
  },
  seychelles: {
    id: "seychelles",
    name: "Seychelles",
    image: "/images/destinations/seychelles.jpg",
    summary: "Playas de granito, aguas cristalinas y naturaleza virgen.",
    priceRange: "$200 – $600 por noche",
    highlights: ["Anse Source d’Argent", "Praslin", "La Digue"],
    bestSeason: "Abril-mayo y octubre-noviembre",
  },
  borabora: {
    id: "borabora",
    name: "Bora Bora, Polinesia",
    image: "/images/destinations/borabora.jpg",
    summary: "Laguna azul icónica y villas sobre el agua.",
    priceRange: "$300 – $900 por noche",
    highlights: ["Overwater bungalows", "Laguna turquesa", "Corales"],
    bestSeason: "Mayo a octubre",
  },
  phuket: {
    id: "phuket",
    name: "Phuket, Tailandia",
    image: "/images/destinations/phuket.jpg",
    summary: "Playas tropicales, templos tailandeses y excursiones a Phi Phi.",
    priceRange: "$60 – $200 por noche",
    highlights: ["Islas Phi Phi", "Bahía Phang Nga", "Phuket histórico"],
    bestSeason: "Noviembre a marzo",
  },
  maui: {
    id: "maui",
    name: "Maui, Hawái",
    image: "/images/destinations/maui.jpg",
    summary: "Playas, Road to Hana y amanecer en el cráter Haleakalā.",
    priceRange: "$180 – $450 por noche",
    highlights: ["Haleakalā", "Road to Hana", "Molokini"],
    bestSeason: "Abril-mayo y septiembre-octubre",
  },
  zanzibar: {
    id: "zanzibar",
    name: "Zanzíbar, Tanzania",
    image: "/images/destinations/zanzibar.jpg",
    summary: "Playas de arena blanca, Stone Town Patrimonio UNESCO y buceo.",
    priceRange: "$90 – $250 por noche",
    highlights: ["Nungwi", "Paje", "Stone Town"],
    bestSeason: "Junio-octubre y diciembre-febrero",
  },
  amalfi: {
    id: "amalfi",
    name: "Costa Amalfitana, Italia",
    image: "/images/destinations/amalfi.jpg",
    summary: "Pueblos en acantilados, mar Tirreno y gastronomía mediterránea.",
    priceRange: "€150 – €380 por noche",
    highlights: ["Positano", "Amalfi", "Ravello"],
    bestSeason: "Mayo-junio y septiembre",
  },
  algarve: {
    id: "algarve",
    name: "Algarve, Portugal",
    image: "/images/destinations/algarve.jpg",
    summary: "Acantilados dorados, cuevas marinas y playas espectaculares.",
    priceRange: "€80 – €220 por noche",
    highlights: ["Benagil", "Ponta da Piedade", "Lagos"],
    bestSeason: "Mayo a septiembre",
  },
  tahiti: {
    id: "tahiti",
    name: "Tahití, Polinesia",
    image: "/images/destinations/tahiti.jpg",
    summary: "Isla volcánica con selva tropical y cultura polinesia.",
    priceRange: "$180 – $420 por noche",
    highlights: ["Papeete", "Mont Aorai", "Playas negras"],
    bestSeason: "Mayo a octubre",
  },
  amsterdam: {
    id: "amsterdam",
    name: "Ámsterdam, Países Bajos",
    image: "/images/destinations/amsterdam.jpg",
    summary: "Canales, museos de primer nivel y vida urbana relajada.",
    priceRange: "€120 – €320 por noche",
    highlights: ["Rijksmuseum", "Casa de Ana Frank", "Bicicletas"],
    bestSeason: "Abril a septiembre",
  },
  prague: {
    id: "prague",
    name: "Praga, República Checa",
    image: "/images/destinations/prague.jpg",
    summary: "Arquitectura gótica y barroca con ambiente medieval.",
    priceRange: "€90 – €220 por noche",
    highlights: ["Puente de Carlos", "Castillo de Praga", "Reloj Astronómico"],
    bestSeason: "Mayo-junio y septiembre",
  },
}

export function findDestinations(names: string[]): DestinationInfo[] {
  const normalized = names.map((n) => n.trim().toLowerCase())
  const seen = new Set<string>()

  return normalized.reduce<DestinationInfo[]>((acc, name) => {
    const key = Object.keys(DESTINATION_CATALOG).find((k) => name.includes(k))
    if (key && !seen.has(key)) {
      acc.push(DESTINATION_CATALOG[key])
      seen.add(key)
    }
    return acc
  }, [])
}

export function featuredFallback(): DestinationInfo[] {
  return Object.values(DESTINATION_CATALOG)
}

const CATEGORY_DESTINATIONS: Record<string, string[]> = {
  "casas-completas": [
    "amsterdam", "prague", "banff", "maui", "zanzibar",
    "algarve", "amalfi", "interlaken", "hallstatt", "sedona",
  ],
  apartamentos: [
    "amsterdam", "prague", "barcelona", "madrid", "paris",
    "newyork", "miami", "rome", "tokyo", "dubai",
  ],
  cabanas: [
    "bled", "niseko", "banff", "hallstatt", "yosemite",
    "sedona", "interlaken", "chamonix", "cortina", "queenstown",
  ],
  "frente-al-mar": [
    "maldives", "seychelles", "borabora", "phuket", "maui",
    "zanzibar", "amalfi", "algarve", "tahiti", "sanandres",
  ],
  montana: [
    "banff", "zermatt", "chamonix", "interlaken", "hallstatt",
    "sedona", "yosemite", "niseko", "cortina", "bled",
  ],
  unicos: [
    "borabora", "tahiti", "seychelles", "amalfi", "algarve",
    "niseko", "chamonix", "zermatt", "banff", "yosemite",
  ],
}

export function getDestinationsByCategory(
  categoryKey: string,
  limit = 10,
  excludeIds: string[] = []
): DestinationInfo[] {
  const ids = (CATEGORY_DESTINATIONS[categoryKey.toLowerCase()] || []).filter(
    (id) => !excludeIds.includes(id)
  )
  return ids
    .map((id) => DESTINATION_CATALOG[id])
    .filter(Boolean)
    .slice(0, limit)
}

