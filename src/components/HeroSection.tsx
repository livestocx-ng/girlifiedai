import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Geometric orbs */}
      <div className="biotech-orb w-96 h-96 -top-48 -left-48"></div>
      <div className="biotech-orb w-64 h-64 -bottom-32 -right-32"></div>
      <div className="biotech-orb-glow w-32 h-32 top-1/4 right-1/4"></div>
      <div className="biotech-orb-glow w-48 h-48 bottom-1/3 left-1/4"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Accelerate FDA Approval with{" "}
            <span className="text-primary">AI-Powered</span>{" "}
            Product Simulations
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Test, validate, and improve your health products before costly clinical trials.
          </p>
          
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            Build safer, faster, and more effective biotech innovations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outlineHero" size="xl" className="group">
              <Play className="mr-2 group-hover:scale-110 transition-transform" />
              Request a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;