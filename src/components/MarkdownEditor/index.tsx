"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useId } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type MarkdownEditorProps = {
  labelText?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaName: string;
  disabled?: boolean;
};

export function MarkdownEditor({
  labelText = "",
  value,
  setValue,
  textAreaName,
  disabled = false,
}: MarkdownEditorProps) {
  const id = useId();
  const { resolvedTheme } = useTheme();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div
      className="flex flex-col gap-3"
      data-color-mode={colorMode}
      suppressHydrationWarning
    >
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <MDEditor
        className="whitespace-pre-wrap"
        value={value}
        onChange={(value) => {
          if (value === undefined) return;
          setValue(value);
        }}
        height={400}
        extraCommands={[]}
        preview="edit"
        hideToolbar={disabled}
        textareaProps={{
          id,
          name: textAreaName,
          disabled: disabled,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
      />
    </div>
  );
}
