import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto, SubmitSelfAssessmentDto, SubmitManagerReviewDto, ReviewFilterDto } from './dto/review.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Performance Reviews')
@ApiBearerAuth('access-token')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Post()
  @RequirePermissions('performance:read:reviews')
  @ApiOperation({ summary: 'Create performance review' })
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('performance:read:reviews')
  @ApiOperation({ summary: 'List my reviews' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending-manager')
  @RequirePermissions('performance:manage:reviews')
  @ApiOperation({ summary: 'List reviews pending manager review' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPendingManagerReview(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('performance:manage:reviews')
  @ApiOperation({ summary: 'List all reviews (filtered)' })
  findAll(@Query() query: ReviewFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('performance:read:reviews')
  @ApiOperation({ summary: 'Get review by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/self-assessment')
  @RequirePermissions('performance:read:reviews')
  @ApiOperation({ summary: 'Submit self-assessment' })
  selfAssessment(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SubmitSelfAssessmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submitSelfAssessment(id, user.sub, dto);
  }

  @Post(':id/manager-review')
  @RequirePermissions('performance:manage:reviews')
  @ApiOperation({ summary: 'Submit manager review with ratings' })
  managerReview(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SubmitManagerReviewDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submitManagerReview(id, user.sub, dto);
  }

  @Post(':id/approve')
  @RequirePermissions('performance:manage:reviews')
  @ApiOperation({ summary: 'Approve performance review' })
  approve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub);
  }

  @Post(':id/finalize')
  @RequirePermissions('performance:manage:reviews')
  @ApiOperation({ summary: 'Finalize performance review' })
  finalize(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.finalize(id);
  }

  @Post(':id/reject')
  @RequirePermissions('performance:manage:reviews')
  @ApiOperation({ summary: 'Reject performance review' })
  reject(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.reject(id);
  }
}
