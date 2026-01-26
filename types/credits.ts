export interface UserCredits {
  user_id: string;
  credits_remaining: number;
  last_reset_timestamp: string;
  created_at: string;
  updated_at: string;
}

export interface CreditsContextValue {
  credits: number;
  isLoading: boolean;
  hasCredits: boolean;
  consumeCredit: () => Promise<boolean>;
  refetch: () => Promise<void>;
}

export interface CreditValidationResult {
  allowed: boolean;
  remaining: number;
  needsUpgrade?: boolean;
}
