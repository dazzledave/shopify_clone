"use client";

import React from "react";
import { logout } from "@/actions/auth";
import { useSession } from "next-auth/react";
import { LogOut, LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-2xl hidden md:block">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Dhopify
          </span>
        </div>
        <nav className="space-y-1 p-4">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<ShoppingBag size={18} />} label="Products" />
          <NavItem icon={<ShoppingCart size={18} />} label="Orders" />
          <NavItem icon={<Users size={18} />} label="Customers" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>
      
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-black/30 px-8 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Welcome back, <span className="text-white font-medium">{session?.user?.name || "Merchant"}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => logout()}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 transition-all hover:bg-white/5 hover:text-red-400"
            >
              <LogOut size={14} />
              Sign Out
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20 border border-white/10" />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all cursor-pointer ${
      active 
        ? "bg-white/10 text-white font-medium" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}>
      {icon}
      {label}
    </div>
  );
}
