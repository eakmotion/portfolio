import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  Check,
  Code2,
  Copy,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Server,
  Sparkles,
  X,
} from 'lucide-react';
import profilePhoto from './assets/images/profile-photo.png';
import logoMogo from './assets/images/logos/logo-mogo.png';
import logoMoka from './assets/images/logos/logo-moka.png';
import logoSblive from './assets/images/logos/logo-sblive.svg';
import logoFlash from './assets/images/logos/logo-flash.jpg';
import logo500 from './assets/images/logos/logo-500.jpg';
import logoOozou from './assets/images/logos/logo-oozou.png';
import logoScribd from './assets/images/logos/logo-scribd.svg';
import screenshotMogoTrade from './assets/images/projects/screenshot-mogo-trade.png';
import screenshotMoka from './assets/images/projects/screenshot-moka.png';
import screenshotMogoMoney from './assets/images/projects/screenshot-mogo-money.png';
import screenshotSblive from './assets/images/projects/screenshot-sblive.png';
import screenshotFlashfunders from './assets/images/projects/screenshot-flashfunders.png';
import screenshotScribd from './assets/images/projects/screenshot-scribd.png';

/* ------------------------------------------------------------------ */
/* Hooks & primitives                                                  */
/* ------------------------------------------------------------------ */

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

/** Fades + slides content in the first time it scrolls into view. */
const Reveal = ({
  children,
  delay = 0,
  className = '',
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) => {
  const { ref, inView } = useInView();
  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : `translateY(${y}px)`,
    transition: `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
  };
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

/** Animates a number from 0 when it enters the viewport. */
const CountUp = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const { ref, inView } = useInView(0.4);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    let start: number | null = null;
    let raf = 0;
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="inline-block">
      {current}
      {suffix}
    </div>
  );
};

/** Wrapper that gently pulls its content toward the cursor. */
const Magnetic = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className}`}
      style={{ transition: `transform 0.4s ${EASE}` }}
    >
      {children}
    </div>
  );
};

/** Adds a subtle 3D tilt toward the cursor. */
const Tilt = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${py * -4}deg) rotateY(${px * 5}deg)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: `transform 0.5s ${EASE}`, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

/** Types and deletes a rotating list of phrases. */
const Typewriter = ({ phrases }: { phrases: string[] }) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(phrases[0]);
      return;
    }
    const phrase = phrases[phraseIndex % phrases.length];
    let delay = deleting ? 32 : 62;
    if (!deleting && text === phrase) delay = 2200;
    else if (deleting && text === '') delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === phrase) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(phrase.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, phraseIndex, phrases]);

  return (
    <span>
      {text}
      <span className="text-violet-400 animate-blink" aria-hidden="true">
        _
      </span>
    </span>
  );
};

/** Mono-spaced numbered section eyebrow, e.g. "01 / About". */
const SectionEyebrow = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-center gap-3 font-mono text-sm tracking-widest text-violet-400 uppercase">
    <span className="text-violet-500/70">{index}</span>
    <span className="h-px w-10 bg-violet-500/40" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const LOGOS = [
  { name: 'Scribd', image: logoScribd },
  { name: 'Mogo', image: logoMogo },
  { name: 'Moka', image: logoMoka },
  { name: 'SBLive Sports', image: logoSblive },
  { name: 'FlashFunders', image: logoFlash },
  { name: '500 Global', image: logo500 },
  { name: 'Oozou', image: logoOozou },
];

const HERO_PHRASES = [
  'AI-powered recommendations',
  'scalable trading platforms',
  'resilient, high-traffic APIs',
  'engineers, through mentorship',
];

const TECH_STACK = [
  'TypeScript',
  'Node.js',
  'React',
  'Ruby on Rails',
  'Go',
  'Python',
  'AWS',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
];

const SKILLS = [
  {
    icon: <Code2 size={22} />,
    title: 'Full-Stack Development',
    description:
      'End-to-end product engineering with Node.js, Ruby on Rails, TypeScript, and modern JavaScript frameworks.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Front-End & UX',
    description:
      'React and React Native interfaces built on accessibility, usability, and performance-first principles.',
  },
  {
    icon: <Server size={22} />,
    title: 'Cloud & DevOps',
    description:
      'AWS, Docker, Kubernetes, and CI/CD pipelines that keep deployments scalable, secure, and boring — in the best way.',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'AI & Data Integration',
    description:
      'Generative AI integrations (FinChat.io) that sharpen product capability and data-driven decision making.',
  },
];

