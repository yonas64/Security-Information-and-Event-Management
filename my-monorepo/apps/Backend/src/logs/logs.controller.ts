// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Query,
// } from '@nestjs/common';
// import { LogsService } from './logs.service';
// import { CreateLogDto } from './log.dto';

// @Controller('logs')
// export class LogsController {
//   constructor(private readonly logsService: LogsService) {}

//   // POST /logs → ingest log
//   @Post()
//   async ingest(@Body() dto: CreateLogDto) {
//     return this.logsService.ingest(dto);
//   }

//   // GET /logs → list logs with filters
//   @Get()
//   async list(
//     @Query('limit') limit?: string,
//     @Query('offset') offset?: string,
//     @Query('severity') severity?: string,
//     @Query('source') source?: string,
//     @Query('search') search?: string,
//     @Query('startDate') startDate?: string,
//     @Query('endDate') endDate?: string,
//   ) {
//     return this.logsService.list({
//       limit: limit ? parseInt(limit, 10) : 100,
//       offset: offset ? parseInt(offset, 10) : 0,
//       severity,
//       source,
//       search,
//       endDate,
//     });
//   }

//   // GET /logs/:id → get single log
//   @Get(':id')
//   async getById(@Param('id') id: string) {
//     return this.logsService.getById(id);
//   }

//   // GET /logs/stats → aggregation (VERY IMPORTANT for SIEM dashboard)
//   // @Get('stats/summary')
//   // async getStats() {
//   //   return this.logsService.getStats();
//   // }

//   // // GET /logs/sources → unique log sources
//   // @Get('meta/sources')
//   // async getSources() {
//   //   return this.logsService.getSources();
//   // }

//   // // GET /logs/severity-count → count by severity
//   // @Get('stats/severity')
//   // async getSeverityStats() {
//   //   return this.logsService.getSeverityStats();
//   // }

//   // // PATCH /logs/:id/resolve → mark log as resolved
//   // @Patch(':id/resolve')
//   // async resolveLog(@Param('id') id: string) {
//   //   return this.logsService.markResolved(id);
//   // }

//   // // PATCH /logs/:id/flag → flag suspicious log
//   // @Patch(':id/flag')
//   // async flagLog(@Param('id') id: string) {
//   //   return this.logsService.flagLog(id);
//   // }

//   // // DELETE /logs/:id → delete single log
//   // @Delete(':id')
//   // async deleteOne(@Param('id') id: string) {
//   //   return this.logsService.deleteOne(id);
//   // }

//   // DELETE /logs → clear all logs
//   @Delete()
//   async clear() {
//     return this.logsService.clearAll();
//   }
// }
// can you add more usefull endpoints in this code
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
