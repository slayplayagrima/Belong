import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  organizationName: z.string().min(2, "Organization name is required"),
  registrationNumber: z.string().min(5, "Valid registration number required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number required"),
  description: z.string().min(10, "Please provide a short description")
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      registrationNumber: "",
      contactName: "",
      email: "",
      phone: "",
      description: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <Link href="/role-select" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to selection
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-8 md:p-12 rounded-[2rem] shadow-xl"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-secondary-foreground" />
                </div>
                <h2 className="text-3xl font-serif mb-4">Application Received</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Thank you for your dedication to creating safe homes. Our team will review your application and contact you within 2-3 business days.
                </p>
                <Link 
                  href="/" 
                  className="h-12 px-8 inline-flex items-center justify-center rounded-full text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-md"
                  style={{ backgroundColor: "#F0907A" }}
                >
                  Return to Home
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-serif mb-3">Partner with Belong</h1>
                  <p className="text-muted-foreground">
                    Register your verified NGO to connect with families looking to adopt or foster.
                  </p>
                </div>

                {/* Trust info box */}
                <div className="flex items-start gap-3 bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3 mb-8">
                  <ShieldCheck className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We verify every NGO to ensure a safe and transparent adoption ecosystem.
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
                                <span className="ml-2 text-xs text-[#9CA3AF] font-normal">Required for verification</span>
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
                              <span className="ml-2 text-xs text-[#9CA3AF] font-normal">Briefly describe your work and who you support</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about the animals or children you support..." 
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
                      style={{ backgroundColor: "#F0907A" }}
                    >
                      Apply for Verification
                    </button>
                    <p className="text-center text-sm text-muted-foreground">
                      By submitting, you confirm that your organization is legally registered in India.
                    </p>
                  </form>
                </Form>
              </>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
