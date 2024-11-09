interface Env {
  KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  console.log(context);
  const value = await context.env.KV.get("example");
  return new Response("Success");
};
