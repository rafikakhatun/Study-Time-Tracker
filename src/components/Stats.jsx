
import React from "react";
import { FaChartPie } from "react-icons/fa";
import { formatTime } from "../utils/formatTime";

export default function Stats({ subjects }) {
  const total = subjects.reduce((sum, s) => sum + s.time, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaChartPie /> Stats
        </h2>
      </div>

      <div>
        {subjects.length === 0 ? (
          <p className="text-sm text-gray-500">No data yet.</p>
        ) : (
          <ul className="space-y-2">
            {subjects.map((s) => (
              <li key={s.id} className="flex justify-between">
                <span>{s.name}</span>
                <span className="font-mono">{formatTime(s.time)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="my-3" />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="font-mono">{formatTime(total)}</span>
      </div>
    </div>
  );
}
