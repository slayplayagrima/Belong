import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Camera,
  Info,
  Lock,
  Clock,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type ProfileStatus = "incomplete" | "review" | "verified";

type ProfileState = {
  personalDetails: {
    fullName: string;
    dob: string;
    phone: string;
    phoneVerified: boolean;
    email: string;
    city: string;
    state: string;
    photoName: string;
  };
  verification: {
    idType: string;
    idNumber: string;
    idDocName: string;
    linkedin: string;
  };
  household: {
    residenceType: string;
    ownership: string;
    landlordApproval: boolean;
    familyMembers: string;
    childrenAtHome: string;
    workSchedule: string;
    existingPets: string;
    existingPetsDetails: string;
  };
  preferences: {
    animalType: string;
    agePreference: string;
    sizePreference: string;
    dailyTime: string;
    activityLevel: string;
    openToFostering: string;
  };
  experience: {
    previousAdoption: string;
    whyAdopt: string;
    homeVisit: string;
  };
  consent: {
    accurate: boolean;
    contactConsent: boolean;
    responsibility: boolean;
  };
};

const initialState: ProfileState = {
  personalDetails: {
    fullName: "",
    dob: "",
    phone: "",
    phoneVerified: true,
    email: "",
    city: "",
    state: "",
    photoName: "",
  },
  verification: { idType: "", idNumber: "", idDocName: "", linkedin: "" },
  household: {
    residenceType: "",
    ownership: "",
    landlordApproval: false,
    familyMembers: "",
    childrenAtHome: "",
    workSchedule: "",
    existingPets: "",
    existingPetsDetails: "",
  },
  preferences: {
    animalType: "",
    agePreference: "",
    sizePreference: "",
    dailyTime: "",
    activityLevel: "",
    openToFostering: "",
  },
  experience: { previousAdoption: "", whyAdopt: "", homeVisit: "" },
  consent: { accurate: false, contactConsent: false, responsibility: false },
};

