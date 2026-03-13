"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const MIN_LINES = 1;
const MAX_LINES = 8;
const LINE_HEIGHT_PX = 24;

const ChatInput: React.FC = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [hasOpenedResponse, setHasOpenedResponse] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    ta.style.height = "auto";

    const capped = Math.min(
      Math.max(ta.scrollHeight, MIN_LINES * LINE_HEIGHT_PX),
      MAX_LINES * LINE_HEIGHT_PX,
    );

    ta.style.height = `${capped}px`;
    ta.style.overflowY =
      capped >= MAX_LINES * LINE_HEIGHT_PX ? "auto" : "hidden";
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input, adjustTextareaHeight]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    setHasOpenedResponse(true);
    setLoading(true);
    setError(null);
    setReply(null);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Server error");
      }

      const data = await res.json();
      setReply(data.reply ?? "No response from model");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
      setHasSent(true);
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = useCallback(() => {
    setInput("");
    setReply(null);
    setError(null);
    setHasSent(false);
  }, []);

  const toggleRecording = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionImpl =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionImpl) {
      setError("Your browser does not support speech recognition.");
      return;
    }

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognitionImpl() as SpeechRecognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      // Replace input with latest transcript (no stacking)
      setInput(transcript);
    };

    recognition.onerror = () => {
      setError("Speech recognition error. Please try again.");
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    setIsRecording(true);
    recognition.start();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // If the user clears the text, also clear reply and error
    if (!value.trim() && (reply !== null || error !== null)) {
      setReply(null);
      setError(null);
      setHasSent(false);
    }
  };

  const hasText = input.trim().length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px),1fr] gap-6 lg:gap-8 items-start w-full max-w-6xl">
      {/* Left: input area */}
      <div className="flex flex-col gap-4">
        <div
          className="flex items-end rounded-2xl pl-3 pr-0 shadow-sm border border-white/11"
          style={{ backgroundColor: "#072E6A", alignItems: "center"}}
        >
          {/* Microphone */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`flex items-center justify-center rounded-full p-2.5 transition shrink-0 mb-1 ${
              isRecording ? "bg-red-500/90" : "bg-[#072E6A] hover:bg-white/5"
            }`}
            aria-label="Toggle voice input"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7 shrink-0"
              style={{ color: isRecording ? "#fff" : "var(--accent)" }}
            >
              <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <path d="M12 19v4" />
              <path d="M8 23h8" />
            </svg>
          </button>

          {/* Text input */}
          <textarea
            ref={textareaRef}
            placeholder="Ask whatever you want"
            rows={MIN_LINES}
            className="flex-1 min-h-[24px] max-h-[192px] bg-transparent outline-none text-base py-3.5 pl-2 placeholder: text-[20px] resize-none"
            style={{ color: "var(--foreground-subtle)" }}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          {/* After sending: show Delete (x); otherwise show Send */}
          {hasSent && hasText ? (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-r-2xl rounded-l-2xl py-5 px-5 flex items-center justify-center transition hover:opacity-90 shrink-0 mb-0 min-h-[44px] hover:bg-white/20"
              aria-label="Clear input and response"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="rounded-r-2xl rounded-l-2xl py-5 px-5 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 shrink-0 mb-0 min-h-[44px]"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Error message */}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Right: answer box */}
      {hasOpenedResponse && (
        <div
          className="min-h-[200px] lg:min-h-[280px] rounded-2xl p-5 shadow-lg border border-white/11 animate-rise-up"
          style={{
            backgroundColor: "#072E6A",
          }}
        >
          <div className="mr-0.5 pb-1 max-h-[235px] overflow-y-auto response-scroll">
            {loading ? (
              <div className="flex items-center justify-center h-full pt-[100px]">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : reply && !error ? (
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                {reply}
              </p>
            ) : (
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--foreground-subtle)" }}
              >
                Your response will appear here.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;