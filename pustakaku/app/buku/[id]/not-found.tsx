import Link from "next/link";

export default function BukuTidakDitemukan() {
    return (
        <div className="rounded border bg-white p-6">
            <h1 className="text-xl font-bold text-gray-900">Buku tidak ditemukan</h1>
            <p className="mt-2 text-sm text-gray-600">
                ID buku tidak valid atau data buku tidak tersedia di database.
            </p>
            <Link href="/buku" className="mt-4 inline-block text-sm font-medium text-blue-600 underline">
                Kembali ke daftar
            </Link>
        </div>
    );
}