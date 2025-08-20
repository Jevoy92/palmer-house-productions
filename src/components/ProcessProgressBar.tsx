import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

interface ProcessStage {
  text: string;
  progress: number;
}

interface ProcessProgressBarProps {
  stepNumber: string;
  isActive: boolean;
  colorClass: string;
}

const processStages: Record<string, ProcessStage[]> = {
  "01": [
    { text: "Analyzing your content gaps...", progress: 25 },
    { text: "Mapping content strategy...", progress: 50 },
    { text: "Designing system blueprint...", progress: 75 },
    { text: "Defining success metrics...", progress: 100 }
  ],
  "02": [
    { text: "Setting up recording studio...", progress: 25 },
    { text: "Writing scripts & prompts...", progress: 50 },
    { text: "Coaching performance...", progress: 75 },
    { text: "Capturing modular content...", progress: 100 }
  ],
  "03": [
    { text: "Processing video footage...", progress: 25 },
    { text: "Editing & organizing content...", progress: 50 },
    { text: "Optimizing for channels...", progress: 75 },
    { text: "Deploying content system...", progress: 100 }
  ]
};

export const ProcessProgressBar = ({ stepNumber, isActive, colorClass }: ProcessProgressBarProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const stages = processStages[stepNumber] || [];

  useEffect(() => {
    if (!isActive || stages.length === 0) {
      setCurrentStage(0);
      setProgress(0);
      setIsComplete(false);
      return;
    }

    const animateProgress = () => {
      let stageIndex = 0;
      setIsComplete(false);

      const progressInterval = setInterval(() => {
        if (stageIndex >= stages.length) {
          setIsComplete(true);
          clearInterval(progressInterval);
          return;
        }

        setCurrentStage(stageIndex);
        setProgress(stages[stageIndex].progress);
        stageIndex++;
      }, 1250); // 5 seconds total / 4 stages = 1.25s per stage

      return () => clearInterval(progressInterval);
    };

    // Small delay to let the accordion animation complete
    const startDelay = setTimeout(animateProgress, 200);

    return () => {
      clearTimeout(startDelay);
    };
  }, [isActive, stages]);

  if (!isActive || stages.length === 0) return null;

  const getProgressColorClass = () => {
    switch (stepNumber) {
      case "01": return "[&>div]:bg-coral-light";
      case "02": return "[&>div]:bg-cinematic-indigo";
      case "03": return "[&>div]:bg-cinematic-cyan";
      default: return "[&>div]:bg-primary";
    }
  };

  return (
    <div className="mb-6 p-4 bg-white/50 rounded-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-social-green' : 'bg-gray-300'} ${!isComplete ? 'animate-pulse' : ''}`} />
        <span className="text-sm font-medium text-corporate-dark">
          {isComplete ? "Process Complete!" : stages[currentStage]?.text || "Initializing..."}
        </span>
      </div>
      <Progress 
        value={progress} 
        className={`h-2 ${getProgressColorClass()}`}
      />
      <div className="mt-2 text-xs text-gray-500">
        {progress}% Complete
      </div>
    </div>
  );
};