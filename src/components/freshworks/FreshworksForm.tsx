import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FreshworksFormProps {
  title?: string;
  compact?: boolean;
  className?: string;
}

export const FreshworksForm = ({ 
  title = "Get in Touch", 
  compact = false,
  className = ""
}: FreshworksFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoadedRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://palmerhouseproductions.myfreshworks.com/crm/sales/web_forms/dfb1cf79a205d5cd7dd99df4605450d5d2170ffe412004832373dd8b0ca13395/form.js';
    script.crossOrigin = 'anonymous';
    script.id = 'fs_dfb1cf79a205d5cd7dd99df4605450d5d2170ffe412004832373dd8b0ca13395';
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
      scriptLoadedRef.current = true;
    }

    return () => {
      // Cleanup if needed
      const existingScript = document.getElementById('fs_dfb1cf79a205d5cd7dd99df4605450d5d2170ffe412004832373dd8b0ca13395');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
        scriptLoadedRef.current = false;
      }
    };
  }, []);

  const FormContainer = (
    <div 
      ref={containerRef} 
      className={`freshworks-form-container ${className}`}
    />
  );

  if (compact) {
    return FormContainer;
  }

  return (
    <Card className="border-0 video-shadow">
      <CardHeader className="p-4 sm:p-6 pb-3">
        <CardTitle className="text-lg sm:text-xl text-corporate-dark">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {FormContainer}
      </CardContent>
    </Card>
  );
};

export default FreshworksForm;
