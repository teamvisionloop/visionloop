import { useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* =======================
   Assets
======================= */
import luxuryBrands from "@/assets/portfolio/luxury-brands-clean.webp";
import fuzzy from "@/assets/portfolio/fuzzy.webp";
import fayaStudio from "@/assets/portfolio/faya-studio-clean.webp";
import temple from "@/assets/portfolio/temple.webp";
import fayaEgThumb from "@/assets/portfolio/faya-eg-thumb.webp";
import lehabThumb from "@/assets/portfolio/lehab-scents-thumb.webp";

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const pointers = useRef(new Map<number, PointerEvent>());
  const lastTap = useRef(0);
  const startDistance = useRef(0);
  const startZoom = useRef(1);

  const projects: Project[] = [
    { title: "Luxury Brands", image: luxuryBrands, fullImage: luxuryFull },
    { title: "Fuzzy", image: fuzzy, fullImage: fuzzyFull },
    { title: "Faya Studio", image: fayaStudio, fullImage: fayaFull },
    { title: "Temple Of Scent", image: temple, fullImage: templeFull },
    { title: "Faya EG", image: fayaEgThumb, fullImage: fayaEgFull },
    { title: "Lehab Scents", image: lehabThumb, fullImage: lehabFull },
  ];

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  /* =======================
     Pointer / Drag / Pinch
  ======================= */

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    pointers.current.set(e.pointerId, e);
    setIsDragging(true);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      startDistance.current = Math.hypot(
        a.clientX - b.clientX,
        a.clientY - b.clientY
      );
      startZoom.current = zoom;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, e);

    // ✅ Drag freely up / down / left / right
    if (pointers.current.size === 1 && zoom > 1) {
      setPosition((p) => ({
        x: p.x + e.movementX,
        y: p.y + e.movementY,
      }));
    }

    // ✅ Pinch zoom
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(
        a.clientX - b.clientX,
        a.clientY - b.clientY
      );
      const scale = Math.min(
        Math.max(startZoom.current * (distance / startDistance.current), 1),
        6
      );
      setZoom(scale);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    setIsDragging(false);
  };

  /* =======================
     Double Click / Tap Zoom
  ======================= */

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setZoom((z) => (z === 1 ? 3 : 1));
      setPosition({ x: 0, y: 0 });
    }
    lastTap.current = now;
  };

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 px-4">
            {projects.map((project, i) => (
              <div key={i} className="flex-[0_0_90%] md:flex-[0_0_33%]">
                <div
                  onClick={() => {
                    setActiveImage(project.fullImage);
                    resetView();
                  }}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 left-3 bg-gray-300 text-black text-xs px-3 py-1">
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
            className="fixed inset-0 z-50 bg-black/90"
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

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={activeImage}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTap();
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="select-none"
                style={{
                  cursor:
                    zoom > 1
                      ? isDragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transition: isDragging ? "none" : "transform 0.25s ease",
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
