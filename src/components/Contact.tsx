import { Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-secondary">
      <div className="max-w-4xl mx-auto text-center px-4">
        <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Get In Touch
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6">
          Ready to Build Your
          <br />
          Shopify Store?
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
          Let's discuss your project and bring your vision to life. 
          We're here to help you succeed in e-commerce.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <a
            href="mailto:teamvisionloop@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 md:px-8 py-3 md:py-4 font-medium hover:bg-primary/90 transition-colors text-sm md:text-base"
          >
            <Mail size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="truncate">teamvisionloop@gmail.com</span>
          </a>
          <a
            href="https://wa.me/201277440119"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-primary px-5 md:px-8 py-3 md:py-4 font-medium hover:bg-background transition-colors text-sm md:text-base"
          >
            <MessageCircle size={16} className="md:w-[18px] md:h-[18px]" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
