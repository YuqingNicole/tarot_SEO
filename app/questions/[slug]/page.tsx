import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Sparkles, Star, MessageCircle, Share2, Compass, ChevronDown } from "lucide-react";

// --- Data Interfaces ---
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
    if (slug.includes("tower")) return TOWER_SAMPLE;
    return MOON_SAMPLE;
}

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
        <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-slate-900 dark:text-slate-100 selection:bg-purple-100">

            {/* --- Sticky SubTopBar (Conversion Focus) --- */}
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
                {/* --- Responsive Header --- */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-20">
                    <Link
                        href="/directory"
                        className="group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-purple-600 transition-colors mb-6 md:mb-8"
                    >
                        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Directory
                    </Link>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] max-w-4xl">
                        {data.keyword}
                    </h1>

                    <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 md:mb-8"></div>

                    <p className="text-lg md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto px-2">
                        {data.seo.description}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* --- Content Column --- */}
                    <div className="space-y-8 md:space-y-12 lg:space-y-16">
                        {data.faqs.map((faq, index) => (
                            <details key={index} className="group pb-8 md:pb-12 border-b border-slate-100 dark:border-slate-900 last:border-0" open={index === 0}>
                                <summary className="flex items-center justify-between cursor-pointer list-none list-inside outline-none">
                                    <div className="relative">
                                        <div className="absolute -left-4 md:-left-6 top-0 md:top-1 text-purple-200 dark:text-purple-900/40 font-bold text-2xl md:text-3xl select-none opacity-50 group-hover:opacity-100 transition-opacity group-open:text-purple-500/30">Q</div>
                                        <h2 className="text-xl md:text-2xl font-bold pr-8 text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 transition-colors">
                                            {faq.question}
                                        </h2>
                                    </div>
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors">
                                        <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                                    </div>
                                </summary>
                                <div className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-light pl-1 md:pl-2 border-l-2 border-purple-100 dark:border-purple-900/30 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* --- Action Buttons (Responsive) --- */}
                    <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex gap-6 sm:gap-8 text-slate-400">
                            <button className="hover:text-purple-600 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                <Share2 className="w-4 h-4" /> Share Answer
                            </button>
                            <button className="hover:text-purple-600 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                <Compass className="w-4 h-4" /> Discover More
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
