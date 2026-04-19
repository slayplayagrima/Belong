import { Link } from "wouter";
import { Lotus } from "./decorative/Lotus";

export function Footer() {
  return (
    <footer className="bg-muted/50 pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-primary font-serif text-3xl tracking-tight mb-4">
              <Lotus className="h-8 w-8 text-primary" />
              <span className="mt-1">KindNest</span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-lg mb-6">
              Where hope meets home. Connecting loving families with animals and raising awareness for child adoption across India.
            </p>
            <p className="text-sm text-primary font-medium">Registered under the laws of India | Supporting CARA & Animal Welfare Board</p>
          </div>
          <div>
            <h4 className="font-serif text-2xl mb-6 text-foreground">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/role-select" className="text-muted-foreground hover:text-primary transition-colors">Adopt</Link></li>
              <li><Link href="/role-select" className="text-muted-foreground hover:text-primary transition-colors">Volunteer</Link></li>
              <li><Link href="/ngo/register" className="text-muted-foreground hover:text-primary transition-colors">Partner NGOs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-2xl mb-6 text-foreground">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KindNest India. All rights reserved.</p>
          <div className="flex items-center gap-1 font-medium">
            Made with <Lotus className="h-4 w-4 text-primary mx-1" /> for every ghar across India.
          </div>
        </div>
      </div>
    </footer>
  );
}
