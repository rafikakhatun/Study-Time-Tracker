
import React, { useEffect, useState } from "react";
import SubjectList from "./components/SubjectList";
import Timer from "./components/Timer";
import Stats from "./components/Stats";

const STORAGE_KEY = "study_subjects_v1";
const SELECTED_KEY = "study_selected_v1";

export default function App() {
  const [subjects, setSubjects] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(() => {
    try {
      return localStorage.getItem(SELECTED_KEY) || null;
    } catch {
      return null;
    }
  });

  // Save subjects to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    } catch {}
  }, [subjects]);

  // Save selectedId on change
  useEffect(() => {
    try {
      if (selectedId) localStorage.setItem(SELECTED_KEY, selectedId);
      else localStorage.removeItem(SELECTED_KEY);
    } catch {}
  }, [selectedId]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center">Study Time Tracker</h1>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
          <SubjectList
            subjects={subjects}
            setSubjects={setSubjects}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />

          <Timer selectedId={selectedId} subjects={subjects} setSubjects={setSubjects} />

          <Stats subjects={subjects} />
        </main>
      </div>
    </div>
  );
}
