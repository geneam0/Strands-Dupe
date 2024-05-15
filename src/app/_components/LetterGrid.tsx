"use client";
import React, { useState, useEffect } from "react";

interface LetterGridProps {
  setHintCount: React.Dispatch<React.SetStateAction<number>>;
  setWordsFound: React.Dispatch<React.SetStateAction<number>>;
  showHint: boolean;
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
}

const LetterGrid: React.FC<LetterGridProps> = ({
  setHintCount,
  setWordsFound,
  showHint,
  setShowHint,
}) => {
  const [selectedLetters, setSelectedLetters] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectBlueIds, setSelectedBlueIds] = useState<string[]>([]);
  const [selectGoldIds, setSelectedGoldIds] = useState<string[]>([]);

  const [wordList, setWordList] = useState<string[]>([]);
  useEffect(() => {
    fetch("/words.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        setWordList(text.split(/\r?\n/));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const answerList = [
    "THEYTHEM",
    "SMOOCH",
    "BANDANA",
    "LADY",
    "WAGNER",
    "READ",
    "TAURUS",
  ];
  const spangram = "GRUBBER";
  const letters = [
    ["R", "N", "G", "A", "A", "N"],
    ["L", "E", "W", "B", "D", "A"],
    ["G", "A", "T", "A", "A", "N"],
    ["M", "R", "D", "U", "E", "R"],
    ["E", "U", "Y", "B", "R", "R"],
    ["H", "T", "B", "U", "S", "E"],
    ["H", "O", "Y", "E", "A", "D"],
    ["C", "O", "M", "S", "H", "T"],
  ];

  const [hintsUsed, setHintsUsed] = useState(0);
  const ans_coordinates = [
    ["4-5", "5-5", "6-4", "6-5"], // READ
    ["0-0", "0-1", "0-2", "0-3", "1-1", "1-2"], // WAGNER
    ["6-0", "6-1", "7-0", "7-1", "7-2", "7-3"], // SMOOCH
    ["0-4", "0-5", "1-3", "1-4", "1-5", "2-4", "2-5"], // BANDANA
    ["2-2", "2-3", "3-3", "4-4", "5-3", "5-4"], // TAURUS
    ["3-0", "4-0", "5-0", "5-1", "6-2", "6-3", "7-4", "7-5"], // THEYTHEM
    ["1-0", "2-1", "3-2", "4-2"], // LADY
    ["2-0", "3-1", "4-1", "5-2", "4-3", "3-4", "3-5"], // GRUBBER
  ];

  useEffect(() => {
    if (showHint) {
      setShowHint(false);
      setHintsUsed((hintsUsed) => hintsUsed + 1);
    }
  });

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

    const updateSelections = (reset: boolean) => {
      setSelectedIds(reset ? [newId] : [...selectedIds, newId]);
      setSelectedLetters(
        reset ? letter : (prevLetters) => prevLetters + letter,
      );
    };

    if (currentLength === 0 || !lastSelectedId) {
      updateSelections(true);
    } else if (currentLength < 20 && isAdjacent(lastSelectedId, newId)) {
      updateSelections(false);
    } else {
      updateSelections(true);
    }
  };

  const checkWordList = () => {
    const currentLength = selectedLetters.length;
    const clearSelectedLetters = (delay: number) => {
      timer(delay, () => {
        setSelectedLetters("");
      });
    };

    if (currentLength <= 3) {
      setSelectedLetters("Too short");
      clearSelectedLetters(1);
    } else if (answerList.includes(selectedLetters)) {
      setWordsFound((wordsFound) => wordsFound + 1);
      setSelectedBlueIds((prevIds) => [...prevIds, ...selectedIds]);
      clearSelectedLetters(2);
    } else if (selectedLetters === spangram) {
      setSelectedLetters("SPANGRAM!");
      setWordsFound((wordsFound) => wordsFound + 1);
      setSelectedGoldIds(selectedIds);
      clearSelectedLetters(3);
    } else if (wordList.includes(selectedLetters)) {
      setHintCount((hintCount) => hintCount + 1);
      clearSelectedLetters(1);
    } else {
      setSelectedLetters("NOT IN WORD LIST");
      clearSelectedLetters(1);
    }
    setSelectedIds([]);
  };

  const handleIsSelecting = (
    letter: string,
    rowIndex: number,
    colIndex: number,
  ) => {
    const newId = `${rowIndex}-${colIndex}`;

    if (!selectBlueIds.includes(newId) && !selectGoldIds.includes(newId)) {
      if (selectedIds.includes(newId)) {
        checkWordList();
      } else {
        addSelectedLetters(letter, rowIndex, colIndex);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div
        className={`mb-5 flex h-12 w-72 items-center justify-center p-2 text-center text-3xl font-bold uppercase tracking-wider text-black`}
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
              const isDashedSelected =
                ans_coordinates[hintsUsed - 1]?.includes(letterId);
              return (
                <button
                  key={colIndex}
                  className={`m-1.25 flex h-10 w-10 items-center justify-center rounded-full border 
                  ${
                    isDashedSelected
                      ? "border-2 border-dashed border-[#49a8c6]"
                      : ""
                  } 
                  ${
                    isGoldSelected
                      ? "border-1 border-solid border-[#F8CB2C] bg-[#F8CB2C]"
                      : isBlueSelected
                        ? "border-1 border-solid border-[#AEDFEE] bg-[#AEDFEE]"
                        : isBrownSelected
                          ? "bg-[#DBD8C5]"
                          : "bg-white"
                  } 
                  p-5 text-2xl font-medium text-black transition-colors duration-200`}
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
