import { useCredits as useCreditsContext } from "@/contexts/credits-context";

export function useCredits() {
  return useCreditsContext();
}
