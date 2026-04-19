import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Shield, Users, CheckCircle2, Star } from "lucide-react";
import { Lotus } from "@/components/decorative/Lotus";
import { RangoliBorder } from "@/components/decorative/RangoliBorder";
import { MandalaDecor } from "@/components/decorative/MandalaDecor";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Section 1: Hero */}
        <HeroSection />

        <RangoliBorder />

        {/* Section 2: Mission */}
        <section id="about" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-serif mb-6 text-foreground text-primary">A softer world starts here.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We believe in the quiet joy of a safe home. KindNest is a sanctuary—a place where trust is built, awareness is spread, and gentle connections are made.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lotus,
                  title: "Compassionate Adoption",
                  desc: "Connecting loving individuals with animals who need a forever home.",
                  color: "bg-primary/10 text-primary border-primary/20"
                },
                {
                  icon: Users,
                  title: "Child Welfare Awareness",
                  desc: "Shining a light on ethical child adoption processes and supporting partner NGOs.",
                  color: "bg-secondary/20 text-secondary-foreground border-secondary/30"
                },
                {
                  icon: Shield,
                  title: "Safe & Verified",
                  desc: "Every NGO and shelter on our platform is verified to ensure safety and trust.",
                  color: "bg-accent/20 text-accent-foreground border-accent/30"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background p-10 rounded-[2rem] border hover:border-primary/40 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <RangoliBorder />

        {/* Section 3: How it Works */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-serif mb-6 text-primary">A gentle journey.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Whether you're adopting a pet, supporting a child welfare NGO, or registering as a partner, we're with you every step of the way.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-border -z-10" />
              {[
                { step: "१", title: "Choose Your Path", desc: "Select if you want to adopt an animal or explore child welfare." },
                { step: "२", title: "Explore Profiles", desc: "Browse verified shelters and NGO partners across India." },
                { step: "३", title: "Connect", desc: "Reach out securely through our platform to begin the conversation." },
                { step: "४", title: "Welcome Home", desc: "Complete the legal and ethical steps to build your family." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto bg-card border-4 border-background rounded-full flex items-center justify-center mb-6 shadow-md shadow-primary/10">
                    <span className="font-sans font-bold text-3xl text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <RangoliBorder />

        {/* Section 4: Two-Sided Impact (Animals) */}
        <section id="impact" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-background"
              >
                <img src="/images/cat.png" alt="Rescue cat by window" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-5xl md:text-6xl font-serif mb-6 text-primary">Open your door to an animal in need.</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  From street rescues to abandoned pets, thousands of animals are waiting for a gentle hand. Partner with our verified shelters to find your new best friend.
                </p>
                <ul className="space-y-5 mb-10">
                  {['Verified medical records and history', 'Post-adoption behavioral support', 'Fostering and volunteering options available'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-foreground font-medium text-lg">
                      <div className="w-8 h-8 rounded-full bg-secondary/40 flex items-center justify-center text-secondary-foreground shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Link href="/role-select" className="inline-flex items-center gap-2 group">
                    Meet the animals <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 5: Two-Sided Impact (Children) */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className=""
              >
                <h2 className="text-5xl md:text-6xl font-serif mb-6 text-secondary-foreground">Guiding the path to family.</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Child adoption in India can be complex. We raise awareness, provide resources, and connect you with certified CARA-approved NGOs to demystify the journey.
                </p>
                <ul className="space-y-5 mb-10">
                  {['Legal guidance and CARA process resources', 'Connections to verified partner NGOs', 'Community support groups for parents'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-foreground font-medium text-lg">
                      <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-accent-foreground shrink-0">
                        <Shield className="w-4 h-4 text-accent-foreground" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="lg" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-white">
                  <Link href="/role-select" className="inline-flex items-center gap-2 group">
                    Learn about child adoption <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-background"
              >
                <img src="/images/child.png" alt="Child drawing with crayons" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>
          </div>
        </section>

        <RangoliBorder className="bg-card" />

        {/* Section 6: Community & Success */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-[3rem] overflow-hidden shadow-xl border-4 border-card">
                  <img src="/images/community.png" alt="Diverse community outdoors" className="w-full h-auto object-cover" />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card p-12 rounded-[3rem] border border-border shadow-lg"
              >
                <Lotus className="w-12 h-12 text-primary mb-6" />
                <h2 className="text-4xl font-serif mb-6 text-foreground">A growing community of kindness.</h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed italic">
                  "Finding our dog through KindNest was the most peaceful experience. The shelter was so transparent, and we felt supported the whole time."
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                  <p className="font-bold text-foreground text-lg">— The Sharma Family</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 7: Partner NGOs Banner */}
        <section className="py-16 border-y border-border bg-card">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-bold mb-8 tracking-widest text-sm">TRUSTED ACROSS BHARAT BY CARA-APPROVED NGOS AND VERIFIED SHELTERS</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 transition-all duration-500">
              {['Hope Shelter India', 'Safe Haven Orphanage', 'Paws & Hearts Rescue', 'New Beginnings NGO', 'Little Steps Foundation'].map((partner, i) => (
                <div key={i} className="text-xl md:text-3xl font-serif text-foreground hover:text-primary transition-colors cursor-default">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: CTA Section */}
        <section className="py-32 relative overflow-hidden bg-primary/5">
          <MandalaDecor className="absolute inset-0 w-full h-full text-primary scale-150 origin-center opacity-[0.03]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-card p-12 md:p-20 rounded-[3rem] shadow-2xl border border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-tr-full pointer-events-none"></div>
              
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
                <Lotus className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-6 text-foreground relative z-10">Ready to make a difference?</h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed relative z-10">
                Whether you're looking to adopt, volunteer, or register your NGO, your journey towards a kinder world starts right here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 relative z-10">
                <Button asChild size="lg" className="h-16 px-10 text-xl rounded-full">
                  <Link href="/role-select">
                    Start Your Journey
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="h-16 px-10 text-xl rounded-full">
                  <Link href="/ngo/register">
                    I'm an NGO
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
