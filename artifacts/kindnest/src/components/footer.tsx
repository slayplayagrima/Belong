import { Heart } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted/50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-primary font-serif text-2xl tracking-tight mb-4">
              <Heart className="h-6 w-6 fill-primary" />
              <span>Belong</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed">
              Connecting loving families with animals from verified NGOs across India.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/animals" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Browse Animals
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/my-requests" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  My Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For NGOs */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">For NGOs</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/ngo/register" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Register NGO
                </Link>
              </li>
              <li>
                <Link href="/ngo/dashboard" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  NGO Dashboard
                </Link>
              </li>
              <li>
                <Link href="/ngo/add-animal" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Add an Animal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Company</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Belong India. All rights reserved.</p>
          <p className="text-xs text-center text-[#9CA3AF]">
            Built in collaboration with verified NGOs across India.
          </p>
          <div className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary mx-1" /> for a kinder world.
          </div>
        </div>
      </div>
    </footer>
  );
}
