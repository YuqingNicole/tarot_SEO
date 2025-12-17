import Link from "next/link";

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <section className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome to the World of Tarot
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Discover the profound wisdom and symbolism of all 78 tarot cards.
                    Whether you're a beginner or an experienced reader, explore detailed
                    meanings, interpretations, and insights for each card in the tarot deck.
                </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-purple-200 dark:border-purple-800">
                    <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
                        🌟 Major Arcana
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        The 22 Major Arcana cards represent life's karmic and spiritual lessons.
                        They depict major life events and profound spiritual insights.
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <li>• The Fool to The World</li>
                        <li>• Major life themes</li>
                        <li>• Spiritual journey</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-pink-200 dark:border-pink-800">
                    <h3 className="text-2xl font-bold mb-4 text-pink-700 dark:text-pink-400">
                        ⚔️ Minor Arcana
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        The 56 Minor Arcana cards reflect daily events and challenges.
                        Divided into four suits: Wands, Cups, Swords, and Pentacles.
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <li>• 14 cards per suit</li>
                        <li>• Daily life situations</li>
                        <li>• Practical guidance</li>
                    </ul>
                </div>
            </section>

            <section className="text-center">
                <Link
                    href="/tarot-card-meanings"
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    Explore All 78 Tarot Cards →
                </Link>
            </section>

            <section className="mt-20 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-center">What You'll Find Here</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">📖</div>
                        <h4 className="font-bold mb-2">Detailed Meanings</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Comprehensive interpretations for both upright and reversed positions
                        </p>
                    </div>
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">🎨</div>
                        <h4 className="font-bold mb-2">Rich Symbolism</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Explore the deep symbolism and imagery of each tarot card
                        </p>
                    </div>
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">🔑</div>
                        <h4 className="font-bold mb-2">Key Insights</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quick reference keywords and essential meanings at a glance
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
