import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { GetAllArticlesParamDto, PaginationQueryParams } from './dto/api.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/')
  async postNewArticle(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.postNewArticle({ token, title, content });
  }

  @Get('/users/:id')
  async getAllArticles(
    @Param() params: GetAllArticlesParamDto,
    @Query() paginationParams: PaginationQueryParams,
  ) {
    return this.postsService.getPostsForUser({
      userId: params.id,
      page: paginationParams.page,
      numItemsPerPage: paginationParams.numItemsPerPage,
    });
  }
}
