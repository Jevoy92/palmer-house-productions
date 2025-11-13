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

    // Add custom styles after a short delay to ensure form is loaded
    const styleTimeout = setTimeout(() => {
      const style = document.createElement('style');
      style.id = 'freshworks-custom-styles';
      style.textContent = `
        /* Freshworks Form Custom Styling */
        .freshworks-form-container iframe {
          border-radius: 12px;
        }

        /* Target form inputs */
        .freshworks-form-container input[type="text"],
        .freshworks-form-container input[type="email"],
        .freshworks-form-container input[type="tel"],
        .freshworks-form-container textarea,
        .freshworks-form-container select {
          border: 1px solid hsl(0 0% 90%) !important;
          border-radius: 8px !important;
          padding: 10px 12px !important;
          font-size: 14px !important;
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          color: hsl(220 20% 10%) !important;
          background: white !important;
          transition: all 0.2s ease !important;
        }

        .freshworks-form-container input[type="text"]:focus,
        .freshworks-form-container input[type="email"]:focus,
        .freshworks-form-container input[type="tel"]:focus,
        .freshworks-form-container textarea:focus,
        .freshworks-form-container select:focus {
          border-color: hsl(111 46% 55%) !important;
          outline: none !important;
          box-shadow: 0 0 0 3px hsla(111 46% 55% / 0.1) !important;
        }

        /* Target labels */
        .freshworks-form-container label {
          color: hsl(220 10% 30%) !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          margin-bottom: 6px !important;
        }

        /* Submit button */
        .freshworks-form-container button[type="submit"],
        .freshworks-form-container input[type="submit"] {
          background: linear-gradient(135deg, hsl(111 46% 55%), hsl(111 46% 45%)) !important;
          color: white !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 14px 28px !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 12px hsla(111 46% 55% / 0.3) !important;
        }

        .freshworks-form-container button[type="submit"]:hover,
        .freshworks-form-container input[type="submit"]:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px hsla(111 46% 55% / 0.4) !important;
        }

        /* Error messages */
        .freshworks-form-container .error,
        .freshworks-form-container .error-message {
          color: hsl(0 84% 60%) !important;
          font-size: 13px !important;
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        /* Success message */
        .freshworks-form-container .success,
        .freshworks-form-container .success-message {
          color: hsl(111 46% 55%) !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        /* Form container */
        .freshworks-form-container form {
          background: transparent !important;
        }

        /* Radio buttons and checkboxes */
        .freshworks-form-container input[type="radio"],
        .freshworks-form-container input[type="checkbox"] {
          accent-color: hsl(111 46% 55%) !important;
        }

        /* Required field indicator */
        .freshworks-form-container .required,
        .freshworks-form-container span[class*="required"] {
          color: hsl(0 84% 60%) !important;
        }

        /* Placeholder text */
        .freshworks-form-container input::placeholder,
        .freshworks-form-container textarea::placeholder {
          color: hsl(220 10% 60%) !important;
          opacity: 0.7 !important;
        }
      `;
      
      if (!document.getElementById('freshworks-custom-styles')) {
        document.head.appendChild(style);
      }
    }, 500);

    return () => {
      clearTimeout(styleTimeout);
      // Cleanup if needed
      const existingScript = document.getElementById('fs_dfb1cf79a205d5cd7dd99df4605450d5d2170ffe412004832373dd8b0ca13395');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
        scriptLoadedRef.current = false;
      }
      const existingStyle = document.getElementById('freshworks-custom-styles');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
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
