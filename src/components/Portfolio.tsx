import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import luxuryBrands from "@/assets/portfolio/luxury-brands-clean.webp";
import fuzzy from "@/assets/portfolio/fuzzy.webp";
import fayaStudio from "@/assets/portfolio/faya-studio-clean.webp";
import lehabScents from "@/assets/portfolio/lehab-scents.webp";
import temple from "@/assets/portfolio/temple.webp";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
}

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
    title: "Faya Studio EG",
    category: "Streetwear",
    description: "Winter streetwear collection with bold urban designs",
    image: fayaStudio,
  },
  {
    title: "Lehab Scents",
    category: "Perfumery",
    description: "Luxury fragrance brand with artisanal scents",
    image: lehabScents,
  },
  {
    title: "Temple Of Scent",
    category: "Perfumery",
    description: "Luxury fragrance brand offering an exquisite collection of artisan perfumes",
    image: temple,
    link: "https://templeofscent.com/",
  },
];

export default function Portfolio() {
  const [lightbox, setLightbox] = useState<{ image: string; zoom: number } | null>(null);

  const openLightbox = (image: string) => setLightbox({ image, zoom: 1 });
  const closeLightbox = () => setLightbox(null);
  const zoomIn = () => lightbox && setLightbox({ ...lightbox, zoom: lightbox.zoom + 0.2 });
  const zoomOut = () => lightbox && setLightbox({ ...lightbox, zoom: Math.max(lightbox.zoom - 0.2, 0.2) });

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mt-3 md:mt-4 max-w-2xl mx-auto">
            A selection of Ecommerce stores we've designed and developed for our clients
          </p>
        </div>

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 lg:px-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer group overflow-hidden rounded-lg"
              onClick={() => openLightbox(project.image)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[220px] sm:h-64 lg:h-72 object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              {/* Light overlay */}
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
              {/* Category label */}
              <span className="absolute top-2 left-2 bg-background/80 text-xs md:text-sm px-2 py-1 rounded font-medium text-muted-foreground">
                {project.category}
              </span>
              {/* Title on hover */}
              <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="font-bold text-lg md:text-xl">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={closeLightbox}
          >
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image container
            >
              {/* X Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Zoom Buttons */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                  onClick={zoomOut}
                  className="p-2 bg-white/20 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={zoomIn}
                  className="p-2 bg-white/20 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Image */}
              <img
                src={lightbox.image}
                alt="Full"
                style={{ transform: `scale(${lightbox.zoom})` }}
                className="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-300"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
