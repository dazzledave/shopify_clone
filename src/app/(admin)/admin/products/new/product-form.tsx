"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createProduct, updateProduct } from "@/actions/product";
import { createCategory } from "@/actions/category";

export default function ProductForm({
  initialCategories,
  initialProduct,
}: {
  initialCategories: any[];
  initialProduct?: any;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState(initialCategories);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price ? String(initialProduct.price) : "",
    categoryId: initialProduct?.categoryId || (initialCategories.length > 0 ? initialCategories[0].id : ""),
  });

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    setError("");
    startTransition(async () => {
      const result = await createCategory(newCategoryName);
      if (result.error) {
        setError(result.error);
      } else if (result.category) {
        setCategories([...categories, result.category]);
        setFormData({ ...formData, categoryId: result.category.id });
        setShowNewCategory(false);
        setNewCategoryName("");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.price || !formData.categoryId) {
      setError("Please fill in all required fields.");
      return;
    }

    startTransition(async () => {
      let result;

      if (initialProduct) {
        result = await updateProduct(initialProduct.id, {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          categoryId: formData.categoryId,
        });
      } else {
        result = await createProduct({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          categoryId: formData.categoryId,
        });
      }

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/products");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">
            {initialProduct ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-gray-400 text-sm">
            {initialProduct ? "Update your product details." : "Create a new product for your store."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Product Name *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Premium T-Shirt"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your product..."
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Category *</label>
              
              {showNewCategory ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCreateCategory();
                      }
                    }}
                    placeholder="New category..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                  />
                  <button 
                    type="button"
                    onClick={handleCreateCategory}
                    disabled={isPending}
                    className="px-3 py-2 bg-white text-black rounded-xl font-bold text-xs"
                  >
                    Add
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowNewCategory(false)}
                    className="px-3 py-2 bg-white/5 text-gray-400 rounded-xl font-bold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setShowNewCategory(true)}
                    className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 px-1"
                  >
                    <Plus size={12} /> Create new category
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
          {error}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-white/10">
        <button 
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Product
        </button>
      </div>
    </form>
  );
}
