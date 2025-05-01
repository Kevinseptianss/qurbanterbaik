"use client";
import Image from "next/image";
import prod1 from "../assets/prod1.png";
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
        setOriginalData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <Header data={originalData} setFilteredData={setFilteredData} />
      <div className="px-4 py-2 overflow-y-auto h-[calc(100vh-150px)]">
        <div className="grid grid-cols-2">
          {filteredData.map((item, index) => (
            <Link
              href={`/detail/${item.id}`}
              className="bg-white rounded-lg p-4 flex flex-col items-center"
              key={item.id}
              passHref // Important for proper link behavior
            >
              <div className="contents">
                {" "}
                {/* Added wrapper div */}
                <Image
                  src={item.linkFoto}
                  alt={`Product ${item.judul}`} // Better alt text
                  className="w-full h-auto object-contain"
                  width={150}
                  height={150}
                  priority={index < 3} // Optional: prioritize first few images
                />
                <p className="mt-2 text-center font-medium">{item.judul}</p>
                <p className="text-sm text-red-500 font-bold">
                  Rp {item.harga.toLocaleString()}
                </p>
                <a
                  href={`https://wa.me/628123456789?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(
                    item.judul
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent Link navigation when clicking WhatsApp
                  className="bg-[#8b4513] text-white rounded-xs px-2 py-1 w-full flex flex-row gap-2 justify-center items-center"
                >
                  <Whatsapp size="24" color="white" variant="Bulk" />
                  <p className="text-[0.7rem]">Hubungi Kami</p>
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <a
        href={`https://wa.me/628123456789?text=Halo,%20saya%20tertarik%20dengan%20hewan%20qurban%20yang%20saya%20lihat%20di%20website`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#8b4513] text-white font-bold rounded-lg px-4 py-2 w-full flex flex-row gap-2 justify-center items-center"
      >
        <div className="absolute bottom-0 left-0 right-0 flex flex-row gap-2 justify-center items-center bg-[#548235] text-white font-bold px-4 py-2">
          <h1>PROPOSAL DAN SURVEY KANDANG</h1>
        </div>
      </a>
    </>
  );
}
