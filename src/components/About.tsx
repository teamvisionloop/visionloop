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

// Desktop X positions aligned to SVG wave
const DESKTOP_DOT_POSITIONS = ["16.5%", "50%", "83.5%"];

const WhyChooseUsTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const hasPlayed = sessionStorage.getItem("timelinePlayed");

    // Mobile: lock animation after first play
    if (isMobile && hasPlayed) {
      setActiveStep(steps.length - 1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.step);
          setActiveStep(index);

          if (isMobile && index === steps.length - 1) {
            sessionStorage.setItem("timelinePlayed", "true");
          }
        });
      },
      { threshold: 0.6 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // When last step reached → timeline fully black
  const isComplete = activeStep >= steps.length - 1;

  return (
    <section id="about" className="py-28 bg-secondary overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-24">
        Why Choose Us
      </h2>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= DESKTOP WAVY TIMELINE ================= */}
        <svg
          className="hidden md:block absolute w-full h-48"
          style={{ top: "-78px", left: 0 }}
          viewBox="0 0 1200 200"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background */}
          <path
            d="M0 100
               C 200 20, 400 180, 600 100
               C 800 20, 1000 180, 1200 100"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Animated / Final Black Path */}
          <path
            d="M0 100
               C 200 20, 400 180, 600 100
               C 800 20, 1000 180, 1200 100"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1400"
            strokeDashoffset={isComplete ? 0 : 1400 - activeStep * 460}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* ================= MOBILE WAVY TIMELINE ================= */}
        <svg
          className="md:hidden absolute h-full w-20"
          style={{ left: "-0.5rem", top: "20px" }}
          viewBox="0 0 200 1200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M100 0
               C 20 200, 180 400, 100 600
               C 20 800, 180 1000, 100 1200"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M100 0
               C 20 200, 180 400, 100 600
               C 20 800, 180 1000, 100 1200"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={1600 - activeStep * 520}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* ================= DESKTOP DOTS (SVG-ALIGNED) ================= */}
        <div className="hidden md:block absolute top-[-16px] w-full h-0">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`absolute transition-all duration-700 ${
                activeStep >= i
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
              style={{
                left: DESKTOP_DOT_POSITIONS[i],
                transform: `translateX(-50%) ${
                  i === 2 ? "translateY(32px)" : ""
                }`,
              }}
            >
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* ================= STEPS CONTENT ================= */}
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

              {/* MOBILE DOT */}
              <div className="md:hidden relative z-10">
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`ml-8 md:ml-0 mt-0 md:mt-16 transition-all duration-700 ${
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
