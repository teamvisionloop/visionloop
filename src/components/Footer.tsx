import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="py-8 md:py-12 px-4 md:px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <Logo className="text-lg md:text-xl" />

          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["About", "Portfolio", "Services", "Pricing", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} VisionLoop
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
