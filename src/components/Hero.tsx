import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import brand1 from "@/assets/portfolio/brand1.webp";
import brand2 from "@/assets/portfolio/brand2.webp";
import brand3 from "@/assets/portfolio/brand3.webp";
import brand4 from "@/assets/portfolio/brand4.webp";
import brand5 from "@/assets/portfolio/brand5.webp";
import brand6 from "@/assets/portfolio/brand6.webp";
import brand7 from "@/assets/portfolio/brand7.webp";

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [carouselLogos, setCarouselLogos] = useState<string[]>([]);

  const stats = [
    { number: 35, suffix: "+", label: "Projects Completed" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
    { number: 2, suffix: "+", label: "Years Experience" },
  ];

  const logos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

  // Animate counters with fade-up
  useEffect(() => {
    let animated = false;

    const animateCounters = () => {
      statsRefs.current.forEach((el, index) => {
        if (!el) return;
        const end = stats[index].number;
        const duration = 1500;
        let start = 0;

        el.style.opacity = "0";

        const step = () => {
          start += Math.ceil(end / (duration / 16));
          if (start >= end) start = end;
          el.innerText = `${start}${stats[index].suffix}`;

          el.style.opacity = "1";
          el.style.transition = "opacity 0.5s ease-out";

          if (start < end) requestAnimationFrame(step);
        };
        step();
      });
    };

    const handleScroll = () => {
      if (!sectionRef.current || animated) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 10) {
        animated = true;
        animateCounters();
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stats]);

  // Prepare logos for seamless infinite carousel
  useEffect(() => {
    const containerWidth = window.innerWidth; // full screen width
    const logoWidth = 80; // approximate width in px of one logo (adjust if needed)
    const gap = 32; // gap between logos (px)
    const totalWidth = logos.length * (logoWidth + gap);
    const repeatCount = Math.ceil((containerWidth * 2) / totalWidth); // enough to cover twice screen

    const repeated = [];
    for (let i = 0; i < repeatCount; i++) {
      repeated.push(...logos);
    }
    setCarouselLogos(repeated);
  }, [logos]);

  return (
    <section
      ref={sectionRef}
      className="
        min-h-[75vh] sm:min-h-[85vh] md:min-h-screen
        flex flex-col justify-center items-center
        relative px-4 md:px-6 lg:px-24
        py-16 md:py-32 pt-24 md:pt-32
      "
    >
      {/* Whole section fade-up */}
      <div className="w-full flex flex-col items-center animate-fade-up-section opacity-0">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
            We Design & Build
            <br />
            <span className="text-muted-foreground">Your Vision</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            A premium development studio focused on performance, clarity, and
            conversion — turning ideas into powerful online experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
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
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 md:gap-8 px-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div
                  ref={(el) => (statsRefs.current[idx] = el)}
                  className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2 opacity-0"
                  style={{ transition: "opacity 0.5s ease-out" }}
                >
                  0{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logos carousel */}
        <div className="mt-6 w-full overflow-hidden relative">
          <div className="flex gap-8 w-max animate-slide-loop">
            {carouselLogos.map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Brand ${idx + 1}`}
                className="h-8 md:h-10 object-contain flex-shrink-0 animate-fade-up-logos"
                style={{ animationDelay: `${idx * 0.05}s` }}
              />
            ))}
          </div>
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

      <style jsx>{`
        @keyframes slide-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fade-up-logos {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up-section {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-loop {
          display: inline-flex;
          width: max-content;
          animation: slide-loop 20s linear infinite;
        }
        .animate-fade-up-logos {
          opacity: 0;
          animation: fade-up-logos 0.8s ease-out forwards;
        }
        .animate-fade-up-section {
          opacity: 0;
          animation: fade-up-section 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
