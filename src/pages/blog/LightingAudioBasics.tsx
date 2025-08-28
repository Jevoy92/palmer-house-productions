import { Navigation } from "@/components/Navigation";
import { MetaTags } from "@/components/seo/MetaTags";
import { BlogPost } from "@/components/blog/BlogPost";
import lightingAudioImage from "@/assets/blog/lighting-audio-basics.jpg";

const LightingAudioBasics = () => {
  const blogData = {
    title: "Lighting & Audio Basics: Technical Foundations for Business Videos",
    excerpt: "Master the technical fundamentals of lighting and audio to create professional-quality business videos that command attention and respect.",
    content: `
# Lighting & Audio Basics: Technical Foundations for Business Videos

Professional video isn't just about expensive equipment—it's about understanding the fundamentals of light and sound. Master these basics, and you'll create content that looks and sounds professional regardless of your budget.

## Lighting Fundamentals

### The Three-Point Lighting System

This classic setup forms the foundation of professional lighting:

**Key Light (Primary)**
- Position: 45 degrees to one side of your subject
- Purpose: Main illumination and mood setting
- Intensity: Brightest light in your setup

**Fill Light (Secondary)**
- Position: Opposite side of key light, lower intensity
- Purpose: Reduces harsh shadows created by key light
- Intensity: 50-75% of key light brightness

**Back Light (Rim)**
- Position: Behind subject, aimed at shoulders/hair
- Purpose: Separates subject from background
- Intensity: Equal to or slightly brighter than key light

### Practical Business Applications

**For Talking Head Videos**:
- Key light: Large window or softbox camera left
- Fill light: Reflector or small LED panel camera right
- Back light: Small LED strip behind subject

**For Product Demonstrations**:
- Even, shadowless lighting using multiple sources
- Avoid hot spots that create glare
- Maintain consistent color temperature

### Color Temperature Essentials

Understanding color temperature prevents the "orange and blue" disaster:

- **Daylight**: 5600K (cool, blue-ish)
- **Tungsten**: 3200K (warm, orange-ish)
- **Fluorescent**: 4100K (green-ish)

**Golden Rule**: Match all light sources or intentionally create contrast for effect.

### Lighting Modifiers

**Softboxes**
- Effect: Large, even light source
- Use: Flattering portraits, reduces harsh shadows
- Budget alternative: Sheer curtain over window

**Umbrellas**
- Effect: Broad, soft light with gradual falloff
- Use: Quick setup, forgiving for movement
- Types: Shoot-through (softer) vs. reflective (more controlled)

**Reflectors**
- Effect: Bounces existing light to fill shadows
- Use: Outdoor shoots, budget fill lighting
- Types: White (neutral), silver (contrast), gold (warmth)

## Audio Fundamentals

### The 50% Rule

Audio quality accounts for roughly 50% of perceived video quality. Poor audio will kill an otherwise perfect video.

### Microphone Types for Business

**Lavalier (Lapel) Microphones**
- Best for: Interviews, presentations, hands-free recording
- Pros: Invisible, consistent distance from mouth
- Cons: Can pick up clothing rustle, limited to one speaker

**Shotgun Microphones**
- Best for: Boom operation, directional pickup
- Pros: Highly directional, professional sound
- Cons: Requires operator or boom stand

**USB/XLR Dynamic Microphones**
- Best for: Desk setups, podcasting, voice-overs
- Pros: Excellent rejection of background noise
- Cons: Requires close positioning (6-12 inches)

### Audio Recording Principles

**The Inverse Square Law**
Sound intensity decreases exponentially with distance. Double the distance = quarter the volume.

**Practical Application**: Get microphones as close as possible without appearing in frame.

**Signal-to-Noise Ratio**
The difference between desired audio (voice) and unwanted noise (background).

**Improvement strategies**:
- Record in quiet environments
- Use directional microphones
- Apply noise reduction in post-production

### Room Acoustics

**Hard vs. Soft Surfaces**
- Hard surfaces (glass, tile, walls): Create echo and reverb
- Soft surfaces (carpet, curtains, furniture): Absorb sound

**Quick Acoustic Treatment**:
- Record in rooms with furniture and fabric
- Hang blankets on walls during recording
- Use walk-in closets for voice-over work

## Technical Settings and Setup

### Camera Settings for Optimal Lighting

**ISO Sensitivity**
- Keep as low as possible (100-400) for best image quality
- Increase lighting rather than ISO when possible
- Modern cameras: ISO 800-1600 can still look professional

**Frame Rate Considerations**
- 24fps: Cinematic look, more forgiving of lighting inconsistencies
- 30fps: Standard for business content, requires more stable lighting
- 60fps: Smooth motion, demands excellent lighting

### Audio Recording Settings

**Sample Rate**: 48kHz (industry standard for video)
**Bit Depth**: 24-bit (provides headroom for post-production)
**Recording Levels**: Peak at -12dB, average at -18dB

### Monitoring and Quality Control

**For Lighting**:
- Use camera's histogram to avoid clipping
- Check for color casts using white balance
- Monitor for consistent exposure across cuts

**For Audio**:
- Use headphones during recording
- Record 30 seconds of room tone for editing
- Check levels don't exceed -6dB peak

## Budget-Friendly Professional Setups

### $200 Lighting Kit
- 2x LED panels with diffusion
- 1x 5-in-1 reflector
- Basic light stands
- Result: Professional three-point lighting

### $150 Audio Kit
- Wireless lavalier system
- Windscreen and shock mount
- Audio recorder (if camera lacks XLR input)
- Result: Clear, professional dialogue

## Common Technical Mistakes

### Lighting Errors
- Mixed color temperatures (orange/blue skin tones)
- Harsh shadows under eyes
- Background brighter than subject
- Inconsistent lighting between shots

### Audio Errors
- Recording too far from microphone
- Ignoring room acoustics
- Not monitoring audio during recording
- Inconsistent audio levels between cuts

## Professional Standards Checklist

Before you call it "professional quality":

**Lighting**:
- [ ] Subject properly exposed without clipping
- [ ] Even skin tones without color casts
- [ ] Appropriate contrast and mood
- [ ] Background separation achieved

**Audio**:
- [ ] Clear, intelligible dialogue
- [ ] Minimal background noise
- [ ] Consistent levels throughout
- [ ] No distortion or clipping

## Advanced Techniques

### Lighting for Different Skin Tones
Adjust setup based on subject's complexion to ensure flattering results.

### Creating Mood with Lighting
- High key: Bright, even lighting for corporate content
- Low key: Dramatic shadows for serious topics
- Practical lights: Include visible lamps/windows for realism

### Audio Sweetening
- Gentle EQ to enhance voice clarity
- Compression for consistent levels
- Noise reduction for clean backgrounds

Understanding these technical foundations gives you the power to create professional content regardless of budget. The goal isn't to match Hollywood production values—it's to eliminate technical distractions so your message can shine through clearly and professionally.

Remember: Perfect technique serves clear communication. Master these basics, and your business videos will command the respect and attention they deserve.
    `,
    category: "Technical Guide",
    readTime: "8 min read",
    publishDate: "2024-12-05",
    tags: ["lighting", "audio", "technical", "video production"],
    metaDescription: "Master the technical fundamentals of lighting and audio to create professional-quality business videos that command attention and respect.",
    keywords: "video lighting, audio recording, video production, technical guide, professional video",
    canonicalUrl: "https://www.palmerhouseproductions.com/blog/lighting-audio-basics",
    heroImage: lightingAudioImage,
    heroAlt: "Professional lighting and audio equipment setup for video production",
    ogImage: lightingAudioImage
  };

  return (
    <>
      <MetaTags 
        title="Lighting & Audio Basics: Technical Foundations for Business Videos"
        description="Master the technical fundamentals of lighting and audio to create professional-quality business videos that command attention and respect."
        keywords="video lighting, audio recording, video production, technical guide, professional video"
        ogImage={lightingAudioImage}
        canonicalUrl="https://www.palmerhouseproductions.com/blog/lighting-audio-basics"
      />
      <Navigation />
      <BlogPost {...blogData} />
    </>
  );
};

export default LightingAudioBasics;