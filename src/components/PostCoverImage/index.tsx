import Link from "next/link";
import Image from "next/image";

type PostCoverImageType = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageType) {
  return (
    <Link
      href={linkProps.href}
      className="w-full overflow-hidden rounded-xl"
    >
      <Image
        {...imageProps}
        className="hover:scale-105 transition object-cover object-center"
        alt={imageProps.alt}
      />
    </Link>
  );
}
