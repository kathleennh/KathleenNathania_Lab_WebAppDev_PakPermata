import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dataAwal = [
    {
        judul: "Laskar Pelangi",
        penulis: "A. Hirata",
        kategori: "Novel",
        tahunTerbit: 2005,
        deskripsi: "Kisah perjuangan anak-anak Belitung mengejar mimpi dan pendidikan.",
        stokTersedia: 3,
        stokTotal: 5,
    },
    {
        judul: "Bumi Manusia",
        penulis: "P. A. Toer",
        kategori: "Novel",
        tahunTerbit: 1980,
        deskripsi: "Novel sejarah tentang pergerakan dan kehidupan di era kolonial.",
        stokTersedia: 0,
        stokTotal: 2,
    },
    {
        judul: "Fisika Dasar",
        penulis: "Halliday",
        kategori: "Sains",
        tahunTerbit: 2010,
        deskripsi: "Buku referensi konsep dasar mekanika, gelombang, dan listrik magnet.",
        stokTersedia: 2,
        stokTotal: 2,
    },
];

async function main() {
    for (const buku of dataAwal) {
        const sudahAda = await prisma.buku.findFirst({
            where: { judul: buku.judul, penulis: buku.penulis },
        });
        if (!sudahAda) {
            await prisma.buku.create({ data: buku });
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });