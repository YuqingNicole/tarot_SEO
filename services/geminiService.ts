import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { TarotCard, AIReading, SpreadReading, SEOCardData } from "@/lib/types";

// Initialize Gemini AI
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

// JSON Schema for single card reading
const singleCardSchema = {
    type: SchemaType.OBJECT as const,
    properties: {
        keywords: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "3-5 key themes or concepts",
        },
        meaning: {
            type: SchemaType.STRING,
            description: "Core meaning of the card in this context",
        },
        advice: {
            type: SchemaType.STRING,
            description: "Practical advice based on the card",
        },
        interpretation: {
            type: SchemaType.STRING,
            description: "Detailed interpretation for the user's question",
        },
    },
    required: ["keywords", "meaning", "advice", "interpretation"],
};

// JSON Schema for spread reading
const spreadReadingSchema = {
    type: SchemaType.OBJECT as const,
    properties: {
        overall_message: {
            type: SchemaType.STRING,
            description: "Overall message from the entire spread",
        },
        card_interpretations: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT as const,
                properties: {
                    card_name: { type: SchemaType.STRING },
                    position: { type: SchemaType.STRING },
                    interpretation: { type: SchemaType.STRING },
                },
                required: ["card_name", "position", "interpretation"],
            },
        },
        advice: {
            type: SchemaType.STRING,
            description: "Actionable advice based on the reading",
        },
    },
    required: ["overall_message", "card_interpretations", "advice"],
};

// JSON Schema for SEO card data
const seoDataSchema = {
    type: SchemaType.OBJECT as const,
    properties: {
        symbolism_detailed: {
            type: SchemaType.STRING,
            description: "Detailed symbolism explanation (200+ words)",
        },
        love_reading: {
            type: SchemaType.STRING,
            description: "Love and relationships interpretation",
        },
        career_reading: {
            type: SchemaType.STRING,
            description: "Career and work interpretation",
        },
        health_reading: {
            type: SchemaType.STRING,
            description: "Health and wellness interpretation",
        },
        spiritual_reading: {
            type: SchemaType.STRING,
            description: "Spiritual growth interpretation",
        },
        related_cards: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "3-5 related tarot cards",
        },
        common_questions: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT as const,
                properties: {
                    question: { type: SchemaType.STRING },
                    answer: { type: SchemaType.STRING },
                },
                required: ["question", "answer"],
            },
            description: "3-5 common questions about this card",
        },
    },
    required: [
        "symbolism_detailed",
        "love_reading",
        "career_reading",
        "health_reading",
        "spiritual_reading",
        "related_cards",
        "common_questions",
    ],
};

/**
 * Get AI reading for a single tarot card
 */
export async function getSingleCardReading(
    card: TarotCard,
    question: string = ""
): Promise<AIReading> {
    if (!API_KEY) {
        return {
            keywords: ["intuition", "guidance", "insight"],
            meaning: "Please configure your Gemini API key to get AI readings.",
            advice: "Add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.",
            interpretation: "AI readings are currently unavailable.",
        };
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: singleCardSchema as any,
            },
        });

        const orientation = card.isReversed ? "reversed" : "upright";
        const prompt = `You are a wise and experienced Tarot Master with deep knowledge of symbolism and divination.

Card: ${card.name} (${orientation})
User's Question: ${question || "General guidance"}

Provide a thoughtful tarot reading for this card. Consider:
- The card's traditional meaning
- The ${orientation} orientation
- How it relates to the user's question
- Practical, actionable advice

Be mystical yet grounded, poetic yet clear.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return JSON.parse(response) as AIReading;
    } catch (error) {
        console.error("Error getting AI reading:", error);
        return {
            keywords: [card.keywords[0] || "mystery"],
            meaning: card.isReversed ? card.reversed_meaning : card.upright_meaning,
            advice: "Trust your intuition with this card.",
            interpretation: card.description,
        };
    }
}

/**
 * Get AI reading for a spread of multiple cards
 */
export async function getSpreadReading(
    cards: TarotCard[],
    question: string
): Promise<SpreadReading> {
    if (!API_KEY) {
        return {
            overall_message: "Please configure your Gemini API key to get AI readings.",
            card_interpretations: cards.map((card, index) => ({
                card_name: card.name,
                position: `Position ${index + 1}`,
                interpretation: card.isReversed ? card.reversed_meaning : card.upright_meaning,
            })),
            advice: "Add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.",
        };
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: spreadReadingSchema as any,
            },
        });

        const cardDescriptions = cards
            .map((card, index) => {
                const orientation = card.isReversed ? "reversed" : "upright";
                return `Position ${index + 1}: ${card.name} (${orientation})`;
            })
            .join("\n");

        const prompt = `You are a wise and experienced Tarot Master performing a ${cards.length}-card reading.

User's Question: ${question}

Cards drawn:
${cardDescriptions}

Provide a comprehensive tarot reading that:
1. Interprets each card in its position
2. Shows how the cards relate to each other
3. Answers the user's question
4. Offers practical, actionable advice

Be mystical, insightful, and empowering.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return JSON.parse(response) as SpreadReading;
    } catch (error) {
        console.error("Error getting spread reading:", error);
        return {
            overall_message: "The cards speak of a journey ahead.",
            card_interpretations: cards.map((card, index) => ({
                card_name: card.name,
                position: `Position ${index + 1}`,
                interpretation: card.isReversed ? card.reversed_meaning : card.upright_meaning,
            })),
            advice: "Trust your intuition and inner wisdom.",
        };
    }
}

/**
 * Get comprehensive SEO data for a card detail page
 */
export async function getCardSEOData(card: TarotCard): Promise<SEOCardData> {
    if (!API_KEY) {
        return {
            symbolism_detailed: card.symbolism,
            love_reading: "Love reading requires API configuration.",
            career_reading: "Career reading requires API configuration.",
            health_reading: "Health reading requires API configuration.",
            spiritual_reading: "Spiritual reading requires API configuration.",
            related_cards: ["The Fool", "The Magician", "The High Priestess"],
            common_questions: [
                {
                    question: `What does ${card.name} mean?`,
                    answer: card.description,
                },
            ],
        };
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: seoDataSchema as any,
            },
        });

        const prompt = `You are a Tarot expert creating comprehensive content for the card: ${card.name}

Generate detailed, SEO-optimized content including:
1. Detailed symbolism analysis (200+ words)
2. Love & relationships interpretation
3. Career & work interpretation
4. Health & wellness interpretation
5. Spiritual growth interpretation
6. 3-5 related tarot cards (by name)
7. 3-5 common questions people ask about this card with answers

Make the content informative, engaging, and optimized for search engines while maintaining mystical authenticity.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return JSON.parse(response) as SEOCardData;
    } catch (error) {
        console.error("Error getting SEO data:", error);
        return {
            symbolism_detailed: card.symbolism,
            love_reading: card.upright_meaning,
            career_reading: card.upright_meaning,
            health_reading: card.upright_meaning,
            spiritual_reading: card.upright_meaning,
            related_cards: ["The Fool", "The Magician", "The High Priestess"],
            common_questions: [
                {
                    question: `What does ${card.name} mean in a reading?`,
                    answer: card.description,
                },
            ],
        };
    }
}
