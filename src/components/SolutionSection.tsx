import { Brain, Users, BarChart3, Shield, Database, Lightbulb } from "lucide-react";

const SolutionSection = () => {
  const capabilities = [
    {
      icon: Shield,
      title: "Efficacy Testing",
      description: "Validate product effectiveness across diverse populations"
    },
    {
      icon: Users,
      title: "Safety Analysis",
      description: "Identify potential risks before human trials"
    },
    {
      icon: BarChart3,
      title: "Biomarker Response",
      description: "Predict biological responses and interactions"
    },
    {
      icon: Database,
      title: "Market Diversity",
      description: "Test across ethnicity, comorbidities, and lifestyle factors"
    }
  ];

  return (
    <section id="solution" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">AI Solution</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We built an AI and machine learning platform that simulates real-world clinical trials 
            for biotech companies, pharma innovators, and health product startups.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold">AI Clinical Simulation</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Whether it's a new drug, medical device, or advanced consumer health products, 
              our models generate synthetic patient cohorts to comprehensively test your innovations.
            </p>
            <p className="text-lg">
              <span className="font-semibold text-primary">Result:</span> Pre-screen your product, 
              predict failures, and fix weaknesses before entering high-risk, high-cost FDA phases.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group">
                  <Icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <div className="flex items-start">
            <Lightbulb className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-3">Actionable Intelligence</h3>
              <p className="text-lg">
                If your product fails simulation, our AI doesn't just tell you it failed — 
                it suggests specific areas for improvement, helping you iterate faster and smarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;