
interface JourneyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const JourneyProgress = ({ currentStep, totalSteps }: JourneyProgressProps) => {
  const checkpoints = [
    { step: 1, icon: "🗺️", label: "Start", theme: "from-green-400 to-green-600" },
    { step: 2, icon: "🧭", label: "Map", theme: "from-blue-400 to-blue-600" },
    { step: 3, icon: "⛽", label: "Fuel", theme: "from-orange-400 to-orange-600" },
    { step: 4, icon: "🎵", label: "Pace", theme: "from-purple-400 to-purple-600" },
    { step: 5, icon: "🎯", label: "Vision", theme: "from-indigo-400 to-indigo-600" },
    { step: 6, icon: "🎉", label: "Celebrate", theme: "from-pink-400 to-pink-600" },
  ];

  return (
    <div className="flex items-center justify-center p-6 border-b border-corporate-light bg-gradient-to-r from-white to-corporate-light overflow-x-auto">
      <div className="flex items-center space-x-3 min-w-max">
        {checkpoints.map((checkpoint, index) => (
          <div key={checkpoint.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 transform ${
                  checkpoint.step === currentStep
                    ? `bg-gradient-to-br ${checkpoint.theme} text-white scale-125 shadow-xl animate-pulse`
                    : checkpoint.step < currentStep
                    ? "bg-corporate-dark text-white scale-110 shadow-lg"
                    : "bg-corporate-light text-corporate-gray hover:scale-105"
                }`}
              >
                <span className="animate-bounce" style={{animationDelay: `${index * 0.1}s`}}>
                  {checkpoint.icon}
                </span>
              </div>
              <div className={`text-xs mt-2 font-medium transition-all duration-300 ${
                checkpoint.step === currentStep
                  ? "text-corporate-dark font-bold"
                  : checkpoint.step < currentStep
                  ? "text-corporate-dark"
                  : "text-corporate-gray"
              }`}>
                {checkpoint.label}
              </div>
            </div>
            {index < checkpoints.length - 1 && (
              <div
                className={`w-12 h-2 mx-3 rounded-full transition-all duration-500 ${
                  checkpoint.step < currentStep 
                    ? "bg-gradient-to-r from-corporate-dark to-social-purple" 
                    : "bg-corporate-light"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
