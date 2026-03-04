import { ManagePostForm } from "@/components/admin/ManagePostForm";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Criar Post"
}

export default async function AdminNewPostPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Criar Post</h1>
      <ManagePostForm mode="create" />
    </>
  );
}
