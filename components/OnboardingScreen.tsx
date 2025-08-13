import { Button } from "./ui/button";
import { useState } from "react";
import { Mic, Video, MessageSquare, Target, Zap } from "lucide-react";

interface OnboardingScreenProps {
  onNavigate: (screen: string) => void;
}

export function OnboardingScreen({ onNavigate }: OnboardingScreenProps) {
  const [selectedMode, setSelectedMode] = useState<'text' | 'voice' | 'video'>('text');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <Target className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl text-primary mb-2">CaseCoach</h1>
        <p className="text-muted-foreground">Master consulting interviews with AI</p>
      </div>

      {/* Welcome text */}
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-3">Welcome to your personal interview coach</h2>
        <p className="text-muted-foreground leading-relaxed">
          Practice case interviews, behavioral questions, and build confidence with personalized feedback.
        </p>
      </div>

      {/* Mode toggle buttons */}
      <div className="mb-8 w-full">
        <p className="text-sm mb-3 text-center text-muted-foreground">Choose your practice mode</p>
        <div className="flex bg-card rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setSelectedMode('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
              selectedMode === 'text' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Text</span>
          </button>
          <button
            onClick={() => setSelectedMode('voice')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
              selectedMode === 'voice' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span className="text-sm">Voice</span>
          </button>
          <button
            onClick={() => setSelectedMode('video')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
              selectedMode === 'video' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Video className="w-4 h-4" />
            <span className="text-sm">Video</span>
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full space-y-4">
        <Button 
          onClick={() => onNavigate('home')}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          <Target className="w-5 h-5 mr-2" />
          Set Goal
        </Button>
        
        <Button 
          onClick={() => onNavigate('case-config')}
          variant="outline" 
          className="w-full h-14 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-xl"
        >
          <Zap className="w-5 h-5 mr-2" />
          Start Practice Now
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8">
        Join thousands of consultants who've landed their dream job
      </p>
    </div>
  );
}