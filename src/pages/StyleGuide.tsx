import React from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { Check, X, AlertCircle } from 'lucide-react';

export default function StyleGuide() {
  const colorCategories = [
    {
      name: 'Core Semantic Colors',
      description: 'These are the primary colors used throughout the site. Always prefer these over custom colors.',
      colors: [
        {
          name: 'Primary',
          variable: '--primary',
          cssClass: 'text-primary',
          bg: 'bg-primary',
          hsl: '213 94% 68%',
          usage: 'Main brand color, primary CTAs, links, important highlights',
          textOn: 'white',
          contrast: 'AAA',
          examples: ['Primary buttons', 'Key links', 'Brand highlights']
        },
        {
          name: 'Foreground',
          variable: '--foreground',
          cssClass: 'text-foreground',
          bg: 'bg-foreground',
          hsl: '0 0% 9%',
          usage: 'Main text color, highest emphasis content',
          textOn: 'white',
          contrast: 'AAA',
          examples: ['Body text', 'Headings', 'High priority content']
        },
        {
          name: 'Muted Foreground',
          variable: '--muted-foreground',
          cssClass: 'text-muted-foreground',
          bg: 'bg-muted-foreground',
          hsl: '0 0% 45%',
          usage: 'Secondary text, descriptions, less important information',
          textOn: 'white',
          contrast: 'AA',
          examples: ['Captions', 'Helper text', 'Subdued content']
        },
        {
          name: 'Accent',
          variable: '--accent',
          cssClass: 'text-accent',
          bg: 'bg-accent',
          hsl: '213 94% 68%',
          usage: 'Accent elements, highlights, special emphasis',
          textOn: 'white',
          contrast: 'AAA',
          examples: ['Special highlights', 'Interactive elements', 'Featured content']
        }
      ]
    },
    {
      name: 'Pal Colors',
      description: 'Character-specific brand colors for the Video Pals. Each pal has their own distinctive color.',
      colors: [
        {
          name: 'Reel Pal Orange',
          variable: '--pal-orange',
          cssClass: 'text-pal-orange',
          bg: 'bg-pal-orange',
          hsl: '22 89% 58%',
          usage: 'Reel Pal branding, short-form content sections',
          textOn: 'white',
          contrast: 'AA',
          examples: ['Reel Pal pages', 'Social media content sections', 'Short-form video features']
        },
        {
          name: 'System Pal Purple',
          variable: '--pal-purple',
          cssClass: 'text-pal-purple',
          bg: 'bg-pal-purple',
          hsl: '253 55% 62%',
          usage: 'System Pal branding, training and process sections',
          textOn: 'white',
          contrast: 'AA',
          examples: ['System Pal pages', 'Training content', 'Internal process features']
        },
        {
          name: 'Evergreen Pal Green',
          variable: '--pal-green',
          cssClass: 'text-pal-green',
          bg: 'bg-pal-green',
          hsl: '111 46% 55%',
          usage: 'Evergreen Pal branding, educational content sections',
          textOn: 'white',
          contrast: 'AA',
          examples: ['Evergreen Pal pages', 'Long-form content', 'SEO-focused sections']
        },
        {
          name: 'Spotlight Pal Blue',
          variable: '--pal-blue',
          cssClass: 'text-pal-blue',
          bg: 'bg-pal-blue',
          hsl: '214 63% 57%',
          usage: 'Spotlight Pal branding, cinematic content sections',
          textOn: 'white',
          contrast: 'AA',
          examples: ['Spotlight Pal pages', 'Testimonials', 'Proof content']
        }
      ]
    },
    {
      name: 'Corporate Colors',
      description: 'Professional colors for corporate and business contexts.',
      colors: [
        {
          name: 'Corporate Dark',
          variable: '--corporate-dark',
          cssClass: 'text-corporate-dark',
          bg: 'bg-corporate-dark',
          hsl: '220 20% 10%',
          usage: 'Dark text, professional content, high contrast needs',
          textOn: 'white',
          contrast: 'AAA',
          examples: ['Professional headings', 'Business content', 'High-emphasis text']
        },
        {
          name: 'Corporate Gray',
          variable: '--corporate-gray',
          cssClass: 'text-corporate-gray',
          bg: 'bg-corporate-gray',
          hsl: '220 10% 30%',
          usage: 'Medium emphasis text, professional descriptions',
          textOn: 'white',
          contrast: 'AA',
          examples: ['Secondary headings', 'Professional descriptions', 'Subtext']
        },
        {
          name: 'Corporate Light',
          variable: '--corporate-light',
          cssClass: 'text-corporate-light',
          bg: 'bg-corporate-light',
          hsl: '220 20% 95%',
          usage: 'Light backgrounds, subtle sections (use dark text on this)',
          textOn: 'dark',
          contrast: 'AAA',
          examples: ['Section backgrounds', 'Card backgrounds', 'Light containers']
        }
      ]
    },
    {
      name: 'Video Production Colors',
      description: 'Extreme contrast colors for video production and media contexts.',
      colors: [
        {
          name: 'Video Black',
          variable: '--video-black',
          cssClass: 'text-video-black',
          bg: 'bg-video-black',
          hsl: '0 0% 5%',
          usage: 'Deep black for maximum contrast, video overlays',
          textOn: 'white',
          contrast: 'AAA',
          examples: ['Video overlays', 'Maximum contrast text', 'Dark themes']
        },
        {
          name: 'Video White',
          variable: '--video-white',
          cssClass: 'text-video-white',
          bg: 'bg-video-white',
          hsl: '0 0% 98%',
          usage: 'Clean white backgrounds, maximum brightness',
          textOn: 'dark',
          contrast: 'AAA',
          examples: ['Page backgrounds', 'Clean sections', 'Card backgrounds']
        }
      ]
    },
    {
      name: 'Social Media Colors',
      description: 'Vibrant colors for social media and dynamic content. Use sparingly for accents.',
      colors: [
        {
          name: 'Social Purple',
          variable: '--social-purple',
          cssClass: 'text-social-purple',
          bg: 'bg-social-purple',
          hsl: '270 100% 65%',
          usage: 'Social media accents, creative content highlights',
          textOn: 'white',
          contrast: 'AA',
          examples: ['Social media icons', 'Creative sections', 'Dynamic accents']
        },
        {
          name: 'Social Pink',
          variable: '--social-pink',
          cssClass: 'text-social-pink',
          bg: 'bg-social-pink',
          hsl: '320 100% 70%',
          usage: 'Attention-grabbing elements, energetic content',
          textOn: 'dark',
          contrast: 'AA',
          examples: ['Call-outs', 'Trending content', 'Energy highlights']
        },
        {
          name: 'Social Orange',
          variable: '--social-orange',
          cssClass: 'text-social-orange',
          bg: 'bg-social-orange',
          hsl: '25 100% 60%',
          usage: 'Warm accents, action-oriented elements',
          textOn: 'dark',
          contrast: 'AA',
          examples: ['Action buttons', 'Warm highlights', 'Engagement elements']
        }
      ]
    }
  ];

  const contrastBadge = (level: string) => {
    if (level === 'AAA') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
          <Check className="w-3 h-3" /> AAA
        </span>
      );
    } else if (level === 'AA') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
          <Check className="w-3 h-3" /> AA
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
          <X className="w-3 h-3" /> Fail
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-video-white">
      <MetaTags 
        title="Visual Style Guide | Palmer House Productions"
        description="Comprehensive color and typography guide for maintaining consistent, accessible designs."
      />

      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold text-corporate-dark mb-2">Visual Style Guide</h1>
          <p className="text-lg text-corporate-gray">
            Comprehensive color system and usage guidelines for Palmer House Productions
          </p>
        </div>
      </header>

      {/* Quick Guide Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-corporate-dark mb-6">Quick Reference Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-corporate-dark">Do Use</h3>
                    <ul className="space-y-2 text-corporate-gray">
                      <li>• Semantic color variables (text-primary, text-foreground)</li>
                      <li>• Pal colors for character-specific content</li>
                      <li>• Corporate colors for professional sections</li>
                      <li>• Contrast-tested color combinations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-corporate-dark">Don&apos;t Use</h3>
                    <ul className="space-y-2 text-corporate-gray">
                      <li>• Hard-coded color values (text-gray-500)</li>
                      <li>• Custom colors without approval</li>
                      <li>• Low-contrast text combinations</li>
                      <li>• Social colors for body text</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-primary rounded-lg p-6">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-primary mb-2">Accessibility First</h3>
                  <p className="text-corporate-gray">
                    All color combinations must meet WCAG 2.1 standards. Aim for AAA (4.5:1 for body text, 3:1 for large text) 
                    whenever possible. AA is the minimum acceptable standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color System Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {colorCategories.map((category, idx) => (
            <div key={idx} className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-corporate-dark mb-3">{category.name}</h2>
                <p className="text-lg text-corporate-gray">{category.description}</p>
              </div>

              <div className="grid gap-8">
                {category.colors.map((color, colorIdx) => (
                  <div key={colorIdx} className="bg-background rounded-2xl shadow-lg overflow-hidden border border-border">
                    {/* Color Header with Swatch */}
                    <div className="grid md:grid-cols-3 gap-0">
                      {/* Large Color Swatch */}
                      <div className={`${color.bg} p-12 flex items-center justify-center relative`}>
                        <div className={`text-center ${color.textOn === 'white' ? 'text-white' : 'text-corporate-dark'}`}>
                          <div className="text-2xl font-bold mb-2">{color.name}</div>
                          <div className="text-sm opacity-90">HSL: {color.hsl}</div>
                        </div>
                      </div>

                      {/* Color Details */}
                      <div className="md:col-span-2 p-8">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-corporate-dark mb-2">{color.name}</h3>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            {contrastBadge(color.contrast)}
                            <code className="px-3 py-1 bg-gray-100 text-corporate-gray rounded text-sm font-mono">
                              {color.cssClass}
                            </code>
                            <code className="px-3 py-1 bg-gray-100 text-corporate-gray rounded text-sm font-mono">
                              var({color.variable})
                            </code>
                          </div>
                          <p className="text-corporate-gray mb-4">{color.usage}</p>
                        </div>

                        {/* Usage Examples */}
                        <div>
                          <h4 className="font-bold text-sm uppercase text-corporate-gray mb-3 tracking-wide">
                            Common Uses:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {color.examples.map((example, exIdx) => (
                              <span 
                                key={exIdx}
                                className="px-3 py-1.5 bg-gray-100 text-corporate-dark rounded-full text-sm"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Examples */}
                    <div className="border-t border-border p-8 bg-muted">
                      <h4 className="font-bold text-sm uppercase text-corporate-gray mb-4 tracking-wide">
                        Live Examples:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Example 1: As Text */}
                        <div className="bg-background p-6 rounded-lg border border-border">
                          <div className="text-xs uppercase font-bold text-corporate-gray mb-3">As Text Color</div>
                          <h3 className={`text-2xl font-bold ${color.cssClass} mb-2`}>
                            Heading Example
                          </h3>
                          <p className={`${color.cssClass}`}>
                            This is how body text looks with this color. Ensure proper contrast for readability.
                          </p>
                        </div>

                        {/* Example 2: As Background */}
                        <div className="bg-background p-6 rounded-lg border border-border">
                          <div className="text-xs uppercase font-bold text-corporate-gray mb-3">As Background</div>
                          <div className={`${color.bg} p-6 rounded-lg ${color.textOn === 'white' ? 'text-white' : 'text-corporate-dark'}`}>
                            <h3 className="text-xl font-bold mb-2">Section Title</h3>
                            <p className="text-sm">
                              Content on this background color maintains proper contrast ratios.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-corporate-dark mb-8">Typography Scale</h2>
          
          <div className="space-y-8 max-w-4xl">
            <div className="border-l-4 border-primary pl-6">
              <div className="text-xs uppercase font-bold text-corporate-gray mb-2">Heading 1</div>
              <h1 className="text-foreground">The quick brown fox jumps over the lazy dog</h1>
              <code className="text-xs text-muted-foreground">text-4xl md:text-5xl lg:text-6xl font-bold</code>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <div className="text-xs uppercase font-bold text-corporate-gray mb-2">Heading 2</div>
              <h2 className="text-foreground">The quick brown fox jumps over the lazy dog</h2>
              <code className="text-xs text-muted-foreground">text-3xl md:text-4xl font-bold</code>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <div className="text-xs uppercase font-bold text-corporate-gray mb-2">Heading 3</div>
              <h3 className="text-foreground">The quick brown fox jumps over the lazy dog</h3>
              <code className="text-xs text-muted-foreground">text-2xl md:text-3xl font-semibold</code>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <div className="text-xs uppercase font-bold text-corporate-gray mb-2">Body Text</div>
              <p className="text-corporate-gray text-lg">
                The quick brown fox jumps over the lazy dog. This is regular body text that should be easy to read 
                and maintain proper contrast ratios for accessibility.
              </p>
              <code className="text-xs text-muted-foreground">text-base md:text-lg text-corporate-gray</code>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <div className="text-xs uppercase font-bold text-corporate-gray mb-2">Small Text / Captions</div>
              <p className="text-muted-foreground text-sm">
                The quick brown fox jumps over the lazy dog. Used for captions, helper text, and secondary information.
              </p>
              <code className="text-xs text-muted-foreground">text-sm text-muted-foreground</code>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-corporate-dark mb-8">Best Practices</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            <div className="bg-background p-6 rounded-xl shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-corporate-dark">Semantic First</h3>
              <p className="text-corporate-gray text-sm">
                Always use semantic color variables (primary, foreground, muted-foreground) instead of hard-coded values.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-corporate-dark">Test Contrast</h3>
              <p className="text-corporate-gray text-sm">
                Always verify contrast ratios meet WCAG AA standards (4.5:1 for body text, 3:1 for large text).
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-corporate-dark">Context Matters</h3>
              <p className="text-corporate-gray text-sm">
                Use pal colors for character-specific content, corporate colors for professional sections, and semantic colors for UI elements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-corporate-dark text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            Palmer House Productions Visual Style Guide • Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
}
