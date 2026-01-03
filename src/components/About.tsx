import { Zap, Shield, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "1",
    title: "Fast Delivery",
    text: "We deliver your store quickly without compromising on quality.",
    icon: Zap,
  },
  {
    number: "2",
    title: "Premium Quality",
    text: "Every store is crafted with attention to detail and performance.",
    icon: Shield,
  },
  {
    number: "3",
    title: "Dedicated Support",
    text: "We support you from launch and beyond with continuous updates.",
    icon: Users,
  },
];

const WhyChooseUsWavy = () => {
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
      <h2 className="text-4xl font-bold text-center mb-28">
        Why Choose Us
      </h2>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Wavy SVG Line */}
        <svg
          className="absolute top-10 left-0 w-full h-40"
          viewBox="0 0 1200 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100
               C 200 20, 400 180, 600 100
               C 800 20, 1000 180, 1200 100"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M0 100
               C 200 20, 400 180, 600 100
               C 800 20, 1000 180, 1200 100"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1400"
            strokeDashoffset={1400 - activeStep * 460}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-24 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              data-step={i}
              className="relative flex flex-col items-center text-center"
            >
              {/* Large background number */}
              <span className="absolute -top-24 text-[140px] font-bold text-gray-300 opacity-30 select-none">
                {step.number}
              </span>

              {/* Dot */}
              <div className="relative z-10">
                <div
                  className={`w-6 h-6 rounded-full bg-black flex items-center justify-center transition-transform duration-500 ${
                    activeStep >= i ? "scale-150" : "scale-100"
                  }`}
                >
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>

              {/* Content */}
              <div
                className={`mt-10 transition-all duration-700 ${
                  activeStep >= i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Icon + title inline */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <step.icon className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-semibold">
                    {step.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-lg max-w-sm mx-auto">
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

export default WhyChooseUsWavy;
