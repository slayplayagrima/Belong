import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveNgoRegistration } from "@/lib/ngo-storage";

const formSchema = z.object({
  organizationName: z.string().min(2, "Organization name is required"),
  registrationNumber: z.string().min(5, "Valid registration number required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number required"),
  description: z.string().min(10, "Please provide a short description"),
});

type FormValues = z.infer<typeof formSchema>;

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-4 mt-2">
      {label}
    </p>
  );
}

export default function NgoRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      registrationNumber: "",
      contactName: "",
      email: "",
      phone: "",
      description: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    saveNgoRegistration(data);
    toast({
      title: "Registration saved",
      description: "Let's complete your NGO profile.",
    });
    navigate("/ngo/profile");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4 pt-32">
        <div className="w-full max-w-2xl mx-auto">
          <Link to="/role-select" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to selection
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-8 md:p-12 rounded-[2rem] shadow-xl"
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-serif mb-3">Partner with Belong</h1>
              <p className="text-muted-foreground">
                Register your NGO to start listing animals available for adoption.
              </p>
            </div>

            {/* Trust info box */}
            <div className="flex items-start gap-3 bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3 mb-8">
              <ShieldCheck className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Step 1 of 2 — share your basics, then complete your shelter profile so adopters can find you.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Section 1: Organization Details */}
                <div>
                  <SectionLabel label="Organization Details" />
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Hope Shelter" className="h-12 rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Gov. Registration No.
                            <span className="block text-xs text-[#9CA3AF] font-normal mt-0.5">For our records</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="REG-12345" className="h-12 rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 2: Contact Details */}
                <div className="pt-2">
                  <SectionLabel label="Contact Details" />
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Priya Sharma" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Email</FormLabel>
                          <FormControl>
                            <Input placeholder="hello@hopeshelter.org" className="h-12 rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section 3: About */}
                <div className="pt-2">
                  <SectionLabel label="About" />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Brief Description of Work
                          <span className="ml-2 text-xs text-[#9CA3AF] font-normal">A short intro for adopters</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about the animals you support and your shelter's mission..."
                            className="min-h-[120px] rounded-xl resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 mt-2 inline-flex items-center justify-center rounded-full text-white text-lg font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md"
                  style={{ backgroundColor: "#5B9FE0" }}
                >
                  Save & Continue
                </button>
                <p className="text-center text-sm text-muted-foreground">
                  Next, you'll complete your shelter profile so adopters can find you.
                </p>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
