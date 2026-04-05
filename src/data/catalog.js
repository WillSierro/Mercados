import productImages from "./productImages";

export const categories = [
  "Todas",
  "Mercearia",
  "Bebidas",
  "Acougue",
  "Padaria",
  "Hortifruti",
  "Frios",
  "Pescados",
  "Limpeza",
  "Bazar",
  "Pet"
];

export const sortOptions = [
  { value: "relevance", label: "Relevancia" },
  { value: "discount", label: "Maior desconto" },
  { value: "price-low", label: "Menor preco" },
  { value: "price-high", label: "Maior preco" }
];

export const colorOptions = [
  { value: "amber", label: "Amarelo" },
  { value: "blue", label: "Azul" },
  { value: "red", label: "Vermelho" },
  { value: "mint", label: "Verde" }
];

export const stores = [
  {
    id: "jales",
    name: "Sakashita - Jales",
    address: "Loja participante do panfleto FDS da Economia",
    neighborhood: "Jales",
    distance: "2 km"
  },
  {
    id: "santa-fe",
    name: "Sakashita - Santa Fe do Sul",
    address: "Loja participante do panfleto FDS da Economia",
    neighborhood: "Santa Fe do Sul",
    distance: "5 km"
  },
  {
    id: "fernandopolis",
    name: "Sakashita - Fernandopolis",
    address: "Loja participante do panfleto FDS da Economia",
    neighborhood: "Fernandopolis",
    distance: "8 km"
  },
  {
    id: "ouroeste",
    name: "Sakashita - Ouroeste",
    address: "Loja participante do panfleto FDS da Economia",
    neighborhood: "Ouroeste",
    distance: "11 km"
  },
  {
    id: "guararapes",
    name: "Sakashita - Guararapes",
    address: "Loja participante do panfleto FDS da Economia",
    neighborhood: "Guararapes",
    distance: "14 km"
  },
  {
    id: "mirandopolis",
    name: "Sakashita - Mirandopolis",
    address: "Loja participante do panfleto FDS da Economia",
    neighborhood: "Mirandopolis",
    distance: "18 km"
  }
];

