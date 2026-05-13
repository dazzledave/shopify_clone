import React from "react";
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Overview</h1>
          <p className="text-gray-400 text-sm">Welcome back to your store's control center.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$0.00" trend="0%" icon={<DollarSign size={20} />} color="blue" />
        <StatCard title="Total Sales" value="0" trend="0%" icon={<ShoppingBag size={20} />} color="purple" />
        <StatCard title="New Customers" value="0" trend="0%" icon={<Users size={20} />} color="pink" />
        <StatCard title="Conversion Rate" value="0.00%" trend="0%" icon={<TrendingUp size={20} />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">Sales Activity</h2>
          </div>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
             <p className="text-gray-500 text-sm font-medium">No sales activity data yet.</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl">
          <h2 className="text-xl font-bold text-white tracking-tight uppercase mb-8">Recent Orders</h2>
          <div className="h-[200px] flex items-center justify-center">
             <p className="text-gray-500 text-sm font-medium">No orders found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, color }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10",
    purple: "text-purple-500 bg-purple-500/10",
    pink: "text-pink-500 bg-pink-500/10",
    orange: "text-orange-500 bg-orange-500/10",
  };

  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black text-white tracking-tighter">{value}</h3>
    </div>
  );
}
