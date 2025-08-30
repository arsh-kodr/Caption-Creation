// backend/service/ai.service.js
const { GoogleGenAI } = require("@google/genai");

// Load Gemini API
const ai = new GoogleGenAI({});

// Style + Language Guide
const STYLE_GUIDE = {
  Aesthetic: "Soft, dreamy, poetic captions. Use ✨🌸🌙.",
  Minimal: "Short, simple captions. Few/no emojis.",
  Funny: "Witty, humorous captions. Use 😂🤣😜.",
  "Dark Humor": "Sarcastic, edgy, brutally honest captions. Use 💀🔥.",
  "Gen Z": "Slang-heavy, chaotic, lots of emojis. TikTok/IG vibe.",
  Tapori: "Mumbai street slang, raw confidence. Use 😎🔥💪.",
  Punjabi: "High-energy, fun, desi Punjabi vibe. Use 💃🔥.",
  Bhojpuri: "Desi Bhojpuri slang, rustic charm. Use 💪🌟.",
  Haryanavi: "Bold, rural, confident Haryanvi style. Use 💥😎.",
  Hindi: "Filmy Bollywood shayari/dialogue style. Use 🎶✨.",
  Hinglish: "Casual mix of Hindi + English, trendy Instagram vibe. Use 🌟🔥.",
};

async function generateCaption(base64ImageFile, style = "Aesthetic", language = "English") {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    {
      text: `
        You are an expert in generating captions for Instagram posts. 
        The user wants the caption in **${style}** style and **${language}** language.
        Rules: ${STYLE_GUIDE[style] || ""}
        - Caption should be short and concise.
        - Always include emojis and hashtags relevant to the style.
        - Generate only ONE caption, no explanations.
      `,
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  return response.text;
}

module.exports = generateCaption;
