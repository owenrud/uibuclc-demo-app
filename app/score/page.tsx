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

  // NEW SCORE STRUCTURE
  structureScore: number;
  listeningScore: number;
  readingScore: number;
  totalScore: number;

  program: string;
  year: number;
  type: "Official" | "Prediction";
  englishType: "TOEFL" | "TOEIC" | "IELTS";
  passed: boolean;
};


// Dummy data (consistent scoring per englishType)
const dummyData = [
  // -------------------------
  //        TOEFL (20)
  // -------------------------
  ...Array.from({ length: 20 }, (_, i) => {
    const structure = Math.floor(Math.random() * 30) + 10;
    const listening = Math.floor(Math.random() * 30) + 10;
    const reading = Math.floor(Math.random() * 30) + 10;
    const total = (structure + listening + reading) *10;

    return {
      name: `TOEFL User ${i + 1}`,
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
      englishType: "TOEFL",
      structureScore: structure,
      listeningScore: listening,
      readingScore: reading,
      totalScore: total,
      passed: total >= 450
    };
  }),

  // -------------------------
  //        TOEIC (20)
  // -------------------------
  ...Array.from({ length: 20 }, (_, i) => {
    const listening = Math.floor(Math.random() * 450) + 50;
    const reading = Math.floor(Math.random() * 450) + 50;
    const structure = Math.floor(Math.random() * 100) + 10;
    const total = listening + reading;

    return {
      name: `TOEIC User ${i + 1}`,
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
      englishType: "TOEIC",
      structureScore: structure,
      listeningScore: listening,
      readingScore: reading,
      totalScore: total,
      passed: total >= 600
    };
  }),

  // -------------------------
  //        IELTS (20)
  // -------------------------
  ...Array.from({ length: 20 }, (_, i) => {
    const structure = Number((Math.random() * 3 + 4).toFixed(1)); // 4.0 - 7.0
    const listening = Number((Math.random() * 3 + 4).toFixed(1));
    const reading = Number((Math.random() * 3 + 4).toFixed(1));

    const total = calculateIELTSBand(listening, reading, structure);

    return {
      name: `IELTS User ${i + 1}`,
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
      englishType: "IELTS",
      structureScore: structure,
      listeningScore: listening,
      readingScore: reading,
      totalScore: total,
      passed: total >= 6.0
    };
  })
];



const scoreOptions: Record<string, number[]> = {
  TOEFL: [400, 450, 500, 550, 600, 650, 700],
  TOEIC: [300, 400, 500, 600, 700, 800, 900],
  IELTS: [4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
};
function calculateIELTSBand(listening: number, reading: number, structure: number) {
  // estimate speaking score because you don't have the 4th component
  const speaking = (listening + reading + structure) / 3;

  // compute IELTS band
  const average = (listening + reading + structure + speaking) / 4;

  return Math.round(average * 2) / 2; 
}

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
      (minScore === 0 ? true : item.totalScore >= minScore)
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
