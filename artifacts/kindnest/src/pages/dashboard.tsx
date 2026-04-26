import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimalCard } from "@/components/animal-card";
import { ANIMALS } from "@/data/animals";

export default function Dashboard() {
  const nearYou = ANIMALS.slice(0, 3);
  const forYou = ANIMALS.slice(3, 6);
  const recentlyAdded = ANIMALS.slice(6, 9);

  const sections: { title: string; subtitle: string; items: typeof ANIMALS; icon: typeof MapPin }[] = [
    {
      title: "Near You",
      subtitle: "Animals from NGOs in your area.",
      items: nearYou,
      icon: MapPin,
    },
    {
      title: "Based on Your Preferences",
      subtitle: "Picked to match the kind of companion you'd love.",
      items: forYou,
      icon: Sparkles,
    },
    {
      title: "Recently Added",
      subtitle: "Newly listed animals from verified shelters.",
      items: recentlyAdded,
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
              Welcome back.
            </h1>
            <p className="text-lg text-muted-foreground">
              Here are companions waiting for someone like you.
            </p>
          </motion.div>

          {sections.map((section, sIdx) => (
            <section key={section.title} className="mb-14">
              <div className="flex items-end justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EAF3FB" }}
                  >
                    <section.icon className="w-5 h-5" style={{ color: "#5B9FE0" }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                  </div>
                </div>
                <Link
                  href="/animals"
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  style={{ color: "#5B9FE0" }}
                >
                  See all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sIdx * 0.05 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {section.items.map((a) => (
                  <AnimalCard key={a.id} animal={a} />
                ))}
              </motion.div>
            </section>
          ))}

          {/* Coming Soon — Child Adoption */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-dashed border-border bg-muted/30 p-8 md:p-10 mt-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#EAF3FB" }}
              >
                <Clock className="w-5 h-5" style={{ color: "#5B9FE0" }} />
              </div>
              <div className="flex-1">
                <span
                  className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2"
                  style={{ backgroundColor: "#DBEAFE", color: "#1E40AF" }}
                >
                  Coming Soon
                </span>
                <h3 className="text-xl font-serif text-foreground mb-1">
                  Child adoption — coming soon via verified agencies
                </h3>
                <p className="text-sm text-muted-foreground">
                  We're partnering with CARA-approved agencies to bring guided
                  child adoption support to Belong. Stay tuned.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
