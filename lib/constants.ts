import { TarotCard, Suit, Rank } from "./types";

// Major Arcana names (0-21)
export const MAJOR_ARCANA_NAMES = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
];

// Minor Arcana suits
export const SUITS = [Suit.WANDS, Suit.CUPS, Suit.SWORDS, Suit.PENTACLES];

// Minor Arcana ranks
export const RANKS = [
    Rank.ACE,
    Rank.TWO,
    Rank.THREE,
    Rank.FOUR,
    Rank.FIVE,
    Rank.SIX,
    Rank.SEVEN,
    Rank.EIGHT,
    Rank.NINE,
    Rank.TEN,
    Rank.PAGE,
    Rank.KNIGHT,
    Rank.QUEEN,
    Rank.KING,
];

// Suit symbols and colors
export const SUIT_INFO = {
    [Suit.WANDS]: { symbol: "🔥", color: "text-red-600", element: "Fire" },
    [Suit.CUPS]: { symbol: "💧", color: "text-blue-600", element: "Water" },
    [Suit.SWORDS]: { symbol: "⚔️", color: "text-gray-600", element: "Air" },
    [Suit.PENTACLES]: { symbol: "🪙", color: "text-yellow-600", element: "Earth" },
};

// Helper function to create slug from name
function createSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, "-");
}

// Generate Major Arcana cards
function generateMajorArcana(): TarotCard[] {
    return MAJOR_ARCANA_NAMES.map((name, index) => ({
        id: index,
        name,
        slug: createSlug(name),
        arcana: "major" as const,
        number: index,
        keywords: [],
        description: `${name} represents a major life theme or spiritual lesson.`,
        upright_meaning: `The upright ${name} signifies...`,
        reversed_meaning: `The reversed ${name} indicates...`,
        symbolism: `${name} is rich with symbolic meaning...`,
        image_path: `/images/cards/${String(index).padStart(2, "0")}-${createSlug(name)}.jpg`,
    }));
}

// Generate Minor Arcana cards
function generateMinorArcana(): TarotCard[] {
    const cards: TarotCard[] = [];
    let id = 22; // Start after Major Arcana

    SUITS.forEach((suit) => {
        RANKS.forEach((rank) => {
            const rankName = rank === Rank.ACE ? "Ace" : rank.charAt(0).toUpperCase() + rank.slice(1);
            const suitName = suit.charAt(0).toUpperCase() + suit.slice(1);
            const name = `${rankName} of ${suitName}`;

            cards.push({
                id: id++,
                name,
                slug: createSlug(name),
                arcana: "minor" as const,
                suit,
                rank,
                keywords: [],
                description: `The ${name} represents...`,
                upright_meaning: `Upright, the ${name} suggests...`,
                reversed_meaning: `Reversed, the ${name} warns...`,
                symbolism: `The ${name} features symbolic imagery...`,
                image_path: `/images/cards/${createSlug(name)}.jpg`,
            });
        });
    });

    return cards;
}

// Generate complete deck of 78 cards
export function generateDeck(): TarotCard[] {
    return [...generateMajorArcana(), ...generateMinorArcana()];
}

// Export the complete deck
export const DECK = generateDeck();

// Helper function to get card by slug
export function getCardBySlug(slug: string): TarotCard | undefined {
    return DECK.find((card) => card.slug === slug);
}

// Helper function to get random cards
export function getRandomCards(count: number): TarotCard[] {
    const shuffled = [...DECK].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((card) => ({
        ...card,
        isReversed: Math.random() > 0.5,
    }));
}

// Filter cards by arcana type
export function filterByArcana(arcana: "major" | "minor"): TarotCard[] {
    return DECK.filter((card) => card.arcana === arcana);
}

// Filter cards by suit (Minor Arcana only)
export function filterBySuit(suit: Suit): TarotCard[] {
    return DECK.filter((card) => card.suit === suit);
}
