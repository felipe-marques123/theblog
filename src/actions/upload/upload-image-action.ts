"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type uploadImageActionProps = {
  url: String;
  error: String;
};

const fileUploadMaxSize = Number(process.env.FILE_UPLOAD_MAX_SIZE) || 921600;
const imageUploadDirectory = process.env.IMAGE_UPLOAD_DIRECTORY || "uploads";
const imageServerUrl =
  process.env.IMAGE_SERVER_URL || "http://localhost:3000/uploads";

export async function uploadImageAction(
  formData: FormData,
): Promise<uploadImageActionProps> {
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  const isAuthenticaded = await verifyLoginSession();

  if (!isAuthenticaded) {
    return makeResult({ error: "Faça login novamente" });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  if (file.size > fileUploadMaxSize) {
    return makeResult({ error: "Arquivo é muito grande" });
  }

  if (!file.type.startsWith("image/")) {
    return makeResult({ error: "Imagem inválida" });
  }

  const imageExtension = extname(file.name);
  const uniqueName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(process.cwd(), "public", imageUploadDirectory);
  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueName);

  await writeFile(fileFullPath, buffer);

  const url = `${imageServerUrl}/${uniqueName}`;

  return makeResult({ url });
}
