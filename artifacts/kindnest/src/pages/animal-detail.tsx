import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Heart, ShieldCheck, Info } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { findAnimal } from "@/data/animals";
import { useToast } from "@/hooks/use-toast";

export default function AnimalDetail() {
  const [, params] = useRoute("/animals/:id");
  const animal = params ? findAnimal(params.id) : undefined;
  const { toast } = useToast();

  if (!animal) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-serif text-foreground mb-3">Animal not found</h1>
            <p className="text-muted-foreground mb-6">
              This profile may have been adopted or removed.
            </p>
            <Link
              href="/animals"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-white font-medium"
              style={{ backgroundColor: "#5B9FE0" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all animals
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const facts: { label: string; value: string }[] = [
    { label: "Species", value: animal.species },
    { label: "Age", value: `${animal.age} ${animal.age === 1 ? "year" : "years"} (${animal.ageBucket})` },
    { label: "Gender", value: animal.gender },
    { label: "Size", value: animal.attributes.size ?? "—" },
    { label: "Energy", value: animal.attributes.energyLevel ?? "—" },
    { label: "Vaccinated", value: animal.attributes.vaccinated ? "Yes" : "Not yet" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link
            href="/animals"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all animals
          </Link>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-border">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 flex flex-col"
            >
              <span
                className="inline-flex items-center w-fit text-xs font-semibold px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor: "#DBEAFE", color: "#1E40AF" }}
              >
                Available for adoption
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                {animal.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-5">{animal.species}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {animal.location.city}, {animal.location.state}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {animal.age} {animal.age === 1 ? "yr" : "yrs"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-xl border border-border bg-muted/30 px-4 py-3"
                  >
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                      {f.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>

              {animal.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {animal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {animal.attributes.notes && (
                <div className="flex items-start gap-2 rounded-xl bg-muted/40 px-4 py-3 mb-6">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{animal.attributes.notes}</p>
                </div>
              )}

              <button
                onClick={() =>
                  toast({
                    title: "Request sent",
                    description: `Your interest in ${animal.name} has been shared with the NGO.`,
                  })
                }
                className="h-12 inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-md mb-3"
                style={{ backgroundColor: "#5B9FE0" }}
              >
                <Heart className="w-4 h-4" />
                Request to Adopt
              </button>
              <Link
                href="/my-requests"
                className="h-11 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium text-foreground border border-border hover:bg-muted/40 transition-colors"
              >
                View my requests
              </Link>

              <div className="flex items-start gap-2 mt-6 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Listed by a verified NGO. All adoption decisions are made by the shelter.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
