import Link from "next/link";
import { Metadata } from "next";
import { DECK } from "@/lib/constants";

export const metadata: Metadata = {
    title: "All 78 Tarot Card Meanings",
    description: "Complete directory of all 78 tarot cards including 22 Major Arcana and 56 Minor Arcana cards. Click any card to learn its detailed meaning.",
};

export default function TarotCardMeaningsPage() {
    const majorArcana = DECK.filter(card => card.arcana === "major");
    const minorArcana = DECK.filter(card => card.arcana === "minor");

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">All Tarot Card Meanings</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                Explore the complete tarot deck. Click on any card to discover its detailed meaning, symbolism, and interpretations.
            </p>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-400">
                    🌟 Major Arcana ({majorArcana.length} cards)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {majorArcana.map((card) => (
                        <Link
                            key={card.id}
                            href={`/tarot-card-meanings/${card.slug}`}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow p-4 text-center border border-purple-200 dark:border-purple-800 hover:border-purple-400"
                        >
                            <div className="text-4xl mb-2">🎴</div>
                            <h3 className="font-semibold text-sm">{card.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {minorArcana.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-pink-700 dark:text-pink-400">
                        ⚔️ Minor Arcana ({minorArcana.length} cards)
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {minorArcana.map((card) => (
                            <Link
                                key={card.id}
                                href={`/tarot-card-meanings/${card.slug}`}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow p-4 text-center border border-pink-200 dark:border-pink-800 hover:border-pink-400"
                            >
                                <div className="text-4xl mb-2">🎴</div>
                                <h3 className="font-semibold text-sm">{card.name}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
