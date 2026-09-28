import * as React from "react";
import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  reference?: string;
  customerName?: string;
  customerEmail?: string;
  company?: string;
  depositPaid?: string;
  estimatedTotal?: string;
  items?: string;
}

function DepositBooked({
  reference = "PH-XXXXXX",
  customerName = "A customer",
  customerEmail = "",
  company = "",
  depositPaid = "",
  estimatedTotal = "",
  items = "",
}: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New video project booked: {reference}</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "24px", maxWidth: "560px" }}>
          <Heading style={{ fontSize: "22px", color: "#1a1a1a" }}>
            New video project booked
          </Heading>
          <Text style={{ fontSize: "15px", color: "#333" }}>
            {customerName} paid a 50% deposit to book a project. They were sent to the HoneyBook
            intake form next.
          </Text>
          <Text style={{ fontSize: "14px", color: "#333", lineHeight: "22px" }}>
            Reference: {reference}
            <br />
            Customer: {customerName} {customerEmail ? `(${customerEmail})` : ""}
            {company ? (
              <>
                <br />
                Company: {company}
              </>
            ) : null}
            <br />
            Deposit paid: {depositPaid}
            <br />
            Estimated total: {estimatedTotal}
          </Text>
          {items ? (
            <Text style={{ fontSize: "14px", color: "#555", whiteSpace: "pre-line" }}>{items}</Text>
          ) : null}
          <Text style={{ fontSize: "13px", color: "#777" }}>
            Invoice the balance through HoneyBook before delivery.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: DepositBooked,
  subject: (d: Record<string, any>) => `New project booked: ${d.reference ?? "deposit paid"}`,
  displayName: "Production deposit booked (team)",
  to: "info@palmerhouseproductions.com",
  previewData: {
    reference: "PH-7K2M9Q",
    customerName: "Jane Doe",
    customerEmail: "jane@example.com",
    depositPaid: "$450.00",
    estimatedTotal: "$900.00",
    items: "Brand story video",
  },
} satisfies TemplateEntry;
