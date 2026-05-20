import React from "react";
import { Plus, Search, Filter, ShoppingBag, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/actions/product";
import ProductActions from "./ProductActions";

export default async function ProductsPage() {
  const { products, error } = await getProducts();
  const productList = products || [];
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Products</h1>
          <p className="text-gray-400 text-sm">Manage your inventory and product listings.</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-wider">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 transition-all">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {productList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
          <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 mb-6">
            <ShoppingBag size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
          <p className="text-gray-500 text-sm mb-8">Get started by creating your first product.</p>
          <Link href="/admin/products/new" className="px-6 py-3 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
            Create Product
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Inventory</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {productList.map((product: any) => (
                <ProductRow 
                  key={product.id}
                  id={product.id}
                  name={product.name} 
                  status={product.isArchived ? "Draft" : "Active"} 
                  inventory="Unlimited" 
                  price={`$${Number(product.price).toFixed(2)}`} 
                  category={product.category.name}
                  image="📦"
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProductRow({ id, name, status, inventory, price, category, image }: any) {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
            {image}
          </div>
          <span className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          status === "Active" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-400 font-medium">
        {inventory}
      </td>
      <td className="px-6 py-4 text-sm text-white font-bold">
        {price}
      </td>
      <td className="px-6 py-4 text-sm text-gray-400">
        {category}
      </td>
      <td className="px-6 py-4 text-right">
        <ProductActions productId={id} />
      </td>
    </tr>
  );
}

