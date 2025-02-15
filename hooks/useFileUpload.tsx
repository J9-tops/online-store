"use client";
import axios, { AxiosProgressEvent } from "axios";
import React, { useRef, useState } from "react";

const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);
  const [status, setStatus] = useState<"idle" | "uploading">("idle");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageURL, setImageURL] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      setProgress(0);

      const formData = new FormData();
      formData.append("file", selectedFile);
      if (process.env.NEXT_PUBLIC_PRESET_KEY) {
        formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_KEY);
      } else {
        throw new Error("PRESET_KEY is not defined in environment variables");
      }

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              setStatus("uploading");
              if (progressEvent.total) {
                const percentageCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentageCompleted);
              }
            },
          }
        );

        setStatus("idle");
        setImageURL(response.data?.url);
        setProgress(100);

        setTimeout(() => {
          setStatus("idle");
        }, 500);
      } catch (error) {
        console.error("Upload error:", error);
      }
    } else {
      setStatus("idle");
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const changeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(changeEvent);
    }
  };

  return {
    handleFileUpload,
    progress,
    fileRef,
    status,
    imageLoading,
    setImageLoading,
    handleDragOver,
    handleDrop,
    imageURL,
  };
};

export default useFileUpload;
