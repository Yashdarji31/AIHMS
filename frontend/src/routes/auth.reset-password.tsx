import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthShell } from "@/components/app/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — AIHMS" }] }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("password") !== data.get("confirm")) {
      toast.error("Passwords do not match"); return;
    }
    await api.resetPassword("token", String(data.get("password")));
    toast.success("Password updated");
    navigate({ to: "/auth/login" });
  }
  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a strong password — at least 12 characters."
      footer={<><Link to="/auth/login" className="font-medium text-primary hover:underline">Back to sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" name="confirm" type="password" required />
        </div>
        <Button type="submit" className="w-full">Update password</Button>
      </form>
    </AuthShell>
  );
}