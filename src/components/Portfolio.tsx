import { useState, useEffect, useRef } from "react";
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

  const projects: Project[] = [
    { title: "Luxury Brands", image: luxuryBrands, fullImage: luxuryFull, year: 2024 },
    { title: "Fuzzy", image: fuzzy, fullImage: fuzzyFull, year: 2025 },
    { title: "Faya Studio", image: fayaStudio, fullImage: fayaFull, year: 2024 },
    { title: "Temple Of Scent", image: temple, fullImage: templeFull, year: 2026 },
    { title: "Faya EG", image: fayaEgThumb, fullImage: fayaEgFull, year: 2024 },
    { title: "Lehab Scents", image: lehabThumb, fullImage: lehabFull, year: 2024 },
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

  // IntersectionObserver for fade-up on scroll
  const fadeRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    fadeRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-up");
              entry.target.style.animationDelay = `${i * 0.2}s`;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  return (
    <section id="portfolio" className="section-padding" style={{ fontFamily: "inherit" }}>
      {/* Inline animation CSS */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div
          ref={(el) => el && fadeRefs.current.push(el)}
          className="mb-10 px-4 text-center opacity-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold select-text">
            Selected Work
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
                className="flex-[0_0_auto]" // container fits image width
                ref={(el) => el && fadeRefs.current.push(el)}
                style={{ opacity: 0 }}
              >
                <div
                  onClick={() => {
                    setActiveImage(project.fullImage);
                    setZoom(1);
                  }}
                  className="cursor-pointer"
                >
                  {/* Thumbnail image - auto height based on image, full image shown */}
                  <div className="relative w-full overflow-hidden rounded-[6px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-contain rounded-[6px]" // shows full image
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-[6px]" />
                  </div>

                  {/* Brand info box */}
                  <div className="mt-2 w-full bg-gray-100 text-black px-3 py-2 rounded-[6px] flex items-center justify-between opacity-0"
                       ref={(el) => el && fadeRefs.current.push(el)}>
                    <span className="font-semibold flex items-center gap-2">
                      {String(index + 1).padStart(2, "0")} {project.title}
                    </span>
                    <span className="text-sm">{project.year}</span>
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
                onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 1, 6)); }}
              >
                +
              </button>
              <button
                className="text-gray-300 text-2xl w-16 h-16 flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 1, 1)); }}
              >
                −
              </button>
              <button
                className="text-gray-300 text-2xl w-16 h-16 flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); setActiveImage(null); }}
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
