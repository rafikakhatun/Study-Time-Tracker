
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaSave } from "react-icons/fa";

export default function Timer({ selectedId, subjects, setSubjects }) {
  const [running, setRunning] = useState(false);
  const [nowTick, setNowTick] = useState(0); // used to force rerenders
  const startRef = useRef(null); // timestamp when started (ms)
  const tickInterval = useRef(null);

  // find selected subject
  const selected = subjects.find((s) => s.id === selectedId);

  // calculate displayedSeconds: base + elapsed (if running)
  const displayedSeconds = (() => {
    const base = selected ? selected.time : 0;
    if (!running || !startRef.current) return base;
    const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
    return base + elapsed;
  })();

  // start/resume
  const handleStart = () => {
    if (!selected) return;
    if (!running) {
      startRef.current = Date.now();
      setRunning(true);
    }
  };

  // pause: accumulate elapsed into subject.time and stop
  const handlePause = () => {
    if (!selected || !running) return;
    const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
    setSubjects(
      subjects.map((s) =>
        s.id === selected.id ? { ...s, time: s.time + elapsed } : s
      )
    );
    startRef.current = null;
    setRunning(false);
  };

  // save & reset: same as pause but also leave timer stopped (subject remains selected)
  const handleSaveReset = () => {
    if (selected && running) {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      setSubjects(
        subjects.map((s) =>
          s.id === selected.id ? { ...s, time: s.time + elapsed } : s
        )
      );
    }
    startRef.current = null;
    setRunning(false);
  };

  // effect to keep UI ticking while running
  useEffect(() => {
    if (running) {
      tickInterval.current = setInterval(() => setNowTick((t) => t + 1), 500);
    } else {
      clearInterval(tickInterval.current);
    }
    return () => clearInterval(tickInterval.current);
  }, [running]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Timer</h2>

      {selected ? (
        <>
          <div className="mb-3 text-sm text-gray-600">Now studying:</div>
          <div className="text-2xl font-mono mb-4">{displayedSeconds}s</div>

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
