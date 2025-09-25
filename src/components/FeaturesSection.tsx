import { Brain, TrendingUp, Users, Target, Database, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Clinical Simulation",
      description: "Test your product in realistic synthetic trials with advanced machine learning models"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast likely FDA outcomes and identify risks before they become costly problems"
    },
    {
      icon: Users,
      title: "Diversity Modeling",
      description: "Ensure your product works across varied patient populations and demographics"
    },
    {
      icon: Target,
      title: "Actionable Insights",
      description: "Get specific improvement recommendations when simulations identify potential issues"
    },
    {
      icon: Database,
      title: "Multimodal Data Integration",
      description: "Leverages molecular, genomic, and clinical datasets for comprehensive analysis"
    },
    {
      icon: Zap,
      title: "Rapid Iteration",
      description: "Quickly test modifications and improvements without lengthy trial processes"
    }
  ];

  return (
    <section id="features" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Key <span className="text-primary">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive AI-powered simulation capabilities designed for modern biotech innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group p-8 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;