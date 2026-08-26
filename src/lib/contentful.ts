import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import { createClient, type Entry, type EntrySkeletonType } from "contentful";
import {
  fallbackCategories,
  fallbackProducts,
  fallbackResources,
} from "./fallback";
import type {
  AssetFile,
  AssetImage,
  Catalog,
  Category,
  Product,
  Resource,
  ResourceType,
  Spec,
  Video,
} from "./types";

type AssetFields = {
  title?: string;
  description?: string;
  file?: {
    url?: string;
    contentType?: string;
    details?: { image?: { width?: number; height?: number } };
  };
};

type CategoryFields = {
  name: string;
  slug: string;
  image?: Entry | unknown;
};

type ProductFields = {
  name: string;
  slug: string;
  category?: Entry | unknown;
  series?: string;
  shortDescription?: string;
  body?: Document;
  hero?: unknown;
  gallery?: unknown[];
  features?: string[];
  specs?: unknown;
  videos?: unknown;
  relatedResources?: unknown[];
  featured?: boolean;
};

type ResourceFields = {
  title: string;
  slug: string;
  type?: string;
  thumbnail?: unknown;
  file?: unknown;
  videoUrl?: string;
  shortDescription?: string;
  relatedProducts?: unknown[];
};

function env(name: "CONTENTFUL_SPACE_ID" | "CONTENTFUL_DELIVERY_TOKEN") {
  return import.meta.env[name] || process.env[name] || "";
}

function isConfigured() {
  return Boolean(env("CONTENTFUL_SPACE_ID") && env("CONTENTFUL_DELIVERY_TOKEN"));
}

function getClient() {
  if (!isConfigured()) return null;
  return createClient({
    space: env("CONTENTFUL_SPACE_ID"),
    accessToken: env("CONTENTFUL_DELIVERY_TOKEN"),
  });
}

function assetUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object") return value as Record<string, unknown>;
  return null;
}

function readAsset(value: unknown, fallbackAlt = ""): AssetImage | AssetFile | undefined {
  const entry = asRecord(value);
  const fields = asRecord(entry?.fields) as AssetFields | null;
  if (!fields?.file?.url) return undefined;
  const url = assetUrl(fields.file.url);
  const title = fields.title || fallbackAlt;
  const image = fields.file.details?.image;
  if (fields.file.contentType?.startsWith("image/") || image) {
    return {
      url,
      alt: fields.description || title || fallbackAlt,
      width: image?.width,
      height: image?.height,
    } satisfies AssetImage;
  }
  return {
    url,
    title,
    contentType: fields.file.contentType,
  } satisfies AssetFile;
}

function readImage(value: unknown, fallbackAlt = ""): AssetImage | undefined {
  const asset = readAsset(value, fallbackAlt);
  if (asset && "alt" in asset) return asset;
  return undefined;
}

function readFile(value: unknown, fallbackTitle = ""): AssetFile | undefined {
  const asset = readAsset(value, fallbackTitle);
  if (asset && "title" in asset && !("alt" in asset)) return asset;
  if (asset && "url" in asset) {
    return {
      url: asset.url,
      title: fallbackTitle,
      contentType: "title" in asset ? (asset as AssetFile).contentType : undefined,
    };
  }
  return undefined;
}

function parseSpecs(value: unknown): Spec[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          const [name, ...rest] = item.split(":");
          return { name: name.trim(), value: rest.join(":").trim() };
        }
        const rec = asRecord(item);
        if (!rec) return null;
        const name = String(rec.name ?? rec.label ?? "").trim();
        const specValue = String(rec.value ?? "").trim();
        return name && specValue ? { name, value: specValue } : null;
      })
      .filter((item): item is Spec => Boolean(item?.name && item.value));
  }
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => {
        const [name, ...rest] = line.split(":");
        return { name: name.trim(), value: rest.join(":").trim() };
      })
      .filter((item) => item.name && item.value);
  }
  return [];
}

function parseVideos(value: unknown): Video[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          const [title, url] = item.split("|").map((part) => part.trim());
          return title && url ? { title, url } : null;
        }
        const rec = asRecord(item);
        if (!rec) return null;
        const title = String(rec.title ?? "").trim();
        const url = String(rec.url ?? rec.videoUrl ?? "").trim();
        return title && url ? { title, url } : null;
      })
      .filter((item): item is Video => Boolean(item));
  }
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => {
        const [title, url] = line.split("|").map((part) => part.trim());
        return title && url ? { title, url } : null;
      })
      .filter((item): item is Video => Boolean(item));
  }
  return [];
}

function asResourceType(value?: string): ResourceType {
  const allowed: ResourceType[] = [
    "install",
    "spec",
    "warranty",
    "catalog",
    "video",
    "other",
  ];
  return allowed.includes(value as ResourceType) ? (value as ResourceType) : "other";
}

