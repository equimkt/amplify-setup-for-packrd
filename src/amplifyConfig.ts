import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import outputs from '../amplify_outputs.json';

// Configure Amplify
// Note: This will use placeholder values until sandbox is running
Amplify.configure(outputs);

// Create a typed client
export const client = generateClient<Schema>();

// Type-safe haiku generation function
export async function generateHaiku(prompt: string): Promise<string | null> {
  try {
    const result = await client.queries.generateHaiku({
      prompt
    });
    return result.data;
  } catch (error) {
    console.error('Error generating haiku:', error);
    throw error;
  }
}
