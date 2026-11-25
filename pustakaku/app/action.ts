"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type FormBukuState = {
    sukses: boolean;
    pesan: string;
    galat?: {
        judul?: string;
        penulis?: string;
        kategori?: string;
        tahunTerbit?: string;
        jumlahStok?: string;
    };
    values?: {
        judul: string;
        penulis: string;
        kategori: string;
        tahunTerbit: string;
        jumlahStok: string;
        deskripsi: string;
    };
};

export async function tambahBuku(
    _prev: FormBukuState,
    formData: FormData
): Promise<FormBukuState> {
    const judul = String(formData.get("judul") ?? "").trim();
    const penulis = String(formData.get("penulis") ?? "").trim();
    const kategori = String(formData.get("kategori") ?? "").trim();
    const tahunStr = String(formData.get("tahunTerbit") ?? "").trim();
    const stokStr = String(formData.get("jumlahStok") ?? "").trim();
    const deskripsi = String(formData.get("deskripsi") ?? "").trim();

    const values = {
        judul,
        penulis,
        kategori,
        tahunTerbit: tahunStr,
        jumlahStok: stokStr,
        deskripsi,
    };

    const galat: NonNullable<FormBukuState["galat"]> = {};
    if (!judul) galat.judul = "Judul wajib diisi";
    if (!penulis) galat.penulis = "Penulis wajib diisi";
    if (!kategori) galat.kategori = "Kategori wajib dipilih";

    const stok = Number(stokStr);
    if (!stokStr || !Number.isInteger(stok) || stok < 0) {
        galat.jumlahStok = "Jumlah stok harus angka bulat (>= 0)";
    }

    let tahun: number | null = null;
    if (tahunStr) {
        const parsedTahun = Number(tahunStr);
        if (!Number.isInteger(parsedTahun) || parsedTahun < 1000 || parsedTahun > 2100) {
            galat.tahunTerbit = "Tahun terbit tidak valid";
        } else {
            tahun = parsedTahun;
        }
    }

    if (Object.keys(galat).length > 0) {
        return { sukses: false, pesan: "Periksa kembali isian form.", galat, values };
    }

    let bukuBaru;
    try {
        bukuBaru = await prisma.buku.create({
            data: {
                judul,
                penulis,
                kategori,
                tahunTerbit: tahun,
                deskripsi: deskripsi || null,
                stokTersedia: stok,
                stokTotal: stok,
            },
        });
    } catch {
        return { sukses: false, pesan: "Gagal menyimpan buku ke database.", values };
    }

    revalidatePath("/buku");
    revalidatePath(`/buku/${bukuBaru.id}`);
    redirect("/buku");
}