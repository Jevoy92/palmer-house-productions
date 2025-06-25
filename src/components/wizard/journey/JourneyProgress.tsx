
interface JourneyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const JourneyProgress = ({ currentStep, totalSteps }: JourneyProgressProps) => {
  const checkpoints = [
    { step: 1, icon: "🗺️", label: "Start" },
    { step: 2, icon: "🧭", label: "Map" },
    { step: 3, icon: "⛽", label: "Fuel" },
    { step: 4, icon: "🎵", label: "Pace" },
    { step: 5, icon: "🎯", label: "Vision" },
    { step: 6, icon: "🎉", label: "Celebrate" },
  ];

  return (
    <div className="flex items-center justify-center p-4 border-b border-corporate-light overflow-x-auto">
      <div className="flex items-center space-x-2 min-w-max">
        {checkpoints.map((checkpoint, index) => (
          <div key={checkpoint.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  checkpoint.step === currentStep
                    ? "gradient-social-1 text-white scale-110 shadow-lg"
                    : checkpoint.step < currentStep
                    ? "bg-corporate-dark text-white"
                    : "bg-corporate-light text-corporate-gray"
                }`}
              >
                {checkpoint.icon}
              </div>
              <div className="text-xs text-corporate-gray mt-1 font-medium">
                {checkpoint.label}
              </div>
            </div>
            {index < checkpoints.length - 1 && (
              <div
                className={`w-8 h-1 mx-2 transition-all duration-300 ${
                  checkpoint.step < currentStep ? "bg-corporate-dark" : "bg-corporate-light"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
