import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { PowService } from '../pow.service';
import { PowChallengeDto } from '../dto/pow-challenge.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuditService } from 'src/modules/audit/audit.service';
import { ProofOfWorkGuard } from 'src/common/guards/pow.guard';
import { ClientId } from 'src/common/decorators/client-id.decorator';

@ApiTags('pow')
@Controller('pow')
export class PowController {
  constructor(
    private readonly powService: PowService,
    private readonly auditService: AuditService,
  ) {}

  @Post('challenge')
  @Throttle({
    default: {
      limit: 5,
      ttl: 60,
    },
  })
  @ApiOperation({ summary: 'Get PoW challenge parameters (difficulty, ttl)' })
  getChallenge(@Body() dto: PowChallengeDto) {
    if (!dto.clientId) {
      throw new BadRequestException('clientId required');
    }
    return this.powService.getChallenge(dto.clientId, dto.difficulty ?? 4);
  }

  // Protected resource example: require PoW + throttling
  @Get('protected-resource')
  @UseGuards(ProofOfWorkGuard)
  @Throttle({
    default: {
      limit: 5,
      ttl: 60,
    },
  })
  @ApiOperation({ summary: 'Example protected endpoint; requires PoW headers' })
  async getProtected(@ClientId() clientId: string) {
    // create an audit record
    await this.auditService.createLog({
      clientId: clientId ?? 'unknown',
      path: '/pow/protected-resource',
      method: 'GET',
    });
    return { ok: true, message: 'Access granted — PoW validated' };
  }
}
