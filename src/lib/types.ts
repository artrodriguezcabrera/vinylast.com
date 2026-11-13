export type ResourceType =
  | "install"
  | "spec"
  | "warranty"
  | "catalog"
  | "video"
  | "other";

export const resourceTypeOrder: ResourceType[] = [
  "install",
  "spec",
  "warranty",
  "catalog",
  "video",
  "other",
];

export const resourceTypeLabels: Record<ResourceType, string> = {
  install: "Installation",
  spec: "Spec sheets",
  warranty: "Warranty",
  catalog: "Catalogs",
  video: "Videos",
  other: "Other",
};

export const resourceProductLines = [
  "Accessories",
  "Aluminum Fencing",
  "Aluminum Railing",
  "Pergola",
  "Resource Information",
  "Vinyl Fencing",
  "Vinyl Railing",
  "Warranty & Maintenance",
  "Window & Door",
] as const;

export type AssetImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type AssetFile = {
  url: string;
  title: string;
  contentType?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image?: AssetImage;
};

export type Resource = {
  id: string;
  title: string;
  slug: string;
  type: ResourceType;
  productLine: string;
  thumbnail?: AssetImage;
  file?: AssetFile;
  videoUrl?: string;
  shortDescription: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category?: Category;
  shortDescription: string;
  bodyHtml?: string;
  hero?: AssetImage;
  gallery: AssetImage[];
  features: string[];
  options: string[];
  relatedResources: Resource[];
};

export type Catalog = {
  source: "contentful" | "fallback";
  products: Product[];
  resources: Resource[];
  categories: Category[];
};
