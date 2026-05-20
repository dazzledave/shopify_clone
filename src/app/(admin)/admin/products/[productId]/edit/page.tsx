import React from "react";
import ProductForm from "../../new/product-form";
import { getCategories } from "@/actions/category";
import { getProduct } from "@/actions/product";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { productId } = await params;
  const { product, error } = await getProduct(productId);
  const { categories } = await getCategories();

  if (error || !product) {
    notFound();
  }

  // Convert the Prisma Decimal and custom object fields to plain primitive values
  // so they can be securely passed across the Server-to-Client component boundary.
  const serializedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    categoryId: product.categoryId,
  };

  return (
    <div className="min-h-screen">
      <ProductForm 
        initialCategories={categories || []} 
        initialProduct={serializedProduct}
      />
    </div>
  );
}
