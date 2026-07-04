import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/route.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Transport Routes')
@ApiBearerAuth('access-token')
@Controller('routes')
export class RouteController {
  constructor(private readonly service: RouteService) {}

  @Post()
  @RequirePermissions('logistics:manage:routes')
  @ApiOperation({ summary: 'Create transport route' })
  create(@Body() dto: CreateRouteDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('logistics:read:routes')
  @ApiOperation({ summary: 'List active routes' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('logistics:read:routes')
  @ApiOperation({ summary: 'Get route by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
