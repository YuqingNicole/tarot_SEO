import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCardBySlug, DECK } from "@/lib/constants";
import { SEOCardData } from "@/lib/types";
import Card from "@/components/Card";
import fs from "fs";
import path from "path";
import Link from "next/link";

// Helper to get SEO data
async function getSeoData(slug: string): Promise<SEOCardData | null> {
    const filePath = path.join(process.cwd(), "data", "card-seo-data.json");
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`Card SEO data file not found at: ${filePath}`);
            return null;
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        if (!fileContent || fileContent.trim() === "") {
            console.error(`Card SEO data file is empty at: ${filePath}`);
            return null;
        }

        const data = JSON.parse(fileContent);
        return data[slug] || null;
    } catch (error) {
        console.error("Error reading SEO data:", error);
        return null;
    }
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), "data", "card-seo-data.json");
    try {
        if (!fs.existsSync(filePath)) return [];
        const fileContent = fs.readFileSync(filePath, "utf-8");
        if (!fileContent || fileContent.trim() === "") return [];

        const data = JSON.parse(fileContent);
        return Object.keys(data).map((slug) => ({
            slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const card = getCardBySlug(slug);
    const seoData = await getSeoData(slug);

    if (!card || !seoData) {
        return {
            title: "Card Not Found | Tarot Reader",
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";
    const imageUrl = `${baseUrl}${card.image_path}`;

    return {
        title: `${card.name} Tarot Card Meaning | Upright & Reversed`,
        description: seoData.symbolism_detailed.slice(0, 160) + "...",
        alternates: {
            canonical: `${baseUrl}/cards/${slug}`,
        },
        openGraph: {
            title: `${card.name} Tarot Card Meaning`,
            description: seoData.symbolism_detailed.slice(0, 160) + "...",
            url: `${baseUrl}/cards/${slug}`,
            siteName: "Tarotarot Card",
            images: [
                {
                    url: imageUrl, // Uses the card image we mapped earlier
                    width: 800,
                    height: 1200,
                    alt: `${card.name} Tarot Card`,
                },
            ],
            locale: "en_US",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${card.name} Tarot Card Meaning`,
            description: seoData.symbolism_detailed.slice(0, 160) + "...",
            images: [imageUrl],
        },
    };
}

export default async function CardPage({ params }: PageProps) {
    const { slug } = await params;
    const card = getCardBySlug(slug);
    const seoData = await getSeoData(slug);

    if (!card || !seoData) {
        notFound();
    }

    // Fix internal links to point to /cards/[slug] instead of /[slug]
    const renderRelatedLink = (relatedCardName: string) => {
        const relatedSlug = DECK.find(c => c.name === relatedCardName)?.slug;
        if (!relatedSlug) return <span key={relatedCardName} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">{relatedCardName}</span>;

        return (
            <Link
                key={relatedCardName}
                href={`/cards/${relatedSlug}`}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-colors border border-purple-200 dark:border-purple-700"
            >
                {relatedCardName}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950 py-12 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {card.name}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Meaning, Symbolism, and Interpretations
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Card Visual */}
                    <div className="md:col-span-1">
                        <div className="sticky top-8 aspect-[2/3] w-full max-w-sm mx-auto">
                            <Card card={card} interactive={true} />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Detailed Symbolism */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-900">
                            <h2 className="text-2xl font-bold mb-4 text-purple-900 dark:text-purple-100 flex items-center gap-2">
                                <span>🔮</span> Symbolism & Meaning
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {seoData.symbolism_detailed}
                            </p>
                        </section>

                        {/* Readings Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl border border-pink-100 dark:border-pink-800">
                                <h3 className="text-xl font-bold mb-3 text-pink-700 dark:text-pink-300 flex items-center gap-2">
                                    <span>❤️</span> Love
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {seoData.love_reading}
                                </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                                <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                    <span>💼</span> Career
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {seoData.career_reading}
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800">
                                <h3 className="text-xl font-bold mb-3 text-green-700 dark:text-green-300 flex items-center gap-2">
                                    <span>🌿</span> Health
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {seoData.health_reading}
                                </p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
                                <h3 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-300 flex items-center gap-2">
                                    <span>✨</span> Spiritual
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {seoData.spiritual_reading}
                                </p>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="my-16 text-center">
                            <div className="bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm shadow-lg shadow-purple-200/40 dark:shadow-black/30 p-8 rounded-2xl border border-purple-100 dark:border-purple-800 max-w-2xl mx-auto">
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

                        {/* Common Questions */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <span>❓</span> Common Questions
                            </h2>
                            <div className="space-y-6">
                                {seoData.common_questions.map((qa, index) => (
                                    <div key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                                        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                                            {qa.question}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {qa.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Related Cards */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
                                Related Cards
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {seoData.related_cards.map(renderRelatedLink)}
                            </div>
                        </section>

                        {/* Back to Cards/Library */}
                        <div className="text-center pt-8">
                            <Link
                                href="/cards"
                                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                                <span>←</span> Back to Cards
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
