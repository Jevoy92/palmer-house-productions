
import { CardSelection } from "./CardSelection";
import { TimelineType } from "./types";

interface TimelineStepProps {
  selectedTimeline?: TimelineType;
  onTimelineSelect: (timeline: TimelineType) => void;
  onBack: () => void;
}

export const TimelineStep = ({ selectedTimeline, onTimelineSelect, onBack }: TimelineStepProps) => {
  const options = [
    {
      id: "immediately",
      title: "Immediately",
      description: "Ready to start right away",
      icon: "⚡",
      gradient: "gradient-social-1",
    },
    {
      id: "1-3-months",
      title: "1-3 months",
      description: "Planning to begin within the quarter",
      icon: "📅",
      gradient: "gradient-social-2",
    },
    {
      id: "3-6-months",
      title: "3-6 months",
      description: "Part of a longer-term strategy",
      icon: "🗓️",
      gradient: "gradient-social-3",
    },
    {
      id: "planning",
      title: "Planning / Research Mode",
      description: "Gathering information for future decisions",
      icon: "🔍",
      gradient: "gradient-social-4",
    },
  ];

  return (
    <CardSelection
      title="When would you like to start?"
      subtitle="Understanding your timeline helps us prepare the right resources."
      options={options}
      selectedValue={selectedTimeline}
      onSelect={(value) => onTimelineSelect(value as TimelineType)}
      onBack={onBack}
      showBack={true}
    />
  );
};
