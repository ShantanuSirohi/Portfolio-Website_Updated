import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import CustomCursor from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll progress bar
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute("href");
        if (id) {
          const element = document.querySelector(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="relative bg-[#0F0F0F] min-h-screen">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/5 z-[100]">
        <div
          ref={progressRef}
          className="h-full bg-amber transition-[width] duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
