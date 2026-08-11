/**
 * Filler imagery for sections that have no real photography yet.
 *
 * The first four URLs are the pool 3.0 used in utils/getRandomImage(). That
 * helper called Math.random(), which cannot be used here: pages are statically
 * generated, so a random pick would differ between the server render and the
 * client and change on every build. pickImages() hashes a caller-supplied seed
 * instead, so a given section always resolves to the same images.
 */
const POOL = [
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80",
  "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1657295791913-5074c912398e?ixlib=rb-1.2.1&auto=format&fit=crop&w=996&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
];

function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Deterministic, non-repeating slice of the pool for a given seed. */
export function pickImages(seed: string, count: number) {
  const start = hash(seed) % POOL.length;
  return Array.from(
    { length: Math.min(count, POOL.length) },
    (_, i) => POOL[(start + i) % POOL.length],
  );
}

export function pickImage(seed: string) {
  return POOL[hash(seed) % POOL.length];
}
