// Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface VoiceSearchOptions {
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export const startVoiceSearch = (
  options: VoiceSearchOptions
): (() => void) | null => {
  const {
    onResult,
    onError,
    onStart,
    onEnd,
    lang = "en-US",
    continuous = false,
    interimResults = false,
  } = options;

  if (
    !("webkitSpeechRecognition" in window) &&
    !("SpeechRecognition" in window)
  ) {
    onError?.(
      "Voice search is not supported in this browser. Please use Chrome, Edge, or Safari."
    );
    return null;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = continuous;
  recognition.interimResults = interimResults;
  recognition.lang = lang;

  recognition.onstart = () => {
    onStart?.();
  };

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    console.error("Speech recognition error:", event.error);

    // Don't treat "aborted" as an error - it's just user cancellation
    if (event.error === "aborted") {
      onEnd?.();
      return;
    }

    onError?.(event.error);
  };

  recognition.onend = () => {
    onEnd?.();
  };

  recognition.start();

  // Return a function to stop recognition if needed
  return () => recognition.stop();
};
