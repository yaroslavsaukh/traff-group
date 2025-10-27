import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeaderCheckMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const userAgent = (req.headers['user-agent'] ?? '').toString().toLowerCase();
    const clientId = req.headers['x-client-id'] ?? '';

    if (!clientId || typeof clientId !== 'string' || clientId.trim() === '') {
      throw new ForbiddenException('Missing x-client-id header');
    }

    const blockedPatterns = ['curl', 'bot', 'python', 'postman', 'httpie'];
    if (blockedPatterns.some((p) => userAgent.includes(p))) {
      throw new ForbiddenException('Suspicious user-agent detected');
    }

    next();
  }
}
