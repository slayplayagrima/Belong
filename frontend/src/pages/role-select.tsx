import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Building, ArrowLeft, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-4">What brings you here today?</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your path to begin your journey with Belong.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Card 1: Adopt */}
            <motion.button
              onClick={() => navigate('/signup')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="text-left cursor-pointer group bg-card border border-border p-8 rounded-[2rem] hover:border-primary hover:shadow-2xl transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-200">
                <Heart className="w-8 h-8 text-primary group-hover:text-white group-hover:fill-white transition-colors duration-200" />
              </div>
              <h2 className="text-2xl font-serif mb-3">I want to adopt an animal</h2>
              <p className="text-muted-foreground leading-relaxed">
                Browse animals from verified NGOs across India and connect with the right shelter for you.
              </p>
            </motion.button>

            {/* Card 2: NGO */}
            <motion.button
              onClick={() => navigate('/ngo/register')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="text-left cursor-pointer group bg-card border border-border p-8 rounded-[2rem] hover:border-secondary hover:shadow-2xl transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-200">
                <Building className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-serif mb-3">I represent an NGO</h2>
              <p className="text-muted-foreground leading-relaxed">
                Register your organization, list animals available for adoption, and reach more families.
              </p>
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-center text-sm text-muted-foreground mb-4"
          >
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Log in
            </Link>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-[#9CA3AF] flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            All NGOs on our platform are verified to ensure safety and transparency.
          </motion.p>
        </div>
      </main>
    </div>
  );
}
