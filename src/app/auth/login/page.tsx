"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(() => {
      login({ email, password }).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] selection:bg-blue-500/30">
      {/* Header */}
      <nav className="flex h-20 items-center justify-between px-8 lg:px-16 border-b border-white/5">
        <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          DHOPIFY
        </Link>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
          Platform Security Enabled
        </div>
      </nav>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to manage your store
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 p-3 text-center text-xs font-bold text-red-500 border border-red-500/20">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-blue-600 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="h-px flex-1 bg-white/5" />
          <span className="px-4 text-xs font-bold uppercase text-gray-500">Or continue with</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold uppercase transition-all hover:bg-white/10">
            Google
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold uppercase transition-all hover:bg-white/10">
            GitHub
          </button>
        </div>

        <p className="mt-10 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-blue-500 hover:underline"
          >
            Create one for free
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
