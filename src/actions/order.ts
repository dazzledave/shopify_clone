"use server";

import db from "@/lib/db";
import { getStore } from "./store";

export const getOrders = async () => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const orders = await db.order.findMany({
      where: { storeId: store.id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { orders };
  } catch (error) {
    return { error: "Failed to fetch orders" };
  }
};
