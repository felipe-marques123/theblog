import { PostDate } from "../PostDate";
import { PostHeading } from "../PostHeading";

type PostSummaryProps = {
  link: string;
  postHeading: "h2" | "h3";
  title: string;
  createdAt: string;
  excerpt: string;
};

export function PostSummary({
  link,
  postHeading,
  title,
  createdAt,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className="text-slate-900 dark:text-slate-100 flex flex-col justify-center">
      <PostDate createdAt={createdAt} />
      <PostHeading href={link} as={postHeading}>
        {title}
      </PostHeading>
      <p className="text-sm/relaxed">{excerpt}</p>
    </div>
  );
}
