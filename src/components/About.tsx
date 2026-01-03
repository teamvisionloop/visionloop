import { Infinity, Zap, Shield, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "We deliver your store quickly without compromising on quality.",
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Every store we build is crafted with attention to detail.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "We're with you every step of the way, from launch and beyond.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center mb-10 md:mb-16 gap-3">
          <h2 className="text-3xl md:text-5xl font-bold">Why Choose Us</h2>
          <Infinity className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>

        {/* Features */}
        <div className="flex gap-6 overflow-x-auto md:overflow-x-visible px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:flex-1 bg-background border border-border p-4 md:p-6 rounded-lg md:rounded-xl flex flex-col justify-between"
              style={{ minWidth: "250px", aspectRatio: "1 / 1" }}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-2 mb-4">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
              </div>
              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base mt-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
