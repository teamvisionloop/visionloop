import { Store, Palette, Code, Settings, Rocket, HeadphonesIcon } from "lucide-react";
import { useState } from "react";

const ServicesAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Store,
      title: "Shopify Store Setup",
      description: "Complete store configuration from scratch with all essential features and integrations.",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" /></svg>`,
    },
    {
      icon: Palette,
      title: "Premium Theme Customization",
      description: "Tailored design modifications to make your store unique and on-brand.",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m9-9H3" /></svg>`,
    },
    {
      icon: Code,
      title: "Custom Coded Sections",
      description: "Bespoke functionality and design elements built specifically for your needs.",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" /></svg>`,
    },
    {
      icon: Settings,
      title: "Flow Automations",
      description: "Automated workflows to streamline operations and enhance customer experience.",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" /></svg>`,
    },
    {
      icon: Rocket,
      title: "SEO Setup",
      description: "Basic search engine optimization to help your store get discovered.",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-6l6-6 6 6v6" /></svg>`,
    },
    {
      icon: HeadphonesIcon,
      title: "Video Tutorials",
      description: "Custom training videos to help you manage your store independently.",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v22M1 12h22" /></svg>`,
    },
  ];

  return (
    <section id="services" className="section-padding bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-medium opacity-70 uppercase tracking-wider">What We Do</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4">Our Services</h2>
          <p className="opacity-70 text-base md:text-lg mt-3 md:mt-4 max-w-2xl mx-auto px-4">
            Everything you need to launch and grow your Shopify store
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4 px-4 md:px-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-[16px] overflow-hidden border border-gray-700"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center gap-4">
                  <service.icon className="w-8 h-8 text-gray-300" />
                  <span className="font-semibold text-gray-100 text-lg md:text-xl">{service.title}</span>
                </div>
                <span className="text-gray-400 text-2xl">{openIndex === index ? "−" : "+"}</span>
              </button>

              {openIndex === index && (
                <div className="p-8 bg-gray-800 text-gray-100 text-lg flex items-start gap-6">
                  <div
                    className="flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: service.svg }}
                  />
                  <p>{service.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;
