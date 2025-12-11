"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function Home() {
  // ------------------------------
  // DUMMY ENGLISH DATA (20 entries)
  // ------------------------------
  const englishData = [
    { prodi: "Computer Science", year: 2023, type: "TOEFL", scores: [
        { label: "Below 450", value: 20 }, { label: "450 - 500", value: 35 },
        { label: "500 - 550", value: 25 }, { label: "Above 550", value: 10 }
    ]},
    { prodi: "Computer Science", year: 2024, type: "TOEFL", scores: [
        { label: "Below 450", value: 12 }, { label: "450 - 500", value: 32 },
        { label: "500 - 550", value: 40 }, { label: "Above 550", value: 16 }
    ]},
    { prodi: "Computer Science", year: 2023, type: "IELTS", scores: [
        { label: "Band 4 - 5", value: 22 }, { label: "Band 5 - 6", value: 30 },
        { label: "Band 6 - 7", value: 33 }, { label: "Band 7+", value: 15 }
    ]},
    { prodi: "Computer Science", year: 2024, type: "IELTS", scores: [
        { label: "Band 4 - 5", value: 18 }, { label: "Band 5 - 6", value: 28 },
        { label: "Band 6 - 7", value: 40 }, { label: "Band 7+", value: 14 }
    ]},
    // Add 16 more combinations with other majors
    // ...
  ];

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
  const [prodi, setProdi] = useState("Computer Science");
  const [year, setYear] = useState("2023");
  const [engType, setEngType] = useState("TOEFL");

  const englishFiltered = englishData.find(
    (d) => d.prodi === prodi && String(d.year) === year && d.type === engType
  );

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

      {/* SIDE BY SIDE WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

        {/* ENGLISH SECTION */}
        <Card className="p-4 shadow-md">
          <CardContent>
            <h2 className="text-xl font-bold text-center mb-4">English Test Analytics</h2>

            {/* FILTER ROW */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Select onValueChange={setProdi} defaultValue={prodi}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Systems">Information Systems</SelectItem>
                  <SelectItem value="Business Administration">Business Administration</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setYear} defaultValue={year}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setEngType} defaultValue={engType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="TOEFL">TOEFL</SelectItem>
                  <SelectItem value="IELTS">IELTS</SelectItem>
                  <SelectItem value="TOEIC">TOEIC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CHART */}
            <div className="w-full h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={(englishFiltered?.scores ?? [])}
                       dataKey="value"
                       nameKey="label"
                       outerRadius={110}
                       label>
                    {(englishFiltered?.scores ?? []).map((entry, i) => (
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
            <h2 className="text-xl font-bold text-center mb-4">Mandarin (HSK / HSKK) Analytics</h2>

            {/* FILTER ROW */}
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
                    data={(mandarinFiltered?.scores ?? [])}
                    dataKey="value"
                    nameKey="label"
                    outerRadius={110}
                    label>
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
