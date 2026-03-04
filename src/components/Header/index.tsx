import clsx from "clsx";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1
        className={clsx(
          "text-4xl font-extrabold py-10",
          "sm:text-5xl sm:py-10",
          "md:text-6xl sm:py-11",
          "lg:text-7xl sm:py-12",
        )}
      >
        <Link href="/">The Blog</Link>
      </h1>
    </header>
  );
}
