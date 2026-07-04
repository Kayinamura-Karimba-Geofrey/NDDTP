import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FacilityTypeService } from './facility-type.service';
import { CreateFacilityTypeDto } from './dto/facility-type.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Facility Types')
@ApiBearerAuth('access-token')
@Controller('types')
export class FacilityTypeController {
  constructor(private readonly service: FacilityTypeService) {}

  @Post()
  @RequirePermissions('facilities:manage:types')
  @ApiOperation({ summary: 'Create facility type' })
  create(@Body() dto: CreateFacilityTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('facilities:read:types')
  @ApiOperation({ summary: 'List active facility types' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('facilities:read:types')
  @ApiOperation({ summary: 'Get facility type by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
