import {
  Box,
  Drawer,
  IconButton,
  Typography,
  TextField,
  CircularProgress,
  Fab,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { Close, Send, Mic } from "@mui/icons-material";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import {
  useSendChatMessage,
  createChatMessage,
  type ChatMessage,
} from "../../../services/chatbotService";
import { startVoiceSearch } from "../../../utils/helper/voiceHelper";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createChatMessage(
      "assistant",
      "Hello! 👋 Welcome to Absolute Cinema. How can I help you today?"
    ),
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendChatMessageMutation = useSendChatMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      // Use multiple attempts to ensure focus works after drawer animation
      const focusInput = () => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Ensure cursor is at the end if there's existing text
          inputRef.current.setSelectionRange(
            inputRef.current.value.length,
            inputRef.current.value.length
          );
        }
      };

      // Try immediately, then after a short delay, then after drawer animation
      focusInput();
      setTimeout(focusInput, 100);
      setTimeout(focusInput, 300);
    }
  }, [isOpen]);

  // Keyboard shortcut to toggle chatbot (C key)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if C key is pressed and not in an input field
      if (
        e.key === "c" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || sendChatMessageMutation.isPending) return;

    const userMessage = createChatMessage("user", inputMessage.trim());
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    sendChatMessageMutation.mutate(
      {
        message: userMessage.content,
        conversationHistory: messages,
      },
      {
        onSuccess: (reply) => {
          const assistantMessage = createChatMessage("assistant", reply);
          setMessages((prev) => [...prev, assistantMessage]);
        },
        onError: (error: any) => {
          const errorMessage = createChatMessage(
            "assistant",
            `Sorry, I encountered an error: ${
              error.response?.data?.message ||
              error.message ||
              "Please try again."
            }. Please try again.`
          );
          setMessages((prev) => [...prev, errorMessage]);
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    startVoiceSearch({
      onResult: (transcript) => {
        setInputMessage(transcript);
        setIsListening(false);
      },
      onError: (error) => {
        console.error("Voice input error:", error);
        setIsListening(false);
        // Could show a toast notification here instead of alert
        const errorMessage = createChatMessage(
          "assistant",
          "Sorry, I couldn't hear you clearly. Please try again or type your message."
        );
        setMessages((prev) => [...prev, errorMessage]);
      },
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      continuous: false,
      interimResults: false,
    });
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "none",
          "&:hover": {
            background: "rgba(0, 0, 0, 0.7)",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Bot size={32} />
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            maxWidth: "100%",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background:
              "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.1) 0%, transparent 50%), linear-gradient(180deg, #2a184b 0%, #24335a 50%, #2a184b 100%)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1.5,
              background: "transparent",
              color: "white",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      letterSpacing: 0.5,
                      mb: 0.25,
                      fontSize: "1rem",
                      color: "#ffffff",
                    }}
                  >
                    Cinema Assistant
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.8,
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      color: "#e0e0e0",
                    }}
                  >
                    Always here to help • Press C to toggle
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: "#ffffff",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.05) rotate(90deg)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: 32,
                  height: 32,
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Messages Container */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "transparent",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(156, 39, 176, 0.4)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(156, 39, 176, 0.6)",
              },
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  flexDirection:
                    message.role === "user" ? "row-reverse" : "row",
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: 18,
                    color: "white",
                    bgcolor: "transparent",
                  }}
                >
                  {message.role === "user" ? (
                    <User size={22} />
                  ) : (
                    <Bot size={22} />
                  )}
                </Avatar>
                <Box
                  sx={{
                    py: 1,
                    px: 1.5,
                    maxWidth: "75%",
                    bgcolor: message.role === "user" ? "#35446b" : "#c7d0e5",
                    color: message.role === "user" ? "white" : "#1a1a1a",
                    borderRadius:
                      message.role === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px",
                    wordBreak: "break-word",
                    border:
                      message.role === "user"
                        ? "none"
                        : "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <Box
                    sx={{
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                    }}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 1,
                      opacity: message.role === "user" ? 0.8 : 0.6,
                      fontSize: "0.7rem",
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </Box>
            ))}

            {sendChatMessageMutation.isPending && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                  }}
                >
                  <Bot size={20} />
                </Avatar>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "#ffffff",
                    borderRadius: 2,
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <CircularProgress size={16} sx={{ color: "#667eea" }} />
                </Box>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

          {/* Quick Message Chips */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1.5 }}>
              <Chip
                label="Suggest movies"
                size="small"
                onClick={() => setInputMessage("Can you suggest some movies?")}
                sx={{
                  bgcolor: "rgba(156, 39, 176, 0.2)",
                  color: "#ffffff",
                  border: "1px solid rgba(156, 39, 176, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(156, 39, 176, 0.3)",
                  },
                }}
              />
              <Chip
                label="Opening hours"
                size="small"
                onClick={() =>
                  setInputMessage("What are your opening and closing hours?")
                }
                sx={{
                  bgcolor: "rgba(156, 39, 176, 0.2)",
                  color: "#ffffff",
                  border: "1px solid rgba(156, 39, 176, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(156, 39, 176, 0.3)",
                  },
                }}
              />
              <Chip
                label="Locations"
                size="small"
                onClick={() =>
                  setInputMessage("Where are your cinema locations?")
                }
                sx={{
                  bgcolor: "rgba(156, 39, 176, 0.2)",
                  color: "#ffffff",
                  border: "1px solid rgba(156, 39, 176, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(156, 39, 176, 0.3)",
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 0.5, alignItems: "flex-end" }}>
              <TextField
                inputRef={inputRef}
                fullWidth
                multiline
                maxRows={3}
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={sendChatMessageMutation.isPending || isListening}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(156, 39, 176, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(156, 39, 176, 0.7)",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.6)",
                      opacity: 1,
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleVoiceInput}
                disabled={sendChatMessageMutation.isPending}
                sx={{
                  color: isListening ? "error.main" : "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    transform: "scale(1.05)",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&.Mui-disabled": {
                    color: "#9e9e9e",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Mic sx={{ fontSize: 22 }} />
              </IconButton>
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={
                  !inputMessage.trim() || sendChatMessageMutation.isPending
                }
                sx={{
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  "&.Mui-disabled": {
                    color: "#9e9e9e",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Send sx={{ fontSize: 22 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Chatbot;
