"use client";
import Image from "next/image";
import Link from "next/link";
import { Whatsapp } from "iconsax-react";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/api/getItems");
        const highlightedItems = response.data.filter(
          (item) => item.highlight === "on"
        );
        setOriginalData(highlightedItems);
        setFilteredData(highlightedItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header data={originalData} setFilteredData={setFilteredData} />
      <div className="flex-1 px-4 py-2">
        <div className="grid grid-cols-2">
          {filteredData.map((item, index) => (
            <Link
              href={`/detail/${item.id}`}
              className="bg-white rounded-lg p-4 flex flex-col items-center"
              key={item.id}
              passHref
            >
              <div className="contents">
                <Image
                  src={item.linkFoto}
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(
                      `https://wa.me/628123456789?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(
                        item.judul
                      )}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="bg-[#8b4513] text-white rounded-xs px-2 py-1 w-full flex flex-row gap-2 justify-center items-center"
                >
                  <Whatsapp size="24" color="white" variant="Bulk" />
                  <p className="text-[0.7rem]">Hubungi Kami</p>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

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
