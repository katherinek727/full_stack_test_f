import React from "react";
import { Mic, ArrowRight } from "lucide-react"

const ChatInput: React.FC = () => {
  return (
      <div className="flex items-center w-[600px] bg-[#072E6A] border border-[#153E83] border-[3px] rounded-[17px] pl-4 shadow-md">
        
        {/* Mic Icon */}
        {/* <Mic className="text-[#2557A9] w-5 h-5 mr-3" /> */}
        {/* <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-7 w-1"
        >
          <path
            d="M12 3a2.5 2.5 0 0 0-2.5 2.5v5A2.5 2.5 0 0 0 12 13a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 12 3Zm-4 7.5A4 4 0 0 0 12 14.5a4 4 0 0 0 4-4V9h-1.5v1.5a2.5 2.5 0 0 1-5 0V9H8v1.5Zm3.25 5.13V19h1.5v-3.37A5.5 5.5 0 0 1 18.5 10H17a4 4 0 0 1-8 0H7.5a5.5 5.5 0 0 1 3.75 5.63Z"
            fill="#2356A9"
          />
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-11 text-[#2356A9]"
          fill="#1D4D9B"
          viewBox="0 0 20 20"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5a3.375 3.375 0 00-3.375 3.375v6.75A3.375 3.375 0 0012 15a3.375 3.375 0 003.375-3.375V4.875A3.375 3.375 0 0012 1.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.125 11.25H18a6 6 0 01-12 0H4.875" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v4.5m-4.5-1.125h9" />
        </svg>


        {/* Input */}
        <textarea
          // type="text"
          placeholder="Ask whatever you want"
          rows={1}
          className="flex-1 scrollbar-hide bg-transparent outline-none text-[#ACC0DB] text-[20px] placeholder-[#9bb8e0] text-sm pl-5"
        />

        {/* Arrow Button */}
        <button className="ml-3 bg-[#1D4D9B] hover:bg-gray-200 transition rounded-[15px] p-4 flex items-center justify-center">
          {/* <ArrowRight className="w-4 h-4 text-[#0d3b78]" /> */}
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
  );
};

export default ChatInput;