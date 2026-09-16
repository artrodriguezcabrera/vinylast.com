import { productGalleries } from "./product-images";
import type { Category, Product, Spec } from "./types";

export const catRailing: Category = { id: "cat-railing", name: "Railing", slug: "railing" };
export const catFencing: Category = {
  id: "cat-fencing",
  name: "Vinyl fencing",
  slug: "vinyl-fencing",
};
export const catPergola: Category = { id: "cat-pergola", name: "Pergolas", slug: "pergolas" };
export const catShower: Category = {
  id: "cat-shower",
  name: "Shower enclosures",
  slug: "shower-enclosures",
};
export const catAccessories: Category = {
  id: "cat-accessories",
  name: "Accessories",
  slug: "accessories",
};
export const catWindows: Category = {
  id: "cat-windows",
  name: "Windows and doors",
  slug: "windows-and-doors",
};

export const sheetCategories: Category[] = [
  catRailing,
  catFencing,
  catPergola,
  catShower,
  catAccessories,
  catWindows,
];

function product(input: {
  slug: string;
  name: string;
  category: Category;
  series: string;
  shortDescription: string;
  features: string[];
  specs?: Spec[];
  infill?: string;
  featured?: boolean;
  extraHtml?: string;
}): Product {
  const specs = [...(input.specs || [])];
  if (input.infill) specs.push({ name: "Infill options", value: input.infill });
  specs.push({ name: "Series", value: input.series });
  const gallery = productGalleries[input.slug] || [];
  return {
    id: `prod-${input.slug}`,
    name: input.name,
    slug: input.slug,
    category: input.category,
    series: input.series,
    shortDescription: input.shortDescription,
    bodyHtml: input.extraHtml,
    hero: gallery[0],
    gallery,
    features: input.features,
    specs,
    videos: [],
    relatedResources: [],
    featured: Boolean(input.featured),
  };
}

