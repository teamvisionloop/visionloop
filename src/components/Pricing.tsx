import { Check } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Plan {
  name: string;
  price: string;
  currency: string;
  features: string[];
  popular: boolean;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "2,500",
    currency: "EGP",
    features: ["12 products", "4 pages", "Premium theme", "No free revisions"],
    popular: false,
  },
  {
    name: "Starter",
    price: "4,500",
    currency: "EGP",
    features: ["25 products", "5 page website", "Premium theme", "2 free revisions"],
    popular: false,
  },
  {
    name: "Pro",
    price: "6,500",
    currency: "EGP",
    features: ["35 products", "5 page website", "Premium theme", "3 free revisions"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "9,999",
    currency: "EGP",
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
    popular: false,
  },
];

const CARD_HEIGHT = "550px"; // Set all cards to Enterprise height

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
    <section id="pricing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative overflow-x-hidden">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex gap-4 px-4">
              {plans.map((plan, idx) => (
                <div key={idx} className="flex-[0_0_85%]" style={{ height: CARD_HEIGHT }}>
                  <PricingCard plan={plan} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {plans.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === selectedIndex ? "bg-primary" : "bg-border"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <div key={idx} style={{ height: CARD_HEIGHT }}>
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  plan: Plan;
}

const PricingCard = ({ plan }: PricingCardProps) => (
  <div className="relative p-6 border rounded-md bg-white flex flex-col h-full">
    <h3 className="text-lg font-bold">{plan.name}</h3>
    <div className="text-2xl font-bold mt-2">
      {plan.price} <span className="text-sm">{plan.currency}</span>
    </div>
    <ul className="space-y-2 mt-4 flex-1">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start gap-2">
          <Check size={16} className="mt-1 flex-shrink-0" />
          <span className="text-sm">{f}</span>
        </li>
      ))}
    </ul>
    <a
      href="#contact"
      className="mt-auto block w-full py-2.5 text-center text-sm font-medium border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
    >
      Get Started
    </a>
  </div>
);

export default Pricing;
