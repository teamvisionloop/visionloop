import { useState, useEffect, useRef } from "react";
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

  // Pan support
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);

  const startDrag = (x: number, y: number) => {
    isDragging.current = true;
    lastPos.current = { x, y };
  };

  const onDrag = (x: number, y: number) => {
    if (!isDragging.current) return;
    setOffset((prev) => ({
      x: prev.x + (x - lastPos.current.x),
      y: prev.y + (y - lastPos.current.y),
    }));
    lastPos.current = { x, y };
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  const openModal = (image: string, title: string) => {
    setActiveImage(image);
    setActiveTitle(title);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setActiveImage(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const projects: Project[] = [
    { title: "Luxury Brands", category: "Fashion", description: "Premium streetwear e-commerce store featuring global luxury brands", image: luxuryBrands, fullImage: luxuryFull },
    { title: "Fuzzy", category: "Apparel", description: "Cozy Egyptian cotton hoodies and comfort wear brand", image: fuzzy, fullImage: fuzzyFull },
    { title: "Faya Studio", category: "Streetwear", description: "Winter streetwear collection with bold urban designs", image: fayaStudio, fullImage: fayaFull },
    { title: "Temple Of Scent", category: "Perfumery", description: "Luxury fragrance brand", image: temple, fullImage: templeFull },
    { title: "Faya EG", category: "Fashion", description: "Modern Egyptian fashion brand", image: fayaEgThumb, fullImage: fayaEgFull },
    { title: "Lehab Scents", category: "Fragrance", description: "Luxury Arabic perfume house", image: lehabThumb, fullImage: lehabFull },
  ];

  // Scroll animation
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );
    projectRefs.current.forEach((el) => { if(el) observer.observe(el); });
    return () => projectRefs.current.forEach((el) => { if(el) observer.unobserve(el); });
  }, []);

  return (
    <section id="portfolio" className="section-padding relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className={`text-3xl font-bold transition-all duration-600 ${visibleIndexes.includes(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} ref={(el) => projectRefs.current[0] = el!} data-index={0}>Our Featured Projects</h2>
        <p className={`mt-2 text-gray-400 transition-all duration-600 ${visibleIndexes.includes(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} ref={(el) => projectRefs.current[1] = el!} data-index={1}>Explore some of the latest projects we've worked on</p>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-4 md:px-6 lg:px-12">
          {projects.map((project, index) => (
            <div key={index} className={`flex-[0_0_92%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] transition-all duration-500 ${visibleIndexes.includes(index+2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} ref={(el) => projectRefs.current[index+2] = el!} data-index={index+2}>
              <div onClick={() => openModal(project.fullImage, project.title)} className="group relative aspect-[4/3] overflow-hidden cursor-pointer">
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeModal}>
          {/* Buttons */}
          <div className="absolute top-4 right-4 flex gap-3 z-50 text-white">
            <button onClick={(e)=>{e.stopPropagation(); setZoom(z=>Math.min(z+0.5,8));}} className="p-2 hover:text-gray-300 transition transform hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2"/></svg>
            </button>
            <button onClick={(e)=>{e.stopPropagation(); setZoom(z=>Math.max(z-0.5,1));}} className="p-2 hover:text-gray-300 transition transform hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="white" strokeWidth="2"/></svg>
            </button>
            <button onClick={(e)=>{e.stopPropagation(); closeModal();}} className="p-2 hover:text-gray-300 transition transform hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6l-12 12" stroke="white" strokeWidth="2"/></svg>
            </button>
          </div>

          {/* Pan & Zoom container */}
          <div
            className="relative max-w-[95vw] max-h-[95vh] overflow-hidden cursor-grab"
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onMouseMove={(e) => onDrag(e.clientX, e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => onDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={endDrag}
            onClick={(e)=>e.stopPropagation()}
          >
            <img
              ref={imageRef}
              src={activeImage}
              alt={activeTitle}
              className="object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoom}) translate(${offset.x/zoom}px, ${offset.y/zoom}px)` }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
