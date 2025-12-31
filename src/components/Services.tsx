import { Store, Palette, Code, Settings, Rocket, HeadphonesIcon } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Services = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
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
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

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
    <section id="services" className="section-padding bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-medium opacity-70 uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4">
            Our Services
          </h2>
          <p className="opacity-70 text-base md:text-lg mt-3 md:mt-4 max-w-2xl mx-auto px-4">
            Everything you need to launch and grow your Shopify store
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 first:pl-0 sm:first:pl-4"
                >
                  <div className="group p-6 md:p-8 border border-primary-foreground/20 hover:bg-primary-foreground/5 transition-colors h-full">
                    <service.icon className="w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{service.title}</h3>
                    <p className="opacity-70 text-sm md:text-base">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}

        </div>
      </div>
    </section>
  );
};

export default Services;
