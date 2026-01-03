import { Zap, Shield, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  { number: "1", title: "Fast Delivery", text: "We deliver your store quickly without compromising on quality.", icon: Zap },
  { number: "2", title: "Premium Quality", text: "Every store is crafted with attention to detail and performance.", icon: Shield },
  { number: "3", title: "Dedicated Support", text: "We support you from launch and beyond with continuous updates.", icon: Users },
];

const WhyChooseUsTimeline = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.step);
          if (entry.isIntersecting && activeStep < index) {
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.4 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [activeStep]);

  const allActive = activeStep === steps.length - 1;

  // Wavy path points for exact dot alignment on desktop
  const getDesktopWave = () => {
    // 3 steps at 0%, 50%, 100%
    return "M0 100 C 200 20, 400 180, 600 100 C 800 20, 1000 180, 1200 100";
  };

  // Vertical path length for mobile
  const getMobileStrokeOffset = (i: number) => 1600 - i * (1600 / (steps.length - 1));

  return (
    <section ref={containerRef} className="py-28 bg-secondary overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-24">Why Choose Us</h2>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ================= MOBILE ================= */}
        <div className="md:hidden relative flex flex-col items-start">
          <svg className="absolute left-6 top-0 h-full w-20" viewBox="0 0 200 1200" fill="none" preserveAspectRatio="none">
            <path d="M100 0 C 100 300, 100 600, 100 900" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" />
            <path
              d="M100 0 C 100 300, 100 600, 100 900"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={1600}
              strokeDashoffset={activeStep >= 0 ? getMobileStrokeOffset(activeStep) : 1600}
              className="transition-all duration-700 ease-out"
            />
          </svg>

          <div className="relative z-10 flex flex-col gap-24 ml-20">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
                data-step={i}
                className="relative flex items-start"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-12 flex items-center justify-center transition-all duration-700 ease-out ${
                    activeStep >= i ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`transition-all duration-700 ${
                    activeStep >= i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg max-w-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:grid grid-cols-3 gap-28 items-center h-40 relative">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
            <path d={getDesktopWave()} stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" />
            <path
              d={getDesktopWave()}
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={1400}
              strokeDashoffset={activeStep >= 0 ? 1400 - activeStep * (1400 / (steps.length - 1)) : 1400}
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {steps.map((_, i) => (
            <div
              key={i}
              className={`relative z-10 flex justify-center transition-all duration-700 ease-out ${
                activeStep >= i ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid md:grid-cols-3 gap-28 mt-16 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              data-step={i}
              className="relative flex items-start md:flex-col md:items-center"
            >
              <div
                className={`transition-all duration-700 ${
                  activeStep >= i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <step.icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg max-w-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsTimeline;