const STATS = [
  { value: 15, suffix: '+', label: 'Years of experience' },
  { value: 20, suffix: '+', label: 'Projects shipped' },
  { value: 4, suffix: '+', label: 'Industries served' },
  { value: 5, suffix: '+', label: 'Tech specialties' },
];

const EXPERIENCES: {
  company: string;
  role: string;
  period?: string;
  tagline: string;
  summary: string;
  highlights: string[];
  tags: string[];
}[] = [
  {
    company: 'Scribd',
    role: 'Senior Software Engineer · Recommendations & Gen AI',
    period: 'May 2025 — Present',
    tagline: 'Advancing human understanding',
    summary:
      "Building the Recommendations and Gen AI experience for Scribd — the applied knowledge platform with 300M+ community-contributed documents, research papers, and study materials, part of the Scribd, Inc. family alongside Slideshare, Everand, and Fable.",
    highlights: [
      'Developing personalized recommendation systems that help millions of users discover the right content across 300M+ documents.',
      'Applying generative AI to deepen content understanding and power smarter, AI-assisted discovery.',
      'Collaborating across teams on the core Scribd product to advance the company mission of human understanding.',
    ],
    tags: ['Gen AI', 'Recommendations', 'Machine Learning'],
  },
  {
    company: 'Mogo',
    role: 'Senior Software Engineer',
    tagline: 'Transforming financial services',
    summary:
      'Led development of mission-critical trading, lending, and investment platforms — from integrating generative AI for institutional research to championing UX improvements across the member journey.',
    highlights: [
      'Architected and scaled full-stack solutions for MogoTrade and Moka with Node.js, Ruby, TypeScript, and AWS.',
      "Led the integration of FinChat's generative AI to streamline financial analysis and decision-making.",
      'Hardened CI/CD pipelines and infrastructure automation, maintaining high uptime with robust security standards.',
    ],
    tags: ['Node.js', 'TypeScript', 'Ruby', 'AWS', 'AI'],
  },
  {
    company: 'SBLive Sports',
    role: 'Senior Software Engineer',
    tagline: 'Real-time sports at national scale',
    summary:
      'Built scalable systems and microservices architectures supporting millions of fans, with traffic spikes during major sporting events.',
    highlights: [
      'Designed Go and Ruby microservices that absorbed large traffic spikes during major sports events.',
      'Migrated critical features from legacy PHP services to modern Go-based solutions.',
      'Cut costs and latency with caching, load balancing, and AWS tooling (EC2, RDS, DynamoDB).',
    ],
    tags: ['Go', 'Ruby', 'PHP', 'AWS', 'Microservices'],
  },
  {
    company: 'FlashFunders',
    role: 'Software Engineer',
    tagline: 'Democratizing startup investment',
    summary:
      'Designed investor workflows for an equity crowdfunding platform — regulatory compliance, secure transactions, and integrations with DocuSign and FundAmerica.',
    highlights: [
      'Built secure investor flows satisfying FINRA/SEC regulations and AML/KYC checks.',
      'Shipped Ruby on Rails and Python microservices with automated escrow via external APIs.',
      'Maintained quality with RSpec, Capybara, and CI/CD-driven test automation.',
    ],
    tags: ['Ruby on Rails', 'React', 'Python', 'Fintech'],
  },
  {
    company: 'Mentorship',
    role: 'Lighthouse Labs · ADPList',
    tagline: 'Giving back to the community',
    summary:
      'Mentoring aspiring engineers through Lighthouse Labs and as a volunteer mentor on ADPList — code reviews, career guidance, and one-on-one sessions across the full development lifecycle.',
    highlights: [
      'Personalized guidance on coding challenges, project work, and curriculum enhancements.',
      'One-on-one career and technical sessions helping developers worldwide grow their confidence.',
    ],
    tags: ['Mentorship', 'Code Review', 'Career Coaching'],
  },
];

