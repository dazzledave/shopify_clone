import React from "react";
import { Search, Filter, ShoppingBag, Download, MoreHorizontal } from "lucide-react";
import { getOrders } from "@/actions/order";

export default async function OrdersPage() {
  const { orders, error } = await getOrders();
  const orderList = orders || [];
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Orders</h1>
          <p className="text-gray-400 text-sm">Track and manage your customer orders.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-all uppercase tracking-wider">
          <Download size={18} />
          Export Orders
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search orders (ID, customer, email)..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 transition-all">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {orderList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
          <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 mb-6">
            <ShoppingBag size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
          <p className="text-gray-500 text-sm">Orders from your storefront will appear here once they are placed.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-3xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orderList.map((order: any) => {
                const total = order.orderItems.reduce((acc: number, item: any) => acc + Number(item.product.price), 0);
                return (
                  <OrderRow 
                    key={order.id}
                    id={`#${order.id.slice(0, 8)}`}
                    date={new Date(order.createdAt).toLocaleDateString()}
                    customer={order.phone || order.address || "Guest"}
                    status={order.isPaid ? "Paid" : "Pending"}
                    items={order.orderItems.length}
                    total={`$${total.toFixed(2)}`}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function OrderRow({ id, date, customer, status, items, total }: any) {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <span className="font-bold text-sm text-white">{id}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-400">
        {date}
      </td>
      <td className="px-6 py-4 text-sm text-gray-300">
        {customer}
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          status === "Paid" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-400">
        {items} items
      </td>
      <td className="px-6 py-4 text-sm text-white font-bold">
        {total}
      </td>
      <td className="px-6 py-4 text-right">
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}

