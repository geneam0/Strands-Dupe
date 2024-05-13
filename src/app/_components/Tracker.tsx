"use client";
import React, { useState } from "react";

const Tracker: React.FC = () => {
  const [hintCount, setHintCount] = useState(0);
  const [wordsFound, setWordsFound] = useState(0);

  return (
    <div className="space-y-8">
      <div className="content-center overflow-hidden rounded-lg shadow-lg">
        <div className="bg-[#aedfee] p-4">
          <h2 className="text-center text-sm font-semibold text-black">
            TODAY&apos;S THEME
          </h2>
        </div>
        <div className="bg-white p-4">
          <p className="text-center text-xl font-bold text-black">
            Deviled eggs anyone?
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-center text-2xl text-black">
          <strong>{wordsFound}</strong> of <strong>8</strong> theme words found.
        </h1>
      </div>
      <div className="mx-auto max-w-md text-center">
        <button
          onClick={() => setHintCount(hintCount + 1)}
          disabled={hintCount < 3}
          className={`w-2/5 rounded-full py-2 text-lg font-semibold ${hintCount < 3 ? "cursor-not-allowed border-2 border-[#cfcfcf] text-[#cfcfcf]" : "bg-black text-white"}`}
        >
          Hint
        </button>
      </div>
    </div>
  );
};

export default Tracker;
