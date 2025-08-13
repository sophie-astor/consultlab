import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { useState } from "react";
import { ArrowLeft, Play, Settings } from "lucide-react";

interface CaseConfigScreenProps {
  onNavigate: (screen: string) => void;
}

export function CaseConfigScreen({ onNavigate }: CaseConfigScreenProps) {
  const [caseType, setCaseType] = useState("");
  const [interviewerStyle, setInterviewerStyle] = useState("");
  const [difficulty, setDifficulty] = useState([3]);


  const getDifficultyLabel = (value: number) => {
    if (value <= 2) return "Beginner";
    if (value <= 4) return "Intermediate";
    return "Advanced";
  };

  const canBegin = caseType && interviewerStyle;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-6">
        <button onClick={() => onNavigate('home')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <h1 className="text-xl">Case Setup</h1>
        <Settings className="w-6 h-6 text-muted-foreground" />
      </div>

      <div className="space-y-6">
        {/* Case Type */}
        <Card className="p-6">
          <Label className="text-base mb-3 block">Case Type</Label>
          <Select value={caseType} onValueChange={setCaseType}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Choose a case type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profitability">Profitability Analysis</SelectItem>
              <SelectItem value="market-sizing">Market Sizing</SelectItem>
              <SelectItem value="ma">M&A Due Diligence</SelectItem>
              <SelectItem value="market-entry">Market Entry</SelectItem>
              <SelectItem value="growth">Growth Strategy</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Interview Format */}
        <Card className="p-6">
          <Label className="text-base mb-3 block">Interview Format</Label>
          <Select value={interviewerStyle} onValueChange={setInterviewerStyle}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Choose interview format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interviewee-driven">Interviewee Driven</SelectItem>
              <SelectItem value="interviewer-driven">Interviewer Driven</SelectItem>
              <SelectItem value="random">Random</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Difficulty */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base">Difficulty Level</Label>
            <span className="text-sm text-primary">{getDifficultyLabel(difficulty[0])}</span>
          </div>
          <Slider
            value={difficulty}
            onValueChange={setDifficulty}
            max={5}
            min={1}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>Advanced</span>
          </div>
        </Card>



        {/* Begin button */}
        <Button 
          onClick={() => onNavigate('case-opening')}
          disabled={!canBegin}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl disabled:opacity-50"
        >
          <Play className="w-5 h-5 mr-2" />
          Begin Case Interview
        </Button>

        {!canBegin && (
          <p className="text-sm text-muted-foreground text-center">
            Please select case type and interviewer style to continue
          </p>
        )}
      </div>
    </div>
  );
}