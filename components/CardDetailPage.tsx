"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TarotCard, SEOCardData } from "@/lib/types";
import { getCardSEOData } from "@/services/geminiService";
import Card from "./Card";
import { ArrowLeft, Loader2 } from "lucide-react";

interface CardDetailPageProps {
    card: TarotCard;
}

export default function CardDetailPage({ card }: CardDetailPageProps) {
    const [seoData, setSeoData] = useState<SEOCardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Back Navigation */}
            <Link
                href="/library"
                className="inline-flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
            </Link>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Card Display */}
                <div className="md:col-span-1">
                    <div className="aspect-[2/3] max-w-xs mx-auto sticky top-8">
                        <Card card={card} interactive={true} showReading={false} />
                    </div>
                </div>

                {/* Card Information */}
                <div className="md:col-span-2">
                    <header className="mb-8">
                        <h1 className="text-5xl font-bold mb-4">{card.name}</h1>

                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {card.keywords.length > 0 ? (
                                card.keywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
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
                        <section className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-3 text-green-700 dark:text-green-400 flex items-center">
                                <span className="mr-2">✨</span>
                                Upright Meaning
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {card.upright_meaning}
                            </p>
                        </section>

                        <section className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-3 text-red-700 dark:text-red-400 flex items-center">
                                <span className="mr-2">🔄</span>
                                Reversed Meaning
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {card.reversed_meaning}
                            </p>
                        </section>

                        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-400 flex items-center">
                                <span className="mr-2">🎨</span>
                                Symbolism
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {card.symbolism}
                            </p>
                        </section>
                    </div>
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
                    <section className="prose dark:prose-invert max-w-none">
                        <h2 className="text-3xl font-bold mb-4">Detailed Symbolism</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {seoData.symbolism_detailed}
                        </p>
                    </section>

                    {/* Life Area Readings */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <section className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-3 text-pink-700 dark:text-pink-400">
                                💕 Love & Relationships
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {seoData.love_reading}
                            </p>
                        </section>

                        <section className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-3 text-amber-700 dark:text-amber-400">
                                💼 Career & Work
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {seoData.career_reading}
                            </p>
                        </section>

                        <section className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-3 text-emerald-700 dark:text-emerald-400">
                                🌿 Health & Wellness
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {seoData.health_reading}
                            </p>
                        </section>

                        <section className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">
                                ✨ Spiritual Growth
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {seoData.spiritual_reading}
                            </p>
                        </section>
                    </div>

                    {/* Common Questions */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Common Questions</h2>
                        <div className="space-y-4">
                            {seoData.common_questions.map((qa, index) => (
                                <details
                                    key={index}
                                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg cursor-pointer"
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
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Related Cards</h2>
                        <div className="flex flex-wrap gap-3">
                            {seoData.related_cards.map((relatedCard, index) => (
                                <span
                                    key={index}
                                    className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    {relatedCard}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            ) : null}
        </div>
    );
}
