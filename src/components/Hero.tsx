import { ArrowDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import brand1 from "@/assets/portfolio/brand1.webp";
import brand2 from "@/assets/portfolio/brand2.webp";
import brand3 from "@/assets/portfolio/brand3.webp";
import brand4 from "@/assets/portfolio/brand4.webp";

const Hero = () => {
  const stats = [
    { number: 35, suffix: "+", label: "Projects Completed" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
    { number: 2, suffix: "+", label: "Years Experience" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || animated) return;

      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setAnimated(true);

        stats.forEach((stat, index) => {
          let start = 0;
          const end = stat.number;
          const duration = 1500;
          const stepTime = 16;
          const increment = end / (duration / stepTime);

          const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(interval);
            }
            setCounts((prev) => {
              const updated = [...prev];
              updated[index] = Math.floor(start);
              return updated;
            });
          }, stepTime);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animated, stats]);

  const logos = [brand1, brand2, brand3, brand4];

  return (
    <>
      <section
        ref={sectionRef}
        className="
          min-h-[75vh] sm:min-h-[85vh] md:min-h-screen
          flex flex-col justify-center items-center
          relative px-4 md:px-6 lg:px-24
          py-16 md:py-32 pt-24 md:pt-32
        "
      >
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 animate-fade-up opacity-0 stagger-1">
            We Design & Build
            <br />
            <span className="text-muted-foreground">Your Vision</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-up opacity-0 stagger-2 px-4">
            A premium development studio focused on performance, clarity, and
            conversion — turning ideas into powerful online experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-up opacity-0 stagger-3 px-4">
            <a
              href="#portfolio"
              className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 text-sm font-medium hover:bg-primary/90 hover:scale-105 transition-all"
            >
              View Projects
            </a>
            <a
              href="#pricing"
              className="border border-primary text-foreground px-6 md:px-8 py-3 md:py-4 text-sm font-medium hover:bg-secondary hover:scale-105 transition-all"
            >
              Pricing Plans
            </a>
          </div>

          {/* Stats */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-6 md:gap-12 animate-fade-up opacity-0 stagger-4 px-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                {/* Smaller font size */}
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
                  {counts[idx]}
                  {stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll down arrow */}
        <a
          href="#about"
          className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="md:w-6 md:h-6 text-muted-foreground" />
        </a>
      </section>

      {/* Logos section */}
      <section className="relative overflow-hidden py-16 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Partners</h2>
        <div className="flex gap-12 whitespace-nowrap animate-slide-diagonal">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Brand ${idx + 1}`}
              className="h-16 md:h-24 object-contain"
            />
          ))}
          {/* Duplicate logos for smooth looping */}
          {logos.map((logo, idx) => (
            <img
              key={`dup-${idx}`}
              src={logo}
              alt={`Brand duplicate ${idx + 1}`}
              className="h-16 md:h-24 object-contain"
            />
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes slide-diagonal {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-50%) translateY(-20%); }
        }
        .animate-slide-diagonal {
          display: inline-flex;
          animation: slide-diagonal 20s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Hero;
