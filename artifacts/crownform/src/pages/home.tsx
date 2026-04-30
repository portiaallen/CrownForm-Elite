import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Crown, ArrowRight, FileText, CheckCircle, ShieldCheck, Mail, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import brandFlyer from "@assets/file_00000000e71471fd82d71f886a0479c3_1777583268827.png";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details"),
});

export default function Home() {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    toast({
      title: "Inquiry Submitted",
      description: "Thank you for reaching out. We will review your request and get back to you shortly.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          scrolled ? "bg-background/90 backdrop-blur-md border-border/50 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-serif text-xl tracking-wider uppercase">
            <Crown className="w-5 h-5" strokeWidth={1.5} />
            <span>CrownForm</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="#process" className="text-muted-foreground hover:text-primary transition-colors">Process</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Clientele</a>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-none" onClick={scrollToContact}>
              Inquire Now
            </Button>
          </nav>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border/50 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Services</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Process</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Clientele</a>
            <Button className="bg-primary text-primary-foreground rounded-none w-full" onClick={scrollToContact}>
              Inquire Now
            </Button>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Luxury Texture" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-primary tracking-[0.2em] text-xs font-semibold uppercase mb-6 block">Where Documents Become Authority</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8">
                Refine Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic">Image.</span><br />
                Elevate Your <span className="italic">Opportunities.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed font-light">
                Professional documents designed to position you for success. We bring editorial precision to your career and business materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 text-sm tracking-widest uppercase group"
                  onClick={scrollToContact}
                >
                  Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/30 text-foreground hover:bg-white/5 rounded-none h-14 px-8 text-sm tracking-widest uppercase"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Services
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="relative hidden md:block"
          >
            <div className="aspect-[3/4] relative w-full max-w-md mx-auto overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/images/resume-mockup.png" 
                alt="Resume Mockup" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Bespoke Services</h2>
              <p className="text-muted-foreground text-lg">Tailored document design that commands attention and respect in any professional setting.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Resume Writing & Optimization",
                desc: "Clean, ATS-optimized, professionally formatted resumes tailored to your career trajectory and goals.",
                price: "Starting at $35",
                icon: FileText
              },
              {
                title: "Business Document Kit",
                desc: "Invoice, letterhead, and proposal templates with consistent branding so your business looks authoritative and gets paid.",
                price: "Starting at $40–$100",
                icon: ShieldCheck
              },
              {
                title: "PDF Clean-Up & Polishing",
                desc: "Turn messy documents into polished, presentable PDFs with pristine layout, better readability, and consistent design.",
                price: "Starting at $15–$50 / doc",
                icon: CheckCircle
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 md:p-10 bg-background border border-border/40 hover:border-primary/50 transition-colors relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-700" />
                <service.icon className="w-10 h-10 text-primary mb-8 opacity-80" strokeWidth={1} />
                <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-grow">{service.desc}</p>
                <div className="mt-auto">
                  <div className="text-sm tracking-widest uppercase text-foreground/70 mb-6">{service.price}</div>
                  <Button 
                    variant="link" 
                    className="p-0 text-primary hover:text-primary/80 uppercase tracking-widest text-xs"
                    onClick={scrollToContact}
                  >
                    Request Service <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Process */}
      <section id="process" className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Stand out in a sea of standard templates.</h2>
              <div className="space-y-6 text-muted-foreground font-light text-lg">
                <p>We believe that how you present your information is just as important as the information itself. Poor formatting dilutes expertise; masterful design amplifies it.</p>
                <p>CrownForm Studios provides the editorial polish that signals you take yourself seriously, driving career growth, business credibility, and tangible opportunities.</p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="border-l border-primary/30 pl-6">
                  <div className="text-3xl font-serif text-foreground mb-2">100%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Confidential</div>
                </div>
                <div className="border-l border-primary/30 pl-6">
                  <div className="text-3xl font-serif text-foreground mb-2">Bespoke</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Design</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-secondary/40 p-8 md:p-12 border border-white/5"
            >
              <h3 className="text-2xl font-serif mb-10 border-b border-border/50 pb-6">Our Process</h3>
              
              <div className="space-y-10">
                {[
                  { step: "01", title: "Submit Your Information", desc: "Share your current documents, goals, and aesthetic preferences." },
                  { step: "02", title: "We Design & Refine", desc: "Our team applies structural polish, rewriting, and visual hierarchy." },
                  { step: "03", title: "Receive Polished Documents", desc: "Walk away with print-ready, ATS-friendly, high-impact materials." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-primary font-serif text-xl italic">{item.step}</div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                      <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Asset / Quote */}
      <section className="py-24 bg-black relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 opacity-20">
          <img src={brandFlyer} alt="CrownForm Reference" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <Crown className="w-8 h-8 text-primary mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-serif leading-tight italic text-foreground mb-8">
            "Quality You Can See.<br />Service You Can Trust."
          </h2>
          <div className="w-12 h-px bg-primary mx-auto" />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-center text-4xl md:text-5xl font-serif mb-20">Clientele</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "The resume rewrite completely changed my job search. I landed three interviews in the first week of using the new format.", author: "Elena R.", role: "Senior Marketing Manager" },
              { quote: "Our business proposals finally look as professional as the services we offer. The investment paid for itself immediately.", author: "Marcus T.", role: "Agency Founder" },
              { quote: "CrownForm brings an editorial eye to dry corporate documents. Absolute perfection in formatting and typography.", author: "Sarah J.", role: "Financial Consultant" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-background relative"
              >
                <div className="text-primary font-serif text-6xl absolute top-4 left-6 opacity-20">"</div>
                <p className="text-muted-foreground font-light italic leading-relaxed mb-8 relative z-10 pt-4">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-xs font-serif text-primary border border-primary/20">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA & Contact */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Step Into Your Next Level</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Elevate your documents. Enhance your credibility. Start your order below and our team will be in touch within 24 hours.
            </p>
          </div>

          <div className="bg-background border border-border/50 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-none bg-secondary/30 border-white/10 h-12" {...field} />
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
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="rounded-none bg-secondary/30 border-white/10 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Service Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none bg-secondary/30 border-white/10 h-12">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none border-white/10 bg-background">
                          <SelectItem value="resume">Resume Writing & Optimization</SelectItem>
                          <SelectItem value="business">Business Document Kit</SelectItem>
                          <SelectItem value="cleanup">PDF Clean-Up & Polishing</SelectItem>
                          <SelectItem value="other">Other / Custom Request</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your goals and current documents..." 
                          className="rounded-none bg-secondary/30 border-white/10 min-h-[120px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-sm tracking-widest uppercase">
                  Start Your Order
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2 text-primary font-serif text-2xl tracking-wider uppercase">
                <Crown className="w-6 h-6" strokeWidth={1.5} />
                <span>CrownForm</span>
              </div>
              <p className="text-muted-foreground text-sm font-serif italic">Where Documents Become Authority.</p>
            </div>
            
            <div className="flex gap-8 text-sm uppercase tracking-widest text-muted-foreground">
              <a href="#services" className="hover:text-primary transition-colors">Services</a>
              <a href="#process" className="hover:text-primary transition-colors">Process</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60">
            <p>&copy; {new Date().getFullYear()} CrownForm Studios. All rights reserved.</p>
            <div className="flex gap-6">
              <span>100% Confidential & Secure</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Custom Service Just For You</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
