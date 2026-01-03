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

const WhyChooseUsTimeline = () => {
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

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= DESKTOP TIMELINE ================= */}
        <svg
          className="hidden md:block absolute w-full h-48"
          style={{ top: "96px", left: 0 }} // aligned under dots
          viewBox="0 0 1200 200"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background path */}
          <path
            d="M100 100
               C400 100, 800 100, 1100 100"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Active path */}
          <path
            d="M100 100
               C400 100, 800 100, 1100 100"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1400"
            strokeDashoffset={1400 - activeStep * 460}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* ================= MOBILE TIMELINE ================= */}
        <svg
          className="md:hidden absolute h-full w-20"
          style={{ left: "1rem", top: 0 }} // slightly left to match dots
          viewBox="0 0 200 1200"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background path */}
          <path
            d="M100 100
               C100 400, 100 800, 100 1200"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Active path */}
          <path
            d="M100 100
               C100 400, 100 800, 100 1200"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={1600 - activeStep * 520}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* ================= STEPS ================= */}
        <div className="grid md:grid-cols-3 gap-28 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              data-step={i}
              className="relative flex items-start md:flex-col md:items-center"
            >
              {/* Background number */}
              <span className="absolute -top-20 md:-top-28 text-[120px] md:text-[140px] font-bold text-gray-300 opacity-30 select-none">
                {step.number}
              </span>

              {/* DOT (CENTERED ON TIMELINE) */}
              <div
                className={`relative z-10
                  transition-all duration-700 ease-out
                  ${
                    activeStep >= i
                      ? "md:translate-y-0 md:opacity-100"
                      : "md:-translate-y-20 md:opacity-0"
                  }
                `}
              >
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`ml-8 md:ml-0 mt-0 md:mt-12 transition-all duration-700 ${
                  activeStep >= i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <step.icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg max-w-sm">
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

export default WhyChooseUsTimeline;
