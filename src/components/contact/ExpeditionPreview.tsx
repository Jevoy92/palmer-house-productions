
export const ExpeditionPreview = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Expedition Preview</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Here's a glimpse of the journey ahead as we guide you to your perfect video strategy.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🌲</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Trail Map</h3>
                <p className="text-gray-600">Tell us about your business stage and current challenges so we can map the perfect path forward.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🏜️</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fuel for the Climb</h3>
                <p className="text-gray-600">Discover what type of video content will best serve your goals and audience.</p>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">⭐</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pick Your Pace</h3>
                <p className="text-gray-600">Choose the content frequency and production level that matches your ambitions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
