import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Heart,
  Activity,
  Image as ImageIcon,
  PawPrint,
  Plus,
  Upload,
  CheckCircle2,
  Pencil,
  Stethoscope,
  Home as HomeIcon,
  ShieldAlert,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import {
  EMPTY_NGO_PROFILE,
  loadNgoProfile,
  loadNgoRegistration,
  saveNgoProfile,
  type NgoProfile,
} from "@/lib/ngo-storage";

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const AREA_OPTIONS = [
  "Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Pan-India",
];

const ANIMAL_TYPES = ["Dogs", "Cats", "Birds", "Fish", "Small Mammals", "Reptiles", "Other"];

const SERVICE_CARDS: {
  key: keyof NgoProfile["services"];
  label: string;
  desc: string;
  icon: typeof Heart;
}[] = [
  { key: "adoption", label: "Adoption", desc: "Place animals with families", icon: Heart },
  { key: "rescue", label: "Rescue", desc: "Pick up animals in need", icon: ShieldAlert },
  { key: "foster", label: "Foster", desc: "Run a foster network", icon: HomeIcon },
  { key: "medical", label: "Medical", desc: "Treatment & rehab", icon: Stethoscope },
];

type SectionId = "organization" | "location" | "services" | "capacity" | "media" | "listings";

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

function SectionCard({
  id,
  number,
  title,
  description,
  icon: Icon,
  complete,
  children,
}: {
  id: SectionId;
  number: string;
  title: string;
  description?: string;
  icon: typeof MapPin;
  complete: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={`section-${id}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-[2rem] p-6 md:p-8 scroll-mt-32"
    >
      <header className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#EAF3FB" }}
          >
            <Icon className="w-5 h-5" style={{ color: "#5B9FE0" }} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {number}
            </p>
            <h2 className="text-xl md:text-2xl font-serif text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
        {complete && (
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ backgroundColor: "#DBEAFE", color: "#1E40AF" }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Complete
          </span>
        )}
      </header>
      <div className="space-y-5">{children}</div>
    </motion.section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-[#5B9FE0] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function NgoProfilePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [registration, setRegistration] = useState(() => loadNgoRegistration());
  const [profile, setProfile] = useState<NgoProfile>(() => loadNgoProfile());

  useEffect(() => {
    setRegistration(loadNgoRegistration());
  }, []);

  function patch<K extends keyof NgoProfile>(section: K, patch: Partial<NgoProfile[K]>) {
    setProfile((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
  }

  function toggleArea(area: string) {
    const set = new Set(profile.location.areasServed);
    if (set.has(area)) {
      set.delete(area);
    } else {
      set.add(area);
    }
    patch("location", { areasServed: Array.from(set) });
  }

  function toggleAnimalType(type: string) {
    const set = new Set(profile.capacity.animalTypes);
    if (set.has(type)) {
      set.delete(type);
    } else {
      set.add(type);
    }
    patch("capacity", { animalTypes: Array.from(set) });
  }

  function toggleService(key: keyof NgoProfile["services"]) {
    patch("services", { [key]: !profile.services[key] } as Partial<NgoProfile["services"]>);
  }

  // Section completion booleans
  const sectionStatus = useMemo(() => {
    const orgComplete = !!registration;
    const loc = profile.location;
    const locComplete = !!(loc.address && loc.city && loc.state && loc.areasServed.length > 0);
    const svc = profile.services;
    const svcComplete = svc.adoption || svc.rescue || svc.foster || svc.medical;
    const cap = profile.capacity;
    const capComplete = !!(cap.currentAnimals && cap.monthlyCapacity && cap.animalTypes.length > 0);
    const mediaComplete = !!(profile.media.logoName || profile.media.shelterImageNames.length > 0);
    const listingsComplete = profile.animalListings.length > 0;
    return {
      organization: orgComplete,
      location: locComplete,
      services: svcComplete,
      capacity: capComplete,
      media: mediaComplete,
      listings: listingsComplete,
    } as Record<SectionId, boolean>;
  }, [registration, profile]);

  const completedCount = Object.values(sectionStatus).filter(Boolean).length;
  const totalSections = Object.keys(sectionStatus).length;
  const percent = Math.round((completedCount / totalSections) * 100);

  const SECTIONS: {
    id: SectionId;
    short: string;
    icon: typeof MapPin;
  }[] = [
    { id: "organization", short: "Org", icon: Building2 },
    { id: "location", short: "Location", icon: MapPin },
    { id: "services", short: "Services", icon: Heart },
    { id: "capacity", short: "Capacity", icon: Activity },
    { id: "media", short: "Media", icon: ImageIcon },
    { id: "listings", short: "Listings", icon: PawPrint },
  ];

  function handleSave() {
    saveNgoProfile(profile);
    toast({
      title: "Profile saved",
      description: percent === 100
        ? "Your NGO profile is complete."
        : `Your progress is ${percent}% — keep going.`,
    });
  }

  function handleSaveAndGoToDashboard() {
    saveNgoProfile(profile);
    toast({ title: "Profile saved", description: "Heading to your NGO dashboard." });
    setTimeout(() => setLocation("/ngo/dashboard"), 600);
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/ngo/register"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to registration
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              NGO Onboarding
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
              Complete Your NGO Profile
            </h1>
            <p className="text-lg text-muted-foreground">
              Help adopters find you and build trust.
            </p>
          </motion.header>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-card border border-border rounded-[2rem] p-6 mb-8 sticky top-24 z-30 shadow-sm"
          >
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Profile completion
                </p>
                <p className="text-2xl font-serif text-foreground">
                  {percent}%
                  <span className="text-sm text-muted-foreground font-sans ml-2">
                    {completedCount} of {totalSections} sections
                  </span>
                </p>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#5B9FE0" }}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {SECTIONS.map((s) => {
                const done = sectionStatus[s.id];
                return (
                  <a
                    key={s.id}
                    href={`#section-${s.id}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                      done
                        ? "border-transparent text-white"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                    style={done ? { backgroundColor: "#5B9FE0" } : undefined}
                  >
                    {done ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <s.icon className="w-3.5 h-3.5" />
                    )}
                    {s.short}
                  </a>
                );
              })}
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Organization Info — pre-filled */}
            <SectionCard
              id="organization"
              number="01"
              title="Organization Info"
              description="From your registration. You can edit these any time."
              icon={Building2}
              complete={sectionStatus.organization}
            >
              {registration ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoRow label="Organization" value={registration.organizationName} />
                  <InfoRow label="Registration No." value={registration.registrationNumber} />
                  <InfoRow label="Primary Contact" value={registration.contactName} />
                  <InfoRow label="Phone" value={registration.phone} />
                  <InfoRow label="Email" value={registration.email} />
                  <InfoRow label="About" value={registration.description} multiline />
                  <div className="sm:col-span-2">
                    <Link
                      href="/ngo/register"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                      style={{ color: "#5B9FE0" }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit registration details
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-5 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    No registration found yet.
                  </p>
                  <Link
                    href="/ngo/register"
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: "#5B9FE0" }}
                  >
                    Complete registration
                  </Link>
                </div>
              )}
            </SectionCard>

            {/* Location */}
            <SectionCard
              id="location"
              number="02"
              title="Location"
              description="Where you operate and which areas you serve."
              icon={MapPin}
              complete={sectionStatus.location}
            >
              <Field label="Address" required>
                <textarea
                  value={profile.location.address}
                  onChange={(e) => patch("location", { address: e.target.value })}
                  placeholder="Street, locality, landmark, PIN code"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background resize-none"
                />
              </Field>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="City" required>
                  <input
                    value={profile.location.city}
                    onChange={(e) => patch("location", { city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                  />
                </Field>
                <Field label="State" required>
                  <select
                    value={profile.location.state}
                    onChange={(e) => patch("location", { state: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Service Radius (km)">
                <input
                  type="number"
                  min={0}
                  value={profile.location.serviceRadiusKm}
                  onChange={(e) =>
                    patch("location", { serviceRadiusKm: e.target.value })
                  }
                  placeholder="e.g. 25"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                />
              </Field>
              <Field label="Areas Served" required>
                <div className="flex flex-wrap gap-2">
                  {AREA_OPTIONS.map((a) => (
                    <Pill
                      key={a}
                      active={profile.location.areasServed.includes(a)}
                      onClick={() => toggleArea(a)}
                    >
                      {a}
                    </Pill>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Select every region you can deliver or facilitate adoptions in.
                </p>
              </Field>
            </SectionCard>

            {/* Services */}
            <SectionCard
              id="services"
              number="03"
              title="Services"
              description="What your shelter offers."
              icon={Heart}
              complete={sectionStatus.services}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICE_CARDS.map((svc) => {
                  const active = profile.services[svc.key];
                  return (
                    <button
                      key={svc.key}
                      type="button"
                      onClick={() => toggleService(svc.key)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        active ? "shadow-sm" : "border-border bg-card hover:border-primary/40"
                      }`}
                      style={
                        active
                          ? { borderColor: "#5B9FE0", backgroundColor: "#EAF3FB" }
                          : undefined
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: active ? "#5B9FE0" : "#EAF3FB",
                          }}
                        >
                          <svc.icon
                            className="w-5 h-5"
                            style={{ color: active ? "#FFFFFF" : "#5B9FE0" }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">{svc.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {svc.desc}
                          </p>
                        </div>
                        {active && (
                          <CheckCircle2
                            className="w-5 h-5 flex-shrink-0"
                            style={{ color: "#5B9FE0" }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* Capacity */}
            <SectionCard
              id="capacity"
              number="04"
              title="Capacity"
              description="Help us understand the scale of your shelter."
              icon={Activity}
              complete={sectionStatus.capacity}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Current animals in care" required>
                  <input
                    type="number"
                    min={0}
                    value={profile.capacity.currentAnimals}
                    onChange={(e) =>
                      patch("capacity", { currentAnimals: e.target.value })
                    }
                    placeholder="e.g. 32"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                  />
                </Field>
                <Field label="Monthly adoption capacity" required>
                  <input
                    type="number"
                    min={0}
                    value={profile.capacity.monthlyCapacity}
                    onChange={(e) =>
                      patch("capacity", { monthlyCapacity: e.target.value })
                    }
                    placeholder="e.g. 8"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                  />
                </Field>
              </div>
              <Field label="Animal types supported" required>
                <div className="flex flex-wrap gap-2">
                  {ANIMAL_TYPES.map((t) => (
                    <Pill
                      key={t}
                      active={profile.capacity.animalTypes.includes(t)}
                      onClick={() => toggleAnimalType(t)}
                    >
                      {t}
                    </Pill>
                  ))}
                </div>
              </Field>
            </SectionCard>

            {/* Media */}
            <SectionCard
              id="media"
              number="05"
              title="Media"
              description="A great photo helps adopters connect with your shelter."
              icon={ImageIcon}
              complete={sectionStatus.media}
            >
              <Field label="Logo">
                <UploadZone
                  filename={profile.media.logoName}
                  hint="PNG, JPG, or SVG · square works best"
                  onPick={(name) => patch("media", { logoName: name })}
                />
              </Field>
              <Field label="Shelter photos">
                <UploadZone
                  filename={
                    profile.media.shelterImageNames.length
                      ? `${profile.media.shelterImageNames.length} photo(s) selected`
                      : ""
                  }
                  hint="Multiple images — show your space, animals, and team"
                  multiple
                  onPick={(name) =>
                    patch("media", {
                      shelterImageNames: [...profile.media.shelterImageNames, name],
                    })
                  }
                />
              </Field>
            </SectionCard>

            {/* Animal Listings */}
            <SectionCard
              id="listings"
              number="06"
              title="Animal Listings"
              description="Add animals available for adoption right now."
              icon={PawPrint}
              complete={sectionStatus.listings}
            >
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
                <PawPrint
                  className="w-9 h-9 mx-auto mb-3"
                  style={{ color: "#5B9FE0" }}
                />
                <p className="text-foreground font-medium mb-1">
                  {profile.animalListings.length === 0
                    ? "No animals listed yet"
                    : `${profile.animalListings.length} animal(s) listed`}
                </p>
                <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                  Listing animals helps families find them. You can add as many
                  as you like.
                </p>
                <Link
                  href="/ngo/add-animal"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-white font-medium shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                  style={{ backgroundColor: "#5B9FE0" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Animal Listing
                </Link>
              </div>
            </SectionCard>
          </div>

          {/* Footer CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <Link
              href="/ngo/add-animal"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-semibold text-white shadow-md hover:scale-[1.02] active:scale-95 transition-all order-2 sm:order-1"
              style={{
                background:
                  "linear-gradient(135deg, #5B9FE0 0%, #3B82C4 100%)",
              }}
            >
              <Plus className="w-4 h-4" />
              Add Animal Listing
            </Link>

            <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
              <button
                type="button"
                onClick={handleSave}
                className="h-12 px-6 inline-flex items-center justify-center rounded-full font-medium text-foreground border border-border hover:bg-muted/40 transition-colors"
              >
                Save Progress
              </button>
              <button
                type="button"
                onClick={handleSaveAndGoToDashboard}
                className="h-12 px-7 inline-flex items-center justify-center rounded-full text-white font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                style={{ backgroundColor: "#5B9FE0" }}
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className={multiline ? "sm:col-span-2" : ""}>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-sm text-foreground">
        {value || <span className="text-muted-foreground">—</span>}
      </p>
    </div>
  );
}

function UploadZone({
  filename,
  hint,
  multiple,
  onPick,
}: {
  filename: string;
  hint: string;
  multiple?: boolean;
  onPick: (name: string) => void;
}) {
  const id = useMemo(
    () => `upload-${Math.random().toString(36).slice(2, 9)}`,
    [],
  );
  return (
    <label
      htmlFor={id}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/20 px-5 py-8 cursor-pointer hover:border-primary/40 transition-colors text-center"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: "#EAF3FB" }}
      >
        <Upload className="w-5 h-5" style={{ color: "#5B9FE0" }} />
      </div>
      {filename ? (
        <p className="text-sm font-medium text-foreground">{filename}</p>
      ) : (
        <p className="text-sm font-medium text-foreground">Click to upload</p>
      )}
      <p className="text-xs text-muted-foreground">{hint}</p>
      <input
        id={id}
        type="file"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file.name);
        }}
      />
    </label>
  );
}
