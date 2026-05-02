import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML / CSS", level: 90 },
      { name: "C#", level: 75 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Spring Boot", level: 90 },
      { name: "React.js", level: 85 },
      { name: ".NET (6/8)", level: 80 },
      { name: "Spring Security", level: 85 },
      { name: "Bootstrap", level: 80 },
    ],
  },
  {
    title: "Databases & Tools",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "Git", level: 85 },
      { name: "AWS", level: 70 },
      { name: "Postman", level: 90 },
    ],
  },
  {
    title: "Methodologies",
    skills: [
      { name: "Agile / Scrum", level: 90 },
      { name: "REST API Design", level: 90 },
      { name: "JWT Authentication", level: 85 },
      { name: "Role-Based Access", level: 85 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const categoryRefs = useRef<HTMLDivElement[]>([]);
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      categoryRefs.current.forEach((cat, i) => {
        if (!cat) return;
        const st = ScrollTrigger.create({
          trigger: cat,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              cat,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.1,
              }
            );

            // Animate progress bars
            const bars = cat.querySelectorAll(".skill-progress");
            bars.forEach((bar, j) => {
              const width = (bar as HTMLElement).dataset.width;
              gsap.fromTo(
                bar,
                { width: "0%" },
                {
                  width: `${width}%`,
                  duration: 1.2,
                  ease: "power3.out",
                  delay: i * 0.1 + j * 0.08 + 0.3,
                }
              );
            });
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

  const addToCategories = (el: HTMLDivElement | null) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full bg-dark py-24 md:py-32 lg:py-40"
      style={{ zIndex: 30 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-amber" />
              <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase">
                Expertise
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Technologies I
              <br />
              Work With
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-gray-400 leading-relaxed">
              A comprehensive stack built through hands-on experience across
              enterprise projects. From backend API development with Spring
              Boot and .NET to modern React.js front-ends, I bring full-stack
              versatility to every project.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              ref={addToCategories}
              className="bg-dark-card/50 border border-white/5 rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-white/5">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="skill-progress h-full bg-gradient-to-r from-amber to-amber-light rounded-full"
                        data-width={skill.level}
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                ))}
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
