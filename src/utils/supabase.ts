import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseClient } from "@supabase/supabase-js";

const privateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const run = async () => {
  const client = new SupabaseClient(url, privateKey);
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: 'match_documents',
  });

  const match_documents = await store.similaritySearch("恐惧");
  console.log(match_documents)
  return match_documents[0].pageContent;
};
