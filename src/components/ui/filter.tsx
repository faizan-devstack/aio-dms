"use client";

import { useState, useEffect, useRef } from "react";
import { FilterIcon, ChevronDown, Check } from "lucide-react";
import { Button } from "./button";

interface Column {
  id: string;
  title: string;
  width: number;
}

interface FilterProps {
  columns: Column[];
  rows: Row[];
  onFilter: (columnId: string, filterValue: string) => void;
}

interface Row {
  id: string;
  [key: string]: any;
}

export default function Filter({ columns, rows, onFilter }: FilterProps) {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isColumnSelectOpen, setIsColumnSelectOpen] = useState(false);
  const [isValueSelectOpen, setIsValueSelectOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const getUniqueValues = (columnId: string): string[] => {
    const values = rows.map((row) => row[columnId]);
    return Array.from(new Set(values));
  };

  const handleColumnChange = (columnId: string) => {
    setSelectedColumn(columnId);
    setIsColumnSelectOpen(false);
    setSelectedValue(""); // Reset selected value when column changes
  };

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setIsValueSelectOpen(false);
  };

  const applyFilter = () => {
    if (selectedColumn && selectedValue) {
      onFilter(selectedColumn, selectedValue);
    }
    setIsMainOpen(false);
  };

  const clearFilter = () => {
    setSelectedColumn("");
    setSelectedValue("");
    onFilter("", ""); // Reset filter state
    setIsMainOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMainOpen(false);
        setIsColumnSelectOpen(false);
        setIsValueSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={() => setIsMainOpen(!isMainOpen)}
        className="flex gap-1 text-[13px] justify-center items-center transition-colors duration-200 hover:bg-gray-200 p-[7px] rounded-[4px]"
      >
        <FilterIcon className="text-gray-500" size={20} />
        Filter
      </button>

      {/* Main Dropdown */}
      {isMainOpen && (
        <div className="absolute left-0 p-3 mt-3 w-72 bg-white rounded-md shadow-md border z-50">
          <div className="flex justify-between text-[13px]">
            <span>Filter by ?</span>
            <div className="flex gap-2">
              <Button onClick={clearFilter} size="sm" variant="clear">
                Clear
              </Button>
              <Button onClick={applyFilter} size="sm">
                Apply
              </Button>
            </div>
          </div>

          {/* Column Select Dropdown */}
          <div className="mt-2 relative">
            <button
              onClick={() => setIsColumnSelectOpen(!isColumnSelectOpen)}
              className="w-full flex justify-between items-center p-2 border rounded-md text-[13px] bg-white hover:bg-gray-100"
            >
              <span>
                {selectedColumn
                  ? columns.find((col) => col.id === selectedColumn)?.title
                  : "Select column"}
              </span>
              <ChevronDown size={15} className="text-gray-500" />
            </button>

            {/* Column Dropdown Options */}
            {isColumnSelectOpen && (
              <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                {columns.map((column) => (
                  <li
                    key={column.id}
                    onClick={() => handleColumnChange(column.id)}
                    className={`p-2 text-[13px] cursor-pointer ${selectedColumn === column.id
                      ? "bg-gray-200 font-medium"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {column.title}
                      {selectedColumn === column.id && (
                        <Check size={15} className="text-blue-500" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Value Select Dropdown (only shown if a column is selected) */}
          {selectedColumn && (
            <div className="mt-2 relative">
              <button
                onClick={() => setIsValueSelectOpen(!isValueSelectOpen)}
                className="w-full flex justify-between items-center p-2 border rounded-md text-[13px] bg-white hover:bg-gray-100"
              >
                <span>
                  {selectedValue || "Select value"}
                </span>
                <ChevronDown size={15} className="text-gray-500" />
              </button>

              {/* Value Dropdown Options */}
              {isValueSelectOpen && (
                <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                  {getUniqueValues(selectedColumn).map((value, index) => (
                    <li
                      key={index}
                      onClick={() => handleValueChange(value)}
                      className={`p-2 text-[13px] cursor-pointer ${selectedValue === value
                        ? "bg-gray-200 font-medium"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        {value}
                        {selectedValue === value && (
                          <Check size={15} className="text-blue-500" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}