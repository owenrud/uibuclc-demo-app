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

  structureScore: number;
  listeningScore: number;
  readingScore: number;
  totalScore: number;

  program: string;
  year: number;
  type: "Official" | "Prediction";
  testType: "HSK" | "HSKK";
  passed: boolean;
};

// Score options for Mandarin tests
const scoreOptions: Record<string, number[]> = {
  HSK: [180, 200, 220, 240, 260, 280, 300],
  HSKK: [60, 70, 80, 90, 100, 110, 120],
};

// Dummy data for Mandarin test takers
const dummyData = [
  // HSK (20 users)
  ...Array.from({ length: 20 }, (_, i) => {
    const structure = Math.floor(Math.random() * 100) + 50;
    const listening = Math.floor(Math.random() * 100) + 50;
    const reading = Math.floor(Math.random() * 100) + 50;
    const total = structure + listening + reading;

    return {
      name: `HSK User ${i + 1}`,
      program: ["Informatics", "Management", "Economics"][i % 3],
      year: 2023 + (i % 2),
      type: "Official",
      testType: "HSK",
      structureScore: structure,
      listeningScore: listening,
      readingScore: reading,
      totalScore: total,
      passed: total >= 180,
    };
  }),

  // HSKK (20 users)
  ...Array.from({ length: 20 }, (_, i) => {
    const speaking = Math.floor(Math.random() * 60) + 60; // 60-120

    return {
      name: `HSKK User ${i + 1}`,
     program: [
  "Teknik Sipil",
  "Arsitektur",
  "Teknik Elektro",
  "Sistem Informasi",
  "Teknologi Informasi",
  "Manajemen",
  "Akuntansi",
  "Pariwisata",
  "Ilmu Hukum",
  "Pendidikan Bahasa Inggris",
  "Magister Manajemen",
  "Magister Hukum"
][i % 12],
      year: 2023 + (i % 2),
      type: "Official",
      testType: "HSKK",
      structureScore: 0,
      listeningScore: 0,
      readingScore: 0,
      totalScore: speaking,
      passed: speaking >= 60,
    };
  }),
];

export default function Page() {
  const [program, setProgram] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [minScore, setMinScore] = useState<number>(0);
  const [testType, setTestType] = useState<string>("All");

  // Reset minScore when testType changes
  useEffect(() => {
    if (testType === "All") {
      setMinScore(0);
    } else {
      const opts = scoreOptions[testType as "HSK" | "HSKK"];
      if (!opts.includes(minScore)) {
        setMinScore(0);
      }
    }
  }, [testType, minScore]);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return dummyData.filter(
      (item) =>
        (program === "All" || item.program === program) &&
        (year === "All" || item.year.toString() === year) &&
        (testType === "All" || item.testType === testType) &&
        (minScore === 0 ? true : item.totalScore >= minScore)
    );
  }, [program, year, minScore, testType]);

  const passedCount = filteredData.filter((d) => d.passed).length;
  const notPassedCount = filteredData.filter((d) => !d.passed).length;

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
            </select>
          </div>

          {/* Minimal Score */}
          <div>
            <label className="font-medium block mb-1">Minimal Score</label>
            {testType === "All" ? (
              <select disabled className="w-full p-2 border rounded-lg bg-gray-100 text-gray-400">
                <option>Select Test Type First</option>
              </select>
            ) : (
              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              >
                <option value={0}>No Minimum</option>
                {scoreOptions[testType as "HSK" | "HSKK"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Test Type */}
          <div>
            <label className="font-medium block mb-1">Tipe Test</label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="HSK">HSK</option>
              <option value="HSKK">HSKK</option>
            </select>
          </div>

          <div></div> {/* empty for spacing */}
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
                    scales: { y: { beginAtZero: true } },
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
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Test Type</th>
                        <th className="p-2 text-left">Type</th>
                        <th className="p-2 text-left">Structure Score</th>
                        <th className="p-2 text-left">Listening Score</th>
                        <th className="p-2 text-left">Reading Score</th>
                        <th className="p-2 text-left">Total Score</th>
                        <th className="p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-2">{row.name}</td>
                          <td className="p-2">{row.testType}</td>
                          <td className="p-2">{row.type}</td>
                          <td className="p-2">{row.structureScore}</td>
                          <td className="p-2">{row.listeningScore}</td>
                          <td className="p-2">{row.readingScore}</td>
                          <td className="p-2">{row.totalScore}</td>
                          <td className="p-2 font-semibold">
                            {row.passed ? (
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
