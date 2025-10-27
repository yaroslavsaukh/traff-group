import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestLog, RequestLogSchema } from './schemas/request-log.schema';
import { AuditService } from './audit.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RequestLog.name, schema: RequestLogSchema }])],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
