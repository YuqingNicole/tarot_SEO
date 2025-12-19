import Link from "next/link";
import { Metadata } from "next";
import { DECK, SUIT_INFO, filterByArcana, filterBySuit } from "@/lib/constants";
import { Suit } from "@/lib/types";

export const metadata: Metadata = {
    title: "Tarot Card Meanings Directory - Complete List",
    description: "A comprehensive directory of all 78 Tarot cards. Browse detailed meanings for Major and Minor Arcana cards, organized by suit.",
};

export default function DirectoryPage() {
    const majorArcana = filterByArcana("major");
    const wands = filterBySuit(Suit.WANDS);
    const cups = filterBySuit(Suit.CUPS);
    const swords = filterBySuit(Suit.SWORDS);
    const pentacles = filterBySuit(Suit.PENTACLES);

    const suitGroups = [
        { title: "Wands", cards: wands, info: SUIT_INFO[Suit.WANDS] },
        { title: "Cups", cards: cups, info: SUIT_INFO[Suit.CUPS] },
        { title: "Swords", cards: swords, info: SUIT_INFO[Suit.SWORDS] },
        { title: "Pentacles", cards: pentacles, info: SUIT_INFO[Suit.PENTACLES] },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Tarot Card Directory</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Complete index of all 78 tarot cards and their meanings.
                    </p>
                </header>

                <div className="space-y-12">
                    {/* Major Arcana */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                            Major Arcana
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {majorArcana.map((card) => (
                                <Link
                                    key={card.slug}
                                    href={`/cards/${card.slug}`}
                                    className="flex items-center group p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                                >
                                    <span className="w-6 text-sm text-gray-400 font-mono">{String(card.number).padStart(2, '0')}</span>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300">
                                        {card.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Minor Arcana by Suit */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {suitGroups.map((group) => (
                            <section key={group.title} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                                <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${group.info.color}`}>
                                    <span>{group.info.symbol}</span>
                                    <span>Suit of {group.title}</span>
                                </h2>
                                <div className="grid gap-3">
                                    {group.cards.map((card) => (
                                        <Link
                                            key={card.slug}
                                            href={`/cards/${card.slug}`}
                                            className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1"
                                        >
                                            {card.name}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/cards" className="text-purple-600 hover:text-purple-800 font-medium">
                        View Visual Library &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
