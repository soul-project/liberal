import { Module } from '@nestjs/common';

import { FirebaseService } from 'src/firebase/firebase.service';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [PostsService, FirebaseService],
})
export class PostsModule {}
