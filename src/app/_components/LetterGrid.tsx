"use client";
import React, { useState, useEffect } from "react";

const LetterGrid: React.FC = () => {
  const [selectedLetters, setSelectedLetters] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectBlueIds, setSelectedBlueIds] = useState<string[]>([]);
  const [selectGoldIds, setSelectedGoldIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [wordList, setWordList] = useState<string[]>([]);

  useEffect(() => {
    fetch("/words.txt")
      .then((response) => response.text())
      .then((text) => {
        setWordList(text.split(/\r?\n/));
      });
  }, []);

  const [hints, setHints] = useState(0);
  const answerList = ["HOUND"];
  const spangram = "HUSKY";

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

  const timer = (seconds: number, callback: () => void) => {
    setTimeout(callback, seconds * 1000);
  };

  const addSelectedLetters = (
    letter: string,
    rowIndex: number,
    colIndex: number,
  ) => {
    const newId = `${rowIndex}-${colIndex}`;
    const currentLength = selectedLetters.length;

    const isAdjacent = (lastId: string, newId: string): boolean => {
      const [lastRow, lastCol] = lastId.split("-").map(Number);
      const [newRow, newCol] = newId.split("-").map(Number);
      if (
        typeof lastRow === "undefined" ||
        typeof lastCol === "undefined" ||
        typeof newRow === "undefined" ||
        typeof newCol === "undefined"
      ) {
        return false;
      }
      return Math.abs(lastRow - newRow) <= 1 && Math.abs(lastCol - newCol) <= 1;
    };

    const lastSelectedId =
      selectedIds.length > 0 ? selectedIds[selectedIds.length - 1] : null;

    if (currentLength === 0 || !lastSelectedId) {
      setSelectedIds([newId]);
      setSelectedLetters(letter);
    } else if (currentLength < 20 && isAdjacent(lastSelectedId, newId)) {
      setSelectedIds([...selectedIds, newId]);
      setSelectedLetters((prevLetters) => prevLetters + letter);
    } else {
      setSelectedIds([newId]);
      setSelectedLetters(letter);
    }
  };

  const checkWordList = (
    letter: string,
    rowIndex: number,
    colIndex: number,
  ) => {
    const newId = `${rowIndex}-${colIndex}`;
    const currentLength = selectedLetters.length;
    if (currentLength <= 3) {
      setSelectedLetters("Too short");
      setSelectedIds([]);
      timer(1, () => {
        setSelectedLetters("");
      });
    } else if (answerList.includes(selectedLetters)) {
      timer(1, () => {});
      const newBlueIds = [...selectBlueIds];
      for (const id of selectedIds) {
        newBlueIds.push(id);
      }
      setSelectedBlueIds(newBlueIds);
      setSelectedIds([]);
    } else if (selectedLetters === spangram) {
      setSelectedLetters("SPANGRAM!");
      timer(3, () => {
        setSelectedLetters("");
      });
      setSelectedGoldIds(selectedIds);
      setSelectedIds([]);
    } else if (wordList.includes(selectedLetters)) {
      setHints((hints) => hints + 1);
      timer(1, () => {
        setSelectedLetters("");
      });
      setSelectedIds([]);
      console.log("IN WORD LIST");
    } else {
      setSelectedLetters("NOT IN WORD LIST");
      timer(1, () => {
        setSelectedLetters("");
      });
      setSelectedIds([]);
    }
  };

  const handleIsSelecting = (
    letter: string,
    rowIndex: number,
    colIndex: number,
  ) => {
    const newId = `${rowIndex}-${colIndex}`;

    if (selectedIds.includes(newId)) {
      checkWordList(letter, rowIndex, colIndex);
    } else {
      addSelectedLetters(letter, rowIndex, colIndex);
    }
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
            {row.map((letter, colIndex) => {
              const letterId = `${rowIndex}-${colIndex}`;
              const isBrownSelected = selectedIds.includes(letterId);
              const isBlueSelected = selectBlueIds.includes(letterId);
              const isGoldSelected = selectGoldIds.includes(letterId);
              return (
                <button
                  key={colIndex}
                  className={`m-1.25 flex h-10 w-10 items-center justify-center rounded-full border ${
                    isGoldSelected
                      ? "bg-[#F8CB2C]"
                      : isBlueSelected
                        ? "bg-[#AEDFEE]"
                        : isBrownSelected
                          ? "bg-[#DBD8C5]"
                          : "bg-white"
                  } p-5 text-2xl font-medium text-black transition-colors duration-200`}
                  onMouseDown={() =>
                    handleIsSelecting(letter, rowIndex, colIndex)
                  }
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