function mapCategory(entry: Entry<EntrySkeletonType>): Category | undefined {
  const fields = entry.fields as unknown as CategoryFields | undefined;
  if (!fields?.name || !fields.slug) return undefined;
  return {
    id: entry.sys.id,
    name: fields.name,
    slug: fields.slug,
    image: readImage(fields.image, fields.name),
  };
}

function mapResourceLite(entry: Entry<EntrySkeletonType>): Resource | undefined {
  const fields = entry.fields as unknown as ResourceFields | undefined;
  if (!fields?.title || !fields.slug) return undefined;
  return {
    id: entry.sys.id,
    title: fields.title,
    slug: fields.slug,
    type: asResourceType(fields.type),
    thumbnail: readImage(fields.thumbnail, fields.title),
    file: readFile(fields.file, fields.title),
    videoUrl: fields.videoUrl,
    shortDescription: fields.shortDescription || "",
    relatedProducts: [],
  };
}

function mapProduct(entry: Entry<EntrySkeletonType>): Product | undefined {
  const fields = entry.fields as unknown as ProductFields | undefined;
  if (!fields?.name || !fields.slug) return undefined;
  const categoryEntry = fields.category as Entry<EntrySkeletonType> | undefined;
  const related = Array.isArray(fields.relatedResources)
    ? (fields.relatedResources as Entry<EntrySkeletonType>[])
        .map(mapResourceLite)
        .filter((item): item is Resource => Boolean(item))
    : [];
  const gallery = Array.isArray(fields.gallery)
    ? fields.gallery
        .map((item) => readImage(item, fields.name))
        .filter((item): item is AssetImage => Boolean(item))
    : [];

  return {
    id: entry.sys.id,
    name: fields.name,
    slug: fields.slug,
    category: categoryEntry?.fields ? mapCategory(categoryEntry) : undefined,
    series: fields.series,
    shortDescription: fields.shortDescription || "",
    bodyHtml: fields.body ? documentToHtmlString(fields.body) : undefined,
    hero: readImage(fields.hero, fields.name) || gallery[0],
    gallery,
    features: Array.isArray(fields.features) ? fields.features.filter(Boolean) : [],
    specs: parseSpecs(fields.specs),
    videos: parseVideos(fields.videos),
    relatedResources: related,
    featured: Boolean(fields.featured),
  };
}

function mapResource(entry: Entry<EntrySkeletonType>): Resource | undefined {
  const base = mapResourceLite(entry);
  if (!base) return undefined;
  const fields = entry.fields as unknown as ResourceFields;
  const related = Array.isArray(fields.relatedProducts)
    ? (fields.relatedProducts as Entry<EntrySkeletonType>[])
        .map((product) => {
          const productFields = product.fields as unknown as ProductFields | undefined;
          if (!productFields?.name || !productFields.slug) return null;
          return { name: productFields.name, slug: productFields.slug };
        })
        .filter((item): item is { name: string; slug: string } => Boolean(item))
    : [];
  return { ...base, relatedProducts: related };
}

let cached: Catalog | null = null;

export async function getCatalog(): Promise<Catalog> {
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    cached = {
      source: "fallback",
      products: fallbackProducts,
      resources: fallbackResources,
      categories: fallbackCategories,
    };
    return cached;
  }

  const [productRes, resourceRes, categoryRes] = await Promise.all([
    client.getEntries({ content_type: "product", include: 2, limit: 200 }),
    client.getEntries({ content_type: "resource", include: 2, limit: 200 }),
    client.getEntries({ content_type: "category", include: 1, limit: 50 }),
  ]);

  const products = productRes.items
    .map((item) => mapProduct(item as Entry<EntrySkeletonType>))
    .filter((item): item is Product => Boolean(item));
  const resources = resourceRes.items
    .map((item) => mapResource(item as Entry<EntrySkeletonType>))
    .filter((item): item is Resource => Boolean(item));
  const categories = categoryRes.items
    .map((item) => mapCategory(item as Entry<EntrySkeletonType>))
    .filter((item): item is Category => Boolean(item));

  cached = { source: "contentful", products, resources, categories };
  return cached;
}

export async function getProducts() {
  return (await getCatalog()).products;
}

export async function getResources() {
  return (await getCatalog()).resources;
}

export async function getCategories() {
  const { products, categories } = await getCatalog();
  const used = new Map<string, Category>();
  for (const category of categories) used.set(category.slug, category);
  for (const product of products) {
    if (product.category) used.set(product.category.slug, product.category);
  }
  return [...used.values()];
}

export async function getProductBySlug(slug: string) {
  return (await getProducts()).find((product) => product.slug === slug);
}

export async function getResourceBySlug(slug: string) {
  return (await getResources()).find((resource) => resource.slug === slug);
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  const featured = products.filter((product) => product.featured);
  return featured.length ? featured : products.slice(0, 3);
}

export function youtubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    const id = parsed.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
    if (parsed.pathname.startsWith("/embed/")) return url;
  } catch {
    return url;
  }
  return url;
}
