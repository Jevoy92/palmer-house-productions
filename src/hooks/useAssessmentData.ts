import { useState, useEffect } from 'react';

interface AssessmentResult {
  type: string;
  score: number;
  level: string;
  completedAt: number;
  businessContext: any;
  answers: any;
  recommendations: string[];
}

export const useAssessmentData = () => {
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = () => {
    const saved = localStorage.getItem('completed_assessments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filter out assessments older than 30 days
        const recent = parsed.filter((a: AssessmentResult) => 
          Date.now() - a.completedAt < 30 * 24 * 60 * 60 * 1000
        );
        setAssessments(recent);
        
        // Update localStorage with filtered data
        if (recent.length !== parsed.length) {
          localStorage.setItem('completed_assessments', JSON.stringify(recent));
        }
      } catch {
        localStorage.removeItem('completed_assessments');
      }
    }
  };

  const saveAssessment = (result: AssessmentResult) => {
    const updatedAssessments = [
      ...assessments.filter(a => a.type !== result.type), // Remove any existing assessment of same type
      result
    ];
    
    setAssessments(updatedAssessments);
    localStorage.setItem('completed_assessments', JSON.stringify(updatedAssessments));
  };

  const getAssessment = (type: string): AssessmentResult | undefined => {
    return assessments.find(a => a.type === type);
  };

  const hasCompletedAssessment = (type: string): boolean => {
    return assessments.some(a => a.type === type);
  };

  const clearAllAssessments = () => {
    setAssessments([]);
    localStorage.removeItem('completed_assessments');
  };

  const getCompletionRate = (): number => {
    const totalAssessments = 1; // video-readiness only
    return Math.round((assessments.length / totalAssessments) * 100);
  };

  const getAverageScore = (): number => {
    if (assessments.length === 0) return 0;
    const total = assessments.reduce((sum, a) => sum + a.score, 0);
    return Math.round(total / assessments.length);
  };

  const getRecommendedNextAssessment = (): string | null => {
    const completed = assessments.map(a => a.type);
    
    if (!completed.includes('video-readiness')) return 'video-readiness';
    
    return null;
  };

  const getStrongestArea = (): { area: string; score: number } | null => {
    if (assessments.length === 0) return null;
    
    const highest = assessments.reduce((max, current) => 
      current.score > max.score ? current : max
    );
    
    return {
      area: highest.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      score: highest.score
    };
  };

  const getWeakestArea = (): { area: string; score: number } | null => {
    if (assessments.length === 0) return null;
    
    const lowest = assessments.reduce((min, current) => 
      current.score < min.score ? current : min
    );
    
    return {
      area: lowest.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      score: lowest.score
    };
  };

  return {
    assessments,
    saveAssessment,
    getAssessment,
    hasCompletedAssessment,
    clearAllAssessments,
    getCompletionRate,
    getAverageScore,
    getRecommendedNextAssessment,
    getStrongestArea,
    getWeakestArea,
    loadAssessments
  };
};