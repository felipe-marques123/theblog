"use client";

import { logoutAction } from "@/actions/login/logout-action";
import clsx from "clsx";
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => setIsOpen(false), [pathName]);

  const navClasses = clsx(
    "bg-slate-900 dark:bg-slate-100",
    "flex flex-col mb-8",
    "sm:flex-row sm:flex-wrap rounded-lg",
    "overflow-hidden",
    !isOpen && "h-10",
    !isOpen && "shrink-0",
    "sm:overflow-visible sm:h-auto",
  );
  const linkClasses = clsx(
    "[&>svg]:w-[16px] [&>svg]:h-[16px] px-4 py-1 rounded-lg cursor-pointer",
    "flex items-center justify-start gap-2",
    "transition hover:bg-slate-800 dark:hover:bg-slate-200",
    "text-slate-50 dark:text-slate-900",
    "h-10",
    "shrink-0",
  );
  const openCloseBtnClasses = clsx(
    linkClasses,
    "text-blue-200 italic",
    "sm:hidden",
  );

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen((s) => !s)}
        className={openCloseBtnClasses}
      >
        {!isOpen && (
          <>
            <HouseIcon />
            Home
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Home
          </>
        )}
      </button>

      <a className={linkClasses} href="/" target="_blank">
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href="/admin/post">
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href="/admin/post/new">
        <PlusIcon />
        Criar post
      </Link>

      <a onClick={(e) => handleLogout(e)} className={linkClasses}>
        {isPending && (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}
