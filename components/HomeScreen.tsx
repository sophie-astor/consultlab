import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Play, Zap, MessageCircle, RotateCcw, Target, TrendingUp, Star } from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const weeklyGoal = { completed: 3, target: 5 };
  const progressPercentage = (weeklyGoal.completed / weeklyGoal.target) * 100;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto">
      {/* Header greeting */}
      <div className="pt-8 mb-8">
        <h1 className="text-2xl mb-2">Good morning, Alex!</h1>
        <p className="text-muted-foreground">
          Ready to ace your next case interview?
        </p>
      </div>

      {/* Weekly goal card */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-primary">Weekly Goal</h3>
          </div>
          <span className="text-sm text-muted-foreground">
            {weeklyGoal.completed}/{weeklyGoal.target} cases
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3 mb-3" />
        <p className="text-sm text-muted-foreground">
          {weeklyGoal.target - weeklyGoal.completed} more cases to reach your goal
        </p>
      </Card>

      {/* Main CTA */}
      <Button 
        onClick={() => onNavigate('case-config')}
        className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl mb-6 text-lg"
      >
        <Play className="w-6 h-6 mr-3" />
        Start a Case
      </Button>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2 rounded-xl border-2 hover:border-secondary hover:text-secondary"
          onClick={() => onNavigate('case-config')}
        >
          <Zap className="w-6 h-6" />
          <span className="text-sm">Quick Drill</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2 rounded-xl border-2 hover:border-secondary hover:text-secondary"
          onClick={() => onNavigate('case-config')}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm">Behavioral</span>
        </Button>
      </div>

      <Button 
        variant="outline" 
        className="w-full h-14 rounded-xl border-2 hover:border-accent hover:text-accent mb-8"
        onClick={() => onNavigate('case-config')}
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Resume Last Session
      </Button>

      {/* Recent performance */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Recent Performance</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('analytics')}
            className="text-secondary hover:text-secondary/80"
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm">Market Entry Case</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600">85%</p>
              <p className="text-xs text-muted-foreground">Good</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm">Profitability Analysis</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">78%</p>
              <p className="text-xs text-muted-foreground">Good</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}