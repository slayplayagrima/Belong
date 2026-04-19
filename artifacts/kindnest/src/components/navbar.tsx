import { Link } from "wouter";
import { Lotus } from "./decorative/Lotus";

export function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60]" />
      <nav className="fixed top-1 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-serif text-3xl tracking-tight">
            <Lotus className="h-8 w-8 text-primary" />
            <span className="mt-1">KindNest</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Our Mission</a>
            <a href="#impact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Impact</a>
            <Link href="/ngo/register" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">NGO Partners</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/role-select" 
              className="h-11 px-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium hover:bg-[#d97218] transition-all shadow-[0_4px_14px_0_rgba(234,106,17,0.39)] hover:-translate-y-0.5"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
