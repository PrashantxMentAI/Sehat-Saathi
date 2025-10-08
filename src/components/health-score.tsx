
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateGamificationMessage, type GamificationInput, type GamificationOutput } from "@/ai/flows/gamification-flow";
import { Skeleton } from "@/components/ui/skeleton";

export function HealthScore() {
  const [healthPoints, setHealthPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [rewardMessage, setRewardMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching initial health points
    const initialPoints = Math.floor(Math.random() * 100);
    setHealthPoints(initialPoints);
    setLevel(Math.floor(initialPoints / 100) + 1);
  }, []);

  const handleGenerateMessage = async () => {
    setIsLoading(true);
    setRewardMessage("");
    try {
      const result = await generateGamificationMessage({ healthPoints });
      setRewardMessage(result.gamificationMessage);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate reward message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addPoints = () => {
    setHealthPoints(prev => prev + 25);
  };

  useEffect(() => {
    setLevel(Math.floor(healthPoints / 100) + 1);
  }, [healthPoints]);

  return (
    <Card className="shadow-lg rounded-lg bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-green-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Award className="text-yellow-500" />
          Your Health Score
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="text-5xl font-bold text-primary">{healthPoints}</div>
          <div className="text-lg text-muted-foreground">Points</div>
        </div>
        <p className="font-semibold">Level: {level}</p>

        {isLoading && (
          <div className="flex items-center justify-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        )}
        
        {rewardMessage && (
          <p className="text-lg font-semibold text-green-600 animate-in fade-in-50">
            {rewardMessage}
          </p>
        )}

        <div className="flex gap-4 justify-center">
            <Button onClick={handleGenerateMessage} disabled={isLoading}>
                <Zap className="mr-2 h-4 w-4" />
                Generate Reward
            </Button>
            <Button onClick={addPoints} variant="secondary">
                Add 25 Points
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
