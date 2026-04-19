import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Heart, MapPin, Sparkles } from "lucide-react";

const trustSignals = [
  "Verified NGOs across India",
  "Safe & transparent adoption",
  "Trusted by shelters nationwide",
];

const floatingCard = {
  image: "/images/hero.png",
  name: "Milo",
  tag: "2 months • Delhi",
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-10 pb-28 overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT — Text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl pl-0 lg:pl-4"
        >
          {/* Platform badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            <span>A centralized adoption platform for India</span>
          </div>

          {/* Emotional hook */}
          <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
            Thousands are waiting for a home. Some just haven't met you yet.
          </p>

          {/* Main heading */}
          <h1 className="text-5xl lg:text-[5.5rem] font-serif text-foreground leading-[1.05] mb-6 tracking-tight">
            Where hope <br />
            <span
              className="italic"
              style={{ color: "#FFB7A5" }}
            >
              meets home.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Every child and animal deserves a safe embrace. We connect compassionate people with those who need love, building families across India.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Primary — peach, white text, hover scale */}
            <Link
              href="/role-select"
              data-testid="button-start-journey"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 w-full sm:w-auto"
              style={{ backgroundColor: "#FFB7A5" }}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Secondary — border only, muted text, smaller */}
            <Link
              href="/ngo/register"
              data-testid="button-register-ngo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-[#6B7280] border border-[#D1D5DB] bg-transparent transition-all duration-200 hover:border-[#9CA3AF] hover:text-foreground hover:bg-muted/30 active:scale-95 w-full sm:w-auto"
            >
              Register as NGO
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {trustSignals.map((signal) => (
              <span
                key={signal}
                className="flex items-center gap-1.5 text-xs text-[#9CA3AF]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                {signal}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Image with floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative mt-8 lg:mt-16"
        >
          {/* Main image — slightly offset downward for asymmetry */}
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/60"
          >
            <img
              src="/images/hero.png"
              alt="Child hugging a golden retriever puppy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Floating animal preview card — top-left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            className="absolute -top-6 -left-6 lg:-left-10 bg-white rounded-2xl shadow-xl border border-[#F3F4F6] p-3 flex items-center gap-3 transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="/images/hero.png"
                alt="Milo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-none mb-1">{floatingCard.name}</p>
              <p className="text-xs text-[#9CA3AF] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {floatingCard.tag}
              </p>
            </div>
            <span
              className="ml-1 text-[10px] font-semibold px-2 py-1 rounded-full"
              style={{ backgroundColor: "#FFF0EC", color: "#FFB7A5" }}
            >
              Available
            </span>
          </motion.div>

          {/* Floating lives touched badge — bottom-left */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            whileHover={{ y: -4 }}
            className="absolute -bottom-6 -left-6 bg-card p-5 rounded-3xl shadow-xl flex items-center gap-4 border border-border transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </div>
            <div>
              <p className="font-serif text-2xl text-foreground leading-none mb-0.5">1,200+</p>
              <p className="text-xs font-medium text-muted-foreground">Lives Touched</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
