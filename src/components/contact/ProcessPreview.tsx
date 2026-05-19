
export const ProcessPreview = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-corporate-dark mb-4">Your Assessment Process</h2>
        <p className="text-lg text-corporate-gray max-w-2xl mx-auto">
          Here's how we'll guide you to your perfect video strategy.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="text-xl font-bold text-corporate-dark mb-2">Assess Your Business Stage</h3>
                <p className="text-corporate-gray">Tell us about your business stage and current challenges so we can recommend the right solution.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold text-corporate-dark mb-2">Define Your Goals</h3>
                <p className="text-corporate-gray">Discover what type of video content will best serve your goals and audience.</p>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-xl font-bold text-corporate-dark mb-2">Choose Your Approach</h3>
                <p className="text-corporate-gray">Select the content frequency and production level that matches your needs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
