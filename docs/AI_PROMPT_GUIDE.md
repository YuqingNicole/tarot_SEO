# CardDetailPage 数据流程和 AI Prompt 调试指南

## 📊 完整数据流程

### 1. 数据请求流程

```
用户访问 /library/the-fool
    ↓
app/library/[slug]/page.tsx (服务端)
    ↓ 获取卡牌数据
getCardBySlug("the-fool") → TarotCard 对象
    ↓ 传递给组件
<CardDetailPage card={card} />
    ↓ useEffect 触发
getCardSEOData(card) → 调用 Gemini AI
    ↓ AI 返回
SEOCardData 对象
    ↓ 更新状态
setSeoData(data)
    ↓ 渲染
页面显示 AI 生成的内容
```

## 🔧 关键文件和函数

### 文件 1: `services/geminiService.ts`

**函数:** `getCardSEOData(card: TarotCard)`

**位置:** 第 237-297 行

**作用:** 向 Google Gemini AI 发送请求,获取卡牌的详细 SEO 数据

### 文件 2: `components/CardDetailPage.tsx`

**位置:** 第 21-35 行

**作用:** 在组件加载时调用 `getCardSEOData`,获取并显示数据

## 🎯 AI Prompt 结构

### 当前 Prompt (第 264-275 行)

```typescript
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
```

## 📝 JSON Schema 定义

AI 必须返回符合以下结构的 JSON:

```typescript
{
  symbolism_detailed: string,      // 详细象征意义 (200+ 字)
  love_reading: string,             // 爱情解读
  career_reading: string,           // 事业解读
  health_reading: string,           // 健康解读
  spiritual_reading: string,        // 精神成长解读
  related_cards: string[],          // 3-5 张相关卡牌名称
  common_questions: [               // 3-5 个常见问题
    {
      question: string,
      answer: string
    }
  ]
}
```

## 🎨 页面中的字段映射

### CardDetailPage.tsx 中如何使用这些字段:

| AI 返回字段 | 页面位置 | 显示方式 |
|------------|---------|---------|
| `symbolism_detailed` | 第 133-140 行 | "Detailed Symbolism" 部分 |
| `love_reading` | 第 144-149 行 | 💕 Love & Relationships 卡片 |
| `career_reading` | 第 151-156 行 | 💼 Career & Work 卡片 |
| `health_reading` | 第 158-163 行 | 🌿 Health & Wellness 卡片 |
| `spiritual_reading` | 第 165-170 行 | ✨ Spiritual Growth 卡片 |
| `common_questions` | 第 175-191 行 | FAQ 可展开列表 |
| `related_cards` | 第 202-211 行 | 相关卡牌标签 |

## 🔍 调试 Prompt 的步骤

### 1. 找到 Prompt 位置

文件: `services/geminiService.ts`
行数: 264-275

### 2. 修改 Prompt 示例

```typescript
// 原始 Prompt
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

// 优化后的 Prompt 示例
const prompt = `You are an expert Tarot reader with deep knowledge of symbolism and divination.

Card: ${card.name}
Arcana: ${card.arcana === "major" ? "Major Arcana" : "Minor Arcana"}
${card.suit ? `Suit: ${card.suit}` : ""}

Please generate comprehensive, SEO-optimized content in JSON format:

1. **symbolism_detailed** (200-300 words):
   - Describe the visual symbolism on the card
   - Explain the deeper metaphysical meanings
   - Connect to archetypal themes

2. **love_reading** (100-150 words):
   - How this card appears in love readings
   - Advice for relationships
   - Both single and partnered perspectives

3. **career_reading** (100-150 words):
   - Career and professional implications
   - Work environment insights
   - Financial aspects

4. **health_reading** (100-150 words):
   - Physical health indicators
   - Mental and emotional wellbeing
   - Holistic health advice

5. **spiritual_reading** (100-150 words):
   - Spiritual growth opportunities
   - Meditation and reflection guidance
   - Connection to higher self

6. **related_cards** (3-5 card names):
   - Cards with similar themes or energies
   - Use exact tarot card names

7. **common_questions** (3-5 Q&A pairs):
   - Real questions people ask about this card
   - Clear, helpful answers
   - SEO-friendly phrasing

