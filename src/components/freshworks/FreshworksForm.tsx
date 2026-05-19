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

  // Add validation feedback
  useEffect(() => {
    const setupValidation = () => {
      if (!containerRef.current) return;

      const formInputs = containerRef.current.querySelectorAll('input, textarea, select');
      
      formInputs.forEach((input) => {
        const element = input as HTMLInputElement;
        
        // Add blur event to validate on field exit
        element.addEventListener('blur', () => {
          validateField(element);
        });

        // Add input event to clear errors while typing
        element.addEventListener('input', () => {
          clearFieldError(element);
        });
      });

      // Intercept form submission to validate
      const form = containerRef.current.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          const invalidFields: string[] = [];
          
          formInputs.forEach((input) => {
            const element = input as HTMLInputElement;
            if (!validateField(element)) {
              const label = getFieldLabel(element);
              invalidFields.push(label);
            }
          });

          if (invalidFields.length > 0) {
            toast({
              title: "Please check your form",
              description: `Required fields missing: ${invalidFields.join(', ')}`,
              variant: "destructive",
              duration: 4000,
            });
          }
        });
      }
    };

    const validateField = (element: HTMLInputElement): boolean => {
      const isRequired = element.hasAttribute('required') || element.getAttribute('aria-required') === 'true';
      
      if (!isRequired) return true;

      let isValid = true;
      let errorMessage = '';

      if (!element.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
      } else if (element.type === 'email' && !isValidEmail(element.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      } else if (element.type === 'tel' && element.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }

      if (!isValid) {
        showFieldError(element, errorMessage);
      } else {
        clearFieldError(element);
      }

      return isValid;
    };

    const showFieldError = (element: HTMLInputElement, message: string) => {
      element.classList.add('error-field');
      
      // Remove existing error message if any
      const existingError = element.parentElement?.querySelector('.custom-error-message');
      if (existingError) {
        existingError.remove();
      }

      // Add error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'custom-error-message';
      errorDiv.textContent = message;
      errorDiv.style.cssText = `
        color: hsl(var(--destructive));
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideDown 0.2s ease-out;
      `;
      
      element.parentElement?.appendChild(errorDiv);
    };

    const clearFieldError = (element: HTMLInputElement) => {
      element.classList.remove('error-field');
      const errorMessage = element.parentElement?.querySelector('.custom-error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    };

    const getFieldLabel = (element: HTMLInputElement): string => {
      const label = element.parentElement?.querySelector('label');
      return label?.textContent?.trim() || element.placeholder || 'Field';
    };

    const isValidEmail = (email: string): boolean => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Add custom CSS for error states
    const style = document.createElement('style');
    style.textContent = `
      .error-field {
        border-color: hsl(var(--destructive)) !important;
        box-shadow: 0 0 0 3px hsla(var(--destructive), 0.1) !important;
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    // Wait for form to load
    const timer = setTimeout(setupValidation, 1000);

    return () => {
      clearTimeout(timer);
      if (style.parentElement) {
        style.parentElement.removeChild(style);
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
