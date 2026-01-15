import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMenuOptimizer } from "@/hooks/menu/use-menu-optimizer";

vi.mock("@/contexts/auth-context", () => ({
  useAuth: () => ({ user: { id: "test-user-id" } }),
}));

vi.mock("@/app/(dashboard)/(routes)/dashboard/menu/actions", () => ({
  saveMenu: vi.fn().mockResolvedValue(undefined),
}));

describe("useMenuOptimizer", () => {
  const defaultProps = { savedMenus: [] };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("initializes with empty state", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      expect(result.current.entradas).toEqual([]);
      expect(result.current.platos).toEqual([]);
      expect(result.current.aiRecommendation).toBeNull();
      expect(result.current.currentMenuId).toBeNull();
    });

    it("canAnalyze is false when no items", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      expect(result.current.canAnalyze).toBe(false);
    });
  });

  describe("addEntrada", () => {
    it("adds entrada to list", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa de pollo");
      });
      expect(result.current.entradas).toContain("Sopa de pollo");
    });

    it("trims whitespace from entrada", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("  Ensalada  ");
      });
      expect(result.current.entradas).toContain("Ensalada");
    });

    it("ignores empty string", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("");
      });
      expect(result.current.entradas).toHaveLength(0);
    });

    it("ignores whitespace-only string", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("   ");
      });
      expect(result.current.entradas).toHaveLength(0);
    });

    it("prevents duplicate entradas", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addEntrada("Sopa");
      });
      expect(result.current.entradas).toHaveLength(1);
    });
  });

  describe("addPlato", () => {
    it("adds plato to list", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addPlato("Lomo saltado");
      });
      expect(result.current.platos).toContain("Lomo saltado");
    });

    it("trims whitespace from plato", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addPlato("  Arroz con pollo  ");
      });
      expect(result.current.platos).toContain("Arroz con pollo");
    });

    it("prevents duplicate platos", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addPlato("Pollo");
        result.current.addPlato("Pollo");
      });
      expect(result.current.platos).toHaveLength(1);
    });
  });

  describe("removeEntrada", () => {
    it("removes entrada from list", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addEntrada("Ensalada");
      });
      act(() => {
        result.current.removeEntrada("Sopa");
      });
      expect(result.current.entradas).not.toContain("Sopa");
      expect(result.current.entradas).toContain("Ensalada");
    });

    it("does nothing if entrada not found", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
      });
      act(() => {
        result.current.removeEntrada("NonExistent");
      });
      expect(result.current.entradas).toHaveLength(1);
    });
  });

  describe("removePlato", () => {
    it("removes plato from list", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addPlato("Lomo");
        result.current.addPlato("Pollo");
      });
      act(() => {
        result.current.removePlato("Lomo");
      });
      expect(result.current.platos).not.toContain("Lomo");
      expect(result.current.platos).toContain("Pollo");
    });
  });

  describe("canAnalyze", () => {
    it("is false with only entradas", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
      });
      expect(result.current.canAnalyze).toBe(false);
    });

    it("is false with only platos", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addPlato("Lomo");
      });
      expect(result.current.canAnalyze).toBe(false);
    });

    it("is true with at least one entrada and one plato", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addPlato("Lomo");
      });
      expect(result.current.canAnalyze).toBe(true);
    });

    it("remains true with multiple items", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addEntrada("Ensalada");
        result.current.addPlato("Lomo");
        result.current.addPlato("Pollo");
      });
      expect(result.current.canAnalyze).toBe(true);
    });
  });

  describe("saveMenu", () => {
    it("returns false for empty menu name", async () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addPlato("Lomo");
      });
      let success: boolean | undefined;
      await act(async () => {
        success = await result.current.saveMenu("");
      });
      expect(success).toBe(false);
    });

    it("returns false for whitespace-only menu name", async () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addPlato("Lomo");
      });
      let success: boolean | undefined;
      await act(async () => {
        success = await result.current.saveMenu("   ");
      });
      expect(success).toBe(false);
    });

    it("returns false when no entradas", async () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addPlato("Lomo");
      });
      let success: boolean | undefined;
      await act(async () => {
        success = await result.current.saveMenu("Mi Menú");
      });
      expect(success).toBe(false);
    });

    it("returns false when no platos", async () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
      });
      let success: boolean | undefined;
      await act(async () => {
        success = await result.current.saveMenu("Mi Menú");
      });
      expect(success).toBe(false);
    });

    it("calls saveMenu action with valid data", async () => {
      const { saveMenu } = await import("@/app/(dashboard)/(routes)/dashboard/menu/actions");
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addPlato("Lomo");
      });
      await act(async () => {
        await result.current.saveMenu("Mi Menú");
      });
      expect(saveMenu).toHaveBeenCalledWith("Mi Menú", ["Sopa"], ["Lomo"]);
    });
  });

  describe("reset", () => {
    it("clears all state", () => {
      const { result } = renderHook(() => useMenuOptimizer(defaultProps));
      act(() => {
        result.current.addEntrada("Sopa");
        result.current.addPlato("Lomo");
      });
      expect(result.current.entradas).toHaveLength(1);
      expect(result.current.platos).toHaveLength(1);
      act(() => {
        result.current.reset();
      });
      expect(result.current.entradas).toEqual([]);
      expect(result.current.platos).toEqual([]);
      expect(result.current.aiRecommendation).toBeNull();
      expect(result.current.currentMenuId).toBeNull();
    });
  });
});
