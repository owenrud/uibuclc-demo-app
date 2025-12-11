"use client";
import { ScoreData } from "@/app/api/english-scores/data"; // your in-memory DB types

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

  const [scores, setScores] = useState<ScoreData[]>([]); // replace dummyData

  // Fetch data from API on mount
  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("/api/english-scores");
      const data = await res.json();
      setScores(data);
    };

    fetchScores();
  }, []);

  // Reset minScore when englishType changes
  useEffect(() => {
    if (englishType === "All") {
      setMinScore(0);
    } else {
      const opts = scoreOptions[englishType];
      if (!opts.includes(minScore)) setMinScore(0);
    }
  }, [englishType]);

  // Filtered dataset based on current filters
  const filteredData = useMemo(() => {
    return scores.filter(item =>
      (program === "All" || item.program === program) &&
      (year === "All" || item.year.toString() === year) &&
      (englishType === "All" || item.englishType === englishType) &&
      (testType === "All" || item.type === testType) &&
      (minScore === 0 ? true : item.totalScore >= minScore)
    );
  }, [scores, program, year, minScore, testType, englishType]);

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
        <h2 className="text-2xl font-semibold mb-4">Scores Analytics</h2>

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
              <option value="All">Semua Program Studi</option>
    <option value="Teknik Sipil">Teknik Sipil</option>
    <option value="Arsitektur">Arsitektur</option>
    <option value="Teknik Elektro">Teknik Elektro</option>
    <option value="Sistem Informasi">Sistem Informasi</option>
    <option value="Teknologi Informasi">Teknologi Informasi</option>
    <option value="Manajemen">Manajemen</option>
    <option value="Akuntansi">Akuntansi</option>
    <option value="Pariwisata">Pariwisata</option>
    <option value="Ilmu Hukum">Ilmu Hukum</option>
    <option value="Pendidikan Bahasa Inggris">Pendidikan Bahasa Inggris</option>
    <option value="Magister Manajemen">Magister Manajemen</option>
    <option value="Magister Hukum">Magister Hukum</option>
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
              <option value="2025">2025</option>
              <option value="2026">2026</option>
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
      <div className="w-full overflow-x-auto">
  <table className="min-w-full table-auto border-collapse">
    <thead className="bg-gray-200">
      <tr>
        <th className="p-2 w-1/4 text-left">Name</th>
        <th className="p-2 w-1/4 text-left">Type</th>
        <th className="p-2 w-1/4 text-left">Test Type</th>
        <th className="p-2 w-1/4 text-left">Structure Score</th>
        <th className="p-2 w-1/4 text-left">Listening Score</th>
        <th className="p-2 w-1/4 text-left">Reading Score</th>
        <th className="p-2 w-1/4 text-left">Total Score</th>
        <th className="p-2 w-1/4 text-left">Status</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.map((row, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
          <td className="p-2">{row.name}</td>
          <td className="p-2">{row.englishType}</td>
          <td className="p-2">{row.type}</td>
          <td className="p-2">{row.structureScore}</td>
          <td className="p-2">{row.listeningScore}</td>
          <td className="p-2">{row.readingScore}</td>
          <td className="p-2">{row.totalScore}</td>
          <td className="p-2 font-semibold">
            {row.passed === true ? (
              <span className="text-green-600">Passed</span>
            ) : (
              <span className="text-red-600">Failed</span>
            )}
          </td>
        </tr>
      ))}
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
