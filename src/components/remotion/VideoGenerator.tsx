import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Play, Download, Eye } from "lucide-react";
import { VideoGenerationModal } from './VideoGenerationModal';
import { VideoGenerationRequest } from '@/lib/videoGeneration';

interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  duration: string;
  dimensions: string;
  icon: React.ReactNode;
}

const videoTemplates: VideoTemplate[] = [
  {
    id: 'faq-video',
    name: 'FAQ Video',
    description: 'Professional FAQ videos for your business with branded styling',
    duration: '30 seconds',
    dimensions: '1920x1080 (HD)',
    icon: <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">Q</div>
  },
  {
    id: 'social-reel',
    name: 'Social Media Reel',
    description: 'Vertical format videos perfect for Instagram, TikTok, and YouTube Shorts',
    duration: '15 seconds',
    dimensions: '1080x1920 (Vertical)',
    icon: <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold">S</div>
  },
  {
    id: 'founder-video',
    name: 'Founder Story',
    description: 'Professional founder introduction videos for your about page',
    duration: '60 seconds',
    dimensions: '1920x1080 (HD)',
    icon: <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold">F</div>
  }
];

export const VideoGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('faq-video');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [generationRequest, setGenerationRequest] = useState<VideoGenerationRequest | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    'faq-video': {
      question: 'How do we handle client revisions?',
      answer: 'We provide up to 3 rounds of revisions included in all our packages, with clear feedback forms to streamline the process.',
      brandColor: '#3B82F6',
      logo: ''
    },
    'social-reel': {
      title: '5 Tips for Better Videos',
      tips: ['Plan your content', 'Use good lighting', 'Record clear audio', 'Keep it concise', 'Add captions'],
      brandColor: '#3B82F6',
      logo: ''
    },
    'founder-video': {
      founderName: 'Your Name',
      companyName: 'Your Company',
      tagline: 'Transforming businesses through video',
      story: 'Tell your unique story and mission here...',
      brandColor: '#3B82F6',
      logo: ''
    }
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [selectedTemplate]: {
        ...prev[selectedTemplate],
        [key]: value
      }
    }));
  };

  const handleArrayInputChange = (key: string, index: number, value: string) => {
    const currentArray = [...(formData[selectedTemplate][key] || [])];
    currentArray[index] = value;
    handleInputChange(key, currentArray);
  };

  const addArrayItem = (key: string) => {
    const currentArray = [...(formData[selectedTemplate][key] || [])];
    currentArray.push('');
    handleInputChange(key, currentArray);
  };

  const removeArrayItem = (key: string, index: number) => {
    const currentArray = [...(formData[selectedTemplate][key] || [])];
    currentArray.splice(index, 1);
    handleInputChange(key, currentArray);
  };

  const handleGenerate = async () => {
    const request: VideoGenerationRequest = {
      template: selectedTemplate as any,
      props: formData[selectedTemplate],
      outputFormat: 'mp4',
      quality: 'high'
    };
    
    setGenerationRequest(request);
    setShowGenerationModal(true);
  };

  const handlePreview = () => {
    // TODO: Open Remotion preview in a new window
    const url = `http://localhost:3000/remotion?composition=${selectedTemplate}&props=${encodeURIComponent(JSON.stringify(formData[selectedTemplate]))}`;
    console.log('Preview URL would be:', url);
    alert('Preview functionality would open Remotion player. Check console for preview URL.');
  };

  const currentTemplate = videoTemplates.find(t => t.id === selectedTemplate);
  const currentData = formData[selectedTemplate];

  const renderFormFields = () => {
    switch (selectedTemplate) {
      case 'faq-video':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={currentData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                placeholder="Enter your FAQ question"
              />
            </div>
            <div>
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                value={currentData.answer}
                onChange={(e) => handleInputChange('answer', e.target.value)}
                placeholder="Enter your FAQ answer"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="brandColor">Brand Color</Label>
              <div className="flex gap-2">
                <Input
                  id="brandColor"
                  type="color"
                  value={currentData.brandColor}
                  onChange={(e) => handleInputChange('brandColor', e.target.value)}
                  className="w-16"
                />
                <Input
                  value={currentData.brandColor}
                  onChange={(e) => handleInputChange('brandColor', e.target.value)}
                  placeholder="#3B82F6"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="logo">Logo URL (optional)</Label>
              <Input
                id="logo"
                value={currentData.logo}
                onChange={(e) => handleInputChange('logo', e.target.value)}
                placeholder="https://your-logo-url.com/logo.png"
              />
            </div>
          </div>
        );

      case 'social-reel':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={currentData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter reel title"
              />
            </div>
            <div>
              <Label>Tips/Points</Label>
              {currentData.tips.map((tip: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={tip}
                    onChange={(e) => handleArrayInputChange('tips', index, e.target.value)}
                    placeholder={`Tip ${index + 1}`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('tips', index)}
                    disabled={currentData.tips.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('tips')}
                disabled={currentData.tips.length >= 10}
              >
                Add Tip
              </Button>
            </div>
            <div>
              <Label htmlFor="brandColor">Brand Color</Label>
              <div className="flex gap-2">
                <Input
                  id="brandColor"
                  type="color"
                  value={currentData.brandColor}
                  onChange={(e) => handleInputChange('brandColor', e.target.value)}
                  className="w-16"
                />
                <Input
                  value={currentData.brandColor}
                  onChange={(e) => handleInputChange('brandColor', e.target.value)}
                  placeholder="#3B82F6"
                />
              </div>
            </div>
          </div>
        );

      case 'founder-video':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="founderName">Founder Name</Label>
              <Input
                id="founderName"
                value={currentData.founderName}
                onChange={(e) => handleInputChange('founderName', e.target.value)}
                placeholder="Enter founder's name"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={currentData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={currentData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                placeholder="Enter company tagline"
              />
            </div>
            <div>
              <Label htmlFor="story">Founder Story</Label>
              <Textarea
                id="story"
                value={currentData.story}
                onChange={(e) => handleInputChange('story', e.target.value)}
                placeholder="Tell your founder story..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="brandColor">Brand Color</Label>
              <div className="flex gap-2">
                <Input
                  id="brandColor"
                  type="color"
                  value={currentData.brandColor}
                  onChange={(e) => handleInputChange('brandColor', e.target.value)}
                  className="w-16"
                />
                <Input
                  value={currentData.brandColor}
                  onChange={(e) => handleInputChange('brandColor', e.target.value)}
                  placeholder="#3B82F6"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Video Generator</h1>
        <p className="text-muted-foreground">Create professional videos instantly with our automated templates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
          <div className="space-y-3">
            {videoTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-primary shadow-md'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {template.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">{template.duration}</Badge>
                        <Badge variant="outline" className="text-xs">{template.dimensions}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Form and Preview */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit Content</TabsTrigger>
              <TabsTrigger value="generate">Generate Video</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentTemplate?.icon}
                    {currentTemplate?.name}
                  </CardTitle>
                  <CardDescription>{currentTemplate?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderFormFields()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ready to Generate</CardTitle>
                  <CardDescription>Preview or generate your video with the current settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={handlePreview}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {isGenerating ? 'Generating...' : 'Generate Video'}
                    </Button>
                  </div>

                  <Separator />

                  <div className="text-sm text-muted-foreground">
                    <h4 className="font-semibold mb-2">What happens next:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Video will be rendered using your content and branding</li>
                      <li>Processing typically takes 30-60 seconds</li>
                      <li>You'll receive a download link when complete</li>
                      <li>Videos are available in HD quality</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};