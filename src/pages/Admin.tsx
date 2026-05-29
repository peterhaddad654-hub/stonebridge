import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Edit2, Trash2, Plus, Search, X, LogOut,
  ChevronLeft, ChevronRight, Eye, Download,
  RefreshCw, AlertTriangle, Package,
} from "lucide-react";
import { useProducts, type ProductWithImage } from "@/context/ProductsContext";
import { categories as STATIC_CATEGORIES } from "@/data/products";
import { productImages } from "@/data/productImages";

const ADMIN_PASSWORD =
  (import.meta.env.VITE_ADMIN_PASSWORD as string) ?? "stonebridge2025";
const PAGE_SIZE = 50;

type FormData = {
  name: string;
  category: string;
  subcategory: string;
  sizeCl: string;
  price: string;
  description: string;
  featured: boolean;
  imageUrl: string;
};

const emptyForm: FormData = {
  name: "",
  category: "Whiskey",
  subcategory: "",
  sizeCl: "",
  price: "",
  description: "",
  featured: false,
  imageUrl: "",
};

export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("sb_admin") === "1"
  );
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const { products, addProduct, editProduct, deleteProduct, resetOverrides, hasOverrides } =
    useProducts();

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [formError, setFormError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);

  const allCategories = useMemo(() => {
    const cats = new Set([...STATIC_CATEGORIES, ...products.map((p) => p.category)]);
    return [...cats].sort();
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          String(p.sizeCl).includes(q) ||
          (p.subcategory?.toLowerCase().includes(q) ?? false)
      );
    }
    if (catFilter !== "All") result = result.filter((p) => p.category === catFilter);
    return result;
  }, [products, search, catFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function login() {
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("sb_admin", "1");
      sessionStorage.setItem("sb_admin_token", pwInput);
      setAuthed(true);
    } else {
      setPwError(true);
    }
  }

  function logout() {
    sessionStorage.removeItem("sb_admin");
    sessionStorage.removeItem("sb_admin_token");
    setAuthed(false);
  }

  function openAdd() {
    setEditingSlug(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(product: ProductWithImage) {
    setEditingSlug(product.slug);
    setForm({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory ?? "",
      sizeCl: String(product.sizeCl),
      price: String(product.price),
      description: product.description ?? "",
      featured: product.featured ?? false,
      imageUrl: product.imageUrl ?? productImages[product.slug] ?? "",
    });
    setFormError("");
    setShowForm(true);
  }

  function handleSave() {
    if (!form.name.trim()) return setFormError("Name is required");
    if (!form.sizeCl.trim()) return setFormError("Size is required");
    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) return setFormError("Enter a valid price");

    const sizeCl = isNaN(Number(form.sizeCl)) ? form.sizeCl : Number(form.sizeCl);
    const updates: Partial<ProductWithImage> = {
      name: form.name.trim(),
      category: form.category,
      subcategory: form.subcategory.trim() || undefined,
      sizeCl,
      price,
      description: form.description.trim() || undefined,
      featured: form.featured,
      imageUrl: form.imageUrl.trim() || undefined,
    };

    if (editingSlug) {
      editProduct(editingSlug, updates);
    } else {
      addProduct(updates as Omit<ProductWithImage, "id" | "slug">);
    }
    setShowForm(false);
  }

  function handleExport() {
    const data = JSON.stringify(products, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stonebridge-products.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Link href="/">
              <span className="font-serif text-2xl text-white tracking-widest">STONEBRIDGE</span>
            </Link>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-2">Admin Panel</p>
          </div>
          <div className="border border-white/10 bg-[#0e0e0e] p-8">
            <label className="block text-white/40 text-xs tracking-widest uppercase mb-3">
              Password
            </label>
            <input
              type="password"
              value={pwInput}
              onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 mb-1 transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
            {pwError && (
              <p className="text-red-400 text-xs mb-4 mt-2 flex items-center gap-1">
                <AlertTriangle size={11} /> Incorrect password
              </p>
            )}
            {!pwError && <div className="mb-4" />}
            <button
              onClick={login}
              className="w-full bg-[hsl(43,63%,44%)] text-black py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-colors"
            >
              Enter
            </button>
          </div>
          <p className="text-center mt-6">
            <Link href="/" className="text-white/20 text-xs tracking-wider hover:text-white/50 transition-colors">
              ← Back to site
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808]">
      <div className="border-b border-white/8 bg-[#0e0e0e] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <span className="font-serif text-[hsl(43,63%,44%)] text-lg tracking-widest">STONEBRIDGE</span>
            </Link>
            <span className="text-white/20 text-sm">|</span>
            <span className="text-white/50 text-xs tracking-[0.2em] uppercase">Admin</span>
            {hasOverrides && (
              <span className="text-[hsl(43,63%,44%)] text-[10px] tracking-wider border border-[hsl(43,63%,44%)]/30 px-2 py-0.5">
                UNSAVED CHANGES
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/20 text-xs mr-3">
              <Package size={12} className="inline mr-1" />
              {products.length} products
            </span>
            <button
              onClick={handleExport}
              title="Export products as JSON"
              className="p-2 text-white/30 hover:text-white/70 transition-colors"
            >
              <Download size={15} />
            </button>
            {hasOverrides && (
              <button
                onClick={() => setShowReset(true)}
                title="Reset all changes"
                className="p-2 text-white/30 hover:text-red-400 transition-colors"
              >
                <RefreshCw size={15} />
              </button>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs tracking-wider transition-colors p-2"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-52">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, category, size…"
              className="w-full bg-white/5 border border-white/10 text-white pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X size={13} />
              </button>
            )}
          </div>
          <select
            value={catFilter}
            onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
            className="bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/50 transition-colors"
          >
            <option value="All">All Categories</option>
            {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[hsl(43,63%,44%)] text-black px-5 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-colors whitespace-nowrap"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>

        <p className="text-white/25 text-xs mb-4 tracking-wide">
          Showing {filtered.length} of {products.length} products
        </p>

        <div className="border border-white/8 overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-white/3 border-b border-white/8">
                {["Name", "Category", "Subcategory", "Size", "Price", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left text-white/30 text-[10px] tracking-[0.2em] uppercase px-4 py-3 font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((product, idx) => (
                <tr
                  key={product.slug}
                  className={`border-b border-white/5 hover:bg-white/3 transition-colors group ${
                    idx % 2 === 1 ? "bg-white/[0.015]" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {(product.imageUrl ?? productImages[product.slug]) && (
                        <img
                          src={product.imageUrl ?? productImages[product.slug]}
                          alt=""
                          className="w-7 h-7 object-contain flex-shrink-0 mix-blend-darken bg-[#f5f1eb]"
                        />
                      )}
                      <span className="text-white text-sm font-medium leading-snug">{product.name}</span>
                      {product.featured && (
                        <span className="text-[9px] tracking-wider text-[hsl(43,63%,44%)] border border-[hsl(43,63%,44%)]/30 px-1 py-0.5 flex-shrink-0">
                          FEATURED
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/50 text-sm">{product.category}</td>
                  <td className="px-4 py-3 text-white/35 text-sm">{product.subcategory ?? "—"}</td>
                  <td className="px-4 py-3 text-white/50 text-sm whitespace-nowrap">{product.sizeCl}cl</td>
                  <td className="px-4 py-3 text-[hsl(43,63%,55%)] text-sm font-medium whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-0.5">
                      <a
                        href={`/product/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                        title="View on site"
                      >
                        <Eye size={13} />
                      </a>
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 text-white/20 hover:text-[hsl(43,63%,55%)] transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={13} />
                      </button>
                      {deleteConfirm === product.slug ? (
                        <div className="flex items-center gap-1 ml-1">
                          <button
                            onClick={() => { deleteProduct(product.slug); setDeleteConfirm(null); }}
                            className="text-red-400 text-[10px] tracking-wider px-2 py-1 border border-red-400/40 hover:bg-red-400/10 transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-white/30 text-[10px] tracking-wider px-2 py-1 border border-white/10 hover:bg-white/5 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.slug)}
                          className="p-1.5 text-white/20 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-white/25 text-sm">
                    No products match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <span className="text-white/25 text-xs">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const pg = page <= 4 ? i + 1 : page - 3 + i;
                if (pg < 1 || pg > totalPages) return null;
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-8 h-8 text-xs border transition-colors ${
                      pg === page
                        ? "border-[hsl(43,63%,44%)] text-[hsl(43,63%,44%)]"
                        : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/60"
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div className="bg-[#0e0e0e] border border-white/10 w-full max-w-lg max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <h2 className="font-serif text-xl text-white font-light">
                {editingSlug ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white/60 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <div>
                <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">
                  Product Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 transition-colors"
                  placeholder="e.g. Macallan 18yo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">
                    Category *
                  </label>
                  <input
                    list="cats-list"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 transition-colors"
                    placeholder="Select or type"
                  />
                  <datalist id="cats-list">
                    {allCategories.map((c) => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">
                    Subcategory / Brand
                  </label>
                  <input
                    value={form.subcategory}
                    onChange={(e) => setForm((f) => ({ ...f, subcategory: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 transition-colors"
                    placeholder="e.g. The Macallan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">
                    Size (cl) *
                  </label>
                  <input
                    type="text"
                    value={form.sizeCl}
                    onChange={(e) => setForm((f) => ({ ...f, sizeCl: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 transition-colors"
                    placeholder="e.g. 70"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 transition-colors"
                    placeholder="e.g. 85.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 transition-colors"
                  placeholder="https://… (optional, paste an image link)"
                />
                {form.imageUrl && (
                  <div className="mt-2 w-20 h-20 bg-[#f5f1eb] flex items-center justify-center">
                    <img src={form.imageUrl} alt="preview" className="w-full h-full object-contain p-1 mix-blend-darken" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm outline-none focus:border-[hsl(43,63%,44%)]/60 transition-colors resize-none"
                  placeholder="Optional short description"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 accent-[hsl(43,63%,44%)]"
                />
                <span className="text-white/50 text-sm">Feature on homepage</span>
              </label>

              {formError && (
                <p className="text-red-400 text-xs flex items-center gap-1">
                  <AlertTriangle size={11} /> {formError}
                </p>
              )}
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-[hsl(43,63%,44%)] text-black py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[hsl(43,63%,52%)] transition-colors"
              >
                {editingSlug ? "Save Changes" : "Add Product"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 border border-white/10 text-white/50 text-xs tracking-wider uppercase hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showReset && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowReset(false)}
        >
          <div className="bg-[#0e0e0e] border border-white/10 w-full max-w-sm p-6">
            <h3 className="font-serif text-lg text-white mb-3">Reset All Changes?</h3>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              This will revert all product additions, edits, and deletions back to the original catalog. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { resetOverrides(); setShowReset(false); }}
                className="flex-1 bg-red-500/80 text-white py-2.5 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-red-500 transition-colors"
              >
                Reset Everything
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="px-6 border border-white/10 text-white/50 text-xs tracking-wider uppercase hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
