import { useEffect } from "react";

const PID = "64f18afafb99b50197686f91";
const SCRIPT_SRC =
  "https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js";

/** Official HoneyBook contact-form placement. Loads the widget script once, client-side. */
export function HoneyBookEmbed() {
  useEffect(() => {
    const w = window as unknown as { _HB_?: { pid?: string } };
    w._HB_ = w._HB_ || {};
    w._HB_.pid = PID;
    document.querySelector(`script[src="${SCRIPT_SRC}"]`)?.remove();
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = SCRIPT_SRC;
    document.body.appendChild(s);
  }, []);
  return (
    <>
      <div className={`hb-p-${PID}-2`} />
      <img
        height={1}
        width={1}
        style={{ display: "none" }}
        alt=""
        src={`https://www.honeybook.com/p.png?pid=${PID}`}
      />
    </>
  );
}
