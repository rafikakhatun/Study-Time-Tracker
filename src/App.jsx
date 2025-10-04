
import React, { useState } from "react";
import SubjectList from "./components/SubjectList";
import Timer from "./components/Timer";
import Stats from "./components/Stats";

export default function App() {
  // subjects: { id, name, time } — time in seconds
  const [subjects, setSubjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center">Study Time Tracker</h1>
          <p className="text-center text-sm text-gray-500 mt-1">
            Build step-by-step — components will be added next.
          </p>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
          {/* Left column: SubjectList */}
          <div>
            <SubjectList
              subjects={subjects}
              setSubjects={setSubjects}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>

          {/* Middle: Timer */}
          <div>
            <Timer
              selectedId={selectedId}
              subjects={subjects}
              setSubjects={setSubjects}
            />
          </div>

          {/* Right: Stats placeholder */}
          <div>
            <Stats subjects={subjects} />
          </div>
        </main>
      </div>
    </div>
  );
}
