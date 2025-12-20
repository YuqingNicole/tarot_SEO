import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Share2, Sparkles, MessageCircle, Star, Compass } from "lucide-react";

// --- Mock Data & Interfaces ---

interface QuestionData {
    id: string;
    slug: string;
    question: string;
    shortAnswer: string;
    detailedAnswer: string;
    tags: string[];
    relatedCards: Array<{
        name: string;
        imagePlaceholder: string; // Using emoji for now
        meaning: string;
    }>;
    relatedQuestions: Array<{
        question: string;
        slug: string;
    }>;
}

// Emulate a database fetch
async function getQuestionData(slug: string): Promise<QuestionData> {
    // In a real app, you would fetch from DB or CMS based on slug
    // For demonstration, we return static data for any slug
    const decodedSlug = decodeURIComponent(slug).replace(/-/g, " ");

    return {
        id: "1",
        slug: slug,
        question: decodedSlug === "slug" ? "What does the Fool card mean for my love life?" : decodedSlug, // Default fallback or formatted slug
        shortAnswer: "The Fool in a love reading suggests a new beginning, spontaneity, and a leap of faith. It indicates an exciting, carefree romance or the start of a new chapter in an existing relationship, urging you to trust the universe and embrace the unknown.",
        detailedAnswer: `
      <p>When the <strong>The Fool</strong> appears in a love reading, it is a powerful omen of new beginnings. It signifies a time of optimism, innocence, and freedom.</p>
      
      <h3>For Singles</h3>
      <p>If you are single, The Fool is a green light from the universe. It suggests that you may be about to embark on a new romantic adventure. This person might be unlike anyone you've dated before—someone who brings out your playful usage.</p>
      
      <h3>For Couples</h3>
      <p>In an established relationship, The Fool can indicate taking the relationship to a new level (like getting engaged or moving in together) or simply injecting more fun and spontaneity into your bond. It's a reminder not to take things too seriously.</p>
      
      <h3>Potential Challenges</h3>
      <p>Be mindful of naivety. The Fool can sometimes rush in without looking. Ensure that while you are opening your heart, you aren't ignoring red flags completely.</p>
    `,
        tags: ["Major Arcana", "Love & Relationships", "New Beginnings"],
        relatedCards: [
            {
                name: "The Magician",
                imagePlaceholder: "🎩",
                meaning: "Manifesting your desires into reality."
            },
            {
                name: "The Lovers",
                imagePlaceholder: "💕",
                meaning: "Deep connection and important choices."
            }
        ],
        relatedQuestions: [
            { question: "Is he the one?", slug: "is-he-the-one" },
            { question: "Will my ex come back?", slug: "will-my-ex-come-back" },
            { question: "What are his true feelings for me?", slug: "what-are-his-true-feelings" },
            { question: "Should I make the first move?", slug: "should-i-make-the-first-move" }
        ]
    };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getQuestionData(slug);

    return {
        title: `${data.question} | Tarot Wisdom`,
        description: data.shortAnswer.substring(0, 160) + "...",
    };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getQuestionData(slug);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-950 dark:to-purple-950">

            {/* --- Breadcrumb & Navigation --- */}
            <nav className="container mx-auto px-4 py-6">
                <Link
                    href="/questions"
                    className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Questions
                </Link>
            </nav>

            <main className="container mx-auto px-4 pb-20">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* --- Main Content Column (Left/Center) --- */}
                    <div className="lg:col-span-8">

                        {/* Header Section */}
                        <header className="mb-8">
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {data.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
                                {data.question}
                            </h1>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-6">
                                <span className="flex items-center"><Sparkles className="w-4 h-4 mr-1" /> Tarot Wisdom</span>
                                <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> 3 min read</span>
                            </div>
                        </header>

                        {/* Featured Answer Card */}
                        <section className="relative overflow-hidden rounded-2xl p-8 mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-purple-100 dark:border-purple-900 shadow-xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Star className="w-24 h-24 text-purple-500" />
                            </div>
                            <h2 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-100 flex items-center">
                                <Compass className="w-5 h-5 mr-2 text-purple-500" />
                                The Short Answer
                            </h2>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200 font-medium">
                                {data.shortAnswer}
                            </p>
                        </section>

                        {/* Detailed Content */}
                        <article className="prose prose-lg prose-purple dark:prose-invert max-w-none bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <div dangerouslySetInnerHTML={{ __html: data.detailedAnswer }} />

                            {/* Related Cards Context */}
                            <div className="not-prose mt-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                                    <span className="text-2xl mr-2">🃏</span> Related Cards to Watch For
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {data.relatedCards.map((card, idx) => (
                                        <div key={idx} className="flex items-start p-4 rounded-xl bg-purple-50 dark:bg-gray-800/50 border border-purple-100 dark:border-purple-900/50 hover:shadow-md transition-shadow">
                                            <div className="text-3xl mr-4 bg-white dark:bg-gray-700 rounded-lg w-12 h-12 flex items-center justify-center shadow-sm">
                                                {card.imagePlaceholder}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-gray-100">{card.name}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{card.meaning}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* User Interaction / Feedback */}
                        <div className="mt-10 flex justify-center gap-4">
                            <button className="flex items-center px-6 py-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </button>
                            <button className="flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                                <MessageCircle className="w-4 h-4 mr-2" /> Get a Personal Reading
                            </button>
                        </div>

                    </div>

                    {/* --- Sidebar (Right) --- */}
                    <aside className="lg:col-span-4 space-y-8">

                        {/* Context/Sticky Box or Ad Space */}
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800 sticky top-24">
                            <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-100">Want deeper insight?</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                The cards tell a story, but your intuition holds the key. Connect with a professional reader today.
                            </p>
                            <button className="w-full py-2 rounded-lg bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 font-semibold text-sm hover:bg-purple-50 transition-colors shadow-sm">
                                Start Free Reading
                            </button>
                        </div>

                        {/* Related Questions Grid */}
                        <div>
                            <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white px-2">Explore More Questions</h3>
                            <div className="space-y-3">
                                {data.relatedQuestions.map(rq => (
                                    <Link
                                        key={rq.slug}
                                        href={`/questions/${rq.slug}`}
                                        className="block p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
                                    >
                                        <h4 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {rq.question}
                                        </h4>
                                        <span className="text-xs text-gray-400 mt-2 block">Read answer →</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
}
