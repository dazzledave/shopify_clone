"use server";

import db from "@/lib/db";
import { getStore } from "./store";
import { revalidatePath } from "next/cache";

export const getProducts = async () => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const products = await db.product.findMany({
      where: { storeId: store.id },
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { products };
  } catch (error) {
    return { error: "Failed to fetch products" };
  }
};

export const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}) => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const product = await db.product.create({
      data: {
        ...data,
        storeId: store.id,
      },
    });

    revalidatePath("/admin/products");
    return { success: "Product created successfully!", product };
  } catch (error) {
    return { error: "Failed to create product" };
  }
};

export const deleteProduct = async (id: string) => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    await db.product.delete({
      where: {
        id,
        storeId: store.id,
      },
    });

    revalidatePath("/admin/products");
    return { success: "Product deleted" };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
};

export const getProduct = async (id: string) => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const product = await db.product.findFirst({
      where: {
        id,
        storeId: store.id,
      },
      include: {
        category: true,
      },
    });

    if (!product) return { error: "Product not found" };

    return { product };
  } catch (error) {
    return { error: "Failed to fetch product" };
  }
};

export const updateProduct = async (
  id: string,
  data: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
  }
) => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const product = await db.product.update({
      where: {
        id,
        storeId: store.id,
      },
      data,
    });

    revalidatePath("/admin/products");
    return { success: "Product updated successfully!", product };
  } catch (error) {
    return { error: "Failed to update product" };
  }
};

