import type { Category, Product, Resource } from "./types";
import { sheetCategories, sheetProducts } from "./sheet-catalog";

export const fallbackCategories: Category[] = sheetCategories;
export const fallbackProducts: Product[] = sheetProducts;
export const fallbackResources: Resource[] = [];
