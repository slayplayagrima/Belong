import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
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
      
      <main className="flex-1 flex items-center justify-center py-20 px-4 mt-16">
        <div className="w-full max-w-2xl mx-auto">
          <Link href="/role-select" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to selection
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-xl"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-secondary-foreground" />
                </div>
                <h2 className="text-4xl font-serif mb-4 text-primary">Application Received</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  Thank you for your dedication to creating safe homes. Our team will review your application and contact you within 2-3 business days.
                </p>
                <Link 
                  href="/" 
                  className="h-14 px-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-medium hover:bg-[#d97218] transition-all shadow-[0_4px_14px_0_rgba(234,106,17,0.39)] hover:-translate-y-0.5"
                >
                  Return to Home
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <h1 className="text-4xl md:text-5xl font-serif mb-4 text-primary">Partner with KindNest</h1>
                  <p className="text-muted-foreground text-lg">
                    Register your verified NGO to connect with families looking to adopt or foster.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="organizationName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 font-medium text-base">Organization Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Hope Shelter" className="h-14 rounded-xl text-lg bg-background border-border/80 focus-visible:ring-primary/50" {...field} />
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
                            <FormLabel className="text-foreground/80 font-medium text-base">Gov. Registration No.</FormLabel>
                            <FormControl>
                              <Input placeholder="REG-12345" className="h-14 rounded-xl text-lg bg-background border-border/80 focus-visible:ring-primary/50" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 font-medium text-base">Primary Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Priya Sharma" className="h-14 rounded-xl text-lg bg-background border-border/80 focus-visible:ring-primary/50" {...field} />
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
                            <FormLabel className="text-foreground/80 font-medium text-base">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" className="h-14 rounded-xl text-lg bg-background border-border/80 focus-visible:ring-primary/50" {...field} />
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
                          <FormLabel className="text-foreground/80 font-medium text-base">Organization Email</FormLabel>
                          <FormControl>
                            <Input placeholder="hello@hopeshelter.org" className="h-14 rounded-xl text-lg bg-background border-border/80 focus-visible:ring-primary/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 font-medium text-base">Brief Description of Work</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about the animals or children you support..." 
                              className="min-h-[140px] rounded-xl text-lg resize-none bg-background border-border/80 focus-visible:ring-primary/50 py-4" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button 
                      type="submit"
                      className="w-full h-16 mt-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-medium hover:bg-[#d97218] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_4px_14px_0_rgba(234,106,17,0.39)]"
                    >
                      Submit Application
                    </button>
                    <p className="text-center text-sm text-muted-foreground mt-6">
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
