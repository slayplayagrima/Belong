import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, PawPrint } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const CATEGORIES = ["Dog", "Cat", "Bird", "Fish", "Other"];
const SIZES = ["Small", "Medium", "Large"];
const ENERGY = ["Calm", "Moderate", "Active"];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 h-10 rounded-full text-sm font-medium border transition-all ${
        active
          ? "text-white border-transparent shadow-sm"
          : "text-foreground bg-card border-border hover:border-primary/40"
      }`}
      style={active ? { backgroundColor: "#5B9FE0" } : undefined}
    >
      {children}
    </button>
  );
}

export default function NgoAddAnimal() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [energy, setEnergy] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [story, setStory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({
      title: "Animal saved (preview)",
      description: `${name || "This animal"} would be listed once your shelter is verified.`,
    });
    setTimeout(() => setLocation("/ngo/dashboard"), 800);
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/ngo/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to NGO dashboard
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <PawPrint className="w-3.5 h-3.5" />
              New listing
            </span>
            <h1 className="text-4xl font-serif text-foreground mb-2">Add an Animal</h1>
            <p className="text-muted-foreground">
              Share their story so the right family can find them.
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-[2rem] p-8 space-y-7"
          >
            {/* Photo placeholder */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Main photo
              </label>
              <div
                className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-10 text-center cursor-pointer hover:border-primary/40 transition-colors"
                onClick={() =>
                  toast({
                    title: "Photo upload coming soon",
                    description: "We'll wire this up to storage in the next phase.",
                  })
                }
              >
                <Upload
                  className="w-8 h-8 mx-auto mb-3"
                  style={{ color: "#5B9FE0" }}
                />
                <p className="text-sm font-medium text-foreground mb-1">
                  Click to upload
                </p>
                <p className="text-xs text-muted-foreground">PNG or JPG, up to 5MB</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Mochi"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Species
                </label>
                <input
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  placeholder="e.g. Indie Mix"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Pill
                    key={c}
                    active={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </Pill>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Age (years)
                </label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  min={0}
                  placeholder="2"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Gender
                </label>
                <div className="flex gap-2">
                  <Pill active={gender === "Female"} onClick={() => setGender("Female")}>
                    Female
                  </Pill>
                  <Pill active={gender === "Male"} onClick={() => setGender("Male")}>
                    Male
                  </Pill>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <Pill key={s} active={size === s} onClick={() => setSize(s)}>
                      {s}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Energy level
                </label>
                <div className="flex flex-wrap gap-2">
                  {ENERGY.map((e) => (
                    <Pill key={e} active={energy === e} onClick={() => setEnergy(e)}>
                      {e}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  State
                </label>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Maharashtra"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Their story
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Personality, history, special needs, what they're looking for in a home…"
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="h-12 px-6 inline-flex items-center justify-center rounded-full text-white font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                style={{ backgroundColor: "#5B9FE0" }}
              >
                Save Listing
              </button>
              <Link
                href="/ngo/dashboard"
                className="h-12 px-6 inline-flex items-center justify-center rounded-full font-medium text-foreground border border-border hover:bg-muted/40 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
