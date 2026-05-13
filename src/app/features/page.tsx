import React from "react";
import Link from "next/link";
import { Zap, Shield, Globe, BarChart3, Layers, Smartphone } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="flex h-20 items-center justify-between px-8 lg:px-16 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            DHOPIFY
          </span>
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
           <Link href="/features" className="text-white transition-colors">Features</Link>
           <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
           <Link href="/auth/login" className="px-5 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
              Get Started
           </Link>
        </div>
      </nav>

      <main className="py-24 px-8 lg:px-16">
        <div className="text-center mb-32">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-bold tracking-widest uppercase">
            Powering Next-Gen Commerce
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic">
            Engineered for <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Performance.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Dhopify provides the most advanced suite of tools ever built for online merchants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <FeatureCard 
            icon={<Zap />}
            title="Edge Delivery"
            description="Your store is deployed to 300+ edge locations globally, ensuring lightning-fast load times for every customer."
            color="blue"
          />
          <FeatureCard 
            icon={<Shield />}
            title="Enterprise Security"
            description="Bank-grade encryption, fraud protection, and automated backups come standard with every Dhopify store."
            color="purple"
          />
          <FeatureCard 
            icon={<Globe />}
            title="Global Infrastructure"
            description="Multi-tenant architecture that isolates your data while sharing the power of our global cloud infrastructure."
            color="pink"
          />
          <FeatureCard 
            icon={<BarChart3 />}
            title="Deep Analytics"
            description="Real-time data visualization that helps you understand customer behavior and optimize your sales funnel."
            color="orange"
          />
          <FeatureCard 
            icon={<Layers />}
            title="Unified Dashboard"
            description="Manage multiple stores, inventories, and orders from a single, high-performance glassmorphic interface."
            color="green"
          />
          <FeatureCard 
            icon={<Smartphone />}
            title="Mobile Optimized"
            description="Responsive storefronts that look and perform perfectly on every device, out of the box."
            color="cyan"
          />
        </div>

        <div className="mt-40 p-12 rounded-[3rem] border border-white/5 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent backdrop-blur-3xl text-center">
          <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase italic">Ready to transform your business?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">Join thousands of merchants who are building the future of commerce on Dhopify.</p>
          <Link href="/auth/register" className="inline-block px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
            Start Your Journey
          </Link>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    green: "text-green-400 bg-green-500/10 border-green-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  };

  return (
    <div className="group p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:-translate-y-2">
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-8 border transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
