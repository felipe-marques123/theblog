import { LoginForm } from "@/components/admin/LoginForm";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
};

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return (
      <ErrorMessage
        pageTitle="403"
        contentTitle="403"
        content="Libere o login nas configurações do sistema"
      />
    );
  }

  return <LoginForm />;
}
