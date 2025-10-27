import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestLog, RequestLogDocument } from './schemas/request-log.schema';
import { CreateRequestLogDto } from './dto/request-log.dto';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(RequestLog.name) private readonly requestLogModel: Model<RequestLogDocument>,
  ) {}

  async createLog(dto: CreateRequestLogDto): Promise<RequestLog> {
    const created = new this.requestLogModel(dto);
    return created.save();
  }
}
