import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Sparkles, Star, MessageCircle, Share2, Compass, ChevronDown } from "lucide-react";

// --- Data Interfaces ---
interface TarotMeaning {
    id: string;
    slug: string;
    question: string;
    shortAnswer: string;
    detailedAnswer: string;
    tags: string[];
    relatedCards: Array<{
        name: string;
        meaning: string;
    }>;
    relatedQuestions: Array<{
        question: string;
        slug: string;
    }>;
}

// --- Data Fetching ---
async function getQuestionData(slug: string): Promise<TarotMeaning | null> {
    const samples = (await import("@/data/meaning-seo-generated.json")).default;
    const match = (samples as any[]).find((s: any) => s.slug === slug);

    if (match) {
        return match as TarotMeaning;
    }
    return null;
}

export async function generateStaticParams() {
    const samples = (await import("@/data/meaning-seo-generated.json")).default;
    const allQuestionSlugs = new Set<string>();

    (samples as any[]).forEach((item: any) => {
        if (item.slug) allQuestionSlugs.add(item.slug);
        if (item.relatedQuestions) {
            item.relatedQuestions.forEach((rq: any) => {
                if (rq.slug) allQuestionSlugs.add(rq.slug);
            });
        }
    });

    return Array.from(allQuestionSlugs).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getQuestionData(slug);

    if (!data) return { title: "Question Not Found" };

    return {
        title: `${data.question} | Tarot Questions`,
        description: data.shortAnswer.substring(0, 160) + "...",
    };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getQuestionData(slug);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Question Not Found</h1>
                    <Link href="/questions" className="text-purple-600 hover:underline">Return to Hub</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-slate-900 dark:text-slate-100 selection:bg-purple-100">

            {/* --- Sticky SubTopBar --- */}
            <div className="sticky top-16 z-30 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-purple-100/50 dark:border-purple-900/30 py-3 md:py-4 shadow-sm">
                <div className="container mx-auto px-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="hidden sm:flex w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">Seeking deeper answers?</h3>
                            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 hidden xs:block truncate font-light">
                                Get a personal reading tailored to your unique energy.
                            </p>
                        </div>
                    </div>
                    <button className="flex-shrink-0 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-purple-600 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-200 dark:hover:shadow-none transition-all active:scale-95">
                        Personal Reading
                    </button>
                </div>
            </div>

            <main className="container mx-auto px-5 py-10 md:py-16 lg:py-20 max-w-6xl">
                {/* --- Header --- */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-20">
                    <Link
                        href="/questions"
                        className="group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-purple-600 transition-colors mb-6 md:mb-8"
                    >
                        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Questions
                    </Link>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] max-w-4xl">
                        {data.question}
                    </h1>

                    <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 md:mb-8"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* --- Featured Answer (TL;DR) --- */}
                    <div className="mb-12 p-8 rounded-3xl bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900/30 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-5">
                            <HelpCircle className="w-32 h-32 text-purple-600" />
                        </div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-4">Quick Insight</h2>
                        <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                            {data.shortAnswer}
                        </p>
                    </div>

                    {/* --- Detailed Content --- */}
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: data.detailedAnswer }} />
                    </div>

                    {/* --- Related Questions (Accordions replaced with links for now due to data structure) --- */}
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Compass className="w-6 h-6 text-purple-500" />
                            Related Explorations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.relatedQuestions?.map((rq, index) => (
                                <Link
                                    key={index}
                                    href={`/questions/${rq.slug}`}
                                    className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-900/50 hover:shadow-md transition-all group"
                                >
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 transition-colors mb-2">
                                        {rq.question}
                                    </h4>
                                    <span className="text-xs text-slate-400 group-hover:text-purple-400">View Answer →</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* --- Support Action --- */}
                    <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-900 text-center">
                        <div className="inline-flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Still looking for clarity?</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">Every tarot reading is unique. Connect with our expert readers for a personalized session.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 dark:shadow-none">
                                    Get Personal Reading
                                </button>
                                <button className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 transition-all">
                                    Share This Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

