import { NextRequest, NextResponse } from "next/server";
import { getScores,ScoreData, addScore } from "./data"; // your in-memory DB

export async function GET() {
  return NextResponse.json(getScores());
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Convert form data to ScoreData
  const { nama, npm, keterangan, tanggal, listening, structure, reading, tipeTest, jenisTest } = body;

  let totalScore: number;

  // Calculate totalScore differently per test type
  if (jenisTest === "TOEFL") {
    totalScore = ((listening + structure + reading)/3) * 10;
  } else if (jenisTest === "TOEIC") {
    totalScore = listening + reading;
  } else if (jenisTest === "IELTS") {
    const speaking = (listening + reading + structure) / 3;
    totalScore = Math.round(((listening + reading + structure + speaking) / 4) * 2) / 2;
  } else {
    totalScore = listening + structure + reading;
  }

  const passed =
    (jenisTest === "TOEFL" && totalScore >= 450) ||
    (jenisTest === "TOEIC" && totalScore >= 600) ||
    (jenisTest === "IELTS" && totalScore >= 6.0);

  const newScore: ScoreData = {
    name: nama,
    program: keterangan, // or another field if you have program
    year: new Date(tanggal).getFullYear(),
    type: tipeTest,
    englishType: jenisTest,
    structureScore: structure,
    listeningScore: listening,
    readingScore: reading,
    totalScore,
    passed,
  };

  addScore(newScore);

  return NextResponse.json(newScore);
}
