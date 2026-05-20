"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/actions/product";

export default function ProductActions({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      router.refresh();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#1a1a1a] shadow-xl shadow-black/50 overflow-hidden z-50">
          <Link 
            href={`/admin/products/${productId}/edit`}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors w-full text-left"
          >
            <Edit size={16} />
            Edit Product
          </Link>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full text-left border-t border-white/5"
          >
            <Trash2 size={16} />
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
}
