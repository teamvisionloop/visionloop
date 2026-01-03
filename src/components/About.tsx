import { Zap, Shield, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "1",
    title: "Fast Delivery",
    text: "We deliver your store quickly without compromising on quality.",
    icon: Zap,
  },
  {
    label: "2",
    title: "Premium Quality",
    text: "Every store is crafted with attention to detail and performance.",
    icon: Shield,
  },
  {
    label: "3",
    title: "Dedicated Support",
    text: "We support you from launch and beyond with continuous updates.",
    icon: Users,
  },
];

const WhyChooseUsHorizontal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.dataset.step));
          }
        });
      },
      { threshold: 0.6 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-28 bg-secondary overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-24">
        Why Choose Us
      </h2>

      {/* Timeline */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Horizontal line */}
        <div className="absolute top-10 left-0 w-full h-[3px] bg-muted" />
        <div
          className="absolute top-10 left-0 h-[3px] bg-black transition-all duration-700 ease-out"
          style={{ width: `${(activeStep + 1) * 33.3}%` }}
        />

        {/* Steps */}
        <div className="grid grid-cols-3 gap-20 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              data-step={i}
              className="relative flex flex-col items-center text-center"
            >
              {/* Large background number */}
              <span className="absolute -top-20 text-[140px] font-bold text-gray-300 opacity-30 select-none">
                {step.label}
              </span>

              {/* Dot */}
              <div
                className={`w-6 h-6 rounded-full bg-black z-10 transition-transform duration-500 ${
                  activeStep >= i ? "scale-150" : "scale-100"
                }`}
              />

              {/* Content */}
              <div
                className={`mt-10 transition-all duration-700 ${
                  activeStep >= i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <step.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsHorizontal;
