"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Plus } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState("Sell online");
  const [storeName, setStoreName] = useState("");

  const goals = [
    "Sell online",
    "Sell in-store",
    "Dropshipping",
    "Sell digital products",
    "Move existing store"
  ];

  const handleContinue = () => {
    // For now, we just redirect to the dashboard
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0a0c0d] flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">
          Let's get started
        </h1>
        <p className="text-gray-400 text-lg">
          Add some details to customize your setup
        </p>
      </div>

      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] p-10 md:p-14 shadow-2xl">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute -left-20 top-0 hidden lg:flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="space-y-10">
          {/* Section 1: Goals */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              What can we help you do?
            </h2>
            <div className="flex flex-wrap gap-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all text-sm font-medium ${
                    selectedGoal === goal
                      ? "bg-black border-black text-white"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {selectedGoal === goal ? <Check size={16} /> : <Plus size={16} />}
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Store Name */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              What should we call your store?
            </h2>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="My Store (you can change this later)"
              className="w-full px-6 py-5 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="space-y-6 pt-4 text-center">
            <button
              onClick={handleContinue}
              className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
            >
              Continue
            </button>
            <Link 
              href="/admin"
              className="block text-gray-900 font-bold underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              I'll do this later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
