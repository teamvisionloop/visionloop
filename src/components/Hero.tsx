import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const stats = [
    { number: 35, suffix: "+", label: "Projects Completed" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
    { number: 2, suffix: "+", label: "Years Experience" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.number;
      const duration = 1500; // total animation time
      const stepTime = 16; // ~60fps
      const steps = Math.ceil(duration / stepTime);
      const increment = end / steps;

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        // Update only this index
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(start);
          return newCounts;
        });
      }, stepTime);
    });
  }, [stats]);

  return (
    <section className="min-h-[75vh] sm:min-h-[85vh] md:min-h-screen flex flex-col justify-center items-center relative px-4 md:px-6 lg:px-24 py-16 md:py-32 pt-24 md:pt-32">
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
          <a href="#portfolio" className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 text-sm font-medium hover:bg-primary/90 hover:scale-105 transition-all">
            View Projects
          </a>
          <a href="#pricing" className="border border-primary text-foreground px-6 md:px-8 py-3 md:py-4 text-sm font-medium hover:bg-secondary hover:scale-105 transition-all">
            Pricing Plans
          </a>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-6 md:gap-12 px-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">
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

      <a href="#about" className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce" aria-label="Scroll down">
        <ArrowDown size={20} className="md:w-6 md:h-6 text-muted-foreground" />
      </a>
    </section>
  );
};

export default Hero;
