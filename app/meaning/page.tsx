import Link from "next/link";
import { Metadata } from "next";
import meaningData from "@/data/meaning-seo-generated.json";
import { BookOpen, Sparkles, Search, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Tarot Deep Meanings Hub",
    description: "Explore our collection of deep tarot card meanings, covering love, career, spirituality, and more. Find answers to your most specific tarot questions.",
};

export default async function MeaningDirectoryPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || "1", 10);
    const pageSize = 50;

    const meanings = meaningData as any[];
    const totalItems = meanings.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Ensure currentPage is within bounds
    const safePage = Math.max(1, Math.min(currentPage, totalPages));

    const paginatedMeanings = meanings.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-slate-900 dark:text-slate-100 selection:bg-purple-100">
            {/* Header section with refined aesthetic */}
            <header className="relative py-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/5 pointer-events-none"></div>
                <div className="container mx-auto px-5 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        Tarot Meaning <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Archives</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        A curated collection of deep-dive interpretations for every facet of your journey.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-5 pb-24 max-w-6xl">
                {/* Search / Filter placeholder area - visual only for premium feel */}
                <div className="mb-12 relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-300" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search meanings (e.g., 'Moon in Love', 'Tower Career')..."
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-slate-600 dark:text-slate-300"
                    />
                </div>

                {/* Grid of meanings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedMeanings.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/meaning/${item.slug}`}
                            className="group relative bg-white dark:bg-gray-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-900/50 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 transition-colors">
                                <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                            </div>

                            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:text-purple-600 transition-colors leading-snug">
                                {item.question}
                            </h2>

                            <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                                {item.shortAnswer || item.seo?.description || "Explore the deep symbolic meaning and practical guidance of this tarot aspect."}
                            </p>

                            <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-purple-500 transition-colors">
                                Read Interpretation
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-2">
                        {safePage > 1 && (
                            <Link
                                href={`/meaning?page=${safePage - 1}`}
                                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                        )}

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                // Simple sliding window logic for pagination numbers
                                let pageNum = safePage - 2 + i;
                                if (safePage <= 2) pageNum = i + 1;
                                if (safePage >= totalPages - 1) pageNum = totalPages - 4 + i;

                                if (pageNum > 0 && pageNum <= totalPages) {
                                    return (
                                        <Link
                                            key={pageNum}
                                            href={`/meaning?page=${pageNum}`}
                                            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${safePage === pageNum
                                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none"
                                                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                                                }`}
                                        >
                                            {pageNum}
                                        </Link>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {safePage < totalPages && (
                            <Link
                                href={`/meaning?page=${safePage + 1}`}
                                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                )}

                {/* Bottom Navigation */}
                <div className="mt-20 text-center pt-20 border-t border-slate-100 dark:border-slate-900">
                    <p className="text-slate-400 text-sm font-light">
                        Can't find what you're looking for?
                        <Link href="/cards" className="text-purple-600 font-bold ml-2 hover:underline">Browse the 78 Cards Directory</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
