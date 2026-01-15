"use client";

import {
    type ChangeEvent,
    type DragEvent,
    type InputHTMLAttributes,
    useCallback,
    useRef,
    useState,
} from "react";

export type FileMetadata = {
    name: string;
    size: number;
    type: string;
    url: string;
    id: string;
};

export type FileWithPreview = {
    file: File | FileMetadata;
    id: string;
    preview?: string;
};

export type FileUploadOptions = {
    maxFiles?: number;
    maxSize?: number;
    accept?: string;
    multiple?: boolean;
    initialFiles?: FileMetadata[];
    onFilesChange?: (files: FileWithPreview[]) => void;
    onFilesAdded?: (addedFiles: FileWithPreview[]) => void;
};

type FileUploadState = {
    files: FileWithPreview[];
    isDragging: boolean;
    errors: string[];
};

export const useFileUpload = (options: FileUploadOptions = {}) => {
    const {
        maxFiles = Infinity,
        maxSize = Infinity,
        accept = "*",
        multiple = false,
        initialFiles = [],
        onFilesChange,
        onFilesAdded,
    } = options;

    const [state, setState] = useState<FileUploadState>({
        files: initialFiles.map((file) => ({
            file,
            id: file.id,
            preview: file.url,
        })),
        isDragging: false,
        errors: [],
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const isValidFileType = useCallback(
        (file: File | FileMetadata): boolean => {
            if (accept === "*") return true;

            const acceptedTypes = accept.split(",").map((t) => t.trim());
            const fileType = file.type || "";
            const fileExt = `.${file.name.split(".").pop()?.toLowerCase() || ""}`;

            return acceptedTypes.some((type) => {
                if (type.startsWith(".")) {
                    return fileExt === type.toLowerCase();
                }
                if (type.endsWith("/*")) {
                    return fileType.startsWith(type.split("/")[0] + "/");
                }
                return fileType === type;
            });
        },
        [accept]
    );

    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
    };

    const createFilePreview = (file: File | FileMetadata): string | undefined => {
        return file instanceof File ? URL.createObjectURL(file) : file.url;
    };

    const generateFileId = (file: File | FileMetadata): string => {
        if (file instanceof File) {
            return `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        }
        return file.id;
    };

    const updateState = useCallback(
        (updater: (prev: FileUploadState) => FileUploadState) => {
            setState((prev) => {
                const next = updater(prev);
                if (next.files !== prev.files) {
                    onFilesChange?.(next.files);
                }
                return next;
            });
        },
        [onFilesChange]
    );

    const addFiles = useCallback(
        (newFiles: FileList | File[]) => {
            if (!newFiles?.length) return;

            const filesArray = Array.from(newFiles);
            const errors: string[] = [];
            const validFiles: FileWithPreview[] = [];

            // En modo single, solo tomar el primer archivo
            const filesToProcess = multiple ? filesArray : [filesArray[0]];

            // Verificar límite de archivos
            if (multiple && state.files.length + filesToProcess.length > maxFiles) {
                setState((prev) => ({
                    ...prev,
                    errors: [`Máximo ${maxFiles} archivos permitidos`],
                }));
                return;
            }

            for (const file of filesToProcess) {
                if (multiple) {
                    const isDuplicateInState = state.files.some(
                        (f) => f.file.name === file.name && f.file.size === file.size
                    );
                    const isDuplicateInBatch = validFiles.some(
                        (f) => f.file.name === file.name && f.file.size === file.size
                    );
                    if (isDuplicateInState || isDuplicateInBatch) continue;
                }

                // Validar tamaño
                if (file.size > maxSize) {
                    errors.push(`Archivo excede el límite de ${formatBytes(maxSize)}`);
                    continue;
                }

                // Validar tipo
                if (!isValidFileType(file)) {
                    errors.push(`Tipo de archivo no permitido: ${file.name}`);
                    continue;
                }

                validFiles.push({
                    file,
                    id: generateFileId(file),
                    preview: createFilePreview(file),
                });
            }

            if (validFiles.length > 0) {
                onFilesAdded?.(validFiles);

                updateState((prev) => ({
                    ...prev,
                    files: multiple ? [...prev.files, ...validFiles] : validFiles,
                    errors,
                }));
            } else if (errors.length > 0) {
                setState((prev) => ({ ...prev, errors }));
            }

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        },
        [state.files, maxFiles, maxSize, multiple, isValidFileType, onFilesAdded, updateState]
    );

    const removeFile = useCallback(
        (id: string) => {
            updateState((prev) => {
                const fileToRemove = prev.files.find((f) => f.id === id);

                // Liberar URL si es necesario
                if (fileToRemove?.preview && fileToRemove.file instanceof File) {
                    URL.revokeObjectURL(fileToRemove.preview);
                }

                return {
                    ...prev,
                    files: prev.files.filter((f) => f.id !== id),
                    errors: [],
                };
            });
        },
        [updateState]
    );

    const clearFiles = useCallback(() => {
        setState((prev) => {
            // Liberar todas las URLs de objetos
            prev.files.forEach((f) => {
                if (f.preview && f.file instanceof File) {
                    URL.revokeObjectURL(f.preview);
                }
            });

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            const newState = { ...prev, files: [], errors: [] };
            onFilesChange?.(newState.files);
            return newState;
        });
    }, [onFilesChange]);

    const clearErrors = useCallback(() => {
        setState((prev) => ({ ...prev, errors: [] }));
    }, []);

    const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setState((prev) => ({ ...prev, isDragging: true }));
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.currentTarget.contains(e.relatedTarget as Node)) return;

        setState((prev) => ({ ...prev, isDragging: false }));
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setState((prev) => ({ ...prev, isDragging: false }));

            if (inputRef.current?.disabled || !e.dataTransfer.files.length) return;

            addFiles(e.dataTransfer.files);
        },
        [addFiles]
    );

    const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
                addFiles(e.target.files);
            }
        },
        [addFiles]
    );

    const openFileDialog = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const getInputProps = useCallback(
        (props: InputHTMLAttributes<HTMLInputElement> = {}) => ({
            ...props,
            type: "file" as const,
            accept: props.accept || accept,
            multiple: props.multiple ?? multiple,
            onChange: handleFileChange,
            ref: inputRef,
        }),
        [accept, multiple, handleFileChange]
    );

    return {
        files: state.files,
        isDragging: state.isDragging,
        errors: state.errors,
        addFiles,
        removeFile,
        clearFiles,
        clearErrors,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileChange,
        openFileDialog,
        getInputProps,
    };
};