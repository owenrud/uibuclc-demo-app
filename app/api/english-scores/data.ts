export type ScoreData = {
  name: string;
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

// Initialize scores directly with dummy data
export let scores: ScoreData[] = [
  // TOEFL (10 Official + 10 Prediction)
  ...Array.from({ length: 20 }, (_, i) => {
    const structure = Math.floor(Math.random() * 30) + 10;
    const listening = Math.floor(Math.random() * 30) + 10;
    const reading = Math.floor(Math.random() * 30) + 10;
    const total = (structure + listening + reading) * 10;

    const type: "Official" | "Prediction" = i < 10 ? "Official" : "Prediction";

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
        "Magister Hukum",
      ][i % 12],
      year: 2023 + (i % 2),
      type,
      englishType: "TOEFL" as "TOEFL",
      structureScore: structure,
      listeningScore: listening,
      readingScore: reading,
      totalScore: total,
      passed: total >= 450,
    };
  }),

  // TOEIC (10 Official + 10 Prediction)
  ...Array.from({ length: 20 }, (_, i) => {
    const listening = Math.floor(Math.random() * 450) + 50;
    const reading = Math.floor(Math.random() * 450) + 50;
    const structure = Math.floor(Math.random() * 100) + 10;
    const total = listening + reading;

    const type: "Official" | "Prediction" = i < 10 ? "Official" : "Prediction";

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
        "Magister Hukum",
      ][i % 12],
      year: 2023 + (i % 2),
      type,
      englishType: "TOEIC" as "TOEIC",
      structureScore: structure,
      listeningScore: listening,
      readingScore: reading,
      totalScore: total,
      passed: total >= 600,
    };
  }),

  // IELTS (10 Official + 10 Prediction)
  ...Array.from({ length: 20 }, (_, i) => {
    const structure = Number((Math.random() * 3 + 4).toFixed(1));
    const listening = Number((Math.random() * 3 + 4).toFixed(1));
    const reading = Number((Math.random() * 3 + 4).toFixed(1));
    const speaking = (listening + reading + structure) / 3;
    const total = Math.round(((listening + reading + structure + speaking) / 4) * 2) / 2;

    const type: "Official" | "Prediction" = i < 10 ? "Official" : "Prediction";

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
        "Magister Hukum",
      ][i % 12],
      year: 2023 + (i % 2),
      type,
      englishType: "IELTS" as "IELTS",
      structureScore: structure,
      listeningScore: listening,
      readingScore: reading,
      totalScore: total,
      passed: total >= 6.0,
    };
  }),
];

// Helper functions
export const getScores = () => scores;
export const addScore = (score: ScoreData) => {
  scores.push(score);
  return score;
};
