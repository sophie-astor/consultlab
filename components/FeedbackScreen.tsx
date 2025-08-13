import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowLeft, Save, Share, RotateCcw, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

interface FeedbackScreenProps {
  onNavigate: (screen: string) => void;
}

export function FeedbackScreen({ onNavigate }: FeedbackScreenProps) {
  const scores = {
    structure: 85,
    math: 78,
    communication: 92,
    synthesis: 80
  };
  
  const overallScore = Math.round((scores.structure + scores.math + scores.communication + scores.synthesis) / 4);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getGrade = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 border-b bg-card">
        <button onClick={() => onNavigate('home')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <h1 className="text-xl">Case Feedback</h1>
        <Button size="icon" variant="ghost">
          <Share className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Overall Score */}
          <Card className="p-6 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-primary">{overallScore}</span>
            </div>
            <h2 className="text-2xl mb-2">{getGrade(overallScore)}</h2>
            <p className="text-muted-foreground">
              TechCorp Profitability Case • 18 minutes
            </p>
          </Card>

          {/* Score Breakdown */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Score Breakdown
            </h3>
            
            <div className="space-y-4">
              {Object.entries(scores).map(([category, score]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="capitalize text-sm">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className={`text-sm ${getScoreColor(score)}`}>
                      {score}% • {getGrade(score)}
                    </span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Strengths */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              Strengths
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm">Excellent problem structuring</p>
                  <p className="text-xs text-muted-foreground">
                    Used the profit equation framework effectively
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm">Clear communication style</p>
                  <p className="text-xs text-muted-foreground">
                    Maintained good pacing and clarity throughout
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm">Good hypothesis formation</p>
                  <p className="text-xs text-muted-foreground">
                    Developed logical hypotheses for profit decline
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Areas for Improvement */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-orange-700">
              <AlertCircle className="w-5 h-5" />
              Areas for Improvement
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm">Mathematical accuracy</p>
                  <p className="text-xs text-muted-foreground">
                    Double-check calculations before presenting results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm">Data synthesis</p>
                  <p className="text-xs text-muted-foreground">
                    Practice connecting insights across different data points
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recommended Practice */}
          <Card className="p-6 bg-accent/10 border-accent/20">
            <h3 className="mb-3">Recommended Next Steps</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                Math Drills
              </Badge>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                Market Sizing
              </Badge>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                BCG Style
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Focus on mathematical accuracy with targeted practice sessions
            </p>
          </Card>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              onClick={() => onNavigate('home')}
            >
              <Save className="w-5 h-5 mr-2" />
              Save Case & Return Home
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-xl"
              onClick={() => onNavigate('case-config')}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Practice Similar Case
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}