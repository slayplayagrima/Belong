import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Inbox, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MyRequests() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <Inbox className="w-3.5 h-3.5" />
              Your activity
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
              My Requests
            </h1>
            <p className="text-muted-foreground">
              Track the status of every animal you've reached out about.
            </p>
          </motion.div>

          <div className="rounded-[2rem] border border-dashed border-border bg-muted/30 p-12 text-center">
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: "#EAF3FB" }}
            >
              <Inbox className="w-6 h-6" style={{ color: "#5B9FE0" }} />
            </div>
            <h2 className="text-2xl font-serif text-foreground mb-2">
              No requests yet
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              When you send an adoption request, it will appear here so you can
              follow the conversation with the NGO.
            </p>
            <Link to="/animals"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-white font-medium"
              style={{ backgroundColor: "#5B9FE0" }}
            >
              Browse animals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
