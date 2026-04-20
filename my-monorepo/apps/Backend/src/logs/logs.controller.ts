import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  // POST /api/logs
  @Post()
  async ingest(@Body() dto: CreateLogDto) {
    return this.logsService.ingest(dto);
  }

  // GET /api/logs
  @Get()
  async list(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('severity') severity?: string,
    @Query('source') source?: string,
    @Query('search') search?: string,
  ) {
    const options = {
      limit: limit ? parseInt(limit, 10) : 100,
      offset: offset ? parseInt(offset, 10) : 0,
      severity,
      source,
      search,
    };
    return this.logsService.list(options);
  }

  // DELETE /api/logs
  @Delete()
  async clear() {
    return this.logsService.clearAll();
  }
}
