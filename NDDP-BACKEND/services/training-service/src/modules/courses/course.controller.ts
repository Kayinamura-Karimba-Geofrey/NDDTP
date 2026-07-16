import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { RequirePermissions } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Training Courses')
@ApiBearerAuth('access-token')
@Controller('courses')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Post()
  @RequirePermissions('training:manage:courses')
  @ApiOperation({ summary: 'Create training course' })
  create(@Body() dto: CreateCourseDto) {
    return this.service.create(dto);
  }

  @Get('active')
  @RequirePermissions('training:read:courses')
  @ApiOperation({ summary: 'List active courses' })
  findActive() {
    return this.service.findActive();
  }

  @Get()
  @RequirePermissions('training:read:courses')
  @ApiOperation({ summary: 'List all courses' })
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query.page, query.limit);
  }

  @Get(':id')
  @RequirePermissions('training:read:courses')
  @ApiOperation({ summary: 'Get course by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @RequirePermissions('training:manage:courses')
  @ApiOperation({ summary: 'Update course' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCourseDto) {
    return this.service.update(id, dto);
  }
}
