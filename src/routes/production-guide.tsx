import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  FaqList,
  CtaBand,
} from "@/components/site/PageShell";

const doThis = [
  "Wear solid, muted colors — navy, charcoal, olive, burgundy, cream work great",
  "Bring 2-3 outfit options so we can pick the best one for the set",
  "Iron or steam your clothes beforehand — wrinkles show up on camera",
  "Wear layers that can be added or removed for visual variety",
  "Keep jewelry simple and minimal — no jingling bracelets",
  "Hair should be clean and styled how you normally wear it",
];

const avoidThis = [
  "Busy patterns, thin stripes, or small checkers — they create a moiré effect on camera",
  "Bright white or neon colors — they blow out under studio lighting",
  "All black — it can look flat and lose depth on screen",
  "Large logos or branded clothing (unless intentional)",
  "New shoes that might squeak on hard floors",
  "Heavy cologne or perfume — you'll be in close quarters with the crew",
];

const environment = [
  {
    title: "Natural Light",
    body: "A room with large windows is ideal. If shooting indoors, turn off overhead lights to avoid mixed color temperatures.",
  },
  {
    title: "Quiet Atmosphere",
    body: "Ensure AC is off or quiet, windows are closed to street noise, and coworkers know you are recording.",
  },
  {
    title: "Depth & Space",
    body: "Avoid standing directly against a wall. We need at least 6-8 feet of depth to create that professional blurred background.",
  },
];

const planning = [
  {
    title: "Bullet Points > Scripts",
    body: "Reading a script makes you look like a robot. Know your key bullets and speak naturally.",
  },
  {
    title: 'The "Pause" Trick',
    body: "Mess up? Don't apologize. Just stop, take a breath, smile, and start the sentence over. We'll cut the bad take.",
  },
  {
    title: "Energy Levels",
    body: "The camera eats energy. Aim for 10-15% more enthusiasm than your normal conversation level.",
  },
];

const schedule = [
  { time: "9:00 AM", item: "Crew Arrival & Setup" },
  { time: "9:45 AM", item: "Sound & Light Check" },
  { time: "10:00 AM", item: "First Take / Warm-up" },
  { time: "12:00 PM", item: "Wrap Up" },
];

const faqs = [
  {
    q: "What if I have a blemish on the day of?",
    a: "Don't worry — our crew can help minimize it on camera, and we can also lightly touch it up in post-production.",
  },
  {
    q: "Can I wear glasses?",
    a: "Yes. We'll adjust lighting angles to avoid glare, but let us know ahead of time so we can plan accordingly.",
  },
  {
    q: "How long does setup take?",
    a: "Typically 30-45 minutes for our crew to set up lighting, sound, and camera before we begin filming.",
  },
];

function ProductionGuidePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="You're Booked — Let's Prep!"
        title="Production Day"
        highlight="Guide"
        subtitle="Congrats on booking your session! Here's everything you need to show up confident and camera-ready. No stress, just great content."
      />

      <Section
        eyebrow="Wardrobe"
        title="What to Wear & Grooming"
        subtitle="Your wardrobe plays a bigger role on camera than you'd think. Here's how to look polished without overthinking it."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Do This</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {doThis.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-gradient-brand">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Avoid This</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {avoidThis.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-muted-foreground">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
          If you're doing multiple videos, plan outfits that look noticeably different so content
          feels fresh across videos.
        </p>
      </Section>

      <Section
        muted
        eyebrow="Location"
        title="Location & Environment"
        subtitle="We'll handle the lighting and camera angles, but the environment sets the mood. Here's what we need from the space."
      >
        <CardGrid cols={3}>
          {environment.map((e) => (
            <Card key={e.title} title={e.title} body={e.body} />
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="Content Planning"
        title="Content Planning"
        subtitle="Preparation is 90% of the work. Come ready with your key talking points, but don't worry about memorizing a script word-for-word."
      >
        <CardGrid cols={3}>
          {planning.map((p, i) => (
            <Card key={p.title} index={i + 1} title={p.title} body={p.body} />
          ))}
        </CardGrid>
        <p className="mx-auto mt-8 max-w-xl text-center font-display text-xl font-bold italic">
          "Authenticity wins over perfection every time."
        </p>
      </Section>

      <Section muted eyebrow="Day-Of Logistics" title="Sample Schedule">
        <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {schedule.map((s, i) => (
            <div
              key={s.time}
              className={`flex items-center justify-between px-6 py-4 ${i !== schedule.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="font-display font-bold text-gradient-brand">{s.time}</span>
              <span className="text-sm text-muted-foreground">{s.item}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
          Please arrive 15 mins early.
        </p>
        <CardGrid cols={3}>
          <Card
            title="Hydrate & Rest"
            body="Drink plenty of water the day before. Avoid salty foods to prevent puffiness. Get a good night's sleep."
          />
          <Card
            title="Emergency Kit"
            body="Bring a comb, translucent powder (for shine), lip balm, and lint roller. We have some, but personal is best."
          />
          <Card
            title="Guests"
            body="Keep the set clear. Only essential personnel in the room to maintain focus and audio quality."
          />
        </CardGrid>
      </Section>

      <Section eyebrow="Common Questions" title="Frequently Asked Questions">
        <FaqList items={faqs} />
      </Section>

      <CtaBand
        title="Ready to Create Something Amazing?"
        subtitle="We're excited to work with you. If you have any last-minute questions before the shoot, just reply to your confirmation email."
        primaryLabel="Contact Support"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/production-guide")({
  head: () => ({
    meta: [
      { title: "Production Day Guide | Palmer House Productions" },
      {
        name: "description",
        content:
          "Everything you need to prep for your video shoot: wardrobe tips, environment setup, content planning, and day-of logistics.",
      },
      { property: "og:title", content: "Production Day Guide | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "Show up confident and camera-ready with our full production day preparation guide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductionGuidePage,
});
