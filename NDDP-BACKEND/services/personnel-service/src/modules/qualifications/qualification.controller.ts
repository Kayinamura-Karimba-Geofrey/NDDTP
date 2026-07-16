import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QualificationService } from './qualification.service';
import { CreateQualificationDto, AddPersonnelQualificationDto } from './dto/qualification.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Qualifications')
@ApiBearerAuth('access-token')
@Controller('qualifications')
export class QualificationController {
  constructor(private readonly service: QualificationService) {}

  @Post()
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Create qualification definition' })
  create(@Body() dto: CreateQualificationDto) { return this.service.create(dto); }

  @Get()
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List qualification definitions' })
  findAll() { return this.service.findAll(); }

  @Post('personnel/:personnelId')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Add qualification to personnel' })
  addToPersonnel(
    @Param('personnelId', ParseUUIDPipe) personnelId: string,
    @Body() dto: AddPersonnelQualificationDto,
  ) {
    return this.service.addToPersonnel(personnelId, dto);
  }

  @Get('personnel/:personnelId')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List qualifications for personnel' })
  byPersonnel(@Param('personnelId', ParseUUIDPipe) personnelId: string) {
    return this.service.getByPersonnel(personnelId);
  }
}
