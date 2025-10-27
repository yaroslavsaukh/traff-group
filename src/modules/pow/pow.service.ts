import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class PowService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  /**
   * Optional helper: create a challenge id (server-side) - here we do not keep server-side nonce,
   * but provide recommended difficulty and TTL. You could enhance with server-signed challenge.
   */
  getChallenge(clientId: string, difficulty = 4): { difficulty: number; expiresInMs: number } {
    return { difficulty, expiresInMs: 30_000 };
  }

  async isNonceUsed(clientId: string, nonce: string): Promise<boolean> {
    const key = `pow:nonce:${clientId}:${nonce}`;
    const res = await this.redisClient.get(key);
    return Boolean(res);
  }
}
