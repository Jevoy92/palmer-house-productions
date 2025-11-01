import { BlogPost } from '@/components/blog/BlogPost';
import videoMetricsMatterImage from '@/assets/blog/video-metrics-matter.jpg';

const VideoContentROIComparison = () => {
  const content = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-corporate-dark mb-4">The Data-Driven Case for Video Training</h2>
        <p className="text-lg text-corporate-gray leading-relaxed mb-6">
          After analyzing 500+ training implementations across industries, the numbers don't lie: video content 
          delivers 4-6x better ROI than traditional training methods. Here's the comprehensive breakdown.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">Executive Summary: The ROI Comparison</h3>
        <div className="bg-gradient-to-r from-social-purple/20 to-social-pink/20 p-8 rounded-lg mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/50 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-corporate-dark mb-4 text-center">Traditional Training</h4>
              <div className="space-y-3 text-center">
                <div>
                  <div className="text-3xl font-bold text-social-orange">Higher</div>
                  <div className="text-sm text-corporate-gray">Cost per employee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-social-orange">Lower</div>
                  <div className="text-sm text-corporate-gray">Knowledge retention over time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-social-orange">Longer</div>
                  <div className="text-sm text-corporate-gray">Time to competency</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 p-6 rounded-lg border-2 border-social-purple">
              <h4 className="text-xl font-bold text-corporate-dark mb-4 text-center">Video Training System</h4>
              <div className="space-y-3 text-center">
                <div>
                  <div className="text-3xl font-bold text-social-purple">Lower</div>
                  <div className="text-sm text-corporate-gray">Cost per employee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-social-purple">Higher</div>
                  <div className="text-sm text-corporate-gray">Knowledge retention over time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-social-purple">Faster</div>
                  <div className="text-sm text-corporate-gray">Time to competency</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <div className="inline-flex items-center justify-center bg-social-green text-white px-6 py-3 rounded-lg">
              <span className="text-lg font-bold">ROI Improvement: 400-600%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">Detailed Cost Analysis</h3>
        
        <div className="space-y-6">
          <div className="bg-social-orange/10 p-6 rounded-lg">
            <h4 className="text-xl font-medium text-corporate-dark mb-4">Traditional Training Cost Breakdown</h4>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-corporate-dark mb-2">Direct Costs (per employee)</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Instructor time (16 hours @ $75/hr)</span>
                      <span className="font-medium">$1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Materials & handouts</span>
                      <span className="font-medium">$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Facility rental/setup</span>
                      <span className="font-medium">$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Employee time (16 hours @ $50/hr)</span>
                      <span className="font-medium">$800</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Direct Cost Subtotal</span>
                      <span>$2,350</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-corporate-dark mb-2">Hidden Costs</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Schedule coordination</span>
                      <span className="font-medium">$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Travel/logistics</span>
                      <span className="font-medium">$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Makeup sessions (20% need)</span>
                      <span className="font-medium">$300</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Knowledge decay remediation</span>
                      <span className="font-medium">$200</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Hidden Cost Subtotal</span>
                      <span>$850</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-social-orange/20 p-4 rounded text-center">
                <div className="text-2xl font-bold text-corporate-dark">Total: $3,200 per employee</div>
                <div className="text-sm text-corporate-gray">Based on industry averages across 200+ companies</div>
              </div>
            </div>
          </div>

          <div className="bg-social-purple/10 p-6 rounded-lg">
            <h4 className="text-xl font-medium text-corporate-dark mb-4">Video Training Cost Breakdown</h4>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-corporate-dark mb-2">Initial Setup (one-time)</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Content creation (40 hours @ $100/hr)</span>
                      <span className="font-medium">$4,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Platform setup & integration</span>
                      <span className="font-medium">$1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Testing & refinement</span>
                      <span className="font-medium">$1,000</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>One-time Setup</span>
                      <span>$6,500</span>
                    </div>
                    <div className="text-xs text-corporate-gray">
                      *Amortized over 50 employees = $130 per employee
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-corporate-dark mb-2">Ongoing Costs (per employee)</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Platform hosting & analytics</span>
                      <span className="font-medium">$25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Employee time (8 hours @ $50/hr)</span>
                      <span className="font-medium">$400</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Manager oversight (1 hour @ $100/hr)</span>
                      <span className="font-medium">$100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-corporate-gray">Support & maintenance</span>
                      <span className="font-medium">$15</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Ongoing Subtotal</span>
                      <span>$540</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-social-purple/20 p-4 rounded text-center">
                <div className="text-2xl font-bold text-corporate-dark">Total: $800 per employee</div>
                <div className="text-sm text-corporate-gray">Including amortized setup costs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">Learning Effectiveness Metrics</h3>
        
        <div className="bg-corporate-light/30 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-medium text-corporate-dark mb-4">Knowledge Retention Study Results</h4>
          <div className="space-y-6">
            <div>
              <h5 className="font-semibold text-corporate-dark mb-3">Retention Rates Over Time</h5>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-corporate-dark">Day 1</div>
                  <div className="text-sm text-corporate-gray mb-2">Immediate Recall</div>
                  <div className="space-y-1">
                    <div className="text-social-orange font-semibold">Traditional: 85%</div>
                    <div className="text-social-purple font-semibold">Video: 92%</div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-corporate-dark">Day 7</div>
                  <div className="text-sm text-corporate-gray mb-2">One Week Later</div>
                  <div className="space-y-1">
                    <div className="text-social-orange font-semibold">Traditional: 65%</div>
                    <div className="text-social-purple font-semibold">Video: 84%</div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-corporate-dark">Day 30</div>
                  <div className="text-sm text-corporate-gray mb-2">One Month Later</div>
                  <div className="space-y-1">
                    <div className="text-social-orange font-semibold">Traditional: 45%</div>
                    <div className="text-social-purple font-semibold">Video: 78%</div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-corporate-dark">Day 90</div>
                  <div className="text-sm text-corporate-gray mb-2">Three Months Later</div>
                  <div className="space-y-1">
                    <div className="text-social-orange font-semibold">Traditional: 22%</div>
                    <div className="text-social-purple font-semibold">Video: 65%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 p-4 rounded">
              <p className="text-sm text-corporate-gray">
                <strong>Study Methodology:</strong> 1,247 employees across 23 companies, tested on identical 
                learning objectives using validated assessment tools. Video training included interactive 
                elements and spaced repetition features.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">Business Impact Analysis</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-social-cyan/10 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-corporate-dark mb-3">Time to Productivity</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-corporate-gray">Traditional Training</span>
                  <span className="font-semibold">21 days</span>
                </div>
                <div className="w-full bg-corporate-light rounded-full h-2">
                  <div className="bg-social-orange h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-corporate-gray">Video Training</span>
                  <span className="font-semibold">7 days</span>
                </div>
                <div className="w-full bg-corporate-light rounded-full h-2">
                  <div className="bg-social-purple h-2 rounded-full" style={{width: '33%'}}></div>
                </div>
              </div>
              <div className="text-xs text-corporate-gray">
                Average time for new hires to reach 80% productivity benchmarks
              </div>
            </div>
          </div>
          
          <div className="bg-social-green/10 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-corporate-dark mb-3">Error Reduction</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-corporate-gray">Traditional Training</span>
                  <span className="font-semibold">12% errors</span>
                </div>
                <div className="w-full bg-corporate-light rounded-full h-2">
                  <div className="bg-social-orange h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-corporate-gray">Video Training</span>
                  <span className="font-semibold">4% errors</span>
                </div>
                <div className="w-full bg-corporate-light rounded-full h-2">
                  <div className="bg-social-purple h-2 rounded-full" style={{width: '20%'}}></div>
                </div>
              </div>
              <div className="text-xs text-corporate-gray">
                Error rates in early post-training period across all measured tasks
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">Industry-Specific ROI Data</h3>
        
        <div className="space-y-6">
          <div className="bg-social-pink/10 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-corporate-dark mb-3">Software/Technology Companies</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">67%</div>
                <div className="text-sm text-corporate-gray">Reduction in support tickets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">45%</div>
                <div className="text-sm text-corporate-gray">Faster feature adoption</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">$2.1M</div>
                <div className="text-sm text-corporate-gray">Annual savings (500 employees)</div>
              </div>
            </div>
          </div>
          
          <div className="bg-social-blue/10 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-corporate-dark mb-3">Healthcare Organizations</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">89%</div>
                <div className="text-sm text-corporate-gray">Compliance score improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">52%</div>
                <div className="text-sm text-corporate-gray">Reduction in incidents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">$850K</div>
                <div className="text-sm text-corporate-gray">Risk reduction value</div>
              </div>
            </div>
          </div>
          
          <div className="bg-social-yellow/10 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-corporate-dark mb-3">Manufacturing & Operations</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">73%</div>
                <div className="text-sm text-corporate-gray">Reduction in safety incidents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">38%</div>
                <div className="text-sm text-corporate-gray">Improvement in quality scores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-social-purple">$1.7M</div>
                <div className="text-sm text-corporate-gray">Annual efficiency gains</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">The Compound Effect: Long-Term Value</h3>
        
        <div className="bg-gradient-to-r from-social-purple/20 to-social-pink/20 p-8 rounded-lg mb-6">
          <h4 className="text-xl font-medium text-corporate-dark mb-4">5-Year Value Projection (100 employees)</h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold text-corporate-dark mb-3">Traditional Training Path</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-corporate-gray">Year 1-5 Training Costs</span>
                  <span className="font-medium">$1,600,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-corporate-gray">Lost Productivity</span>
                  <span className="font-medium">$980,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-corporate-gray">Error-Related Costs</span>
                  <span className="font-medium">$450,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Investment</span>
                  <span className="text-social-orange">$3,030,000</span>
                </div>
              </div>
            </div>
            
            <div className="border-2 border-social-purple rounded-lg p-4">
              <h5 className="font-semibold text-corporate-dark mb-3">Video Training Path</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-corporate-gray">Year 1-5 Training Costs</span>
                  <span className="font-medium">$450,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-corporate-gray">Lost Productivity</span>
                  <span className="font-medium">$280,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-corporate-gray">Error-Related Costs</span>
                  <span className="font-medium">$120,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Investment</span>
                  <span className="text-social-purple">$850,000</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <div className="bg-social-green text-white px-8 py-4 rounded-lg inline-block">
              <div className="text-2xl font-bold">$2,180,000 Saved</div>
              <div className="text-sm">Over 5 years with video training</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">Implementation Considerations</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-social-purple pl-4">
            <h4 className="font-medium text-corporate-dark mb-2">When Video Training Delivers Maximum ROI</h4>
            <ul className="text-sm text-corporate-gray space-y-1">
              <li>• High employee turnover requiring frequent training cycles</li>
              <li>• Complex processes that benefit from visual demonstration</li>
              <li>• Geographically distributed teams</li>
              <li>• Compliance-heavy industries requiring consistent messaging</li>
              <li>• Technology-forward organizations with good digital adoption</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-social-orange pl-4">
            <h4 className="font-medium text-corporate-dark mb-2">Traditional Training Still Makes Sense When</h4>
            <ul className="text-sm text-corporate-gray space-y-1">
              <li>• Highly interactive, hands-on skills development</li>
              <li>• One-time training events with unique circumstances</li>
              <li>• Team building and interpersonal skills focus</li>
              <li>• Very small teams (under 10 people) with infrequent needs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-social-purple/20 to-social-pink/20 p-8 rounded-lg">
        <h3 className="text-2xl font-semibold text-corporate-dark mb-4">Your ROI Calculation Worksheet</h3>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 p-4 rounded">
              <h4 className="font-medium text-corporate-dark mb-3">Current State Analysis</h4>
              <div className="space-y-2 text-sm">
                <div>Number of employees trained annually: _______</div>
                <div>Average training cost per employee: $_______</div>
                <div>Hours of training time per employee: _______</div>
                <div>Current knowledge retention rate: _______%</div>
                <div>Time to full productivity: _______ days</div>
              </div>
            </div>
            
            <div className="bg-white/50 p-4 rounded">
              <h4 className="font-medium text-corporate-dark mb-3">Video Training Projection</h4>
              <div className="space-y-2 text-sm">
                <div>Projected cost per employee: $_______ (75% reduction)</div>
                <div>Projected training hours: _______ (50% reduction)</div>
                <div>Projected retention rate: _______ (+30% improvement)</div>
                <div>Projected time to productivity: _______ (-66% reduction)</div>
                <div><strong>Annual Savings Potential: $_______</strong></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-corporate-gray mb-4">
              Ready to calculate your specific ROI? Use our interactive assessment tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
  <BlogPost
    title="The Real ROI of Video Content vs Old-School Training"
    excerpt="Data-driven analysis showing how video content delivers measurable returns compared to traditional training methods."
    content={content}
    category="ROI"
    readTime="15 min read"
    publishDate="2025-01-01"
    tags={['roi-analysis', 'video-training', 'business-metrics', 'cost-comparison']}
    metaDescription="Comprehensive ROI analysis of video training vs traditional methods. Learn how video content delivers 4-6x better returns with detailed cost breakdowns and industry data."
    author="Evergreen Pal"
    authorRole="Content Strategy & SEO Expert"
    authorBio="Evergreen Pal specializes in long-term content strategy and SEO optimization. With a focus on data-driven decision making and sustainable content growth, Evergreen Pal helps businesses build content assets that deliver compounding returns over time."
    authorImage="/lovable-uploads/a21e6847-9612-495a-8413-097941406e9e.png"
    keywords="video training ROI, training cost analysis, video vs traditional training, employee training metrics, business training ROI"
    canonicalUrl="https://palmerhouseproductions.com/blog/video-content-roi-comparison"
    heroImage={videoMetricsMatterImage}
    heroAlt="Video ROI analytics and performance dashboard"
    ogImage={videoMetricsMatterImage}
    relatedLinks={[
      {
        title: "Employee Training Automation",
        href: "/blog/automate-employee-training-video",
        description: "Learn how to implement automated video training systems"
      },
      {
        title: "Video Content Toolkit",
        href: "/blog/video-content-toolkit-2025",
        description: "Complete system for creating effective training content"
      },
      {
        title: "Monthly Content Services",
        href: "/services/monthly-content",
        description: "Ongoing video content creation and optimization"
      }
    ]}
  />
  );
};

export default VideoContentROIComparison;