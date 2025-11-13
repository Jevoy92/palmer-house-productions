import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();

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

  // Listen for form submission success
  useEffect(() => {
    const handleFormSubmit = (event: Event) => {
      const customEvent = event as CustomEvent;
      // Freshworks forms typically dispatch custom events on submission
      if (customEvent.detail?.success || event.type === 'fs-form-submit-success') {
        toast({
          title: "Message Sent! 🎉",
          description: "Thank you for reaching out. We'll get back to you within 24 hours.",
          duration: 5000,
        });
        
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          navigate('/thank-you');
        }, 2000);
      }
    };

    // Monitor for success message in the DOM as fallback
    const observer = new MutationObserver(() => {
      const successMessage = containerRef.current?.querySelector('.crm-success-message, .success-message, [class*="success"]');
      if (successMessage && successMessage.textContent) {
        toast({
          title: "Message Sent! 🎉",
          description: "Thank you for reaching out. We'll get back to you within 24 hours.",
          duration: 5000,
        });
        
        setTimeout(() => {
          navigate('/thank-you');
        }, 2000);
        
        observer.disconnect();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }

    window.addEventListener('fs-form-submit-success', handleFormSubmit);
    
    return () => {
      window.removeEventListener('fs-form-submit-success', handleFormSubmit);
      observer.disconnect();
    };
  }, [navigate]);

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
