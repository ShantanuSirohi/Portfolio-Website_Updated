import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            headlineRef.current,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
          );
          gsap.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
          );
        },
        once: true,
      });
      triggerRefs.current.push(st);
    }, sectionRef);

    return () => {
      triggerRefs.current.forEach((st) => st.kill());
      triggerRefs.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-black py-24 md:py-32 lg:py-40"
      style={{ zIndex: 60 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Massive headline */}
        <h2
          ref={headlineRef}
          className="text-[10vw] md:text-[8vw] lg:text-[6vw] font-extrabold text-white leading-none tracking-tight mb-16 md:mb-20"
        >
          Let&apos;s
          <br />
          <span className="text-amber">Connect</span>
        </h2>

        {/* Contact content */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left: Contact info */}
          <div>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
              I&apos;m currently open to new opportunities and collaborations.
              Whether you have a project in mind or just want to connect,
              I&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:shantanu.sirohi@email.com"
                className="group flex items-center gap-4 p-4 rounded-xl bg-dark-card/50 border border-white/5 hover:border-amber/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-white transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-0.5">Email</div>
                  <div className="text-white font-medium group-hover:text-amber transition-colors">
                    shantanu.sirohi@email.com
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600 ml-auto group-hover:text-amber transition-colors" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-dark-card/50 border border-white/5 hover:border-amber/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-white transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-0.5">LinkedIn</div>
                  <div className="text-white font-medium group-hover:text-amber transition-colors">
                    linkedin.com/in/shantanu-sirohi
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600 ml-auto group-hover:text-amber transition-colors" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-dark-card/50 border border-white/5 hover:border-amber/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-white transition-all duration-300">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-0.5">GitHub</div>
                  <div className="text-white font-medium group-hover:text-amber transition-colors">
                    github.com/shantanu-sirohi
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600 ml-auto group-hover:text-amber transition-colors" />
              </a>
            </div>
          </div>

          {/* Right: Location + Status */}
          <div className="flex flex-col justify-between">
            <div className="bg-dark-card/50 border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Based in Noida, India</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-400 text-sm">Availability</span>
                  <span className="flex items-center gap-2 text-sm text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Open to work
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-400 text-sm">Preferred Roles</span>
                  <span className="text-white text-sm">
                    Full Stack, Backend, Frontend
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-400 text-sm">Experience</span>
                  <span className="text-white text-sm">2+ Years</span>
                </div>
              </div>
            </div>

            {/* Decorative monogram */}
            <div className="hidden lg:flex items-center justify-end mt-12">
              <div className="relative">
                <span className="text-[12rem] font-extrabold text-white/[0.03] leading-none select-none">
                  SS
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-amber/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 md:mt-32">
        <div className="h-px bg-white/10 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center text-white font-extrabold text-sm">
              SS
            </div>
            <span className="text-white font-semibold">Shantanu Sirohi</span>
          </div>
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Shantanu Sirohi. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="text-sm text-gray-500 hover:text-amber transition-colors"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
