import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Share2, Sparkles, MessageCircle, Star, Compass, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";

// --- Data Interfaces based on meaning-seo-samples.json ---

interface SEOData {
    title: string;
    description: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface ProductBridge {
    upsell_hook: string;
    tool_recommendation: string;
    button_label: string;
}

interface QuestionData {
    keyword: string;
    seo: SEOData;
    faqs: FAQItem[];
    product_bridge: ProductBridge;
}

// --- Mock Data ---
// In a real implementation, this would fetch from a database or the JSON file directly.
// For now, we replicate the "Moon" example from the provided JSON.

const MOON_SAMPLE: QuestionData = {
    keyword: "What Does The Moon Tarot Card Mean in Love?",
    seo: {
        title: "What Does The Moon Tarot Card Mean in Love? (Feelings & Guidance)",
        description: "The Moon exposes hidden emotions. Is the romance full of unspoken fears or intuitive bonds? See the next right step."
    },
    faqs: [
        {
            question: "What does The Moon mean as someone's feelings?",
            answer: "They care deeply but feel conflicted. Old wounds, doubts, or fantasies distort how they show up right now."
        },
        {
            question: "Is The Moon a warning about deception in love?",
            answer: "It signals half-truths or mixed signals. Observe actions, set gentle boundaries, and confirm facts before committing."
        },
        {
            question: "How should I act if The Moon appears in a love reading?",
            answer: "Lower the tempo, track dreams or intuitive hits, and schedule a calm conversation to air out the mystery."
        }
    ],
    product_bridge: {
        upsell_hook: "When The Moon pulls subconscious tides, precise emotional navigation matters more than speed.",
        tool_recommendation: "Moonlight Intuition Spread / Emotional Clarity Session",
        button_label: "Decode The Emotions"
    }
};

const TOWER_SAMPLE: QuestionData = {
    keyword: "What Does The Tower Tarot Card Mean?",
    seo: {
        title: "What Does The Tower Tarot Card Mean? (Warning & Advice)",
        description: "The Tower means sudden change. Is your relationship falling apart or breaking free? Find out what to do next."
    },
    faqs: [
        {
            question: "What does The Tower mean as someone's feelings?",
            answer: "They feel overwhelmed, volatile, and ready to explode. The relationship dynamic can no longer be suppressed."
        },
        {
            question: "Is The Tower a bad sign after a fight?",
            answer: "It confirms the conflict was inevitable. Old communication patterns have collapsed and cannot be rebuilt the same way."
        },
        {
            question: "What should I do if I draw The Tower in a love reading?",
            answer: "Stop resisting change, create safety plans, and focus on protecting your energy while the dust settles."
        }
    ],
    product_bridge: {
        upsell_hook: "When The Tower erupts, timing is everything—wrong moves accelerate collapse, right moves spark rebirth.",
        tool_recommendation: "Daily Action Oracle / Crisis Reading",
        button_label: "Start A Deep Reading"
    }
};

async function getQuestionData(slug: string): Promise<QuestionData> {
    // Simple mock routing based on slug keywords
    if (slug.includes("tower")) {
        return TOWER_SAMPLE;
    }
    // Default to Moon sample for any other slug for demonstration
    return MOON_SAMPLE;
}

// --- Page Components ---

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getQuestionData(slug);
    return {
        title: data.seo.title,
        description: data.seo.description,
    };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getQuestionData(slug);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">

            {/* --- Breadcrumb & Navigation --- */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 opacity-95 backdrop-blur-sm">
                <nav className="container mx-auto px-4 py-4">
                    <Link
                        href="/directory"
                        className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Directory
                    </Link>
                </nav>
            </div>

            <main className="container mx-auto px-4 py-8 max-w-4xl">

                {/* --- Header Section --- */}
                <header className="mb-10 text-center">
                    <div className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 uppercase tracking-wide">
                        Tarot Wisdom
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white mb-6">
                        {data.keyword}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {data.seo.description}
                    </p>
                </header>

                {/* --- Product Bridge / CTA --- */}
                <section className="mb-16 max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl p-8 md:p-12 text-center border border-purple-200 dark:border-purple-800/50">
                        <Star className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-6" />

                        <h2 className="text-xl md:text-2xl font-serif font-medium text-slate-800 dark:text-white mb-4 leading-relaxed">
                            "{data.product_bridge.upsell_hook}"
                        </h2>

                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/60 dark:bg-black/20 text-sm font-semibold text-purple-700 dark:text-purple-300 mb-8 border border-purple-100 dark:border-purple-800">
                            Recommended: {data.product_bridge.tool_recommendation}
                        </div>

                        <div>
                            <button className="inline-flex items-center px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all group">
                                {data.product_bridge.button_label}
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- FAQ Section --- */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 mr-3 text-purple-500" />
                        Common Questions & Guidance
                    </h2>
                    <div className="space-y-6">
                        {data.faqs.map((faq, index) => (
                            <article key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:shadow-md">
                                <h3 className="text-lg font-bold mb-3 text-slate-800 dark:text-purple-100">
                                    {faq.question}
                                </h3>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
