import { Cat, Dog, Bird, Fish, PawPrint, LayoutGrid } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AnimalAgeBucket,
  AnimalCategory,
  AnimalGender,
} from "@/data/animals";
import { LOCATIONS } from "@/data/animals";

export type CategoryFilter = AnimalCategory | "all";

export type AnimalFilterState = {
  category: CategoryFilter;
  location: string;
  age: AnimalAgeBucket | "any";
  gender: AnimalGender | "any";
};

const CATEGORIES: { id: CategoryFilter; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "dog", label: "Dogs", icon: Dog },
  { id: "cat", label: "Cats", icon: Cat },
  { id: "bird", label: "Birds", icon: Bird },
  { id: "fish", label: "Fish", icon: Fish },
  { id: "other", label: "Others", icon: PawPrint },
];

export function AnimalFilters({
  value,
  onChange,
}: {
  value: AnimalFilterState;
  onChange: (next: AnimalFilterState) => void;
}) {
  function setField<K extends keyof AnimalFilterState>(key: K, v: AnimalFilterState[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="space-y-5">
      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const active = value.category === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setField("category", id)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border text-sm font-medium whitespace-nowrap transition-all"
              style={
                active
                  ? {
                      backgroundColor: "#5B9FE0",
                      borderColor: "#5B9FE0",
                      color: "#fff",
                    }
                  : {
                      backgroundColor: "transparent",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Secondary filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Select value={value.location} onValueChange={(v) => setField("location", v)}>
          <SelectTrigger className="h-11 rounded-full">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any location</SelectItem>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.age}
          onValueChange={(v) => setField("age", v as AnimalFilterState["age"])}
        >
          <SelectTrigger className="h-11 rounded-full">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any age</SelectItem>
            <SelectItem value="Young">Young</SelectItem>
            <SelectItem value="Adult">Adult</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={value.gender}
          onValueChange={(v) => setField("gender", v as AnimalFilterState["gender"])}
        >
          <SelectTrigger className="h-11 rounded-full">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any gender</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
