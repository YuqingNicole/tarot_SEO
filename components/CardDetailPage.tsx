"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TarotCard, SEOCardData } from "@/lib/types";
import { getCardSEOData } from "@/services/geminiService";
import Card from "./Card";
import { ArrowLeft, Loader2 } from "lucide-react";


interface CardDetailPageProps {
    card: TarotCard;
    initialSeoData?: SEOCardData | null;
}

export default function CardDetailPage({ card, initialSeoData = null }: CardDetailPageProps) {
    const [seoData, setSeoData] = useState<SEOCardData | null>(initialSeoData);
    const [isLoading, setIsLoading] = useState(!initialSeoData);
    const panelClass =
        "rounded-2xl border border-purple-100/60 dark:border-purple-800/40 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm shadow-lg shadow-purple-200/40 dark:shadow-black/30 p-6";
    const sectionHeadingClass = "text-2xl font-semibold tracking-tight mb-3 flex items-center gap-2";

    useEffect(() => {
        async function fetchSEOData() {
            setIsLoading(true);
            try {
                const data = await getCardSEOData(card);
                setSeoData(data);
            } catch (error) {
                console.error("Error fetching SEO data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSEOData();
    }, [card.id]);

    return (
        <div className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 via-white to-white dark:from-slate-950 dark:via-slate-950/90 dark:to-black" />
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                {/* Back Navigation */}
                <Link
                    href="/library"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 mb-8"
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-current/30 group-hover:border-current transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </span>
                    <span>Back to Library</span>
                </Link>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Card Display */}
                    <div className="md:col-span-1">
                        <div className={`${panelClass} aspect-[2/3] max-w-xs mx-auto sticky top-8 flex items-center justify-center`}>
                            <Card card={card} interactive={true} showReading={false} />
                        </div>
                    </div>

                    {/* Card Information */}
                    <div className="md:col-span-2">
                        <header className="mb-8">
                            <p className="uppercase tracking-[0.4em] text-sm text-purple-500 dark:text-purple-300 mb-3">Major Arcana</p>
                            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                                {card.name}
                            </h1>

                            {/* Keywords */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {card.keywords.length > 0 ? (
                                    card.keywords.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full text-sm font-medium bg-white/80 dark:bg-slate-900/60 border border-purple-100/40 dark:border-purple-800/40 text-purple-800 dark:text-purple-100"
                                        >
                                            {keyword}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 italic">Keywords loading...</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                {card.description}
                            </p>
                        </header>

                        {/* Basic Meanings */}
                        <div className="space-y-6 mb-12">
                            <section className={panelClass}>
                                <h2 className={`${sectionHeadingClass} text-emerald-700 dark:text-emerald-300`}>
                                    Upright Meaning
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {card.upright_meaning}
                                </p>
                            </section>

                            <section className={panelClass}>
                                <h2 className={`${sectionHeadingClass} text-rose-700 dark:text-rose-300`}>
                                    Reversed Meaning
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {card.reversed_meaning}
                                </p>
                            </section>

                            <section className={panelClass}>
                                <h2 className={`${sectionHeadingClass} text-sky-700 dark:text-sky-300`}>
                                    Symbolism
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {card.symbolism}
                                </p>
                            </section>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="my-16 text-center">
                    <div className={`${panelClass} max-w-2xl mx-auto`}>
                        <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
                            Explore More Tarot Wisdom
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Discover the complete tarot deck and learn about all 78 cards, their meanings, and how they can guide your journey.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            <span>try daily reading</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* SEO Content (AI Generated) */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            Generating detailed insights...
                        </p>
                    </div>
                ) : seoData ? (
                    <div className="space-y-8">
                        {/* Detailed Symbolism */}
                        <section className={panelClass}>
                            <h2 className="text-3xl font-semibold mb-4 text-slate-900 dark:text-white">
                                Detailed Symbolism
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {seoData.symbolism_detailed}
                            </p>
                        </section>

                        {/* Life Area Readings */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <section className={panelClass}>
                                <h3 className="text-xl font-semibold mb-2 text-pink-700 dark:text-pink-300">
                                    💕 Love & Relationships
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {seoData.love_reading}
                                </p>
                            </section>

                            <section className={panelClass}>
                                <h3 className="text-xl font-semibold mb-2 text-amber-700 dark:text-amber-300">
                                    💼 Career & Work
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {seoData.career_reading}
                                </p>
                            </section>

                            <section className={panelClass}>
                                <h3 className="text-xl font-semibold mb-2 text-emerald-700 dark:text-emerald-300">
                                    🌿 Health & Wellness
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {seoData.health_reading}
                                </p>
                            </section>

                            <section className={panelClass}>
                                <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                                    ✨ Spiritual Growth
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {seoData.spiritual_reading}
                                </p>
                            </section>
                        </div>

                        {/* Common Questions */}
                        <section className={panelClass}>
                            <h2 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-white">Common Questions</h2>
                            <div className="space-y-4">
                                {seoData.common_questions.map((qa, index) => (
                                    <details
                                        key={index}
                                        className="rounded-xl border border-purple-100/40 dark:border-purple-800/40 bg-white/70 dark:bg-slate-900/60 px-4 py-3 cursor-pointer transition-colors"
                                    >
                                        <summary className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                            {qa.question}
                                        </summary>
                                        <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {qa.answer}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </section>

                        {/* Related Cards */}
                        <section className={panelClass}>
                            <h2 className="text-3xl font-semibold mb-4 text-slate-900 dark:text-white">Related Cards</h2>
                            <div className="flex flex-wrap gap-3">
                                {seoData.related_cards.map((relatedCard, index) => {
                                    // Generate a simple slug from the card name
                                    const slug = relatedCard
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")
                                        .replace(/(^-|-$)/g, "");

                                    return (
                                        <Link
                                            key={index}
                                            href={`/cards/${slug}`}
                                            className="bg-white/80 dark:bg-slate-900/60 border border-purple-100/40 dark:border-purple-800/40 text-purple-800 dark:text-purple-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:scale-105 transition-all duration-200"
                                        >
                                            {relatedCard}
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
