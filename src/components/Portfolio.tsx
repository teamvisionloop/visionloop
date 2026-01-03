import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* =======================
   Thumbnails
======================= */
import luxuryBrands from "@/assets/portfolio/luxury-brands-clean.webp";
import fuzzy from "@/assets/portfolio/fuzzy.webp";
import fayaStudio from "@/assets/portfolio/faya-studio-clean.webp";
import temple from "@/assets/portfolio/temple.webp";
import fayaEgThumb from "@/assets/portfolio/faya-eg-thumb.webp";
import lehabThumb from "@/assets/portfolio/lehab-scents-thumb.webp";

/* =======================
   Full Images
======================= */
import luxuryFull from "@/assets/portfolio/luxury-brands-full.webp";
import fuzzyFull from "@/assets/portfolio/fuzzy-full.webp";
import fayaFull from "@/assets/portfolio/faya-studio-full.webp";
import templeFull from "@/assets/portfolio/temple-full.webp";
import fayaEgFull from "@/assets/portfolio/faya-eg-full.webp";
import lehabFull from "@/assets/portfolio/lehab-scents-full.webp";

interface Project {
  title: string;
  image: string;
  fullImage: string;
  year: number;
}

const Portfolio = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const years = [2024, 2025, 2026];

  const projects: Project[] = [
    { title: "Luxury Brands", image: luxuryBrands, fullImage: luxuryFull, year: years[Math.floor(Math.random() * years.length)] },
    { title: "Fuzzy", image: fuzzy, fullImage: fuzzyFull, year: years[Math.floor(Math.random() * years.length)] },
    { title: "Faya Studio", image: fayaStudio, fullImage: fayaFull, year: years[Math.floor(Math.random() * years.length)] },
    { title: "Temple Of Scent", image: temple, fullImage: templeFull, year: years[Math.floor(Math.random() * years.length)] },
    { title: "Faya EG", image: fayaEgThumb, fullImage: fayaEgFull, year: years[Math.floor(Math.random() * years.length)] },
    { title: "Lehab Scents", image: lehabThumb, fullImage: lehabFull, year: years[Math.floor(Math.random() * years.length)] },
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10 px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold select-text"
            style={{ fontFamily: "inherit" }}
          >
            Our Featured Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A curated selection of fashion and fragrance brands designed with
            precision, clarity, and strong visual identity.
          </p>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 px-4 md:px-6 lg:px-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div
                  onClick={() => {
                    setActiveImage(project.fullImage);
                    setZoom(1);
                  }}
                  className="cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Brand title + year below the image */}
                  <div className="mt-2 w-full bg-gray-200 text-black text-center text-sm py-2 rounded-[6px]">
                    {project.title} • {project.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black/70"
            onClick={() => setActiveImage(null)}
          >
            {/* Controls */}
            <div className="absolute top-6 right-6 z-10 flex gap-1.5">
              <button
                className="text-gray-300 text-2xl w-16 h-16 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.min(z + 1, 6));
                }}
              >
                +
              </button>

              <button
                className="text-gray-300 text-2xl w-16 h-16 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.max(z - 1, 1));
                }}
              >
                −
              </button>

              <button
                className="text-gray-300 text-2xl w-16 h-16 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(null);
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable container */}
            <div
              className="w-full h-full overflow-auto p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "inline-block", margin: "auto" }}>
                <img
                  src={activeImage}
                  alt=""
                  style={{
                    display: "inline-block",
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                    maxWidth: "100%",
                    maxHeight: "none",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
