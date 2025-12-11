"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type TestData = {
  name: string;
  score: number; // numeric for TOEFL/TOEIC, decimal band for IELTS (e.g. 6.5)
  program: string;
  year: number;
  type: "Official" | "Prediction";
  englishType: "TOEFL" | "TOEIC" | "IELTS";
  passed: boolean;
};

// Dummy data (consistent scoring per englishType)
const dummyData: TestData[] = [
  { name: "User 1", score: 450, program: "Informatics", year: 2023, type: "Official",  englishType: "TOEFL", passed: false },
  { name: "User 2", score: 520, program: "Management", year: 2024, type: "Prediction", englishType: "TOEIC", passed: true },
  { name: "User 3", score: 6.0, program: "Economics", year: 2023, type: "Official",  englishType: "IELTS", passed: true },
  { name: "User 4", score: 480, program: "Informatics", year: 2024, type: "Prediction", englishType: "TOEFL", passed: false },
  { name: "User 5", score: 700, program: "Informatics", year: 2023, type: "Official",  englishType: "TOEIC", passed: true },
  { name: "User 6", score: 6.5, program: "Economics", year: 2024, type: "Prediction", englishType: "IELTS", passed: true },
  { name: "User 7", score: 620, program: "Management", year: 2023, type: "Official",  englishType: "TOEFL", passed: true },
  { name: "User 8", score: 5.5, program: "Informatics", year: 2024, type: "Official",  englishType: "IELTS", passed: false },
  { name: "User 9", score: 570, program: "Management", year: 2023, type: "Prediction", englishType: "TOEIC", passed: true },
  { name: "User 10", score: 680, program: "Economics", year: 2024, type: "Official",  englishType: "TOEFL", passed: true },
  { name: "User 11", score: 500, program: "Informatics", year: 2023, type: "Prediction", englishType: "TOEIC", passed: false },
  { name: "User 12", score: 7.0, program: "Management", year: 2024, type: "Official",  englishType: "IELTS", passed: true },
  { name: "User 13", score: 590, program: "Economics", year: 2023, type: "Prediction", englishType: "TOEFL", passed: false },
  { name: "User 14", score: 7.5, program: "Informatics", year: 2024, type: "Official",  englishType: "IELTS", passed: true },
  { name: "User 15", score: 480, program: "Management", year: 2023, type: "Prediction", englishType: "TOEIC", passed: false },
  { name: "User 16", score: 6.0, program: "Economics", year: 2024, type: "Official",  englishType: "IELTS", passed: true },
  { name: "User 17", score: 610, program: "Informatics", year: 2023, type: "Prediction", englishType: "TOEFL", passed: true },
  { name: "User 18", score: 530, program: "Management", year: 2024, type: "Official",  englishType: "TOEIC", passed: true },
  { name: "User 19", score: 690, program: "Economics", year: 2023, type: "Prediction", englishType: "TOEIC", passed: true },
  { name: "User 20", score: 8.0, program: "Informatics", year: 2024, type: "Official",  englishType: "IELTS", passed: true },
];

