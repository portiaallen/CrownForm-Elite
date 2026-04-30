import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Copy, Check, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAYMENT_METHODS = [
  {
    name: "PayPal",
    handle: "$portiaallen40",
    link: "https://www.paypal.biz/pkbiz",
    memo: "Send as Friends & Family",
    color: "#0070E0",
    bg: "from-[#003087]/20 to-[#009CDE]/10",
    border: "border-[#0070E0]/30 hover:border-[#0070E0]/60",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
    ),
  },
  {
    name: "Cash App",
    handle: "$portiaallen40",
    link: "https://cash.app/$portiaallen40",
    memo: "Note your name & service",
    color: "#00D54B",
    bg: "from-[#00D54B]/20 to-[#00D54B]/5",
    border: "border-[#00D54B]/30 hover:border-[#00D54B]/60",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M23.59 3.548a12.24 12.24 0 0 0-8.651-3.542H9.062A12.062 12.062 0 0 0 0 12.062v2.877A12.062 12.062 0 0 0 9.062 27h5.877A12.062 12.062 0 0 0 27 14.938V9.062a12.24 12.24 0 0 0-3.41-5.514zm-6.571 12.405c-.272.898-.919 1.57-1.867 1.93l.226 1.048a.3.3 0 0 1-.294.36h-1.38a.3.3 0 0 1-.294-.246l-.21-.988c-.612-.056-1.206-.216-1.723-.462a.3.3 0 0 1-.15-.384l.45-1.13a.3.3 0 0 1 .41-.156c.51.258 1.108.414 1.69.414.79 0 1.26-.306 1.26-.822 0-.486-.348-.762-1.356-1.074-1.374-.42-2.34-1.044-2.34-2.346 0-.888.55-1.62 1.494-2.028l-.204-.948a.3.3 0 0 1 .294-.36h1.374a.3.3 0 0 1 .294.246l.192.9c.504.062.972.192 1.374.39a.3.3 0 0 1 .15.39l-.432 1.092a.3.3 0 0 1-.39.162 3.084 3.084 0 0 0-1.35-.306c-.714 0-1.11.3-1.11.756 0 .444.39.696 1.488 1.044 1.44.438 2.22 1.11 2.22 2.394 0 .048-.006.09-.012.138l-.003-.014z" />
      </svg>
    ),
  },
  {
    name: "Venmo",
    handle: "@portiaallen40",
    link: "https://venmo.com/portiaallen40",
    memo: "Include your name & service",
    color: "#3396CD",
    bg: "from-[#3396CD]/20 to-[#3396CD]/5",
    border: "border-[#3396CD]/30 hover:border-[#3396CD]/60",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M19.01 1.01c.56.93.81 1.89.81 3.11 0 3.87-3.31 8.9-6 12.42H7.63L4.99 1.98l5.79-.55 1.38 11.01c1.29-2.1 2.88-5.4 2.88-7.65 0-1.23-.21-2.07-.56-2.76l4.53-.92z" />
      </svg>
    ),
  },
  {
    name: "Zelle",
    handle: "portiaallen40@gmail.com",
    link: "https://enroll.zellepay.com/",
    memo: "Send directly via your bank app",
    color: "#6D1ED4",
    bg: "from-[#6D1ED4]/20 to-[#6D1ED4]/5",
    border: "border-[#6D1ED4]/30 hover:border-[#6D1ED4]/60",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12.006 0C5.374 0 0 5.373 0 12.006 0 18.628 5.374 24 12.006 24 18.628 24 24 18.628 24 12.006 24 5.373 18.628 0 12.006 0zm4.44 16.098h-8.28v-1.77l5.19-6.69H8.226V5.898h8.1v1.77l-5.19 6.69h5.31v1.74z" />
      </svg>
    ),
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span className="text-green-400">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default function Payment() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* Nav */}
      <header className="border-b border-white/10 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="flex items-center"
            aria-label="CrownForm Studios Home"
          >
            <img
              src="/images/crownform-logo-dark.png"
              alt="CrownForm Studios"
              className="h-9 w-auto"
            />
          </a>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </button>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary tracking-[0.2em] text-xs font-semibold uppercase mb-5 block">
              Secure Payment
            </span>
            <h1 className="text-4xl md:text-6xl font-serif mb-5 leading-[1.1]">
              Submit Your Payment
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-light leading-relaxed">
              Choose your preferred payment method below. After sending, include your name and the service ordered in the memo so we can match your payment quickly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Cards */}
      <section className="pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {PAYMENT_METHODS.map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`relative bg-gradient-to-br ${method.bg} border ${method.border} transition-colors duration-400 p-8 flex flex-col gap-6 group overflow-hidden`}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Header */}
                <div className="flex items-center gap-4">
                  <div style={{ color: method.color }} className="opacity-90">
                    {method.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif">{method.name}</h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{method.memo}</p>
                  </div>
                </div>

                {/* Handle */}
                <div className="bg-background/40 border border-white/10 px-5 py-4 flex items-center justify-between gap-4">
                  <span className="font-mono text-sm text-foreground tracking-wide truncate">{method.handle}</span>
                  <CopyButton text={method.handle} />
                </div>

                {/* CTA */}
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button
                    className="w-full rounded-none h-12 text-xs uppercase tracking-widest group/btn text-black font-semibold"
                    style={{ backgroundColor: method.color }}
                  >
                    Open {method.name}
                    <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Memo Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 border border-primary/20 bg-primary/5 px-8 py-6 flex flex-col md:flex-row items-start md:items-center gap-4"
          >
            <div className="w-1 h-12 bg-primary/50 rounded-full shrink-0 hidden md:block" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">Important — Memo Reminder</p>
              <p className="text-muted-foreground font-light text-sm leading-relaxed">
                When sending payment, please include your <span className="text-foreground">full name</span> and the <span className="text-foreground">service you ordered</span> (e.g. "Jane Smith — Resume Writing") in the notes or memo field so we can process your order without delay.
              </p>
            </div>
          </motion.div>

          {/* Trust Note */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-xs text-muted-foreground/60 uppercase tracking-widest">
            <span>100% Confidential</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>Payments Processed Securely</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>Order Confirmed Within 24 Hours</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8 text-center">
        <p className="text-xs text-muted-foreground/50 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} CrownForm Studios — Where Documents Become Authority.
        </p>
      </footer>
    </div>
  );
}
