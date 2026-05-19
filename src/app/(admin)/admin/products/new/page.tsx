import React from "react";
import ProductForm from "./product-form";
import { getCategories } from "@/actions/category";

export default async function NewProductPage() {
  const { categories } = await getCategories();

  return (
    <div className="min-h-screen">
      <ProductForm initialCategories={categories || []} />
    </div>
  );
}
