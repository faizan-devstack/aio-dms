import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setResults, clearResults } from '@/redux/global/searchSlice';
import { RootState } from '@/redux/store';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const GlobalSearch: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter(); // Use useRouter for navigation
    const { query, results } = useSelector((state: RootState) => state.search);
    const [localQuery, setLocalQuery] = useState<string>(query);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setQuery(localQuery));

        // Mock data for demonstration
        const mockResults = [
            { id: '1', label: `Result for "${localQuery}" 1`, path: '/dashboard/1' },
            { id: '2', label: `Result for "${localQuery}" 2`, path: '/dashboard/2' },
            { id: '3', label: `Result for "${localQuery}" 3`, path: '/dashboard/3' },
        ];
        dispatch(setResults(mockResults));
    };

    const handleClear = () => {
        setLocalQuery('');
        dispatch(clearResults());
    };

    const handleClose = () => {
        setIsDropdownOpen(false);
        handleClear();
    };

    const handleResultClick = (path: string) => {
        router.push(path); // Navigate to the specified path using useRouter
        setIsDropdownOpen(false); // Close the dropdown
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Search
                size={20}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="cursor-pointer text-gray-600 hover:text-gray-800"
            />

            {/* Dropdown input and results */}
            {isDropdownOpen && (
                <div className="absolute top-10 right-0 bg-white border rounded-lg shadow-md w-96 p-3">
                    <div className="flex justify-between items-center mb-2 text-[13px]">
                        <span>Search globally ?</span>
                        <X
                            size={15}
                            className="cursor-pointer hover:opacity-70"
                            onClick={handleClose}
                        />
                    </div>
                    <form onSubmit={handleSearch}>
                        <Input
                            type="text"
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            placeholder="Search..."
                        />
                    </form>

                    {/* Display search results */}
                    {results.length > 0 && (
                        <div className="border p-2 rounded-lg mt-2">
                            <h2 className="text-sm font-semibold mb-2">Search Results:</h2>
                            <ul>
                                {results.map((result) => (
                                    <li
                                        key={result.id}
                                        className="my-1 text-[13px] border p-2 rounded-md cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleResultClick(result.path)} // Navigate on click
                                    >
                                        {result.label}
                                    </li>
                                ))}
                            </ul>
                            <Button onClick={handleClear} size="sm" className="mt-2">
                                Clear Results
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;