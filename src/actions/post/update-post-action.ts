"use server";

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from "@/dto/post/dto";
import { verifyLoginSession } from "@/lib/login/manage-login";
import { PostUpdateSchema } from "@/lib/post/validations";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: boolean;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticaded = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!isAuthenticaded) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ["Faça login antes de salvar."],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());

    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ["Erro desconhecido"],
    };
  }

  revalidateTag("posts", "default");
  revalidateTag(`post-${post.slug}`, "default");

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: true,
  };
}
