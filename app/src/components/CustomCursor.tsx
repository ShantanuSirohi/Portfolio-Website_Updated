import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, .cursor-pointer"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out ${
          isHovering ? "w-10 h-10 -ml-5 -mt-5" : "w-0 h-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-full h-full rounded-full border-2 border-white transition-all duration-300 ${
            isHovering ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
      </div>

      {/* Dot cursor */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isHovering ? "w-0 h-0 opacity-0" : "w-2 h-2 -ml-1 -mt-1 opacity-100"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="w-full h-full rounded-full bg-amber" />
      </div>
    </>
  );
}
