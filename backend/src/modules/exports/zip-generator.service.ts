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
      // Nếu qrToken null thì bỏ qua hoặc lấy id làm fallback
      const content = table.qrToken || table.id;

      // Đảm bảo await việc tạo buffer xong mới append
      const buffer = await QRCode.toBuffer(content);

      archive.append(buffer, { name: `Table-${table.tableNumber}.png` });
    }

    await archive.finalize();
  }
}
