
import { Button } from "@/components/ui/button";

interface BottomCTAProps {
  onStartJourney: () => void;
  onBookCall: () => void;
}

export const BottomCTA = ({ onStartJourney, onBookCall }: BottomCTAProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
      <h2 className="text-4xl font-bold mb-6">Ready to Map Your Video Journey?</h2>
      <p className="text-xl mb-8 opacity-90">
        Join hundreds of businesses who've discovered their perfect video strategy through our guided expedition.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onStartJourney}
          className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3"
        >
          Start Your Expedition
        </Button>
        <Button
          onClick={onBookCall}
          className="bg-white/20 text-white hover:bg-white/30 border border-white/30 font-bold px-8 py-3"
        >
          Book Strategy Call
        </Button>
      </div>
    </div>
  );
};
