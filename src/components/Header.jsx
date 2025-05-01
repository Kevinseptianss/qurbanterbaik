"use client";
import { ArrowDown2 } from "iconsax-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const DropdownButton = ({ title, options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white border-1 border-gray-200 rounded-lg px-4 py-2 text-sm font-medium"
      >
        {selected?.label || title}
        <ArrowDown2
          size="16"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          color="#ed7d31"
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md border-1 border-gray-200">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Header = ({ onFilterChange, data, setFilteredData }) => {
  const [filters, setFilters] = useState({
    kandang: null,
    range: null,
    jenis: null,
  });

  // Apply filters whenever filters or original data changes
  useEffect(() => {
    if (!data) return;

    let filtered = [...data];

    if (filters.kandang) {
      filtered = filtered.filter(
        (item) => item.kandang === filters.kandang.value
      );
    }

    if (filters.range) {
      filtered = filtered.filter(
        (item) => item.rangeBobotHarga === filters.range.value
      );
    }

    if (filters.jenis) {
      filtered = filtered.filter((item) => item.jenis === filters.jenis.value);
    }

    setFilteredData(filtered);
  }, [filters, data, setFilteredData]);

  const kandangOptions = data
    ? [
        { value: "all", label: "Semua kandang" },
        ...Array.from(new Set(data.map((item) => item.kandang)))
          .filter(Boolean)
          .map((kandang) => ({ value: kandang, label: kandang })),
      ]
    : [];

  const rangeOptions = data
    ? [
        { value: "all", label: "Semua range" },
        ...Array.from(new Set(data.map((item) => item.rangeBobotHarga)))
          .filter(Boolean)
          .map((rangeBobotHarga) => ({
            value: rangeBobotHarga,
            label: rangeBobotHarga,
          })),
      ]
    : [];

  const jenisOptions = data
    ? [
        { value: "all", label: "Semua jenis" },
        ...Object.entries(
          data.reduce((acc, item) => {
            acc[item.jenis] = (acc[item.jenis] || 0) + 1;
            return acc;
          }, {})
        ).map(([jenis, count]) => ({
          value: jenis,
          label: `${jenis} (${count})`,
        })),
      ]
    : [];

  const kategoriList = jenisOptions.filter((opt) => opt.value !== "all");

  const handleFilterSelect = (filterType, option) => {
    const newFilters = {
      ...filters,
      [filterType]: option.value === "all" ? null : option,
    };
    setFilters(newFilters);
  };

  if (!data) {
    return (
    <div className="flex flex-col gap-3 items-center justify-center py-2 border-1 border-gray-200">
      <Link href="/">
        <h1 className="text-3xl font-bold">Qurbanterbaik.com</h1>
      </Link>
      <p className="text-center">
        Hewan Qurban RAWATAN Terbaik, Harga NEGO Termurah, Terpercaya:
        0812-9746-3380 | Ibu Evi
      </p>
    </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center py-2 border-1 border-gray-200">
      <Link href="/">
        <h1 className="text-3xl font-bold">Qurbanterbaik.com</h1>
      </Link>
      <p className="text-center">
        Hewan Qurban RAWATAN Terbaik, Harga NEGO Termurah, Terpercaya:
        0812-9746-3380 | Ibu Evi
      </p>

      <div className="flex flex-col gap-2 w-full px-4">
        <DropdownButton
          title="Semua kandang"
          options={kandangOptions}
          selected={filters.kandang}
          onSelect={(option) => handleFilterSelect("kandang", option)}
        />
        <DropdownButton
          title="Range Harga & bobot"
          options={rangeOptions}
          selected={filters.range}
          onSelect={(option) => handleFilterSelect("range", option)}
        />
        <DropdownButton
          title="Jenis Hewan"
          options={jenisOptions}
          selected={filters.jenis}
          onSelect={(option) => handleFilterSelect("jenis", option)}
        />
      </div>

      <p className="mx-4 text-center">
        Kategori:{" "}
        {kategoriList.map((kategori, index) => (
          <span key={kategori.value}>
            <span
              className="underline cursor-pointer hover:text-orange-500"
              onClick={() => handleFilterSelect("jenis", kategori)}
            >
              {kategori.label}
            </span>
            {index !== kategoriList.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Header;
