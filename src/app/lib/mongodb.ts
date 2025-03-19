import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = "dnd_spells"; // Replace with your actual database name

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;

  return client;
}