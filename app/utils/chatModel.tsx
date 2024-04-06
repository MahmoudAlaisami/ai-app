const { HuggingFaceInference } = require("@langchain/community/llms/hf");
const { ConversationChain } = require("langchain/chains");
const { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { BufferMemory } = require("langchain/memory");
import { NextRequest, NextResponse } from "next/server";
import { useParams } from 'next/navigation'

console.log('.... pass',process.env);


// export default async () => {
//   try {
    // const params = useParams<{ tag: string; item: string }>()
    // console.log('.... params',params);
    const chat = new HuggingFaceInference({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      apiKey: process.env.HF_API_KEY,
      // apiKey: "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",
      max_length: 700,
      max_new_tokens: 700,// Set max_new_tokens to an appropriate value
      temperature: 0.1,
      max_time: 120,
      use_cache: false,
      streaming: true,
      maxTokens: 1000
    });


    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(""),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);


    export const chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: chatPrompt,
      llm: chat,
    });

    // const response = await chain.call({
    //   input: prompt
    // });
    

    // return response//.json()
//     return chain

//   } catch (error) {
//     console.log('.... error',error);
//     throw new Error(error.message)
//   }
// }