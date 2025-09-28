import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Shield, Target, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import sampleResults from "@/assets/sample-results.jpg";

interface DemoResultsProps {
  productName: string;
  productType: string;
  targetCondition: string;
}

export const DemoResults = ({ productName, productType, targetCondition }: DemoResultsProps) => {
  // Simulated data - in real implementation, this would come from the AI analysis
  const efficacyData = [
    { month: 'Month 1', placebo: 12, treatment: 28, improvement: 16 },
    { month: 'Month 2', placebo: 18, treatment: 45, improvement: 27 },
    { month: 'Month 3', placebo: 22, treatment: 62, improvement: 40 },
    { month: 'Month 6', placebo: 28, treatment: 78, improvement: 50 },
    { month: 'Month 12', placebo: 35, treatment: 85, improvement: 50 },
  ];

  const safetyData = [
    { severity: 'Mild', count: 45, percentage: 65 },
    { severity: 'Moderate', count: 20, percentage: 29 },
    { severity: 'Severe', count: 4, percentage: 6 },
  ];

  const biomarkerData = [
    { biomarker: 'HbA1c', baseline: 8.2, month3: 7.1, month6: 6.8, target: 7.0 },
    { biomarker: 'Glucose', baseline: 180, month3: 145, month6: 125, target: 130 },
    { biomarker: 'Weight', baseline: 85, month3: 80, month6: 78, target: 75 },
  ];

  const demographicData = [
    { name: 'Age 18-35', value: 25, color: 'hsl(var(--chart-efficacy))' },
    { name: 'Age 36-50', value: 35, color: 'hsl(var(--chart-safety))' },
    { name: 'Age 51-65', value: 30, color: 'hsl(var(--chart-biomarker))' },
    { name: 'Age 65+', value: 10, color: 'hsl(var(--chart-diversity))' },
  ];

  const riskScore = 23; // Low risk
  const efficacyScore = 78; // High efficacy
  const diversityScore = 85; // High diversity coverage

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Summary */}
      <Card className="shadow-elevated">
        <CardHeader className="bg-gradient-scientific text-white">
          <CardTitle className="text-2xl">{productName} - Clinical Simulation Results</CardTitle>
          <CardDescription className="text-gray-200">
            AI analysis across 10,247 synthetic patients for {targetCondition}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success mr-2" />
                <span className="text-3xl font-bold text-success">{efficacyScore}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Predicted Efficacy</p>
              <Badge variant="secondary" className="bg-success/10 text-success">High Success Probability</Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Shield className="w-8 h-8 text-warning mr-2" />
                <span className="text-3xl font-bold text-warning">{riskScore}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Safety Risk Score</p>
              <Badge variant="secondary" className="bg-warning/10 text-warning">Low Risk Profile</Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Users className="w-8 h-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-primary">{diversityScore}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Population Coverage</p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">Excellent Diversity</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results Tabs */}
      <Tabs defaultValue="efficacy" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="efficacy">Efficacy Analysis</TabsTrigger>
          <TabsTrigger value="safety">Safety Profile</TabsTrigger>
          <TabsTrigger value="biomarkers">Biomarker Response</TabsTrigger>
          <TabsTrigger value="demographics">Population Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="efficacy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Treatment vs Placebo Response
                </CardTitle>
                <CardDescription>
                  Primary endpoint improvement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={efficacyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="placebo" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
                    <Line type="monotone" dataKey="treatment" stroke="hsl(var(--primary))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Predictions</CardTitle>
                <CardDescription>AI-generated insights for your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">High efficacy in target population</p>
                    <p className="text-sm text-muted-foreground">78% response rate predicted vs 35% placebo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Optimal dosing identified</p>
                    <p className="text-sm text-muted-foreground">Peak efficacy at 150mg daily dose</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">Age-dependent response</p>
                    <p className="text-sm text-muted-foreground">Lower efficacy in patients over 65 years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sample Clinical Results Visualization</CardTitle>
              <CardDescription>Generated charts and clinical imagery</CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src={sampleResults} 
                alt="Clinical trial results visualization" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-warning" />
                  Adverse Events Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={safetyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="severity" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--chart-safety))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Safety Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Risk Score</span>
                    <span className="text-sm text-warning">{riskScore}% (Low)</span>
                  </div>
                  <Progress value={riskScore} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">No serious adverse events predicted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Low drug interaction potential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm">Monitor liver function in elderly patients</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="biomarkers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Biomarker Response Trends
              </CardTitle>
              <CardDescription>
                Key biomarkers tracked over treatment period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={[
                  { time: 'Baseline', HbA1c: 8.2, Glucose: 180, Weight: 85 },
                  { time: 'Month 1', HbA1c: 7.8, Glucose: 165, Weight: 83 },
                  { time: 'Month 3', HbA1c: 7.1, Glucose: 145, Weight: 80 },
                  { time: 'Month 6', HbA1c: 6.8, Glucose: 125, Weight: 78 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="HbA1c" stroke="hsl(var(--chart-efficacy))" strokeWidth={2} />
                  <Line type="monotone" dataKey="Glucose" stroke="hsl(var(--chart-safety))" strokeWidth={2} />
                  <Line type="monotone" dataKey="Weight" stroke="hsl(var(--chart-biomarker))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {demographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Diversity Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Ethnic Diversity</span>
                    <span className="text-sm text-primary">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Geographic Coverage</span>
                    <span className="text-sm text-primary">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Comorbidity Representation</span>
                    <span className="text-sm text-primary">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};