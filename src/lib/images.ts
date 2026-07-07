// Free stock photos from Unsplash (verified reachable). Served straight from the
// Unsplash CDN with on-the-fly resize/quality params. Every usage keeps a
// gradient+emoji fallback (see <Cover>) so a failed image never breaks layout.
export function unsplash(id: string, w = 800, q = 74): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`
}

// Photo id per cuisine key (from CUISINES)
const CUISINE_IDS: Record<string, string> = {
  thai: '1585032226651-759b368d7246',
  noodle: '1559314809-0d155014e29e',
  ricebowl: '1455619452474-d2be8b1e70cd',
  somtam: '1546069901-ba9599a7e63c',
  seafood: '1559847844-5315695dadae',
  bbq: '1529193591184-b1d58069ecdd',
  japanese: '1579871494447-9811cf80d66c',
  korean: '1580651315530-69c8e0026377',
  chinese: '1552611052-33e04de081de',
  pizza: '1513104890138-7c749659a591',
  burger: '1568901346375-23c9450c58cd',
  chicken: '1562967914-608f82629710',
  dessert: '1551024601-bec78aea704b',
  bubbletea: '1558857563-b371033873b8',
  coffee: '1495474472287-4d71bcdd2085',
  healthy: '1546069901-ba9599a7e63c',
  veg: '1540189549336-e6e99c3679fe',
  breakfast: '1533089860892-a7c6f0a88666',
}

export function foodImage(cuisineKey: string | undefined, w = 800): string {
  const id = (cuisineKey && CUISINE_IDS[cuisineKey]) || '1600891964599-f61ba0e24092'
  return unsplash(id, w)
}

// Named images for services / marketing sections
export const IMG = {
  heroSpread: unsplash('1600891964599-f61ba0e24092', 1000),
  restaurant: unsplash('1552566626-52f8b828add9', 1000),
  cafe: unsplash('1517248135467-4c7edcad34c4', 900),
  food: unsplash('1585032226651-759b368d7246', 900),
  ride: unsplash('1502877338535-766e1452684a', 900),
  rider: unsplash('1526367790999-0150786686a2', 900),
  delivery: unsplash('1591768793355-74d04bb6608f', 900),
  scooter: unsplash('1558981806-ec527fa84c39', 900),
  grocery: unsplash('1604719312566-8912e9227c6a', 900),
  market: unsplash('1542838132-92c53300491e', 900),
  coffee: unsplash('1495474472287-4d71bcdd2085', 900),
}

// Per service-key hero image
export const SERVICE_IMG: Record<string, string> = {
  food: IMG.heroSpread,
  ride: IMG.ride,
  messenger: IMG.delivery,
  mart: IMG.grocery,
  grocery: IMG.market,
  pay: IMG.cafe,
}
