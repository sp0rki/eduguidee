import { NextRequest, NextResponse } from 'next/server';

type AiAction = 'summarize' | 'quiz' | 'analyze' | 'keypoints';

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

async function callMistral(prompt: string, maxTokens: number = 1500): Promise<string> {
  if (!MISTRAL_API_KEY) {
    return 'Error: Mistral API key not configured. Please add MISTRAL_API_KEY to your environment variables.';
  }

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'system',
            content: 'You are an educational assistant helping students learn from study materials. Provide clear, concise, and helpful responses.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error?.message || 'Failed to call Mistral API');
    }

    return data.choices[0]?.message?.content || 'No response from AI service';
  } catch (error: any) {
    console.error('Mistral API error:', error);
    throw error;
  }
}

async function generateQuiz(text: string, filename: string): Promise<any> {
  const prompt = `Based on the following study material, generate 4 multiple-choice quiz questions. 

Study Material:
${text.substring(0, 2000)}

For each question, provide:
1. The question text
2. Four options (A, B, C, D)
3. The index of the correct answer (0-3)

Format your response as a JSON array of objects with fields: "question", "options" (array of 4 strings), and "correctIndex" (number 0-3). Only return the JSON array, no other text.`;

  try {
    const response = await callMistral(prompt, 1200);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      return { questions };
    }
    
    return {
      questions: [
        {
          question: `What is the main topic of "${filename}"?`,
          options: ['Educational material', 'Entertainment content', 'Technical documentation', 'News article'],
          correctIndex: 0,
        },
      ],
    };
  } catch (error: any) {
    console.error('Quiz generation error:', error);
    throw error;
  }
}

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

    let result = '';
    let quiz = null;
    const shortName = filename ?? 'your material';

    try {
      switch (action) {
        case 'summarize': {
          const prompt = `Please provide a clear and concise summary of the following study material in 300-400 words. Focus on the main points and key concepts:

${text}`;
          result = await callMistral(prompt, 1500);
          break;
        }
        case 'quiz': {
          quiz = await generateQuiz(text, shortName);
          result = `Quiz generated based on "${shortName}".`;
          break;
        }
        case 'analyze': {
          const prompt = `Analyze the following study material and provide:
1. Topic/Subject area
2. Difficulty level (Beginner/Intermediate/Advanced)
3. Key concepts covered (bullet points)
4. Learning outcomes
5. Suggested areas for further study

Study Material:
${text}`;
          result = await callMistral(prompt, 1500);
          break;
        }
        case 'keypoints': {
          const prompt = `Extract and list the 5-7 most important key points from the following study material. For each key point, provide a brief explanation (1-2 sentences):

${text}`;
          result = await callMistral(prompt, 1200);
          break;
        }
        default:
          return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
      }
    } catch (aiError: any) {
      console.error('AI processing error:', aiError);
      return NextResponse.json(
        { error: `AI processing failed: ${aiError.message || 'Unknown error'}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ result, quiz });
  } catch (err: any) {
    console.error('Request processing error:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected server error' },
      { status: 500 },
    );
  }
}


