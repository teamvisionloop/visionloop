import { Check } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* ------------------ Types ------------------ */
type PlanType = "ecommerce" | "self-hosted";

interface Plan {
  type: PlanType;
  tag: string;
  duration: string;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
}

/* ------------------ Data ------------------ */
const plans: Plan[] = [
  {
    type: "ecommerce",
    tag: "Low-budget",
    duration: "1–4 Days",
    title: "2,500 EGP",
    description: "Have design ready to build? Or small budget?",
    features: [
      "12 products",
      "3 pages",
      "Premium theme",
      "Video tutorials",
      "No free revisions",
    ],
  },
  {
    type: "ecommerce",
    tag: "Standard Plan",
    duration: "4–10 Days",
    title: "4,500 EGP",
    popular: true,
    description: "For growing brands ready to scale",
    features: [
      "35 products",
      "5 page website",
      "Premium theme",
      "Video tutorials",
      "1 custom coded section",
      "3 free revisions",
    ],
  },
  {
    type: "ecommerce",
    tag: "Enterprise",
    duration: "5–12 Days",
    title: "9,999 EGP",
    description: "Advanced ecommerce setup",
    features: [
      "40 products",
      "5 page website",
      "Premium theme",
      "5 free revisions",
      "Flow automations",
      "Basic SEO setup",
      "Video tutorials",
      "2 custom coded sections",
    ],
  },
  {
    type: "ecommerce",
    tag: "Contact",
    duration: "15–30 Days",
    title: "Contact Us",
    popular: true,
    description: "For large or custom e-commerce projects",
    features: [
      "Unlimited products",
      "Unlimited pages",
      "Fully customized premium theme",
      "Unlimited revisions during build",
      "Advanced flow automations",
      "Complete on-page SEO setup",
      "Video tutorials & handover",
      "Custom integrations",
      "Performance optimization",
    ],
  },

  /* -------- SELF HOSTED -------- */
  {
    type: "self-hosted",
    tag: "Portfolio Website",
    duration: "5–9 Days",
    title: "3,500 EGP",
    description: "Professional self-hosted website",
    features: [
      "3 pages",
      "Custom layout",
      "Responsive design",
      "Custom domain connection",
      "Cloudflare hosting",
    ],
  },
  {
    type: "self-hosted",
    tag: "Contact",
    duration: "10–25 Days",
    title: "Contact Us",
    description: "Custom self-hosted website build",
    features: [
      "Unlimited pages",
      "Fully custom UX/UI",
      "Responsive across all devices",
      "Unlimited revisions during build",
      "Deployment & handover",
      "Custom domain connection",
      "Cloudflare hosting",
    ],
  },
];

/* ------------------ Component ------------------ */
const Pricing = () => {
  const [activeType, setActiveType] = useState<PlanType>("ecommerce");

  const filteredPlans = plans.filter((p) => p.type === activeType);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [activeType, emblaApi]);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* ---------- HEADING ---------- */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-black">Pricing</h2>
          <p className="mt-3 text-gray-500 text-sm">
            Featured Website Plans
          </p>
        </div>

        {/* ---------- FILTER BUTTONS ---------- */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-black/5 p-1 rounded-full">
            <button
              onClick={() => setActiveType("ecommerce")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition
                ${
                  activeType === "ecommerce"
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black"
                }`}
            >
              E-commerce Websites
            </button>

            <button
              onClick={() => setActiveType("self-hosted")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition
                ${
                  activeType === "self-hosted"
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black"
                }`}
            >
              Self-Hosted Websites
            </button>
          </div>
        </div>

        {/* ---------- MOBILE CAROUSEL ---------- */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {filteredPlans.map((plan, i) => (
              <div key={i} className="flex-[0_0_90%]">
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>

        {/* ---------- DESKTOP GRID ---------- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan, i) => (
            <PricingCard key={i} plan={plan} />
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
        relative flex flex-col rounded-3xl p-7
        bg-[#0e0e0e]
        text-white
        border border-white/10
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        h-full
      `}
    >
      {/* Top */}
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
      <h3 className="mt-8 text-5xl font-bold leading-none">
        {plan.title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm text-white/60">
        {plan.description}
      </p>

      {/* Button */}
      <button
        className={`
          mt-6 w-full py-3 rounded-full text-sm font-medium transition
          ${
            plan.tag === "Contact"
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/10 hover:bg-white/20"
          }
        `}
      >
        {plan.tag === "Contact" ? "Request Quote" : "Choose Plan"}
      </button>

      {/* Divider */}
      <div className="my-6 h-px bg-white/10" />

      {/* Features (auto height, no overflow issues) */}
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
