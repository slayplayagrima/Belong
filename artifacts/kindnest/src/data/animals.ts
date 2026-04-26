export type AnimalCategory = "dog" | "cat" | "bird" | "fish" | "other";
export type AnimalGender = "Male" | "Female";
export type AnimalAgeBucket = "Young" | "Adult" | "Senior";

export type Animal = {
  id: string;
  name: string;
  category: AnimalCategory;
  breed: string;
  age: number;
  ageBucket: AnimalAgeBucket;
  gender: AnimalGender;
  location: string;
  image: string;
  tags: string[];
};

export const ANIMALS: Animal[] = [
  {
    id: "a-001",
    name: "Mochi",
    category: "dog",
    breed: "Indie Mix",
    age: 1,
    ageBucket: "Young",
    gender: "Female",
    location: "Mumbai, MH",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    tags: ["Friendly", "Vaccinated"],
  },
  {
    id: "a-002",
    name: "Rio",
    category: "dog",
    breed: "Labrador",
    age: 4,
    ageBucket: "Adult",
    gender: "Male",
    location: "Bengaluru, KA",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    tags: ["House-trained", "Loves kids"],
  },
  {
    id: "a-003",
    name: "Whiskers",
    category: "cat",
    breed: "Domestic Shorthair",
    age: 2,
    ageBucket: "Young",
    gender: "Male",
    location: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=800&q=80",
    tags: ["Calm", "Indoor"],
  },
  {
    id: "a-004",
    name: "Luna",
    category: "cat",
    breed: "Persian Mix",
    age: 7,
    ageBucket: "Senior",
    gender: "Female",
    location: "Pune, MH",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80",
    tags: ["Gentle", "Senior care"],
  },
  {
    id: "a-005",
    name: "Pepper",
    category: "bird",
    breed: "Budgerigar",
    age: 2,
    ageBucket: "Young",
    gender: "Female",
    location: "Chennai, TN",
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=800&q=80",
    tags: ["Talkative", "Cage included"],
  },
  {
    id: "a-006",
    name: "Sunny",
    category: "bird",
    breed: "Cockatiel",
    age: 3,
    ageBucket: "Adult",
    gender: "Male",
    location: "Hyderabad, TS",
    image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?auto=format&fit=crop&w=800&q=80",
    tags: ["Hand-tamed"],
  },
  {
    id: "a-007",
    name: "Bubbles",
    category: "fish",
    breed: "Betta",
    age: 1,
    ageBucket: "Young",
    gender: "Male",
    location: "Kolkata, WB",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
    tags: ["Needs Tank", "Solo housing"],
  },
  {
    id: "a-008",
    name: "Coral Trio",
    category: "fish",
    breed: "Guppy (3)",
    age: 1,
    ageBucket: "Young",
    gender: "Female",
    location: "Ahmedabad, GJ",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80",
    tags: ["Group", "Beginner-friendly"],
  },
  {
    id: "a-009",
    name: "Thumper",
    category: "other",
    breed: "Holland Lop Rabbit",
    age: 2,
    ageBucket: "Young",
    gender: "Male",
    location: "Jaipur, RJ",
    image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?auto=format&fit=crop&w=800&q=80",
    tags: ["Quiet", "Litter-trained"],
  },
  {
    id: "a-010",
    name: "Shelly",
    category: "other",
    breed: "Indian Star Tortoise",
    age: 8,
    ageBucket: "Senior",
    gender: "Female",
    location: "Lucknow, UP",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
    tags: ["Long-lived", "Specialist care"],
  },
  {
    id: "a-011",
    name: "Buddy",
    category: "dog",
    breed: "Beagle",
    age: 6,
    ageBucket: "Adult",
    gender: "Male",
    location: "Chandigarh, CH",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
    tags: ["Energetic", "Loves walks"],
  },
  {
    id: "a-012",
    name: "Misty",
    category: "cat",
    breed: "Indie",
    age: 4,
    ageBucket: "Adult",
    gender: "Female",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
    tags: ["Independent", "Vaccinated"],
  },
];

export const LOCATIONS = Array.from(new Set(ANIMALS.map((a) => a.location))).sort();
