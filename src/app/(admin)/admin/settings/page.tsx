"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Save, Globe, Store, User, CreditCard, Shield, Loader2, Key, Mail, Lock } from "lucide-react";
import { getStore, updateStore, deleteStore } from "@/actions/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type TabType = "General" | "Domains" | "Account" | "Billing" | "Security";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("General");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  
  const [storeData, setStoreData] = useState({
    name: "",
    subdomain: ""
  });

  // Fetch store data on load
  useEffect(() => {
    getStore().then((store) => {
      if (store) {
        setStoreData({
          name: store.name,
          subdomain: store.subdomain
        });
      }
      setIsLoading(false);
    });
  }, []);

  const handleSaveStore = () => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updateStore(storeData).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) setSuccess(data.success);
      });
    });
  };

  const handleDelete = () => {
    if (confirm("Are you absolutely sure? This will delete your entire store and all its data.")) {
      startTransition(() => {
        deleteStore().then(() => {
          router.push("/onboarding");
        });
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your store preferences and configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="space-y-1">
          <SettingsTab 
            icon={<Store size={18} />} 
            label="General" 
            active={activeTab === "General"} 
            onClick={() => setActiveTab("General")} 
          />
          <SettingsTab 
            icon={<Globe size={18} />} 
            label="Domains" 
            active={activeTab === "Domains"} 
            onClick={() => setActiveTab("Domains")} 
          />
          <SettingsTab 
            icon={<User size={18} />} 
            label="Account" 
            active={activeTab === "Account"} 
            onClick={() => setActiveTab("Account")} 
          />
          <SettingsTab 
            icon={<CreditCard size={18} />} 
            label="Billing" 
            active={activeTab === "Billing"} 
            onClick={() => setActiveTab("Billing")} 
          />
          <SettingsTab 
            icon={<Shield size={18} />} 
            label="Security" 
            active={activeTab === "Security"} 
            onClick={() => setActiveTab("Security")} 
          />
        </aside>

        <div className="lg:col-span-2">
          {activeTab === "General" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl space-y-8">
                <h2 className="text-xl font-bold text-white tracking-tight">Store Information</h2>
                <div className="space-y-4">
                  <InputGroup 
                    label="Store Name" 
                    value={storeData.name} 
                    onChange={(val: string) => setStoreData({...storeData, name: val})}
                    placeholder="My Awesome Shop"
                  />
                  <InputGroup 
                    label="Support Email" 
                    value={session?.user?.email || ""} 
                    disabled
                  />
                </div>
                {success && activeTab === "General" && <p className="text-green-500 text-xs font-bold uppercase tracking-widest">{success}</p>}
                <div className="pt-4 flex justify-end">
                  <button onClick={handleSaveStore} className="btn-primary flex items-center gap-2">
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-red-500/10 bg-red-500/5 backdrop-blur-3xl space-y-4">
                <h2 className="text-xl font-bold text-red-500 tracking-tight">Danger Zone</h2>
                <p className="text-sm text-gray-400">Permanently delete this store and all its data.</p>
                <button onClick={handleDelete} className="btn-danger">Delete Store</button>
              </div>
            </div>
          )}

          {activeTab === "Domains" && (
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-white tracking-tight">Domain Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Subdomain</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={storeData.subdomain}
                      onChange={(e) => setStoreData({...storeData, subdomain: e.target.value})}
                      className="flex-1 bg-black/50 border border-white/10 rounded-l-xl py-3 px-4 text-sm text-white focus:border-blue-500/50 outline-none"
                    />
                    <div className="bg-white/5 border border-white/10 border-l-0 rounded-r-xl px-4 flex items-center text-xs font-bold text-gray-500 uppercase">.dhopify.com</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button onClick={handleSaveStore} className="btn-primary flex items-center gap-2">
                  <Save size={18} /> Update Domain
                </button>
              </div>
            </div>
          )}

          {activeTab === "Account" && (
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-white tracking-tight">Merchant Profile</h2>
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                <div>
                  <h3 className="font-bold text-white text-lg">{session?.user?.name}</h3>
                  <p className="text-sm text-gray-500">{session?.user?.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <InputGroup label="Full Name" value={session?.user?.name || ""} disabled />
                <InputGroup label="Account Email" value={session?.user?.email || ""} disabled icon={<Mail size={16} />} />
              </div>
            </div>
          )}

          {activeTab === "Billing" && (
            <div className="p-12 rounded-[2.5rem] border border-dashed border-white/10 bg-white/[0.01] text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center text-gray-500 mx-auto mb-6">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Billing Coming Soon</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">We are currently integrating Stripe to provide seamless subscription management.</p>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-white tracking-tight">Security & Password</h2>
              <div className="space-y-4">
                <InputGroup label="Current Password" type="password" placeholder="••••••••" icon={<Lock size={16} />} />
                <InputGroup label="New Password" type="password" placeholder="••••••••" icon={<Key size={16} />} />
              </div>
              <div className="pt-4 flex justify-end">
                <button className="btn-primary">Update Password</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .btn-primary { @apply px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all uppercase tracking-wider; }
        .btn-danger { @apply px-6 py-3 bg-red-600/10 border border-red-600/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider; }
      `}</style>
    </div>
  );
}

function SettingsTab({ icon, label, active = false, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all cursor-pointer ${
        active 
          ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20" 
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function InputGroup({ label, value, onChange, placeholder, disabled, type = "text", icon }: any) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input 
          type={type} 
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-black/50 border border-white/10 rounded-xl py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-all ${icon ? 'pl-10 pr-4' : 'px-4'} ${disabled ? 'opacity-50 cursor-not-allowed bg-white/5' : ''}`}
        />
      </div>
    </div>
  );
}
