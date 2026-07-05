import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VisitorService } from './visitor.service';
import { RegisterVisitorDto, VisitorFilterDto } from './dto/visitor.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Visitors')
@ApiBearerAuth('access-token')
@Controller('visitors')
export class VisitorController {
  constructor(private readonly service: VisitorService) {}

  @Post()
  @RequirePermissions('visitor:manage:visitors')
  @ApiOperation({ summary: 'Register visitor' })
  register(@Body() dto: RegisterVisitorDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.register(user.sub, dto);
  }

  @Get()
  @RequirePermissions('visitor:read:visitors')
  @ApiOperation({ summary: 'List visitors' })
  findAll(@Query() query: VisitorFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('visitor:read:visitors')
  @ApiOperation({ summary: 'Get visitor by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
