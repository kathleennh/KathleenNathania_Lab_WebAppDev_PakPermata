import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DetailBukuPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const nomorId = Number(id);

    if (!Number.isInteger(nomorId)) {
        notFound();
    }

    const buku = await prisma.buku.findUnique({
        where: { id: nomorId },
    });

    if (!buku) {
        notFound();
    }

    return (
        <div className="space-y-4">
            <Link href="/buku" className="inline-block text-sm text-white-700 underline hover:text-black">
                Kembali ke daftar
            </Link>

            <div className="rounded-lg border bg-white p-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex h-52 items-center justify-center rounded border bg-gray-100 text-sm font-medium text-gray-500">
                        {buku.sampul ? (
                            <img
                                src={buku.sampul}
                                alt={buku.judul}
                                className="h-full w-full rounded object-cover"
                            />
                        ) : (
                            "Sampul"
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <h1 className="text-2xl font-bold text-gray-900">{buku.judul}</h1>
                        <p className="text-sm text-gray-700">Penulis: {buku.penulis}</p>
                        <p className="text-sm text-gray-700">
                            Kategori: {buku.kategori}
                            {buku.tahunTerbit ? ` Tahun: ${buku.tahunTerbit}` : ""}
                        </p>
                        <p
                            className={
                                buku.stokTersedia <= 0
                                    ? "text-sm font-semibold text-red-600"
                                    : "text-sm font-semibold text-gray-900"
                            }
                        >
                            Stok: {buku.stokTersedia} dari {buku.stokTotal} tersedia
                        </p>
                        <p className="pt-2 text-sm text-gray-600">
                            {buku.deskripsi || "Deskripsi singkat buku tampil di sini."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}