import { ArrowDown, Infinity } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const stats = [
    { number: 35, suffix: "+", label: "Projects Completed" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
    { number: 2, suffix: "+", label: "Years Experience" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  // Animate counts immediately on page load
  useEffect(() => {
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCounts(
        stats.map((stat) => Math.floor(progress * stat.number))
      );
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [stats]);

  return (
    <section
      className="
        min-h-[75vh] sm:min-h-[85vh] md:min-h-screen
        flex flex-col justify-center items-center
        relative px-4 md:px-6 lg:px-24
        py-16 md:py-32 pt-24 md:pt-32
      "
    >
      <div className="text-center max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 flex items-center justify-center gap-2">
          We Design & Build
          <Infinity className="w-7 h-7 md:w-10 md:h-10" />
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12">
          A premium development studio focused on performance, clarity, and
          conversion — turning ideas into powerful online experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 mb-8">
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

        {/* Stats (smaller font) */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-16 pt-8 md:pt-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">
                {counts[idx]}
                {stat.suffix}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
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
  );
};

export default Hero;
