import { Quote } from "lucide-react";

const FounderSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Founder's <span className="text-primary">Vision</span>
            </h2>
          </div>
          
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border relative">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/30" />
            
            <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 pl-8">
              "I built this platform after experiencing years of regulatory deadlock and failed trials firsthand. 
              Our mission is simple: to help innovators bring safer, effective, and equitable health products 
              to market — faster."
            </blockquote>
            
            <div className="flex items-center pl-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-primary">EW</span>
              </div>
              <div>
                <div className="font-bold text-lg">Emadago William</div>
                <div className="text-muted-foreground">Biophysicist & Co-Founder</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years in Biophysics</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">$100M+</div>
              <div className="text-muted-foreground">R&D Experience</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Regulatory Submissions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;