function SectionCard({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg text-white flex-shrink-0 shadow-sm"
          style={{ backgroundColor: "#5B9FE0" }}
        >
          {number}
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-serif text-foreground">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </motion.section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-foreground">
        {label}
        {hint && <span className="ml-2 text-xs text-[#9CA3AF] font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function YesNo({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {["Yes", "No"].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="flex-1 h-11 rounded-xl border text-sm font-medium transition-all duration-200"
          style={
            value === opt
              ? { backgroundColor: "#5B9FE0", borderColor: "#5B9FE0", color: "#fff" }
              : { backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: ProfileStatus }) {
  const config = {
    incomplete: { label: "Incomplete", bg: "#FEF3C7", color: "#92400E" },
    review: { label: "Under Review", bg: "#DBEAFE", color: "#1E40AF" },
    verified: { label: "Verified", bg: "#D1FAE5", color: "#065F46" },
  }[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {status === "verified" && <CheckCircle2 className="w-3 h-3" />}
      {config.label}
    </span>
  );
}

export default function AdopterProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<ProfileState>(initialState);
  const [status, setStatus] = useState<ProfileStatus>("incomplete");
  const isLocked = status !== "incomplete";

  // ---- Progress calculation ----
  const completion = useMemo(() => {
    const tracked: (string | boolean)[] = [
      data.personalDetails.fullName,
      data.personalDetails.dob,
      data.personalDetails.phone,
      data.personalDetails.email,
      data.personalDetails.city,
      data.personalDetails.state,
      data.personalDetails.photoName,
      data.verification.idType,
      data.verification.idNumber,
      data.verification.idDocName,
      data.household.residenceType,
      data.household.ownership,
      data.household.familyMembers,
      data.household.childrenAtHome,
      data.household.workSchedule,
      data.household.existingPets,
      data.preferences.animalType,
      data.preferences.agePreference,
      data.preferences.sizePreference,
      data.experience.previousAdoption,
      data.experience.whyAdopt,
      data.experience.homeVisit,
      data.consent.accurate,
      data.consent.contactConsent,
      data.consent.responsibility,
    ];
    const filled = tracked.filter((v) => (typeof v === "boolean" ? v : Boolean(v && String(v).trim()))).length;
    return Math.round((filled / tracked.length) * 100);
  }, [data]);

  // ---- Section update helpers ----
  function update<K extends keyof ProfileState>(section: K, patch: Partial<ProfileState[K]>) {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) update("personalDetails", { photoName: file.name });
  }

  function handleIdDocChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) update("verification", { idDocName: file.name });
  }

  function handleSave() {
    const payload = {
      userId: "current-user",
      ...data,
    };
    console.log("Saving profile:", payload);
    setStatus("review");
    toast({
      title: "Profile saved successfully",
      description: "Your profile is now under review.",
    });
    setTimeout(() => navigate("/"), 1200);
  }

  const consentAll =
    data.consent.accurate && data.consent.contactConsent && data.consent.responsibility;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="w-full max-w-3xl mx-auto">
          <Link to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-serif mb-3">Complete Your Profile</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Help NGOs understand you better and increase your chances of adoption.
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-3 italic">
              Your profile will be shared with verified NGOs only when you express interest.
            </p>
          </motion.div>

          {/* Progress + Status */}
          <div
            className="border-2 rounded-2xl p-5 mb-8 shadow-md sticky top-24 z-10 backdrop-blur-md"
            style={{ backgroundColor: "#EAF3FB", borderColor: "#5B9FE055" }}
          >
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">Profile Status:</p>
                <StatusBadge status={status} />
              </div>
              <p className="text-sm font-semibold" style={{ color: "#5B9FE0" }}>{completion}% complete</p>
            </div>
            <div className="h-3 w-full rounded-full bg-white/70 overflow-hidden ring-1 ring-[#5B9FE033]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full"
                style={{ backgroundColor: "#5B9FE0" }}
              />
            </div>
            <p className="flex items-center gap-2 text-xs text-[#9CA3AF] mt-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified profiles have higher chances of approval.
            </p>
          </div>

          <div className="space-y-6">

            {/* Section 1: Personal Details */}
            <SectionCard number="01" title="Personal Details">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full Name">
                  <Input
                    value={data.personalDetails.fullName}
                    onChange={(e) => update("personalDetails", { fullName: e.target.value })}
                    placeholder="Ananya Mehta"
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field label="Date of Birth">
                  <Input
                    type="date"
                    value={data.personalDetails.dob}
                    onChange={(e) => update("personalDetails", { dob: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </Field>

                <Field label="Phone Number">
                  <div className="flex gap-2">
                    <Input
                      value={data.personalDetails.phone}
                      onChange={(e) => update("personalDetails", { phone: e.target.value.replace(/\D/g, "") })}
                      maxLength={10}
                      placeholder="98765 43210"
                      className="h-12 rounded-xl flex-1"
                    />
                    {data.personalDetails.phoneVerified && (
                      <span className="inline-flex items-center gap-1.5 px-3 rounded-xl bg-secondary/30 text-xs font-medium text-secondary-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    value={data.personalDetails.email}
                    onChange={(e) => update("personalDetails", { email: e.target.value })}
                    placeholder="you@example.com"
                    className="h-12 rounded-xl"
                  />
                </Field>

                <Field label="City">
                  <Input
                    value={data.personalDetails.city}
                    onChange={(e) => update("personalDetails", { city: e.target.value })}
                    placeholder="Mumbai"
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field label="State">
                  <Input
                    value={data.personalDetails.state}
                    onChange={(e) => update("personalDetails", { state: e.target.value })}
                    placeholder="Maharashtra"
                    className="h-12 rounded-xl"
                  />
                </Field>
              </div>

              <Field label="Profile Photo" hint="JPG or PNG, max 5MB">
                <label className="flex items-center gap-3 cursor-pointer h-12 px-4 rounded-xl border border-dashed border-input hover:border-[#5B9FE0] transition-colors bg-muted/40">
                  <Camera className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {data.personalDetails.photoName || "Click to upload your photo"}
                  </span>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              </Field>
            </SectionCard>

            {/* Section 2: Verification */}
            <SectionCard
              number="02"
              title="Verification"
              description="Used for NGO trust and verification. Your data is secure."
            >
              <div className="flex items-center justify-between bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Verification may take 24–48 hours
                </div>
                <StatusBadge status={status} />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Government ID Type">
                  <Select
                    value={data.verification.idType}
                    onValueChange={(v) => update("verification", { idType: v })}
                    disabled={isLocked}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar</SelectItem>
                      <SelectItem value="pan">PAN</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="voter-id">Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="ID Number">
                  <Input
                    value={data.verification.idNumber}
                    onChange={(e) => update("verification", { idNumber: e.target.value })}
                    placeholder="XXXX XXXX 1234"
                    className="h-12 rounded-xl"
                    disabled={isLocked}
                  />
                </Field>
              </div>

              <Field label="Upload ID Document" hint="PDF, JPG or PNG">
                <label
                  className={`flex items-center gap-3 h-12 px-4 rounded-xl border border-dashed border-input transition-colors bg-muted/40 ${
                    isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-[#5B9FE0]"
                  }`}
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {data.verification.idDocName || "Click to upload ID document"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleIdDocChange}
                    className="hidden"
                    disabled={isLocked}
                  />
                </label>
              </Field>

              <Field label="LinkedIn Profile" hint="Optional · Used only for identity verification">
                <Input
                  value={data.verification.linkedin}
                  onChange={(e) => update("verification", { linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourname"
                  className="h-12 rounded-xl"
                />
              </Field>

              {isLocked && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-xl px-4 py-2.5">
                  <Lock className="w-3.5 h-3.5" />
                  Contact support to update verified details.
                </div>
              )}
            </SectionCard>

            {/* Section 3: Household Details */}
            <SectionCard number="03" title="Household Details">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Residence Type">
                  <Select
                    value={data.household.residenceType}
                    onValueChange={(v) => update("household", { residenceType: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="independent-house">Independent House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="shared">Shared Accommodation</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Ownership">
                  <Select
                    value={data.household.ownership}
                    onValueChange={(v) => update("household", { ownership: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owned">Owned</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {data.household.ownership === "rented" && (
                <div className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Landlord approval</p>
                    <p className="text-xs text-muted-foreground">Required for renters adopting pets</p>
                  </div>
                  <Switch
                    checked={data.household.landlordApproval}
                    onCheckedChange={(v) => update("household", { landlordApproval: v })}
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Number of Family Members">
                  <Input
                    type="number"
                    min={1}
                    value={data.household.familyMembers}
                    onChange={(e) => update("household", { familyMembers: e.target.value })}
                    placeholder="4"
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field label="Work Schedule">
                  <Select
                    value={data.household.workSchedule}
                    onValueChange={(v) => update("household", { workSchedule: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work-from-home">Work from Home</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="full-time-office">Full-time Office</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Children at home">
                  <YesNo
                    value={data.household.childrenAtHome}
                    onChange={(v) => update("household", { childrenAtHome: v })}
                  />
                </Field>
                <Field label="Existing pets">
                  <YesNo
                    value={data.household.existingPets}
                    onChange={(v) => update("household", { existingPets: v })}
                  />
                </Field>
              </div>

              {data.household.existingPets === "Yes" && (
                <Field label="Tell us about your pets">
                  <Textarea
                    value={data.household.existingPetsDetails}
                    onChange={(e) => update("household", { existingPetsDetails: e.target.value })}
                    placeholder="Species, breed, age, temperament..."
                    className="min-h-[90px] rounded-xl resize-none"
                  />
                </Field>
              )}
            </SectionCard>

            {/* Section 4: Adoption Preferences */}
            <SectionCard number="04" title="Adoption Preferences">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">Animal Adoption</p>

              <div className="grid md:grid-cols-3 gap-3">
                {["Dog", "Cat", "Both"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("preferences", { animalType: opt })}
                    className="h-11 rounded-xl border text-sm font-medium transition-all duration-200"
                    style={
                      data.preferences.animalType === opt
                        ? { backgroundColor: "#5B9FE0", borderColor: "#5B9FE0", color: "#fff" }
                        : { backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Age Preference">
                  <Select
                    value={data.preferences.agePreference}
                    onValueChange={(v) => update("preferences", { agePreference: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="puppy-kitten">Puppy / Kitten</SelectItem>
                      <SelectItem value="young">Young (1-3 yrs)</SelectItem>
                      <SelectItem value="adult">Adult (3-7 yrs)</SelectItem>
                      <SelectItem value="senior">Senior (7+ yrs)</SelectItem>
                      <SelectItem value="any">Any age</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Size Preference">
                  <Select
                    value={data.preferences.sizePreference}
                    onValueChange={(v) => update("preferences", { sizePreference: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="any">Any size</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Daily Time Availability">
                  <Select
                    value={data.preferences.dailyTime}
                    onValueChange={(v) => update("preferences", { dailyTime: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Hours per day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-2">Less than 2 hours</SelectItem>
                      <SelectItem value="2-4">2 - 4 hours</SelectItem>
                      <SelectItem value="4-6">4 - 6 hours</SelectItem>
                      <SelectItem value="6-plus">6+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Activity Level Preference">
                  <Select
                    value={data.preferences.activityLevel}
                    onValueChange={(v) => update("preferences", { activityLevel: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calm">Calm / Low energy</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="active">Active / High energy</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field label="Open to fostering">
                <YesNo
                  value={data.preferences.openToFostering}
                  onChange={(v) => update("preferences", { openToFostering: v })}
                />
              </Field>

            </SectionCard>

            {/* Section 5: Experience */}
            <SectionCard number="05" title="Experience">
              <Field label="Previous adoption experience">
                <YesNo
                  value={data.experience.previousAdoption}
                  onChange={(v) => update("experience", { previousAdoption: v })}
                />
              </Field>

              <Field label="Why do you want to adopt?">
                <Textarea
                  value={data.experience.whyAdopt}
                  onChange={(e) => update("experience", { whyAdopt: e.target.value })}
                  placeholder="Share your motivation and what adoption means to you..."
                  className="min-h-[120px] rounded-xl resize-none"
                />
              </Field>

              <Field label="Willing for a home visit?">
                <YesNo
                  value={data.experience.homeVisit}
                  onChange={(v) => update("experience", { homeVisit: v })}
                />
              </Field>
            </SectionCard>

            {/* Section 6: Consent */}
            <SectionCard number="06" title="Consent">
              {[
                { key: "accurate", label: "I confirm the information provided is accurate." },
                { key: "contactConsent", label: "I agree to be contacted by verified NGOs." },
                { key: "responsibility", label: "I understand adoption involves responsibility and legal processes." },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={data.consent[item.key as keyof ProfileState["consent"]]}
                    onChange={(e) =>
                      update("consent", { [item.key]: e.target.checked } as Partial<ProfileState["consent"]>)
                    }
                    className="mt-1 w-4 h-4 rounded accent-[#5B9FE0] flex-shrink-0 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </label>
              ))}
            </SectionCard>

            {/* Trust footer */}
            <p className="flex items-center justify-center gap-2 text-xs text-[#9CA3AF] pt-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              Your data is protected and only shared with verified NGOs.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={!consentAll}
                className="flex-1 h-14 rounded-full text-white text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                style={{ backgroundColor: "#5B9FE0" }}
              >
                Save &amp; Start Exploring
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 h-14 rounded-full border border-input bg-transparent text-foreground text-base font-medium hover:bg-muted/50 transition-all"
              >
                Complete Later
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
