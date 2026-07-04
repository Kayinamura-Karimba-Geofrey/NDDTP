import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FacilityService } from './facility.service';
import { CreateFacilityDto, UpdateFacilityDto } from './dto/facility.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Medical Facilities')
@ApiBearerAuth('access-token')
@Controller('facilities')
export class FacilityController {
  constructor(private readonly service: FacilityService) {}

  @Post()
  @RequirePermissions('medical:manage:facilities')
  @ApiOperation({ summary: 'Create medical facility' })
  create(@Body() dto: CreateFacilityDto) {
    return this.service.create(dto);
  }

  @Get('active')
  @RequirePermissions('medical:read:facilities')
  @ApiOperation({ summary: 'List active facilities' })
  findActive() {
    return this.service.findActive();
  }

  @Get()
  @RequirePermissions('medical:read:facilities')
  @ApiOperation({ summary: 'List all facilities' })
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query.page, query.limit);
  }

  @Get(':id')
  @RequirePermissions('medical:read:facilities')
  @ApiOperation({ summary: 'Get facility by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @RequirePermissions('medical:manage:facilities')
  @ApiOperation({ summary: 'Update facility' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateFacilityDto) {
    return this.service.update(id, dto);
  }
}
