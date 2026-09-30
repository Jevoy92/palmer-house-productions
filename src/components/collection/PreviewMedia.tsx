import { packagePreviews } from "@/lib/package-previews";
import { FormatLoop } from "./FormatLoop";

export function PreviewMedia({ id, name }: { id: string; name: string; priority?: boolean }) {
  if (!packagePreviews[id]) return null;
  return (
    <div className="pc-media">
      <FormatLoop id={id} name={name} />
      <span className="pc-concept-label">Format preview</span>
    </div>
  );
}
