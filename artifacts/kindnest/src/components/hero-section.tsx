import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/button";
import { Lotus } from "./decorative/Lotus";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
      {/* Decorative soft blur background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      
      {/* Mandala Background Accents */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] opacity-10 blur-md pointer-events-none -z-10">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="2 6" />
          <path d="M100 20 C110 50 130 70 180 100 C130 130 110 150 100 180 C90 150 70 130 20 100 C70 70 90 50 100 20 Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] opacity-5 blur-lg pointer-events-none -z-10">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-secondary">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="2 6" />
          <path d="M100 20 C110 50 130 70 180 100 C130 130 110 150 100 180 C90 150 70 130 20 100 C70 70 90 50 100 20 Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>आपका घर, उनकी उम्मीद — India's adoption platform</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-serif text-foreground leading-[1.2] mb-6 drop-shadow-sm">
            Where hope <br />
            <span className="text-primary">meets home.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl font-medium">
            Every child and animal deserves a safe embrace. We connect compassionate people with those who need love, building families and raising awareness across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/role-select" className="inline-flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="muted" size="lg">
              <Link href="/ngo/register">
                Register as NGO
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(234,106,17,0.15)] border-4 border-card/50">
            <img 
              src="/images/hero.png" 
              alt="Indian girl hugging a golden retriever puppy in a marigold garden" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-6 -left-6 bg-card p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-primary/20 backdrop-blur-sm"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Lotus className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-serif text-3xl text-foreground leading-none mb-1">1,200+</p>
              <p className="text-sm font-medium text-muted-foreground">Lives Touched</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
