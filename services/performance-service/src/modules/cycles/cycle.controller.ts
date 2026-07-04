import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CycleService } from './cycle.service';
import { CreateCycleDto, UpdateCycleDto } from './dto/cycle.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Performance Cycles')
@ApiBearerAuth('access-token')
@Controller('cycles')
export class CycleController {
  constructor(private readonly service: CycleService) {}

  @Post()
  @RequirePermissions('performance:manage:cycles')
  @ApiOperation({ summary: 'Create performance cycle' })
  create(@Body() dto: CreateCycleDto) {
    return this.service.create(dto);
  }

  @Get('active')
  @RequirePermissions('performance:read:cycles')
  @ApiOperation({ summary: 'Get active performance cycle' })
  findActive() {
    return this.service.findActive();
  }

  @Get()
  @RequirePermissions('performance:read:cycles')
  @ApiOperation({ summary: 'List performance cycles' })
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query.page, query.limit);
  }

  @Get(':id')
  @RequirePermissions('performance:read:cycles')
  @ApiOperation({ summary: 'Get cycle by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @RequirePermissions('performance:manage:cycles')
  @ApiOperation({ summary: 'Update performance cycle' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCycleDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/activate')
  @RequirePermissions('performance:manage:cycles')
  @ApiOperation({ summary: 'Activate performance cycle' })
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.activate(id);
  }
}
