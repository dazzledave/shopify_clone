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
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest">
          Last 30 Days
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231.89" trend="+12.5%" icon={<DollarSign size={20} />} color="blue" />
        <StatCard title="Total Sales" value="+2,350" trend="+5.4%" icon={<ShoppingBag size={20} />} color="purple" />
        <StatCard title="New Customers" value="+122" trend="+18.2%" icon={<Users size={20} />} color="pink" />
        <StatCard title="Conversion Rate" value="3.45%" trend="+2.1%" icon={<TrendingUp size={20} />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">Sales Activity</h2>
            <button className="text-xs font-bold text-blue-500 uppercase tracking-widest hover:underline">View Report</button>
          </div>
          <div className="h-[300px] flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-500/60 rounded-t-lg group relative transition-all hover:to-blue-400" style={{ height: `${h}%` }}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(h * 123).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl">
          <h2 className="text-xl font-bold text-white tracking-tight uppercase mb-8">Recent Orders</h2>
          <div className="space-y-6">
            <RecentOrder name="Alex Rivera" email="alex@example.com" amount="$129.00" status="Paid" />
            <RecentOrder name="Sarah Chen" email="sarah@example.com" amount="$45.00" status="Paid" />
            <RecentOrder name="Marcus Wright" email="marcus@example.com" amount="$899.00" status="Pending" />
            <RecentOrder name="Elena Gomez" email="elena@example.com" amount="$250.00" status="Paid" />
          </div>
          <button className="w-full mt-10 py-3 border border-white/10 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:bg-white/5 transition-all">
            View All Orders
          </button>
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
    <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:border-white/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-green-500 text-xs font-bold">
          {trend}
          <ArrowUpRight size={14} />
        </div>
      </div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black text-white tracking-tighter">{value}</h3>
    </div>
  );
}

function RecentOrder({ name, email, amount, status }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-white leading-tight">{name}</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-wide">{email}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-white leading-tight">{amount}</p>
        <p className={`text-[9px] font-black uppercase tracking-widest ${status === "Paid" ? "text-green-500" : "text-orange-500"}`}>{status}</p>
      </div>
    </div>
  );
}
