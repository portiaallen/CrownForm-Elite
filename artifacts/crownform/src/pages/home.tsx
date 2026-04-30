import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Crown, ArrowRight, FileText, CheckCircle, ShieldCheck, ChevronRight, ChevronDown, Menu, X, ExternalLink, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import brandFlyer from "@assets/file_00000000e71471fd82d71f886a0479c3_1777583268827.png";

const INTAKE_FORM_URL = "https://forms.gle/8NnKNW2fwY7z548b7";

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <button
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground font-light leading-relaxed pr-10">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; label: string } | null>(null);

  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    if (lightboxImage) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxImage, closeLightbox]);

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

  const openIntakeForm = () => {
    window.open(INTAKE_FORM_URL, "_blank", "noopener,noreferrer");
    setMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
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
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center" aria-label="CrownForm Studios">
            <img
              src="/images/crownform-logo-dark.png"
              alt="CrownForm Studios"
              className={`w-auto transition-all duration-500 ${scrolled ? "h-9 md:h-10" : "h-11 md:h-12"}`}
            />
          </a>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="#process" className="text-muted-foreground hover:text-primary transition-colors">Process</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Clientele</a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-none" onClick={openIntakeForm}>
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
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Portfolio</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Process</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Clientele</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">FAQ</a>
            <Button className="bg-primary text-primary-foreground rounded-none w-full" onClick={openIntakeForm}>
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
                  onClick={openIntakeForm}
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

      {/* Trust Strip */}
      <div className="border-y border-white/8 bg-secondary/20 py-5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0"
          >
            {[
              { value: "100+", label: "Documents Delivered" },
              { value: "48-Hour", label: "Typical Turnaround" },
              { value: "100%", label: "Confidential & Secure" },
              { value: "3", label: "Signature Resume Styles" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-primary font-serif text-lg font-semibold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
                {i < 3 && <div className="hidden md:block w-px h-8 bg-white/10 mx-4" />}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <section id="services" className="py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Signature Services</h2>
              <p className="text-muted-foreground text-lg">Tailored document design that commands attention and respect in any professional setting.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Resume Writing & Optimization",
                desc: "Clean, ATS-optimized, professionally formatted resumes tailored to your career trajectory and goals.",
                price: "Starting at $35",
                icon: FileText,
                includes: ["1-page or 2-page resume", "ATS keyword optimization", "2 rounds of revisions", "PDF + DOCX delivery"],
              },
              {
                title: "Business Document Kit",
                desc: "Invoice, letterhead, and proposal templates with consistent branding so your business looks authoritative and gets paid.",
                price: "Starting at $40–$100",
                icon: ShieldCheck,
                includes: ["Invoice, letterhead & proposal", "Custom branded design", "Editable file formats", "Print & digital ready"],
              },
              {
                title: "PDF Clean-Up & Polishing",
                desc: "Turn messy documents into polished, presentable PDFs with pristine layout, better readability, and consistent design.",
                price: "Starting at $15–$50 / doc",
                icon: CheckCircle,
                includes: ["Layout & formatting cleanup", "Consistent fonts & spacing", "1 revision included", "PDF delivery"],
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
                <p className="text-muted-foreground font-light leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {service.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground font-light">
                      <span className="w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="text-sm tracking-widest uppercase text-foreground/70 mb-6">{service.price}</div>
                  <Button 
                    variant="link" 
                    className="p-0 text-primary hover:text-primary/80 uppercase tracking-widest text-xs"
                    onClick={openIntakeForm}
                  >
                    Request Service <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:flex justify-between items-end"
          >
            <div className="max-w-2xl">
              <span className="text-primary tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">Sample Work</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Documents That Open Doors</h2>
              <p className="text-muted-foreground text-lg font-light leading-relaxed">
                Three distinct styles — each precision-crafted to command authority in its field. Click any to view full size.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground rounded-none mt-8 md:mt-0 text-xs tracking-widest uppercase"
              onClick={openIntakeForm}
            >
              Order Your Resume
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                src: "/images/resumes/ascension.png",
                label: "The Ascension",
                sub: "Executive Upgrade",
                desc: "Bold authority, structured impact — built for C-suite and senior leadership.",
              },
              {
                src: "/images/resumes/crown.png",
                label: "The Crown",
                sub: "Clean Authority",
                desc: "Refined symmetry with gold accents — ideal for finance and corporate professionals.",
              },
              {
                src: "/images/resumes/signature.png",
                label: "Signature Aura",
                sub: "Personality + Presence",
                desc: "Two-column editorial layout for creative and design-forward professionals.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group cursor-pointer flex flex-col"
                onClick={() => setLightboxImage({ src: item.src, label: item.label })}
              >
                <div className="relative overflow-hidden border border-white/10 group-hover:border-primary/40 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ aspectRatio: "3/4" }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0 transform">
                    <span className="text-white text-xs uppercase tracking-widest bg-primary/90 px-3 py-1">
                      View Full Size
                    </span>
                  </div>
                </div>
                <div className="pt-5 pb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                    <span className="text-xs text-muted-foreground tracking-wider uppercase">{item.sub}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-h-[90vh] max-w-3xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.label}
              className="max-h-[82vh] w-auto object-contain shadow-2xl border border-white/10"
            />
            <p className="text-white/60 text-xs uppercase tracking-widest">{lightboxImage.label} — CrownForm Studios</p>
          </motion.div>
        </motion.div>
      )}

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

              <div className="mt-10 border-l-2 border-primary/40 pl-6">
                <p className="text-foreground/80 font-serif italic text-lg leading-relaxed mb-3">
                  "I started CrownForm Studios because I watched talented people get passed over — not for lack of skill, but for lack of presentation. Every document we deliver is built to change that."
                </p>
                <p className="text-xs text-primary uppercase tracking-widest">— Founder, CrownForm Studios</p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="border-l border-primary/30 pl-6">
                  <div className="text-3xl font-serif text-foreground mb-2">100%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Confidential</div>
                </div>
                <div className="border-l border-primary/30 pl-6">
                  <div className="text-3xl font-serif text-foreground mb-2">48hr</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Turnaround</div>
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

      {/* FAQ */}
      <section id="faq" className="py-32 bg-secondary/10">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-primary tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-serif">Everything You Need to Know</h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-white/8">
            {[
              {
                q: "How long does turnaround take?",
                a: "Most orders are completed within 48 hours of receiving your information. Rush delivery (24 hours) is available — just mention it in your intake form and we will confirm availability.",
              },
              {
                q: "How many revisions are included?",
                a: "Resume orders include 2 rounds of revisions. PDF Clean-Up orders include 1 revision. Business Document Kits include revisions until you are satisfied with the design direction. Additional rounds beyond the included amount can be discussed.",
              },
              {
                q: "What file formats will I receive?",
                a: "Resumes are delivered as PDF and DOCX so you can edit them yourself going forward. Business document templates are delivered in editable formats (Word or Google Docs compatible). PDF Clean-Up jobs are delivered as a polished PDF.",
              },
              {
                q: "Is my information kept private?",
                a: "Absolutely. All information you share — personal details, career history, business documents — is handled with strict confidentiality and used solely to complete your order. We never share or store your data beyond the project.",
              },
              {
                q: "What if I am not happy with the result?",
                a: "Your satisfaction matters. We work with you through included revisions to get the document right. If you have concerns after revisions, reach out directly and we will make it right.",
              },
              {
                q: "How do I pay?",
                a: "Payment details are shared after we review your intake form and confirm your order scope. We keep the process simple and direct.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA & Contact */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-primary tracking-[0.2em] text-xs font-semibold uppercase mb-6 block">Begin Your Project</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-[1.1]">Step Into Your Next Level</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Tell us about your goals through our short intake form. We will review your request and respond within 24 hours with next steps.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative bg-background border border-border/50 p-10 md:p-16 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="relative z-10 grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <h3 className="text-2xl md:text-3xl font-serif mb-4 leading-snug">Start Your Order</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Our intake form takes less than two minutes. Share your service of interest, project details, and any reference documents — we will take it from there.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: Sparkles, label: "Tailored to your goals and industry" },
                    { icon: Clock, label: "Typical turnaround in 48 hours or less" },
                    { icon: ShieldCheck, label: "100% confidential and secure" },
                  ].map(({ icon: Icon, label }, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                      <Icon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                      <span className="font-light">{label}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-10 text-sm tracking-widest uppercase group"
                  onClick={openIntakeForm}
                >
                  Open Intake Form
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-muted-foreground/70 mt-4 tracking-wide">
                  Opens our secure Google Form in a new tab.
                </p>
              </div>

              <div className="md:col-span-2 flex flex-col items-center text-center md:border-l md:border-white/10 md:pl-12">
                <Crown className="w-10 h-10 text-primary mb-6 opacity-80" strokeWidth={1.25} />
                <p className="font-serif italic text-lg leading-relaxed text-foreground/90 mb-2">
                  "Where Documents Become Authority."
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">CrownForm Studios</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <img
                src="/images/crownform-logo-dark.png"
                alt="CrownForm Studios"
                className="h-12 md:h-14 w-auto"
              />
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
