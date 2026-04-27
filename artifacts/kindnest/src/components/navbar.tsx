import { Link, useLocation } from "wouter";
import { Heart, PawPrint, LayoutDashboard, UserCircle2 } from "lucide-react";

type NavbarProps = {
  variant?: "app" | "landing";
};

const NAV_LINKS = [
  { href: "/animals", label: "Animals", icon: PawPrint },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Navbar({ variant = "app" }: NavbarProps) {
  const [path] = useLocation();
  const isLanding = variant === "landing";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-serif text-2xl tracking-tight"
        >
          <Heart className="h-6 w-6 fill-primary" />
          <span>Belong</span>
        </Link>

        {!isLanding && (
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = path === href || path.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  style={{
                    color: active ? "#5B9FE0" : "var(--foreground)",
                    opacity: active ? 1 : 0.8,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
            <Link
              href="/ngo/register"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              NGO Partners
            </Link>
          </div>
        )}

        {isLanding ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="h-11 px-5 sm:px-6 inline-flex items-center justify-center rounded-full text-sm font-medium text-foreground/85 hover:bg-muted/50 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/ngo/register"
              className="h-11 px-5 sm:px-6 inline-flex items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: "#5B9FE0" }}
            >
              Register NGO
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/profile/adopter"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-medium text-foreground/80 hover:bg-muted/50 transition-colors"
            >
              <UserCircle2 className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href="/login"
              className="h-11 px-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
