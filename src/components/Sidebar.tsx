"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Users,
    FileText,
    FilePlus,
    BarChart2,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Package,
    Receipt,
    Settings,
} from "lucide-react";

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});
    const pathname = usePathname();

    const toggleDropdown = (name: string) => {
        setDropdownStates((prevState) => {
            const updatedState = {
                ...prevState,
                [name]: !prevState[name],
            };
            localStorage.setItem("dropdownStates", JSON.stringify(updatedState));
            return updatedState;
        });
    };

    useEffect(() => {
        const savedDropdownStates = localStorage.getItem("dropdownStates");
        if (savedDropdownStates) {
            setDropdownStates(JSON.parse(savedDropdownStates) as Record<string, boolean>);
        }
    }, []);

    const links = [
        { name: "Home", href: "/dashboard/home", icon: <Home size={18} /> },
        {
            name: "Finance",
            icon: <BarChart2 size={18} />,
            subLinks: [
                { name: "Customers", href: "/dashboard/finance/customers", icon: <Users size={16} /> },
                { name: "Estimates", href: "/dashboard/finance/estimates", icon: <FileText size={16} /> },
                { name: "Invoices", href: "/dashboard/finance/invoices", icon: <FilePlus size={16} /> },
                { name: "Items", href: "/dashboard/finance/items", icon: <Package size={16} /> },
                { name: "Taxes", href: "/dashboard/finance/taxes", icon: <Receipt size={16} /> },
            ],
        },
    ];

    return (
        <aside
            className={`fixed top-12 rounded-tr-lg left-0 h-screen transition-all duration-300 ${
                isSidebarOpen ? "w-[240px]" : "w-10"
            }`}
            style={{
                background: "linear-gradient(to bottom right, #ffffff, #e2f0e7)",
            }}
        >
            <button
                onClick={toggleSidebar}
                className="absolute top-1 border-b right-2 p-1 rounded-full hover:bg-gray-200"
            >
                {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <nav className={`mt-4 text-base ${isSidebarOpen ? "block" : "hidden"}`}>
                <ul className="mx-3">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        const isDropdownOpen = dropdownStates[link.name] || false;

                        return (
                            <li key={link.name} className={isActive ? "bg-[#c6e9d5] rounded-[4px]" : ""}>
                                {link.subLinks ? (
                                    <div className="border-b">
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            className="text-sm flex items-center my-1 px-2 py-1 rounded-[4px] w-full text-left hover:bg-[#e5ebe8]"
                                        >
                                            {link.icon}
                                            <p className="ml-2">{link.name}</p>
                                            {isDropdownOpen ? (
                                                <ChevronUp className="ml-auto w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="ml-auto w-4 h-4" />
                                            )}
                                        </button>
                                        {isDropdownOpen && (
                                            <ul className="ml-7">
                                                {link.subLinks.map((subLink) => (
                                                    <li
                                                        key={subLink.href}
                                                        className={pathname === subLink.href ? "bg-[#c6e9d5] rounded-[4px]" : ""}
                                                    >
                                                        <Link href={subLink.href} className="flex rounded-[4px] items-center my-[2px] px-2 py-[1px] text-[12px] hover:bg-[#e5ebe8]">
                                                            {subLink.icon}
                                                            <p className="ml-1">{subLink.name}</p>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <Link href={link.href!} className="text-sm border-b flex items-center mt-8 mb-1 px-2 py-1 rounded-[4px] hover:bg-[#e5ebe8]">
                                        {link.icon}
                                        <p className="ml-2">{link.name}</p>
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;