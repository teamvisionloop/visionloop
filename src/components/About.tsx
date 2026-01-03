import { Zap, Shield, Users } from "lucide-react";
import myLoopImage from "@/assets/loop.png";
import { useEffect, useRef } from "react";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description:
        "We deliver your store quickly without compromising on quality. Our workflow ensures your project is completed on time so you can start selling faster.",
    },
        {
      icon: Users,
      title: "Dedicated Support",
      description:
        "We're with you every step of the way, from launch and beyond. Our support team is always ready to help you with updates and questions.",
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description:
        "Every store we build is crafted with attention to detail. From design to functionality, we focus on high-quality e-commerce experiences.",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  // Strong fade-up animation (whole section)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section py-12 md:py-16 bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center mb-6 md:mb-10 gap-3">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <img
            src={myLoopImage}
            alt="Loop Sign"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>

        {/* Features */}
        <div className="flex gap-5 overflow-x-auto md:overflow-x-visible px-4 justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-background p-6 md:p-7"
              style={{ width: "300px", height: "300px" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <feature.icon className="w-8 h-8 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-lg mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Strong Fade-Up Animation */}
      <style jsx>{`
        .about-section {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default About;
