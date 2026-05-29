import productsHardcoded from "./products-hardcoded.json";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  sizeCl: number | string;
  price: number;
  description?: string;
  featured?: boolean;
};

function slugify(name: string, size: number | string): string {
  return `${name}-${size}cl`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function p(
  name: string,
  category: string,
  sizeCl: number | string,
  price: number,
  opts: { subcategory?: string; description?: string; featured?: boolean } = {}
): Product {
  const id = slugify(name, sizeCl);
  return {
    id,
    slug: id,
    name,
    category,
    subcategory: opts.subcategory,
    sizeCl,
    price,
    description: opts.description,
    featured: opts.featured,
  };
}

export const categories = Array.from(
  new Set(productsHardcoded.map((product) => product.category))
);

export const products: Product[] = productsHardcoded;
