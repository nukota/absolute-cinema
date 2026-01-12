import { api } from "../lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatHistoryItem {
  role: "user" | "model";
  content: string;
}

interface ChatbotRequestDTO {
  message: string;
  history?: ChatHistoryItem[];
}

interface ChatbotResponseDTO {
  reply: string;
}

const sendChatMessage = async (data: {
  message: string;
  conversationHistory: ChatMessage[];
}): Promise<string> => {
  // Convert chat history to the format expected by the backend
  const history: ChatHistoryItem[] = data.conversationHistory.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    content: msg.content,
  }));

  const response = await api.post<ChatbotResponseDTO>("/chatbot", {
    message: data.message,
    history,
  } as ChatbotRequestDTO);

  return response.data.reply;
};

// Query Keys
export const chatbotKeys = {
  all: ["chatbot"] as const,
  messages: () => [...chatbotKeys.all, "messages"] as const,
};

export const useSendChatMessage = () => {
  return useMutation({
    mutationFn: sendChatMessage,
  });
};

/**
 * Helper function to create a chat message object
 */
export const createChatMessage = (
  role: "user" | "assistant",
  content: string
): ChatMessage => ({
  role,
  content,
  timestamp: new Date(),
});
