"use client";
import Image from "next/image";
import Link from "next/link";
import { Whatsapp } from "iconsax-react";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import noicon from "../../public/noicon.jpg"

export default function Home() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [highlightData, setHighlightData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false); // State to control FAQ modal visibility

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/api/getItems");
        setOriginalData(response.data);
        const highlights = response.data.filter(item => item.highlight?.trim().toLowerCase() === "on");
        setHighlightData(highlights);
        setFilteredData(highlights); // Initialize with highlight items
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleFilter = (filteredItems) => {
    setIsFiltered(true);
    setFilteredData(filteredItems);
  };

  const resetFilter = () => {
    setIsFiltered(false);
    setFilteredData(highlightData);
  };

  const faqContent = [
    {
      title: "1. Tentang QurbanTerbaik",
      content: `QurbanTerbaik adalah penyedia informasi dan layanan hewan qurban terpercaya yang bekerja sama dengan berbagai farm pilihan. Setiap hewan qurban yang ditawarkan sudah termasuk pakan, perawatan, dan pengiriman gratis untuk area Jabodetabek.

Kami hadir untuk membantu Anda mendapatkan hewan qurban yang berkualitas, sehat, dan terawat dengan standar terbaik.

Kami berkomitmen menjadi mitra utama Anda dalam menunaikan ibadah qurban dengan tenang dan penuh keberkahan.`
    },
    {
      title: "2. Survey Kandang",
      content: `Bagi Anda yang ingin melakukan survey kandang, harap melakukan konfirmasi terlebih dahulu dengan melengkapi informasi berikut:

- Nama pengunjung
- Tanggal, hari, dan jam kunjungan
- Lokasi kandang
- Nomor HP
- Kebutuhan hewan qurban (jenis, range bobot, dan harga)

Silakan hubungi Ibu Evi di 0812-9746-3380 untuk penjadwalan survey kandang.`
    },
    {
      title: "3. Alur Pemesanan dan Pembayaran",
      content: `- Pemilihan hewan qurban dapat dilakukan melalui katalog online atau kunjungan langsung ke kandang.
- Setelah memilih, Anda dapat melakukan pembayaran DP atau pelunasan. Kuitansi pembayaran akan diberikan sebagai bukti transaksi.`
    },
    {
      title: "4. Pengiriman Hewan Qurban",
      content: `Pengiriman hewan qurban dapat dilakukan sebelum Hari H untuk menghindari kemacetan atau keterlambatan pada Hari Raya Idul Adha.

Shohibul qurban dimohon untuk memberikan informasi lengkap, meliputi:

- Alamat pengiriman
- Tautan lokasi (Maps)
- Nama dan nomor kontak penerima
- Pengiriman dilakukan setelah pelunasan pembayaran diterima.`
    },
    {
      title: "5. Kontak Admin",
      content: `Untuk konsultasi, survey, dan pemesanan hewan qurban, silakan hubungi Ibu Evi melalui WhatsApp di nomor: 0812-9746-3380`
    }
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header 
        data={originalData} 
        setFilteredData={handleFilter} 
        resetFilter={resetFilter}
      />
      <div className="flex-1 px-4 py-2">
        <div className="grid grid-cols-2">
        {filteredData.map((item, index) => (
            <div 
              className="bg-white rounded-lg p-4 flex flex-col items-center"
              key={item.id}
            >
              <Link
                href={`/detail/${item.id}`}
                className="contents"
                passHref
              >
                <Image
                  src={item.linkFoto || noicon}
                  alt={`Product ${item.judul}`}
                  className="w-full h-auto object-contain"
                  width={150}
                  height={150}
                  priority={index < 3}
                />
                <p className="mt-2 text-center font-medium h-[48px] line-clamp-2 overflow-hidden text-ellipsis">
                  {item.judul}
                </p>
                <p className="text-sm text-red-500 font-bold">
                  Rp {item.harga.toLocaleString()}
                </p>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `https://wa.me/6281297463380?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(
                      item.judul
                    )}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="bg-[#8b4513] text-white rounded-xs px-2 py-1 w-full flex flex-row gap-2 justify-center items-center mt-2"
              >
                <Whatsapp size="24" color="white" variant="Bulk" />
                <p className="text-[0.7rem]">Hubungi Kami</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div 
        className="flex flex-row bg-[#ed7d31] m-5 px-5 py-3 items-center justify-center text-white font-bold rounded-lg cursor-pointer"
        onClick={() => setShowFAQ(true)}
      >
        <h1>FAQ</h1>
      </div>

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Frequently Asked Question</h2>
              <button 
                onClick={() => setShowFAQ(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {faqContent.map((faq, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-lg mb-2">{faq.title}</h3>
                  <p className="whitespace-pre-line">{faq.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowFAQ(false)}
                className="w-full bg-[#ed7d31] text-white py-2 rounded-lg font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="sticky bottom-0 left-0 right-0">
        <a
          href={`https://wa.me/6281297463380?text=Halo,%20saya%20tertarik%20dengan%20hewan%20qurban%20yang%20saya%20lihat%20di%20website`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row gap-2 justify-center items-center bg-[#548235] text-white font-bold px-4 py-2"
        >
          <h1>Butuh Bantuan ? Klik WA</h1>
        </a>
      </div>
    </div>
  );
}