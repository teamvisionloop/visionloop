import { ArrowUpRight } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Thumbnails
import luxuryBrands from "@/assets/portfolio/luxury-brands-clean.png";
import fuzzy from "@/assets/portfolio/fuzzy.png";
import fayaStudio from "@/assets/portfolio/faya-studio-clean.png";
import temple from "@/assets/portfolio/temple.png";

// Full screenshots
import luxuryFull from "@/assets/portfolio/luxury-brands-full.png";
import fuzzyFull from "@/assets/portfolio/fuzzy-full.png";
import fayaFull from "@/assets/portfolio/faya-studio-full.png";
import templeFull from "@/assets/portfolio/temple-full.png";
import fayaEgFull from "@/assets/portfolio/faya-eg-full.png";
import lehabFull from "@/assets/portfolio/lehab-scents-full.png";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  fullImage: string;
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState("");

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

  const projects: Project[] = [
    {
      title: "Luxury Brands",
      category: "Fashion",
      description: "Premium streetwear e-commerce store featuring global luxury brands",
      image: luxuryBrands,
      fullImage: luxuryFull,
    },
    {
      title: "Fuzzy",
      category: "Apparel",
      description: "Cozy Egyptian cotton hoodies and comfort wear brand",
      image: fuzzy,
      fullImage: fuzzyFull,
    },
    {
      title: "Faya Studio",
      category: "Streetwear",
      description: "Winter streetwear collection with bold urban designs",
      image: fayaStudio,
      fullImage: fayaFull,
    },
    {
      title: "Temple Of Scent",
      category: "Perfumery",
      description: "Luxury fragrance brand offering artisan perfumes",
      image: temple,
      fullImage: templeFull,
    },
    {
      title: "Faya EG",
      category: "Fashion",
      description: "Modern Egyptian fashion brand",
      image: fayaStudio,
      fullImage: fayaEgFull,
    },
    {
      title: "Lehab Scents",
      category: "Fragrance",
      description: "Luxury Arabic perfume house",
      image: temple,
      fullImage: lehabFull,
    },
  ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of Ecommerce stores we've designed and developed
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 px-4 md:px-6 lg:px-12">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-[0_0_92%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div
                    onClick={() => {
                      setActiveImage(project.fullImage);
                      setActiveTitle(project.title);
                    }}
                    className="group relative bg-secondary aspect-[4/3] overflow-hidden hover-lift cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-background/80 px-2 py-1 self-start">
                        {project.category}
                      </span>

                      <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-lg md:text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fullscreen Image Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-7xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-10 right-0 text-white text-sm opacity-80 hover:opacity-100"
              >
                Close ✕
              </button>

              <img
                src={activeImage}
                alt={activeTitle}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
