import { hashPassword } from "@/lib/login/manage-login";

(async () => {
  const minhaSenha = "";
  const hashDaSenhaEmBase64 = await hashPassword(minhaSenha);

  console.log(hashDaSenhaEmBase64);
})();
