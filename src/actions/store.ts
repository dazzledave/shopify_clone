"use server";

import db from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Update store settings
 */
export const updateStore = async (values: { name?: string; subdomain?: string }) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const { name, subdomain } = values;

  // 1. If subdomain is being changed, check if it's already taken
  if (subdomain) {
    const existingStore = await db.store.findUnique({
      where: { subdomain },
    });

    if (existingStore && existingStore.userId !== session.user.id) {
      return { error: "Subdomain is already taken" };
    }
  }

  // 2. Find the user's store and update it
  try {
    const store = await db.store.findFirst({
      where: { userId: session.user.id },
    });

    if (!store) {
      // If they don't have a store yet, create one
      await db.store.create({
        data: {
          name: name || "My Store",
          subdomain: subdomain || `store-${session.user.id.slice(0, 5)}`,
          userId: session.user.id,
        },
      });
    } else {
      await db.store.update({
        where: { id: store.id },
        data: {
          name: name || undefined,
          subdomain: subdomain || undefined,
        },
      });
    }

    revalidatePath("/admin/settings");
    return { success: "Store updated successfully!" };
  } catch (error) {
    return { error: "Failed to update store" };
  }
};

/**
 * Delete a store
 */
export const deleteStore = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const store = await db.store.findFirst({
      where: { userId: session.user.id },
    });

    if (store) {
      await db.store.delete({
        where: { id: store.id },
      });
    }

    revalidatePath("/admin");
    return { success: "Store deleted" };
  } catch (error) {
    return { error: "Failed to delete store" };
  }
};

/**
 * Get the current user's store
 */
export const getStore = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  let store = await db.store.findFirst({
    where: { userId: session.user.id },
  });

  if (!store) {
    try {
      store = await db.store.create({
        data: {
          name: "My Store",
          subdomain: `store-${session.user.id.slice(0, 5)}`,
          userId: session.user.id,
        },
      });
    } catch (error) {
      console.error("Failed to auto-create store:", error);
      return null;
    }
  }

  return store;
};
