import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { textSync } from 'figlet';

import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: 'http://localhost:3001' });

  await app.listen(PORT);

  console.log(
    textSync('Liberal', {
      font: 'Epic',
      width: 80,
      whitespaceBreak: true,
    }),
  );
  console.log(`Liberal started, listening on port ${PORT}...`);
}
bootstrap();
