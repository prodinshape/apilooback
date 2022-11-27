import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('apilooback')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();


  const document = SwaggerModule.createDocument(app, config);

  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    const fs = require('fs')

    fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  }

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
