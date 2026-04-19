import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
      {/* Decorative soft blur background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>A centralized adoption platform for India</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif text-foreground leading-[1.1] mb-6">
            Where hope <br />
            <span className="text-primary italic">meets home.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
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
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50">
            <img 
              src="/images/hero.png" 
              alt="Child hugging a golden retriever puppy" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-6 -left-6 bg-card p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-border"
          >
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary fill-primary" />
            </div>
            <div>
              <p className="font-serif text-3xl text-foreground">1,200+</p>
              <p className="text-sm font-medium text-muted-foreground">Lives Touched</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
