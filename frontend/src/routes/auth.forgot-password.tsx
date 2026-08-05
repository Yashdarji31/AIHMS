import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthShell } from "@/components/app/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — AIHMS" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const navigate = useNavigate();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await api.forgotPassword(String(data.get("email")));
    toast.success("Reset link sent to your email");
    navigate({ to: "/auth/reset-password" });
  }
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a secure reset link."
      footer={<><Link to="/auth/login" className="font-medium text-primary hover:underline">Back to sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@hospital.io" />
        </div>
        <Button type="submit" className="w-full">Send reset link</Button>
      </form>
    </AuthShell>
  );
}