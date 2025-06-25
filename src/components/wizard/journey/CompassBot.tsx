
import { useState, useEffect } from "react";

interface CompassBotProps {
  tips: string[];
  showTips: boolean;
  onToggleTips: () => void;
}

export const CompassBot = ({ tips, showTips, onToggleTips }: CompassBotProps) => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (showTips && tips.length > 1) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showTips, tips.length]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Compass Bot Character */}
        <button
          onClick={onToggleTips}
          className="w-16 h-16 bg-gradient-to-br from-social-cyan to-social-blue rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-all duration-300 shadow-lg animate-bounce"
        >
          🧭
        </button>

        {/* Tip Bubble */}
        {showTips && (
          <div className="absolute bottom-20 right-0 w-64 bg-white rounded-xl shadow-lg p-4 border-2 border-social-cyan animate-fade-in">
            <div className="text-sm text-corporate-dark font-medium">
              {tips[currentTip]}
            </div>
            <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-social-cyan rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  );
};
