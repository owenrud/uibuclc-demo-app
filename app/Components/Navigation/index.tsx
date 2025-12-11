"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/public/images/logo.png"
import { ChartPieSliceIcon, HouseLine, Stack } from "@phosphor-icons/react"
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavbarComponent = () => {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(true);

    const baseStyle =
        "flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-all duration-300";

    const activeStyle =
        "bg-blue-900 text-white border-2 border-yellow-500";

    const links = [
        { href: "/", label: "Dashboard", icon: <HouseLine size={32} weight="fill" /> },
        { href: "/upload", label: "Upload Score Test", icon: <Stack size={32} weight="fill" /> },
        { href: "/score", label: "Score Test", icon: <ChartPieSliceIcon size={32} weight="fill"/> },
        { href: "/mandarin", label: "Mandarin Score", icon: <ChartPieSliceIcon size={32} weight="fill" /> },
    ];

    return (
        <div 
            className={`bg-gray-100 p-2 h-screen transition-all duration-300 
            ${collapsed ? "w-[80px]" : "w-[220px]"}`}
            
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
        >
            <nav className="space-y-6">
                
                {/* Logo Section */}
                <div className="flex items-center p-2 gap-3">
                    <Image width={50} height={50} src={logo} alt='logo' />

                    {/* Hide label when collapsed */}
                    <span 
                        className={`text-lg text-blue-900 font-bold whitespace-nowrap transition-opacity duration-300
                        ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                    >
                        UIB UCLC
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="space-y-4">
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${baseStyle} 
                            ${pathname === item.href ? activeStyle : "text-blue-900 hover:bg-blue-900 hover:text-white"} 
                            `}
                        >
                            {/* FIXED ICON SIZE */}
                            <div className="min-w-[40px] flex justify-center">
                                {item.icon}
                            </div>

                            {/* Label fades out */}
                            <span
                                className={`transition-all duration-300 whitespace-nowrap
                                ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>

            </nav>
        </div>
    );
};

export default NavbarComponent;
