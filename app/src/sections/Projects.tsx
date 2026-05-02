import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Layers, ShoppingCart, Cloud, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ContactWise",
    subtitle: "Contact Manager",
    description:
      "A full-featured contact management app with CRUD operations, JWT-based authentication, and role-based access control. Built with enterprise-grade security patterns.",
    tech: ["Spring Boot", "MySQL", "Spring Security", "JWT"],
    icon: <Layers className="w-6 h-6" />,
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    id: 2,
    title: "Gourme",
    subtitle: "Food Delivery API",
    description:
      "Designed RESTful API with endpoints for user authentication, menu management, order processing, and delivery tracking. Scalable architecture for high throughput.",
    tech: ["Spring Boot", "REST API", "Hibernate", "MySQL"],
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "from-orange-500/20 to-orange-600/5",
  },
  {
    id: 3,
    title: "Groceries App",
    subtitle: "React SPA",
    description:
      "Single-page application consuming a live REST API for real-time grocery data. Features responsive UI with dynamic state management and optimized rendering.",
    tech: ["React.js", "REST API", "Responsive UI", "State Management"],
    icon: <Cloud className="w-6 h-6" />,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: 4,
    title: "Groceries App",
    subtitle: "React SPA",
    description:
      "Single-page application consuming a live REST API for real-time grocery data. Features responsive UI with dynamic state management and optimized rendering.",
    tech: ["React.js", "REST API", "Responsive UI", "State Management"],
    icon: <Cloud className="w-6 h-6" />,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: 5,
    title: "Groceries App",
    subtitle: "React SPA",
    description:
      "Single-page application consuming a live REST API for real-time grocery data. Features responsive UI with dynamic state management and optimized rendering.",
    tech: ["React.js", "REST API", "Responsive UI", "State Management"],
    icon: <Cloud className="w-6 h-6" />,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: 6,
    title: "Groceries App",
    subtitle: "React SPA",
    description:
      "Single-page application consuming a live REST API for real-time grocery data. Features responsive UI with dynamic state management and optimized rendering.",
    tech: ["React.js", "REST API", "Responsive UI", "State Management"],
    icon: <Cloud className="w-6 h-6" />,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: 7,
    title: "Groceries App",
    subtitle: "React SPA",
    description:
      "Single-page application consuming a live REST API for real-time grocery data. Features responsive UI with dynamic state management and optimized rendering.",
    tech: ["React.js", "REST API", "Responsive UI", "State Management"],
    icon: <Cloud className="w-6 h-6" />,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: 8,
    title: "Groceries App",
    subtitle: "React SPA",
    description:
      "Single-page application consuming a live REST API for real-time grocery data. Features responsive UI with dynamic state management and optimized rendering.",
    tech: ["React.js", "REST API", "Responsive UI", "State Management"],
    icon: <Cloud className="w-6 h-6" />,
    color: "from-blue-500/20 to-blue-600/5",
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const st = ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              card,
              { y: 80, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                delay: i * 0.15,
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

  const addToCards = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-black py-24 md:py-32 lg:py-40"
      style={{ zIndex: 50 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-amber" />
              <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase">
                Portfolio
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Selected Works
            </h2>
          </div>
          <p className="text-gray-500 text-sm mt-4 md:mt-0 max-w-sm">
            A curated collection of projects showcasing full-stack capabilities
            from backend APIs to polished front-end interfaces.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="relative -mx-6 md:-mx-12">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                ref={addToCards}
                className="snap-start min-w-[280px] md:min-w-[320px] lg:min-w-[360px] group relative"
              >
                <div className="relative h-full bg-dark-card/50 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-amber/20 transition-all duration-500 overflow-hidden">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon + Title */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-xl bg-white/5 text-amber">
                        {project.icon}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-5 h-5 text-gray-400 hover:text-amber transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-amber text-sm font-medium mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={scrollLeft}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}