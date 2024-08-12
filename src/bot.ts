import TelegramBot from "node-telegram-bot-api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as http from "http";
import  {about, config, genAIConfig, welcome } from "./config";


const genAI = new GoogleGenerativeAI(config.api_key);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: genAIConfig
});

const bot = new TelegramBot(config.bot_token, {polling: true});

bot.onText(/\/start/, (msg: TelegramBot.Message)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, welcome, {parse_mode: "Markdown"})
})

bot.on("message", async (msg: TelegramBot.Message)=>{
    const chatId = msg.chat.id;
    const userInput = msg.text;
    
    if (userInput?.startsWith("/")){
        return ;
    }

    if (userInput){
        let response;
        try{
            response = await genAIResponse(userInput);
            bot.sendMessage(chatId, response, {parse_mode: "Markdown"})
        }catch(error){
            console.log("Error", error)
        }
        
    }

})

bot.onText(/\/help|\/about/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const helpText = about;
    bot.sendMessage(chatId, helpText, { parse_mode: "Markdown" });
});


async function genAIResponse(content: string){

    const prompt = `
            Given a definition, return the word it defines.
            Definition: When you're happy that other people are also sad.
            Word: schadenfreude
            Definition: existing purely in the mind, but not in physical reality
            Word: abstract
            Definition: ${content}
            Word:
            `
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}

const server = http.createServer();
server.on("request", (request, res)=>{
    res.writeHead(200, { "conent-type": "application/json"});
    res.end(JSON.stringify({
        data: "I am alive"
    }));
});
server.listen(config.port, ()=>{
    console.log(`Server listening on port ${config.port}`)
});