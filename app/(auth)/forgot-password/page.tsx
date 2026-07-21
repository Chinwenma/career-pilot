"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    console.log("Reset password email:", data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  }

  if (isSubmitted) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
        <h1 className="text-2xl font-bold text-white mb-4">Check Your Email</h1>
        <p className="text-slate-300 mb-6">
          We've sent a password reset link to your email. Check your inbox and
          follow the link to reset your password.
        </p>
        <Link href="/login">
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Back to Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Reset Password</h1>
      <p className="text-slate-400 mb-6">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/login" className="text-sm text-blue-400 hover:text-blue-300">
          Back to Login
        </Link>
      </div>
    </div>
  );
}