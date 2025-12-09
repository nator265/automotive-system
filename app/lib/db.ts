// db.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "automotive";

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
  db?: Db;
};

export const client =
  globalForMongo.mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 10,
  });

if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = client;
}

// Connect once and export the DB
export const db: Db = globalForMongo.db ?? client.db(dbName);

if (!globalForMongo.db) {
  client.connect().then(() => {
    globalForMongo.db = client.db(dbName);
    console.log("MongoDB connected:", dbName);
  });
}
