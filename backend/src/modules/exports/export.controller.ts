import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PdfGeneratorService } from './pdf-generator.service';
import { ZipGeneratorService } from './zip-generator.service';
import mockTables from './mock-tables.json';

@Controller('api/admin/tables')
export class ExportController {
  constructor(
    private readonly pdfService: PdfGeneratorService,
    private readonly zipService: ZipGeneratorService,
  ) {}

  // Download 1 QR (PDF)
  @Get(':id/qr/download')
  async downloadOne(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const table = mockTables.find((t) => t.id === id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    return this.pdfService.generate(table, res);
  }

  // Download tất cả QR (ZIP)
  @Get('qr/download-all')
  async downloadAll(@Res() res: Response) {
    return this.zipService.generate(mockTables, res);
  }
}
