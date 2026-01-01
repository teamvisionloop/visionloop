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

  const carouselRef = useRef(null);

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

  // Auto scroll carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index >= features.length) index = 0; // loop back
      const cardWidth = carousel.firstChild.offsetWidth + 16; // gap included
      carousel.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
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

          {/* Features carousel */}
          <div
            ref={carouselRef}
            className="flex lg:grid gap-4 md:gap-6 overflow-hidden lg:overflow-visible"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-[300px] bg-background p-4 md:p-6 border border-border hover-lift mr-4"
              >
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{feature.title}</h3>
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
    </section>
  );
};

export default About;
