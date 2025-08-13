import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, Target, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";

interface CaseSynthesisScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  caseData: any;
}

export function CaseSynthesisScreen({ onNavigate, caseData }: CaseSynthesisScreenProps) {
  const [recommendation, setRecommendation] = useState("");
  const [supportingPoint1, setSupportingPoint1] = useState("");
  const [supportingPoint2, setSupportingPoint2] = useState("");
  const [supportingPoint3, setSupportingPoint3] = useState("");
  const [risks, setRisks] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 180) return "text-green-600";
    if (timeLeft > 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getCompletionStatus = () => {
    const fields = [recommendation, supportingPoint1, supportingPoint2, risks, nextSteps];
    const completed = fields.filter(field => field.trim().length > 0).length;
    return { completed, total: fields.length };
  };

  const canProceed = () => {
    return recommendation.trim() && 
           supportingPoint1.trim() && 
           supportingPoint2.trim() && 
           risks.trim() && 
           nextSteps.trim();
  };

  const { completed, total } = getCompletionStatus();

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => onNavigate('case-brainstorming')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-sm">Final Recommendation</h2>
          <div className={`flex items-center gap-1 text-sm ${getTimerColor()}`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {completed}/{total}
        </Badge>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        {/* Instructions */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-primary mb-2">Structure Your Recommendation</h3>
              <p className="text-sm text-muted-foreground">
                Provide a clear, actionable recommendation with supporting rationale, risks, and next steps.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex-1 space-y-4 overflow-y-auto">
          {/* Main Recommendation */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm">Primary Recommendation</h4>
              {recommendation.trim() && <CheckCircle className="w-4 h-4 text-green-600" />}
            </div>
            <Textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="What is your primary recommendation to address TechCorp's profitability decline?

Example: 'I recommend TechCorp focus on customer retention through enhanced support and product improvements...'"
              className="h-20 resize-none border rounded-lg text-sm"
            />
          </Card>

          {/* Supporting Points */}
          <Card className="p-4">
            <h4 className="text-sm mb-3">Supporting Evidence (2-3 points)</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">Point 1</span>
                  {supportingPoint1.trim() && <CheckCircle className="w-3 h-3 text-green-600" />}
                </div>
                <Textarea
                  value={supportingPoint1}
                  onChange={(e) => setSupportingPoint1(e.target.value)}
                  placeholder="First supporting point with data/evidence..."
                  className="h-16 resize-none border rounded-lg text-sm"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">Point 2</span>
                  {supportingPoint2.trim() && <CheckCircle className="w-3 h-3 text-green-600" />}
                </div>
                <Textarea
                  value={supportingPoint2}
                  onChange={(e) => setSupportingPoint2(e.target.value)}
                  placeholder="Second supporting point with data/evidence..."
                  className="h-16 resize-none border rounded-lg text-sm"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">Point 3 (Optional)</span>
                  {supportingPoint3.trim() && <CheckCircle className="w-3 h-3 text-green-600" />}
                </div>
                <Textarea
                  value={supportingPoint3}
                  onChange={(e) => setSupportingPoint3(e.target.value)}
                  placeholder="Third supporting point (optional)..."
                  className="h-16 resize-none border rounded-lg text-sm"
                />
              </div>
            </div>
          </Card>

          {/* Risks & Next Steps */}
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="text-sm">Key Risks</h5>
                  {risks.trim() && <CheckCircle className="w-4 h-4 text-green-600" />}
                </div>
                <Textarea
                  value={risks}
                  onChange={(e) => setRisks(e.target.value)}
                  placeholder="What are the main risks of your recommendation?"
                  className="h-16 resize-none border rounded-lg text-sm"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="text-sm">Next Steps</h5>
                  {nextSteps.trim() && <CheckCircle className="w-4 h-4 text-green-600" />}
                </div>
                <Textarea
                  value={nextSteps}
                  onChange={(e) => setNextSteps(e.target.value)}
                  placeholder="What immediate actions should TechCorp take?"
                  className="h-16 resize-none border rounded-lg text-sm"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Warnings */}
        {timeLeft <= 60 && timeLeft > 0 && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <p className="text-sm">One minute remaining! Focus on completing your core recommendation.</p>
            </AlertDescription>
          </Alert>
        )}

        {timeLeft === 0 && (
          <Alert className="bg-red-50 border-red-200">
            <Clock className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <p className="text-sm">Time's up! You can still refine your recommendation before submitting.</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Proceed Button */}
        <Button 
          onClick={() => onNavigate('case-feedback-moment', { 
            phase: 'synthesis',
            recommendation,
            supportingPoints: [supportingPoint1, supportingPoint2, supportingPoint3].filter(p => p.trim()),
            risks,
            nextSteps
          })}
          disabled={!canProceed()}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Submit Final Recommendation
        </Button>

        {!canProceed() && (
          <p className="text-xs text-muted-foreground text-center">
            Complete all required fields to submit your recommendation
          </p>
        )}
      </div>
    </div>
  );
}