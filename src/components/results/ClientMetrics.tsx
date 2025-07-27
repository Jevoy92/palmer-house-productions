
export const ClientMetrics = () => {
  const metrics = [
    {
      stat: "Significantly",
      description: "Faster onboarding with video SOPs"
    },
    {
      stat: "Rapid",
      description: "Content library development"
    },
    {
      stat: "Substantial",
      description: "Increase in qualified leads"
    },
    {
      stat: "Major",
      description: "Reduction in FAQ support tickets"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-black text-corporate-dark mb-4">
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
