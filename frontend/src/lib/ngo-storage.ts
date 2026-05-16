export type NgoRegistration = {
  organizationName: string;
  registrationNumber: string;
  contactName: string;
  email: string;
  phone: string;
  description: string;
};

export type NgoProfile = {
  location: {
    address: string;
    city: string;
    state: string;
    serviceRadiusKm: string;
    areasServed: string[];
  };
  services: {
    adoption: boolean;
    rescue: boolean;
    foster: boolean;
    medical: boolean;
  };
  capacity: {
    currentAnimals: string;
    monthlyCapacity: string;
    animalTypes: string[];
  };
  media: {
    logoName: string;
    shelterImageNames: string[];
  };
  animalListings: { id: string; name: string }[];
};

const REG_KEY = "belong:ngo:registration";
const PROFILE_KEY = "belong:ngo:profile";

export const EMPTY_NGO_PROFILE: NgoProfile = {
  location: { address: "", city: "", state: "", serviceRadiusKm: "", areasServed: [] },
  services: { adoption: false, rescue: false, foster: false, medical: false },
  capacity: { currentAnimals: "", monthlyCapacity: "", animalTypes: [] },
  media: { logoName: "", shelterImageNames: [] },
  animalListings: [],
};

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode errors
  }
}

export function saveNgoRegistration(data: NgoRegistration) {
  safeWrite(REG_KEY, data);
}

export function loadNgoRegistration(): NgoRegistration | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(REG_KEY);
    return raw ? (JSON.parse(raw) as NgoRegistration) : null;
  } catch {
    return null;
  }
}

export function saveNgoProfile(profile: NgoProfile) {
  safeWrite(PROFILE_KEY, profile);
}

export function loadNgoProfile(): NgoProfile {
  return safeRead<NgoProfile>(PROFILE_KEY, EMPTY_NGO_PROFILE);
}
