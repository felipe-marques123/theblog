import clsx from "clsx";
import { Button } from "../Button";

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onCancel,
  onConfirm,
  disabled = false,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }

  return (
    <div
      className={clsx(
        "fixed z-50 inset-0",
        "bg-black/50 backdrop-blur-xs",
        "flex items-center justify-center",
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          "bg-slate-50 dark:bg-slate-800",
          "p-6 px-12 rounded-lg max-w-2xl mx-6",
          "flex flex-col gap-6 text-center",
        )}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-description"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="dialog-title" className="text-2xl font-extrabold">
          {title}
        </h3>
        <p id="dialog-description" className="mb-4">
          {content}
        </p>
        <div className="flex items-center justify-around">
          <Button
            color="ghost"
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button color="default" onClick={onConfirm} disabled={disabled}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
