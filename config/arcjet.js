import arcjet, { tokenBucket } from "@arcjet/node";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,

  characteristics: ["ip"], 

  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
      requested: 1,
    }),
  ],
});