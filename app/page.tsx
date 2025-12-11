"use client"
import Image from "next/image";
import NavbarComponent from "./Components/Navigation";
import TopBar from "./Components/Topbar";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";
import { PieChart, Pie,Cell, Tooltip, ResponsiveContainer } from "recharts";
export default function Home() {
  // Dummy JSON data
const dummyData = [
{
prodi: "Computer Science",
year: 2023,
type: "TOEFL",
scores: [
{ label: "Below 450", value: 20 },
{ label: "450 - 500", value: 35 },
{ label: "500 - 550", value: 25 },
{ label: "Above 550", value: 10 }
]
},
{
prodi: "Information Systems",
year: 2024,
type: "IELTS",
scores: [
{ label: "Band 4 - 5", value: 30 },
{ label: "Band 5 - 6", value: 40 },
{ label: "Band 6 - 7", value: 20 },
{ label: "Band 7+", value: 10 }
]
},
{
prodi: "Business Administration",
year: 2023,
type: "TOEFL",
scores: [
{ label: "Below 450", value: 15 },
{ label: "450 - 500", value: 45 },
{ label: "500 - 550", value: 30 },
{ label: "Above 550", value: 10 }
]
},
{
prodi: "Computer Science",
year: 2024,
type: "IELTS",
scores: [
{ label: "Band 4 - 5", value: 25 },
{ label: "Band 5 - 6", value: 30 },
{ label: "Band 6 - 7", value: 35 },
{ label: "Band 7+", value: 10 }
]
}
];
const [selectedProdi, setSelectedProdi] = useState("Computer Science");
const [selectedYear, setSelectedYear] = useState(2023);
const [selectedType, setSelectedType] = useState("TOEFL");
const COLORS = ["#B4D9EF", "#041A40", "#FFBF1C", "#22c788ff"];


const filtered = dummyData.find(
(d) => d.prodi === selectedProdi && d.year === selectedYear && d.type === selectedType
);
  return (
   <>
    <div className="w-full h-screen p-4">
      <div className="w-full p-6 grid gap-6">
{/* Filters */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<Select onValueChange={setSelectedProdi} defaultValue={selectedProdi}>
<SelectTrigger>
<SelectValue placeholder="Select Major" />
</SelectTrigger>
<SelectContent>
<SelectItem value="Computer Science">Computer Science</SelectItem>
<SelectItem value="Information Systems">Information Systems</SelectItem>
<SelectItem value="Business Administration">Business Administration</SelectItem>
</SelectContent>
</Select>


<Select onValueChange={(v) => setSelectedYear(Number(v))} defaultValue={String(selectedYear)}>
<SelectTrigger>
<SelectValue placeholder="Select Year" />
</SelectTrigger>
<SelectContent>
<SelectItem value="2023">2023</SelectItem>
<SelectItem value="2024">2024</SelectItem>
</SelectContent>
</Select>


<Select onValueChange={setSelectedType} defaultValue={selectedType}>
<SelectTrigger>
<SelectValue placeholder="Test Type" />
</SelectTrigger>
<SelectContent>
<SelectItem value="TOEFL">TOEFL</SelectItem>
<SelectItem value="IELTS">IELTS</SelectItem>
</SelectContent>
</Select>
</div>


{/* Chart Card */}
<Card className="p-4 shadow-md">
<CardContent>
<h2 className="text-xl font-semibold text-center mb-4">English Test Score Distribution</h2>


<div className="w-full h-80">
<ResponsiveContainer>
<PieChart>
<Pie
data={filtered?.scores || []}
dataKey="value"
nameKey="label"
cx="50%"
cy="50%"
outerRadius={120}
label
>
{(filtered?.scores || []).map((entry, index) => (
<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
   </>
  );
}
