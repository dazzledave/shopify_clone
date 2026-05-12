import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl transition-all hover:bg-black/70">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Total Revenue</h3>
          </div>
          <div className="text-2xl font-bold text-white">$45,231.89</div>
          <p className="text-xs text-green-500">+20.1% from last month</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl transition-all hover:bg-black/70">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Sales</h3>
          </div>
          <div className="text-2xl font-bold text-white">+12,234</div>
          <p className="text-xs text-green-500">+19% from last month</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl transition-all hover:bg-black/70">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Active Now</h3>
          </div>
          <div className="text-2xl font-bold text-white">+573</div>
          <p className="text-xs text-blue-500">+201 since last hour</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl transition-all hover:bg-black/70">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Orders</h3>
          </div>
          <div className="text-2xl font-bold text-white">+1,234</div>
          <p className="text-xs text-gray-500">24 pending fulfillment</p>
        </div>
      </div>
    </div>
  );
}
