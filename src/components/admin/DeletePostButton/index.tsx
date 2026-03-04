"use client";

import { deletePostAction } from "@/actions/post/delete-post-action";
import { Dialog } from "@/components/Dialog";
import { clsx } from "clsx";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleDeleteClick() {
    setShowDialog(true);
  }

  async function handleConfirm() {
    toast.dismiss();

    startTransition(async () => {
      const result = await deletePostAction(id);

      setShowDialog(false);

      if (result.error) {
        toast.error(`Erro: ${result.error}`)
        return
      }

      toast.success("Post apagado com sucesso!")
    });
  }

  return (
    <>
      <button
        className={clsx(
          "text-red-500 cursor-pointer transition",
          "[&_svg]:w-4 [&_svg]:h-4",
          "hover:text-red-700 hover:dark:text-red-300",
          "disabled:text-slate-600 disabled:dark:text-slate-300 disabled:cursor-not-allowed",
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleDeleteClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>

      {showDialog && (
        <Dialog
          title="Apagar post"
          content={`Tem certeza que gostaria de apagar o post: ${title}`}
          isVisible={showDialog}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
