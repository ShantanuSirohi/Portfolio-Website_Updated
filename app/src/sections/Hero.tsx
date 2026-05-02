import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Linkedin, Github, FileText } from "lucide-react";
import resumePdf from "../../public/Shantanu_Sirohi-Full_Stack_Developer.pdf.pdf"

gsap.registerPlugin(ScrollTrigger);

function MonogramLogo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-amber"
    >
      <text
        x="4"
        y="38"
        fontFamily="Manrope, sans-serif"
        fontSize="32"
        fontWeight="800"
        fill="currentColor"
        letterSpacing="-2"
      >
        SS
      </text>
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        monogramRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          headlineRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subheadlineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          profileCardRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // Scroll-driven exit animations (pinned feel without actual pin)
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=80%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (headlineRef.current) {
            gsap.set(headlineRef.current, {
              y: -progress * 80,
              opacity: 1 - progress * 0.8,
            });
          }
          if (subheadlineRef.current) {
            gsap.set(subheadlineRef.current, {
              y: -progress * 40,
              opacity: 1 - progress * 0.7,
            });
          }
          if (ctaRef.current) {
            gsap.set(ctaRef.current, {
              opacity: 1 - progress * 0.9,
            });
          }
          if (profileCardRef.current) {
            gsap.set(profileCardRef.current, {
              y: progress * 40,
              opacity: 1 - progress * 0.8,
            });
          }
        },
      });

      triggerRefs.current.push(st);
    }, sectionRef);

    return () => {
      triggerRefs.current.forEach((st) => st.kill());
      triggerRefs.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("contact");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] w-full bg-dark flex flex-col justify-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-amber/5 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-amber/5 blur-[100px]" />
      </div>

      {/* Large background monogram */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-[30vw] font-extrabold text-white/[0.02] select-none leading-none"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          SS
        </span>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 px-6 md:px-12 py-6 flex items-center justify-between">
        <div ref={monogramRef} className="flex items-center gap-3">
          <MonogramLogo />
          <span className="text-white font-semibold text-lg tracking-tight">
            Sirohi
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-sm text-gray-400 hover:text-amber transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#experience"
            className="text-sm text-gray-400 hover:text-amber transition-colors duration-300"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="text-sm text-gray-400 hover:text-amber transition-colors duration-300"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="text-sm text-gray-400 hover:text-amber transition-colors duration-300"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="text-sm text-gray-400 hover:text-amber transition-colors duration-300"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text content */}
          <div className="lg:col-span-7 flex flex-col">
            <div ref={headlineRef} className="overflow-hidden">
              <h1 className="text-[12vw] md:text-[7vw] lg:text-[5.5vw] font-extrabold text-white leading-[1.05] tracking-tight">
                Full Stack
                <br />
                Developer
              </h1>
            </div>

            <p
              ref={subheadlineRef}
              className="mt-6 md:mt-8 text-base md:text-lg text-gray-400 max-w-lg leading-relaxed"
            >
              Building production web applications with .NET, Spring Boot, and
              React.js. Currently delivering enterprise platform migrations at
              EXL Services.
            </p>

            <div className="mt-8 md:mt-10 flex items-center gap-4">
              <button
                ref={ctaRef}
                onClick={scrollToAbout}
                className="group flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber-light text-white rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                Scroll Down
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <a
                href="#contact"
                className="px-6 py-3 border border-white/20 hover:border-amber text-white hover:text-amber rounded-full text-sm font-medium transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right: Profile card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={profileCardRef}
              className="relative w-full max-w-sm bg-dark-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber/20 to-transparent" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center text-white font-extrabold text-xl shrink-0">
                  SS
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Shantanu Sirohi
                  </h3>
                  <p className="text-amber text-sm mt-0.5">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-500">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-500">GitHub</span>
                  </a>
                  <a
                    href={resumePdf}
                    download
                    className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-500">Resume</span>
                  </a>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for opportunities
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
