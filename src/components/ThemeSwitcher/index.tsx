"use client";

import clsx from "clsx";
import { SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function saveThemeLocalStorage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    const next = theme === "dark" ? "light" : "dark";
    console.log(next);
    setTheme(next);
  }

  return (
    <button
      className={clsx(
        "fixed block z-10 bottom-5 right-5",
        "cursor-pointer p-4 rounded-full",
        "bg-slate-300 text-slate-900 dark:bg-slate-600 dark:text-slate-100",
        "[&_svg]:w-5 [&_svg]:h-5",
      )}
      onClick={(e) => saveThemeLocalStorage(e)}
    >
      <SunIcon />
    </button>
  );
}
