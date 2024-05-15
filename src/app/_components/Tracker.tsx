"use client";
import React from "react";

interface TrackerProps {
  hintCount: number;
  setHintCount: React.Dispatch<React.SetStateAction<number>>;
  wordsFound: number;
  setShowHint: (value: boolean) => void;
  setShowCompletionPopup: (value: boolean) => void;
  str: string;
  setStr: (value: string) => void;
}

const Tracker: React.FC<TrackerProps> = ({
  hintCount,
  setHintCount,
  wordsFound,
  setShowHint,
  setShowCompletionPopup,
  str,
  setStr,
}) => {
  return (
    <div className="lg:space-y-8">
      <div className="md:items:begin content-center overflow-hidden rounded-lg shadow-lg">
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
        <h1 className="md:items:end text-center text-2xl text-black">
          <strong>{wordsFound}</strong> of <strong>8</strong> theme words found.
        </h1>
      </div>
      <div className="md:items:end mx-auto max-w-md text-center">
        <button
          onClick={() => {
            if (wordsFound === 8) {
              setShowCompletionPopup(true);
            } else {
              setHintCount(hintCount - 3);
              setStr(str + "💡");
              setShowHint(true);
            }
          }}
          disabled={hintCount < 3 && wordsFound < 8}
          className={`w-2/5 rounded-full py-2 text-lg font-semibold ${
            wordsFound === 8
              ? "border-2 border-black text-black"
              : hintCount < 3
                ? "border-2 border-[#cfcfcf] text-[#cfcfcf]"
                : "text-white"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, #000000 ${(hintCount / 3) * 100}%, #ffffff ${(hintCount / 3) * 100}%)`,
          }}
        >
          {wordsFound === 8 ? "View Results" : "Hint"}
        </button>
      </div>
    </div>
  );
};

export default Tracker;
