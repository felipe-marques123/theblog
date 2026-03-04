import Link from "next/link";

type PostHeadingType = {
  children: React.ReactNode;
  href: string;
  as?: "h2" | "h3";
};

export function PostHeading({
  children,
  href,
  as: Tag = "h2",
}: PostHeadingType) {
  const TagHeadingMap = {
    h2: "text-2xl font-extrabold pt-3 pb-4 md:text-3xl md:pb-8 lg:text-4xl",
    h3: "text-1xl font-bold pt-2 pb-3 md:text-2xl md:pb-4 lg:text-xl",
  };

  return (
    <Tag className={TagHeadingMap[Tag]}>
      <Link href={href}>{children}</Link>
    </Tag>
  );
}
