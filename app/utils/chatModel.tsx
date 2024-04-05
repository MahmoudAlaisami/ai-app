const { HuggingFaceInference } = require("@langchain/community/llms/hf");
const { ConversationChain } = require("langchain/chains");
const { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { BufferMemory } = require("langchain/memory");
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const chat = new HuggingFaceInference({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      apiKey: process.env.HF_API_KEY,
      max_length: 700,
      max_new_tokens: 700,// Set max_new_tokens to an appropriate value
      temperature: 0.1,
      max_time: 120,
      use_cache: false,
      streaming: true,

    });


    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
      ),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);


    const chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: chatPrompt,
      llm: chat,
    });

  } catch (error) {
    console.log('.... error',error);
    throw new Error(error.message)
  }
}