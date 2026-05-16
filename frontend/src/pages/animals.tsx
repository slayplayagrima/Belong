import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { AnimalCard } from "@/components/animal-card";
import {
  AnimalFilters,
  type AnimalFilterState,
} from "@/components/animal-filters";
import { ANIMALS } from "@/data/animals";

const INITIAL_FILTERS: AnimalFilterState = {
  category: "all",
  location: "any",
  age: "any",
  gender: "any",
};

export default function AnimalsPage() {
  const [filters, setFilters] = useState<AnimalFilterState>(INITIAL_FILTERS);

  const filtered = useMemo(() => {
    return ANIMALS.filter((a) => {
      if (filters.category !== "all" && a.category !== filters.category) return false;
      if (filters.location !== "any" && a.location.city !== filters.location) return false;
      if (filters.age !== "any" && a.ageBucket !== filters.age) return false;
      if (filters.gender !== "any" && a.gender !== filters.gender) return false;
      return true;
    });
  }, [filters]);

  const hasActiveFilter =
    filters.category !== "all" ||
    filters.location !== "any" ||
    filters.age !== "any" ||
    filters.gender !== "any";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-5xl font-serif mb-3">Find Your Companion</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse animals from trusted NGOs across India.
            </p>
          </motion.div>

          {/* Filters */}
          <div
            className="border rounded-2xl p-5 md:p-6 mb-8 shadow-sm"
            style={{ backgroundColor: "#EAF3FB", borderColor: "#5B9FE055" }}
          >
            <AnimalFilters value={filters} onChange={setFilters} />
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "companion" : "companions"} available
            </p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="text-sm font-medium hover:underline"
                style={{ color: "#5B9FE0" }}
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <div
                className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#EAF3FB" }}
              >
                <PawPrint className="w-6 h-6" style={{ color: "#5B9FE0" }} />
              </div>
              <h3 className="text-lg font-serif mb-1">No companions match your filters</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Try adjusting your filters or check back soon — new friends arrive every week.
              </p>
              <button
                type="button"
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="h-11 px-6 inline-flex items-center justify-center rounded-full text-white text-sm font-medium shadow-sm"
                style={{ backgroundColor: "#5B9FE0" }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
