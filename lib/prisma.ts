import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

// in production mode instantiate new PrismaClient
// in develop, instantiate it on start and then reuse the same
// next.js specific - (hot)reloads would otherwise exaust the remote db connections limit
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
