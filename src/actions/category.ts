"use server";

import db from "@/lib/db";
import { getStore } from "./store";
import { revalidatePath } from "next/cache";

export const getCategories = async () => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const categories = await db.category.findMany({
      where: { storeId: store.id },
      orderBy: { name: "asc" },
    });

    return { categories };
  } catch (error) {
    return { error: "Failed to fetch categories" };
  }
};

export const createCategory = async (name: string) => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const category = await db.category.create({
      data: {
        name,
        storeId: store.id,
      },
    });

    revalidatePath("/admin/products/new");
    return { success: "Category created successfully!", category };
  } catch (error) {
    return { error: "Failed to create category" };
  }
};
