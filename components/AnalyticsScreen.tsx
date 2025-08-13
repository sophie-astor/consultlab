import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ArrowLeft, TrendingUp, Target, Award, Calendar } from "lucide-react";

interface AnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

export function AnalyticsScreen({ onNavigate }: AnalyticsScreenProps) {
  const trendData = [
    { week: 'W1', score: 65 },
    { week: 'W2', score: 72 },
    { week: 'W3', score: 78 },
    { week: 'W4', score: 83 },
    { week: 'W5', score: 80 },
    { week: 'W6', score: 87 }
  ];

  const skillData = [
    { skill: 'Structure', score: 85 },
    { skill: 'Math', score: 78 },
    { skill: 'Communication', score: 92 },
    { skill: 'Synthesis', score: 80 }
  ];

  const caseTypeStats = [
    { type: 'Profitability', completed: 8, avg: 82 },
    { type: 'Market Sizing', completed: 5, avg: 76 },
    { type: 'M&A', completed: 3, avg: 79 },
    { type: 'Market Entry', completed: 4, avg: 84 },
    { type: 'Growth', completed: 2, avg: 73 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 border-b bg-card">
        <button onClick={() => onNavigate('home')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <h1 className="text-xl">Analytics</h1>
        <Button size="icon" variant="ghost">
          <Calendar className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl mb-1">22</p>
            <p className="text-xs text-muted-foreground">Cases Completed</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl mb-1">81%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl mb-1">5</p>
            <p className="text-xs text-muted-foreground">Week Streak</p>
          </Card>
        </div>

        {/* Progress trend */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Progress Trend
          </h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  domain={[50, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#002B5B" 
                  strokeWidth={3}
                  dot={{ fill: '#002B5B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            +22% improvement over 6 weeks
          </p>
        </Card>

        {/* Skill breakdown */}
        <Card className="p-6">
          <h3 className="mb-4">Skill Breakdown</h3>
          <div className="space-y-4">
            {skillData.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{skill.skill}</span>
                  <span className={`text-sm`} style={{ color: getScoreColor(skill.score) }}>
                    {skill.score}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${skill.score}%`,
                      backgroundColor: getScoreColor(skill.score)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Case type stats */}
        <Card className="p-6">
          <h3 className="mb-4">Case Type Performance</h3>
          <div className="space-y-3">
            {caseTypeStats.map((caseType) => (
              <div key={caseType.type} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm">{caseType.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {caseType.completed} cases completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ color: getScoreColor(caseType.avg) }}>
                    {caseType.avg}%
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {caseType.avg >= 80 ? 'Strong' : caseType.avg >= 70 ? 'Good' : 'Focus'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-accent/10 border-accent/20">
          <h3 className="mb-3">Recommended Focus Areas</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-sm">Improve mathematical accuracy (Current: 78%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm">Practice more Growth Strategy cases</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}