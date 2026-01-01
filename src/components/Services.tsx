import { Store, Palette, Code, Settings, Rocket, HeadphonesIcon } from "lucide-react";
import { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Services = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

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

  // Animate header only
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || animated) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setAnimated(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animated]);

  const services = [
    {
      icon: Store,
      title: "Shopify Store Setup",
      description: "Complete store configuration from scratch with all essential features and integrations.",
    },
    {
      icon: Palette,
      title: "Premium Theme Customization",
      description: "Tailored design modifications to make your store unique and on-brand.",
    },
    {
      icon: Code,
      title: "Custom Coded Sections",
      description: "Bespoke functionality and design elements built specifically for your needs.",
    },
    {
      icon: Settings,
      title: "Flow Automations",
      description: "Automated workflows to streamline operations and enhance customer experience.",
    },
    {
      icon: Rocket,
      title: "SEO Setup",
      description: "Basic search engine optimization to help your store get discovered.",
    },
    {
      icon: HeadphonesIcon,
      title: "Video Tutorials",
      description: "Custom training videos to help you manage your store independently.",
    },
  ];

  return (
    <section
      id="services"
      className="section-padding bg-primary text-primary-foreground"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <span
            className={`text-xs md:text-sm font-medium uppercase tracking-wider transform transition-all duration-[1000ms] ease-out ${
              animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            What We Do
          </span>

          <h2
            className={`text-2xl md:text-4xl lg:text-5xl font-bold transform transition-all duration-[1000ms] ease-out ${
              animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Our Services
          </h2>

          <p
            className={`opacity-70 text-base md:text-lg max-w-2xl mx-auto px-4 transform transition-all duration-[1000ms] ease-out ${
              animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Everything you need to launch and grow your store
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-4 sm:px-6 md:px-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <div className="group p-6 md:p-8 h-full bg-black border border-white rounded-lg shadow-lg shadow-gray-500/20">
                  <service.icon className="w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-6 opacity-80 group-hover:opacity-100 transition-opacity text-white" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="opacity-70 text-sm md:text-base text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
