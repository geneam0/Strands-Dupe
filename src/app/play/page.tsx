"use client";
import Link from "next/link";
import LetterGrid from "../_components/LetterGrid";
import Tracker from "../_components/Tracker";
import React, { useState, useEffect } from "react";
import { api } from "~/trpc/server";

export default function Play() {
  const [hintCount, setHintCount] = useState(0);
  const [wordsFound, setWordsFound] = useState(8);
  const [showHint, setShowHint] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (wordsFound === 8) {
      setShowCompletionPopup(true);
    }
  }, [wordsFound]);

  const str = "🔵💡🔵🔵🔵💡🔵🔵🟡🔵";
  const characters = Array.from(str);
  const strEdited: React.ReactNode[] = characters.reduce(
    (acc: React.ReactNode[], curr: string, index: number) => {
      acc.push(curr);
      if ((index + 1) % 4 === 0 && index + 1 !== characters.length) {
        acc.push(<br key={index} />);
      }
      return acc;
    },
    [],
  );

  const strEdited2 = () => {
    const characters = Array.from(str);
    let result = "";
    for (let i = 0; i < characters.length; i++) {
      result += characters[i];
      if ((i + 1) % 4 === 0 && i + 1 !== characters.length) {
        result += "\n";
      }
    }
    return result;
  };

  const textToCopy = 'Strands #84\n"Deviled eggs anyone?"\n' + strEdited2();
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="grid max-w-4xl grid-cols-2 gap-x-24">
        <div className="col-span-1 my-auto">
          <Tracker
            hintCount={hintCount}
            setHintCount={setHintCount}
            wordsFound={wordsFound}
            setShowHint={setShowHint}
            setShowCompletionPopup={setShowCompletionPopup}
          />
        </div>
        <div className="col-span-1">
          <LetterGrid
            setHintCount={setHintCount}
            setWordsFound={setWordsFound}
            showHint={showHint}
            setShowHint={setShowHint}
          />
        </div>
      </div>
      {showCompletionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full rounded-lg bg-white p-8 text-center shadow-lg md:w-1/2">
            <button
              className="absolute right-3 top-3 text-sm"
              onClick={() => setShowCompletionPopup(false)}
            >
              Back to puzzle ×
            </button>
            <h3 className="mb-4 text-3xl font-bold">
              HAPPY BIRTHDAY <br /> CHRISTINE!
            </h3>
            <p className="text-sm text-[#52524f]">
              Strands #84
              <br />
              "Deviled eggs anyone?"
            </p>
            <div className="my-4 text-center text-3xl">
              <h1>{strEdited}</h1>
            </div>
            <p className="text-sm">
              Nice job finding the theme words 🔵 and <br />
              Spangram 🟡. You used {hintCount} hints 💡.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={copyToClipboard}
                className="m-auto w-3/4 rounded-full bg-black px-6 py-3 text-lg text-white hover:bg-gray-800 sm:w-1/2"
              >
                {copySuccess ? "Copied!" : "Share Your Results"}
              </button>
              <button
                className="m-auto w-3/4 rounded-full bg-yellow-400 px-6 py-3 text-lg text-black hover:bg-yellow-500 sm:w-1/2"
                onClick={() => setShowCompletionPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
