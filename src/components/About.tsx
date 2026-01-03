import { Infinity, Zap, Shield, Users } from "lucide-react";
import { useEffect, useRef } from "react";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description:
        "We deliver your store quickly without compromising on quality. Our workflow ensures your project is completed on time so you can start selling faster and meet your business goals.",
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description:
        "Every store we build is crafted with attention to detail. From design to functionality, we focus on creating high-quality e-commerce experiences that delight customers and drive conversions.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "We're with you every step of the way, from launch and beyond. Our support team is always ready to help you with updates, optimizations, and any questions you may have.",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  // Fade-up animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const children = Array.from(containerRef.current.children) as HTMLDivElement[];
      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          child.classList.add("fade-up");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="py-12 md:py-16 bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center mb-6 md:mb-10 gap-3">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <Infinity className="w-7 h-7 md:w-8 md:h-8 text-primary" />
        </div>

        {/* Features */}
        <div
          ref={containerRef}
          className="flex flex-wrap gap-4 justify-center px-4"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-4 md:p-5 flex flex-col opacity-0"
              style={{ display: "inline-flex", maxWidth: "100%" }}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-2 mb-2">
                <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                <h3 className="text-base md:text-lg font-semibold">{feature.title}</h3>
              </div>
              {/* Description */}
              <p className="text-muted-foreground text-base md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fade-up animation styles */}
      <style jsx>{`
        .fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: all 0.8s ease-out;
        }
        div[style*='opacity:0'] {
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>
    </section>
  );
};

export default About;
