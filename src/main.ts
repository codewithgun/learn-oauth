import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		httpsOptions: {
			key: fs.readFileSync(path.join(__dirname, '..', 'secret', 'localhost-key.pem')),
			cert: fs.readFileSync(path.join(__dirname, '..', 'secret', 'localhost-cert.pem')),
		},
	});
	const config = new DocumentBuilder().setTitle('OAuth example').setDescription('Just another OAuth').setVersion('1.0').addTag('Learn-OAuth').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.enableCors();
	await app.listen(3000);
}
bootstrap();
