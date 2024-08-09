import React from "react";

export default function AiBar({prompts,setPrompts,Ai}) {
  return (
    <div className="max-w-md mx-auto my-4">
      <form className="flex items-center"  onSubmit={Ai}>
        <input
          value={prompts}
          onChange={(e) => setPrompts(e.target.value)}
          type="search"
          className="w-full px-4 py-2 text-sm text-gray-700 border rounded-l-lg focus:outline-none focus:border-blue-500"
          placeholder="Search movies..."
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-red-500 rounded-r-lg hover:bg-red-600 focus:outline-none"
        >
          ask
        </button>
      </form>
    </div>
  );
}
