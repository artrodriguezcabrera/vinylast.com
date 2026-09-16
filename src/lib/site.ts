export const site = {
  name: "Vinylast Inc.",
  shortName: "Vinylast",
  tagline: "Vinyl railing and fencing for contractors since 1974.",
  description:
    "Vinylast is a family-owned and operated business proudly supplying contractors with all their vinyl railing and fencing needs since 1974.",
  email: "customerservice@vinylast.com",
  phone: "(732) 367-7200",
  phoneHref: "tel:+17323677200",
  address: "1830 Swarthmore Ave., Lakewood, NJ 08701",
  mapsUrl:
    "https://maps.google.com/?q=1830+Swarthmore+Ave,+Lakewood,+NJ+08701",
  founded: 1974,
  spanish: "Hablamos Español",
  url: "https://vinylast.com",
};

export const nav = [
  { href: "/products", label: "Products" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
] as const;

export function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
