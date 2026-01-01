import { Infinity, Zap, Shield, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const About = () => {
  const stats = [
    { number: 35, suffix: "+", label: "Projects Delivered" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
    { number: 2, suffix: "+", label: "Years Experience" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "We deliver your store quickly without compromising on quality.",
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Every store we build is crafted with attention to detail.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "We're with you every step of the way, from launch and beyond.",
    },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animate numbers and text when section scrolls into view
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || animated) return;

      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setAnimated(true);

        // Animate numbers
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-secondary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-700 ${
              animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 flex items-center gap-2">
              Your Partner
              <Infinity className="w-7 h-7 md:w-10 md:h-10" />
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-8 break-words">
              VisionLoop is a specialized Shopify development agency dedicated to<br />
              helping businesses launch and scale their online stores. We combine<br />
              technical expertise with creative design to build e-commerce experiences<br />
              that not only look stunning but also drive real results.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed break-words">
              From startups to established brands, we've helped businesses across<br />
              various industries establish their presence in the digital marketplace.
            </p>
          </div>

          {/* Features */}
          <div className={`grid gap-4 md:gap-6 transition-all duration-700 ${
            animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-4 md:p-6 border border-border hover-lift"
              >
                <div className="flex items-center gap-2 mb-2">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8" />
                  <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-16 pt-8 md:pt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 transition-all duration-700 ${
                  animated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
