import { Infinity, Zap, Shield, Users } from "lucide-react";
import { useEffect } from "react";

const About = () => {
  /* Trigger same animation behavior as Hero */
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-fade-up");
    elements.forEach((el) => el.classList.add("animation-start"));
  }, []);

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

  return (
    <>
      {/* SAME animation system used in Hero */}
      <style>{`
        .animate-fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s ease forwards;
        }

        .stagger-1 { animation-delay: 0.15s; }
        .stagger-2 { animation-delay: 0.3s; }
        .stagger-3 { animation-delay: 0.45s; }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section
        id="about"
        className="section-padding bg-secondary px-4 md:px-6 lg:px-24 py-20 md:py-32"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* TEXT (Hero-style animation) */}
            <div>
              <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider animate-fade-up">
                About Us
              </span>

              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 animate-fade-up stagger-1">
                Your Shopify
                <br />
                <span className="flex items-center gap-2">
                  Partner <Infinity className="inline w-7 h-7 md:w-10 md:h-10" />
                </span>
              </h2>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-8 animate-fade-up stagger-2">
                VisionLoop is a specialized Shopify development agency dedicated to
                helping businesses launch and scale their online stores.
              </p>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed animate-fade-up stagger-3">
                From startups to established brands, we've helped businesses across
                various industries grow in the digital marketplace.
              </p>
            </div>

            {/* FEATURES (same animation) */}
            <div className="grid gap-4 md:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-background p-4 md:p-6 border border-border hover-lift animate-fade-up stagger-${index + 1}`}
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

          {/* STATS (no animation change here) */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 pt-12 md:pt-20 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">
                  {stat.number}
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
