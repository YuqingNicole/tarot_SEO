import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { DECK } from "../lib/constants";
import { SEOCardData } from "../lib/types";

// Load environment variables from .env.local BEFORE importing service
const envPath = path.resolve(process.cwd(), ".env.local");
console.log(`📂 Loading env from: ${envPath}`);
dotenv.config({ path: envPath });

const OUTPUT_FILE = path.resolve(process.cwd(), "data/card-seo-data.json");
const DELAY_MS = 2000; // 2 seconds delay between requests to avoid rate limits

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateData() {
    // Dynamic import to ensure env vars are loaded first
    const { getCardSEOData } = await import("../services/geminiService");

    console.log("🚀 Starting SEO data generation...");
    console.log(`🔑 API Key present: ${!!process.env.NEXT_PUBLIC_GEMINI_API_KEY}`);

    // Create data directory if it doesn't exist
    const dataDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Load existing data if available
    let existingData: Record<string, SEOCardData> = {};
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            const fileContent = fs.readFileSync(OUTPUT_FILE, "utf-8");
            existingData = JSON.parse(fileContent);
            console.log(`📚 Loaded ${Object.keys(existingData).length} existing records.`);
        } catch (error) {
            console.error("⚠️ Error reading existing data, starting fresh.");
        }
    }

    const newData = { ...existingData };
    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const card of DECK) {
        if (newData[card.slug]) {
            // Check if the existing data is the "error" placeholder (check specific field content)
            if (newData[card.slug].love_reading === "Love reading requires API configuration.") {
                console.log(`🔄 Re-generating ${card.name} (found placeholder data)`);
            } else {
                console.log(`⏩ Skipping ${card.name} (already exists)`);
                skipCount++;
                continue;
            }
        }

        console.log(`🔮 Generating data for: ${card.name}...`);

        try {
            // Add a small delay for rate limiting
            if (successCount > 0) {
                await sleep(DELAY_MS);
            }

            const seoData = await getCardSEOData(card);

            // Check if we got fallback data despite having an API key (e.g. quota limit)
            if (seoData.love_reading === "Love reading requires API configuration.") {
                if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
                    console.warn(`⚠️ Got placeholder data for ${card.name} despite API key presence. Likely API error.`);
                    failCount++;
                    // Don't save this unless we really want to
                    continue;
                }
            }

            newData[card.slug] = seoData;
            successCount++;

            // Save progress periodically (every 5 cards)
            if (successCount % 5 === 0) {
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newData, null, 2));
                console.log("💾 Progress saved.");
            }

        } catch (error) {
            console.error(`❌ Failed to generate for ${card.name}:`, error);
            failCount++;
        }
    }

    // Final save
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newData, null, 2));

    console.log("\n✨ Generation Complete!");
    console.log(`✅ Success: ${successCount}`);
    console.log(`⏩ Skipped: ${skipCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📂 Data saved to: ${OUTPUT_FILE}`);
}

generateData().catch(console.error);
