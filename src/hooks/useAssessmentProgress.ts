import { useState, useEffect } from 'react';

interface AssessmentProgress {
  currentSection: number;
  answers: Record<string, any>;
  businessContext?: Record<string, any>;
  timestamp: number;
  assessmentType: string;
}

export const useAssessmentProgress = (assessmentType: string) => {
  const [progress, setProgress] = useState<AssessmentProgress | null>(null);
  const storageKey = `assessment_progress_${assessmentType}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only restore if less than 24 hours old
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          setProgress(parsed);
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);

  const saveProgress = (data: Partial<AssessmentProgress>) => {
    const newProgress = {
      assessmentType,
      timestamp: Date.now(),
      ...data
    };
    
    localStorage.setItem(storageKey, JSON.stringify(newProgress));
    setProgress(newProgress as AssessmentProgress);
  };

  const clearProgress = () => {
    localStorage.removeItem(storageKey);
    setProgress(null);
  };

  const hasProgress = progress !== null;

  return {
    progress,
    saveProgress,
    clearProgress,
    hasProgress
  };
};