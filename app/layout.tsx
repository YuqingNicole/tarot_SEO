import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";

const quicksand = Quicksand({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Tarot Card Meanings - Complete Guide to 78 Tarot Cards",
        template: "%s | Tarot Card Meanings"
    },
    description: "Discover the meanings of all 78 tarot cards including the Major Arcana and Minor Arcana. Learn about upright and reversed interpretations, symbolism, and keywords for each card.",
    keywords: ["tarot", "tarot cards", "tarot meanings", "major arcana", "minor arcana", "tarot card readings", "divination"],
    authors: [{ name: "Tarot" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Tarot Card Meanings",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${quicksand.className} antialiased`}>
                <div className="stars"></div>

                <TopBar />

                <main className="min-h-screen">
                    {children}
                </main>

                <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
                    <div className="container mx-auto px-4 text-center">
                        <p>&copy; {new Date().getFullYear()} Tarot Card Meanings. All rights reserved.</p>
                        <p className="text-sm mt-2 text-gray-400">
                            Explore the wisdom of the tarot through detailed card meanings and interpretations.
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
