import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, Lightbulb, CheckCircle, AlertTriangle } from "lucide-react";

interface CaseStructuringScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  caseData: any;
}

export function CaseStructuringScreen({ onNavigate, caseData }: CaseStructuringScreenProps) {
  const [framework, setFramework] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [showHints, setShowHints] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const analyzeFramework = () => {
    // Simple framework analysis - in real app this would be more sophisticated
    const content = framework.toLowerCase();
    let score = 0;

    // Check for structure keywords
    if (content.includes('revenue') || content.includes('sales')) score += 20;
    if (content.includes('cost') || content.includes('expense')) score += 20;
    if (content.includes('profit') || content.includes('margin')) score += 15;
    if (content.includes('market') || content.includes('competition')) score += 15;
    if (content.includes('customer') || content.includes('client')) score += 15;
    if (content.includes('operation') || content.includes('process')) score += 15;

    // Check for MECE structure
    const hasBullets = content.includes('•') || content.includes('-') || content.includes('1.');
    if (hasBullets) score += 10;


    
    // Show feedback moment
    setTimeout(() => {
      onNavigate('case-feedback-moment', { 
        phase: 'structuring', 
        score: Math.min(score, 100),
        feedback: score >= 70 ? 'Strong framework with clear structure' : 'Good start, consider adding more detail to your framework'
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 120) return "text-green-600";
    if (timeLeft > 60) return "text-yellow-600";
    return "text-red-600";
  };

  const hints = [
    "Consider the profit equation: Profit = Revenue - Costs",
    "Think about external factors (market, competition) and internal factors (operations, costs)",
    "Ensure your framework is MECE (Mutually Exclusive, Collectively Exhaustive)",
    "Consider both short-term and long-term factors affecting profitability"
  ];

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => onNavigate('case-opening')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-sm">Structuring Phase</h2>
          <div className={`flex items-center gap-1 text-sm ${getTimerColor()}`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => setShowHints(!showHints)}
        >
          Hints
        </Button>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        {/* Instructions */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-primary mb-2">Structure Your Approach</h3>
              <p className="text-sm text-muted-foreground">
                Develop a framework to analyze TechCorp's profitability decline. Think about what could be causing the 20% profit drop.
              </p>
            </div>
          </div>
        </Card>

        {/* Hints */}
        {showHints && (
          <Alert className="bg-accent/10 border-accent/20">
            <Lightbulb className="h-4 w-4 text-accent" />
            <AlertDescription>
              <div className="space-y-1">
                {hints.map((hint, index) => (
                  <p key={index} className="text-sm">• {hint}</p>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* MECE Check */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <span className="text-sm">Is your framework MECE?</span>
          <Badge variant="outline" className="text-xs">
            Mutually Exclusive, Collectively Exhaustive
          </Badge>
        </div>

        {/* Framework Input */}
        <div className="flex-1">
          <label className="text-sm mb-2 block">Your Framework:</label>
          <Textarea
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            placeholder="Outline your approach to analyzing the profitability decline...

Example:
1. Revenue Analysis
   • Customer retention
   • Pricing changes
   • Market share

2. Cost Analysis
   • Fixed vs variable costs
   • Operational efficiency

3. External Factors
   • Market conditions
   • Competition"
            className="h-full min-h-[300px] resize-none border-2 rounded-xl text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {framework.length > 50 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Framework looks comprehensive</span>
            </div>
          )}
          
          {timeLeft === 0 && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Time's up! You can still refine your framework or proceed to present it.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={analyzeFramework}
            disabled={framework.length < 20}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Present Framework
          </Button>
          
          {framework.length < 20 && (
            <p className="text-xs text-muted-foreground text-center">
              Add more detail to your framework to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}