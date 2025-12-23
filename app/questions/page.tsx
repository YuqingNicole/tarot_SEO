import Link from "next/link";
import { Metadata } from "next";
import meaningData from "@/data/meaning-seo-generated.json";
import { HelpCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Tarot Questions Directory - Find Answers to Your Queries",
    description: "A comprehensive list of common and deep tarot questions. Browse through various topics including love, career, and spiritual guidance.",
};

export default async function QuestionsIndexPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || "1", 10);
    const pageSize = 50;

    // Extract unique related questions from meaningData
    const allQuestionsMap = new Map<string, { question: string; slug: string }>();

    (meaningData as any[]).forEach(item => {
        if (item.relatedQuestions) {
            item.relatedQuestions.forEach((rq: any) => {
                if (rq.slug && rq.question) {
                    allQuestionsMap.set(rq.slug, rq);
                }
            });
        }
    });

    const allQuestions = Array.from(allQuestionsMap.values());
    const totalItems = allQuestions.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Ensure currentPage is within bounds
    const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

    const paginatedQuestions = allQuestions.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-slate-900 dark:text-slate-100 selection:bg-purple-100">
            {/* Minimalist Header */}
            <header className="relative py-16 md:py-24 overflow-hidden">
                <div className="container mx-auto px-5 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Tarot <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Questions</span> Hub
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Find clarity and guidance through our extensive database of tarot-related inquiries.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-5 pb-24 max-w-6xl">
                {/* Search Bar Visual */}
                <div className="mb-16 relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-300" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a question..."
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-slate-600 dark:text-slate-300"
                    />
                </div>

                {/* Questions List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {paginatedQuestions.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/questions/${item.slug}`}
                            className="group flex items-start p-6 bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-900/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0 mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h2 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors leading-tight mb-2">
                                    {item.question}
                                </h2>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    View Answer →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-2">
                        {safePage > 1 && (
                            <Link
                                href={`/questions?page=${safePage - 1}`}
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
                                            href={`/questions?page=${pageNum}`}
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
                                href={`/questions?page=${safePage + 1}`}
                                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                )}

                {/* Bottom Navigation */}
                <div className="mt-20 text-center pt-16 border-t border-slate-100 dark:border-slate-900">
                    <p className="text-slate-400 text-sm font-light">
                        Exploring deeper meanings?
                        <Link href="/meaning" className="text-purple-600 font-bold ml-2 hover:underline">View Meaning Archives</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
