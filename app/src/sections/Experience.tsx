import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    period: "May 2024 – Present",
    role: "Full Stack Developer",
    company: "EXL Services",
    location: "Noida",
    description: [
      "Migrated core survey APIs from .NET 6 to .NET 8, improving runtime performance and long-term maintainability of the platform.",
      "Delivered 20+ user stories across Agile sprints, building new REST endpoints and refining existing response structures.",
      "Contributed to architectural decisions on the Survey Replatforming project, working directly with cross-functional stakeholders.",
    ],
    highlights: [".NET 6 → .NET 8", "20+ User Stories", "Agile / Scrum"],
  },
  {
    id: 2,
    period: "April 2023 – April 2024",
    role: "React Developer",
    company: "Abgyan Overseas",
    location: "Noida",
    description: [
      "Built and maintained React.js front-end for the company website, improving responsiveness across device sizes.",
      "Integrated front-end components with back-end services to ensure reliable data flow across the application.",
    ],
    highlights: ["React.js", "Responsive Design", "API Integration"],
  },
  {
    id: 3,
    period: "August 2022 – November 2022",
    role: "Intern",
    company: "Teachnook",
    location: "Remote",
    description: [
      "Independently designed and developed two full web applications (Tourism and Weather), owning the complete UI/UX from scratch.",
    ],
    highlights: ["Full Stack", "UI/UX Design", "2 Web Apps"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const st = ScrollTrigger.create({
          trigger: row,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              row,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.1,
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

  const addToRows = (el: HTMLDivElement | null) => {
    if (el && !rowRefs.current.includes(el)) {
      rowRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-dark py-24 md:py-32 lg:py-40"
      style={{ zIndex: 40 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-amber" />
          <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase">
            Experience
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-12 md:mb-16 tracking-tight">
          Professional Journey
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={addToRows}
              className={`relative mb-8 md:mb-0 ${
                index !== experiences.length - 1 ? "md:pb-12" : ""
              }`}
            >
              <div
                className={`md:flex md:items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div
                    onClick={() =>
                      setExpandedId(expandedId === exp.id ? null : exp.id)
                    }
                    className={`group relative p-6 md:p-8 rounded-xl border transition-all duration-500 cursor-pointer ${
                      expandedId === exp.id
                        ? "bg-dark-card border-amber/30"
                        : "bg-dark-card/50 border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Amber left accent on expanded */}
                    {expandedId === exp.id && (
                      <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-amber rounded-full" />
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-amber text-xs font-medium tracking-wide">
                          {exp.period}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                          {exp.role}
                        </h3>
                        <p className="text-gray-400 text-sm mt-0.5">
                          {exp.company} — {exp.location}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-500 shrink-0 mt-1 transition-transform duration-300 ${
                          expandedId === exp.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    {/* Expanded content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        expandedId === exp.id
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-white/5">
                        <ul className="space-y-3">
                          {exp.description.map((desc, i) => (
                            <li
                              key={i}
                              className="text-gray-400 text-sm leading-relaxed flex items-start gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-amber mt-2 shrink-0" />
                              {desc}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium text-amber bg-amber/10 rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      expandedId === exp.id
                        ? "bg-amber border-amber scale-125"
                        : "bg-dark border-white/20"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
