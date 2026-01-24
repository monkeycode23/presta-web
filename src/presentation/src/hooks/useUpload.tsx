import { useRef, useState } from "react";

export type UploadStatus = "idle" | "uploading" | "done" | "error";

export interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  result?: any;
  error?: string;
}
export const useCloudinaryUpload = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const xhrMap = useRef<Map<string, XMLHttpRequest>>(new Map());

  const uploadFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      const id = crypto.randomUUID();

      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "TU_UPLOAD_PRESET");

      xhrMap.current.set(id, xhr);

      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;

        const progress = Math.round((e.loaded / e.total) * 100);
        setUploads((prev) =>
          prev.map((u) =>
            u.id === id ? { ...u, progress } : u
          )
        );
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploads((prev) =>
            prev.map((u) =>
              u.id === id
                ? { ...u, status: "done", result: JSON.parse(xhr.responseText) }
                : u
            )
          );
        } else {
          fail(id, "Upload failed");
        }
      };

      xhr.onerror = () => fail(id, "Network error");

      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/auto/upload"
      );

      setUploads((prev) => [
        ...prev,
        {
          id,
          file,
          progress: 0,
          status: "uploading",
        },
      ]);

      xhr.send(formData);
    });
  };

  const cancelUpload = (id: string) => {
    const xhr = xhrMap.current.get(id);
    if (xhr) {
      xhr.abort();
      xhrMap.current.delete(id);
      setUploads((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: "error", error: "Canceled" } : u
        )
      );
    }
  };

  const fail = (id: string, message: string) => {
    setUploads((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "error", error: message } : u
      )
    );
    xhrMap.current.delete(id);
  };

  return {
    uploads,
    uploadFiles,
    cancelUpload,
  };
};
