"use client";
import React, { useState } from "react";

const LetterGrid: React.FC = () => {
  const [selectedLetters, setSelectedLetters] = useState<string>("");

  const letters = [
    ["Y", "R", "E", "O", "U", "D"],
    ["K", "X", "H", "E", "N", "P"],
    ["S", "O", "P", "R", "H", "E"],
    ["U", "B", "G", "I", "D", "H"],
    ["H", "O", "E", "I", "L", "S"],
    ["D", "L", "L", "B", "A", "E"],
    ["O", "E", "O", "E", "G", "E"],
    ["C", "L", "D", "O", "P", "L"],
  ];

  const handleClick = (letter: string) => {
    setSelectedLetters((prev) => prev + letter);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="mb-5 flex h-12 w-72 items-center justify-center border-2 border-black bg-white p-2 text-center text-2xl font-bold uppercase tracking-wider text-black">
        {selectedLetters}
      </div>
      <div className="grid grid-cols-6 gap-1">
        {letters.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((letter, letterIndex) => (
              <button
                key={letterIndex}
                className="flex h-10 w-10 items-center justify-center border border-gray-400 bg-gray-300 text-lg font-medium text-black transition-colors duration-200 hover:bg-gray-400"
                onClick={() => handleClick(letter)}
              >
                {letter}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LetterGrid;
