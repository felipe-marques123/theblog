import clsx from "clsx";

import { PostSummary } from "../PostSummary";
import { PostCoverImage } from "../PostCoverImage";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";

export async function PostsList() {
  const posts = await findAllPublicPostsCached();

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-8",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
      )}
    >
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;

        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostCoverImage
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
              linkProps={{ href: postLink }}
            />
            <PostSummary
              link={postLink}
              postHeading="h3"
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
