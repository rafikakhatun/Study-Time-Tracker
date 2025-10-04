
import React, { useState } from "react";
import { FaBook, FaPlus } from "react-icons/fa";

export default function SubjectList({ subjects, setSubjects, selectedId, setSelectedId }) {
  const [name, setName] = useState("");

  const addSubject = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const id = Date.now().toString() + Math.floor(Math.random() * 1000);
    setSubjects([...subjects, { id, name: trimmed, time: 0 }]);
    setName("");
    setSelectedId(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaBook /> Subjects
        </h2>
      </div>

      <div className="mb-3">
        {subjects.length === 0 ? (
          <p className="text-sm text-gray-500">No subjects yet — add one.</p>
        ) : (
          <ul className="space-y-2">
            {subjects.map((s) => (
              <li
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                  selectedId === s.id ? "bg-indigo-50 border border-indigo-200" : "hover:bg-gray-50"
                }`}
              >
                <span>{s.name}</span>
                <span className="text-xs text-gray-500">{s.time}s</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="New subject name"
        />
        <button
          onClick={addSubject}
          className="bg-indigo-600 text-white px-3 py-2 rounded flex items-center gap-2"
          title="Add subject"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
