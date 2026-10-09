import { createFileRoute } from "@tanstack/react-router";
import { PlanningCallStep } from "./checkout-success";
import { OnboardingBookingCard } from "@/components/studio/OnboardingBookingCard";
export const Route = createFileRoute("/zz-mock-receipt")({ component: () => (
  <div className="mx-auto max-w-2xl space-y-8 p-8">
    <PlanningCallStep purchasedAt={Date.UTC(2026, 9, 9, 3)} />
    <PlanningCallStep purchasedAt={null} />
    <OnboardingBookingCard />
  </div>) });
