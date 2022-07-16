import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require("cookie-session")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys : ["isghlkfdh"]
  }))// works along with @Session decorator
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  })) //validation
  await app.listen(3000);
}
bootstrap();
