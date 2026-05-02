import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutPhoto from "../../public/profile picture.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const labelSt = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            labelRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
          );
        },
        once: true,
      });
      triggerRefs.current.push(labelSt);

      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const st = ScrollTrigger.create({
          trigger: line,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              line.querySelector(".text-inner"),
              { y: "100%", opacity: 0.3 },
              {
                y: "0%",
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: i * 0.08,
              }
            );
          },
          once: true,
        });
        triggerRefs.current.push(st);
      });
    }, sectionRef);

    return () => {
      triggerRefs.current.forEach((st) => st.kill());
      triggerRefs.current = [];
      ctx.revert();
    };
  }, []);

  const addToLines = (el: HTMLDivElement | null) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  const paragraphs = [
    "Full Stack Developer with 2+ years building production web applications. Currently at EXL Services delivering .NET API development and platform migrations for enterprise systems.",
    "Experienced across Spring Boot, .NET, and React.js with a track record of shipping features end-to-end in Agile teams. I bridge the gap between complex backend architecture and polished, responsive user interfaces.",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-black py-24 md:py-32 lg:py-40"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-3 mb-12 md:mb-16">
          <div className="w-2 h-2 rounded-full bg-amber" />
          <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase">
            About
          </span>
        </div>

        {/* Main grid - Left column (paragraph + stats) | Right column (image) */}
        <div className="grid gap-8 items-start lg:grid-cols-[1.45fr_1fr]">
          {/* Left column - Paragraph + Stats */}
          <div className="max-w-2xl">
            {/* Paragraph */}
            {paragraphs.map((text, i) => (
              <div key={i} className="overflow-hidden mb-6">
                <div ref={addToLines} className="line-mask">
                  <span
                    className="text-inner block text-lg md:text-xl lg:text-2xl font-medium text-white leading-[1.7] tracking-tight"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {text}
                  </span>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-8">
              {[
                { number: "2+", label: "Years Experience" },
                { number: "20+", label: "User Stories Delivered" },
                { number: "3", label: "Key Projects" },
                { number: "10+", label: "Technologies" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image */}
          <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 max-w-sm w-full">
            <img
              src={aboutPhoto}
              alt="About me"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}