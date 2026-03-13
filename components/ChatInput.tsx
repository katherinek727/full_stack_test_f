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

interface ChatInputProps {
  onConversationVisibleChange?: (visible: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onConversationVisibleChange,
}) => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasOpenedResponse, setHasOpenedResponse] = useState(false);
  const [history, setHistory] = useState<
    { question: string; answer: string | null }[]
  >([]);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const historyContainerRef = useRef<HTMLDivElement | null>(null);
  const lastHistoryLengthRef = useRef(0);
  const lastQuestionRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (history.length > lastHistoryLengthRef.current) {
      // A new question was added – scroll so that it appears at the top
      const questionEl = lastQuestionRef.current;
      const container = historyContainerRef.current;
      if (questionEl && container) {
        const containerRect = container.getBoundingClientRect();
        const questionRect = questionEl.getBoundingClientRect();
        const offset = questionRect.top - containerRect.top;
        container.scrollTop += offset;
      } else {
        // Fallback: scroll to top of container
        container && (container.scrollTop = container.scrollHeight);
      }
      lastHistoryLengthRef.current = history.length;
    } else {
      lastHistoryLengthRef.current = history.length;
    }
  }, [history]);

  useEffect(() => {
    if (onConversationVisibleChange) {
      onConversationVisibleChange(hasOpenedResponse);
    }
  }, [hasOpenedResponse, onConversationVisibleChange]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setHasOpenedResponse(true);
    setLoading(true);
    setError(null);
    setReply(null);
    setInput("");

    // Tentatively add the question with no answer yet
    setHistory((prev) => [...prev, { question: trimmed, answer: null }]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Server error");
      }

      const data = await res.json();
      const answer = data.reply ?? "No response from model";
      setReply(answer);

      // Fill in the answer for the last question
      setHistory((prev) => {
        if (!prev.length) return prev;
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        const last = updated[lastIndex];
        if (last.answer === null && last.question === trimmed) {
          updated[lastIndex] = { ...last, answer };
        }
        return updated;
      });
    } catch (e: any) {
      setError(e.message || "Something went wrong");

      // Remove the tentative question from history on error
      setHistory((prev) => {
        if (!prev.length) return prev;
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.answer === null && last.question === trimmed) {
          updated.pop();
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    setReply(null);
    setError(null);
    setHasOpenedResponse(false);
    setInput("");
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

          {/* Send button */}
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
        </div>

        {/* Error message */}
        {error && <p className="text-sm text-red-400">{error + "Try again in a few seconds."}</p>}
      </div>

      {/* Right: running history of Q&A */}
      {hasOpenedResponse && (
        <div
          className="min-h-[200px] lg:min-h-[700px] rounded-2xl shadow-lg border border-white/11 animate-rise-up"
          style={{
            backgroundColor: "#072E6A", 
          }}
        >
          <div className="flex items-center justify-between mb-3 px-5 py-4" style={{   
              borderRadius: "15px 15px 0px 0px",
              borderBottom: "1px solid #1d4c9c70"}}> 
            <span
              className="text-lg font-medium"
              style={{ color: "var(--foreground-subtle)" }}
            >
              Conversation
            </span>
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-xs text-[14px] px-3 py-1 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition"
            >
              Clear
            </button>
          </div>

          <div
            ref={historyContainerRef}
            className="mr-0.5 pb-1 max-h-[600px] overflow-y-auto response-scroll p-5"
          >
            {history.length === 0 ? (
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--foreground-subtle)" }}
              >
                Your conversation will appear here.
              </p>
            ) : (
              <div className="flex flex-col gap-8">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2"
                    ref={index === history.length - 1 ? lastQuestionRef : null}
                  >
                    {/* Question (user) on the right, with a subtle bubble, left-aligned text */}
                    <div className="flex justify-end">
                      <div className="inline-block max-w-[95%] rounded-2xl bg-white/5 px-4 py-3 text-[14px] leading-relaxed text-white/90 whitespace-pre-wrap text-left">
                        {entry.question}
                      </div>
                    </div>

                    {/* Answer (assistant) on the left, left-aligned text on background */}
                    <div className="flex justify-start">
                      <div className="inline-block max-w-[95%] text-[14px] leading-relaxed text-white/90 text-left">
                        {entry.answer ? (
                          <span
                            className="block whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: entry.answer }}
                          />
                        ) : index === history.length - 1 && loading ? (
                          <div className="flex items-center justify-end gap-2">
                            <span style={{ color: "var(--foreground-subtle)" }}>
                              Generating response...
                            </span>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          </div>
                        ) : (
                          <span style={{ color: "var(--foreground-subtle)" }}>
                            Waiting for response...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;