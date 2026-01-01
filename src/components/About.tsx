import { Infinity, Zap, Shield, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const animatedRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ---------------- DATA ---------------- */
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

  /* ---------------- STATS STATE ---------------- */
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [statsAnimated, setStatsAnimated] = useState(false);

  /* ---------------- SCROLL ANIMATIONS ---------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---------------- COUNTER ANIMATION ---------------- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);

          stats.forEach((stat, index) => {
            const startTime = performance.now();
            const duration = 1500;

            const animate = (time: number) => {
              const progress = Math.min((time - startTime) / duration, 1);
              const value = Math.floor(progress * stat.number);

              setCounts((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
              });

              if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [statsAnimated, stats]);

  return (
    <>
      {/* INLINE CSS – NO EXTERNAL FILE */}
      <style>{`
        .scroll-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .scroll-fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className="section-padding bg-secondary overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* TEXT */}
            <div
              ref={(el) => (animatedRefs.current[0] = el)}
              className="scroll-fade-up"
            >
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
                helping businesses launch and scale their online stores.
              </p>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                From startups to established brands, we've helped businesses grow online.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid gap-4 md:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => (animatedRefs.current[index + 1] = el)}
                  className="bg-background p-4 md:p-6 border border-border hover-lift scroll-fade-up"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 pt-12 md:pt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">
                  {counts[index]}
                  {stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
