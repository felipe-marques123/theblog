import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { ErrorMessage } from "../ErrorMessage";

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  const firstPost = posts[0];

  if (posts.length <= 0)
    return (
      <ErrorMessage
        pageTitle="Ops! Não encontramos posts!"
        contentTitle="Ops! 😅"
        content="Parece que não criamos nenhum post ainda."
      />
    );

  const postLink = `/post/${firstPost.slug}`;

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: firstPost.coverImageUrl,
          alt: firstPost.title,
          priority: true,
        }}
      />
      <PostSummary
        link={postLink}
        postHeading="h2"
        title={firstPost.title}
        createdAt={firstPost.createdAt}
        excerpt={firstPost.excerpt}
      />
    </section>
  );
}
