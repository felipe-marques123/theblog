import { hashPassword } from "@/lib/login/manage-login";

(async () => {
  const minhaSenha = "!Tc4ch0rr0G!";
  const hashDaSenhaEmBase64 = await hashPassword(minhaSenha);

  console.log(hashDaSenhaEmBase64);
})();
