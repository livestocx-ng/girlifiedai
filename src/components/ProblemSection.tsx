import { AlertTriangle, Clock, DollarSign, TrendingDown } from "lucide-react";

const ProblemSection = () => {
  const stats = [
    {
      icon: Clock,
      stat: "10+ years",
      description: "Average time to FDA approval"
    },
    {
      icon: DollarSign,
      stat: "$2.3B",
      description: "Average cost per approved drug"
    },
    {
      icon: TrendingDown,
      stat: "90%",
      description: "Failure rate in clinical trials"
    },
    {
      icon: AlertTriangle,
      stat: "Most failures",
      description: "Are predictable with proper testing"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Problem is <span className="text-destructive">Clear</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bringing a new health product to market is slow, expensive, and uncertain. 
            Most failures are predictable if products are tested against real-world 
            diversity before entering humans.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/20 transition-colors">
                  <Icon className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.stat}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 p-8 bg-destructive/5 rounded-2xl border border-destructive/20">
          <p className="text-lg text-center max-w-3xl mx-auto">
            <span className="font-semibold text-destructive">The reality:</span> The average drug takes over 10 years and $2.3 billion to reach FDA approval — and 90% of candidates fail in trials. Most of these failures are predictable if products are tested against real-world diversity before entering humans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;