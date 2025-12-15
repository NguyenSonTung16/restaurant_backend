import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as QRCode from 'qrcode';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfGeneratorService {
  async generate(table: any, res: Response) {
    // 1. Tạo QR dạng DataURL
    const qrDataUrl = await QRCode.toDataURL(table.qrToken);

    // 2. Tạo PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
    });

    // 3. Header response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Table-${table.tableNumber}.pdf`,
    );

    // 4. Pipe stream
    doc.pipe(res);

    // 5. Vẽ nội dung PDF
    doc
      .fontSize(20)
      .text(`Bàn số: ${table.tableNumber}`, {
        align: 'center',
      });

    doc.moveDown(1);

    // Khung
    doc
      .rect(100, 150, 400, 400)
      .stroke();

    // QR Image
    doc.image(qrDataUrl, 200, 200, {
      width: 200,
      height: 200,
    });

    doc
      .moveDown(15)
      .fontSize(12)
      .text(`Vị trí: ${table.location}`, { align: 'center' });

    // 6. Kết thúc PDF
    doc.end();
  }
}
