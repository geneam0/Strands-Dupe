"use client";
import Link from "next/link";
import LetterGrid from "../_components/LetterGrid";
import Tracker from "../_components/Tracker";
import React, { useState } from "react";
import { api } from "~/trpc/server";

export default function Play() {
  const [hintCount, setHintCount] = useState(0);
  const [wordsFound, setWordsFound] = useState(0);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="grid max-w-4xl grid-cols-2 gap-x-24">
        <div className="col-span-1 my-auto">
          <Tracker
            hintCount={hintCount}
            setHintCount={setHintCount}
            wordsFound={wordsFound}
            setShowHint={setShowHint}
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
    </div>
  );
}
