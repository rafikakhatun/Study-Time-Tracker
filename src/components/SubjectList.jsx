
import React, { useState } from "react";
import { FaBook, FaPlus, FaTrash } from "react-icons/fa";
import { formatTime } from "../utils/formatTime";

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

  const deleteSubject = (id) => {
    const ok = window.confirm("Are you sure you want to delete this subject and its data?");
    if (!ok) return;
    setSubjects(subjects.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="bg-white border border-gray-200  rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaBook className="text-indigo-600" /> <span className="text-xl font-bold text-center bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent ">Subjects</span>
        </h2>
      </div>

      <div className="mb-3">
        {subjects.length === 0 ? (
          <p className="text-sm text-gray-500 border border-gray-200 shadow rounded-md  px-4 py-2 ">No subjects yet — add one.</p>
        ) : (
          <ul className="space-y-2">
            {subjects.map((s) => (
              <li
                key={s.id}
                className={`p-2 rounded flex justify-between items-center ${
                  selectedId === s.id ? "bg-indigo-50 border border-indigo-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedId(s.id)}>
                  <span>{s.name}</span>
                  <span className="text-xs text-gray-500">{formatTime(s.time)}</span>
                </div>

                <button
                  onClick={() => deleteSubject(s.id)}
                  className="text-red-500 p-1 rounded hover:bg-red-50"
                  title="Delete subject"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-indigo-600 p-2 rounded"
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
