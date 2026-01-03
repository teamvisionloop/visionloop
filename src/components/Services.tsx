import { Store, Palette, Code, Settings, Rocket, HeadphonesIcon } from "lucide-react";
import { useState } from "react";

const ServicesAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const services = [
    { icon: Store, title: "Store Setup", description: "Complete store configuration from scratch with all essential features and integrations." },
    { icon: Palette, title: "Premium Theme Customization", description: "Tailored design modifications to make your store unique and on-brand." },
    { icon: Code, title: "Custom Coded Sections", description: "Bespoke functionality and design elements built specifically for your needs." },
    { icon: Settings, title: "Flow Automations", description: "Automated workflows to streamline operations and enhance customer experience." },
    { icon: Rocket, title: "SEO Setup", description: "Basic search engine optimization to help your store get discovered." },
    { icon: HeadphonesIcon, title: "Video Tutorials", description: "Custom training videos to help you manage your store independently." }
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
              className={`bg-gray-100 rounded-[12px] border border-gray-300 overflow-hidden transition-all`}
            >
              <button
                className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <div className="flex items-center gap-4">
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
                  <span className="font-semibold text-gray-800 md:text-lg">{service.title}</span>
                </div>
                <span className="text-gray-500 text-xl md:text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="p-4 md:p-6 border-t border-gray-300 text-gray-700 text-sm md:text-base bg-gray-50">
                  {service.description}
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
