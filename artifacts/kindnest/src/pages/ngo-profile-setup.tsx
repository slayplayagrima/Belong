import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Camera,
  Info,
  Lock,
  X,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type NgoStatus = "incomplete" | "pending" | "verified";

type NgoProfile = {
  organization: {
    name: string;
    registrationNumber: string;
    orgType: string;
    yearEstablished: string;
  };
  location: {
    fullAddress: string;
    city: string;
    state: string;
    serviceAreas: string[];
  };
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  documents: {
    registrationCertName: string;
    govRecognitionName: string;
    additionalDocsName: string;
  };
  services: {
    adoption: boolean;
    foster: boolean;
    rescue: boolean;
    medical: boolean;
  };
  capacity: {
    currentCount: string;
    monthlyCapacity: string;
  };
  about: {
    description: string;
    mission: string;
  };
  media: {
    logoName: string;
    facilityPhotos: string[];
  };
  consent: {
    accurate: boolean;
  };
};

const initialState: NgoProfile = {
  organization: { name: "", registrationNumber: "", orgType: "", yearEstablished: "" },
  location: { fullAddress: "", city: "", state: "", serviceAreas: [] },
  contact: { name: "", phone: "", email: "" },
  documents: { registrationCertName: "", govRecognitionName: "", additionalDocsName: "" },
  services: { adoption: false, foster: false, rescue: false, medical: false },
  capacity: { currentCount: "", monthlyCapacity: "" },
  about: { description: "", mission: "" },
  media: { logoName: "", facilityPhotos: [] },
  consent: { accurate: false },
};

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const SERVICE_AREA_OPTIONS = [
  "Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Pan-India",
];

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

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-foreground">
        {label}
        {required && <span className="ml-1" style={{ color: "#5B9FE0" }}>*</span>}
        {hint && <span className="ml-2 text-xs text-[#9CA3AF] font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: NgoStatus }) {
  const config = {
    incomplete: { label: "Incomplete", bg: "#FEF3C7", color: "#92400E" },
    pending: { label: "Pending Verification", bg: "#DBEAFE", color: "#1E40AF" },
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

function CheckboxRow({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-start gap-3 text-left p-4 rounded-xl border transition-all"
      style={
        checked
          ? { backgroundColor: "#EAF3FB", borderColor: "#5B9FE0" }
          : { backgroundColor: "transparent", borderColor: "var(--border)" }
      }
    >
      <div
        className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
        style={
          checked
            ? { backgroundColor: "#5B9FE0", borderColor: "#5B9FE0" }
            : { backgroundColor: "transparent", borderColor: "var(--border)" }
        }
      >
        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </button>
  );
}

export default function NgoProfileSetup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [data, setData] = useState<NgoProfile>(initialState);
  const [status, setStatus] = useState<NgoStatus>("incomplete");
  const isLocked = status !== "incomplete";

  function update<K extends keyof NgoProfile>(section: K, patch: Partial<NgoProfile[K]>) {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
  }

  const completion = useMemo(() => {
    const tracked: (string | boolean | number)[] = [
      data.organization.name,
      data.organization.registrationNumber,
      data.organization.orgType,
      data.organization.yearEstablished,
      data.location.fullAddress,
      data.location.city,
      data.location.state,
      data.location.serviceAreas.length > 0,
      data.contact.name,
      data.contact.phone,
      data.contact.email,
      data.documents.registrationCertName,
      data.documents.govRecognitionName,
      data.services.adoption || data.services.foster || data.services.rescue || data.services.medical,
      data.capacity.currentCount,
      data.capacity.monthlyCapacity,
      data.about.description,
      data.about.mission,
      data.media.logoName,
      data.media.facilityPhotos.length > 0,
      data.consent.accurate,
    ];
    const filled = tracked.filter((v) =>
      typeof v === "boolean" ? v : Boolean(v && String(v).trim())
    ).length;
    return Math.round((filled / tracked.length) * 100);
  }, [data]);

  function toggleServiceArea(area: string) {
    setData((prev) => {
      const has = prev.location.serviceAreas.includes(area);
      return {
        ...prev,
        location: {
          ...prev.location,
          serviceAreas: has
            ? prev.location.serviceAreas.filter((a) => a !== area)
            : [...prev.location.serviceAreas, area],
        },
      };
    });
  }

  function handleDocChange(
    field: "registrationCertName" | "govRecognitionName" | "additionalDocsName",
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) update("documents", { [field]: file.name } as Partial<NgoProfile["documents"]>);
    };
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) update("media", { logoName: file.name });
  }

  function handleFacilityPhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    setData((prev) => ({
      ...prev,
      media: { ...prev.media, facilityPhotos: [...prev.media.facilityPhotos, ...names] },
    }));
  }

  function removeFacilityPhoto(idx: number) {
    setData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        facilityPhotos: prev.media.facilityPhotos.filter((_, i) => i !== idx),
      },
    }));
  }

  const canSubmit =
    !!data.organization.name.trim() &&
    !!data.organization.registrationNumber.trim() &&
    !!data.documents.registrationCertName &&
    data.consent.accurate;

  function handleSubmit() {
    const payload = { ngoId: "current-ngo", ...data };
    console.log("Submitting NGO profile:", payload);
    setStatus("pending");
    toast({
      title: "Profile submitted for verification",
      description: "Our team will review your details within 3–5 business days.",
    });
    setTimeout(() => setLocation("/"), 1400);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
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
            <h1 className="text-3xl md:text-4xl font-serif mb-3">NGO Profile Setup</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Register your organization to start receiving adoption requests on Belong.
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-3 italic">
              Only verified NGOs are visible to adopters. Verification typically takes 3–5 business days.
            </p>
          </motion.div>

          {/* Progress + Status */}
          <div
            className="border-2 rounded-2xl p-5 mb-8 shadow-md sticky top-24 z-10 backdrop-blur-md"
            style={{ backgroundColor: "#EAF3FB", borderColor: "#5B9FE055" }}
          >
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">Verification Status:</p>
                <StatusBadge status={status} />
              </div>
              <p className="text-sm font-semibold" style={{ color: "#5B9FE0" }}>
                {completion}% complete
              </p>
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
              Access to your NGO dashboard unlocks once verification is complete.
            </p>
          </div>

          <div className="space-y-6">
            {/* Section 1: Organization Details */}
            <SectionCard
              number="01"
              title="Organization Details"
              description="Tell us about your registered organization."
            >
              <Field label="NGO Name" required>
                <Input
                  value={data.organization.name}
                  onChange={(e) => update("organization", { name: e.target.value })}
                  placeholder="e.g. Friendicoes SECA"
                  className="h-12 rounded-xl"
                />
              </Field>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Registration Number" required>
                  <Input
                    value={data.organization.registrationNumber}
                    onChange={(e) =>
                      update("organization", { registrationNumber: e.target.value })
                    }
                    placeholder="Society / Trust Reg. No."
                    className="h-12 rounded-xl"
                    disabled={isLocked}
                  />
                </Field>
                <Field label="Year of Establishment">
                  <Input
                    type="number"
                    value={data.organization.yearEstablished}
                    onChange={(e) =>
                      update("organization", { yearEstablished: e.target.value })
                    }
                    placeholder="e.g. 1995"
                    min={1900}
                    max={new Date().getFullYear()}
                    className="h-12 rounded-xl"
                  />
                </Field>
              </div>
              <Field label="Organization Type" required>
                <Select
                  value={data.organization.orgType}
                  onValueChange={(v) => update("organization", { orgType: v })}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="animal-shelter">Animal Shelter</SelectItem>
                    <SelectItem value="child-welfare">Child Welfare Agency</SelectItem>
                    <SelectItem value="both">Both Animal & Child</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </SectionCard>

            {/* Section 2: Location */}
            <SectionCard
              number="02"
              title="Location"
              description="Where you operate and which areas you serve."
            >
              <Field label="Full Address">
                <Textarea
                  value={data.location.fullAddress}
                  onChange={(e) => update("location", { fullAddress: e.target.value })}
                  placeholder="Street, locality, landmark, PIN code"
                  className="min-h-24 rounded-xl"
                />
              </Field>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="City">
                  <Input
                    value={data.location.city}
                    onChange={(e) => update("location", { city: e.target.value })}
                    placeholder="e.g. Delhi"
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field label="State">
                  <Select
                    value={data.location.state}
                    onValueChange={(v) => update("location", { state: v })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Service Areas" hint="Select all regions you serve">
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREA_OPTIONS.map((area) => {
                    const selected = data.location.serviceAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleServiceArea(area)}
                        className="px-4 h-10 rounded-full border text-sm font-medium transition-all"
                        style={
                          selected
                            ? { backgroundColor: "#5B9FE0", borderColor: "#5B9FE0", color: "#fff" }
                            : {
                                backgroundColor: "transparent",
                                borderColor: "var(--border)",
                                color: "var(--foreground)",
                              }
                        }
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>
              </Field>
            </SectionCard>

            {/* Section 3: Contact Person */}
            <SectionCard
              number="03"
              title="Contact Person"
              description="Primary point of contact for adopters and Belong."
            >
              <Field label="Contact Name">
                <Input
                  value={data.contact.name}
                  onChange={(e) => update("contact", { name: e.target.value })}
                  placeholder="Full name"
                  className="h-12 rounded-xl"
                />
              </Field>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Phone Number">
                  <Input
                    type="tel"
                    value={data.contact.phone}
                    onChange={(e) => update("contact", { phone: e.target.value })}
                    placeholder="+91 98XXXXXXXX"
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => update("contact", { email: e.target.value })}
                    placeholder="contact@ngo.org"
                    className="h-12 rounded-xl"
                  />
                </Field>
              </div>
            </SectionCard>

            {/* Section 4: Verification Documents */}
            <SectionCard
              number="04"
              title="Verification Documents"
              description="Upload official paperwork to establish trust."
            >
              <div className="flex items-start gap-3 bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3">
                <Info className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is required for trust and compliance. Only verified NGOs can receive
                  adoption requests.
                </p>
              </div>

              <Field label="Registration Certificate" required hint="PDF, JPG or PNG">
                <label
                  className={`flex items-center gap-3 h-12 px-4 rounded-xl border border-dashed border-input transition-colors bg-muted/40 ${
                    isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-[#5B9FE0]"
                  }`}
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {data.documents.registrationCertName || "Click to upload registration certificate"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleDocChange("registrationCertName")}
                    className="hidden"
                    disabled={isLocked}
                  />
                </label>
              </Field>

              <Field label="Government Recognition Proof" hint="80G / 12A / FCRA / similar">
                <label
                  className={`flex items-center gap-3 h-12 px-4 rounded-xl border border-dashed border-input transition-colors bg-muted/40 ${
                    isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-[#5B9FE0]"
                  }`}
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {data.documents.govRecognitionName || "Click to upload recognition proof"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleDocChange("govRecognitionName")}
                    className="hidden"
                    disabled={isLocked}
                  />
                </label>
              </Field>

              <Field label="Additional Documents" hint="Optional">
                <label className="flex items-center gap-3 cursor-pointer h-12 px-4 rounded-xl border border-dashed border-input hover:border-[#5B9FE0] transition-colors bg-muted/40">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {data.documents.additionalDocsName || "Click to upload supporting documents"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleDocChange("additionalDocsName")}
                    className="hidden"
                  />
                </label>
              </Field>

              {isLocked && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-xl px-4 py-2.5">
                  <Lock className="w-3.5 h-3.5" />
                  Verification documents are locked. Contact support to update them.
                </div>
              )}
            </SectionCard>

            {/* Section 5: Services */}
            <SectionCard
              number="05"
              title="Services Offered"
              description="What types of work does your NGO do?"
            >
              <div className="grid md:grid-cols-2 gap-3">
                <CheckboxRow
                  checked={data.services.adoption}
                  onChange={(v) => update("services", { adoption: v })}
                  label="Adoption"
                  description="Facilitating permanent placements"
                />
                <CheckboxRow
                  checked={data.services.foster}
                  onChange={(v) => update("services", { foster: v })}
                  label="Foster"
                  description="Temporary care arrangements"
                />
                <CheckboxRow
                  checked={data.services.rescue}
                  onChange={(v) => update("services", { rescue: v })}
                  label="Rescue"
                  description="Emergency response & relocation"
                />
                <CheckboxRow
                  checked={data.services.medical}
                  onChange={(v) => update("services", { medical: v })}
                  label="Medical Support"
                  description="Veterinary or health services"
                />
              </div>
            </SectionCard>

            {/* Section 6: Capacity */}
            <SectionCard
              number="06"
              title="Capacity"
              description="Helps us match the right number of requests to your NGO."
            >
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Currently in your care" hint="Animals or children">
                  <Input
                    type="number"
                    min={0}
                    value={data.capacity.currentCount}
                    onChange={(e) => update("capacity", { currentCount: e.target.value })}
                    placeholder="e.g. 45"
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field label="Monthly Adoption Capacity">
                  <Input
                    type="number"
                    min={0}
                    value={data.capacity.monthlyCapacity}
                    onChange={(e) => update("capacity", { monthlyCapacity: e.target.value })}
                    placeholder="e.g. 10"
                    className="h-12 rounded-xl"
                  />
                </Field>
              </div>
            </SectionCard>

            {/* Section 7: About */}
            <SectionCard
              number="07"
              title="About Your Organization"
              description="Adopters will read this on your public NGO page."
            >
              <Field label="Description" hint="2–4 sentences about your work">
                <Textarea
                  value={data.about.description}
                  onChange={(e) => update("about", { description: e.target.value })}
                  placeholder="Tell adopters who you are, what you do, and how long you've been doing it."
                  className="min-h-28 rounded-xl"
                />
              </Field>
              <Field label="Mission Statement">
                <Textarea
                  value={data.about.mission}
                  onChange={(e) => update("about", { mission: e.target.value })}
                  placeholder="A short, memorable statement of your purpose."
                  className="min-h-20 rounded-xl"
                />
              </Field>
            </SectionCard>

            {/* Section 8: Media */}
            <SectionCard
              number="08"
              title="Media"
              description="A logo and a few photos help your profile feel real."
            >
              <Field label="Organization Logo" hint="PNG or JPG, square preferred">
                <label className="flex items-center gap-3 cursor-pointer h-12 px-4 rounded-xl border border-dashed border-input hover:border-[#5B9FE0] transition-colors bg-muted/40">
                  <Camera className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {data.media.logoName || "Click to upload logo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </Field>

              <Field label="Facility Photos" hint="Upload 3–6 photos of your shelter or center">
                <label className="flex items-center gap-3 cursor-pointer h-12 px-4 rounded-xl border border-dashed border-input hover:border-[#5B9FE0] transition-colors bg-muted/40">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    Click to upload facility photos
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFacilityPhotosChange}
                    className="hidden"
                  />
                </label>
                {data.media.facilityPhotos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {data.media.facilityPhotos.map((name, idx) => (
                      <span
                        key={`${name}-${idx}`}
                        className="inline-flex items-center gap-2 px-3 h-9 rounded-full text-xs font-medium"
                        style={{ backgroundColor: "#EAF3FB", color: "#1E40AF" }}
                      >
                        <Camera className="w-3 h-3" />
                        <span className="max-w-[160px] truncate">{name}</span>
                        <button
                          type="button"
                          onClick={() => removeFacilityPhoto(idx)}
                          className="hover:text-[#5B9FE0]"
                          aria-label={`Remove ${name}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Field>
            </SectionCard>

            {/* Section 9: Status & Consent */}
            <SectionCard
              number="09"
              title="Submission & Status"
              description="Confirm your details and submit for verification."
            >
              <div className="flex items-center justify-between bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3">
                <p className="text-sm text-muted-foreground">Current verification status</p>
                <StatusBadge status={status} />
              </div>

              <button
                type="button"
                onClick={() => update("consent", { accurate: !data.consent.accurate })}
                className="w-full flex items-start gap-3 text-left p-4 rounded-xl border transition-all"
                style={
                  data.consent.accurate
                    ? { backgroundColor: "#EAF3FB", borderColor: "#5B9FE0" }
                    : { backgroundColor: "transparent", borderColor: "var(--border)" }
                }
              >
                <div
                  className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                  style={
                    data.consent.accurate
                      ? { backgroundColor: "#5B9FE0", borderColor: "#5B9FE0" }
                      : { backgroundColor: "transparent", borderColor: "var(--border)" }
                  }
                >
                  {data.consent.accurate && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  I confirm that all information and uploaded documents are accurate, current, and
                  belong to my organization. Belong may contact us for additional verification.
                </p>
              </button>
            </SectionCard>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || isLocked}
                className="flex-1 h-14 rounded-full text-white text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                style={{ backgroundColor: "#5B9FE0" }}
              >
                {isLocked ? "Submitted for Review" : "Submit for Verification"}
              </button>
              <button
                onClick={() => setLocation("/")}
                className="flex-1 h-14 rounded-full border border-input bg-transparent text-foreground text-base font-medium hover:bg-muted/50 transition-all"
              >
                Save &amp; Complete Later
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
