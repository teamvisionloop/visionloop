import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* =======================
   Thumbnails (.webp)
======================= */
import luxuryBrands from "@/assets/portfolio/luxury-brands-clean.webp";
import fuzzy from "@/assets/portfolio/fuzzy.webp";
import fayaStudio from "@/assets/portfolio/faya-studio-clean.webp";
import temple from "@/assets/portfolio/temple.webp";
import fayaEgThumb from "@/assets/portfolio/faya-eg-thumb.webp";
import lehabThumb from "@/assets/portfolio/lehab-scents-thumb.webp";

/* =======================
   Full Screenshots (.webp)
======================= */
import luxuryFull from "@/assets/portfolio/luxury-brands-full.webp";
import fuzzyFull from "@/assets/portfolio/fuzzy-full.webp";
import fayaFull from "@/assets/portfolio/faya-studio-full.webp";
import templeFull from "@/assets/portfolio/temple-full.webp";
import fayaEgFull from "@/assets/portfolio/faya-eg-full.webp";
import lehabFull from "@/assets/portfolio/lehab-scents-full.webp";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  fullImage: string;
}

const Portfolio = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState("");
  const [zoom, setZoom] = useState(1);

  const closeModal = () => {
    setActiveImage(null);
    setZoom(1);
  };

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
      description: "Luxury fragrance brand",
      image: temple,
      fullImage: templeFull,
    },
    {
      title: "Faya EG",
      category: "Fashion",
      description: "Modern Egyptian fashion brand",
      image: fayaEgThumb,
      fullImage: fayaEgFull,
    },
    {
      title: "Lehab Scents",
      category: "Fragrance",
      description: "Luxury Arabic perfume house",
      image: lehabThumb,
      fullImage: lehabFull,
    },
  ];

  return (
    <section id="portfolio" className="section-padding relative">
      {/* Inline Animation Styles */}
      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .fadeUp {
            opacity: 0;
            animation: fadeUp 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto text-center mb-8">
        {/* Header */}
        <h2 className="text-3xl font-bold fadeUp" style={{ animationDelay: "0.2s" }}>
          Our Featured Projects
        </h2>
        <p className="mt-2 text-gray-400 fadeUp" style={{ animationDelay: "0.4s" }}>
          Explore some of the latest projects we've worked on
        </p>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-4 md:px-6 lg:px-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-[0_0_92%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div
                onClick={() => {
                  setActiveImage(project.fullImage);
                  setActiveTitle(project.title);
                  setZoom(1);
                }}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeModal} // closes modal if clicked outside
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking image/buttons
          >
            {/* Controls */}
            <div className="absolute top-6 right-6 flex gap-3 z-20">
              {/* Zoom In */}
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                className="p-2 rounded bg-transparent hover:bg-white/20 transition"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" />
                </svg>
              </button>

              {/* Zoom Out */}
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
                className="p-2 rounded bg-transparent hover:bg-white/20 transition"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="white" strokeWidth="2" />
                </svg>
              </button>

              {/* Close */}
              <button
                onClick={closeModal}
                className="p-2 rounded bg-transparent hover:bg-white/20 transition"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            {/* Image */}
            <img
              src={activeImage}
              alt={activeTitle}
              className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
