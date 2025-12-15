import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import * as path from 'path'; // Import path

@Injectable()
export class PdfGeneratorService {
  async generate(table: any, res: Response) {
    // Đường dẫn đến file font. 
    // process.cwd() trỏ về thư mục gốc của project khi chạy
    const fontPath = path.join(process.cwd(), 'assets', 'fonts', 'Roboto-Regular.ttf');

    const qrDataUrl = await QRCode.toDataURL(table.qrToken);

    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
    });

    // QUAN TRỌNG: Đăng ký font tiếng Việt
    try {
      doc.font(fontPath);
    } catch (e) {
      console.warn("Không tìm thấy font, sẽ dùng font mặc định (có thể lỗi font):", e.message);
      // Fallback về font mặc định nếu không tìm thấy file, nhưng sẽ lỗi tiếng Việt
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Table-${table.tableNumber}.pdf`,
    );

    doc.pipe(res);

    // Sử dụng font đã đăng ký
    doc
      .fontSize(20)
      .text(`Bàn số: ${table.tableNumber}`, { // Bây giờ tiếng Việt sẽ hiển thị đúng
        align: 'center',
      });

    doc.moveDown(1);

    doc
      .rect(100, 150, 400, 400)
      .stroke();

    doc.image(qrDataUrl, 200, 200, {
      width: 200,
      height: 200,
    });

    doc
      .moveDown(15)
      .fontSize(12)
      .text(`Vị trí: ${table.location}`, { align: 'center' });

    doc.end();
  }
}