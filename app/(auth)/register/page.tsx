"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    console.log("Register:", data);
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-slate-200 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            {...register("name")}
            placeholder="Chinwe Okorie"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-200 text-sm font-medium mb-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-200 text-sm font-medium mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-slate-200 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300">
          Log in
        </Link>
      </div>
    </div>
  );
}