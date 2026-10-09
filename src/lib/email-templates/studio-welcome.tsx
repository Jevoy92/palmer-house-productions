import * as React from "react";
import { Body, Button, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  planName?: string;
  bookingUrl?: string;
  studioUrl?: string;
  bookBy?: string;
  meetBy?: string;
}

const text = { fontSize: "15px", color: "#333", lineHeight: "23px" };
const button = {
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  borderRadius: "10px",
  padding: "12px 20px",
  fontSize: "15px",
  fontWeight: 700,
  textDecoration: "none",
};

function StudioWelcome({ planName = "Studio", bookingUrl = "", studioUrl = "", bookBy = "", meetBy = "" }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to Palmer House {planName} — book your onboarding call.</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "24px", maxWidth: "560px" }}>
          <Heading style={{ fontSize: "22px", color: "#1a1a1a" }}>
            Welcome to Palmer House {planName}.
          </Heading>
          <Text style={text}>
            Your membership is active. Our team would love to set you up properly, so your first
            step is a 30-minute Studio onboarding call.
          </Text>
          {bookingUrl ? (
            <Button href={bookingUrl} style={button}>
              Book your Studio onboarding
            </Button>
          ) : null}
          <Text style={{ ...text, fontSize: "13px", color: "#555" }}>
            Please book within 7 days of your purchase{bookBy ? ` (by ${bookBy})` : ""}, and aim to
            meet within 14 days{meetBy ? ` (by ${meetBy})` : ""}. Appointments require at least 24
            hours' notice. If the times don't work, reply to this email and we'll help.
          </Text>
          {studioUrl ? (
            <Text style={text}>
              You can start right away: <a href={studioUrl}>open your Studio</a>.
            </Text>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: StudioWelcome,
  subject: (d: Record<string, any>) => `Welcome to Palmer House ${d.planName ?? "Studio"}`,
  displayName: "Studio membership welcome (customer)",
  previewData: {
    planName: "Studio",
    bookingUrl: "https://calendar.google.com/",
    studioUrl: "https://www.palmerhouseproductions.com/studio",
    bookBy: "October 15, 2026",
    meetBy: "October 22, 2026",
  },
} satisfies TemplateEntry;
