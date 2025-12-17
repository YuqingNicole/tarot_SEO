import TarotLibrary from "@/components/TarotLibrary";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tarot Card Library - All 78 Cards",
    description: "Browse the complete tarot deck of 78 cards. Filter by Major Arcana, Minor Arcana, or suit. Search and explore detailed meanings for each card.",
};

export default function LibraryPage() {
    return <TarotLibrary />;
}
