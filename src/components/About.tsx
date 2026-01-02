import { Infinity, Zap, Shield, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const About = () => {

  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "We complete projects quickly without compromising on quality.",
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Every project is crafted with careful attention to detail.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "We guide you every step of the way, from start to finish.",
    },
  ];
  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-secondary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Static Title */}
          <div>
            <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 flex items-center gap-2">
              Your Digital Partner
              <Infinity className="w-7 h-7 md:w-10 md:h-10" />
            </h2>

            {/* Animated Paragraphs */}
          </div>

          {/* Animated Feature Cards (no borders) */}
          <div className="grid gap-4 md:gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`bg-background p-4 md:p-6 hover-lift transition-all duration-1000 ease-out ${
                  animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
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

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-16 pt-8 md:pt-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 transition-all duration-1000 ease-out ${
                  animated ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {counts[idx]}
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
