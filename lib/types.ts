// TypeScript type definitions for the Tarot application

export enum Suit {
    WANDS = "wands",
    CUPS = "cups",
    SWORDS = "swords",
    PENTACLES = "pentacles",
}

export enum Rank {
    ACE = "ace",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    FIVE = "5",
    SIX = "6",
    SEVEN = "7",
    EIGHT = "8",
    NINE = "9",
    TEN = "10",
    PAGE = "page",
    KNIGHT = "knight",
    QUEEN = "queen",
    KING = "king",
}

export interface TarotCard {
    id: number;
    name: string;
    slug: string;
    arcana: "major" | "minor";
    suit?: Suit;
    rank?: Rank;
    number?: number;
    keywords: string[];
    description: string;
    upright_meaning: string;
    reversed_meaning: string;
    symbolism: string;
    image_path: string;
    isReversed?: boolean;
}

export interface AIReading {
    keywords: string[];
    meaning: string;
    advice: string;
    interpretation: string;
}

export interface SpreadReading {
    overall_message: string;
    card_interpretations: {
        card_name: string;
        position: string;
        interpretation: string;
    }[];
    advice: string;
}

export interface SEOCardData {
    symbolism_detailed: string;
    love_reading: string;
    career_reading: string;
    health_reading: string;
    spiritual_reading: string;
    related_cards: string[];
    common_questions: {
        question: string;
        answer: string;
    }[];
}

export type ViewState = "GAME" | "LIBRARY" | "DETAIL";
export type GameState = "INPUT" | "SHUFFLE" | "PICK" | "READING";

export interface GameContext {
    view: ViewState;
    gameState: GameState;
    userQuestion: string;
    selectedCards: TarotCard[];
    aiReading: SpreadReading | null;
    currentCard: TarotCard | null;
}
