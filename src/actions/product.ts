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
        images: true,
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
  images?: { url: string }[];
}) => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        storeId: store.id,
        images: {
          createMany: {
            data: data.images ?? [],
          },
        },
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
        images: true,
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
    images?: { url: string }[];
  }
) => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    // Delete existing images for this product
    await db.image.deleteMany({
      where: { productId: id },
    });

    const product = await db.product.update({
      where: {
        id,
        storeId: store.id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        images: {
          createMany: {
            data: data.images ?? [],
          },
        },
      },
    });

    revalidatePath("/admin/products");
    return { success: "Product updated successfully!", product };
  } catch (error) {
    return { error: "Failed to update product" };
  }
};

