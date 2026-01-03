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
  const pathRef = useRef<SVGPathElement | null>(null);

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

  // Get Y coordinate of path at a given t (0 to 1)
  const getYOnPath = (t: number) => {
    if (!pathRef.current) return 0;
    const length = pathRef.current.getTotalLength();
    const point = pathRef.current.getPointAtLength(length * t);
    return point.y;
  };

  return (
    <section className="py-28 bg-secondary overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-24">Why Choose Us</h2>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= DESKTOP TIMELINE (WAVY) ================= */}
        <svg
          className="hidden md:block absolute w-full h-48"
          style={{ top: 0, left: 0 }}
          viewBox="0 0 1200 200"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background path */}
          <path
            ref={pathRef}
            id="timelinePath"
            d="M0 100 C 200 20, 400 180, 600 100 C 800 20, 1000 180, 1200 100"
            stroke="#d1d5db"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Active path */}
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

        {/* ================= STEPS ================= */}
        <div className="grid md:grid-cols-3 gap-28 relative">
          {steps.map((step, i) => {
            const t = i / (steps.length - 1); // position along path
            const yPos = getYOnPath(t);

            return (
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

                {/* DOT ON PATH */}
                <div
                  className="absolute z-10"
                  style={{
                    left: `${t * 100}%`,
                    top: yPos,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className={`mt-32 md:mt-12 transition-all duration-700 ${
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsTimeline;
