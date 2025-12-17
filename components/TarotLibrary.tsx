"use client";

import { useState } from "react";
import Link from "next/link";
import { DECK, SUIT_INFO } from "@/lib/constants";
import { Suit } from "@/lib/types";
import Card from "./Card";
import { Search, Filter } from "lucide-react";

export default function TarotLibrary() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<"all" | "major" | Suit>("all");

    // Filter cards based on search and filter
    const filteredCards = DECK.filter((card) => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedFilter === "all") return matchesSearch;
        if (selectedFilter === "major") return matchesSearch && card.arcana === "major";
        return matchesSearch && card.suit === selectedFilter;
    });

    const majorCount = DECK.filter((c) => c.arcana === "major").length;
    const minorCount = DECK.filter((c) => c.arcana === "minor").length;

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Tarot Card Library</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Explore all {DECK.length} tarot cards ({majorCount} Major Arcana + {minorCount} Minor Arcana)
                </p>
            </header>

            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search cards..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setSelectedFilter("all")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === "all"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                    >
                        <Filter className="inline w-4 h-4 mr-1" />
                        All
                    </button>
                    <button
                        onClick={() => setSelectedFilter("major")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === "major"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                    >
                        Major Arcana
                    </button>
                    {Object.entries(SUIT_INFO).map(([suit, info]) => (
                        <button
                            key={suit}
                            onClick={() => setSelectedFilter(suit as Suit)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === suit
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                        >
                            {info.symbol} {suit.charAt(0).toUpperCase() + suit.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-6 text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredCards.length} of {DECK.length} cards
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCards.map((card) => (
                    <Link
                        key={card.id}
                        href={`/library/${card.slug}`}
                        className="block aspect-[2/3] hover:scale-105 transition-transform"
                    >
                        <Card card={card} interactive={false} />
                    </Link>
                ))}
            </div>

            {/* No Results */}
            {filteredCards.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-600 dark:text-gray-400">
                        No cards found matching "{searchTerm}"
                    </p>
                </div>
            )}
        </div>
    );
}
