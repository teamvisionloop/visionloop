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
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Number animation
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (!animated && rect.top < window.innerHeight - 100) {
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

  // Auto-scroll carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const total = features.length;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % total;
      const cardWidth = carousel.firstChild ? (carousel.firstChild as HTMLElement).offsetWidth : 0;
      carousel.scrollTo({ left: cardWidth * nextIndex, behavior: "smooth" });
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, features.length]);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel || !carousel.firstChild) return;
    const scrollLeft = carousel.scrollLeft;
    const cardWidth = (carousel.firstChild as HTMLElement).offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section id="about" className="section-padding bg-secondary overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Text Content */}
          <div>
            <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6">
              Your Shopify
              <br />
              <span className="flex items-center gap-2">
                Partner <Infinity className="inline w-7 h-7 md:w-10 md:h-10" />
              </span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-8">
              VisionLoop is a specialized Shopify development agency dedicated to 
              helping businesses launch and scale their online stores. We combine 
              technical expertise with creative design to build e-commerce experiences 
              that not only look stunning but also drive real results.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              From startups to established brands, we've helped businesses across 
              various industries establish their presence in the digital marketplace.
            </p>
          </div>

          {/* Mobile carousel */}
          <div className="relative w-full block lg:hidden">
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-0 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 px-0 no-scrollbar"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full bg-background p-6 border border-border snap-center"
                  style={{ scrollSnapAlign: "center" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <feature.icon className="w-6 h-6" />
                    <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Solid progress bar */}
            <div className="absolute bottom-2 left-0 right-0 h-1">
              <div
                className="h-1 bg-black transition-all duration-[3500ms] ease-linear"
                style={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Desktop stacked features */}
          <div className="hidden lg:grid gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-6 border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <feature.icon className="w-6 h-6" />
                  <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 pt-12 md:pt-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .no-scrollbar::-webkit-scrollbar-thumb {
          background-color: black;
          border-radius: 0;
        }
        .no-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </section>
  );
};

export default About;
