//import { config } from "dotenv";
//config();

// Import Prisma Client
const { PrismaClient } = require('@prisma/client');

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Store messages in the database
async function saveMessagesToDatabase(messages) {
  for (const message of messages) {
    await prisma.message.create({
      data: {
        content: message.content,
        sender: message.sender,
      },
    });
  }
}


// Fetch conversation history from the database
async function fetchConversationHistoryFromDatabase() {
    const messages = await prisma.message.findMany();
    return messages;
  }
console.log('hello')

const { HuggingFaceInference } = require("@langchain/community/llms/hf");
console.log('hello')
const chat = new HuggingFaceInference({
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  apiKey: "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", // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
  max_length: 700, 
  max_new_tokens:700,// Set max_new_tokens to an appropriate value
  temperature:0.1,
  max_time:120,
  use_cache:false,
  streaming:true,
  
});
const { ConversationChain } = require("langchain/chains");
//import { ChatOpenAI } from "langchain/chat_models/openai";
const {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { BufferMemory } = require("langchain/memory");


console.log('Finished importing the libraries')

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
  console.log('Initialized the PromptTemplate')

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    llm: chat,
    
  });
  //console.log("....", chain.memory)
  console.log('Initialized the ConversationChain')


// Wrap the asynchronous part inside an async function
async function main() {
    //const chat = new ChatOpenAI({ temperature: 0 });
  
  
    const response = await chain.call({
      input: "What is the capital of Germany?",
      //max_new_tokens: 100, // Set max_new_tokens to an appropriate value

    });

    console.log('Called the first prompt')
    //console.log(response)
    console.log('Called the first buffer memory')


    const response2 = await chain.call({
      input: "What is a great place to see there?",
      //max_new_tokens: 100, // Set max_new_tokens to an appropriate value

    });
    console.log('Called the second prompt')

    //console.log(response2);
    //console.log('Called the second buffer memory')
    console.log("....", chain.memory.chatHistory.messages)

    //console.log("....", chain.memory)
  }
  
  // Call the async function
  main().catch(error => console.error(error));
