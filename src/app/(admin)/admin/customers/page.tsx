import React from "react";
import { Search, Filter, Users, UserPlus } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Customers</h1>
          <p className="text-gray-400 text-sm">View and manage your customer relationships.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-wider">
          <UserPlus size={18} />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 transition-all">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
        <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 mb-6">
          <Users size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No customers yet</h3>
        <p className="text-gray-500 text-sm">Customer profiles will be created here as soon as someone makes a purchase.</p>
      </div>
    </div>
  );
}
