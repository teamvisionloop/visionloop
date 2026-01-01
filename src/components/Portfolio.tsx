import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import luxuryBrands from "@/assets/portfolio/luxury-brands-clean.png";
import fuzzy from "@/assets/portfolio/fuzzy.png";
import fayaStudio from "@/assets/portfolio/faya-studio-clean.png";
import obsidian from "@/assets/portfolio/obsidian.png";

interface Project {
  title: string;
  category: string;
  description: string;
  image?: string;
  link?: string;
}

const Portfolio = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || animated) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setAnimated(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animated]);

  const projects: Project[] = [
    {
      title: "Luxury Brands",
      category: "Fashion",
      description: "Premium streetwear e-commerce store featuring global luxury brands",
      image: luxuryBrands,
      link: "https://luxurybrandseg.com/",
    },
    {
      title: "Fuzzy",
      category: "Apparel",
      description: "Cozy Egyptian cotton hoodies and comfort wear brand",
      image: fuzzy,
      link: "https://wearfuzzy.com/",
    },
    {
      title: "Faya Studio",
      category: "Streetwear",
      description: "Winter streetwear collection with bold urban designs",
      image: fayaStudio,
      link: "https://fayastudioeg.com/",
    },
    {
      title: "Temple Of Scent",
      category: "Perfumery",
      description: "Luxury fragrance brand offering an exquisite collection of artisan perfumes ",
      image: Temple,
      link: "https://templeofscent.com/",
    },
  ];

  return (
    <section id="portfolio" className="section-padding" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header with stronger fade-up animation */}
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <span
            className={`text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider transform transition-all duration-1000 ease-out ${
              animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Our Work
          </span>

          <h2
            className={`text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 transform transition-all duration-1000 ease-out ${
              animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Featured Projects
          </h2>

          <p
            className={`text-muted-foreground text-base md:text-lg mt-3 md:mt-4 max-w-2xl mx-auto px-4 transform transition-all duration-1000 ease-out ${
              animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            A selection of Shopify stores we've designed and developed for our clients
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 px-2 sm:px-0">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-[0_0_92%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <a
                    href={project.link || "#contact"}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    className="group relative bg-secondary aspect-[4/3] overflow-hidden hover-lift cursor-pointer block"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground text-lg">+</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-background/80 px-2 py-1 self-start">
                        {project.category}
                      </span>

                      <div>
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                          {project.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {project.link && (
                      <div className="absolute top-4 md:top-6 right-4 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
          >
            Want to be featured? Let's talk <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
