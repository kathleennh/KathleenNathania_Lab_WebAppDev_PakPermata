"use client";

import { useActionState } from "react";
import Link from "next/link";
import { tambahBuku, type FormBukuState } from "@/app/action";

const initialState: FormBukuState = {
    sukses: false,
    pesan: "",
};

export default function FormTambahBuku() {
    const [state, formAction, pending] = useActionState(tambahBuku, initialState);

    return (
        <form action={formAction} className="max-w-2xl space-y-4 rounded-lg border bg-white p-6 text-gray-900">
            <h1 className="text-2xl font-bold text-gray-900">Tambah buku baru</h1>

            <div>
                <label htmlFor="judul" className="block text-sm font-medium text-gray-900">
                    Judul *
                </label>
                <input
                    id="judul"
                    name="judul"
                    type="text"
                    placeholder="Judul buku"
                    defaultValue={state.values?.judul ?? ""}
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500"
                />
                {state.galat?.judul && (
                    <p className="mt-1 text-xs font-medium text-red-600">{state.galat.judul}</p>
                )}
            </div>

            <div>
                <label htmlFor="penulis" className="block text-sm font-medium">
                    Penulis *
                </label>
                <input
                    id="penulis"
                    name="penulis"
                    type="text"
                    placeholder="Nama penulis"
                    defaultValue={state.values?.penulis ?? ""}
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                />
                {state.galat?.penulis && (
                    <p className="mt-1 text-xs font-medium text-red-600">{state.galat.penulis}</p>
                )}
            </div>

            <div>
                <label htmlFor="kategori" className="block text-sm font-medium">
                    Kategori *
                </label>
                <select
                    id="kategori"
                    name="kategori"
                    defaultValue={state.values?.kategori ?? ""}
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                    <option value="">Pilih kategori</option>
                    <option value="Novel">Novel</option>
                    <option value="Sains">Sains</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Umum">Umum</option>
                </select>
                {state.galat?.kategori && (
                    <p className="mt-1 text-xs font-medium text-red-600">{state.galat.kategori}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="tahunTerbit" className="block text-sm font-medium">
                        Tahun terbit
                    </label>
                    <input
                        id="tahunTerbit"
                        name="tahunTerbit"
                        type="number"
                        placeholder="2005"
                        defaultValue={state.values?.tahunTerbit ?? ""}
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                    {state.galat?.tahunTerbit && (
                        <p className="mt-1 text-xs font-medium text-red-600">{state.galat.tahunTerbit}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="jumlahStok" className="block text-sm font-medium">
                        Jumlah stok *
                    </label>
                    <input
                        id="jumlahStok"
                        name="jumlahStok"
                        type="number"
                        placeholder="5"
                        defaultValue={state.values?.jumlahStok ?? ""}
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                    {state.galat?.jumlahStok && (
                        <p className="mt-1 text-xs font-medium text-red-600">{state.galat.jumlahStok}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="deskripsi" className="block text-sm font-medium">
                    Deskripsi
                </label>
                <textarea
                    id="deskripsi"
                    name="deskripsi"
                    rows={3}
                    placeholder="Deskripsi buku"
                    defaultValue={state.values?.deskripsi ?? ""}
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                />
            </div>

            {state.pesan && !state.sukses && (
                <p className="text-sm font-medium text-red-600">{state.pesan}</p>
            )}

            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/buku"
                    className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={pending}
                    className="rounded bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {pending ? "Menyimpan..." : "Simpan"}
                </button>
            </div>
        </form>
    );
}