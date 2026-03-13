import ChatInput from "../components/ChatInput";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between px-8 sm:px-16 md:px-24 lg:px-40 py-2 md:pt-20 bg-[#072E6A]">
      <div>
        {/* Chat icon */}
        <div
          className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-6 text-white"
          style={{ backgroundColor: "#1D4C9C" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="currentColor"
          >
            <path d="M12 3C6.486 3 2 6.589 2 11c0 2.066.877 3.96 2.32 5.416L3 21l4.717-1.32C9.062 20.573 10.5 21 12 21c5.514 0 10-3.589 10-9s-4.486-9-10-9z" />
          </svg>
        </div>

        {/* Headings */}
        <h1 className="text-white text-2xl md:text-3xl font-medium mt-8">
          Hi there!
        </h1>
        <h1 className="text-white text-4xl md:text-5xl font-bold mt-4">
          What would you like to know?
        </h1>
        <p
          className="mt-6 mb-10 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--foreground-subtle)" }}
        >
          Use one of the most common prompts below
          <br />
          or ask your own question
        </p>
      </div>

      <div className="w-full mb-5">
        <ChatInput />
      </div>

    
    </div>
  );
}