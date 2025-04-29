import Image from "next/image";
import prod1 from "../assets/prod1.png";
import Link from "next/link";
import { Whatsapp } from "iconsax-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center py-2 bg-[#FFDEAD] drop-shadow-xl">
        <h1 className="text-3xl font-bold">Qurbanterbaik</h1>
        <div className="flex flex-row items-center justify-center w-full px-5">
          <input
            className="bg-white rounded-lg px-3 py-1 flex-1"
            placeholder="Cari sapi di sini"
          />
          <button className="bg-amber-500 text-white rounded-lg px-3 py-1 ml-2">
            Cari
          </button>
        </div>
      </div>

      {/* Products grid container with vertical scrolling */}
      <div className="px-4 py-2 overflow-y-auto h-[calc(100vh-150px)]">
        {/* Grid with exactly 2 columns and auto rows */}
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
              <p className="text-sm text-gray-500">Rp 10.000.000</p>
              <div className="bg-amber-500 text-white rounded-lg px-2 py-1 w-full flex flex-row gap-2 justify-center items-center">
                <Whatsapp size="24" color="white" variant="Bulk" />
                <p className="text-[0.7rem]">Hubungi Kami</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
