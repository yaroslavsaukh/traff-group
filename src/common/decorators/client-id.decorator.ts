import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientId = createParamDecorator((_: unknown, ctx: ExecutionContext): string | null => {
  const req = ctx.switchToHttp().getRequest();
  return req.headers['x-client-id'] ?? null;
});
