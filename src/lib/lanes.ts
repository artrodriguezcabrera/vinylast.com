import { nav } from "./site";

export const LANES_BASE = "/lanes";

export function lanesHref(path: string) {
  if (path === "/" || path === "") return LANES_BASE;
  return `${LANES_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export const lanesNav = nav.map((item) => ({
  label: item.label,
  href: lanesHref(item.href),
}));

export function isLanesCurrent(pathname: string, href: string) {
  if (href === LANES_BASE) return pathname === LANES_BASE || pathname === `${LANES_BASE}/`;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const lanesHeroSlides = [
  {
    url: "/images/products/t-rail/vinyl-railing-with-t-rail-top-03.jpg",
    alt: "White vinyl T-Rail on a two-story porch",
  },
  {
    url: "/images/products/3000-series/3000-superior-1.jpg",
    alt: "3000 Series vinyl railing on a large deck",
  },
  {
    url: "/images/products/keylargo/imperial-vinyl-yard-fence-5.jpg",
    alt: "Keylargo closed picket vinyl fence",
  },
  {
    url: "/images/products/difinity/boston-vinyl-privacy-fence-4.jpg",
    alt: "Difinity vinyl privacy fence",
  },
  {
    url: "/images/products/ranch-rail/2-rail-post-rail-vinyl-fence-3.jpg",
    alt: "Ranch Rail post-and-rail vinyl fence",
  },
  {
    url: "/images/products/pergola/1-4.jpg",
    alt: "Vinyl pergola over an outdoor living space",
  },
];

export const lanesBreadcrumbImage = lanesHeroSlides[0].url;
