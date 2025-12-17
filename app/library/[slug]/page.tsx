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

export default async function TarotCardPage({ params }: Props) {
    const { slug } = await params;
    const card = getCardBySlug(slug);

    if (!card) {
        notFound();
    }

    return <CardDetailPage card={card} />;
}
