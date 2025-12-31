import { Check, Star } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import useMeasure from "react-use-measure";

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
          <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1.5 md:px-4 md:py-2 mb-4">
            <span className="text-xs md:text-sm font-medium">Shopify x VL26 Discount</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mt-3 md:mt-4 max-w-2xl mx-auto px-4">
            Transparent pricing for every stage of your business
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative" ref={emblaRef}>
          <div className="flex">
            {plans.map((plan, index) => (
              <PricingCardWrapper key={index} plan={plan} />
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {plans.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-primary" : "bg-border"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to plan ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PricingCardWrapper key={index} plan={plan} />
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs md:text-sm mt-8 md:mt-12 px-4">
          All prices are in Egyptian Pounds (EGP). Custom packages available upon request.
        </p>
      </div>
    </section>
  );
};

// Wrapper to measure the card height dynamically
const PricingCardWrapper = ({ plan }: { plan: Plan }) => {
  const [ref, bounds] = useMeasure();

  return (
    <div className="relative pl-4 first:pl-0">
      {plan.popular && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 px-3 py-1.5 text-xs md:text-sm font-medium flex items-center gap-1 whitespace-nowrap bg-primary text-primary-foreground rounded-md shadow-md z-10"
          style={{ top: -bounds.height * 0.07 }} // badge always above the card
        >
          <Star size={12} fill="currentColor" /> Most Popular
        </div>
      )}
      <div ref={ref}>
        <PricingCard plan={plan} />
      </div>
    </div>
  );
};

const PricingCard = ({ plan }: { plan: Plan }) => (
  <div className="p-6 md:p-8 border rounded-md hover-lift h-full">
    <div className="mb-4 md:mb-6">
      <h3 className="text-lg md:text-xl font-bold mb-2">{plan.name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
        <span className="text-muted-foreground text-xs md:text-sm">{plan.currency}</span>
      </div>
    </div>

    <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-2 md:gap-3">
          <Check size={16} className="mt-0.5 flex-shrink-0" />
          <span className="text-xs md:text-sm">{feature}</span>
        </li>
      ))}
    </ul>

    <a
      href="#contact"
      className={`block w-full py-2.5 md:py-3 text-center text-xs md:text-sm font-medium transition-colors ${
        plan.popular
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-primary hover:bg-secondary"
      }`}
    >
      Get Started
    </a>
  </div>
);

export default Pricing;