export function createOfferId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `offer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createFutureDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}

const PANFLETO_END = "2026-04-05";
let seedCounter = 0;

function createSeedOffer(config) {
  seedCounter += 1;

  return {
    id: createOfferId(),
    description: "Oferta de teste baseada no encarte da Sakashita.",
    unit: "unidade",
    validUntil: PANFLETO_END,
    badge: "FDS da Economia",
    color: "amber",
    featured: false,
    club: false,
    active: true,
    allStores: true,
    storeId: stores[0].id,
    modes: ["delivery", "pickup"],
    createdAt: Date.now() + seedCounter,
    ...config,
    oldPrice: config.oldPrice ?? config.price
  };
}

export const seedOffers = [
  createSeedOffer({
    title: "Arroz Tio Nobre Tipo 1 5kg",
    description: "Pacote destaque da abertura do encarte.",
    category: "Mercearia",
    price: 23.9,
    unit: "pacote",
    featured: true
  }),
  createSeedOffer({
    title: "Acucar Refinado Alto Alegre 1kg",
    category: "Mercearia",
    price: 2.98,
    unit: "pacote"
  }),
  createSeedOffer({
    title: "Azeite Extra Virgem Borges 500ml",
    category: "Mercearia",
    price: 27.99,
    unit: "vidro",
    color: "mint",
    featured: true
  }),
  createSeedOffer({
    title: "Batata Ondulada Keleck 45g",
    category: "Mercearia",
    price: 2.99
  }),
  createSeedOffer({
    title: "Amendoim Crocante Keleck 400g",
    category: "Mercearia",
    price: 10.98,
    unit: "pacote"
  }),
  createSeedOffer({
    title: "Refrigerante Coca-Cola Pet 2L",
    description: "Bebida de alto giro para testar o destaque no app.",
    category: "Bebidas",
    price: 9.98,
    unit: "garrafa",
    color: "red",
    featured: true
  }),
  createSeedOffer({
    title: "Molho Tare Sakura 180ml",
    category: "Mercearia",
    price: 8.99
  }),
  createSeedOffer({
    title: "Molho Shoyu Sakura 150ml",
    category: "Mercearia",
    price: 4.99
  }),
  createSeedOffer({
    title: "Bebida Lactea Piracanjuba 250ml",
    description: "Preco promocional do clube de vantagens.",
    category: "Bebidas",
    price: 4.99,
    oldPrice: 5.99,
    badge: "Clube Sakashita",
    color: "mint",
    featured: true,
    club: true
  }),
  createSeedOffer({
    title: "Extrato de Tomate Elefante 300g Kit 2un",
    category: "Mercearia",
    price: 12.98,
    unit: "kit",
    color: "red"
  }),
  createSeedOffer({
    title: "Maionese Tradicional Liza 450g",
    category: "Mercearia",
    price: 6.49
  }),
  createSeedOffer({
    title: "Leite Condensado Piracanjuba TP 395g",
    category: "Mercearia",
    price: 5.98
  }),
  createSeedOffer({
    title: "Creme de Leite Mococa 200g",
    category: "Mercearia",
    price: 2.69,
    color: "blue"
  }),
  createSeedOffer({
    title: "Mistura de Creme de Leite Mococa 200g",
    category: "Mercearia",
    price: 1.69,
    color: "blue"
  }),
  createSeedOffer({
    title: "Leite em Po Ninho 380g",
    description: "Integral ou instantaneo conforme o panfleto.",
    category: "Mercearia",
    price: 16.99,
    unit: "lata",
    featured: true
  }),
  createSeedOffer({
    title: "Tempero Sazon 60g",
    category: "Mercearia",
    price: 4.99
  }),
  createSeedOffer({
    title: "Agua Mineral Levity 510ml",
    category: "Bebidas",
    price: 1.99,
    color: "blue"
  }),
  createSeedOffer({
    title: "Energetico Invasion Latao 473ml",
    category: "Bebidas",
    price: 3.99,
    color: "blue"
  }),
  createSeedOffer({
    title: "Cerveja Skol 350ml Caixa 12un",
    category: "Bebidas",
    price: 38.28,
    unit: "caixa",
    featured: true
  }),
  createSeedOffer({
    title: "Cerveja Antarctica Original 350ml",
    category: "Bebidas",
    price: 3.99
  }),
  createSeedOffer({
    title: "Cerveja Heineken Long Neck 330ml",
    category: "Bebidas",
    price: 5.98,
    color: "mint"
  }),
  createSeedOffer({
    title: "Cerveja Puro Malte Pilsen 3.0 350ml",
    category: "Bebidas",
    price: 2.29,
    color: "blue"
  }),
  createSeedOffer({
    title: "Cerveja Michelob Ultra Long Neck 330ml",
    category: "Bebidas",
    price: 5.98,
    color: "mint"
  }),
  createSeedOffer({
    title: "Whisky Jack Daniel's 1L",
    category: "Bebidas",
    price: 149.9,
    unit: "garrafa",
    color: "red",
    featured: true
  }),
  createSeedOffer({
    title: "Ponta de Peito Bovina kg",
    category: "Acougue",
    price: 32.9,
    unit: "kg",
    color: "red",
    featured: true
  }),
  createSeedOffer({
    title: "Contra File Bovino kg",
    category: "Acougue",
    price: 42.9,
    unit: "kg",
    color: "red",
    featured: true
  }),
  createSeedOffer({
    title: "Linguica Toscana Perdigao Na Brasa kg",
    category: "Acougue",
    price: 18.99,
    unit: "kg",
    color: "red"
  }),
  createSeedOffer({
    title: "Queijo de Coalho Saboroso 340g",
    category: "Frios",
    price: 21.9,
    unit: "pacote",
    color: "mint"
  }),
  createSeedOffer({
    title: "Coxinha da Asa Seara 1kg",
    category: "Frios",
    price: 12.99,
    unit: "pacote",
    color: "red"
  }),
  createSeedOffer({
    title: "Salame Tipo Hamburgues Sadia 100g",
    category: "Frios",
    price: 12.99,
    unit: "pacote",
    color: "red"
  }),
  createSeedOffer({
    title: "Pao de Alho Zinho 300g",
    category: "Padaria",
    price: 10.99,
    unit: "pacote"
  }),
  createSeedOffer({
    title: "File de Merluza Iglu 800g",
    category: "Pescados",
    price: 28.9,
    unit: "pacote",
    color: "blue"
  }),
  createSeedOffer({
    title: "Sardinha Inteira Iglu 800g",
    category: "Pescados",
    price: 12.9,
    unit: "pacote",
    color: "blue"
  }),
  createSeedOffer({
    title: "File de Tilapia Brazilian Fish 800g",
    category: "Pescados",
    price: 39.9,
    unit: "pacote",
    color: "blue",
    featured: true
  }),
  createSeedOffer({
    title: "File de Salmao Brazilian Fish 500g",
    category: "Pescados",
    price: 49.9,
    oldPrice: 59.9,
    unit: "pacote",
    badge: "Clube Sakashita",
    color: "red",
    featured: true,
    club: true
  }),
  createSeedOffer({
    title: "Camarao Cinza Brazilian Fish 400g",
    category: "Pescados",
    price: 49.9,
    unit: "pacote",
    color: "blue"
  }),
  createSeedOffer({
    title: "Posta de Tilapia Brazilian Fish 700g",
    category: "Pescados",
    price: 21.9,
    unit: "pacote",
    color: "blue"
  }),
  createSeedOffer({
    title: "Iscas de Tilapia Brazilian Fish 300g",
    category: "Pescados",
    price: 12.98,
    unit: "pacote",
    color: "blue"
  }),
  createSeedOffer({
    title: "Biscoito Renata Cristal 420g",
    category: "Mercearia",
    price: 5.98
  }),
  createSeedOffer({
    title: "Palmito Pupunha Magno 300g",
    category: "Mercearia",
    price: 19.9
  }),
  createSeedOffer({
    title: "Nestle Especialidades 251g",
    category: "Mercearia",
    price: 12.98
  }),
  createSeedOffer({
    title: "Chocolate Nestle Tablete 80g",
    category: "Mercearia",
    price: 6.99,
    oldPrice: 7.99,
    badge: "Clube Sakashita",
    color: "amber",
    featured: true,
    club: true
  }),
  createSeedOffer({
    title: "Ferrero Rocher 100g",
    category: "Mercearia",
    price: 29.9,
    unit: "caixa"
  }),
  createSeedOffer({
    title: "Creme de Avela Nutella 350g",
    category: "Mercearia",
    price: 29.99,
    unit: "pote"
  }),
  createSeedOffer({
    title: "Lacta Bis 100,8g",
    category: "Mercearia",
    price: 6.99
  }),
  createSeedOffer({
    title: "Chocolate Nestle Recheado 90g",
    category: "Mercearia",
    price: 6.99,
    oldPrice: 7.99,
    badge: "Clube Sakashita",
    color: "amber",
    club: true
  }),
  createSeedOffer({
    title: "Suco Aurora TP 1,5L",
    category: "Bebidas",
    price: 17.98,
    unit: "caixa"
  }),
  createSeedOffer({
    title: "Vinho Quinta dos Vinhedos 750ml",
    category: "Bebidas",
    price: 16.9,
    unit: "garrafa"
  }),
  createSeedOffer({
    title: "Vinho Aurora Colheita Tardia 500ml",
    category: "Bebidas",
    price: 19.9,
    oldPrice: 24.9,
    unit: "garrafa",
    badge: "Clube Sakashita",
    color: "red",
    featured: true,
    club: true
  }),
  createSeedOffer({
    title: "Vinho Anubis Malbec 750ml",
    category: "Bebidas",
    price: 69.9,
    unit: "garrafa",
    color: "red"
  }),
  createSeedOffer({
    title: "Vinho San Telmo 750ml",
    category: "Bebidas",
    price: 34.9,
    unit: "garrafa",
    color: "red"
  }),
  createSeedOffer({
    title: "Vinho Casillero Del Diablo 750ml",
    category: "Bebidas",
    price: 49.9,
    unit: "garrafa",
    color: "red"
  }),
  createSeedOffer({
    title: "Chopp de Vinho Bella Roma 473ml",
    category: "Bebidas",
    price: 5.99,
    unit: "lata"
  }),
  createSeedOffer({
    title: "Vodka Smirnoff Ice 275ml",
    category: "Bebidas",
    price: 6.99,
    unit: "garrafa"
  }),
  createSeedOffer({
    title: "Molho de Tomate Fugini Sache 300g",
    category: "Mercearia",
    price: 1.49
  }),
  createSeedOffer({
    title: "Lasanha Pre-cozida Galo 200g",
    category: "Mercearia",
    price: 3.49
  }),
  createSeedOffer({
    title: "Cafe Prudente Pouch 500g",
    category: "Mercearia",
    price: 21.98,
    unit: "pacote",
    color: "blue"
  }),
  createSeedOffer({
    title: "Azeitona Verde Nucete 500g",
    category: "Mercearia",
    price: 16.99,
    unit: "vidro"
  }),
  createSeedOffer({
    title: "Grao-de-Bico Siamar 400g",
    category: "Mercearia",
    price: 9.9,
    unit: "pacote"
  }),
  createSeedOffer({
    title: "Lava Roupas Brilhante 800g",
    category: "Limpeza",
    price: 10.98,
    unit: "caixa",
    color: "blue",
    featured: true
  }),
  createSeedOffer({
    title: "Amaciante Ype 2L",
    category: "Limpeza",
    price: 8.98,
    unit: "frasco",
    color: "blue"
  }),
  createSeedOffer({
    title: "Sabao em Barra Ype Neutro 800g",
    category: "Limpeza",
    price: 10.98,
    unit: "pacote",
    color: "blue"
  }),
  createSeedOffer({
    title: "Presunto Cozido Perdigao kg",
    category: "Frios",
    price: 29.9,
    unit: "kg",
    color: "mint"
  }),
  createSeedOffer({
    title: "Manteiga Tirolez 200g",
    category: "Frios",
    price: 10.99,
    unit: "pote",
    color: "mint"
  }),
  createSeedOffer({
    title: "Auronuggets ou Tirinhas de Frango Aurora 900g",
    category: "Frios",
    price: 18.98,
    unit: "pacote",
    color: "red"
  }),
  createSeedOffer({
    title: "Bebida Lactea Batavo 510g",
    category: "Bebidas",
    price: 4.98,
    unit: "frasco",
    color: "mint"
  }),
  createSeedOffer({
    title: "Caneca Valencia 250ml",
    category: "Bazar",
    price: 4.99,
    color: "blue"
  }),
  createSeedOffer({
    title: "Bule Haus Mor 500ml",
    category: "Bazar",
    price: 32.9,
    color: "blue"
  }),
  createSeedOffer({
    title: "Taca Horse Clear G 330ml",
    category: "Bazar",
    price: 9.98,
    color: "blue"
  }),
  createSeedOffer({
    title: "Frigideira Rochedo Rasa Grafite 30cm",
    category: "Bazar",
    price: 99.9,
    color: "red",
    featured: true
  }),
  createSeedOffer({
    title: "Alho-poro unidade",
    category: "Hortifruti",
    price: 2.98,
    color: "mint"
  }),
  createSeedOffer({
    title: "Banana Nanica kg",
    category: "Hortifruti",
    price: 4.98,
    oldPrice: 5.98,
    badge: "Clube Sakashita",
    color: "mint",
    club: true
  }),
  createSeedOffer({
    title: "Batata Doce Roxa kg",
    category: "Hortifruti",
    price: 4.98,
    color: "mint"
  }),
  createSeedOffer({
    title: "Caqui Rama Forte kg",
    category: "Hortifruti",
    price: 7.98,
    color: "mint"
  }),
  createSeedOffer({
    title: "Cebola kg",
    category: "Hortifruti",
    price: 2.98,
    color: "mint"
  }),
  createSeedOffer({
    title: "Manga Palmer kg",
    description: "Preco de clube no hortifruti do encarte.",
    category: "Hortifruti",
    price: 3.98,
    oldPrice: 4.98,
    badge: "Clube Sakashita",
    color: "mint",
    featured: true,
    club: true
  }),
  createSeedOffer({
    title: "Mexerica Ponkan kg",
    category: "Hortifruti",
    price: 4.98,
    color: "mint"
  })
].map((offer, index) => ({
  ...offer,
  image: productImages[index] || null
}));
