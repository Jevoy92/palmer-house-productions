import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Canonical = () => {
  const location = useLocation();

  useEffect(() => {
    const href = window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', href);
  }, [location]);

  return null;
};