Write in an engaging, mystical yet accessible tone. Be specific and practical.`;
```

### 3. 测试流程

1. **修改 Prompt** 在 `geminiService.ts` 第 264 行
2. **保存文件** - 开发服务器会自动重新加载
3. **访问卡牌页面** 如 `http://localhost:3000/library/the-fool`
4. **查看结果** - 页面会显示新的 AI 生成内容
5. **检查控制台** - 如果有错误会显示在浏览器控制台

### 4. 调试技巧

**添加日志:**
```typescript
const result = await model.generateContent(prompt);
const response = result.response.text();
console.log("AI Response:", response); // 查看原始响应
return JSON.parse(response) as SEOCardData;
```

**查看返回数据:**
```typescript
// 在 CardDetailPage.tsx 的 useEffect 中
const data = await getCardSEOData(card);
console.log("SEO Data:", data); // 查看解析后的数据
setSeoData(data);
```

## 🎯 Prompt 优化建议

### 提高质量的技巧:

1. **明确字数要求**
   ```
   symbolism_detailed: 200-300 words (not just "200+ words")
   ```

2. **提供上下文**
   ```
   Include the card's traditional meaning: ${card.upright_meaning}
   Consider reversed interpretation: ${card.reversed_meaning}
   ```

3. **指定语气和风格**
   ```
   Use a warm, encouraging tone
   Balance mysticism with practical advice
   Write for beginners and experienced readers
   ```

4. **SEO 优化**
   ```
   Include the card name "${card.name}" naturally in the text
   Use related keywords: tarot, divination, reading, interpretation
   ```

5. **结构化输出**
   ```
   For common_questions, use this format:
   - Question should start with "What", "How", "When", or "Why"
   - Answer should be 2-3 sentences
   ```

## 📊 数据类型定义

查看完整类型定义:
- 文件: `lib/types.ts`
- 接口: `SEOCardData`

```typescript
export interface SEOCardData {
  symbolism_detailed: string;
  love_reading: string;
  career_reading: string;
  health_reading: string;
  spiritual_reading: string;
  related_cards: string[];
  common_questions: Array<{
    question: string;
    answer: string;
  }>;
}
```

## 🔄 完整调用链

```
1. 用户访问页面
   ↓
2. Next.js 路由匹配 /library/[slug]
   ↓
3. app/library/[slug]/page.tsx 执行
   ↓
4. getCardBySlug(slug) 从 DECK 获取卡牌
   ↓
5. <CardDetailPage card={card} /> 渲染
   ↓
6. useEffect 触发 fetchSEOData()
   ↓
7. getCardSEOData(card) 调用
   ↓
8. Gemini AI 处理 prompt
   ↓
9. 返回 JSON 字符串
   ↓
10. JSON.parse() 解析为 SEOCardData
    ↓
11. setSeoData(data) 更新状态
    ↓
12. 组件重新渲染显示内容
```

## 💡 常见问题

### Q: AI 返回的数据格式不对怎么办?
A: 检查 `seoDataSchema` 定义,确保 prompt 中的要求与 schema 一致

### Q: 如何查看 AI 的原始响应?
A: 在 `geminiService.ts` 第 278 行添加 `console.log(response)`

### Q: 如何修改某个字段的显示方式?
A: 在 `CardDetailPage.tsx` 中找到对应的 `seoData.字段名`,修改其渲染逻辑

### Q: 能否添加新字段?
A: 可以!需要同时修改:
1. `lib/types.ts` - 添加到 `SEOCardData` 接口
2. `services/geminiService.ts` - 添加到 `seoDataSchema`
3. `services/geminiService.ts` - 在 prompt 中说明新字段
4. `components/CardDetailPage.tsx` - 渲染新字段

## 🚀 快速测试命令

```bash
# 1. 确保开发服务器运行
npm run dev

# 2. 访问任意卡牌页面
open http://localhost:3000/library/the-fool

# 3. 打开浏览器控制台查看日志
# Mac: Cmd + Option + I
# Windows: F12
```

---

**提示:** 修改 prompt 后,刷新页面即可看到新的 AI 生成内容。每次访问卡牌详情页都会重新调用 AI API。
