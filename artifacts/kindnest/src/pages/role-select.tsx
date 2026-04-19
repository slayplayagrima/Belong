import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Building, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Lotus } from "@/components/decorative/Lotus";

export default function RoleSelect() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4 mt-16">
        <div className="w-full max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-primary">How would you like to join us?</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Select your path to continue. Every journey here leads to more love in the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.button
              onClick={() => {}}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-left group bg-card border-2 border-transparent p-10 rounded-[2.5rem] hover:border-primary hover:shadow-[0_20px_50px_rgba(234,106,17,0.15)] transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Lotus className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h2 className="text-3xl font-serif mb-4 text-foreground group-hover:text-primary transition-colors">I want to adopt</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Find a loving pet waiting for a home, or explore resources and support for child adoption in India.
              </p>
            </motion.button>

            <motion.button
              onClick={() => setLocation('/ngo/register')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-left group bg-card border-2 border-transparent p-10 rounded-[2.5rem] hover:border-secondary hover:shadow-[0_20px_50px_rgba(233,184,36,0.15)] transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors">
                <Building className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h2 className="text-3xl font-serif mb-4 text-foreground group-hover:text-secondary-foreground transition-colors">I'm an NGO</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Register your verified shelter or child welfare organization to connect with compassionate families.
              </p>
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
