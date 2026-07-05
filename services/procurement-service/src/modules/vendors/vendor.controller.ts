import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/vendor.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Vendors')
@ApiBearerAuth('access-token')
@Controller('vendors')
export class VendorController {
  constructor(private readonly service: VendorService) {}

  @Post()
  @RequirePermissions('procurement:manage:vendors')
  @ApiOperation({ summary: 'Register vendor' })
  create(@Body() dto: CreateVendorDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('procurement:read:vendors')
  @ApiOperation({ summary: 'List active vendors' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('procurement:read:vendors')
  @ApiOperation({ summary: 'Get vendor by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
