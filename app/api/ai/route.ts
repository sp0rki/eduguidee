import { NextRequest, NextResponse } from 'next/server';

type AiAction = 'summarize' | 'quiz' | 'analyze' | 'keypoints';

export async function POST(req: NextRequest) {
  try {
    const { action, text, filename } = (await req.json()) as {
      action: AiAction;
      text: string;
      filename?: string;
    };

    if (!action || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: action, text' },
        { status: 400 },
      );
    }

    // Placeholder implementation – replace this block with a real AI call
    // using your external AI provider and API key (for example, from
    // process.env.AI_API_KEY).

    let result = '';
    let quiz: {
      questions: {
        question: string;
        options: string[];
        correctIndex: number;
      }[];
    } | null = null;
    const shortName = filename ?? 'your material';

    switch (action) {
      case 'summarize': {
        const preview = text.slice(0, 600);
        result =
          `Study Material Summary for "${shortName}"\n\n` +
          (preview.length > 0
            ? `Key ideas (based on the beginning of your file):\n\n${preview}\n\n` +
              `Connect your AI provider to replace this placeholder with a real, focused study summary.`
            : 'No readable text content was found in the file. Try uploading a text-based document.');
        break;
      }
      case 'quiz': {
        quiz = {
          questions: [
            {
              question: `What is the main purpose of "${shortName}"?`,
              options: [
                'Introduce a new topic at a high level',
                'List random facts with no connection',
                'Provide unrelated entertainment content',
                'Only show images without any explanation',
              ],
              correctIndex: 0,
            },
            {
              question: 'Which strategy helps you remember the material better?',
              options: [
                'Reading everything once without pausing',
                'Using active recall and self-testing',
                'Skipping the hard sections',
                'Studying only right before the exam',
              ],
              correctIndex: 1,
            },
            {
              question: 'What is usually a good first step when studying a new set of notes?',
              options: [
                'Highlight every sentence in the text',
                'Quickly skim and identify the main headings',
                'Ignore the introduction and jump to the end',
                'Only read the examples and skip explanations',
              ],
              correctIndex: 1,
            },
          ],
        };
        result = `Multiple‑choice quiz generated for "${shortName}".`;
        break;
      }
      case 'analyze': {
        result =
          `High-level analysis for "${shortName}":\n\n` +
          `- This placeholder endpoint received ${text.length} characters of content.\n` +
          `- You can connect your AI provider here to return complexity, difficulty, and topic breakdown.\n`;
        break;
      }
      case 'keypoints': {
        result =
          `Key points for "${shortName}":\n\n` +
          `- [Placeholder] Identify 3–5 critical concepts from the material.\n` +
          `- [Placeholder] Add short explanations for each concept.\n\n` +
          `Wire this to your AI API to generate actual key points from the uploaded content.`;
        break;
      }
      default:
        return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
    }

    return NextResponse.json({ result, quiz });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected server error' },
      { status: 500 },
    );
  }
}

