import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
  const jsonPostsRepository = new JsonPostRepository();
  const posts = await jsonPostsRepository.findAllPublic();

  try {
    await drizzleDb.delete(postsTable); // LIMPA A BASE DE DADOS
    await drizzleDb.insert(postsTable).values(posts);

    console.log();
    console.log(`${posts.length} posts foram salvos na base de dados.`);
    console.log();
  } catch (e) {
    console.log();
    console.log("Ocorreu um erro");
    console.log();
    console.log(e);
    console.log();
  }
})();
