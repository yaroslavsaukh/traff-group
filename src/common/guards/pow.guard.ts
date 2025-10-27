import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import { PowService } from '../../modules/pow/pow.service';

@Injectable()
export class ProofOfWorkGuard implements CanActivate {
  constructor(
    private readonly powService: PowService,
    @Inject('REDIS_CLIENT') private readonly redisClient: any,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const timestampHeader = req.headers['x-pow-timestamp'];
    const nonceHeader = req.headers['x-pow-nonce'];
    const clientId = (req.headers['x-client-id'] ?? '').toString();

    if (!timestampHeader || !nonceHeader) {
      throw new ForbiddenException('Missing PoW headers');
    }
    const timestamp = Number(timestampHeader);
    const nonce = nonceHeader.toString();

    if (Number.isNaN(timestamp)) {
      throw new ForbiddenException('Invalid timestamp');
    }

    const now = Date.now();
    const allowedWindow = 30_000; // 30 seconds
    if (Math.abs(now - timestamp) > allowedWindow) {
      throw new ForbiddenException('Timestamp outside allowed window');
    }

    const digest = crypto
      .createHash('sha256')
      .update(`${timestamp}${nonce}${clientId}`)
      .digest('hex');
    const difficulty = 4;
    const prefix = '0'.repeat(difficulty);
    if (!digest.startsWith(prefix)) {
      throw new ForbiddenException('Invalid PoW: insufficient difficulty');
    }

    const key = `pow:nonce:${clientId}:${nonce}`;
    const exists = await this.redisClient.get(key);
    if (exists) {
      throw new ForbiddenException('Replay detected: nonce already used');
    }
    await this.redisClient.set(key, '1', 'PX', allowedWindow);

    return true;
  }
}
