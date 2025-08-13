import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Download, Calculator, Lightbulb, BarChart3, TrendingDown, CheckCircle, X, MessageSquare } from "lucide-react";

interface CaseDrillDownScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  caseData: any;
}

export function CaseDrillDownScreen({ onNavigate, caseData }: CaseDrillDownScreenProps) {
  const [calculation, setCalculation] = useState("");
  const [insight, setInsight] = useState("");

  const [isCalculationCorrect, setIsCalculationCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const exhibitData = {
    revenue: {
      title: "TechCorp Revenue Breakdown (2022-2023)",
      type: "table",
      data: [
        { metric: "Total Revenue 2022", value: "$52M" },
        { metric: "Total Revenue 2023", value: "$50M" },
        { metric: "New Customer Revenue", value: "$15M (-10%)" },
        { metric: "Existing Customer Revenue", value: "$35M (-2%)" },
        { metric: "Average Contract Value", value: "$100K (flat)" },
        { metric: "Customer Count", value: "500 (-4%)" }
      ]
    },
    costs: {
      title: "Cost Structure Analysis",
      type: "chart",
      data: "Cost breakdown chart would be displayed here"
    }
  };

  const currentExhibit = exhibitData[(caseData?.analysisArea as keyof typeof exhibitData) || 'revenue'] || exhibitData.revenue;

  const checkCalculation = () => {
    // Simple math checking - in real app this would be more sophisticated
    const calc = calculation.toLowerCase();
    let expectedAnswer = 0;
    
    if (calc.includes('52') && calc.includes('50')) {
      expectedAnswer = 2; // Revenue decline of $2M
    } else if (calc.includes('revenue decline')) {
      expectedAnswer = 3.8; // 3.8% revenue decline
    }

    const userAnswer = parseFloat(calculation.match(/[\d.]+/)?.[0] || "0");
    const isCorrect = Math.abs(userAnswer - expectedAnswer) <= 0.5;
    

    setIsCalculationCorrect(isCorrect);
    setShowFeedback(true);
  };

  const proceedToNext = () => {
    if ((caseData?.drillDownRound || 1) < (caseData?.maxDrillDowns || 3)) {
      // Go to next drill-down round
      onNavigate('case-drill-down', { 
        ...caseData,
        drillDownRound: (caseData?.drillDownRound || 1) + 1 
      });
    } else {
      // Move to brainstorming phase
      onNavigate('case-brainstorming');
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => onNavigate('case-navigation')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-sm">Analysis Round {caseData?.drillDownRound || 1}</h2>
          <Badge variant="outline" className="text-xs mt-1">
            {caseData?.analysisArea || 'Revenue'} Deep Dive
          </Badge>
        </div>
        <Button size="icon" variant="ghost">
          <Download className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="exhibit" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 m-4 mb-0">
            <TabsTrigger value="exhibit" className="text-xs">
              <BarChart3 className="w-4 h-4 mr-1" />
              Exhibit
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs">
              <Calculator className="w-4 h-4 mr-1" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              <Lightbulb className="w-4 h-4 mr-1" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exhibit" className="flex-1 m-4 mt-2">
            <Card className="p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm">{currentExhibit.title}</h3>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              {currentExhibit.type === 'table' ? (
                <div className="space-y-3">
                  {currentExhibit.data.map((row: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">{row.metric}</span>
                      <span className={`text-sm ${
                        row.value.includes('-') ? 'text-red-600' : 
                        row.value.includes('+') ? 'text-green-600' : 
                        'text-foreground'
                      }`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive chart visualization</p>
                  </div>
                </div>
              )}

              <Alert className="mt-4 bg-primary/5 border-primary/20">
                <MessageSquare className="h-4 w-4 text-primary" />
                <AlertDescription className="text-primary">
                  "Walk me through what you're seeing in this data."
                </AlertDescription>
              </Alert>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="flex-1 m-4 mt-2 space-y-4">
            <Card className="p-4">
              <h4 className="text-sm mb-3">Your Calculations:</h4>
              <Textarea
                value={calculation}
                onChange={(e) => setCalculation(e.target.value)}
                placeholder="Show your math here...

Example:
Revenue decline = $52M - $50M = $2M
Percentage decline = ($2M / $52M) × 100 = 3.8%"
                className="h-32 resize-none border rounded-lg text-sm"
              />
              <Button 
                onClick={checkCalculation}
                disabled={!calculation.trim()}
                className="w-full mt-3 bg-secondary hover:bg-secondary/90 rounded-lg"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Check Calculation
              </Button>
            </Card>

            {showFeedback && (
              <Alert className={`${isCalculationCorrect ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <div className="flex items-center gap-2">
                  {isCalculationCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-yellow-600" />
                  )}
                  <AlertDescription className={isCalculationCorrect ? 'text-green-800' : 'text-yellow-800'}>
                    {isCalculationCorrect 
                      ? "Correct! Your calculation is accurate."
                      : "Close, but double-check your math. The revenue decline is $2M or 3.8%."}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="insights" className="flex-1 m-4 mt-2">
            <Card className="p-4 h-full">
              <h4 className="text-sm mb-3">What does this data tell you?</h4>
              <Textarea
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                placeholder="Share your insights...

What patterns do you see?
What hypotheses does this support or contradict?
What would you want to investigate next?"
                className="h-40 resize-none border rounded-lg text-sm"
              />
              
              <Alert className="mt-4 bg-accent/10 border-accent/20">
                <TrendingDown className="h-4 w-4 text-accent" />
                <AlertDescription>
                  <p className="text-sm">The data shows both customer count and revenue declining. What might be driving this trend?</p>
                </AlertDescription>
              </Alert>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="p-4 border-t bg-card">
          <Button 
            onClick={proceedToNext}
            disabled={!insight.trim() && !calculation.trim()}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            {(caseData?.drillDownRound || 1) < (caseData?.maxDrillDowns || 3) ? 'Next Analysis Area' : 'Move to Brainstorming'}
          </Button>
        </div>
      </div>
    </div>
  );
}