import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState } from "react";
import { ArrowLeft, ArrowRight, MessageSquare, Compass, TrendingUp, Users, DollarSign, Settings } from "lucide-react";

interface CaseNavigationScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  caseData: any;
}

export function CaseNavigationScreen({ onNavigate, caseData }: CaseNavigationScreenProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [showNudge, setShowNudge] = useState(false);

  const interviewerMessage = "Great framework! Now, where would you like to start your analysis? I can provide data in any of these areas.";

  const analysisAreas = [
    {
      id: 'revenue',
      title: 'Revenue Analysis',
      description: 'Customer metrics, pricing, market share',
      icon: DollarSign,
      recommended: true
    },
    {
      id: 'costs',
      title: 'Cost Structure',
      description: 'Fixed costs, variable costs, operational efficiency',
      icon: TrendingUp,
      recommended: false
    },
    {
      id: 'market',
      title: 'Market Dynamics',
      description: 'Competition, market trends, external factors',
      icon: Compass,
      recommended: false
    },
    {
      id: 'operations',
      title: 'Operations & Processes',
      description: 'Internal processes, technology, workforce',
      icon: Settings,
      recommended: false
    },
    {
      id: 'customers',
      title: 'Customer Analysis',
      description: 'Customer satisfaction, retention, acquisition',
      icon: Users,
      recommended: true
    }
  ];

  const handleAreaSelection = (areaId: string) => {
    setSelectedArea(areaId);
    
    // Show nudge if they select a less optimal starting point
    if (areaId === 'operations' || areaId === 'market') {
      setShowNudge(true);
    } else {
      setShowNudge(false);
    }
  };

  const proceedToAnalysis = () => {
    if (selectedArea) {
      onNavigate('case-drill-down', { 
        analysisArea: selectedArea,
        drillDownRound: 1 
      });
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => onNavigate('case-structuring')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-sm">Case Navigation</h2>
          <Badge variant="outline" className="text-xs mt-1">
            Choose Starting Point
          </Badge>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        {/* Interviewer Message */}
        <Card className="p-4 bg-card border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed">{interviewerMessage}</p>
            </div>
          </div>
        </Card>

        {/* Gentle Nudge */}
        {showNudge && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <Compass className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <p className="text-sm">
                That's an interesting choice. Have you considered starting with revenue or customer metrics first? 
                They might give you more immediate insights into the profit decline.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Analysis Areas */}
        <div className="space-y-3 flex-1">
          <h3 className="text-sm text-muted-foreground">Where would you like to start?</h3>
          
          {analysisAreas.map((area) => {
            const IconComponent = area.icon;
            return (
              <Card 
                key={area.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedArea === area.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                }`}
                onClick={() => handleAreaSelection(area.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedArea === area.id 
                      ? 'bg-primary/20' 
                      : 'bg-muted'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      selectedArea === area.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm">{area.title}</h4>
                      {area.recommended && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Proceed Button */}
        <Button 
          onClick={proceedToAnalysis}
          disabled={!selectedArea}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Start Analysis
        </Button>

        {!selectedArea && (
          <p className="text-xs text-muted-foreground text-center">
            Select an area to begin your analysis
          </p>
        )}
      </div>
    </div>
  );
}