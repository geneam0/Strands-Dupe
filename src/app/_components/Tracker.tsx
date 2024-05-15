"use client";
import React, { useState } from "react";

interface TrackerProps {
  hintCount: number;
  setHintCount: React.Dispatch<React.SetStateAction<number>>;
  wordsFound: number;
  setShowHint: (value: boolean) => void;
}

const Tracker: React.FC<TrackerProps> = ({
  hintCount,
  setHintCount,
  wordsFound,
  setShowHint,
}) => {
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
          onClick={() => {
            setHintCount(hintCount - 3);
            setShowHint(true);
          }}
          disabled={hintCount < 3}
          className={`w-2/5 rounded-full py-2 text-lg font-semibold ${
            hintCount < 3
              ? "cursor-not-allowed border-2 border-[#cfcfcf] text-[#cfcfcf]"
              : "text-white"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, #000000 ${(hintCount / 3) * 100}%, #ffffff ${(hintCount / 3) * 100}%)`,
          }}
        >
          Hint
        </button>
      </div>
    </div>
  );
};

export default Tracker;
