import { createClient } from "redis";

export default async function initializeRedis() {
  const client = createClient();
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();

  return client;
}
