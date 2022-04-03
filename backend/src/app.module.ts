import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { PostsModule } from './posts/posts.module';
import { FirebaseService } from './firebase/firebase.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? [
            join(
              __dirname,
              '..',
              'config',
              `.env.${process.env.NODE_ENV}.local`,
            ),
            join(__dirname, '..', 'config', `.env.${process.env.NODE_ENV}`),
          ]
        : [
            join(__dirname, '..', 'config', '.env.development.local'),
            join(__dirname, '..', 'config', '.env.development'),
          ],
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/new',
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
    }),
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [FirebaseService],
})
export class AppModule {}
