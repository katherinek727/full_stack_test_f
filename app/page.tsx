 "use client";

import React, { useState } from "react";
import ChatInput from "../components/ChatInput";

export default function Home() {
  const [hasConversation, setHasConversation] = useState(false);

  return (
    <div className="min-h-screen flex flex-col px-8 sm:px-16 md:px-24 lg:px-40 py-2 pt-20 bg-[#072E6A] justify-between">
      {!hasConversation && (
        <div className="mb-10">
          {/* Chat icon */}
          <div
            className="w-14 h-14 rounded-[10px] flex items-center justify-center mb-6 text-white"
            style={{ backgroundColor: "#1D4C9C" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              className="w-7 h-7"
              fill="currentColor"
            >
              <path d="M12 3C6.486 3 2 6.589 2 11c0 2.066.877 3.96 2.32 5.416L3 21l4.717-1.32C9.062 20.573 10.5 21 12 21c5.514 0 10-3.589 10-9s-4.486-9-10-9z" />
            </svg>
          </div>

          {/* Headings */}
          <h1 className="text-white text-5xl font-medium mt-10">
            Hi there!
          </h1>
          <h1 className="text-white text-6xl font-bold mt-8">
            What would you like to know?
          </h1>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{
              color: "var(--foreground-subtle)",
              fontSize: "25px",
              marginTop: "35px",
            }}
          >
            Use one of the most common prompts below
            <br />
            or ask your own question
          </p>
        </div>
      )}

      <div className={`w-full ${hasConversation ? "flex-1 flex items-stretch mb-0" : "mb-8"}`}>
        <ChatInput
          onConversationVisibleChange={(visible) => setHasConversation(visible)}
        />
      </div>
    </div>
  );
}