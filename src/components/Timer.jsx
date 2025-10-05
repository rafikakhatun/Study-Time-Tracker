
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaSave } from "react-icons/fa";
import { formatTime } from "../utils/formatTime";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoTimerSharp } from "react-icons/io5";


export default function Timer({ selectedId, subjects, setSubjects }) {
    const [running, setRunning] = useState(false);
    const startRef = useRef(null);

    //  find the selected subject
    const selected = subjects.find((s) => s.id === selectedId);

    //  calculate total seconds
    const base = selected ? selected.time : 0;
    const elapsed =
        running && startRef.current
            ? Math.floor((Date.now() - startRef.current) / 1000)
            : 0;
    const totalSeconds = base + elapsed;

    // update timer display every second while running
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                // trigger re-render each second
                setSubjects((prev) => [...prev]);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [running, setSubjects]);

    //  start timer
    const handleStart = () => {
        if (!selected) return;
        setRunning(true);
        startRef.current = Date.now();
    };

    //  pause timer
    const handlePause = () => {
        if (!selected) return;
        setRunning(false);
        const extra = Math.floor((Date.now() - startRef.current) / 1000);
        setSubjects((prev) =>
            prev.map((s) =>
                s.id === selected.id ? { ...s, time: s.time + extra } : s
            )
        );
    };

    // save/reset timer manually
    const handleSaveReset = () => {
        if (!selected) return;
        setRunning(false);
        const extra = running
            ? Math.floor((Date.now() - startRef.current) / 1000)
            : 0;

        setSubjects((prev) =>
            prev.map((s) =>
                s.id === selected.id ? { ...s, time: s.time + extra } : s
            )
        );
        startRef.current = null;
    };

    //  UI design
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 text-center">
            <div className="flex justify-center items-center gap-2">
                <IoTimerSharp className="text-indigo-600  w-5 h-5" />
                <h2 className="text-lg font-bold bg-gradient-to-r from-red-600 via-yellow-500 to-green-900 bg-clip-text text-transparent">Timer</h2>
            </div>

            {selected ? (
                <>
                    <div className="mb-3 text-sm text-gray-600">
                        Now studying: <span className="font-medium">{selected.name}</span>
                    </div>
                    <div className="text-2xl font-mono mb-4">
                        {formatTime(totalSeconds)}
                    </div>

                    <div className="flex justify-center gap-2">
                        <button
                            onClick={running ? handlePause : handleStart}
                            className={`px-4 py-2 rounded text-white flex items-center gap-2 ${running ? "bg-yellow-500" : "bg-green-600"
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
