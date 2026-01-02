import { useState } from "react";
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
}

const Portfolio = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const projects: Project[] = [
    { title: "Luxury Brands", image: luxuryBrands, fullImage: luxuryFull },
    { title: "Fuzzy", image: fuzzy, fullImage: fuzzyFull },
    { title: "Faya Studio", image: fayaStudio, fullImage: fayaFull },
    { title: "Temple Of Scent", image: temple, fullImage: templeFull },
    { title: "Faya EG", image: fayaEgThumb, fullImage: fayaEgFull },
    { title: "Lehab Scents", image: lehabThumb, fullImage: lehabFull },
  ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Our Featured Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            A selection of fashion and fragrance brands we’ve designed and built,
            focusing on clean visuals, strong identity, and performance.
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
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Small black overlay */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Light grey badge (TOP) */}
                  <div className="absolute top-3 left-3 bg-gray-300 text-black text-xs px-3 py-1 tracking-wide">
                    {project.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Viewer */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black"
            onClick={() => setActiveImage(null)}
          >
            {/* Controls */}
            <div className="absolute top-6 right-6 z-10 flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.min(z + 1, 6));
                }}
              >
                +
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.max(z - 1, 1));
                }}
              >
                −
              </button>

              <button
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
              <img
                src={activeImage}
                alt=""
                className="block mx-auto"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
