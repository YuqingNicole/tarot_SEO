import { MetadataRoute } from "next";
import { DECK } from "@/lib/constants";
import meaningData from "@/data/meaning-seo-generated.json";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://tarotarot.cards").replace(/\/$/, "");

    // 1. Static Routes
    const staticRoutes = [
        "",
        "/cards",
        "/meaning",
        "/questions",
        "/directory",
        "/privacy",
        "/terms",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    // 2. Card Routes (78 cards)
    const cardRoutes = DECK.map((card) => ({
        url: `${baseUrl}/cards/${card.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // 3. Meaning Routes (from top-level slugs in JSON)
    const meaningDataArray = meaningData as any[];
    const meaningRoutes = meaningDataArray.map((item: any) => ({
        url: `${baseUrl}/meaning/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // 4. Question Routes (from unique slugs in relatedQuestions)
    const allQuestionSlugs = new Set<string>();
    meaningDataArray.forEach((item: any) => {
        if (item.relatedQuestions) {
            item.relatedQuestions.forEach((rq: any) => {
                if (rq.slug) {
                    allQuestionSlugs.add(rq.slug);
                }
            });
        }
    });

    const questionRoutes = Array.from(allQuestionSlugs).map((slug) => ({
        url: `${baseUrl}/questions/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }));

    return [...staticRoutes, ...cardRoutes, ...meaningRoutes, ...questionRoutes];
}