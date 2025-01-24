import { PrismaClient } from "@prisma/client";

export default class BaseRepository {
  protected defaultLimit = 10;
  protected defaultOffset = 0;
  protected client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  getClient() {
    return this.client;
  }
}

export type Constructor<T = {}> = new (...args: any[]) => T;
