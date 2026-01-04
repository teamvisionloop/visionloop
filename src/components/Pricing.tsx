import { Check } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* ------------------ Types ------------------ */
interface Plan {
  tag: string;
  duration: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

/* ------------------ Data ------------------ */
const plans: Plan[] = [
  {
    tag: "Low-budget",
    duration: "4–7 Days",
    title: "$500",
    price: "/Project",
    description: "Have design ready to build? Or small budget?",
    features: [
      "Wireframe-ready project required",
      "UI design using Figma or Framer",
      "Online/remote collaboration",
      "4–7 day turnaround",
      "Weekday delivery only",
    ],
  },
  {
    tag: "Standard Plan",
    duration: "15 Days",
    title: "$5,000",
    price: "/Project",
    description: "For growing brands ready to scale",
    popular: true,
    features: [
      "Wireframe assistance optional",
      "Design in Figma or Framer",
      "Flexible remote delivery",
      "Detailed iteration & review flow",
      "Weekday-only execution",
    ],
  },
  {
    tag: "For Advanced Project",
    duration: "3–6 Month",
    title: "Contact",
    price: "",
    description: "For enterprises and complex design systems",
    features: [
      "Consultation-based scoping",
      "Custom UX/UI, design system creation",
      "Deep collaboration with your team",
      "Phased delivery model",
      "Full-stack design integration",
    ],
  },
];

const CARD_HEIGHT = "520px";

/* ------------------ Component ------------------ */
const Pricing = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Mobile */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {plans.map((plan, i) => (
              <div key={i} className="flex-[0_0_90%]" style={{ height: CARD_HEIGHT }}>
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i} style={{ height: CARD_HEIGHT }}>
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------ Card ------------------ */
const PricingCard = ({ plan }: { plan: Plan }) => {
  return (
    <div
      className={`
        relative h-full flex flex-col rounded-3xl p-7
        bg-[#0e0e0e]
        text-white
        border border-white/10
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        ${plan.popular ? "bg-[#151515]" : ""}
      `}
    >
      {/* Top row */}
      <div className="flex items-center justify-between text-xs text-white/60">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          {plan.tag}
        </span>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
          {plan.duration}
        </span>
      </div>

      {/* Price */}
      <div className="mt-8">
        <h3 className="text-5xl font-bold leading-none">
          {plan.title}
        </h3>
        {plan.price && (
          <span className="text-sm text-white/50">{plan.price}</span>
        )}
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-white/60">
        {plan.description}
      </p>

      {/* Button */}
      <button
        className={`
          mt-6 w-full py-3 rounded-full text-sm font-medium transition
          ${
            plan.popular
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/10 hover:bg-white/20"
          }
        `}
      >
        Choose Plan
      </button>

      {/* Divider */}
      <div className="my-6 h-px bg-white/10" />

      {/* Features */}
      <ul className="space-y-3 text-sm text-white/70">
        {plan.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <Check size={16} className="mt-0.5 text-white/50" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pricing;
