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
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            setActiveStep(Number(entry.target.dataset.step));
            hasAnimatedRef.current = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.6 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-28 bg-secondary overflow-hidden"
    >
      <h2 className="text-4xl font-bold text-center mb-24">
        Why Choose Us
      </h2>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= DESKTOP TIMELINE ================= */}
        <svg
          className="hidden md:block absolute w-full h-48"
          style={{ top: "-78px", left: 0 }}
          viewBox="0 0 1200 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100 C 200 20, 400 180, 600 100 C 800 20, 1000 180, 1200 100"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M0 100 C 200 20, 400 180, 600 100 C 800 20, 1000 180, 1200 100"
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
          style={{ left: "-0.5rem", top: "20px" }}
          viewBox="0 0 200 1200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M100 0 C 20 200, 180 400, 100 600 C 20 800, 180 1000, 100 1200"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M100 0 C 20 200, 180 400, 100 600 C 20 800, 180 1000, 100 1200"
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

              {/* BIGGER DOT */}
              <div
                className={`relative z-10 transition-all duration-700 ease-out
                  ${
                    activeStep >= i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }
                `}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center">
                  <div className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 bg-white rounded-full" />
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`ml-8 md:ml-0 mt-0 md:mt-12 transition-all duration-700
                  ${
                    activeStep >= i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-3">
                  <step.icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">
                    {step.title}
                  </h3>
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
