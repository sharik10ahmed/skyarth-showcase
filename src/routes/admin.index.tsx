import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, ShieldCheck, User } from "lucide-react";

import logo from "@/assets/skyarth-logo.png";
import { useSite } from "@/store/SiteStore";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Login | SKYARTH uPVC Windows LLP" },
      { name: "description", content: "Secure administrator sign-in for the SKYARTH website content management panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "SKYARTH Admin Login" },
      { property: "og:description", content: "Administrator sign-in for the SKYARTH content panel." },
    ],
  }),
  component: AdminLogin,
});

const input =
  "w-full rounded-2xl border border-input bg-background px-5 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

function AdminLogin() {
  const { login } = useSite();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError("");
      void navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials. Use admin / admin123.");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden gradient-navy p-14 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="inline-flex w-fit rounded-2xl bg-background px-5 py-3">
          <img src={logo} alt="SKYARTH logo" width={220} height={60} className="h-10 w-auto object-contain" />
        </Link>
        <div>
          <h1 className="max-w-md text-4xl font-bold leading-tight text-primary-foreground">
            Manage every word, image and specification on skyarthupvc.com
          </h1>
          <p className="mt-6 max-w-md text-sm text-primary-foreground/70">
            A frontend content panel powered entirely by mock data and React state — no backend required.
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
          <ShieldCheck className="h-4 w-4" /> Restricted access
        </p>
      </div>

      <div className="grid place-items-center bg-background px-5 py-16">
        <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] border border-border bg-card p-9 shadow-luxe">
          <Link to="/" className="mb-8 inline-flex lg:hidden">
            <img src={logo} alt="SKYARTH logo" width={200} height={54} className="h-9 w-auto object-contain" />
          </Link>
          <h2 className="text-2xl font-bold text-navy-deep">Admin Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage website content.</p>

          <label className="mt-8 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy">Username</span>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={username} onChange={(e) => setUsername(e.target.value)} className={`${input} pl-11`} placeholder="admin" />
            </div>
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy">Password</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${input} pl-11`}
                placeholder="••••••••"
              />
            </div>
          </label>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

          <button type="submit" className="mt-8 w-full rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-navy-deep transition hover:-translate-y-0.5">
            Sign In
          </button>

          <p className="mt-6 rounded-2xl bg-secondary px-5 py-4 text-xs text-muted-foreground">
            Demo credentials — username <span className="font-semibold text-navy">admin</span>, password{" "}
            <span className="font-semibold text-navy">admin123</span>
          </p>
          <Link to="/" className="mt-6 block text-center text-xs font-medium text-gold-deep hover:underline">
            ← Back to website
          </Link>
        </form>
      </div>
    </div>
  );
}