export const sheetProducts: Product[] = [
  product({
    slug: "t-rail",
    name: "T-Rail",
    category: catRailing,
    series: "Vinyl",
    featured: true,
    shortDescription:
      "Our most popular vinyl railing. Classic, simple, and high performance at a budget-friendly cost that fits most homes.",
    features: [
      "Overlap design brackets for quick post-to-post installation",
      "Aluminum-reinforced top and bottom rail",
      "Meets IRC and IBC building codes",
      "Lengths 6', 8', and 10' in level and stair applications",
      "Post sleeve options: 4\", 5\", and 6\"",
      "36\" and 42\" railing heights",
      "Custom designs available",
      "Colors: White and limited special-order colors",
      "Top rail 3.5\" × 3.5\"; bottom rail 2\" × 3.5\"",
    ],
    infill:
      "Vinyl 1-3/8\" square baluster; glass slats; black aluminum 3/4\" round or square; horizontal baluster in black and anodized",
  }),
  product({
    slug: "palisade",
    name: "Palisade",
    category: catRailing,
    series: "Vinyl",
    shortDescription:
      "Contoured-top vinyl railing that blends contemporary and classic looks, with infill options for almost any design.",
    features: [
      "Cup-and-cover top style with overlap bottom brackets",
      "Aluminum-reinforced top and bottom rail",
      "Meets IRC and IBC building codes",
      "Lengths 6', 8', and 10' in level and stair applications",
      "Post sleeve options: 4\", 5\", and 6\"",
      "36\" and 42\" railing heights",
      "Custom designs available",
      "Colors: White and limited special-order colors",
      "Top rail 3\" × 2.5\"; bottom rail 2\" × 3.5\"",
    ],
    infill:
      "Vinyl 1-3/8\" square baluster; glass slats; black aluminum 3/4\" round or square; horizontal baluster in black and anodized",
  }),
  product({
    slug: "2-box",
    name: "2-Box",
    category: catRailing,
    series: "Vinyl",
    shortDescription:
      "Smooth, modern vinyl railing — budget-friendly, with enough customization to finish an outdoor space cleanly.",
    features: [
      "Overlap design brackets for quick post-to-post installation",
      "Aluminum-reinforced top and bottom rail",
      "Meets IRC and IBC building codes",
      "Lengths 6', 8', and 10' in level and stair applications",
      "Post sleeve options: 4\", 5\", and 6\"",
      "36\" and 42\" railing heights",
      "Deck drink rail can be applied",
      "Colors: White and limited special-order colors",
      "Top rail 2\" × 3.5\"; bottom rail 2\" × 3.5\"",
    ],
    infill:
      "Vinyl 1-3/8\" square baluster; glass slats; black aluminum 3/4\" round or square; horizontal baluster in black and anodized",
  }),
  product({
    slug: "3000-series",
    name: "3000 Series",
    category: catRailing,
    series: "Vinyl",
    shortDescription:
      "Contemporary vinyl railing for medium to large areas — 10 infill choices and 4 colors. Superior special order.",
    features: [
      "Overlap hidden-fastener brackets",
      "Aluminum-reinforced top and bottom rail",
      "Meets IRC and IBC building codes",
      "Lengths 4', 6', 8', and 10' in level and stair applications (custom radius available)",
      "Post sleeve options: 4\", 5\", and 6\"",
      "36\" and 42\" railing heights",
      "Colors: White, Clay, Almond, and Black",
      "Top rail 3\" × 3.5\"; bottom rail 2\" × 3.5\"",
    ],
    specs: [{ name: "Availability", value: "Superior special order — ask the office" }],
    infill: "Vinyl 1.3\" square plus two turned baluster designs; black aluminum 3/4\" round or square",
  }),
  product({
    slug: "5000-series",
    name: "5000 Series",
    category: catRailing,
    series: "Vinyl",
    shortDescription:
      "Substantial vinyl railing for estates, country clubs, and large commercial properties. Superior special order.",
    features: [
      "Overlap hidden-fastener brackets",
      "Aluminum-reinforced top and bottom rail",
      "Meets IRC and IBC building codes",
      "Lengths 4', 6', 8', and 10' in level and stair applications (custom radius available)",
      "Post sleeve options: 5\", 6\", and 8\"",
      "36\" and 42\" railing heights",
      "Colors: White, Clay, Almond, and Black",
      "4-1/4\" × 3.5\" top and bottom rails",
    ],
    specs: [{ name: "Availability", value: "Superior special order — ask the office" }],
    infill: "Vinyl 2-5/8\" turned baluster designs",
  }),
  product({
    slug: "montego",
    name: "Montego",
    category: catFencing,
    series: "Open picket",
    featured: true,
    shortDescription:
      "Neighbor-friendly open picket fence — pickets run through the top rail and sit in the bottom rail, same look from both sides.",
    features: [
      "7/8\" × 3\" thru-picket design",
      "2\" × 3.5\" aluminum-reinforced bottom rail",
      "Dog-ear or spade top picket, concave or straight",
      "3', 4', and 5' heights × 8' lengths",
      "Post sizes: 4\" and 5\" square",
      "Custom designs, picket spacing, and sizes available",
      "Colors: White and limited special-order colors",
      "Variety of post caps",
    ],
  }),
  product({
    slug: "keylargo",
    name: "Keylargo",
    category: catFencing,
    series: "Closed picket",
    shortDescription:
      "Simple rails with picket spacing you can open up for a breezy look or tighten for a more secure yard or pool fence.",
    features: [
      "Pickets: 1-3/8\" square or 7/8\" × 3\" closed-top design",
      "2\" × 3.5\" aluminum-reinforced bottom rail",
      "3' and 4' heights in a 2-rail design × 8' lengths",
      "5' and 6' heights in a 3-rail design × 8'",
      "Post sizes: 4\" and 5\" square",
      "Custom designs, picket spacing, and sizes available",
      "Colors: White and limited special-order colors",
      "Variety of post caps",
    ],
  }),
  product({
    slug: "difinity",
    name: "Difinity",
    category: catFencing,
    series: "Solid privacy",
    shortDescription:
      "Privacy fence with deco-style rails and tongue-and-groove panels that slide together for a fast, strong install. Lattice or picket tops optional.",
    features: [
      "7/8\" × 6\" tongue-and-groove panels",
      "2\" × 7\" deco-style pocket rails",
      "3', 4', 5', and 6' heights × 8' lengths",
      "Top accents: lattice, open picket, or closed picket in black aluminum or 1-3/8\" square vinyl",
      "Post sizes: 4\" and 5\" square",
      "Custom designs, picket spacing, and sizes available",
      "Colors: White and limited special-order colors",
      "Variety of post caps",
    ],
  }),
  product({
    slug: "ranch-rail",
    name: "Ranch Rail",
    category: catFencing,
    series: "Post and rail",
    shortDescription:
      "2-, 3-, or 4-rail post-and-rail fence for property lines, yards, and farms — a rustic, welcoming look.",
    features: [
      "Rails: 1.5\" × 5.5\" or 2\" × 6\"",
      "2-rail, 3-rail, and 4-rail designs",
      "3' (2-rail), 4' (3-rail), and 5' (4-rail) heights × 8' lengths",
      "Post sizes: 4\" and 5\" square",
      "Limited designs; some custom spacing available",
      "Colors: White and limited special-order colors",
      "Variety of post caps",
    ],
  }),
  product({
    slug: "two-tone",
    name: "Two-Tone",
    category: catFencing,
    series: "Two-tone",
    shortDescription:
      "Mix rail, post, and panel colors for a custom fence. TitanShield helps protect against sun and weather.",
    features: [
      "2\" × 7\" pocket rails",
      "7/8\" × 6\" tongue-and-groove panels",
      "3', 4', 5', and 6' heights × 8' lengths",
      "5\" square posts",
      "Custom designs and color combinations available",
      "See the catalog for color ideas",
      "Variety of post caps",
    ],
  }),
  product({
    slug: "pergola",
    name: "Pergola",
    category: catPergola,
    series: "Vinyl",
    featured: true,
    shortDescription:
      "Aluminum-reinforced vinyl pergolas that add outdoor living space — open but sheltered, built for snow load and weather, with little maintenance beyond cleaning.",
    features: [
      "Many standard and custom sizes",
      "Aluminum-reinforced posts and rails",
      "Tapered or square support columns",
      "Straight or arched rafters",
      "Choice of shade covers",
      "Colors: White, Almond, Clay, and Black",
    ],
  }),
  product({
    slug: "outdoor-shower-enclosure",
    name: "Outdoor shower enclosure",
    category: catShower,
    series: "Vinyl",
    shortDescription:
      "Custom vinyl outdoor shower enclosures for pools, beach houses, and rinse-off at the back door — sized and roofed to the job.",
    features: [
      "Custom sizes and designs",
      "Aluminum-reinforced posts and rails when needed",
      "Welded shower doors available with D&D hardware",
      "Choice of roof or rafter designs",
      "Colors: White and limited colors",
    ],
  }),
  product({
    slug: "ada-railing",
    name: "ADA railing",
    category: catAccessories,
    series: "Vinyl",
    featured: true,
    shortDescription:
      "A smooth, continuous, graspable handrail for deck and porch stairs — tested and code-compliant with the rail systems it attaches to.",
    features: [
      "Aluminum-reinforced vinyl or powder-coated 1.5\" round rails",
      "White vinyl rails up to 16' in length",
      "Die-cast parts with powder-coat paint",
      "Fully tested, code-compliant design",
      "Installation hardware for aluminum and wood posts included",
      "Beauty rings included where needed",
      "Colors: White, Black, and limited special-order colors",
    ],
  }),
  product({
    slug: "deck-gates",
    name: "Deck gates",
    category: catAccessories,
    series: "Vinyl",
    shortDescription:
      "Welded, custom-fit deck gates to keep kids and pets where they belong — hardware included, matched to the rail system.",
    features: [
      "Fully welded, reinforced rails, custom-built to the opening",
      "Vinyl, aluminum, or glass balusters to match the railing",
      "D&D hardware with self-closing hinges and key locks",
      "Double-gate design available",
      "Color-matched to the railing system",
      "Beauty rings included where needed",
    ],
  }),
  product({
    slug: "porch-post",
    name: "Porch post",
    category: catAccessories,
    series: "Vinyl",
    shortDescription:
      "Structural vinyl porch posts with full-length aluminum inserts for porch and roof overhangs — several styles and sizes to match the rail.",
    features: [
      "4 styles and 5 sizes",
      "Aluminum structural inserts for load and uplift ratings",
      "Optional hollow porch post available",
      "Mounting plates and beauty rings included",
      "Colors: White, Black, and limited special-order colors",
    ],
  }),
  product({
    slug: "columns",
    name: "Columns",
    category: catAccessories,
    series: "Vinyl",
    shortDescription:
      "Straight, round, tapered, or square structural columns with full-length aluminum inserts supporting up to 18,000 pounds.",
    features: [
      "Straight, round, tapered, and square — 5 styles",
      "Aluminum structural inserts for load and uplift ratings",
      "3 post sizes and 2 heights",
      "Optional hollow porch post available",
      "Mounting plates included",
      "Optional trim rings",
      "Colors: White, Black, and limited special-order colors",
    ],
  }),
  product({
    slug: "post-mount",
    name: "Post Mount",
    category: catAccessories,
    series: "Structural",
    shortDescription:
      "CCRR-certified guardpost bracket. Replace a wood guard post on wood decks, porches, or concrete — 36\" and 42\" railing heights.",
    features: [
      "CCRR certified and tested to IRC and IBC",
      "For 36\" and 42\" railing heights",
      "“Shore Coat” salt-spray tested to 1000 hours for coastal jobs",
      "Wood deck, concrete mounting, and leveling kits available",
      "Adaptor blocks and clip-on spacers for 5\" and 6\" vinyl sleeves",
      "Two-piece leveling shims included",
      "Precision robotic welds for a strong base attachment",
    ],
  }),
  product({
    slug: "newel-post-and-post-wraps",
    name: "Newel post and post wraps",
    category: catAccessories,
    series: "Vinyl",
    shortDescription:
      "Square or turned newels, plus 4-piece snap-together wraps to cover wood posts in vinyl that matches the rail.",
    features: [
      "Plain square in 4\", 5\", 6\", and 8\"; turned design in 4\"",
      "4-piece snap-together wraps for easy install around a wood post",
      "Wraps in 4\" × 10' and 6\" × 10'",
      "4-piece base trims for wrap top and bottom",
      "Colors: White and limited special-order colors",
    ],
  }),
  product({
    slug: "harvey-windows-and-doors",
    name: "Harvey windows and doors",
    category: catWindows,
    series: "Vinyl",
    shortDescription:
      "Vinylast has distributed the full Harvey window and door line for more than 30 years — new construction and replacement, built for Northeast weather.",
    extraHtml: `<p>Since 1961 Harvey has helped customers and builders deliver for homeowners. Products are built for tough northern winters and hot summers. For the full line, see <a href="https://harveywindows.com/">harveywindows.com</a>.</p>`,
    features: [
      "Full line of new-construction and replacement windows and doors",
      "Many styles and colors",
      "Energy-efficient glass options and grid patterns",
      "Styles include bays, bows, sliders, single hung, double hung, casements, awnings, and more",
    ],
    specs: [{ name: "Manufacturer", value: "Harvey — harveywindows.com" }],
  }),
];
