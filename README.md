# Tarot SEO - Interactive Tarot Reading App

An interactive tarot card reading application built with Next.js 15, featuring Google Gemini AI integration for dynamic card interpretations.

## 🌟 Features

- **78 Tarot Cards**: Complete deck with 22 Major Arcana and 56 Minor Arcana cards
- **AI-Powered Readings**: Google Gemini AI provides personalized interpretations
- **Interactive Components**: 3D card flip animations and smooth transitions
- **SEO Optimized**: Static generation for all card detail pages
- **Filterable Library**: Search and filter cards by suit or arcana type
- **Responsive Design**: Beautiful UI that works on all devices

## 🏗️ Architecture

### Data Layer (`lib/`)
- **`types.ts`**: TypeScript interfaces and enums for type safety
- **`constants.ts`**: Programmatic generation of all 78 tarot cards

### Service Layer (`services/`)
- **`geminiService.ts`**: Google Gemini AI integration with JSON schema constraints
  - Single card readings
  - Multi-card spread readings
  - SEO content generation

### Components (`components/`)
- **`Card.tsx`**: Dual-mode 3D flip card component
- **`TarotLibrary.tsx`**: Filterable card grid with search
- **`CardDetailPage.tsx`**: Comprehensive card detail view with AI content

### Pages (`app/`)
- **`/`**: Homepage (future: interactive game mode)
- **`/library`**: Browsable card library
- **`/tarot-card-meanings`**: All cards listing
- **`/tarot-card-meanings/[slug]`**: Individual card detail pages (SSG)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your Gemini API key

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Key Technologies

- **Next.js 15**: App Router with Server Components
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Google Gemini AI**: Structured JSON responses
- **Lucide React**: Beautiful icons

## 📁 Project Structure

```
tarot_SEO/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles & animations
│   ├── library/             # Card library page
│   └── tarot-card-meanings/ # Card detail pages
├── components/              # React components
│   ├── Card.tsx            # 3D flip card
│   ├── TarotLibrary.tsx    # Filterable grid
│   └── CardDetailPage.tsx  # Detail view
├── lib/                     # Core logic
│   ├── types.ts            # TypeScript definitions
│   └── constants.ts        # Deck generation
├── services/                # External services
│   └── geminiService.ts    # AI integration
└── public/                  # Static assets
    └── images/cards/       # Card images
```

## 🔮 How It Works

### 1. Data Generation
The `lib/constants.ts` file programmatically generates all 78 cards:
- 22 Major Arcana (The Fool through The World)
- 56 Minor Arcana (14 cards × 4 suits)

### 2. AI Integration
The `geminiService.ts` uses JSON Schema to enforce structured responses:
```typescript
const schema = {
  type: SchemaType.OBJECT,
  properties: {
    keywords: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    meaning: { type: SchemaType.STRING },
    // ...
  }
};
```

### 3. Component Architecture
- **Controlled Mode**: Cards in spreads receive position/rotation from parent
- **Self-Controlled Mode**: Cards manage their own flip state and AI readings

### 4. SEO Strategy
- Static generation of all 78 card pages at build time
- Dynamic metadata for each card
- AI-generated comprehensive content (symbolism, life area readings, FAQs)

## 🎯 Future Enhancements

- [ ] Interactive card drawing game mode
- [ ] Card wheel animation with `requestAnimationFrame`
- [ ] User authentication and reading history
- [ ] Multiple spread types (Celtic Cross, Three-Card, etc.)
- [ ] Save and share readings

## 📝 License

MIT

## 🙏 Acknowledgments

- Tarot card meanings based on traditional interpretations
- AI powered by Google Gemini
- Built with Next.js and React

## Current Routing & Architecture Snapshot

- **Root layout** (`app/layout.tsx`): wraps every page with shared `TopBar`, `Footer`, Quicksand font, and global metadata, so all routes inherit the same SEO defaults.
- **Data layer** (`lib/constants.ts` + `data/card-seo-data.json`): generates the 78-card `DECK`, helpers (`filterByArcana`, `filterBySuit`, `getCardBySlug`), and card-specific SEO copy consumed by dynamic pages.
- **Components** (`components/`): `TarotLibrary` handles interactive browsing/search/filter, while `Card`, `TopBar`, and `Footer` provide reusable presentation across routes.
- **Key routes** (`app/`): `/` (marketing home), `/cards` (library view), `/cards/[slug]` (SSG card detail powered by JSON SEO data), `/directory` (structured index + question links), `/meaning/[slug]` & `/questions/[slug]` (mocked Q&A templates), plus `sitemap.xml` for SEO; `/api` reserved via README.
- **Next steps**: add the missing `/library` target or redirect CTA to `/cards`, connect `/meaning`/`/questions` to real data, and implement the planned `/api` endpoints (auth, draws, readings) referenced in `app/api/README.md`.
