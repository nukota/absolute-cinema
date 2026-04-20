import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { chatbotApi } from "./chatbotService";
import { server } from "../test/server";

describe("chatbot API", () => {
  it("converts client history into the backend format and returns the reply", async () => {
    server.use(
      http.post("http://localhost:8000/chatbot", async ({ request }) => {
        expect(await request.json()).toEqual({
          message: "What is playing tonight?",
          history: [
            { role: "user", content: "Hello" },
            { role: "model", content: "How can I help?" },
          ],
        });
        return HttpResponse.json({ reply: "Dune starts at 7 PM." });
      }),
    );

    await expect(
      chatbotApi.sendChatMessage({
        message: "What is playing tonight?",
        conversationHistory: [
          { role: "user", content: "Hello", timestamp: new Date("2026-08-08") },
          {
            role: "assistant",
            content: "How can I help?",
            timestamp: new Date("2026-08-08"),
          },
        ],
      }),
    ).resolves.toBe("Dune starts at 7 PM.");
  });
});
