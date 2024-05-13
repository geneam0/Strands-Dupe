import Link from "next/link";
import LetterGrid from "../_components/LetterGrid";
import Tracker from "../_components/Tracker";
import { api } from "~/trpc/server";

export default function Play() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="grid max-w-4xl grid-cols-2 gap-x-24">
        <div className="col-span-1 my-auto">
          <Tracker />
        </div>
        <div className="col-span-1">
          <LetterGrid />
        </div>
      </div>
    </div>
  );
}
