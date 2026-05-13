import React from "react";
import Link from "next/link";

export default function PlatformLandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <nav className="flex h-20 items-center justify-between px-8 lg:px-16 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <div className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            DHOPIFY
          </div>
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
           <Link href="/features" className="hover:text-white cursor-pointer transition-colors">Features</Link>
           <Link href="/pricing" className="hover:text-white cursor-pointer transition-colors">Pricing</Link>
           <Link href="/admin" className="px-5 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
              Get Started
           </Link>
        </div>
      </nav>

      <main>
        <section className="py-32 px-8 lg:px-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-widest uppercase">
            The Future of E-commerce
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            SELL ANYTHING. <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">ANYWHERE.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12">
            Build your brand, sell your products, and manage your business with the most advanced multi-tenant e-commerce platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/auth/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                Start your free trial
             </Link>
             <button className="w-full sm:w-auto px-8 py-4 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">
                View Demo
             </button>
          </div>
        </section>

        <section className="py-32 px-8 lg:px-16 border-t border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-blue-500/30 transition-colors group">
                 <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <h3 className="text-xl font-bold mb-4">Lightning Fast</h3>
                 <p className="text-gray-400">Optimized for speed with Next.js SSR and edge caching. Your store loads in milliseconds.</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-purple-500/30 transition-colors group">
                 <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <h3 className="text-xl font-bold mb-4">Secure Payments</h3>
                 <p className="text-gray-400">Integrated with Stripe for world-class security and global payment support.</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-pink-500/30 transition-colors group">
                 <div className="h-12 w-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                 </div>
                 <h3 className="text-xl font-bold mb-4">Multi-Tenant</h3>
                 <p className="text-gray-400">Run thousands of stores on a single infrastructure with perfect data isolation.</p>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
