import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const trustSignals = [
  "Verified NGOs across India",
  "Safe & transparent adoption",
  "Trusted by shelters nationwide",
];

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
              style={{ color: "#F0907A" }}
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
              style={{ backgroundColor: "#F0907A" }}
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
              src="https://lifesong.b-cdn.net/site/wp-content/uploads/2019/10/91535DFB-2B24-4F46-947E-9A36FD1A12B0-copy-2-1024x656.jpg"
              alt="Child hugging a golden retriever puppy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
