import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Plus, X, Lightbulb, Move, MessageSquare } from "lucide-react";

interface CaseBrainstormingScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  caseData: any;
}

interface Idea {
  id: number;
  text: string;
  category: string | null;
}

export function CaseBrainstormingScreen({ onNavigate, caseData }: CaseBrainstormingScreenProps) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState("");
  const [categories] = useState([
    { id: 'revenue', name: 'Revenue Initiatives', color: 'bg-blue-100 text-blue-800' },
    { id: 'cost', name: 'Cost Reduction', color: 'bg-green-100 text-green-800' },
    { id: 'operational', name: 'Operational Improvements', color: 'bg-purple-100 text-purple-800' },
    { id: 'strategic', name: 'Strategic Changes', color: 'bg-orange-100 text-orange-800' }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const brainstormingPrompt = "Based on your analysis, what are potential solutions to address TechCorp's profitability decline? Think broadly - consider revenue growth, cost reduction, and operational improvements.";

  const addIdea = () => {
    if (newIdea.trim()) {
      const idea: Idea = {
        id: ideas.length + 1,
        text: newIdea.trim(),
        category: selectedCategory
      };
      setIdeas([...ideas, idea]);
      setNewIdea("");
    }
  };

  const removeIdea = (id: number) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const moveIdeaToCategory = (ideaId: number, categoryId: string | null) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId ? { ...idea, category: categoryId } : idea
    ));
  };

  const getCategoryIdeas = (categoryId: string) => {
    return ideas.filter(idea => idea.category === categoryId);
  };

  const getUncategorizedIdeas = () => {
    return ideas.filter(idea => !idea.category);
  };

  const canProceed = ideas.length >= 3;

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => onNavigate('case-drill-down')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-sm">Brainstorming</h2>
          <Badge variant="outline" className="text-xs mt-1">
            {ideas.length} ideas generated
          </Badge>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        {/* Prompt */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
            <p className="text-sm leading-relaxed">{brainstormingPrompt}</p>
          </div>
        </Card>

        {/* Idea Input */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                placeholder="Add a solution idea..."
                onKeyDown={(e) => e.key === 'Enter' && addIdea()}
                className="flex-1 rounded-lg"
              />
              <Button 
                onClick={addIdea}
                disabled={!newIdea.trim()}
                size="icon"
                className="bg-secondary hover:bg-secondary/90 rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="text-xs rounded-full"
              >
                No Category
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  size="sm"
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Ideas Organization */}
        <div className="flex-1 space-y-4">
          {/* Uncategorized Ideas */}
          {getUncategorizedIdeas().length > 0 && (
            <Card className="p-4">
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Unsorted Ideas
              </h4>
              <div className="space-y-2">
                {getUncategorizedIdeas().map(idea => (
                  <div key={idea.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <span className="flex-1 text-sm">{idea.text}</span>
                    <div className="flex gap-1">
                      {categories.map(category => (
                        <Button
                          key={category.id}
                          size="sm"
                          variant="ghost"
                          onClick={() => moveIdeaToCategory(idea.id, category.id)}
                          className="h-6 px-2 text-xs"
                        >
                          <Move className="w-3 h-3" />
                        </Button>
                      ))}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeIdea(idea.id)}
                        className="h-6 px-2 text-red-600 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Categorized Ideas */}
          {categories.map(category => {
            const categoryIdeas = getCategoryIdeas(category.id);
            if (categoryIdeas.length === 0) return null;

            return (
              <Card key={category.id} className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`text-xs ${category.color}`}>
                    {category.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {categoryIdeas.length} ideas
                  </span>
                </div>
                <div className="space-y-2">
                  {categoryIdeas.map(idea => (
                    <div key={idea.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                      <span className="flex-1 text-sm">{idea.text}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveIdeaToCategory(idea.id, null)}
                        className="h-6 px-2"
                      >
                        <Move className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeIdea(idea.id)}
                        className="h-6 px-2 text-red-600 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Progress Indicator */}
        {ideas.length > 0 && ideas.length < 3 && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <p className="text-sm">
                Good start! Add {3 - ideas.length} more ideas to develop a comprehensive solution set.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Proceed Button */}
        <Button 
          onClick={() => onNavigate('case-synthesis', { ideas })}
          disabled={!canProceed}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Synthesize Recommendation
        </Button>

        {!canProceed && (
          <p className="text-xs text-muted-foreground text-center">
            Generate at least 3 ideas to proceed to synthesis
          </p>
        )}
      </div>
    </div>
  );
}