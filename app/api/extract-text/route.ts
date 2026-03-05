import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 },
      );
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    
    if (!isPdf) {
      return NextResponse.json(
        { error: 'Only PDF files are supported by this endpoint' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const base64 = buffer.toString('base64');

    return NextResponse.json({ 
      pdfData: base64,
      fileName: file.name
    });
  } catch (err: any) {
    console.error('Error processing PDF:', err);
    return NextResponse.json(
      { error: 'Failed to process PDF file' },
      { status: 500 },
    );
  }
}
