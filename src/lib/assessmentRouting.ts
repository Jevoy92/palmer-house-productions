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

interface CalendlyConfig {
  url: string;
  prefillData: {
    name?: string;
    email?: string;
    a1?: string; // Assessment Type
    a2?: string; // Score
    a3?: string; // Level
    a4?: string; // Company
  };
}

export const getSmartAssessmentCalendlyUrl = (assessmentData: AssessmentData): CalendlyConfig => {
  const isHighScore = assessmentData.score >= 75;
  
  // Choose the appropriate Calendly link based on score
  const baseUrl = isHighScore 
    ? 'https://calendly.com/palmerhouseproductions-info/discovery-call'
    : 'https://calendly.com/palmerhouseproductions-info/general-strategy-call';
  
  // Prepare prefill data
  const prefillData = {
    name: assessmentData.userInfo?.name,
    email: assessmentData.userInfo?.email,
    a1: `${assessmentData.type} Assessment`,
    a2: `${assessmentData.score}% (${assessmentData.level})`,
    a3: isHighScore ? 'High Readiness - Discovery Call' : 'Building Readiness - Strategy Call',
    a4: assessmentData.userInfo?.company
  };

  // Build query string for prefilled data
  const params = new URLSearchParams();
  Object.entries(prefillData).forEach(([key, value]) => {
    if (value && value.trim()) {
      params.append(key, value);
    }
  });

  return {
    url: `${baseUrl}?${params.toString()}`,
    prefillData
  };
};

export const sendAssessmentToFormspree = async (assessmentData: AssessmentData, routingDecision: CalendlyConfig) => {
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
    calendly_url: routingDecision.url,
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

Calendly Link: ${routingDecision.url}
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
      title: 'Discovery Call Recommended',
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
      title: 'Strategy Call Recommended',
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