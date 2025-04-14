import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.PORT || '3000',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    PINECONE_API_KEY: process.env.PINECONE_API_KEY || '',
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT || '',
    PINECONE_INDEX: process.env.PINECONE_INDEX || 'historicity',
    GROQ_API_KEY: process.env.GROQ_API_KEY || '',
    WIKIPEDIA_USER_AGENT: process.env.WIKIPEDIA_USER_AGENT || 'Historicity/1.0 (learning project)',
    EMBED_MODEL: process.env.EMBED_MODEL || 'text-embedding-ada-002',
    LLM_MODEL: process.env.LLM_MODEL || 'llama3-70b-8192',
};
