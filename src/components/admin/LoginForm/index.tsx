"use client";

import { loginAction } from "@/actions/login/login-action";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import clsx from "clsx";
import { LogInIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export const dynamic = "force-dynamic";

export function LoginForm() {
  const initialState = {
    username: "",
    error: "",
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "text-center max-w-sm mt-16 mb-32 mx-auto",
      )}
    >
      <form action={action} className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <InputText
            labelText="Usuário"
            name="username"
            placeholder="Seu usuário"
            type="text"
            disabled={isPending}
            defaultValue={state.username}
          />

          <InputText
            labelText="Senha"
            name="password"
            placeholder="Sua senha"
            type="password"
            disabled={isPending}
          />

          <Button type="submit" disabled={false} className="mt-4">
            <LogInIcon />
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
