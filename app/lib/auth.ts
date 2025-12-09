import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db"; 

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    fields: {
      name: "string",
      contact: "string", // optional extra field
      role: "string", // default "client"
    },
    createdAt: "date",
  },
});
