"use client";

import { useFileUpload } from "@/hooks/shared/use-file-upload";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

type ImageUploaderProps = {
  placeholder?: string;
  maxSizeMB?: number;
};

export default function ImageUploader({
  placeholder,
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const {
    files,
    isDragging,
    errors,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    openFileDialog,
    removeFile,
    getInputProps,
  } = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          className="border-input hover:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
          data-dragging={isDragging || undefined}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={-1}
        >
          <input
            {...getInputProps()}
            aria-label="Upload file"
            className="sr-only"
          />
          {previewUrl ? (
            <div className="absolute inset-0">
              <img
                alt={files[0]?.file?.name || "Uploaded image"}
                className="size-full object-cover"
                src={previewUrl}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                aria-hidden="true"
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                {placeholder || "Drop your image here"}
              </p>
              <p className="text-muted-foreground text-xs">
                PNG, JPG or WebP (max. {maxSizeMB}MB)
              </p>
              <Button
                className="mt-4"
                onClick={openFileDialog}
                variant="outline"
              >
                <UploadIcon
                  aria-hidden="true"
                  className="-ms-1 size-4 opacity-60"
                />
                Seleccionar imagen
              </Button>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              aria-label="Remove image"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              type="button"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
