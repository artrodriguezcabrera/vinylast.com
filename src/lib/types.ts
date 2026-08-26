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

export type Spec = {
  name: string;
  value: string;
};

export type Video = {
  title: string;
  url: string;
};

export type RelatedProduct = {
  name: string;
  slug: string;
};

export type Resource = {
  id: string;
  title: string;
  slug: string;
  type: ResourceType;
  thumbnail?: AssetImage;
  file?: AssetFile;
  videoUrl?: string;
  shortDescription: string;
  relatedProducts: RelatedProduct[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category?: Category;
  series?: string;
  shortDescription: string;
  bodyHtml?: string;
  hero?: AssetImage;
  gallery: AssetImage[];
  features: string[];
  specs: Spec[];
  videos: Video[];
  relatedResources: Resource[];
  featured: boolean;
};

export type Catalog = {
  source: "contentful" | "fallback";
  products: Product[];
  resources: Resource[];
  categories: Category[];
};
