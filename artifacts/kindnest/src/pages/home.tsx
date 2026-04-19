import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Shield, Users, CheckCircle2, Star } from "lucide-react";

const storiesOfHope = [
  {
    image: "/images/cat.png",
    caption: "Rescued from the streets, now loved at home.",
    ngo: "Paws & Hearts Rescue",
  },
  {
    image: "/images/hero.png",
    caption: "From shelter to sofa in 3 weeks. He chose us.",
    ngo: "Hope Shelter India",
  },
  {
    image: "/images/community.png",
    caption: "A family of four became five, one rescue at a time.",
    ngo: "New Beginnings NGO",
  },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Mission */}
        <section id="about" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">A softer world starts here.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We believe in the quiet joy of a safe home. Belong is a sanctuary—a place where trust is built, awareness is spread, and gentle connections are made.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Compassionate Adoption",
                  desc: "Connecting loving individuals with animals who need a forever home.",
                  color: "bg-primary/10 text-primary"
                },
                {
                  icon: Users,
                  title: "Child Welfare Awareness",
                  desc: "Shining a light on ethical child adoption processes and supporting partner NGOs.",
                  color: "bg-secondary/20 text-secondary-foreground"
                },
                {
                  icon: Shield,
                  title: "Safe & Verified",
                  desc: "Every NGO and shelter on our platform is verified to ensure safety and trust.",
                  color: "bg-accent text-accent-foreground"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-10 rounded-[2rem] border border-border hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: How it Works */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">A gentle journey.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Whether you're adopting a pet, supporting a child welfare NGO, or registering as a partner, we're with you every step of the way.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-border -z-10" />
              {[
                {
                  step: "01",
                  title: "Choose Adoption Path",
                  desc: "Select whether you want to adopt an animal or explore child adoption guidance.",
                },
                {
                  step: "02",
                  title: "Discover Animals & NGOs",
                  desc: "Browse verified animal listings and trusted NGO partners across India.",
                },
                {
                  step: "03",
                  title: "Send Requests",
                  desc: "Apply for animal adoption or send inquiries to NGOs securely.",
                },
                {
                  step: "04",
                  title: "Complete the Journey",
                  desc: "Follow through with the adoption process and bring someone home.",
                },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group cursor-default"
                >
                  <div className="w-24 h-24 mx-auto bg-card border-4 border-background rounded-full flex items-center justify-center mb-6 shadow-sm shadow-primary/10 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-200">
                    <span className="font-serif text-2xl text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-serif mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Two-Sided Impact (Animals) */}
        <section id="impact" className="py-24 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl"
              >
                <img src="/images/cat.png" alt="Rescue cat by window" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">Open your door to an animal in need.</h2>
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
                <Button asChild variant="outline" size="lg">
                  <Link href="/role-select" className="inline-flex items-center gap-2 group">
                    Meet the animals <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 5: Two-Sided Impact (Children) */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">Guiding the path to family.</h2>
                <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                  Child adoption in India can be complex. We raise awareness, provide resources, and connect you with certified CARA-approved NGOs to demystify the journey.
                </p>
                <p className="text-sm text-[#9CA3AF] mb-8">
                  Child adoption is guided through verified agencies and follows official legal processes in India.
                </p>
                <ul className="space-y-5 mb-10">
                  {['Legal guidance and CARA process resources', 'Connections to verified partner NGOs', 'Community support groups for parents'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-foreground font-medium text-lg">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground shrink-0">
                        <Shield className="w-4 h-4 text-accent-foreground" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="lg">
                  <Link href="/role-select" className="inline-flex items-center gap-2 group">
                    Learn about child adoption <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl"
              >
                <img src="/images/child.png" alt="Child drawing with crayons" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 6: Stories of Hope */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Stories of Hope</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Real moments shared by NGOs and rescuers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {storiesOfHope.map((story, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.caption}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        t.parentElement!.classList.add("bg-muted", "flex", "items-center", "justify-center");
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-foreground font-medium leading-snug mb-3">
                      "{story.caption}"
                    </p>
                    <p className="text-xs text-[#9CA3AF] font-medium tracking-wide uppercase">
                      — {story.ngo}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Community & Success */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img src="/images/community.png" alt="Diverse community outdoors" className="w-full h-auto rounded-[3rem] shadow-lg" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Heart className="w-12 h-12 text-primary mb-6" />
                <h2 className="text-4xl font-serif mb-6 text-foreground">A growing community of kindness.</h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                  "Finding our dog through Belong was the most peaceful experience. The shelter was so transparent, and we felt supported the whole time."
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="font-medium text-foreground">— The Sharma Family</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 8: Partner NGOs Banner */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground font-medium mb-8">TRUSTED BY CARA-APPROVED NGOS AND VERIFIED SHELTERS NATIONWIDE</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['Hope Shelter India', 'Safe Haven Orphange', 'Paws & Hearts Rescue', 'New Beginnings NGO', 'Little Steps Foundation'].map((partner, i) => (
                <div key={i} className="text-xl md:text-2xl font-serif text-foreground font-bold italic tracking-wider">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 -skew-y-3 transform origin-top-left scale-110"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-card p-12 md:p-20 rounded-[3rem] shadow-2xl border border-border/50"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif mb-6 text-foreground">Someone out there is waiting for you.</h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Whether you're looking to adopt, volunteer, or register your NGO, your journey towards a kinder world starts right here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <Link
                  href="/role-select"
                  data-testid="button-cta-start"
                  className="inline-flex items-center justify-center h-16 px-10 text-xl rounded-full text-white font-semibold shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{ backgroundColor: "#FFB7A5" }}
                >
                  Start Your Journey
                </Link>
                <Link
                  href="/ngo/register"
                  data-testid="button-cta-ngo"
                  className="inline-flex items-center justify-center h-16 px-10 text-xl rounded-full font-medium text-foreground border-2 border-border bg-transparent transition-all duration-200 hover:border-primary/50 hover:bg-muted/30 active:scale-95"
                >
                  I'm an NGO
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
