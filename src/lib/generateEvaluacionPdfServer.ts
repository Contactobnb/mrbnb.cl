import fs from 'fs'
import path from 'path'
import { drawPdfContent, buildFileName, type PdfParams } from './generateEvaluacionPdf'

export async function generateEvaluacionPdfBuffer(
  p: PdfParams
): Promise<{ buffer: Buffer; filename: string }> {
  const { jsPDF } = await import('jspdf')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  let logoBase64: string | null = null
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'Logo_MB.png')
    const logoBuffer = fs.readFileSync(logoPath)
    logoBase64 = 'data:image/png;base64,' + logoBuffer.toString('base64')
  } catch {
    // Logo not available, continue without it
  }

  drawPdfContent(doc, p, logoBase64)

  const arrayBuffer = doc.output('arraybuffer') as ArrayBuffer
  const buffer = Buffer.from(arrayBuffer)
  const filename = buildFileName(p.propertyName)

  return { buffer, filename }
}
