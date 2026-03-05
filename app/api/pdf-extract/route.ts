import { NextRequest, NextResponse } from 'next/server';

async function extractTextFromPdf(buffer: Buffer): Promise<{ text: string; numpages: number }> {
  const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
  const data = await pdfParse(buffer);
  return {
    text: data.text || '',
    numpages: data.numpages ?? 0,
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    console.log('[PDF] Received file:', {
      name: file?.name,
      type: file?.type,
      size: file?.size,
    });

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 },
      );
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    
    if (!isPdf) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('[PDF] Buffer created, size:', buffer.length);

    console.log('[PDF] Starting parse...');
    const data = await extractTextFromPdf(buffer);
    
    console.log('[PDF] Parse successful:', {
      pages: data.numpages,
      textLength: data.text?.length,
    });

    const extractedText = data.text;

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'No text content found in PDF. This appears to be an image-based PDF.',
          pages: data.numpages
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ 
      text: extractedText.trim(),
      pages: data.numpages,
      success: true
    });
  } catch (err: any) {
    console.error('[PDF] Error:', err?.message || err);
    return NextResponse.json(
      { 
        error: err?.message || 'Failed to extract PDF text',
        type: err?.constructor?.name
      },
      { status: 500 },
    );
  }
}
