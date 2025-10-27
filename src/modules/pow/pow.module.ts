import { Module } from '@nestjs/common';
import { PowService } from './pow.service';
import { PowController } from './controllers/pow.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  providers: [PowService],
  controllers: [PowController],
  exports: [PowService],
})
export class PowModule {}
