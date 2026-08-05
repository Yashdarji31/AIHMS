import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/app/auth-shell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { api } from "@/lib/api";

export const Route = createFileRoute("/auth/otp")({
  head: () => ({ meta: [{ title: "Verify identity — AIHMS" }] }),
  component: OtpPage,
});

function OtpPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  async function verify() {
    await api.verifyOtp(code);
    toast.success("Identity verified");
    navigate({ to: "/dashboard" });
  }
  return (
    <AuthShell title="Verify your identity" subtitle="Enter the 6-digit code sent to your email or SMS.">
      <div className="space-y-6">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-full" onClick={verify} disabled={code.length < 6}>Verify</Button>
        <p className="text-xs text-muted-foreground">Didn't receive a code? <button className="font-medium text-primary hover:underline">Resend</button></p>
      </div>
    </AuthShell>
  );
}