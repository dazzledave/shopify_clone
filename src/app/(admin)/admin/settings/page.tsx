import React from "react";
import { Save, Globe, Store, User, CreditCard, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your store preferences and configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="space-y-1">
          <SettingsTab icon={<Store size={18} />} label="General" active />
          <SettingsTab icon={<Globe size={18} />} label="Domains" />
          <SettingsTab icon={<User size={18} />} label="Account" />
          <SettingsTab icon={<CreditCard size={18} />} label="Billing" />
          <SettingsTab icon={<Shield size={18} />} label="Security" />
        </aside>

        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl space-y-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Store Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">
                  Store Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your store name"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">
                  Subdomain
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="your-store-name"
                    className="flex-1 bg-black/50 border border-white/10 rounded-l-xl py-3 px-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                  />
                  <div className="bg-white/5 border border-white/10 border-l-0 rounded-r-xl px-4 flex items-center text-xs font-bold text-gray-500 uppercase">
                    .dhopify.com
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all uppercase tracking-wider">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all cursor-pointer ${
      active 
        ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}>
      {icon}
      {label}
    </div>
  );
}
