"use client";

import { useState, useEffect, useRef } from "react";
import { SearchIcon, ChevronDown, Check } from "lucide-react";
import { Input } from "./input";

interface Column {
    id: string;
    title: string;
    width: number;
}

interface SearchProps {
    columns: Column[];
    onSearch: (columnId: string, searchValue: string) => void;
}

export default function Search({ columns, onSearch }: SearchProps) {
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isColumnSelectOpen, setIsColumnSelectOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleColumnChange = (columnId: string) => {
        setSelectedColumn(columnId);
        setIsColumnSelectOpen(false);
        setSearchValue(""); // Reset search value when column changes
        onSearch(columnId, ""); // Trigger search with empty value to reset rows
    };

    // Trigger search automatically when searchValue or selectedColumn changes
    useEffect(() => {
        if (selectedColumn) {
            onSearch(selectedColumn, searchValue);
        }
    }, [selectedColumn, searchValue, onSearch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMainOpen(false);
                setIsColumnSelectOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Search Button */}
            <button
                onClick={() => setIsMainOpen(!isMainOpen)}
                className="flex gap-1 text-[13px] justify-center items-center transition-colors duration-200 hover:bg-gray-200 p-[7px] rounded-[4px]"
            >
                <SearchIcon className="text-gray-500" size={20} />
                Search
            </button>

            {/* Main Dropdown */}
            {isMainOpen && (
                <div className="absolute left-0 p-3 mt-3 w-72 bg-white rounded-md shadow-md border z-50">
                    <div className="flex justify-between text-[13px]">
                        <span>Search in ?</span>
                        {/* No Apply button needed */}
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

                    {/* Search Input (only shown if a column is selected) */}
                    {selectedColumn && (
                        <div className="mt-2">
                            <Input
                                type="text"
                                placeholder="Enter search value"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}