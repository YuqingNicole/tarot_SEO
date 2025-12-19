import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Note: You may need to adjust imports depending on your tsconfig/module settings
// If direct import fails in seed script, you can assume logic similar to lib/constants
// For simplicity in this standalone script, we'll read the JSON directly.

async function main() {
    const seoDataPath = path.join(__dirname, '../data/card-seo-data.json');
    const seoDataRaw = fs.readFileSync(seoDataPath, 'utf-8');
    const seoData = JSON.parse(seoDataRaw);

    console.log('Start seeding...');

    // We iterate through the JSON keys (slugs) to match them with our expected cards
    for (const slug of Object.keys(seoData)) {
        const data = seoData[slug];

        // Create or Update Card
        // Note: In a real scenario, you'd map the full DECK properties here. 
        // We'll infer some basic info from the seed data or partial updates.

        // Mocking minimal card data extraction from slug/data for seeding purposes
        // Ideally, import DECK from src/lib/constants to get canonical data
        const name = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const card = await prisma.card.upsert({
            where: { slug },
            update: {},
            create: {
                slug,
                name,
                // Defaulting arcana/suit/rank/image for seed example; 
                // Real implementation should reference constant data
                arcana: "unknown",
                imagePath: `/images/tarot%20cards/${slug}.jpg`,
            },
        });

        // Create or Update SEO Data
        await prisma.cardSEO.upsert({
            where: { cardId: card.id },
            update: {
                symbolismDetailed: data.symbolism_detailed,
                loveReading: data.love_reading,
                careerReading: data.career_reading,
                healthReading: data.health_reading,
                spiritualReading: data.spiritual_reading,
                commonQuestions: data.common_questions,
                relatedCards: data.related_cards,
            },
            create: {
                cardId: card.id,
                symbolismDetailed: data.symbolism_detailed,
                loveReading: data.love_reading,
                careerReading: data.career_reading,
                healthReading: data.health_reading,
                spiritualReading: data.spiritual_reading,
                commonQuestions: data.common_questions,
                relatedCards: data.related_cards,
                keywords: []
            },
        });

        console.log(`Seeded ${slug}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
