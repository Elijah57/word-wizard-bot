import dotenv from "dotenv";
dotenv.config()

export const about: string = `
Welcome to **WordWizard**! Here's what I can do:

- **Instant Word Matching**: Provide a definition, and I'll return the word that best matches it.
- **User-Friendly**: Simple commands to get you started.
- **Educational Tool**: Improve your vocabulary and learn new words.

Commands:
- /start - Start interacting with the bot
- /help - Show this help message
- /about - Learn more about the bot

Simply type a definition, and I'll find the word!
    `;

export const welcome: string = "Welcome! Please type a definition, and I'll try to find the word that matches it."
export const config = {
    api_key: process.env.API_KEY?.toString() || "",
    bot_token: process.env.BOT_TOKEN?.toString() || "",
    port: Number(process.env.PORT)
}

export const genAIConfig = {
    candidateCount: 1,
    maxOutputTokens: 20,
    temperature: 1.0,
  }