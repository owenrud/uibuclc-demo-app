"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // import useRouter

interface FormData {
    nama: string;
    npm: string;
    keterangan: string;
    tanggal: string;
    listening: number;
    structure: number;
    reading: number;
    tipeTest: "Prediction" | "Official";
    jenisTest: "TOEIC" | "TOEFL" | "IELTS";
}

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        nama: "",
        npm: "",
        keterangan: "",
        tanggal: "",
        listening: 0,
        structure: 0,
        reading: 0,
        tipeTest: "Prediction",
        jenisTest: "TOEIC",
    });
const handleReset = () => {
    setFormData({
        nama: "",
        npm: "",
        keterangan: "",
        tanggal: "",
        listening: 0,
        structure: 0,
        reading: 0,
        tipeTest: "Prediction",
        jenisTest: "TOEIC",
    });
};
    // Properly typed handleChange for inputs and selects
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Convert number inputs to number
        const parsedValue = ["listening", "structure", "reading"].includes(name) ? Number(value) : value;

        setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    };

    // Properly typed handleSubmit for form
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const res = await fetch("/api/english-scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  alert(`Data saved! Total Score: ${data.totalScore}`);
   router.push("/score"); // redirect to /score
};

    return (
        <div className="px-8 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* LEFT SIDE */}
                    <div className="space-y-5">
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Nama</label>
                            <input name="nama" value={formData.nama} onChange={handleChange} type="text" className="mt-1 p-3 border rounded-xl" placeholder="Masukkan Nama" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">NPM</label>
                            <input name="npm" value={formData.npm} onChange={handleChange} type="text" className="mt-1 p-3 border rounded-xl" placeholder="Masukkan NPM" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Keterangan Test</label>
                            <input name="keterangan" value={formData.keterangan} onChange={handleChange} type="text" className="mt-1 p-3 border rounded-xl" placeholder="Masukkan Keterangan" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Tanggal Ujian</label>
                            <input name="tanggal" value={formData.tanggal} onChange={handleChange} type="date" className="mt-1 p-3 border rounded-xl" />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-5">
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Nilai Listening</label>
                            <input name="listening" value={formData.listening} onChange={handleChange} type="number" className="mt-1 p-3 border rounded-xl" placeholder="0" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Nilai Structure</label>
                            <input name="structure" value={formData.structure} onChange={handleChange} type="number" className="mt-1 p-3 border rounded-xl" placeholder="0" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Nilai Reading</label>
                            <input name="reading" value={formData.reading} onChange={handleChange} type="number" className="mt-1 p-3 border rounded-xl" placeholder="0" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Tipe Test</label>
                            <select name="tipeTest" value={formData.tipeTest} onChange={handleChange} className="mt-1 p-3 border rounded-xl">
                                <option value="Prediction">Prediction</option>
                                <option value="Official">Official</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700">Jenis Test</label>
                            <select name="jenisTest" value={formData.jenisTest} onChange={handleChange} className="mt-1 p-3 border rounded-xl">
                                <option value="TOEIC">TOEIC</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="IELTS">IELTS</option>
                            </select>
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end space-x-4 mt-10 md:col-span-2">
                        <button type="button" onClick={handleReset} className="px-5 py-2.5 rounded-xl border">
  Cancel
</button>
                        <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
