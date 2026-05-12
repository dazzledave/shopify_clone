"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(() => {
      register({ name, email, password }).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setSuccess(data?.success);
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        }
      });
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 selection:bg-blue-500/30">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            Create Store
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Start your 14-day free trial today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                placeholder="John Doe"
              />
            </div>
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

          {success && (
            <div className="rounded-xl bg-green-500/10 p-3 text-center text-xs font-bold text-green-500 border border-green-500/20">
              {success}. Redirecting...
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-white py-4 text-sm font-bold uppercase tracking-widest text-black shadow-lg shadow-white/10 transition-all hover:bg-gray-200 disabled:opacity-50"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-blue-500 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
