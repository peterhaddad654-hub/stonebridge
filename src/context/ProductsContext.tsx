import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { products as BASE_PRODUCTS, type Product } from "@/data/products";

export type ProductWithImage = Product & { imageUrl?: string };

interface AdminOverrides {
  added: ProductWithImage[];
  edited: Record<string, Partial<ProductWithImage>>;
  deleted: string[];
}

const EMPTY_OVERRIDES: AdminOverrides = { added: [], edited: {}, deleted: [] };
const STORAGE_KEY = "sb_products_v1";
const API_URL = "/api/products/overrides";

function loadLocalOverrides(): AdminOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_OVERRIDES;
    return JSON.parse(raw) as AdminOverrides;
  } catch {
    return EMPTY_OVERRIDES;
  }
}

function mergeProducts(overrides: AdminOverrides): ProductWithImage[] {
  const base = (BASE_PRODUCTS as ProductWithImage[])
    .filter((p) => !overrides.deleted.includes(p.slug))
    .map((p) => {
      const edits = overrides.edited[p.slug];
      return edits ? { ...p, ...edits } : p;
    });
  return [...base, ...overrides.added];
}

function slugify(name: string, size: string | number): string {
  return `${name}-${size}cl`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ProductsContextValue {
  products: ProductWithImage[];
  addProduct: (data: Omit<ProductWithImage, "id" | "slug">) => void;
  editProduct: (slug: string, updates: Partial<ProductWithImage>) => void;
  deleteProduct: (slug: string) => void;
  resetOverrides: () => void;
  hasOverrides: boolean;
  syncing: boolean;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<AdminOverrides>(loadLocalOverrides);
  const [initialized, setInitialized] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const skipNextSyncRef = useRef(false);

  const products = mergeProducts(overrides);
  const hasOverrides =
    overrides.added.length > 0 ||
    Object.keys(overrides.edited).length > 0 ||
    overrides.deleted.length > 0;

  // On mount: fetch from server so ALL visitors get the same product list
  useEffect(() => {
    fetch(API_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: AdminOverrides | null) => {
        if (data) {
          skipNextSyncRef.current = true; // don't POST back what we just fetched
          setOverrides(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      })
      .catch(() => {})
      .finally(() => setInitialized(true));
  }, []);

  // Whenever overrides change: save to localStorage + POST to server (admin only)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));

    if (!initialized) return;

    // Skip if this change came from a server fetch (avoid echo)
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    const token = sessionStorage.getItem("sb_admin_token");
    if (!token) return;

    setSyncing(true);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(overrides),
    })
      .catch(() => {})
      .finally(() => setSyncing(false));
  }, [overrides, initialized]);

  const addProduct = useCallback((data: Omit<ProductWithImage, "id" | "slug">) => {
    setOverrides((prev) => {
      const slug = slugify(data.name, data.sizeCl);
      const product: ProductWithImage = { ...data, id: slug, slug };
      return { ...prev, added: [...prev.added, product] };
    });
  }, []);

  const editProduct = useCallback((slug: string, updates: Partial<ProductWithImage>) => {
    setOverrides((prev) => {
      const addedIdx = prev.added.findIndex((p) => p.slug === slug);
      if (addedIdx >= 0) {
        const newAdded = [...prev.added];
        newAdded[addedIdx] = { ...newAdded[addedIdx], ...updates };
        return { ...prev, added: newAdded };
      }
      return {
        ...prev,
        edited: {
          ...prev.edited,
          [slug]: { ...(prev.edited[slug] ?? {}), ...updates },
        },
      };
    });
  }, []);

  const deleteProduct = useCallback((slug: string) => {
    setOverrides((prev) => {
      const isAdded = prev.added.some((p) => p.slug === slug);
      return isAdded
        ? { ...prev, added: prev.added.filter((p) => p.slug !== slug) }
        : { ...prev, deleted: [...prev.deleted, slug] };
    });
  }, []);

  const resetOverrides = useCallback(() => {
    setOverrides(EMPTY_OVERRIDES);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        resetOverrides,
        hasOverrides,
        syncing,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}
