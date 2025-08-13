import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { useState } from "react";
import { Upload, FileText, CheckCircle, ArrowRight, X } from "lucide-react";

interface LibraryUploadScreenProps {
  onNavigate: (screen: string) => void;
}

export function LibraryUploadScreen({ onNavigate }: LibraryUploadScreenProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [parsedTopics] = useState([
    "Profitability Analysis - Tech Startup",
    "Market Entry - Southeast Asia",
    "Cost Reduction - Manufacturing",
    "M&A Due Diligence - Retail Chain",
    "Market Sizing - Electric Vehicles",
    "Growth Strategy - SaaS Platform"
  ]);

  const handleUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-6">
        <button onClick={() => onNavigate('onboarding')} className="p-2">
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
        <h1 className="text-xl">Library Upload</h1>
        <div className="w-10" />
      </div>

      {/* Upload area */}
      <Card className="border-2 border-dashed border-muted mb-6 p-8 text-center">
        {!isUploaded ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="mb-2">Upload your case materials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                PDF, Word docs, or text files with case studies
              </p>
              <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90 rounded-xl">
                Choose Files
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-green-700 mb-2">Upload Complete!</h3>
              <p className="text-sm text-muted-foreground">
                Successfully parsed {parsedTopics.length} case studies
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Progress bar */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Parsing documents...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {/* Parsed topics list */}
      {isUploaded && (
        <div className="mb-8">
          <h3 className="mb-4">Parsed Case Topics</h3>
          <div className="space-y-3">
            {parsedTopics.map((topic, index) => (
              <Card key={index} className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{topic}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Continue button */}
      {isUploaded && (
        <Button 
          onClick={() => onNavigate('home')}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          Continue to Home
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
}