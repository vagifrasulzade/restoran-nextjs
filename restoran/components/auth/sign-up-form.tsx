"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { signUpSchema, type SignUpInput } from "@/schemas/auth-schema";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong");
        return;
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/profile",
      });
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
          <p className="text-zinc-400 text-sm">Join The Grill House today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Full Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 transition"
            />
            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 transition"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Min. 6 characters"
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 transition"
            />
            {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
          </div>

          {serverError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{serverError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-400 hover:text-orange-300 font-medium transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
