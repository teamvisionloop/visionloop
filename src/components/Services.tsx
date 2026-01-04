import { useState, useEffect, useRef } from "react";

const ServicesAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  const services = [
    {
      title: "Web Design",
      tags: ["Ecommerce", "Landing Pages", "Portfolio Sites"],
      description:
        "Conversion-focused websites built with performance in mind. Each project is crafted with attention to responsive layouts, intuitive navigation, and modern design principles to ensure a seamless user experience across all devices and platforms.",
    },
    {
      title: "Logo Design",
      tags: ["Brand Design", "Identity"],
      description:
        "Custom logos and brand visuals designed to strengthen your brand identity and enhance digital presence. Every design is thoughtfully created to be visually striking, accessible, and consistent across websites, social media, and other digital touchpoints.",
    },
    {
      title: "AI Automation",
      tags: ["Workflow Automation", "Smart Features"],
      description:
        "Implement AI-driven workflows to automate repetitive tasks, optimize processes, and improve overall efficiency. These solutions help reduce manual work, streamline operations, and enable smarter, data-driven decision-making within your projects or digital platforms.",
    },
  ];

  // Intersection Observer for fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleIndexes.includes(index)) {
            // Force fade-up via JS
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`;

            setVisibleIndexes((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const children = containerRef.current?.querySelectorAll("[data-index]");
    children?.forEach((child) => observer.observe(child));

    return () => {
      children?.forEach((child) => observer.unobserve(child));
    };
  }, [visibleIndexes]);

  return (
    <section className="py-24 bg-black text-white" style={{ borderRadius: "30px" }}>
      <div className="max-w-6xl mx-auto px-4" ref={containerRef}>
        {/* Section Header */}
        <div
          data-index={-1}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold">What We Can Offer</h2>
          <p className="mt-4 text-gray-300 text-lg">Shape What's Next</p>
        </div>

        {services.map((service, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              data-index={index}
              style={{ opacity: 0, transform: "translateY(20px)" }}
              className={`accordion-item relative rounded-2xl overflow-hidden
                ${isOpen ? "bg-neutral-900" : "bg-neutral-900/40"}`}
            >
              {/* Header */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8"
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`text-4xl md:text-5xl font-bold transition-opacity ${
                      isOpen ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-lg md:text-xl font-medium">{service.title}</span>
                </div>
                <span className="text-2xl opacity-70">{isOpen ? "−" : "+"}</span>
              </button>

              {/* Content */}
              {isOpen && (
                <div className="px-6 md:px-8 pb-8 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/70 mb-6">{service.description}</p>
                  </div>
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
    </section>
  );
};

export default ServicesAccordion;
