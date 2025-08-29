"use client";

import { useState, useEffect, useRef } from "react";
import { SortAsc, ChevronDown, Check } from "lucide-react";
import { Button } from "./button";

interface Column {
  id: string;
  title: string;
  width: number;
}

interface SortProps {
  columns: Column[];
  onSort: (columnId: string, isAscending: boolean) => void;
}

export default function Sort({ columns, onSort }: SortProps) {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [isAscending, setIsAscending] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSortChange = (columnId: string) => {
    setSelectedSort(columnId);
    setIsSelectOpen(false);
  };

  const applySort = () => {
    if (selectedSort) {
      onSort(selectedSort, isAscending);
    }
    setIsMainOpen(false);
  };

  const clearSort = () => {
    setSelectedSort("");
    setIsAscending(true); // Reset to ascending order
    onSort("", true); // Reset sort state
    setIsMainOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMainOpen(false);
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Sort Button */}
      <button
        onClick={() => setIsMainOpen(!isMainOpen)}
        className="flex gap-1 text-[13px] justify-center items-center transition-colors duration-200 hover:bg-gray-200 p-[7px] rounded-[4px]"
      >
        <SortAsc className="text-gray-500" size={20} />
        Sort
      </button>

      {/* Main Dropdown */}
      {isMainOpen && (
        <div className="absolute left-0 p-3 mt-3 w-72 bg-white rounded-md shadow-md border z-50">
          <div className="flex justify-between text-[13px]">
            <span>Sort by ?</span>
            <div className="flex gap-2">
              <Button onClick={clearSort} size="sm" variant="clear">
                Clear
              </Button>
              <Button onClick={applySort} size="sm">
                Apply
              </Button>
            </div>
          </div>

          {/* Custom Dropdown Select */}
          <div className="mt-2 relative">
            <button
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              className="w-full flex justify-between items-center p-2 border rounded-md text-[13px] bg-white hover:bg-gray-100"
            >
              <span>
                {selectedSort
                  ? columns.find((col) => col.id === selectedSort)?.title
                  : "Select column"}
              </span>
              <ChevronDown size={15} className="text-gray-500" />
            </button>

            {/* Dropdown Options */}
            {isSelectOpen && (
              <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                {columns.map((column) => (
                  <li
                    key={column.id}
                    onClick={() => handleSortChange(column.id)}
                    className={`p-2 text-[13px] cursor-pointer ${
                      selectedSort === column.id
                        ? "bg-gray-200 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {column.title}
                      {selectedSort === column.id && (
                        <Check size={15} className="text-blue-500" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Ascending/Descending Toggle */}
          <div className="mt-3">
            <button
              onClick={() => setIsAscending(!isAscending)}
              className="w-full px-4 py-2 text-[13px] border rounded-md hover:bg-gray-100"
            >
              {isAscending ? "Ascending" : "Descending"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}