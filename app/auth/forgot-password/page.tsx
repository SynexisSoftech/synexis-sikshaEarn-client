"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import { useSearchParams } from 'next/navigation';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1 - Enter email, Step 2 - Enter OTP and new password
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleForgotPassword = async (data: any) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/auth/forgot-password", data);
      setMessage(res.data.message || "Check your email for OTP.");
      setStep(2); // Move to OTP step
    } catch (err: any) {
      setMessage(err.response?.data || "Forgot password failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: any) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/auth/reset-password", {
        email: forgotPasswordForm.getValues("email"),
        otp: data.otp,
        newPassword: data.newPassword,
      });
      setMessage(res.data.message || "Password reset successful!");
      router.push("/login"); // Redirect to login after password reset
    } catch (err: any) {
      setMessage(err.response?.data || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified === "1") {
      setMessage("✅ Email verified! You can now log in.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="mt-6 text-2xl font-bold">Forgot Password</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email to receive an OTP.
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...forgotPasswordForm.register("email")} />
              </div>
              {message && <p className="text-sm text-red-500">{message}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-6">
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" {...resetPasswordForm.register("otp")} />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" {...resetPasswordForm.register("newPassword")} />
              </div>
              {message && <p className="text-sm text-red-500">{message}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
