"use client";

import clsx from "clsx";

type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
};

export function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div
        className={clsx(
          "min-h-80 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900",
          "mb-16 p-8 rounded-xl",
          "flex items-center justify-center",
          "text-center",
        )}
      >
        <div>
          <h1 className={clsx("text-7xl/tight mb-4 font-extrabold")}>
            {contentTitle}
          </h1>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}
