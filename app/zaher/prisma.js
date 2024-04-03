
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
  

// Example usage of saveMessagesToDatabase()
async function main() {
    // Example messages
    const messages = [
      { content: 'Hello', sender: 'user' },
      { content: 'Hi there!', sender: 'bot' },
    ];
  
    // Save messages to the database
    await saveMessagesToDatabase(messages);
  
    console.log('Messages saved to the database.');

    console.log(await fetchConversationHistoryFromDatabase());
  }
  
  // Call the main function
  main()
    .catch(error => {
      console.error('Error occurred:', error);
    })
    .finally(async () => {
      // Close PrismaClient connection
      await prisma.$disconnect();
    });
/*
//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require('@prisma/client');

//export const prisma = global.prisma || new PrismaClient();
//if (process.env.NODE_ENV !== "production") global.prisma = prisma;

const prisma = new PrismaClient(); // Initialize Prisma client

async function storeConversation(conversationData) {
    const { history, ...otherData } = conversationData; // Extract relevant data

    const { data, error } = await prisma.conversation.create({
        data: {
            history,
            ...otherData, // Include additional data if needed
        },
    });

    if (error) {
        console.error('Error storing conversation:', error);
    } else {
        console.log('Conversation stored successfully');
    }
}

async function retrieveConversation() {
    const conversation = await prisma.conversation.findFirst({
        orderBy: { id: 'asc' }, // Adjust order if needed
    });

    if (!conversation) {
        return null; // Handle no conversation found scenario
    } else {
        return conversation.history;
    }
}


const conversationHistory = retrieveConversation();
if (conversationHistory) {
    chain.memory.history = conversationHistory;
}


*/