"use client";

import React, { useCallback, useRef, useState } from "react";

const ChatInput: React.FC = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef<any | null>(null);

  const handleSend = useCallback(async () => {
    if (!input.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setReply(null);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Your browser does not support speech recognition.");
      return;
    }

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + transcript : transcript));
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

  return (
    <div className="flex flex-col gap-3 w-[600px]">
      <div className="flex items-center bg-[#072E6A] border border-[#153E83] border-[3px] rounded-[17px] pl-4 shadow-md">
        <button
          type="button"
          onClick={toggleRecording}
          className={`flex items-center justify-center rounded-full p-2 transition ${
            isRecording ? "bg-red-600" : "bg-transparent hover:bg-[#0b3b80]"
          }`}
          aria-label="Toggle voice input"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-11 text-[#2356A9]"
            fill="#1D4D9B"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1.5a3.375 3.375 0 00-3.375 3.375v6.75A3.375 3.375 0 0012 15a3.375 3.375 0 003.375-3.375V4.875A3.375 3.375 0 0012 1.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.125 11.25H18a6 6 0 01-12 0H4.875"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v4.5m-4.5-1.125h9"
            />
          </svg>
        </button>

        <input
          placeholder="Ask whatever you want"
          className="flex-1 bg-transparent outline-none text-[#ACC0DB] text-[20px] placeholder-[#9bb8e0] text-sm pl-5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="ml-3 bg-[#1D4D9B] hover:bg-[#225fb6] disabled:opacity-60 disabled:cursor-not-allowed transition rounded-[15px] p-4 flex items-center justify-center"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-7 h-7 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="text-sm text-[#ACC0DB]">Waiting for response...</div>
      )}

      {error && (
        <div className="text-sm text-red-400">
          {error}
        </div>
      )}

      {reply && !error && (
        <div className="mt-1 rounded-xl bg-[#0a3a7a] text-[#e2ecff] text-sm p-3 max-h-60 overflow-y-auto">
          {reply}
        </div>
      )}
    </div>
  );
};

export default ChatInput;