interface AssessmentData {
  type: string;
  score: number;
  level: string;
  recommendations: string[];
  businessContext?: any;
  userInfo?: {
    name?: string;
    email?: string;
    company?: string;
  };
}

interface ZohoBookingConfig {
  url: string;
  prefillData: {
    name?: string;
    email?: string;
    company?: string;
    assessmentType?: string;
    score?: string;
    level?: string;
  };
}

export const getSmartAssessmentZohoUrl = (assessmentData: AssessmentData): ZohoBookingConfig => {
  const isHighScore = assessmentData.score >= 75;
  
  // Use Google Calendar booking link
  const baseUrl = 'https://calendar.app.google/TjXSG2EjNF7KZzcJ8';
  
  // Prepare prefill data for Zoho (different format than previous booking system)
  const prefillData = {
    name: assessmentData.userInfo?.name,
    email: assessmentData.userInfo?.email,
    company: assessmentData.userInfo?.company,
    assessmentType: `${assessmentData.type} Assessment`,
    score: `${assessmentData.score}% (${assessmentData.level})`,
    level: isHighScore ? 'High Readiness - Strategy Call' : 'Building Readiness - General Consultation'
  };

  return {
    url: baseUrl, // Zoho handles prefill differently, so we use the base URL
    prefillData
  };
};

export const sendAssessmentToFormspree = async (assessmentData: AssessmentData, routingDecision: ZohoBookingConfig) => {
  // You'll need to replace this with your actual Formspree endpoint
  const formspreeEndpoint = 'https://formspree.io/f/mldezzqr'; // Replace with your Formspree form ID
  
  const emailData = {
    subject: `New Assessment Booking: ${assessmentData.type} - ${assessmentData.score}%`,
    assessment_type: assessmentData.type,
    score: assessmentData.score,
    level: assessmentData.level,
    routing_decision: assessmentData.score >= 75 ? 'Discovery Call (High Readiness)' : 'Strategy Call (Building Readiness)',
    user_name: assessmentData.userInfo?.name || 'Not provided',
    user_email: assessmentData.userInfo?.email || 'Not provided',
    user_company: assessmentData.userInfo?.company || 'Not provided',
    key_recommendations: assessmentData.recommendations.slice(0, 5).join('; '),
    business_context: assessmentData.businessContext ? JSON.stringify(assessmentData.businessContext, null, 2) : 'Not provided',
    booking_url: routingDecision.url,
    timestamp: new Date().toISOString(),
    // Formatted summary for easy reading
    summary: `
ASSESSMENT SUMMARY
==================
Type: ${assessmentData.type}
Score: ${assessmentData.score}% (${assessmentData.level})
Routing: ${assessmentData.score >= 75 ? 'Discovery Call - High Readiness' : 'Strategy Call - Building Readiness'}

USER INFORMATION
================
Name: ${assessmentData.userInfo?.name || 'Not provided'}
Email: ${assessmentData.userInfo?.email || 'Not provided'}
Company: ${assessmentData.userInfo?.company || 'Not provided'}

TOP RECOMMENDATIONS
===================
${assessmentData.recommendations.slice(0, 5).map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

CALL PREPARATION
================
This user scored ${assessmentData.score}% on their ${assessmentData.type} assessment.
${assessmentData.score >= 75 
  ? 'HIGH READINESS: This prospect has strong foundations and is ready for strategic growth discussions. Focus on advanced strategies and scaling opportunities.'
  : 'BUILDING READINESS: This prospect needs foundational support. Focus on basic strategy, education, and building their capabilities.'
}

Booking Link: ${routingDecision.url}
    `.trim()
  };

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`Formspree error: ${response.status}`);
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('Failed to send assessment data to Formspree:', error);
    return { success: false, error };
  }
};

export const getCallTypeExplanation = (score: number): { title: string; description: string; benefits: string[] } => {
  if (score >= 75) {
    return {
      title: 'Strategy Call Recommended',
      description: 'Your high assessment score indicates strong video marketing foundations. You\'re ready for strategic growth discussions.',
      benefits: [
        'Advanced strategy development',
        'Scaling and optimization opportunities',
        'Partnership and collaboration options',
        'ROI maximization techniques'
      ]
    };
  } else {
    return {
      title: 'General Consultation Recommended',
      description: 'Your assessment shows opportunities to strengthen your video marketing foundation. Let\'s build your capabilities strategically.',
      benefits: [
        'Foundation building strategies',
        'Step-by-step implementation plans',
        'Resource and tool recommendations',
        'Skills development pathways'
      ]
    };
  }
};