import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Pricing = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const plans = [
    {
      name: "Basic",
      price: "2,500",
      currency: "EGP",
      features: [
        "12 products",
        "4 pages",
        "Premium theme",
        "No free revisions",
      ],
      popular: false,
    },
    {
      name: "Starter",
      price: "4,500",
      currency: "EGP",
      features: [
        "25 products",
        "5 page website",
        "Premium theme",
        "2 free revisions",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "6,500",
      currency: "EGP",
      features: [
        "35 products",
        "5 page website",
        "Premium theme",
        "3 free revisions",
      ],
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
        <div className="md:hidden relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {plans.map((plan, index) => (
                <div key={index} className="flex-[0_0_85%] min-w-0 pl-4 first:pl-0">
                  <PricingCard plan={plan} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-background border border-border flex items-center justify-center hover:bg-secondary transition-colors z-10"
            aria-label="Previous plan"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-background border border-border flex items-center justify-center hover:bg-secondary transition-colors z-10"
            aria-label="Next plan"
          >
            <ChevronRight size={18} />
          </button>

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
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs md:text-sm mt-8 md:mt-12 px-4">
          All prices are in Egyptian Pounds (EGP). Custom packages available upon request.
        </p>
      </div>
    </section>
  );
};

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    currency: string;
    features: string[];
    popular: boolean;
  };
}

const PricingCard = ({ plan }: PricingCardProps) => (
  <div
    className={`relative p-6 md:p-8 border transition-all hover-lift h-full ${
      plan.popular
        ? "border-primary bg-secondary"
        : "border-border hover:border-primary"
    }`}
  >
    {plan.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 md:px-4 py-1 text-xs font-medium flex items-center gap-1 whitespace-nowrap">
        <Star size={10} fill="currentColor" /> Most Popular
      </div>
    )}

    <div className="mb-4 md:mb-6">
      <h3 className="text-lg md:text-xl font-bold mb-2">{plan.name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
        <span className="text-muted-foreground text-xs md:text-sm">{plan.currency}</span>
      </div>
    </div>

    <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
      {plan.features.map((feature, featureIndex) => (
        <li key={featureIndex} className="flex items-start gap-2 md:gap-3">
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
