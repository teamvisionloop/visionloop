import { Zap, Shield, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Fast Delivery",
    text: "We deliver your store quickly without compromising on quality.",
    icon: Zap,
  },
  {
    title: "Premium Quality",
    text: "Every store is crafted with attention to detail and performance.",
    icon: Shield,
  },
  {
    title: "Dedicated Support",
    text: "We support you from launch and beyond with continuous updates.",
    icon: Users,
  },
];

const WhyChooseUsTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const items = document.querySelectorAll(".timeline-step");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.getAttribute("data-step")));
          }
        });
      },
      { threshold: 0.6 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-secondary overflow-hidden"
    >
      <h2 className="text-4xl font-bold text-center mb-20">
        Why Choose Us
      </h2>

      {/* SVG Timeline */}
      <svg
        className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[500px]"
        viewBox="0 0 500 1200"
        fill="none"
      >
        <path
          d="M250 50
             C 100 200, 100 400, 250 550
             C 400 700, 400 900, 250 1050"
          stroke="#111"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1600"
          strokeDashoffset={1600 - activeStep * 550}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Steps */}
      <div className="relative max-w-6xl mx-auto space-y-48">
        {steps.map((step, i) => (
          <div
            key={i}
            data-step={i}
            className="timeline-step grid grid-cols-2 items-center gap-12"
          >
            {/* Text */}
            <div
              className={`transition-all duration-700 ${
                activeStep >= i
                  ? "opacity-100 translate-y-0"
                  : "opacity-30 translate-y-8"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-lg">{step.text}</p>
            </div>

            {/* Dot */}
            <div className="relative flex justify-center">
              <div
                className={`w-6 h-6 rounded-full bg-black transition-transform duration-500 ${
                  activeStep === i ? "scale-150" : "scale-100"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsTimeline;
