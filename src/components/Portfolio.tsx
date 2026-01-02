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
        <div className="mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Our Featured Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
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
                    setZoom(1); // reset zoom
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
                  <div className="absolute top-3 left-3 bg-gray-300 text-black text-xs px-3 py-1">
                    {project.title}
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
    <div className="absolute top-6 right-6 z-10 flex gap-3">
      <button
        className="text-gray-300 text-xl"
        onClick={(e) => {
          e.stopPropagation();
          setZoom((z) => Math.min(z + 1, 6));
        }}
      >
        +
      </button>

      <button
        className="text-gray-300 text-xl"
        onClick={(e) => {
          e.stopPropagation();
          setZoom((z) => Math.max(z - 1, 1));
        }}
      >
        −
      </button>

      <button
        className="text-gray-300 text-xl"
        onClick={(e) => {
          e.stopPropagation();
          setActiveImage(null);
        }}
      >
        ✕
      </button>
    </div>

    {/* Scrollable container (both directions) */}
    <div
      className="w-full h-full overflow-auto p-12"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: "inline-block",
        }}
      >
        <img
          src={activeImage}
          alt=""
          style={{
            display: "inline-block",
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            maxWidth: "none",   // Important: allows horizontal scroll
            maxHeight: "none",  // Important: allows vertical scroll
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
