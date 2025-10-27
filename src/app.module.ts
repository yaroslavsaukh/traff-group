import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule, RedisModuleOptions } from './infra/redis/redis.module';
import { HeaderCheckMiddleware } from './common/middlewares/header-check.middleware';
import { PowModule } from './modules/pow/pow.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({ uri: cfg.get<string>('mongoUri') }),
      inject: [ConfigService],
    }),
    RedisModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): RedisModuleOptions => ({
        host: cfg.getOrThrow<string>('redisHost'),
        port: cfg.getOrThrow<number>('redisPort'),
      }),
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        throttlers: [
          {
            ttl: cfg.get<number>('throttle.ttl') ?? 60,
            limit: cfg.get<number>('throttle.limit') ?? 10,
          },
        ],
      }),
      inject: [ConfigService],
    }),
    PowModule,
    AuditModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderCheckMiddleware).forRoutes('*');
  }
}
