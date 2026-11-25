import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function TabelBuku({ cari }: { cari?: string }) {
  const daftarBuku = await prisma.buku.findMany({
    where: cari
      ? {
          OR: [{ judul: { contains: cari } }, { penulis: { contains: cari } }],
        }
      : undefined,
    orderBy: { id: "asc" },
  });

  return (
    <div className="mt-6 overflow-x-auto rounded border bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="border-b bg-gray-50 text-gray-700">
          <tr>
            <th className="px-4 py-3 font-semibold">No</th>
            <th className="px-4 py-3 font-semibold">Judul</th>
            <th className="px-4 py-3 font-semibold">Penulis</th>
            <th className="px-4 py-3 font-semibold">Kategori</th>
            <th className="px-4 py-3 font-semibold">Stok</th>
            <th className="px-4 py-3 font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {daftarBuku.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                Tidak ada data buku yang cocok.
              </td>
            </tr>
          ) : (
            daftarBuku.map((buku, index) => {
              const stokKosong = buku.stokTersedia <= 0;
              return (
                <tr key={buku.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{buku.judul}</td>
                  <td className="px-4 py-3 text-gray-700">{buku.penulis}</td>
                  <td className="px-4 py-3 text-gray-700">{buku.kategori}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        stokKosong
                          ? "rounded bg-red-100 px-2 py-0.5 font-semibold text-red-600"
                          : "font-medium text-gray-900"
                      }
                    >
                      {buku.stokTersedia}/{buku.stokTotal}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/buku/${buku.id}`}
                      className="inline-block rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-100"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default async function DaftarBukuPage({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  const resolvedSearch = await searchParams;
  const kataCari = Array.isArray(resolvedSearch.cari)
    ? resolvedSearch.cari[0]?.trim()
    : resolvedSearch.cari?.trim();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Daftar buku</h1>
        <Link
          href="/buku/baru"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah buku
        </Link>
      </div>

      <form action="/buku" method="get" className="mt-5 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          name="cari"
          defaultValue={kataCari ?? ""}
          placeholder="Cari judul atau penulis"
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Cari
        </button>
      </form>

      <Suspense
        key={kataCari ?? "semua"}
        fallback={<p className="mt-6 text-sm text-gray-500">Memuat daftar buku...</p>}
      >
        <TabelBuku cari={kataCari} />
      </Suspense>
    </div>
  );
}