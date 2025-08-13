import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { ArrowLeft, MessageSquare, ArrowRight, Clock, AlertCircle } from "lucide-react";

interface CaseOpeningScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  caseData: any;
}

export function CaseOpeningScreen({ onNavigate, caseData }: CaseOpeningScreenProps) {
  const [questions, setQuestions] = useState<Array<{id: number, question: string, response: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  const caseContext = {
    title: "TechCorp Profitability Decline",
    description: "Our client, TechCorp, is a B2B software company that has experienced a 20% decline in profits over the past year. The CEO is concerned about the sustainability of the business and wants to understand what's driving this decline and how to address it.",
    basicFacts: "TechCorp serves mid-market companies with project management software. They have been in business for 8 years and traditionally maintained healthy profit margins."
  };

  const askQuestion = () => {
    if (currentQuestion.trim() && questions.length < (caseData?.maxClarifyingQuestions || 3)) {
      const newQuestion = {
        id: questions.length + 1,
        question: currentQuestion,
        response: generateResponse(currentQuestion)
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion("");
    }
  };

  const generateResponse = (question: string) => {
    // Simple response logic - in real app this would be more sophisticated
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('revenue') || lowerQ.includes('sales')) {
      return "TechCorp's revenue was $50M last year, down from $52M the previous year.";
    } else if (lowerQ.includes('cost') || lowerQ.includes('expense')) {
      return "We don't have detailed cost breakdowns available at this time.";
    } else if (lowerQ.includes('competitor') || lowerQ.includes('market')) {
      return "The project management software market has become increasingly competitive with new entrants.";
    } else if (lowerQ.includes('customer') || lowerQ.includes('client')) {
      return "TechCorp serves approximately 500 mid-market clients, with average contract values around $100K.";
    } else {
      return "We don't have that specific information available for this case.";
    }
  };

  const canProceed = questions.length >= 1 || timeElapsed >= 120; // At least 1 question or 2 minutes

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => onNavigate('case-config')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-sm">Case Opening</h2>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {questions.length}/{caseData?.maxClarifyingQuestions || 3} Questions
        </Badge>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Case Context */}
        <Card className="m-4 p-6 bg-primary/5 border-primary/20">
          <h3 className="text-primary mb-3">{caseContext.title}</h3>
          <p className="text-sm leading-relaxed mb-3">{caseContext.description}</p>
          <p className="text-sm text-muted-foreground">{caseContext.basicFacts}</p>
        </Card>

        {/* Instructions */}
        <div className="px-4 mb-4">
          <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <MessageSquare className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm mb-1">Take a moment to ask clarifying questions</p>
              <p className="text-xs text-muted-foreground">
                You have {(caseData?.maxClarifyingQuestions || 3) - questions.length} questions remaining or 2 minutes maximum
              </p>
            </div>
          </div>
        </div>

        {/* Questions and Responses */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {questions.map((q) => (
              <div key={q.id} className="space-y-2">
                <div className="flex justify-end">
                  <div className="max-w-[80%] p-3 bg-primary text-primary-foreground rounded-2xl rounded-tr-md">
                    <p className="text-sm">{q.question}</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 bg-card border rounded-2xl rounded-tl-md">
                    <p className="text-sm">{q.response}</p>
                    {q.response.includes("don't have that") && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>Information not available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Question Input */}
        <div className="p-4 border-t bg-card">
          {questions.length < (caseData?.maxClarifyingQuestions || 3) ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Type your clarifying question..."
                  onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                  className="flex-1 rounded-xl"
                />
                <Button 
                  onClick={askQuestion}
                  disabled={!currentQuestion.trim()}
                  className="bg-secondary hover:bg-secondary/90 rounded-xl px-6"
                >
                  Ask
                </Button>
              </div>
              <Button 
                onClick={() => onNavigate('case-structuring')}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                disabled={!canProceed}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Move to Structuring
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => onNavigate('case-structuring')}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Move to Structuring
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}