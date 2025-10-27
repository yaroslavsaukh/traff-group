import { Global, Module, DynamicModule, Provider, InjectionToken } from '@nestjs/common';
import Redis from 'ioredis';

export interface RedisModuleOptions {
  host: string;
  port: number;
}

export interface RedisModuleAsyncOptions {
  imports?: any[];
  inject?: InjectionToken[];
  useFactory: (...args: unknown[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
}

@Global()
@Module({})
export class RedisModule {
  static registerAsync(options: RedisModuleAsyncOptions): DynamicModule {
    const redisProvider: Provider = {
      provide: 'REDIS_CLIENT',
      useFactory: async (...args: unknown[]) => {
        const opts = await options.useFactory(...args);
        const client = new Redis({
          host: opts.host,
          port: opts.port,
          retryStrategy: (times: number) => Math.min(times * 50, 2000),
        });

        client.on('error', (err: Error) => {
          console.error('[redis] error', err && err.message ? err.message : err);
        });

        client.on('connect', () => {
          console.info('[redis] connected', opts.host + ':' + opts.port);
        });

        return client;
      },
      inject: options.inject ?? [],
    };

    return {
      module: RedisModule,
      imports: options.imports ?? [],
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
