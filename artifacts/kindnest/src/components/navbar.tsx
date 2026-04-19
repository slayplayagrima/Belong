import { Link } from "wouter";
import { Heart } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-serif text-2xl tracking-tight">
          <Heart className="h-6 w-6 fill-primary" />
          <span>Belong</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Our Mission</a>
          <a href="#impact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Impact</a>
          <Link href="/ngo/register" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">NGO Partners</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/role-select" 
            className="h-11 px-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </nav>
  );
}
