import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plus, PawPrint, Inbox, BarChart3, Building2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const STATS = [
  { label: "Listed Animals", value: "0", icon: PawPrint },
  { label: "Open Requests", value: "0", icon: Inbox },
  { label: "Adoptions This Month", value: "0", icon: BarChart3 },
];

export default function NgoDashboard() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5" />
                NGO workspace
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                NGO Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your listings, applications, and shelter activity in one place.
              </p>
            </div>

            <Link
              href="/ngo/add-animal"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-white font-medium shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              style={{ backgroundColor: "#5B9FE0" }}
            >
              <Plus className="w-4 h-4" />
              Add an Animal
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#EAF3FB" }}
                >
                  <s.icon className="w-5 h-5" style={{ color: "#5B9FE0" }} />
                </div>
                <p className="text-3xl font-serif text-foreground mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-dashed border-border bg-muted/30 p-12 text-center">
            <PawPrint
              className="w-10 h-10 mx-auto mb-4"
              style={{ color: "#5B9FE0" }}
            />
            <h2 className="text-2xl font-serif text-foreground mb-2">
              No animals listed yet
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Add your first animal so families can discover them. You can include
              photos, history, vaccination details, and adoption requirements.
            </p>
            <Link
              href="/ngo/add-animal"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-white font-medium"
              style={{ backgroundColor: "#5B9FE0" }}
            >
              <Plus className="w-4 h-4" />
              Add an Animal
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
