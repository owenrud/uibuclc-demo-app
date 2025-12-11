import Link from "next/link"

const Page = () => {
    return (
        <div className="p-8">
    <div className="bg-white shadow-lg rounded-2xl p-8">

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* --- LEFT SIDE --- */}
            <div className="space-y-5">

                {/* Nama */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Nama</label>
                    <input 
                        type="text"
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="Masukkan Nama"
                    />
                </div>

                {/* NPM */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">NPM</label>
                    <input 
                        type="text"
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="Masukkan NPM"
                    />
                </div>

                {/* Keterangan Test */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Keterangan Test</label>
                    <input 
                        type="text"
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="Masukkan Keterangan"
                    />
                </div>

                {/* Tanggal Ujian */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Tanggal Ujian</label>
                    <input 
                        type="date"
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    />
                </div>

            </div>


            {/* --- RIGHT SIDE --- */}
            <div className="space-y-5">

                {/* Nilai Listening */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Nilai Listening</label>
                    <input 
                        type="number"
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="0"
                    />
                </div>

                {/* Nilai Structure */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Nilai Structure</label>
                    <input 
                        type="number"
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="0"
                    />
                </div>

                {/* Nilai Reading */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Nilai Reading</label>
                    <input 
                        type="number"
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="0"
                    />
                </div>

                {/* Dropdown Tipe Test */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Tipe Test</label>
                    <select 
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    >
                        <option value="Prediction">Prediction</option>
                        <option value="Official">Official</option>
                    </select>
                </div>

                {/* Dropdown Jenis Test */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Jenis Test</label>
                    <select 
                        className="mt-1 p-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    >
                        <option value="TOEIC">TOEIC</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="IELTS">IELTS</option>
                    </select>
                </div>

            </div>
        </form>

        {/* BUTTONS */}
        <div className="flex justify-end space-x-4 mt-10">
            <button 
                type="button"
                className="px-5 py-2.5 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
                Cancel
            </button>

            <button 
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition"
            >
                Save
            </button>
        </div>

    </div>
</div>

    )
}
export default Page