import Image from "next/image";
import prod1 from "../assets/prod1.png";
import Link from "next/link";
import { Whatsapp } from "iconsax-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <div className="px-4 py-2 overflow-y-auto h-[calc(100vh-150px)]">
        <div className="grid grid-cols-2">
          {[...Array(10)].map((_, i) => (
            <Link
              href="/detail"
              className="bg-white rounded-lg p-4 flex flex-col items-center"
              key={i}
            >
              <Image
                src={prod1}
                alt={`Product ${i + 1}`}
                className="w-full h-auto object-contain"
                width={150}
                height={150}
              />
              <p className="mt-2 text-center font-medium">Product {i + 1}</p>
              <p className="text-sm text-red-500 font-bold">Rp 10.000.000</p>
              <div className="bg-[#8b4513] text-white rounded-xs px-2 py-1 w-full flex flex-row gap-2 justify-center items-center">
                <Whatsapp size="24" color="white" variant="Bulk" />
                <p className="text-[0.7rem]">Hubungi Kami</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-row gap-2 justify-center items-center bg-[#548235] text-white font-bold px-4 py-2">
        <h1>PROPOSAL DAN SURVEY KANDANG</h1>
      </div>
    </>
  );
}
