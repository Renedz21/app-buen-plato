import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFileUpload } from "@/hooks/shared/use-file-upload";

const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File(["x".repeat(size)], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

describe("useFileUpload", () => {
  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:mock-url"),
      revokeObjectURL: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("initialization", () => {
    it("initializes with empty state", () => {
      const { result } = renderHook(() => useFileUpload());
      expect(result.current.files).toEqual([]);
      expect(result.current.isDragging).toBe(false);
      expect(result.current.errors).toEqual([]);
    });

    it("initializes with provided initial files", () => {
      const initialFiles = [
        { id: "1", name: "test.jpg", size: 1000, type: "image/jpeg", url: "http://example.com/test.jpg" },
      ];
      const { result } = renderHook(() => useFileUpload({ initialFiles }));
      expect(result.current.files).toHaveLength(1);
      expect(result.current.files[0].id).toBe("1");
    });
  });

  describe("addFiles", () => {
    it("adds valid file to state", () => {
      const { result } = renderHook(() => useFileUpload());
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(result.current.files).toHaveLength(1);
      expect(result.current.files[0].file).toBe(file);
    });

    it("rejects file exceeding max size", () => {
      const { result } = renderHook(() => useFileUpload({ maxSize: 500 }));
      const file = createMockFile("large.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(result.current.files).toHaveLength(0);
      expect(result.current.errors.length).toBeGreaterThan(0);
    });

    it("rejects invalid file type", () => {
      const { result } = renderHook(() => useFileUpload({ accept: "image/*" }));
      const file = createMockFile("doc.pdf", 1000, "application/pdf");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(result.current.files).toHaveLength(0);
      expect(result.current.errors.length).toBeGreaterThan(0);
    });

    it("accepts file with matching MIME type", () => {
      const { result } = renderHook(() => useFileUpload({ accept: "image/*" }));
      const file = createMockFile("photo.png", 1000, "image/png");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(result.current.files).toHaveLength(1);
    });

    it("accepts file with matching extension", () => {
      const { result } = renderHook(() => useFileUpload({ accept: ".jpg,.png" }));
      const file = createMockFile("photo.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(result.current.files).toHaveLength(1);
    });

    it("prevents duplicate files in multiple mode", () => {
      const { result } = renderHook(() => useFileUpload({ multiple: true }));
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file, file]);
      });
      expect(result.current.files).toHaveLength(1);
    });

    it("replaces file in single mode", () => {
      const { result } = renderHook(() => useFileUpload({ multiple: false }));
      const file1 = createMockFile("first.jpg", 1000, "image/jpeg");
      const file2 = createMockFile("second.jpg", 2000, "image/jpeg");
      act(() => {
        result.current.addFiles([file1]);
      });
      act(() => {
        result.current.addFiles([file2]);
      });
      expect(result.current.files).toHaveLength(1);
      expect(result.current.files[0].file.name).toBe("second.jpg");
    });

    it("respects maxFiles limit", () => {
      const { result } = renderHook(() => useFileUpload({ multiple: true, maxFiles: 2 }));
      const files = [
        createMockFile("1.jpg", 100, "image/jpeg"),
        createMockFile("2.jpg", 100, "image/jpeg"),
        createMockFile("3.jpg", 100, "image/jpeg"),
      ];
      act(() => {
        result.current.addFiles(files);
      });
      expect(result.current.files).toHaveLength(0);
      expect(result.current.errors).toContain("Máximo 2 archivos permitidos");
    });
  });

  describe("removeFile", () => {
    it("removes file by id", () => {
      const { result } = renderHook(() => useFileUpload());
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      const fileId = result.current.files[0].id;
      act(() => {
        result.current.removeFile(fileId);
      });
      expect(result.current.files).toHaveLength(0);
    });

    it("revokes object URL when removing file", () => {
      const { result } = renderHook(() => useFileUpload());
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      const fileId = result.current.files[0].id;
      act(() => {
        result.current.removeFile(fileId);
      });
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it("clears errors when removing file", () => {
      const { result } = renderHook(() => useFileUpload({ maxSize: 500 }));
      const validFile = createMockFile("small.jpg", 100, "image/jpeg");
      const invalidFile = createMockFile("large.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([validFile]);
      });
      act(() => {
        result.current.addFiles([invalidFile]);
      });
      expect(result.current.errors.length).toBeGreaterThan(0);
      const fileId = result.current.files[0].id;
      act(() => {
        result.current.removeFile(fileId);
      });
      expect(result.current.errors).toEqual([]);
    });
  });

  describe("clearFiles", () => {
    it("removes all files", () => {
      const { result } = renderHook(() => useFileUpload({ multiple: true }));
      const files = [
        createMockFile("1.jpg", 100, "image/jpeg"),
        createMockFile("2.jpg", 100, "image/jpeg"),
      ];
      act(() => {
        result.current.addFiles(files);
      });
      expect(result.current.files).toHaveLength(2);
      act(() => {
        result.current.clearFiles();
      });
      expect(result.current.files).toHaveLength(0);
    });

    it("clears errors", () => {
      const { result } = renderHook(() => useFileUpload({ maxSize: 50 }));
      const file = createMockFile("large.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(result.current.errors.length).toBeGreaterThan(0);
      act(() => {
        result.current.clearFiles();
      });
      expect(result.current.errors).toEqual([]);
    });
  });

  describe("callbacks", () => {
    it("calls onFilesChange when files change", () => {
      const onFilesChange = vi.fn();
      const { result } = renderHook(() => useFileUpload({ onFilesChange }));
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(onFilesChange).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ file }),
      ]));
    });

    it("calls onFilesAdded when files are added", () => {
      const onFilesAdded = vi.fn();
      const { result } = renderHook(() => useFileUpload({ onFilesAdded }));
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      act(() => {
        result.current.addFiles([file]);
      });
      expect(onFilesAdded).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ file }),
      ]));
    });
  });

  describe("getInputProps", () => {
    it("returns correct input props", () => {
      const { result } = renderHook(() => useFileUpload({ accept: "image/*", multiple: true }));
      const props = result.current.getInputProps();
      expect(props.type).toBe("file");
      expect(props.accept).toBe("image/*");
      expect(props.multiple).toBe(true);
    });

    it("allows overriding props", () => {
      const { result } = renderHook(() => useFileUpload({ accept: "image/*" }));
      const props = result.current.getInputProps({ accept: ".pdf" });
      expect(props.accept).toBe(".pdf");
    });
  });
});
