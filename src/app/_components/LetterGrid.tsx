"use client";
import React, { useState, useRef } from "react";

const LetterGrid: React.FC = () => {
  const [selectedLetters, setSelectedLetters] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [draggedOverLetters, setDraggedOverLetters] = useState<Set<string>>(
    new Set(),
  );

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

  const handleMouseDown = (
    letter: string,
    rowIndex: number,
    letterIndex: number,
  ) => {
    setIsDragging(true);
    const letterId = `${rowIndex}-${letterIndex}`;
    setDraggedOverLetters(new Set([letterId]));
    setSelectedLetters(letter);
  };

  const handleMouseEnter = (rowIndex: number, letterIndex: number) => {
    if (isDragging) {
      const letterId = `${rowIndex}-${letterIndex}`;
      setDraggedOverLetters((prev) => new Set(prev.add(letterId)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedOverLetters(new Set()); // Clear dragged over letters on mouse up
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div
        className={`mb-5 flex h-12 w-72 items-center justify-center border-2 p-2 text-center text-2xl font-bold uppercase tracking-wider text-black`}
      >
        {selectedLetters}
      </div>
      <div className="grid grid-cols-6 gap-1">
        {letters.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((letter, letterIndex) => {
              const letterId = `${rowIndex}-${letterIndex}`;
              const isDraggedOver = draggedOverLetters.has(letterId);
              return (
                <button
                  key={letterIndex}
                  className={`m-1.25 flex h-10 w-10 items-center justify-center rounded-full border ${isDraggedOver ? "bg-[#DBD8C5]" : "bg-white"} p-5 text-2xl font-medium text-black transition-colors duration-200`}
                  onMouseDown={() =>
                    handleMouseDown(letter, rowIndex, letterIndex)
                  }
                  onMouseEnter={() => handleMouseEnter(rowIndex, letterIndex)}
                  onMouseUp={handleMouseUp}
                >
                  {letter}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LetterGrid;
