import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function InputText({ labelText = "", ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-3">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "bg-white dark:bg-slate-900 outline-0 text-base/tight",
          "ring-2 ring-slate-400 dark:ring-slate-600 rounded",
          "p-2 transition focus:ring-blue-600",
          "placeholder-slate-400 dark:placeholder-slate-400",
          "disabled:bg-slate-200 dark:disabled:bg-slate-700",
          "disabled:text-slate-400 dark:disabled:text-slate-400",
          "disabled:placeholder-slate-300 dark:disabled:placeholder-slate-300",
          "read-only:bg-slate-100 dark:read-only:bg-slate-800",
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
