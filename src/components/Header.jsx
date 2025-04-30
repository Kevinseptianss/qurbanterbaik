'use client'
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";

const DropdownButton = ({ title, options }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-white border-1 border-gray-200 rounded-lg px-4 py-2 text-sm font-medium"
        >
          {title}
          <ArrowDown2
            size="16"
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            color="#ed7d31"
          />
        </button>
  
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md border-1 border-gray-200">
            <ul className="py-1">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  const listKategori = [
    "Sapi Bali (245)",
    "Pegon (16)",
    "Limosin (45)",
    "Simental (34)",
    "PO (4)",
    "Brangus (5)",
    "Domba (20)",
    "Kambing (65)",
  ];

const Header = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center py-2 border-1 border-gray-200">
        <h1 className="text-3xl font-bold">Qurbanterbaik.com</h1>
        <p className="text-center">
          Hewan Qurban RAWATAN Terbaik, Harga NEGO Termurah, Terpercaya:
          0812-9746-3380 | Ibu Evi
        </p>

        <div className="flex flex-col gap-2 w-full px-4">
          <DropdownButton
            title="Semua kandang"
            options={["Kandang A", "Kandang B", "Kandang C"]}
          />
          <DropdownButton
            title="Range Harga & bobot"
            options={["Rp 10-15 juta", "Rp 15-20 juta", "Rp 20-25 juta"]}
          />
          <DropdownButton
            title="Jenis Hewan"
            options={["Sapi", "Kambing", "Domba"]}
          />
        </div>

        <p className="mx-4">
          Kategori:{" "}
          {listKategori.map((kategori, index) => (
            <span key={index}>
              <span className="underline">{kategori}</span>
              {index !== listKategori.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
  )
}

export default Header