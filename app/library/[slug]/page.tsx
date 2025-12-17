import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DECK, getCardBySlug } from "@/lib/constants";
import CardDetailPage from "@/components/CardDetailPage";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return DECK.map((card) => ({
        slug: card.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const card = getCardBySlug(slug);

    if (!card) {
        return {
            title: "Card Not Found",
        };
    }

    return {
        title: `${card.name} Tarot Card Meaning`,
        description: `${card.description} Learn about ${card.name} upright and reversed meanings, symbolism, and keywords.`,
        keywords: [card.name, "tarot", ...card.keywords],
    };
}

import * as fs from "fs";
import * as path from "path";
import { SEOCardData } from "@/lib/types";

// ... existing imports ...

// Helper to get static data
function getStaticSEOData(slug: string): SEOCardData | null {
    try {
        const filePath = path.join(process.cwd(), "data", "card-seo-data.json");
        if (!fs.existsSync(filePath)) return null;

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(fileContent);
        return data[slug] || null;
    } catch (error) {
        console.error("Error reading static SEO data:", error);
        return null;
    }
}

export default async function TarotCardPage({ params }: Props) {
    const { slug } = await params;
    const card = getCardBySlug(slug);

    if (!card) {
        notFound();
    }

    const initialSeoData = getStaticSEOData(slug);

    return <CardDetailPage card={card} initialSeoData={initialSeoData} />;
}
