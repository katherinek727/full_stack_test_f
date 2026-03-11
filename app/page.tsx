import ChatInput from "../components/ChatInput";
import { Mic, ArrowRight } from "lucide-react"

export default function Home() {
  return (
     <div className="bg-[#072E6A] min-h-screen flex flex-col justify-between px-40 py-20">

      <div>
        {/* Chat icon */}
        <div className="bg-[#1C4C9C] w-15 h-15 rounded-[10px] flex items-center justify-center mb-5 text-white text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-7 h-7 text-white"
            fill="currentColor"
          >
            <path d="M12 3C6.486 3 2 6.589 2 11c0 2.066.877 3.96 2.32 5.416L3 21l4.717-1.32C9.062 20.573 10.5 21 12 21c5.514 0 10-3.589 10-9s-4.486-9-10-9z" />
          </svg>
        </div>

        {/* Headings */}
        <h1 className="text-white text-5xl mt-17">Hi there!</h1>
        <h1 className="text-white text-6xl mt-13">What would you like to know?</h1>
        <p className="mt-7 mb-10 text-[#ACC0DB] text-3xl font-thin leading-relaxed">
          Use one of the most common prompts below<br />
          or ask your own question
        </p>
      </div>
      
      
      <div>
        {/* Chat input */}
        <ChatInput />
      </div>
      
    </div>
  );
}

  