// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 1. Import các file mới
import { ExportController } from './modules/exports/export.controller';
import { PdfGeneratorService } from './modules/exports/pdf-generator.service';
import { ZipGeneratorService } from './modules/exports/zip-generator.service';

@Module({
  imports: [],
  // 2. Đăng ký Controller
  controllers: [AppController, ExportController],
  // 3. Đăng ký Providers (Services)
  providers: [AppService, PdfGeneratorService, ZipGeneratorService],
})
export class AppModule {}