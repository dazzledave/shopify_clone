"use server";

import db from "@/lib/db";
import { getStore } from "./store";

export const getCustomers = async () => {
  const store = await getStore();
  if (!store) return { error: "Store not found" };

  try {
    const orders = await db.order.findMany({
      where: { storeId: store.id },
      select: {
        id: true,
        phone: true,
        address: true,
        createdAt: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Derive unique customers from orders based on phone number
    const customersMap = new Map<string, any>();

    orders.forEach((order) => {
      const key = order.phone || order.address || order.id; // Fallback to id if no contact info
      
      let totalSpent = 0;
      order.orderItems.forEach((item) => {
        totalSpent += Number(item.product.price);
      });

      if (!customersMap.has(key)) {
        customersMap.set(key, {
          id: key,
          phone: order.phone,
          address: order.address,
          totalOrders: 1,
          totalSpent: totalSpent,
          lastOrderDate: order.createdAt,
        });
      } else {
        const existing = customersMap.get(key);
        existing.totalOrders += 1;
        existing.totalSpent += totalSpent;
        // lastOrderDate remains the newest because orders are sorted desc
      }
    });

    const customers = Array.from(customersMap.values());

    return { customers };
  } catch (error) {
    return { error: "Failed to fetch customers" };
  }
};
