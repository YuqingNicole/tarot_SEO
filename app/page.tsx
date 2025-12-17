import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Welcome to the World of Tarot | Discover Your Path
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Explore the ancient wisdom of tarot cards. Gain insights into your past, present, and future through the mystical art of divination.
                    </p>
                </section>

                {/* Introduction */}
                <section className="mb-16 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-purple-100 dark:border-purple-900">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">What is Tarot?</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Tarot is a powerful tool for self-reflection and guidance. Each card in the 78-card deck carries deep symbolic meaning, offering insights into various aspects of life including love, career, personal growth, and spiritual development.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Whether you're seeking clarity on a specific question or looking for general guidance, tarot can illuminate your path forward and help you make more informed decisions.
                        </p>
                    </div>
                </section>

                {/* Card Categories */}
                <section className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-700">
                        <div className="text-5xl mb-4">🌟</div>
                        <h3 className="text-2xl font-bold mb-3 text-purple-900 dark:text-purple-200">Major Arcana</h3>
                        <p className="text-purple-800 dark:text-purple-300 leading-relaxed">
                            22 powerful cards representing life's karmic and spiritual lessons. These cards speak to the soul's journey and major life events.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-2xl p-8 shadow-lg border border-pink-200 dark:border-pink-700">
                        <div className="text-5xl mb-4">⚔️</div>
                        <h3 className="text-2xl font-bold mb-3 text-pink-900 dark:text-pink-200">Minor Arcana</h3>
                        <p className="text-pink-800 dark:text-pink-300 leading-relaxed">
                            56 cards divided into four suits, reflecting the trials and tribulations of daily life and the energy flowing through your experiences.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
                    <Link
                        href="/library"
                        className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        Explore All 78 Tarot Cards →
                    </Link>
                </section>

                {/* Features */}
                <section className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">What You'll Find Here</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="text-4xl mb-3">📖</div>
                            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Detailed Meanings</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Comprehensive interpretations for both upright and reversed positions
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="text-4xl mb-3">🎨</div>
                            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Rich Symbolism</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Explore the deep symbolic meanings behind each card's imagery
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="text-4xl mb-3">✨</div>
                            <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Practical Guidance</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Real-world advice for love, career, health, and spiritual growth
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
