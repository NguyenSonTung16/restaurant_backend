import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as QRCode from 'qrcode';
import archiver from 'archiver';

@Injectable()
export class ZipGeneratorService {
  async generate(tables: any[], res: Response) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=all-qr-codes.zip',
    );

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.pipe(res);

    for (const table of tables) {
      const buffer = await QRCode.toBuffer(table.qrToken);

      archive.append(buffer, {
        name: `Ban-${table.tableNumber}.png`,
      });
    }

    await archive.finalize();
  }
}
