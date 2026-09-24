export type ResourceCategory = {
  name: string;
  slug: string;
};

export type ResourceDocument = {
  title: string;
  category: string;
  file: string;
};

export function resourceThumbnail(file: string) {
  return file.replace(/^\/documents\//, "/images/resources/").replace(/\.pdf$/, ".jpg");
}

export const resourceCategories: ResourceCategory[] = [
  { name: "Accessories", slug: "accessories" },
  { name: "Aluminum Fencing", slug: "aluminum-fencing" },
  { name: "Aluminum Railing", slug: "aluminum-railing" },
  { name: "Pergola", slug: "pergola" },
  { name: "Resource Information", slug: "resource-information" },
  { name: "Vinyl Fencing", slug: "vinyl-fencing" },
  { name: "Vinyl Railing", slug: "vinyl-railing" },
  { name: "Warranty and Maintenance", slug: "warranty-and-maintenance" },
  { name: "Window and Door", slug: "window-and-door" },
];

export const resourceDocuments: ResourceDocument[] = [
  {
    title: "ADA Catalog",
    category: "accessories",
    file: "/documents/accessories/ada-catalog.pdf",
  },
  {
    title: "ADA Installation",
    category: "accessories",
    file: "/documents/accessories/ada-installation.pdf",
  },
  {
    title: "Porch Post, Column, and Wrap: Porch Post Mounting",
    category: "accessories",
    file: "/documents/accessories/porch-post-column-wrap-porch-post-mounting.pdf",
  },
  {
    title: "Porch Post, Column, and Wrap: Round and Square Column",
    category: "accessories",
    file: "/documents/accessories/porch-post-column-wrap-round-square-column.pdf",
  },
  {
    title: "Porch Post, Column, and Wrap: Vinyl Post Wrap",
    category: "accessories",
    file: "/documents/accessories/porch-post-column-wrap-vinyl-post-wrap.pdf",
  },
  {
    title: "Post Mount Catalog",
    category: "accessories",
    file: "/documents/accessories/post-mount-catalog.pdf",
  },
  {
    title: "Post Mount Installation: Structural Post",
    category: "accessories",
    file: "/documents/accessories/post-mount-installation-structural-post.pdf",
  },
  {
    title: "Post Mount Installation: Lag Bolt",
    category: "accessories",
    file: "/documents/accessories/post-mount-installation-lag-bolt.pdf",
  },
  {
    title: "Horizontal Baluster Install Guide",
    category: "aluminum-railing",
    file: "/documents/aluminum-railing/horizontal-baluster-install-guide.pdf",
  },
  {
    title: "Pergola Catalog",
    category: "pergola",
    file: "/documents/pergola/pergola-catalog.pdf",
  },
  {
    title: "Pergola Installation",
    category: "pergola",
    file: "/documents/pergola/pergola-installation.pdf",
  },
  {
    title: "Vinyl Fence Catalog",
    category: "vinyl-fencing",
    file: "/documents/vinyl-fencing/vinyl-fence-catalog.pdf",
  },
  {
    title: "Vinyl Fence Install: Privacy",
    category: "vinyl-fencing",
    file: "/documents/vinyl-fencing/vinyl-fence-install-privacy.pdf",
  },
  {
    title: "Vinyl Fence Install: Picket",
    category: "vinyl-fencing",
    file: "/documents/vinyl-fencing/vinyl-fence-install-picket.pdf",
  },
  {
    title: "Vinyl Fence Install: Post and Rail",
    category: "vinyl-fencing",
    file: "/documents/vinyl-fencing/vinyl-fence-install-post-and-rail.pdf",
  },
  {
    title: "Vinyl Fence Install: Yard",
    category: "vinyl-fencing",
    file: "/documents/vinyl-fencing/vinyl-fence-install-yard.pdf",
  },
  {
    title: "Vinyl Railing Catalog",
    category: "vinyl-railing",
    file: "/documents/vinyl-railing/vinyl-railing-catalog.pdf",
  },
  {
    title: "Vinyl Railing Installation",
    category: "vinyl-railing",
    file: "/documents/vinyl-railing/vinyl-railing-installation.pdf",
  },
  {
    title: "Maintain Cleaning SUP",
    category: "warranty-and-maintenance",
    file: "/documents/warranty-and-maintenance/maintain-cleaning-sup.pdf",
  },
  {
    title: "Post Mount",
    category: "warranty-and-maintenance",
    file: "/documents/warranty-and-maintenance/post-mount.pdf",
  },
  {
    title: "Warranty Homeland",
    category: "warranty-and-maintenance",
    file: "/documents/warranty-and-maintenance/warranty-homeland.pdf",
  },
  {
    title: "Warranty SUP",
    category: "warranty-and-maintenance",
    file: "/documents/warranty-and-maintenance/warranty-sup.pdf",
  },
  {
    title: "Harvey Catalog",
    category: "window-and-door",
    file: "/documents/window-and-door/harvey-catalog.pdf",
  },
];
