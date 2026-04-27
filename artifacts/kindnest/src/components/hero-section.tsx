import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const trustSignals = [
  "Verified NGOs",
  "Safe adoption",
  "Transparent process",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-12 pb-32 overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-10 max-w-7xl grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">

        {/* LEFT — Text + CTA (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 max-w-2xl"
        >
          {/* Platform badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium mb-7"
          >
            <Sparkles className="w-4 h-4" />
            <span>Animal adoption, made gentle</span>
          </motion.div>

          {/* Emotional hook */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base lg:text-lg text-[#6B7280] mb-6 leading-relaxed"
          >
            Thousands of animals are waiting for a home. Some just haven't met you yet.
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] font-serif text-foreground leading-[0.95] mb-10 tracking-tight"
          >
            Find your <br />
            <span className="italic" style={{ color: "#5B9FE0" }}>
              companion.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-xl"
          >
            Adopt animals from verified NGOs near you — with care, clarity, and kindness at every step.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              href="/animals"
              data-testid="button-browse-animals"
              className="inline-flex items-center justify-center gap-2 h-16 px-10 rounded-full text-white font-semibold text-lg shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-95 w-full sm:w-auto"
              style={{ backgroundColor: "#5B9FE0" }}
            >
              Browse Animals
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/ngo/register"
              data-testid="button-register-ngo"
              className="inline-flex items-center justify-center gap-2 h-16 px-10 rounded-full text-base font-semibold text-foreground border-2 border-border bg-background transition-all duration-200 hover:border-primary/50 hover:bg-muted/40 active:scale-95 w-full sm:w-auto"
            >
              Register as NGO
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {trustSignals.map((signal) => (
              <span
                key={signal}
                className="flex items-center gap-1.5 text-sm text-[#6B7280]"
              >
                <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                {signal}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Image (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative"
        >
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white/70"
          >
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1100&q=85"
              alt="A happy rescued dog smiling outdoors"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          </motion.div>

          {/* Floating accent card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="hidden md:flex absolute -bottom-6 -left-6 lg:-left-10 items-center gap-3 bg-card border border-border rounded-2xl shadow-xl px-5 py-4"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#EAF3FB" }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: "#5B9FE0" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Verified NGO
              </p>
              <p className="text-sm font-medium text-foreground">
                Hope Shelter India
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
