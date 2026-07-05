import { Controller, Get, Post, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SearchQueryService } from './search-query.service';
import { SubmitSearchQueryDto, SearchQueryFilterDto } from './dto/search-query.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Search Queries')
@ApiBearerAuth('access-token')
@Controller('queries')
export class SearchQueryController {
  constructor(private readonly service: SearchQueryService) {}

  @Post()
  @RequirePermissions('search:read:queries')
  @ApiOperation({ summary: 'Submit and execute search query' })
  submit(@CurrentUser() user: AuthenticatedUser, @Body() dto: SubmitSearchQueryDto) {
    return this.service.submit(user.sub, dto);
  }

  @Get('mine')
  @RequirePermissions('search:read:queries')
  @ApiOperation({ summary: 'List my search queries' })
  findMine(@CurrentUser() user: AuthenticatedUser, @Query() pagination: PaginationDto) {
    return this.service.findMine(user.sub, pagination.page, pagination.limit);
  }

  @Get()
  @RequirePermissions('search:manage:queries')
  @ApiOperation({ summary: 'List search queries' })
  findAll(@Query() pagination: PaginationDto, @Query() filter: SearchQueryFilterDto) {
    return this.service.findAll(pagination.page || 1, pagination.limit || 20, filter.status);
  }

  @Get(':id')
  @RequirePermissions('search:read:queries')
  @ApiOperation({ summary: 'Get search query by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
