import * as React from "react";
import { Body, Button, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  reference?: string;
  customerName?: string;
  covered?: boolean;
  depositPaid?: string;
  intakeUrl?: string;
  bookingUrl?: string;
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

function ClientDepositConfirmed({
  reference = "PH-XXXXXX",
  customerName = "",
  covered = false,
  depositPaid = "",
  intakeUrl = "",
  bookingUrl = "",
  bookBy = "",
  meetBy = "",
}: Props) {
  const first = customerName.trim().split(/\s+/)[0];
  return (
    <Html lang="en">
      <Head />
      <Preview>Your video project is booked — next, book your planning call.</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "24px", maxWidth: "560px" }}>
          <Heading style={{ fontSize: "22px", color: "#1a1a1a" }}>
            {first ? `Thanks, ${first} — your project is booked.` : "Your project is booked."}
          </Heading>
          <Text style={text}>
            {covered
              ? "Your Partner membership's included filming session covers this booking, so there was nothing to pay."
              : `We received your 50% deposit${depositPaid ? ` of ${depositPaid}` : ""}. Stripe sends your payment receipt separately.`}
          </Text>
          <Text style={{ ...text, fontWeight: 700 }}>Your next two steps</Text>
          <Text style={text}>
            1. Book your 30-minute video planning call. This call plans your shoot — it does not
            reserve a filming date. We'll agree on the filming date together.
          </Text>
          {bookingUrl ? (
            <Button href={bookingUrl} style={button}>
              Book your planning call
            </Button>
          ) : null}
          <Text style={{ ...text, fontSize: "13px", color: "#555" }}>
            Times are available Tuesdays and Thursdays, 9 am–5 pm Pacific. Please book within 7 days of your purchase{bookBy ? ` (by ${bookBy})` : ""}, and aim to
            meet within 14 days{meetBy ? ` (by ${meetBy})` : ""}. Appointments require at least 24
            hours' notice. If the times don't work, reply to this email and we'll help.
          </Text>
          {intakeUrl ? (
            <Text style={text}>
              2. Tell us about your project in our intake form:{" "}
              <a href={intakeUrl}>complete your project intake</a>.
            </Text>
          ) : null}
          <Text style={{ fontSize: "13px", color: "#777" }}>Reference: {reference}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: ClientDepositConfirmed,
  subject: (d: Record<string, any>) =>
    `Your video project is booked${d.reference ? ` · ${d.reference}` : ""}`,
  displayName: "Video project booked (customer)",
  previewData: {
    reference: "PH-7K2M9Q",
    customerName: "Jane Doe",
    depositPaid: "$450.00",
    intakeUrl: "https://example.com/intake",
    bookingUrl: "https://calendar.google.com/",
    bookBy: "October 15, 2026",
    meetBy: "October 22, 2026",
  },
} satisfies TemplateEntry;
