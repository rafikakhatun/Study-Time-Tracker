
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaSave } from "react-icons/fa";
import { formatTime } from "../utils/formatTime";

export default function Timer({ selectedId, subjects, setSubjects }) {
  // ... same logic as before ...
  // calculate displayedSeconds (base + running elapsed) as number
  const base = selected ? selected.time : 0;
  const elapsed = running && startRef.current ? Math.floor((Date.now() - startRef.current) / 1000) : 0;
  const totalSeconds = base + elapsed;

  // rest logic unchanged...
  return (
    <div className="bg-white rounded-2xl shadow p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Timer</h2>

      {selected ? (
        <>
          <div className="mb-3 text-sm text-gray-600">Now studying:</div>
          <div className="text-2xl font-mono mb-4">{formatTime(totalSeconds)}</div>

          <div className="flex justify-center gap-2">
            <button
              onClick={running ? handlePause : handleStart}
              className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
                running ? "bg-yellow-500" : "bg-green-600"
              }`}
            >
              {running ? <FaPause /> : <FaPlay />}
              {running ? "Pause" : "Start"}
            </button>

            <button
              onClick={handleSaveReset}
              className="px-4 py-2 rounded bg-red-600 text-white flex items-center gap-2"
            >
              <FaSave /> Save
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Select a subject to begin.</p>
      )}
    </div>
  );
}
