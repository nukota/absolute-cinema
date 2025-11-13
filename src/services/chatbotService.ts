export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Using stable gemini-2.0-flash model (gemini-1.5-flash is deprecated)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// System instruction for the cinema assistant
const SYSTEM_INSTRUCTION = `You are a helpful cinema assistant for "Absolute Cinema". You help customers with:
- Movie information and recommendations
- Showtimes and booking assistance
- Cinema locations and facilities
- Ticket pricing and promotions
- General cinema-related questions

Please provide friendly, concise, and helpful responses. If you don't know something specific about our cinema, be honest and suggest contacting customer service.`;

/**
 * Sends a message to Google Gemini API and returns the response
 */
export const sendMessageToGemini = async (
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please check your .env file.');
    }

    // Build conversation contents in proper Gemini format
    const contents: Array<{
      role: string;
      parts: Array<{ text: string }>;
    }> = [];

    // Add system instruction as the first user message
    contents.push({
      role: 'user',
      parts: [{ text: SYSTEM_INSTRUCTION }],
    });

    // Add a model response acknowledging the instruction
    contents.push({
      role: 'model',
      parts: [{ text: 'I understand. I am a helpful cinema assistant for Absolute Cinema. How can I help you today?' }],
    });

    // Add recent conversation history (last 4 messages to stay within limits)
    const recentHistory = conversationHistory.slice(-4);
    recentHistory.forEach((msg) => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    });

    // Add the current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    console.log('Sending request to Gemini API...');

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      
      // Provide more specific error messages
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (response.status === 403) {
        throw new Error('API key is invalid or doesn\'t have access to this service.');
      } else if (response.status === 400) {
        throw new Error('Invalid request format. Please try again.');
      } else {
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }
    }

    const data = await response.json();
    console.log('Gemini API response received:', data);
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated. The content may have been blocked by safety filters.');
    }

    const messageContent = data.candidates[0].content.parts[0].text;

    return {
      message: messageContent,
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return {
      message: '',
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Helper function to create a chat message object
 */
export const createChatMessage = (
  role: 'user' | 'assistant',
  content: string
): ChatMessage => ({
  role,
  content,
  timestamp: new Date(),
});
