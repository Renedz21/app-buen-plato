import { describe, it, expect } from "vitest";
import {
  snackSchema,
  menuSchema,
  buildSnackPrompt,
  buildMenuPrompt,
  getPromptAndSchema,
} from "@/types/schemas/ai-recommendations";

describe("snackSchema", () => {
  it("validates correct snack recommendation response", () => {
    const validResponse = {
      recommendations: [
        {
          name: "Yogurt con granola",
          price_range: "S/ 5-8",
          reason: "Ligero y práctico",
          icon: "🥛",
        },
      ],
      tip: "Bebe agua antes de comer",
      avoid: "Evita bebidas azucaradas",
    };
    const result = snackSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it("rejects response without recommendations array", () => {
    const invalidResponse = {
      tip: "Bebe agua",
      avoid: "Evita azúcar",
    };
    const result = snackSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it("rejects recommendation missing required fields", () => {
    const invalidResponse = {
      recommendations: [{ name: "Yogurt" }],
      tip: "Bebe agua",
      avoid: "Evita azúcar",
    };
    const result = snackSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it("accepts empty recommendations array", () => {
    const response = {
      recommendations: [],
      tip: "No hay opciones disponibles",
      avoid: "N/A",
    };
    const result = snackSchema.safeParse(response);
    expect(result.success).toBe(true);
  });
});

describe("menuSchema", () => {
  it("validates correct menu evaluation response", () => {
    const validResponse = {
      evaluation: {
        type: "good",
        message: "Buena combinación balanceada",
      },
      betterOption: {
        entrada: "Ensalada",
        plato: "Pollo a la plancha",
        reason: "Más ligero para la tarde",
      },
      warning: null,
      tip: "Evita bebidas gaseosas",
    };
    const result = menuSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it("validates all evaluation types", () => {
    const types = ["excellent", "good", "heavy", "ok"] as const;
    for (const type of types) {
      const response = {
        evaluation: { type, message: "Test" },
        betterOption: { entrada: null, plato: null, reason: "N/A" },
        warning: null,
        tip: "Test tip",
      };
      const result = menuSchema.safeParse(response);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid evaluation type", () => {
    const response = {
      evaluation: { type: "invalid", message: "Test" },
      betterOption: { entrada: null, plato: null, reason: "N/A" },
      warning: null,
      tip: "Test tip",
    };
    const result = menuSchema.safeParse(response);
    expect(result.success).toBe(false);
  });

  it("accepts nullable warning field", () => {
    const response = {
      evaluation: { type: "good", message: "OK" },
      betterOption: { entrada: "Sopa", plato: "Arroz", reason: "Mejor opción" },
      warning: "Cuidado con la sal",
      tip: "Tip",
    };
    const result = menuSchema.safeParse(response);
    expect(result.success).toBe(true);
  });
});

describe("buildSnackPrompt", () => {
  it("includes hunger level in prompt", () => {
    const prompt = buildSnackPrompt({ hungerLevel: "high" });
    expect(prompt).toContain("nivel: high");
  });

  it("includes location in prompt", () => {
    const prompt = buildSnackPrompt({ purchaseLocation: "tambo" });
    expect(prompt).toContain("TAMBO");
  });

  it("includes current hour when provided", () => {
    const prompt = buildSnackPrompt({ currentHour: 15 });
    expect(prompt).toContain("15:00");
  });

  it("includes last meal time when provided", () => {
    const prompt = buildSnackPrompt({ lastMealTime: "12:30 PM" });
    expect(prompt).toContain("12:30 PM");
  });

  it("uses default values when context is empty", () => {
    const prompt = buildSnackPrompt({});
    expect(prompt).toContain("nivel: medium");
    expect(prompt).toContain("CASA");
  });

  it("generates different prompts for different hunger levels", () => {
    const lowPrompt = buildSnackPrompt({ hungerLevel: "low" });
    const highPrompt = buildSnackPrompt({ hungerLevel: "high" });
    expect(lowPrompt).not.toBe(highPrompt);
  });
});

describe("buildMenuPrompt", () => {
  it("includes entradas in prompt", () => {
    const prompt = buildMenuPrompt({}, { entradas: ["Sopa", "Ensalada"] });
    expect(prompt).toContain("Sopa");
    expect(prompt).toContain("Ensalada");
  });

  it("includes platos in prompt", () => {
    const prompt = buildMenuPrompt({}, { platos: ["Lomo saltado", "Arroz con pollo"] });
    expect(prompt).toContain("Lomo saltado");
    expect(prompt).toContain("Arroz con pollo");
  });

  it("handles empty menu items", () => {
    const prompt = buildMenuPrompt({}, { entradas: [], platos: [] });
    expect(prompt).toContain("ninguna");
    expect(prompt).toContain("ninguno");
  });

  it("includes current hour", () => {
    const prompt = buildMenuPrompt({ currentHour: 13 }, {});
    expect(prompt).toContain("13:00");
  });
});

describe("getPromptAndSchema", () => {
  it("returns snack schema for snack type", () => {
    const result = getPromptAndSchema("snack", {});
    expect(result.schema).toBe(snackSchema);
    expect(result.prompt).toBeDefined();
  });

  it("returns menu schema for menu type", () => {
    const result = getPromptAndSchema("menu", {}, {});
    expect(result.schema).toBe(menuSchema);
    expect(result.prompt).toBeDefined();
  });

  it("throws error for unknown type", () => {
    expect(() => getPromptAndSchema("unknown", {})).toThrow("Unknown recommendation type");
  });

  it("passes context to prompt builder", () => {
    const result = getPromptAndSchema("snack", { hungerLevel: "high" });
    expect(result.prompt).toContain("high");
  });

  it("passes data to menu prompt builder", () => {
    const result = getPromptAndSchema("menu", {}, { entradas: ["Ceviche"] });
    expect(result.prompt).toContain("Ceviche");
  });
});
