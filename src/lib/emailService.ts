
import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = 'service_7zd5x3u';
const TEMPLATE_ID = 'template_b8dsioe';
const PUBLIC_KEY = '5UDY6-g0vIXo_2VmT';

export interface ContactFormEmailData {
  form_type: string;
  submission_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  challenge?: string;
  pathway?: string;
  message?: string;
  referral_source?: string;
  readiness?: string;
  company?: string;
  website?: string;
  current_challenge?: string;
  timeline?: string;
  budget?: string;
  submitted_date: string;
  [key: string]: string | undefined;
}

export const sendContactFormEmail = async (formData: any): Promise<void> => {
  const emailData: ContactFormEmailData = {
    form_type: 'Contact Form Submission',
    submission_type: 'Contact Form',
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone || 'Not provided',
    challenge: formData.challenge,
    pathway: formData.pathway,
    message: formData.message,
    referral_source: formData.referralSource || 'Not provided',
    readiness: formData.readiness || 'Not provided',
    submitted_date: new Date().toLocaleString(),
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, PUBLIC_KEY);
    console.log('Contact form email sent successfully');
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    throw error;
  }
};

export const sendGlimpseFormEmail = async (formData: any): Promise<void> => {
  const emailData: ContactFormEmailData = {
    form_type: 'Glimpse Inquiry',
    submission_type: 'Glimpse Form',
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone || 'Not provided',
    company: formData.company,
    website: formData.website || 'Not provided',
    current_challenge: formData.currentChallenge,
    timeline: formData.timeline,
    budget: formData.budget,
    submitted_date: new Date().toLocaleString(),
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, PUBLIC_KEY);
    console.log('Glimpse form email sent successfully');
  } catch (error) {
    console.error('Failed to send Glimpse form email:', error);
    throw error;
  }
};
