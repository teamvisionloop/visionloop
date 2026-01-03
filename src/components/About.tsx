import { Zap, Shield, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import loopImg from "../assets/loop.png"; // adjust path if needed

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

const DESKTOP_DOT_POSITIONS = ["16.5%", "50%", "83.5%"];

const WhyChooseUsTimeline = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            if (window.innerWidth >= 768) setSectionVisible(true);
          }

          if (stepRefs.current.includes(entry.target as HTMLDivElement)) {
            const index = Number(entry.target.dataset.step);
            if (entry.isIntersecting) {
              setActiveStep((prev) => Math.max(prev, index));
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    stepRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const isComplete = activeStep >= steps.length - 1;

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`bg-secondary overflow-hidden transition-all duration-1000
        py-10 md:py-16
        md:${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{ borderRadius: "30px" }}
    >
      {/* Title + Image */}
      <div className="flex items-center justify-center gap-3 md:gap-6 mb-8 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Why Choose Us</h2>
        <img
          src={loopImg}
          alt="Loop"
          className="w-10 h-10 md:w-16 md:h-16 object-contain"
        />
      </div>

      <div className="relative max-w-5xl md:max-w-6xl mx-auto px-4 md:px-6">

        {/* ================= DESKTOP WAVY TIMELINE ================= */}
        <svg
          className="hidden md:block absolute w-full h-40"
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
            strokeDashoffset={isComplete ? 0 : 1400 - activeStep * 460}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* ================= MOBILE WAVY TIMELINE ================= */}
        <svg
          className="md:hidden absolute h-full w-16"
          style={{ left: "-0.5rem", top: "10px" }}
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
            strokeDashoffset={isComplete ? 0 : 1600 - activeStep * 520}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* ================= DESKTOP DOTS ================= */}
        <div className="hidden md:block absolute top-[-16px] w-full h-0 z-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className="absolute opacity-100 scale-100"
              style={{
                left: DESKTOP_DOT_POSITIONS[i],
                transform: `translateX(-50%) ${i === 2 ? "translateY(32px)" : ""}`,
              }}
            >
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* ================= STEPS ================= */}
        <div className="grid md:grid-cols-3 gap-16 md:gap-20 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              data-step={i}
              className="relative flex items-start md:flex-col md:items-center"
            >
              {/* Large faded numbers behind steps removed z-index overlap */}
              <span className="absolute -top-20 md:-top-28 text-[100px] md:text-[140px] font-bold text-gray-300 opacity-30 -z-0">
                {step.number}
              </span>

              {/* Mobile dot */}
              <div className="md:hidden relative z-10">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div
                className={`ml-6 md:ml-0 mt-0 md:mt-16 transition-all duration-700 ${
                  activeStep >= i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 md:translate-y-8"
                }`}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <h3 className="text-lg md:text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-base md:text-lg max-w-sm">
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
