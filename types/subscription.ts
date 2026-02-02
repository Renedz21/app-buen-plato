export type SubscriptionStatus = "free" | "active" | "canceled" | "past_due";
export type SubscriptionPlan = "free" | "pro";

export interface Subscription {
  id: string;
  user_id: string;
  polar_customer_id: string | null;
  polar_subscription_id: string | null;
  status: SubscriptionStatus;
  plan: SubscriptionPlan;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionContextValue {
  isPro: boolean;
}
