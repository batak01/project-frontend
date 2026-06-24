"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import apiClient from "@/services/apiClient";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      });

      const data = response.data;

      setErrorMessage("");

      login({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });


      if (data.user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/user");
      }

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-300 text-sm">
            Sign in to continue to your dashboard
          </p>
          {
            errorMessage && (
              <p className="text-red-400 text-sm mt-3">
                {errorMessage}
              </p>
            )
          }
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>

            <button
              type="button"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot Password?
            </button>
          </div> */}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition duration-300 shadow-lg shadow-cyan-500/30"
          >
            Sign In
          </button>
        </form>

        {/* <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-slate-400">
              Or continue with
            </span>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-2 gap-4">
          <button className="py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10">
            Google
          </button>

          <button className="py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10">
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          Don&apos;t have an account?{' '}
          <span className="text-cyan-400 cursor-pointer hover:text-cyan-300">
            Sign Up
          </span>
        </p> */}
      </div>
    </div>
  )
}
