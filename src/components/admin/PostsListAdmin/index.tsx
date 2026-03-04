import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "../DeletePostButton";
import { ErrorMessage } from "../../ErrorMessage";

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  if (posts.length <= 0)
    return (
      <ErrorMessage
        pageTitle="Ops! Não encontramos posts!"
        contentTitle="Ops! 😅"
        content="Parece que não criamos nenhum post ainda."
      />
    );

  return (
    <div className="mb-16">
      {posts.map((post) => (
        <div
          className={clsx(
            "py-2 px-4",
            !post.published && "bg-slate-500 dark:bg-slate-700",
            "flex gap-2 items-center justify-between",
          )}
          key={post.id}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

          {!post.published && (
            <span className="text-xs ml-2 italic text-slate-600 dark:text-slate-300">
              (Não publicado)
            </span>
          )}

          <DeletePostButton id={post.id} title={post.title} />
        </div>
      ))}
    </div>
  );
}
