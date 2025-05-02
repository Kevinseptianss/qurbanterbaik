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

  // Get filtered data based on current selections for cascading dropdowns
  const getFilteredData = () => {
    let result = [...data];

    if (filters.kandang) {
      result = result.filter((item) => item.kandang === filters.kandang.value);
    }

    if (filters.range) {
      result = result.filter(
        (item) => item.rangeBobotHarga === filters.range.value
      );
    }

    if (filters.jenis) {
      result = result.filter((item) => item.jenis === filters.jenis.value);
    }

    return result;
  };

  // Generate options based on current filters
  const generateOptions = (field) => {
    const filteredData = getFilteredData();
    const uniqueValues = Array.from(new Set(filteredData.map((item) => item[field])))
      .filter(Boolean);

    return [
      { value: "all", label: `Semua ${field === "jenis" ? "jenis" : field === "kandang" ? "kandang" : "range"}` },
      ...uniqueValues.map((value) => ({
        value,
        label: field === "jenis" 
          ? `${value} (${filteredData.filter(item => item.jenis === value).length})` 
          : value
      }))
    ];
  };

  const kandangOptions = data ? generateOptions("kandang") : [];
  const rangeOptions = data ? generateOptions("rangeBobotHarga") : [];
  const jenisOptions = data ? generateOptions("jenis") : [];

  const kategoriList = jenisOptions.filter((opt) => opt.value !== "all");

  const handleFilterSelect = (filterType, option) => {
    const newFilters = {
      ...filters,
      [filterType]: option.value === "all" ? null : option,
    };

    // Reset dependent filters when a parent filter changes
    if (filterType === "kandang") {
      newFilters.range = null;
      newFilters.jenis = null;
    } else if (filterType === "range") {
      newFilters.jenis = null;
    }

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