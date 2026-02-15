type Props = {
  cookingExperience: string;
  setCookingExperience: (value: string) => void;
  budgetLevel: string;
  setBudgetLevel: (value: string) => void;
  togglePreference: (pref: string) => void;
  dietaryPreferences: string[];
};

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Principiante", emoji: "👶" },
  { value: "intermediate", label: "Intermedio", emoji: "👨‍🍳" },
  { value: "advanced", label: "Avanzado", emoji: "⭐" },
] as const;

const BUDGET_LEVELS = [
  { value: "low", label: "Económico", emoji: "💰" },
  { value: "medium", label: "Moderado", emoji: "💵" },
  { value: "high", label: "Flexible", emoji: "💸" },
] as const;

const DIETARY_PREFERENCES = [
  { value: "vegetariano", label: "Vegetariano", emoji: "🥬" },
  { value: "vegano", label: "Vegano", emoji: "🌱" },
  { value: "sin-gluten", label: "Sin Gluten", emoji: "🌾" },
  { value: "sin-lactosa", label: "Sin Lactosa", emoji: "🥛" },
  { value: "bajo-en-sodio", label: "Bajo en Sodio", emoji: "🧂" },
] as const;

export default function CookingSelection({
  cookingExperience,
  setCookingExperience,
  budgetLevel,
  setBudgetLevel,
  togglePreference,
  dietaryPreferences,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium">
          ¿Cuánta experiencia tienes cocinando?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setCookingExperience(level.value)}
              className={`hover:border-primary/50 flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                cookingExperience === level.value
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <span className="text-2xl">{level.emoji}</span>
              <span className="text-sm font-medium">{level.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium">¿Cuál es tu presupuesto?</label>
        <div className="grid grid-cols-3 gap-3">
          {BUDGET_LEVELS.map((budget) => (
            <button
              key={budget.value}
              type="button"
              onClick={() => setBudgetLevel(budget.value)}
              className={`hover:border-primary/50 flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                budgetLevel === budget.value
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <span className="text-2xl">{budget.emoji}</span>
              <span className="text-sm font-medium">{budget.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium">
          Preferencias dietéticas (opcional)
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {DIETARY_PREFERENCES.map((pref) => (
            <button
              key={pref.value}
              type="button"
              onClick={() => togglePreference(pref.value)}
              className={`hover:border-primary/50 flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all ${
                dietaryPreferences.includes(pref.value)
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <span className="text-xl">{pref.emoji}</span>
              <span className="text-sm">{pref.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
