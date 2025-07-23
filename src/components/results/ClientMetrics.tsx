
export const ClientMetrics = () => {
  const metrics = [
    {
      stat: "40%",
      description: "Faster onboarding with video SOPs"
    },
    {
      stat: "90-day",
      description: "Content library built in 3 sessions"
    },
    {
      stat: "3x",
      description: "Increase in qualified leads"
    },
    {
      stat: "85%",
      description: "Reduction in FAQ support tickets"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-black text-gradient-1 mb-4">
                {metric.stat}
              </div>
              <p className="text-corporate-gray font-medium">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
