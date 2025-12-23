import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const KEYWORDS_PATH = path.resolve(process.cwd(), "data/meaning-keywords.json");
const OUTPUT_PATH = path.resolve(process.cwd(), "data/meaning-seo-generated.json");

const genAI = new GoogleGenerativeAI(API_KEY);

const meaningDataSchema = {
    type: SchemaType.OBJECT,
    properties: {
        id: { type: SchemaType.STRING },
        slug: { type: SchemaType.STRING },
        question: { type: SchemaType.STRING },
        shortAnswer: { type: SchemaType.STRING },
        detailedAnswer: { type: SchemaType.STRING },
        tags: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
        },
        relatedCards: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    name: { type: SchemaType.STRING },
                    meaning: { type: SchemaType.STRING }
                },
                required: ["name", "meaning"]
            }
        },
        relatedQuestions: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    question: { type: SchemaType.STRING },
                    slug: { type: SchemaType.STRING }
                },
                required: ["question", "slug"]
            }
        }
    },
    required: ["id", "slug", "question", "shortAnswer", "detailedAnswer", "tags", "relatedCards", "relatedQuestions"]
};

const LOG_PATH = path.resolve(process.cwd(), "scripts/generation.log");

function log(message: string) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;
    console.log(formattedMessage);
    fs.appendFileSync(LOG_PATH, formattedMessage + "\n");
}

async function generateMeaningData() {
    if (!API_KEY) {
        throw new Error("NEXT_PUBLIC_GEMINI_API_KEY not found in .env.local.");
    }

    log("Starting batch generation...");

    // Clear old log
    if (fs.existsSync(LOG_PATH)) fs.unlinkSync(LOG_PATH);
    log("Logging to scripts/generation.log");

    if (!fs.existsSync(KEYWORDS_PATH)) {
        throw new Error(`Keywords file not found at ${KEYWORDS_PATH}`);
    }

    const keywords: string[] = JSON.parse(fs.readFileSync(KEYWORDS_PATH, "utf-8"));

    let results: any[] = [];
    if (fs.existsSync(OUTPUT_PATH)) {
        try {
            results = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
            log(`Loaded ${results.length} existing results.`);
        } catch (e) {
            log("Error reading existing results, starting fresh.");
        }
    }

    const processedSlugs = new Set(results.map(r => r.slug));
    const pendingKeywords = keywords.filter(k => !processedSlugs.has(k.toLowerCase().replace(/\s+/g, "-")));

    log(`Total keywords: ${keywords.length}. Remaining to process: ${pendingKeywords.length}`);

    if (pendingKeywords.length === 0) {
        log("All keywords already processed.");
        return;
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: meaningDataSchema as any,
        },
    });

    for (let i = 0; i < pendingKeywords.length; i++) {
        const keyword = pendingKeywords[i];
        const slug = keyword.toLowerCase().replace(/\s+/g, "-");
        log(`[${i + 1}/${pendingKeywords.length}] Generating: ${keyword}`);

        const prompt = `
### Role
You are a world-class Tarot Consultant and Senior SEO Content Strategist. Your goal is to create a high-ranking, authoritative landing page for: "${keyword}"

### Task
Generate a professional, empathetic response following E-E-A-T guidelines.

### Content Requirements
1. **Short Answer**: Concise "Bottom Line" summary.
2. **Detailed Answer (HTML)**: 
   - **Core Meaning**: Archetypal energy.
   - **Love & Relationships**: Insights for singles/couples.
   - **Career & Finance**: Professional/money advice.
   - **Actionable Advice**: "What to do next".
   - *Note*: Use <h3> and <p> only.
3. **Tags**: Max 5 relevant SEO tags.
4. **Related Cards**: 3 relevant cards.
5. **Related Questions**: 3-4 PAA questions.

### Constraints
- Language: English.
- Output: Strict JSON.
{
  "id": "${Date.now()}",
  "slug": "${slug}",
  "question": "${keyword}",
  "shortAnswer": "...",
  "detailedAnswer": "...",
  "tags": [...],
  "relatedCards": [{"name": "...", "meaning": "..."}],
  "relatedQuestions": [{"question": "...", "slug": "..."}]
}
`;

        try {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            const data = JSON.parse(responseText);

            results.push(data);

            // Incremental save
            fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
            log(`Successfully saved: ${keyword}`);

            // Wait to respect rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error: any) {
            log(`Error for ${keyword}: ${error.message}`);
            // Wait longer on error
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    log("Batch generation process finished.");
}

generateMeaningData().catch(e => log(`FATAL ERROR: ${e.message}`));
