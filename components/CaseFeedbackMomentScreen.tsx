import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";
import { ArrowRight, Star, TrendingUp, CheckCircle, AlertCircle, Lightbulb, Target } from "lucide-react";

interface CaseFeedbackMomentScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  caseData: any;
}

export function CaseFeedbackMomentScreen({ onNavigate, caseData }: CaseFeedbackMomentScreenProps) {
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // Animate score appearance
    const timer = setTimeout(() => setShowScore(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getFeedbackForPhase = () => {
    switch (caseData?.phase) {
      case 'structuring':
        return {
          title: "Framework Assessment",
          score: caseData?.score || 78,
          maxScore: 100,
          feedback: caseData?.feedback || "Good framework structure with clear logic flow",
          strengths: [
            "Used profit equation effectively",
            "Considered both internal and external factors",
            "Framework appears MECE"
          ],
          improvements: [
            "Could add more detail on customer segmentation",
            "Consider operational efficiency factors"
          ],
          nextPhase: "case-navigation"
        };
      case 'synthesis':
        return {
          title: "Recommendation Quality",
          score: 85,
          maxScore: 100,
          feedback: "Clear recommendation with solid supporting evidence",
          strengths: [
            "Well-structured recommendation",
            "Good use of data to support points",
            "Considered implementation risks"
          ],
          improvements: [
            "Could quantify expected impact",
            "Timeline for implementation could be clearer"
          ],
          nextPhase: "feedback"
        };
      default:
        return {
          title: "Phase Complete",
          score: 80,
          maxScore: 100,
          feedback: "Good progress through this phase",
          strengths: ["Clear thinking", "Good use of data"],
          improvements: ["Consider additional angles"],
          nextPhase: "case-navigation"
        };
    }
  };

  const feedbackData = getFeedbackForPhase();
  const scorePercentage = (feedbackData.score / feedbackData.maxScore) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 80) return { text: "Strong", color: "bg-green-100 text-green-800" };
    if (score >= 70) return { text: "Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 60) return { text: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Needs Work", color: "bg-red-100 text-red-800" };
  };

  const scoreBadge = getScoreBadge(feedbackData.score);

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b bg-card">
        <div className="text-center">
          <h2 className="text-lg">Instant Feedback</h2>
          <p className="text-sm text-muted-foreground">{feedbackData.title}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 space-y-6">
        {/* Score Display */}
        <Card className="p-6 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="space-y-4">
            {showScore && (
              <>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className={`text-3xl ${getScoreColor(feedbackData.score)}`}>
                    {feedbackData.score}
                  </span>
                </div>
                <div>
                  <Badge className={`${scoreBadge.color} mb-2`}>
                    {scoreBadge.text}
                  </Badge>
                  <Progress value={scorePercentage} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {feedbackData.feedback}
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Strengths */}
        {showScore && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-green-700">What You Did Well</h3>
            </div>
            <div className="space-y-2">
              {feedbackData.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Areas for Improvement */}
        {showScore && feedbackData.improvements.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-orange-600" />
              <h3 className="text-orange-700">Areas to Develop</h3>
            </div>
            <div className="space-y-2">
              {feedbackData.improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                  <span className="text-sm">{improvement}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Continue Button */}
        {showScore && (
          <Button 
            onClick={() => onNavigate(feedbackData.nextPhase)}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Continue Case
          </Button>
        )}
      </div>
    </div>
  );
}