"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { getScores, ScoreData } from "@/app/api/english-scores/data"; // your in-memory DB

export default function Home() {

  // ------------------------------
  // DUMMY MANDARIN DATA (HSK / HSKK)
  // ------------------------------
  const mandarinData = [
    { level: "HSK 1", year: 2023, scores: [
        { label: "Below 120", value: 25 }, { label: "120 - 150", value: 40 },
        { label: "150 - 180", value: 20 }, { label: "Above 180", value: 15 }
    ]},
    { level: "HSK 2", year: 2024, scores: [
        { label: "Below 120", value: 20 }, { label: "120 - 150", value: 38 },
        { label: "150 - 180", value: 27 }, { label: "Above 180", value: 15 }
    ]},
    { level: "HSKK Basic", year: 2023, scores: [
        { label: "Low", value: 30 }, { label: "Medium", value: 40 }, { label: "High", value: 30 }
    ]},
    { level: "HSKK Intermediate", year: 2024, scores: [
        { label: "Low", value: 25 }, { label: "Medium", value: 45 }, { label: "High", value: 30 }
    ]},
    // Add more dummy until 20 total
    // ...
  ];

  // ------------------------------
  // STATE — English
  // ------------------------------
const [prodi, setProdi] = useState("Teknik Sipil");
  const [year, setYear] = useState("2023");
  const [engType, setEngType] = useState<ScoreData["englishType"]>("TOEFL");
  const [testType, setTestType] = useState<ScoreData["type"] | "All">("All");

 const englishData = useMemo(() => {
    const allScores = getScores();
    const filtered = allScores.filter(s =>
      s.program === prodi &&
      String(s.year) === year &&
      s.englishType === engType &&
      (testType === "All" ? true : s.type === testType)
    );
    
    const ranges: { label: string; value: number }[] = [];

    if (engType === "TOEFL") {
      ranges.push({ label: "Below 450", value: filtered.filter(s => s.totalScore < 450).length });
      ranges.push({ label: "450 - 500", value: filtered.filter(s => s.totalScore >= 450 && s.totalScore < 500).length });
      ranges.push({ label: "500 - 550", value: filtered.filter(s => s.totalScore >= 500 && s.totalScore < 550).length });
      ranges.push({ label: "Above 550", value: filtered.filter(s => s.totalScore >= 550).length });
    } else if (engType === "TOEIC") {
      ranges.push({ label: "Below 600", value: filtered.filter(s => s.totalScore < 600).length });
      ranges.push({ label: "600 - 700", value: filtered.filter(s => s.totalScore >= 600 && s.totalScore < 700).length });
      ranges.push({ label: "700 - 800", value: filtered.filter(s => s.totalScore >= 700 && s.totalScore < 800).length });
      ranges.push({ label: "Above 800", value: filtered.filter(s => s.totalScore >= 800).length });
    } else if (engType === "IELTS") {
      ranges.push({ label: "Band 4 - 5", value: filtered.filter(s => s.totalScore >= 4 && s.totalScore < 5).length });
      ranges.push({ label: "Band 5 - 6", value: filtered.filter(s => s.totalScore >= 5 && s.totalScore < 6).length });
      ranges.push({ label: "Band 6 - 7", value: filtered.filter(s => s.totalScore >= 6 && s.totalScore < 7).length });
      ranges.push({ label: "Band 7+", value: filtered.filter(s => s.totalScore >= 7).length });
    }

    return ranges;
  }, [prodi, year, engType, testType]);


  // ------------------------------
  // STATE — Mandarin
  // ------------------------------
  const [mandarinLevel, setMandarinLevel] = useState("HSK 1");
  const [mandarinYear, setMandarinYear] = useState("2023");

  const mandarinFiltered = mandarinData.find(
    (d) => d.level === mandarinLevel && String(d.year) === mandarinYear
  );

  const COLORS = ["#B4D9EF", "#041A40", "#FFBF1C", "#22c788"];


  return (
     <div className="p-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

        {/* ENGLISH SECTION */}
        <Card className="p-4 shadow-md">
          <CardContent>
            <h2 className="text-xl font-bold text-center mb-4">English Test Analytics</h2>

            {/* FILTERS */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <Select onValueChange={setProdi} defaultValue={prodi}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teknik Sipil">Teknik Sipil</SelectItem>
                  <SelectItem value="Arsitektur">Arsitektur</SelectItem>
                  <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                  <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                  <SelectItem value="Teknologi Informasi">Teknologi Informasi</SelectItem>
                  <SelectItem value="Manajemen">Manajemen</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setYear} defaultValue={year}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>

             <Select
  onValueChange={(value) => setEngType(value as "TOEFL" | "TOEIC" | "IELTS")}
  defaultValue={engType}
>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="TOEFL">TOEFL</SelectItem>
    <SelectItem value="IELTS">IELTS</SelectItem>
    <SelectItem value="TOEIC">TOEIC</SelectItem>
  </SelectContent>
</Select>


             <Select
  onValueChange={(value) => setTestType(value as "All" | "Official" | "Prediction")}
  defaultValue={testType}
>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="All">All</SelectItem>
    <SelectItem value="Official">Official</SelectItem>
    <SelectItem value="Prediction">Prediction</SelectItem>
  </SelectContent>
</Select>

            </div>

            {/* CHART */}
            <div className="w-full h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={englishData} dataKey="value" nameKey="label" outerRadius={110} label>
                    {englishData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* MANDARIN SECTION */}
        <Card className="p-4 shadow-md">
          <CardContent>
            <h2 className="text-xl font-bold text-center mb-4">Mandarin Analytics</h2>

            {/* FILTERS */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Select onValueChange={setMandarinLevel} defaultValue={mandarinLevel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="HSK 1">HSK 1</SelectItem>
                  <SelectItem value="HSK 2">HSK 2</SelectItem>
                  <SelectItem value="HSK 3">HSK 3</SelectItem>
                  <SelectItem value="HSK 4">HSK 4</SelectItem>
                  <SelectItem value="HSK 5">HSK 5</SelectItem>
                  <SelectItem value="HSK 6">HSK 6</SelectItem>
                  <SelectItem value="HSKK Basic">HSKK Basic</SelectItem>
                  <SelectItem value="HSKK Intermediate">HSKK Intermediate</SelectItem>
                  <SelectItem value="HSKK Advanced">HSKK Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setMandarinYear} defaultValue={mandarinYear}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CHART */}
<div className="w-full h-72">
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={mandarinFiltered?.scores ?? []} // <-- use filtered scores
        dataKey="value"
        nameKey="label"
        outerRadius={110}
        label
      >
        {(mandarinFiltered?.scores ?? []).map((entry, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
