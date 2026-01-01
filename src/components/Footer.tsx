const Footer = () => {
  return (
    <footer className="py-10 px-4 md:px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* Logo */}
        <img
          src="/lg.png"
          alt="VisionLoop Logo"
          className="h-8 w-auto"
        />

        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {["About", "Portfolio", "Services", "Pricing", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Contact Form */}
        <form
          action="https://docs.google.com/forms/d/e/FORM_ID/formResponse"
          method="POST"
          target="_blank"
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            name="entry.1111111111"
            placeholder="Your Name"
            required
            className="border border-border p-2 text-sm"
          />

          <input
            type="email"
            name="entry.2222222222"
            placeholder="Email Address"
            required
            className="border border-border p-2 text-sm"
          />

          <input
            type="text"
            name="entry.3333333333"
            placeholder="Subject"
            required
            className="border border-border p-2 text-sm"
          />

          <textarea
            name="entry.4444444444"
            placeholder="Message"
            rows={3}
            required
            className="border border-border p-2 text-sm resize-none"
          />

          <button
            type="submit"
            className="bg-primary text-primary-foreground py-2 text-sm font-medium hover:bg-primary/90 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VisionLoop
      </p>
    </footer>
  );
};

export default Footer;
