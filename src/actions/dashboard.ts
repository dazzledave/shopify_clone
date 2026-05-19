"use server";

import db from "@/lib/db";
import { getStore } from "./store";

export const getDashboardStats = async () => {
  const store = await getStore();
  if (!store) return null;

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

    let totalRevenue = 0;
    let totalSales = orders.length;

    orders.forEach((order) => {
      if (order.isPaid) {
        order.orderItems.forEach((item) => {
          totalRevenue += Number(item.product.price);
        });
      }
    });

    // Derive unique customers from orders based on phone number
    const uniqueCustomers = new Set();
    orders.forEach((order) => {
      const key = order.phone || order.address || order.id;
      uniqueCustomers.add(key);
    });

    const newCustomers = uniqueCustomers.size;

    return {
      totalRevenue,
      totalSales,
      newCustomers,
      recentOrders: orders.slice(0, 5), // Top 5 recent orders
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error);
    return null;
  }
};
