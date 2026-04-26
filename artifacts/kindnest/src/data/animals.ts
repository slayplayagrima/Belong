export type AnimalCategory = "dog" | "cat" | "bird" | "fish" | "other";
export type AnimalGender = "Male" | "Female";
export type AnimalAgeBucket = "Young" | "Adult" | "Senior";
export type AnimalStatus = "available" | "pending" | "adopted";

export type AnimalLocation = { city: string; state: string };

export type AnimalAttributes = {
  vaccinated?: boolean;
  neutered?: boolean;
  size?: "Small" | "Medium" | "Large";
  energyLevel?: "Calm" | "Moderate" | "Active";
  goodWithKids?: boolean;
  notes?: string;
};

export type Animal = {
  id: string;
  name: string;
  category: AnimalCategory;
  species: string;
  age: number;
  ageBucket: AnimalAgeBucket;
  gender: AnimalGender;
  location: AnimalLocation;
  ngoId: string;
  status: AnimalStatus;
  image: string;
  tags: string[];
  attributes: AnimalAttributes;
};

export const ANIMALS: Animal[] = [
  {
    id: "a-001",
    name: "Mochi",
    category: "dog",
    species: "Indie Mix",
    age: 1,
    ageBucket: "Young",
    gender: "Female",
    location: { city: "Mumbai", state: "Maharashtra" },
    ngoId: "ngo-paws",
    status: "available",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    tags: ["Friendly", "Vaccinated"],
    attributes: { vaccinated: true, neutered: false, size: "Medium", energyLevel: "Moderate", goodWithKids: true },
  },
  {
    id: "a-002",
    name: "Rio",
    category: "dog",
    species: "Labrador",
    age: 4,
    ageBucket: "Adult",
    gender: "Male",
    location: { city: "Bengaluru", state: "Karnataka" },
    ngoId: "ngo-hope",
    status: "available",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    tags: ["House-trained", "Loves kids"],
    attributes: { vaccinated: true, neutered: true, size: "Large", energyLevel: "Active", goodWithKids: true },
  },
  {
    id: "a-003",
    name: "Whiskers",
    category: "cat",
    species: "Domestic Shorthair",
    age: 2,
    ageBucket: "Young",
    gender: "Male",
    location: { city: "Delhi", state: "Delhi" },
    ngoId: "ngo-friend",
    status: "available",
    image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=800&q=80",
    tags: ["Calm", "Indoor"],
    attributes: { vaccinated: true, neutered: true, size: "Small", energyLevel: "Calm" },
  },
  {
    id: "a-004",
    name: "Luna",
    category: "cat",
    species: "Persian Mix",
    age: 7,
    ageBucket: "Senior",
    gender: "Female",
    location: { city: "Pune", state: "Maharashtra" },
    ngoId: "ngo-paws",
    status: "available",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80",
    tags: ["Gentle", "Senior care"],
    attributes: { vaccinated: true, neutered: true, size: "Small", energyLevel: "Calm" },
  },
  {
    id: "a-005",
    name: "Pepper",
    category: "bird",
    species: "Budgerigar",
    age: 2,
    ageBucket: "Young",
    gender: "Female",
    location: { city: "Chennai", state: "Tamil Nadu" },
    ngoId: "ngo-wing",
    status: "available",
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=800&q=80",
    tags: ["Talkative", "Cage included"],
    attributes: { vaccinated: false, size: "Small", energyLevel: "Active" },
  },
  {
    id: "a-006",
    name: "Sunny",
    category: "bird",
    species: "Cockatiel",
    age: 3,
    ageBucket: "Adult",
    gender: "Male",
    location: { city: "Hyderabad", state: "Telangana" },
    ngoId: "ngo-wing",
    status: "available",
    image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?auto=format&fit=crop&w=800&q=80",
    tags: ["Hand-tamed"],
    attributes: { size: "Small", energyLevel: "Moderate" },
  },
  {
    id: "a-007",
    name: "Bubbles",
    category: "fish",
    species: "Betta",
    age: 1,
    ageBucket: "Young",
    gender: "Male",
    location: { city: "Kolkata", state: "West Bengal" },
    ngoId: "ngo-aqua",
    status: "available",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
    tags: ["Needs Tank", "Solo housing"],
    attributes: { size: "Small", notes: "Solo tank only" },
  },
  {
    id: "a-008",
    name: "Coral Trio",
    category: "fish",
    species: "Guppy (3)",
    age: 1,
    ageBucket: "Young",
    gender: "Female",
    location: { city: "Ahmedabad", state: "Gujarat" },
    ngoId: "ngo-aqua",
    status: "available",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80",
    tags: ["Group", "Beginner-friendly"],
    attributes: { size: "Small" },
  },
  {
    id: "a-009",
    name: "Thumper",
    category: "other",
    species: "Holland Lop Rabbit",
    age: 2,
    ageBucket: "Young",
    gender: "Male",
    location: { city: "Jaipur", state: "Rajasthan" },
    ngoId: "ngo-hope",
    status: "available",
    image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?auto=format&fit=crop&w=800&q=80",
    tags: ["Quiet", "Litter-trained"],
    attributes: { vaccinated: true, size: "Small", energyLevel: "Calm" },
  },
  {
    id: "a-010",
    name: "Shelly",
    category: "other",
    species: "Indian Star Tortoise",
    age: 8,
    ageBucket: "Senior",
    gender: "Female",
    location: { city: "Lucknow", state: "Uttar Pradesh" },
    ngoId: "ngo-friend",
    status: "available",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
    tags: ["Long-lived", "Specialist care"],
    attributes: { size: "Small", notes: "Specialist diet required" },
  },
  {
    id: "a-011",
    name: "Buddy",
    category: "dog",
    species: "Beagle",
    age: 6,
    ageBucket: "Adult",
    gender: "Male",
    location: { city: "Chandigarh", state: "Chandigarh" },
    ngoId: "ngo-hope",
    status: "available",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
    tags: ["Energetic", "Loves walks"],
    attributes: { vaccinated: true, size: "Medium", energyLevel: "Active" },
  },
  {
    id: "a-012",
    name: "Misty",
    category: "cat",
    species: "Indie",
    age: 4,
    ageBucket: "Adult",
    gender: "Female",
    location: { city: "Panaji", state: "Goa" },
    ngoId: "ngo-paws",
    status: "available",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
    tags: ["Independent", "Vaccinated"],
    attributes: { vaccinated: true, neutered: true, size: "Small", energyLevel: "Moderate" },
  },
];

export const LOCATIONS = Array.from(new Set(ANIMALS.map((a) => a.location.city))).sort();

export function findAnimal(id: string): Animal | undefined {
  return ANIMALS.find((a) => a.id === id);
}
