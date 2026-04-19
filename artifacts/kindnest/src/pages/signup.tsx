import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(10, "Enter a valid 10-digit phone number")
      .max(10, "Enter a valid 10-digit phone number")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    city: z.string().optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please check this box to continue" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-4 mt-2">
      {label}
    </p>
  );
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      city: "",
      consent: undefined as unknown as true,
    },
  });

  const onSubmit = (_data: FormValues) => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="w-full max-w-lg mx-auto">
          <Link
            href="/role-select"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border p-10 md:p-14 rounded-[2rem] shadow-xl text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#F0907A22" }}
                >
                  <CheckCircle2 className="w-10 h-10" style={{ color: "#F0907A" }} />
                </div>
                <h2 className="text-3xl font-serif mb-3">Account created!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto leading-relaxed">
                  Welcome to Belong. You can now explore animals and connect with verified NGOs across India.
                </p>
                <Link
                  href="/"
                  className="h-12 px-10 inline-flex items-center justify-center rounded-full text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-md"
                  style={{ backgroundColor: "#F0907A" }}
                >
                  Go to Home
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border p-8 md:p-12 rounded-[2rem] shadow-xl"
              >
                {/* Header */}
                <div className="mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-serif mb-3">Start your journey</h1>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Create an account to explore animals, connect with NGOs, and begin your adoption journey.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                    {/* Section 1: Personal Info */}
                    <div>
                      <SectionLabel label="Personal Details" />
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Ananya Mehta" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" className="h-12 rounded-xl" {...field} />
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
                                <div className="flex gap-2">
                                  <span className="h-12 px-4 flex items-center bg-muted rounded-xl text-sm text-muted-foreground border border-input font-medium select-none">
                                    +91
                                  </span>
                                  <Input
                                    placeholder="98765 43210"
                                    maxLength={10}
                                    className="h-12 rounded-xl flex-1"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                City / State
                                <span className="ml-2 text-xs text-[#9CA3AF] font-normal">Optional</span>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Mumbai, Maharashtra" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Section 2: Password */}
                    <div className="pt-2">
                      <SectionLabel label="Set a Password" />
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 8 characters"
                                    className="h-12 rounded-xl pr-12"
                                    {...field}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    tabIndex={-1}
                                  >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Repeat your password"
                                    className="h-12 rounded-xl pr-12"
                                    {...field}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    tabIndex={-1}
                                  >
                                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Consent checkbox */}
                    <div className="pt-2">
                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={field.value === true}
                                  onChange={(e) => field.onChange(e.target.checked ? true : undefined)}
                                  className="mt-1 w-4 h-4 rounded accent-[#F0907A] flex-shrink-0 cursor-pointer"
                                />
                                <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                  I understand adoption is a responsible process and agree to be contacted by verified NGOs.
                                </span>
                              </label>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Security note */}
                      <div className="flex items-center gap-2 mt-4 text-xs text-[#9CA3AF]">
                        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                        Your information is secure and only shared with trusted partners.
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full h-14 mt-2 inline-flex items-center justify-center rounded-full text-white text-lg font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md"
                      style={{ backgroundColor: "#F0907A" }}
                    >
                      Create Account
                    </button>

                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">
                        Log in
                      </Link>
                    </p>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
