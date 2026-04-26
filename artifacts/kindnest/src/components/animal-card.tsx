import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import type { Animal } from "@/data/animals";

const CATEGORY_LABEL: Record<Animal["category"], string> = {
  dog: "Dog",
  cat: "Cat",
  bird: "Bird",
  fish: "Fish",
  other: "Other",
};

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={animal.image}
          alt={animal.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span
          className="absolute top-3 left-3 inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md"
          style={{ backgroundColor: "#EAF3FBE6", color: "#1E40AF" }}
        >
          {CATEGORY_LABEL[animal.category]}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="text-lg font-serif text-foreground">{animal.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {animal.age} {animal.age === 1 ? "yr" : "yrs"} · {animal.gender}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{animal.breed}</p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span>{animal.location}</span>
        </div>

        {animal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {animal.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          className="mt-auto h-11 inline-flex items-center justify-center gap-2 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
          style={{ backgroundColor: "#5B9FE0" }}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}
