import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobPostingService } from './job-posting.service';
import { CreateJobPostingDto, UpdateJobPostingDto, JobPostingFilterDto } from './dto/job-posting.dto';
import { RequirePermissions, Public, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Job Postings')
@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly service: JobPostingService) {}

  @Public()
  @Get('published')
  @ApiOperation({ summary: 'List published job openings (public)' })
  published() { return this.service.findPublished(); }

  @Post()
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Create job posting' })
  create(@Body() dto: CreateJobPostingDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(dto, user.sub);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:read:applications')
  @ApiOperation({ summary: 'List job postings' })
  findAll(@Query() query: JobPostingFilterDto) { return this.service.findAll(query); }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:read:applications')
  @ApiOperation({ summary: 'Get job posting by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findById(id); }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Update draft job posting' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateJobPostingDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/publish')
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Publish job posting' })
  publish(@Param('id', ParseUUIDPipe) id: string) { return this.service.publish(id); }

  @Post(':id/close')
  @ApiBearerAuth('access-token')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Close job posting' })
  close(@Param('id', ParseUUIDPipe) id: string) { return this.service.close(id); }
}
