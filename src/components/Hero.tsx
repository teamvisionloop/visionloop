import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="
        min-h-[75vh] sm:min-h-[85vh] md:min-h-screen
        flex flex-col justify-center items-center
        relative px-4 md:px-6 lg:px-24
        py-16 md:py-32 pt-24 md:pt-32
      "
    >
      <div className="text-center max-w-5xl mx-auto">
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 animate-fade-up opacity-0 stagger-1">
          We Design & Build
          <br />
          <span className="text-muted-foreground">
            Build Your Vision
          </span>
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-up opacity-0 stagger-2 px-4">
          A premium development studio focused on performance, clarity, and
          conversion — turning ideas into powerful online experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-up opacity-0 stagger-3 px-4">
          <a
            href="#portfolio"
            className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#pricing"
            className="border border-primary text-foreground px-6 md:px-8 py-3 md:py-4 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Pricing Plans
          </a>
        </div>
      </div>
      
      <a
        href="#about"
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} className="md:w-6 md:h-6 text-muted-foreground" />
      </a>
    </section>
  );
};

export default Hero;
