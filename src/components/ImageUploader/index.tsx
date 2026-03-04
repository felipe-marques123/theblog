"use client";

import { Button } from "../Button";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { uploadImageAction } from "@/actions/upload/upload-image-action";

type ImageUploaderProps = {
  disabled?: boolean;
};

const fileUploadMaxSize = Number(process.env.FILE_UPLOAD_MAX_SIZE) || 921600;

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState("");

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImageUrl("");
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImageUrl("");
      return;
    }

    if (file.size > fileUploadMaxSize) {
      const readSize = fileUploadMaxSize / 1024;

      toast.error(`O arquivo é grande demais. Max: ${readSize}Kb.`);

      setImageUrl("");
      fileInput.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        setImageUrl("");
        return;
      }

      setImageUrl(`${result.url}`);
      toast.success("Imagem enviada com sucesso!");
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        onClick={handleChooseFile}
        className="self-start"
        size="md"
        color="default"
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar
      </Button>

      {!!imageUrl && (
        <div className="flex flex-col gap-4 mt-4">
          <p>
            <b>URL:</b> {imageUrl}
          </p>

          <img src={imageUrl} className="rounded-lg" />
        </div>
      )}

      <input
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        type="file"
        name="file"
        accept="image/*"
        disabled={isUploading || disabled}
      />
    </div>
  );
}
