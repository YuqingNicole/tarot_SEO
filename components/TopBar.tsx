"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/cards", label: "Cards" },
        { href: "/pricing", label: "Pricing" },
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Tarotarot
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href));

                            const isRegister = item.label === "Register";

                            if (isRegister) {
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="
                                            flex items-center space-x-2 px-5 py-2 rounded-full
                                            bg-gradient-to-r from-purple-600 to-pink-600
                                            text-white font-semibold shadow-md
                                            hover:shadow-lg hover:scale-105 transition-all duration-200
                                        "
                                    >
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center space-x-2 px-4 py-2 rounded-lg
                                        transition-all duration-200
                                        ${isActive
                                            ? "bg-purple-100 text-purple-700 font-medium"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }
                                    `}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation (hidden by default) */}
                <div className="md:hidden pb-4 hidden">
                    <div className="flex flex-col space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            const isRegister = item.label === "Register";

                            if (isRegister) {
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="
                                            flex items-center justify-center space-x-2 px-4 py-2 rounded-lg
                                            bg-gradient-to-r from-purple-600 to-pink-600
                                            text-white font-semibold
                                        "
                                    >
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center space-x-2 px-4 py-2 rounded-lg
                                        ${isActive
                                            ? "bg-purple-100 text-purple-700 font-medium"
                                            : "text-gray-600"
                                        }
                                    `}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}

