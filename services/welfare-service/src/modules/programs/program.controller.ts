import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/program.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Welfare Programs')
@ApiBearerAuth('access-token')
@Controller('programs')
export class ProgramController {
  constructor(private readonly service: ProgramService) {}

  @Get('active')
  @RequirePermissions('welfare:read:programs')
  @ApiOperation({ summary: 'List active welfare programs' })
  active() { return this.service.findActive(); }

  @Get()
  @RequirePermissions('welfare:manage:programs')
  @ApiOperation({ summary: 'List all welfare programs' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @RequirePermissions('welfare:read:programs')
  @ApiOperation({ summary: 'Get program by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findById(id); }

  @Post()
  @RequirePermissions('welfare:manage:programs')
  @ApiOperation({ summary: 'Create welfare program' })
  create(@Body() dto: CreateProgramDto) { return this.service.create(dto); }
}
