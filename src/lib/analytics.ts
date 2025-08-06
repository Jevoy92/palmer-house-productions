// Analytics tracking utilities
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...parameters,
      timestamp: Date.now()
    });
  }
};

// Contact form tracking
export const trackContactFormSubmit = (formType: 'wizard' | 'quick' | 'discovery') => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    event_category: 'engagement',
    event_label: 'Contact Form'
  });
};

// Video play tracking
export const trackVideoPlay = (videoTitle: string, videoType: string) => {
  trackEvent('video_play', {
    video_title: videoTitle,
    video_type: videoType,
    event_category: 'engagement',
    event_label: 'Video'
  });
};

// Page view tracking
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-HTFNMQRWLL', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

// Conversion tracking
export const trackConversion = (conversionType: 'discovery_call' | 'package_inquiry' | 'contact_submit') => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    event_category: 'conversion',
    value: 1
  });
};

// Mobile interaction tracking
export const trackMobileInteraction = (interactionType: string, element: string) => {
  trackEvent('mobile_interaction', {
    interaction_type: interactionType,
    element,
    event_category: 'mobile',
    is_mobile: window.innerWidth < 768
  });
};