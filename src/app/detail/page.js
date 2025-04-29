import Image from "next/image";
import prod1 from "../../assets/prod1.png";
import { Location, Whatsapp } from "iconsax-react";
import Link from "next/link";

export default function Detail() {
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center py-2 bg-[#FFDEAD] drop-shadow-xl">
        <Link href="/" passHref>
          <h1 className="text-3xl font-bold cursor-pointer hover:text-orange-600 transition-colors">
            Qurbanterbaik
          </h1>
        </Link>
        <div className="flex flex-row items-center justify-center w-full px-5">
          <input
            className="bg-white rounded-lg px-3 py-1 flex-1"
            placeholder="Cari sapi di sini"
          />
          <button className="bg-orange-500 text-white rounded-lg px-3 py-1 ml-2">
            Cari
          </button>
        </div>
      </div>

      {/* Products grid container with vertical scrolling */}
      <div className="flex flex-col gap-4 px-4 py-2 overflow-y-auto h-[calc(100vh-150px)]">
        {/* Grid with exactly 2 columns and auto rows */}
        <Image
          src={prod1}
          alt="Product 1"
          className="w-full h-auto object-contain"
          width={150}
          height={150}
        />
        <h1 className="text-2xl font-bold">
          Sapi Simental Moncong NQ076 Target Bobot 625 Kg{" "}
        </h1>
        <h1 className="text-2xl font-bold text-red-500">Rp 44.500.000 </h1>
        <div className="flex flex-row gap-2">
          <div className="border-1 border-green-200 bg-green-200 rounded-lg px-4 py-2">
            <p className="text-green-600">Ready</p>
          </div>
          <div className="border-1 border-yellow-200 bg-yellow-200 rounded-lg px-4 py-2">
            <p className="text-yellow-600">20 Jutaan</p>
          </div>
          <div className="border-1 border-blue-200 bg-blue-200 rounded-lg px-4 py-2">
            <p className="text-blue-600">600-700 Kg</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 justify-center items-center border-1 border-orange-200 bg-orange-200 rounded-lg px-4 py-2">
            <Location size="32" color="#f97316" variant="Bulk" />
            <p className="text-orange-500">Nusa Farm Tajurhalang</p>
          </div>
        </div>

        <p className="font-bold">Detail Informasi</p>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <p>Jenis Sapi : </p>
            <p>Simental Moncong</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>Kode : </p>
            <p>A01</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>Bobot : </p>
            <p>625 Kg</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>Lokasi : </p>
            <p>Jakarta</p>
          </div>
          <div className="flex flex-col">
            <p>Deskripsi : </p>
            <p>
              Garansi jika sakit/mati/cacat Harga pasti lebih murah Free ongkir
              Jabodetabek, free biaya perawatan dan sertifikat Berhadiah Umroh
              Garansi bobot timbang real Hewan Qurban rawatan lebih berkualitas,
              layak dan sehat
            </p>
          </div>
        </div>
        <div className="bg-amber-500 text-amber-200 rounded-lg px-4 py-2 w-full flex flex-row gap-2 justify-center items-center">
          <Whatsapp size="32" color="#fde68a" variant="Bulk" />
          <p>Hubungi Kami</p>
        </div>
      </div>
    </>
  );
}
