import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type SafeMarkdown = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdown) {
  return (
    <div
      className={clsx(
        "prose prose-slate dark:prose-invert",
        "w-full max-w-none",
        "overflow-hidden",
        "prose-img:mx-auto",
        "md:prose-lg",
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return "";

            return (
              <div className="overflow-x-auto">
                <table className="w-full min-w-150" {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
