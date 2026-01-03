import { useState } from "react";
import { ArrowRight } from "lucide-react";

const ServicesAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    {
      title: "Branding Design",
      tags: ["Brand Strategy", "Visual Identity"],
      description:
        "Modern, responsive, and user-friendly brand systems designed to engage audiences and drive conversions.",
      image:
        "https://images.unsplash.com/photo-1529336953121-ad3b6c65b5c8?q=80&w=800",
    },
    {
      title: "Digital Design",
      tags: ["Motion Design", "Accessibility"],
      description:
        "High-impact digital experiences optimized for all platforms.",
    },
    {
      title: "Web Design",
      tags: ["Landing Pages", "Portfolio Sites"],
      description:
        "Conversion-focused websites built with performance in mind.",
    },
    {
      title: "UI / UX Design",
      tags: ["User Research", "Wireframing"],
      description:
        "Human-centered interfaces designed for clarity and usability.",
    },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Services</h2>

        <div className="space-y-4">
          {services.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500
                  ${isOpen ? "bg-neutral-900" : "bg-neutral-900/40"}`}
              >
                {/* Header */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 md:p-8"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-4xl md:text-5xl font-bold transition-opacity
                        ${isOpen ? "opacity-100" : "opacity-30"}`}
                    >
                      {String(index + 1).padStart(2, "0")}.
                    </span>

                    <span className="text-lg md:text-xl font-medium">
                      {service.title}
                    </span>
                  </div>

                  <span className="text-2xl opacity-70">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Content */}
                {isOpen && (
                  <div className="px-6 md:px-8 pb-8 grid md:grid-cols-2 gap-6">
                    {/* Left */}
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-white/70 mb-6">
                        {service.description}
                      </p>

                      <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition">
                        Explore Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Right */}
                    {service.image && (
                      <div className="rounded-xl overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;
