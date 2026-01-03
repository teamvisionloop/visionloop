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
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6">
              Your Shopify
              <br />
              <span className="flex items-center gap-2">
                Partner <Infinity className="inline w-7 h-7 md:w-10 md:h-10" />
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-4 md:p-6 border border-border hover-lift"
              >
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
