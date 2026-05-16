import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, ShieldCheck, User, Building2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type Role = "user" | "ngo";
type Tab = "otp" | "password";
type OtpStep = "phone" | "verify";

export default function Login() {
  const [role, setRole] = useState<Role>("user");
  const [tab, setTab] = useState<Tab>("otp");

  // OTP state
  const [phone, setPhone] = useState("");
  const [otpStep, setOtpStep] = useState<OtpStep>("phone");
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const phoneValid = /^\d{10}$/.test(phone);
  const otpValid = /^\d{6}$/.test(otp);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 1;

  function handleSendOtp() {
    if (!phoneValid) return;
    setOtpStep("verify");
    startResendTimer();
  }

  function startResendTimer() {
    setResendTimer(30);
    const id = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
  }

  function handleResend() {
    if (resendTimer > 0) return;
    setOtp("");
    startResendTimer();
  }

  function destinationForRole() {
    return role === "ngo" ? "/ngo/dashboard" : "/dashboard";
  }

  function handleVerify() {
    if (!otpValid) return;
    navigate(destinationForRole());
  }

  function handlePasswordLogin() {
    if (!emailValid || !passwordValid) return;
    navigate(destinationForRole());
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar variant="landing" />

      <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="w-full max-w-md mx-auto">
          <Link to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-8 md:p-10 rounded-[2rem] shadow-xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-serif mb-2">Welcome back</h1>
              <p className="text-muted-foreground">
                {role === "ngo"
                  ? "Sign in to manage your shelter and listings."
                  : "Continue your journey to finding a companion."}
              </p>
            </div>

            {/* Role toggle (User / NGO) */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-muted mb-6">
              {(
                [
                  { key: "user", label: "User Login", icon: User },
                  { key: "ngo", label: "NGO Login", icon: Building2 },
                ] as { key: Role; label: string; icon: typeof User }[]
              ).map(({ key, label, icon: Icon }) => {
                const active = role === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    className="h-11 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={
                      active
                        ? { backgroundColor: "#5B9FE0", color: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }
                        : { backgroundColor: "transparent", color: "var(--muted-foreground)" }
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* OTP/Password tab toggle */}
            <div className="flex rounded-full bg-muted p-1 mb-6 gap-1">
              {(["otp", "password"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 h-10 rounded-full text-sm font-medium transition-all duration-200"
                  style={
                    tab === t
                      ? { backgroundColor: "#5B9FE0", color: "#fff" }
                      : { backgroundColor: "transparent", color: "var(--muted-foreground)" }
                  }
                >
                  {t === "otp" ? "Login with OTP" : "Login with Password"}
                </button>
              ))}
            </div>

            {/* Forms */}
            <AnimatePresence mode="wait">
              {tab === "otp" ? (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                    <div className="flex gap-2">
                      <span className="h-12 px-4 flex items-center bg-muted rounded-xl text-sm text-muted-foreground border border-input font-medium select-none">
                        +91
                      </span>
                      <Input
                        placeholder="98765 43210"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ""));
                          if (otpStep === "verify") { setOtpStep("phone"); setOtp(""); }
                        }}
                        className="h-12 rounded-xl flex-1"
                      />
                    </div>
                  </div>

                  {/* OTP input (after send) */}
                  <AnimatePresence>
                    {otpStep === "verify" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-medium mb-1.5 mt-2">Enter OTP</label>
                        <Input
                          placeholder="6-digit code"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          className="h-12 rounded-xl tracking-widest text-lg text-center font-mono"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendTimer > 0}
                            className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                          >
                            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA */}
                  {otpStep === "phone" ? (
                    <button
                      onClick={handleSendOtp}
                      disabled={!phoneValid}
                      className="w-full h-14 rounded-full text-white text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                      style={{ backgroundColor: "#5B9FE0" }}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <button
                      onClick={handleVerify}
                      disabled={!otpValid}
                      className="w-full h-14 rounded-full text-white text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                      style={{ backgroundColor: "#5B9FE0" }}
                    >
                      Verify &amp; Login
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {role === "ngo" ? "Registered Email or Phone" : "Email or Phone"}
                    </label>
                    <Input
                      type="text"
                      placeholder={role === "ngo" ? "hello@hopeshelter.org" : "you@example.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-medium">Password</label>
                      <Link to="#" className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-xl pr-12"
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
                  </div>

                  <button
                    onClick={handlePasswordLogin}
                    disabled={!emailValid || !passwordValid}
                    className="w-full h-14 rounded-full text-white text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                    style={{ backgroundColor: "#5B9FE0" }}
                  >
                    Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* NGO helper note */}
            {role === "ngo" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-5 flex items-start gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3"
              >
                <ShieldCheck
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#5B9FE0" }}
                />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  NGOs can log in using their registered email and password or OTP.
                </p>
              </motion.div>
            )}

            {/* Trust + Signup */}
            <div className="mt-6 space-y-3">
              <p className="flex items-center justify-center gap-2 text-xs text-[#9CA3AF]">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                Your data is secure and only shared with verified NGOs.
              </p>
              <p className="text-center text-sm text-muted-foreground">
                {role === "ngo" ? (
                  <>
                    New NGO?{" "}
                    <Link to="/ngo/register" className="underline underline-offset-2 hover:text-foreground transition-colors">
                      Register your organization
                    </Link>
                  </>
                ) : (
                  <>
                    New here?{" "}
                    <Link to="/signup" className="underline underline-offset-2 hover:text-foreground transition-colors">
                      Create an account
                    </Link>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
