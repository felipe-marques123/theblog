"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { postRepository } from "@/repositories/post";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  const isAuthenticaded = await verifyLoginSession();

  if (!isAuthenticaded) {
    return {
      errors: ["Faça login novamente"],
    };
  }

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: [e.message],
      };
    }

    return {
      errors: ["Erro desconhecido"],
    };
  }

  revalidateTag("posts", "default");
  revalidateTag(`post-${post.slug}`, "default");

  return {
    error: "",
  };
}
