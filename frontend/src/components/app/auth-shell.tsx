import { Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthShell({
  title, subtitle, children, footer,
}: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">AIHMS</div>
              <div className="text-[11px] text-muted-foreground">AI Hospital Management</div>
            </div>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary to-[color:var(--color-info)] lg:block">
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px, 60px 60px" }} />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div />
          <div className="max-w-md">
            <div className="text-3xl font-semibold leading-tight">
              Deliver safer care with an AI-native hospital OS.
            </div>
            <p className="mt-4 text-sm opacity-90">
              Unified patient records, intelligent triage, predictive inventory and clinical
              copilots — designed for hospitals, clinics and multi-site healthcare networks.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { k: "Hospitals", v: "120+" },
                { k: "Beds", v: "18k" },
                { k: "Uptime", v: "99.99%" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-white/10 p-3 backdrop-blur">
                  <div className="text-xl font-bold">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-wider opacity-80">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs opacity-70">HIPAA-ready · SOC 2 · ISO 27001</div>
        </div>
      </div>
    </div>
  );
}