const PROJECTS = [
  {
    title: 'Scribd',
    description:
      'The applied knowledge platform — 300M+ documents, research papers, legal filings, and study materials, contributed by a global community.',
    tech: ['Gen AI', 'Recommendations', 'Machine Learning'],
    website: 'www.scribd.com',
    screenshot: screenshotScribd,
    achievements: [
      'Building personalized recommendations that connect millions of users with the right content out of 300M+ documents.',
      'Applying generative AI to content understanding and AI-assisted document discovery.',
      'Working on the core Scribd product within the Scribd, Inc. family (Scribd, Slideshare, Everand, Fable).',
    ],
  },
  {
    title: 'MogoTrade',
    description: 'Commission-free stock trading built for impact — every trade helps plant a tree.',
    tech: ['Node.js', 'TypeScript', 'AWS'],
    website: 'www.mogo.ca',
    screenshot: screenshotMogoTrade,
    achievements: [
      'Cut data-retrieval response times by 30% through query optimization.',
      'Implemented security measures meeting strict financial regulations.',
      'Helped design and deploy the microservices architecture behind seamless scaling.',
    ],
  },
  {
    title: 'Moka',
    description: 'Automated saving and investing that rounds up your spare change.',
    tech: ['Node.js', 'TypeScript'],
    website: 'www.moka.ai',
    screenshot: screenshotMoka,
    achievements: [
      'Built the automated round-up engine that lets users save effortlessly.',
      'Reduced server load by 25% with smart caching strategies.',
      'Key contributor to the monolith → microservices transition.',
    ],
  },
  {
    title: 'Mogo Money',
    description: 'Personal loans with a radically simple online experience.',
    tech: ['Ruby', 'Ruby on Rails'],
    website: 'mogo.ca/personal-loans-canada',
    screenshot: screenshotMogoMoney,
    achievements: [
      'Cut loan approval times by 40% with optimized credit-scoring algorithms.',
      'Ensured compliance with financial regulations through rigorous validation.',
      'Integrated third-party payment gateways for disbursement and repayment.',
    ],
  },
  {
    title: 'SBLive Sports',
    description: 'Real-time scores, news, and updates for high-school sports nationwide.',
    tech: ['Ruby', 'Ruby on Rails', 'Go'],
    website: 'scorebooklive.com',
    screenshot: screenshotSblive,
    achievements: [
      'Shipped real-time data streaming for up-to-the-minute scores.',
      'Optimized storage and retrieval to ride out peak game-night traffic.',
      'Partnered with front-end teams for seamless API integration.',
    ],
  },
  {
    title: 'FlashFunders',
    description: 'Equity crowdfunding that simplifies how startups raise capital.',
    tech: ['Ruby on Rails', 'React', 'Python'],
    website: 'flashfunders.com',
    screenshot: screenshotFlashfunders,
    achievements: [
      'Built secure investor flows satisfying FINRA/SEC and AML/KYC requirements.',
      'Automated escrow management through FundAmerica API integration.',
      'Migrated legacy components to a modern stack, cutting technical debt.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowTop(y > 600);

      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(y / total, 1) : 0);

      let current = 'home';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = spotlightRef.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(650px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.09), transparent 65%)`;
  };

  const copyEmail = async () => {
    const email = 'eakpun@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const entrance = (delay: number): CSSProperties => ({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'none' : 'translateY(24px)',
    transition: `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
  });

  return (
    <div className="bg-ink-950 font-body text-slate-200 min-h-screen">
      <div className="noise-overlay" aria-hidden="true" />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-violet-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------- */}
      {/* Navigation                                                  */}
      {/* ---------------------------------------------------------- */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Scroll progress */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400"
          style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="font-display font-bold text-lg tracking-tight text-white"
            style={entrance(0.1)}
          >
            eak<span className="text-violet-400">zang</span>
            <span className="text-violet-400 animate-blink" aria-hidden="true">.</span>
          </a>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.id} style={entrance(0.15 + index * 0.06)}>
                  <a
                    href={`#${item.id}`}
                    className={`relative px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'text-white bg-white/5'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li style={entrance(0.5)}>
                <a
                  href="#contact"
                  className="ml-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-950 bg-white hover:bg-violet-200 px-4 py-2 rounded-full transition-colors duration-300"
                >
                  Let's talk
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="md:hidden text-white p-2 -mr-2"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden bg-ink-950/95 backdrop-blur-xl border-b border-white/5 ${
            isMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
          style={{ transition: `max-height 0.45s ${EASE}` }}
        >
          <nav className="px-5 py-4" aria-label="Mobile">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base transition-colors ${
                      activeSection === item.id
                        ? 'text-white bg-white/5'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                        */}
      {/* ---------------------------------------------------------- */}
      <section
        id="home"
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 hero-grid" aria-hidden="true" />
        <div ref={spotlightRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Ambient glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse, rgba(124, 58, 237, 0.35), rgba(67, 56, 202, 0.15) 55%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full py-24">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-14 items-center">
            <div>
              <div style={entrance(0.15)}>
                <div className="inline-flex items-center gap-2.5 font-mono text-xs md:text-sm text-violet-300 border border-violet-500/25 bg-violet-500/[0.07] rounded-full px-4 py-1.5 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Senior Full-Stack Software Engineer
                </div>
              </div>

              <h1
                className="font-display font-bold text-white leading-[1.05] tracking-tight text-5xl md:text-7xl mb-6"
                style={entrance(0.25)}
              >
                Hi, I'm <span className="text-gradient">Eak</span>.
                <br />
                I build{' '}
                <span className="block h-[2.6em] lg:h-[1.35em] text-slate-300 text-3xl lg:text-4xl mt-3 font-medium leading-snug">
                  <Typewriter phrases={HERO_PHRASES} />
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-10" style={entrance(0.35)}>
                15+ years turning complex problems into elegant, scalable software — across
                fintech, knowledge platforms, and sports tech. Currently building
                recommendations and Gen AI at <span className="text-slate-200 font-medium">Scribd</span>.
              </p>

              <div className="flex flex-wrap items-center gap-4" style={entrance(0.45)}>
                <Magnetic>
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40"
                  >
                    View my work
                    <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-slate-200 border border-white/15 hover:border-violet-400/60 hover:text-white px-7 py-3.5 rounded-full transition-colors duration-300 bg-white/[0.03] hover:bg-violet-500/10"
                  >
                    Get in touch
                  </a>
                </Magnetic>

                <div className="flex items-center gap-1 ml-1">
                  {[
                    { href: 'https://github.com/eakmotion', icon: <Github size={19} />, label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/eakkapan', icon: <Linkedin size={19} />, label: 'LinkedIn' },
                    { href: 'mailto:eakpun@gmail.com', icon: <Mail size={19} />, label: 'Email' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2.5 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Portrait */}
            <div className="hidden md:flex justify-center" style={entrance(0.4)}>
              <div className="relative animate-float">
                <div
                  className="absolute -inset-6 rounded-full blur-2xl opacity-30 animate-pulse-soft"
                  style={{ background: 'conic-gradient(from 120deg, #7c3aed, #4f46e5, #06b6d4, #7c3aed)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -inset-3 rounded-full border border-dashed border-violet-400/30 animate-spin-slow"
                  aria-hidden="true"
                />
                <div className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-violet-900/40">
                  <img src={profilePhoto} alt="Eak Zangkaew" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs bg-ink-800/90 backdrop-blur border border-white/10 text-slate-300 px-4 py-1.5 rounded-full whitespace-nowrap">
                  Currently @ Scribd
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech ticker + scroll cue */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full pb-10" style={entrance(0.6)}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate-500">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="hover:text-violet-300 transition-colors duration-300 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Logo marquee                                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-14 border-y border-white/5 bg-ink-900/50" aria-label="Companies I've worked with">
        <Reveal>
          <p className="text-center font-mono text-xs tracking-[0.25em] uppercase text-slate-500 mb-8">
            Trusted by teams at
          </p>
          <div className="marquee marquee-mask overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-6 animate-marquee">
              {[...LOGOS, ...LOGOS].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex items-center justify-center bg-white/95 rounded-xl px-8 py-4 h-16 w-44 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <img src={logo.image} alt={`${logo.name} logo`} className="max-h-8 max-w-[7.5rem] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* About                                                       */}
      {/* ---------------------------------------------------------- */}
      <section id="about" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <SectionEyebrow index="01" label="About" />
            <h2 className="font-display font-bold text-white text-4xl md:text-5xl tracking-tight mt-5 mb-6 max-w-3xl">
              Engineering with empathy,
              <br />
              <span className="text-gradient">shipping with rigor.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 mt-10">
            <Reveal delay={0.1}>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                With over 15 years designing and building scalable, high-performance software, I
                blend deep technical expertise with a keen eye for user experience — from
                intuitive React front-ends to robust Node.js, Ruby on Rails, and cloud-native
                back-ends.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-violet-500/60 pl-5">
                My passion lies in transforming complex challenges into elegant, user-centered
                products — and helping the next generation of engineers do the same.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                {STATS.map((stat) => (
                  <div key={stat.label} className="bg-ink-900 p-6 hover:bg-ink-800 transition-colors duration-300">
                    <div className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Skill cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {SKILLS.map((skill, index) => (
              <Reveal key={skill.title} delay={0.08 * index}>
                <div className="group h-full bg-ink-900 border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:border-violet-500/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-900/20">
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-violet-500/25 group-hover:scale-110">
                    {skill.icon}
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{skill.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{skill.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Experience                                                  */}
      {/* ---------------------------------------------------------- */}
      <section id="experience" className="py-28 bg-ink-900/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <SectionEyebrow index="02" label="Experience" />
            <h2 className="font-display font-bold text-white text-4xl md:text-5xl tracking-tight mt-5 mb-16">
              Where I've made an <span className="text-gradient">impact.</span>
            </h2>
          </Reveal>

          <div className="relative">
            {/* Timeline rail */}
            <div
              className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 via-white/10 to-transparent"
              aria-hidden="true"
            />

            <div className="space-y-14">
              {EXPERIENCES.map((exp, index) => {
                const alignRight = index % 2 === 1;
                return (
                  <Reveal key={exp.company} delay={0.05}>
                    <div className="relative md:grid md:grid-cols-2 md:gap-14">
                      {/* Timeline dot */}
                      <div
                        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 w-[15px] h-[15px] rounded-full bg-ink-950 border-2 border-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.7)]"
                        aria-hidden="true"
                      />

                      <div className={alignRight ? 'md:col-start-2' : 'md:text-right'}>
                        <div className="pl-10 md:pl-0 group">
                          <div
                            className={`bg-ink-900 border border-white/5 rounded-2xl p-7 text-left transition-all duration-500 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-900/20 hover:-translate-y-1 ${
                              alignRight ? '' : 'md:mr-2'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <div className="font-mono text-xs text-violet-400 uppercase tracking-widest">
                                {exp.tagline}
                              </div>
                              {exp.period && (
                                <div className="font-mono text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                                  {exp.period}
                                </div>
                              )}
                            </div>
                            <h3 className="font-display font-bold text-white text-2xl mb-1">{exp.company}</h3>
                            <div className="text-slate-400 text-sm mb-4">{exp.role}</div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-5">{exp.summary}</p>
                            <ul className="space-y-2.5 mb-6">
                              {exp.highlights.map((highlight) => (
                                <li key={highlight} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                                  <span className="text-violet-400 mt-0.5 shrink-0" aria-hidden="true">
                                    ▹
                                  </span>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                              {exp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[11px] text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Mentee reviews */}
          <Reveal delay={0.1} className="mt-20">
            <div className="bg-ink-900 border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-white text-xl">What my mentees say</h3>
                </div>
                <a
                  href="https://adplist.org/mentors/eak-zangkaew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-white transition-colors"
                >
                  View on ADPList
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="h-[420px] md:h-[480px] rounded-xl overflow-hidden bg-white">
                <iframe
                  src="https://adplist.org/widgets/reviews?src=eak-zangkaew"
                  title="Mentee Reviews"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Projects                                                    */}
      {/* ---------------------------------------------------------- */}
      <section id="projects" className="py-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <SectionEyebrow index="03" label="Projects" />
            <h2 className="font-display font-bold text-white text-4xl md:text-5xl tracking-tight mt-5 mb-16">
              Selected <span className="text-gradient">work.</span>
            </h2>
          </Reveal>

          <div className="space-y-20">
            {PROJECTS.map((project, index) => {
              const reversed = index % 2 === 1;
              return (
                <Reveal key={project.title} delay={0.05}>
                  <article
                    className={`group grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                      reversed ? 'md:[direction:rtl]' : ''
                    }`}
                  >
                    {/* Screenshot */}
                    <Tilt className="[direction:ltr]">
                    <a
                      href={`https://${project.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-2xl overflow-hidden border border-white/10 bg-ink-900 shadow-2xl shadow-black/40 transition-all duration-500 hover:border-violet-500/40 hover:shadow-violet-900/30"
                      aria-label={`Visit ${project.title} website`}
                    >
                      <div className="flex items-center gap-1.5 px-4 py-3 bg-ink-800 border-b border-white/5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                        <span className="ml-3 font-mono text-[11px] text-slate-500 truncate">
                          {project.website}
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <img
                          src={project.screenshot}
                          alt={`${project.title} screenshot`}
                          loading="lazy"
                          className="w-full aspect-[16/10] object-cover object-top brightness-[0.85] transition-all duration-700 group-hover:brightness-100 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-medium text-white bg-violet-600/90 backdrop-blur px-3.5 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        Visit site <ArrowUpRight size={13} />
                      </div>
                    </a>
                    </Tilt>

                    {/* Details */}
                    <div className="[direction:ltr]">
                      <div className="font-mono text-xs text-violet-400 mb-3">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="font-display font-bold text-white text-3xl mb-3">{project.title}</h3>
                      <p className="text-slate-300 leading-relaxed mb-5">{project.description}</p>
                      <ul className="space-y-2.5 mb-6">
                        {project.achievements.map((achievement) => (
                          <li key={achievement} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                            <span className="text-violet-400 mt-0.5 shrink-0" aria-hidden="true">
                              ▹
                            </span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Contact                                                     */}
      {/* ---------------------------------------------------------- */}
      <section id="contact" className="py-28 relative overflow-hidden border-t border-white/5">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.4), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <div className="flex justify-center mb-6">
              <SectionEyebrow index="04" label="Contact" />
            </div>
            <h2 className="font-display font-bold text-white text-4xl md:text-6xl tracking-tight mb-6">
              Let's build something
              <br />
              <span className="text-gradient">great together.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
              Whether you need innovative software solutions, full-stack expertise, or a mentor to
              help you navigate tech — my inbox is always open.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
              <Magnetic>
                <a
                  href="mailto:eakpun@gmail.com"
                  className="group inline-flex items-center gap-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 text-base"
                >
                  <Mail size={18} />
                  eakpun@gmail.com
                </a>
              </Magnetic>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 text-sm text-slate-300 border border-white/15 hover:border-violet-400/60 px-5 py-4 rounded-full transition-colors duration-300 bg-white/[0.03] hover:bg-violet-500/10"
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy email
                  </>
                )}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12 text-left">
              {[
                {
                  href: 'https://www.linkedin.com/in/eakkapan',
                  icon: <Linkedin size={20} />,
                  title: 'LinkedIn',
                  subtitle: 'Connect professionally',
                },
                {
                  href: 'https://github.com/eakmotion',
                  icon: <Github size={20} />,
                  title: 'GitHub',
                  subtitle: 'Explore my code',
                },
                {
                  href: 'https://adplist.org/mentors/eak-zangkaew',
                  icon: <GraduationCap size={20} />,
                  title: 'ADPList',
                  subtitle: 'Free mentorship session',
                },
              ].map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 bg-ink-900 border border-white/5 rounded-2xl p-5 transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1"
                >
                  <span className="text-slate-400 group-hover:text-violet-300 transition-colors duration-300">
                    {link.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-white font-medium text-sm">{link.title}</span>
                    <span className="block text-slate-500 text-xs truncate">{link.subtitle}</span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="ml-auto shrink-0 text-slate-600 group-hover:text-violet-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                  />
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2.5 font-mono text-xs text-slate-400 bg-ink-900 border border-white/5 px-5 py-2.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Typically responds within 24 hours
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Footer                                                      */}
      {/* ---------------------------------------------------------- */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Eak Zangkaew. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {[
              { href: 'https://github.com/eakmotion', icon: <Github size={17} />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/eakkapan', icon: <Linkedin size={17} />, label: 'LinkedIn' },
              { href: 'mailto:eakpun@gmail.com', icon: <Mail size={17} />, label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 text-slate-500 hover:text-white rounded-full hover:bg-white/5 transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-ink-800/90 backdrop-blur border border-white/10 text-slate-300 hover:text-white hover:border-violet-400/60 shadow-lg transition-all duration-500 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default Portfolio;
