import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { ArrowLeft, Send, Mic, BarChart3, FileText, Clock } from "lucide-react";

interface LiveCaseScreenProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: number;
  sender: 'interviewer' | 'candidate';
  content: string;
  timestamp: string;
}

export function LiveCaseScreen({ onNavigate }: LiveCaseScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'interviewer',
      content: "Welcome to the case interview. Today we'll be working on a profitability decline case. Our client is TechCorp, a software company that has seen a 20% decline in profits over the past year. How would you approach this problem?",
      timestamp: "9:00 AM"
    },
    {
      id: 2,
      sender: 'candidate',
      content: "Thank you. I'd like to structure my approach by first understanding the profit equation: Profit = Revenue - Costs. I'll examine both revenue and cost factors that could be driving this decline. May I ask a few clarifying questions first?",
      timestamp: "9:01 AM"
    },
    {
      id: 3,
      sender: 'interviewer',
      content: "Excellent structure. Yes, please go ahead with your questions.",
      timestamp: "9:01 AM"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [scratchpadContent, setScratchpadContent] = useState("Profit = Revenue - Costs\n\nRevenue factors:\n- Customer acquisition\n- Pricing\n- Product mix\n\nCost factors:\n- Fixed costs\n- Variable costs\n- One-time expenses");
  const [timeElapsed] = useState("15:30");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'candidate',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate interviewer response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: 'interviewer',
          content: "Good question. Let me provide you with some additional data...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => onNavigate('feedback')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-sm">TechCorp Profitability</h2>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{timeElapsed}</span>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="destructive"
          onClick={() => onNavigate('feedback')}
          className="text-xs"
        >
          End Case
        </Button>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Main content area */}
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 m-4 mb-0">
            <TabsTrigger value="chat" className="text-xs">
              <FileText className="w-4 h-4 mr-1" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="exhibits" className="text-xs">
              <BarChart3 className="w-4 h-4 mr-1" />
              Exhibits
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs">
              <FileText className="w-4 h-4 mr-1" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col m-4 mt-2">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'candidate'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'candidate' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="exhibits" className="flex-1 m-4 mt-2">
            <Card className="p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">Revenue Breakdown Chart</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive charts and data exhibits will appear here during the case.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="flex-1 m-4 mt-2">
            <Textarea
              value={scratchpadContent}
              onChange={(e) => setScratchpadContent(e.target.value)}
              placeholder="Take notes and work through calculations here..."
              className="h-full resize-none border-2 rounded-xl"
            />
          </TabsContent>
        </Tabs>

        {/* Message input */}
        <div className="p-4 border-t bg-card">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your response..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded-xl"
            />
            <Button size="icon" variant="outline" className="rounded-xl">
              <Mic className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              onClick={sendMessage}
              className="bg-primary hover:bg-primary/90 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}