
interface JourneyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const JourneyProgress = ({ currentStep, totalSteps }: JourneyProgressProps) => {
  const checkpoints = [
    { step: 1, label: "Start", icon: "🗺️" },
    { step: 2, label: "Map", icon: "🧭" },
    { step: 3, label: "Fuel", icon: "⛽" },
    { step: 4, label: "Pace", icon: "🎵" },
    { step: 5, label: "Vision", icon: "🎯" },
  ];

  return (
    <div className="flex items-center justify-center p-6 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        {checkpoints.map((checkpoint, index) => (
          <div key={checkpoint.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                  checkpoint.step === currentStep
                    ? "bg-blue-600 text-white shadow-lg"
                    : checkpoint.step < currentStep
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {checkpoint.icon}
              </div>
              <div className={`text-xs mt-1 font-medium ${
                checkpoint.step === currentStep
                  ? "text-blue-600"
                  : checkpoint.step < currentStep
                  ? "text-green-600"
                  : "text-gray-400"
              }`}>
                {checkpoint.label}
              </div>
            </div>
            {index < checkpoints.length - 1 && (
              <div
                className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                  checkpoint.step < currentStep 
                    ? "bg-green-600" 
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
