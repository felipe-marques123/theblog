import { formateDatetime, formateRelativetime } from "@/utils/format-datetime";

type PostDateProps = {
  createdAt: string;
};

export function PostDate({ createdAt }: PostDateProps) {
  return (
    <time
      dateTime={formateDatetime(createdAt)}
      className="text-slate-500 dark:text-slate-400"
      title={formateDatetime(createdAt)}
    >
      {formateRelativetime(createdAt)}
    </time>
  );
}
