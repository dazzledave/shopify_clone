import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="flex h-20 items-center justify-between px-8 lg:px-16 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          DHOPIFY
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
           <Link href="/features" className="hover:text-white transition-colors">Features</Link>
           <Link href="/pricing" className="text-white transition-colors">Pricing</Link>
           <Link href="/auth/login" className="px-5 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
              Get Started
           </Link>
        </div>
      </nav>

      <main className="py-24 px-8 lg:px-16">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic">
            Simple, Transparent <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Pricing.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the perfect plan for your business, from startups to global enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Basic Plan */}
          <PricingCard 
            tier="Basic"
            price="$29"
            description="Perfect for new merchants starting their journey."
            features={[
              "1 Store Instance",
              "Unlimited Products",
              "Standard Analytics",
              "24/7 Support",
              "2% Transaction Fee"
            ]}
          />

          {/* Pro Plan */}
          <PricingCard 
            tier="Professional"
            price="$79"
            description="Scalable features for growing businesses."
            features={[
              "5 Store Instances",
              "Advanced Analytics",
              "Custom Domains",
              "Priority Support",
              "0.5% Transaction Fee",
              "Inventory Automation"
            ]}
            recommended
          />

          {/* Enterprise Plan */}
          <PricingCard 
            tier="Enterprise"
            price="Custom"
            description="Dedicated infrastructure for massive scale."
            features={[
              "Unlimited Stores",
              "Dedicated Account Manager",
              "Custom API Access",
              "SLA Guarantee",
              "0% Transaction Fee",
              "White-label Branding"
            ]}
          />
        </div>
      </main>
    </div>
  );
}

function PricingCard({ tier, price, description, features, recommended = false }: { 
  tier: string; 
  price: string; 
  description: string; 
  features: string[]; 
  recommended?: boolean;
}) {
  return (
    <div className={`relative p-8 rounded-3xl border ${recommended ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/5 bg-white/[0.02]'} backdrop-blur-3xl flex flex-col`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold uppercase tracking-widest mb-2">{tier}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black tracking-tighter">{price}</span>
          {price !== "Custom" && <span className="text-gray-500 text-sm">/mo</span>}
        </div>
        <p className="mt-4 text-sm text-gray-400">{description}</p>
      </div>

      <div className="flex-1 space-y-4 mb-8">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Check size={12} />
            </div>
            {feature}
          </div>
        ))}
      </div>

      <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${
        recommended 
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20' 
          : 'bg-white text-black hover:bg-gray-200'
      }`}>
        {price === "Custom" ? "Contact Sales" : "Get Started"}
      </button>
    </div>
  );
}