const scoreOptions: Record<string, number[]> = {
  TOEFL: [400, 450, 500, 550, 600, 650, 700],
  TOEIC: [300, 400, 500, 600, 700, 800, 900],
  IELTS: [4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
};

export default function Page() {
  const [program, setProgram] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [minScore, setMinScore] = useState<number>(0);
  const [testType, setTestType] = useState<string>("All");
  const [englishType, setEnglishType] = useState<string>("All");

  // Reset minScore when englishType changes or auto-fix if current minScore not valid
  useEffect(() => {
    if (englishType === "All") {
      setMinScore(0);
    } else {
      const opts = scoreOptions[englishType];
      if (!opts.includes(minScore)) {
        setMinScore(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [englishType]);

  // Filtered dataset based on current filters
  const filteredData = useMemo(() => {
    return dummyData.filter(item =>
      (program === "All" || item.program === program) &&
      (year === "All" || item.year.toString() === year) &&
      (englishType === "All" || item.englishType === englishType) &&
      (testType === "All" || item.type === testType) &&
      // numeric comparison: works because IELTS scores are decimals and TOEFL/TOEIC are larger numbers
      (minScore === 0 ? true : item.score >= minScore)
    );
  }, [program, year, minScore, testType, englishType]);

  const passedCount = filteredData.filter(d => d.passed).length;
  const notPassedCount = filteredData.filter(d => !d.passed).length;

  const chartData = {
    labels: ["Passed", "Not Passed"],
    datasets: [
      {
        label: "Total",
        data: [passedCount, notPassedCount],
        backgroundColor: ["rgba(34,197,94,0.8)", "rgba(239,68,68,0.8)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Pass / Not Pass Overview</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {/* Program */}
          <div>
            <label className="font-medium block mb-1">Program Studi</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="Informatics">Informatics</option>
              <option value="Management">Management</option>
              <option value="Economics">Economics</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="font-medium block mb-1">Tahun</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          {/* Minimal Score (dynamic) */}
          <div>
            <label className="font-medium block mb-1">Minimal Score</label>
            {englishType === "All" ? (
              <select disabled className="w-full p-2 border rounded-lg bg-gray-100 text-gray-400">
                <option>Select English Type First</option>
              </select>
            ) : (
              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              >
                <option value={0}>No Minimum</option>
                {scoreOptions[englishType].map((s) => (
                  <option key={String(s)} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tipe Test */}
          <div>
            <label className="font-medium block mb-1">Tipe Test</label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="Official">Official</option>
              <option value="Prediction">Prediction</option>
            </select>
          </div>

          {/* English Test Type */}
          <div>
            <label className="font-medium block mb-1">Jenis Test</label>
            <select
              value={englishType}
              onChange={(e) => {
                setEnglishType(e.target.value);
                setMinScore(0); // reset minScore on change
              }}
              className="w-full p-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="TOEFL">TOEFL</option>
              <option value="TOEIC">TOEIC</option>
              <option value="IELTS">IELTS</option>
            </select>
          </div>
        </div>

        {/* Chart + Table */}
<div className="flex flex-col lg:flex-row gap-6">

  {/* Chart */}
  <div className="lg:w-1/2 w-full">
    <div className="bg-white p-4 rounded-lg shadow-sm w-full">
      <div className="w-full h-[300px]"> 
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }}
        />
      </div>
    </div>
  </div>

  {/* Table */}
<div className="lg:w-1/2 w-full">
  <div className="rounded-xl border bg-white shadow-sm p-4">

    <div className="max-h-[350px] overflow-y-auto">
      <div className="overflow-x-auto max-w-full"> 
        <table className="w-full table-fixed">

          {/* Header */}
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              {["Name", "Score", "Program", "Year", "Type", "English", "Result"].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-gray-500 text-sm"
                >
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((d, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-all"
                >

                  {/* Name */}
                  <td className="px-3 py-2 text-sm font-medium text-gray-800 break-words">
                    <div className="inline-flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                        {d.name.charAt(0)}
                      </div>
                      <span className="break-words max-w-[120px] block">
                        {d.name}
                      </span>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="px-3 py-2 text-sm text-gray-700">
                    {d.score}
                  </td>

                  {/* Program */}
                  <td className="px-3 py-2 text-sm text-gray-700 break-words">
                    {d.program}
                  </td>

                  {/* Year */}
                  <td className="px-3 py-2 text-sm text-gray-700">
                    {d.year}
                  </td>

                  {/* Type */}
                  <td className="px-3 py-2 text-sm text-gray-700">
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs">
                      {d.type}
                    </span>
                  </td>

                  {/* English Type */}
                  <td className="px-3 py-2 text-sm text-gray-700">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                      {d.englishType}
                    </span>
                  </td>

                  {/* Result */}
                  <td className="px-3 py-2 text-sm">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        d.passed
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {d.passed ? "Passed" : "Failed"}
                    </span>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>

  </div>
</div>


</div>


      </div>
    </div>
  );
}
