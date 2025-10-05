// src/app/api/suggestions/route.ts

import { NextResponse } from 'next/server';

const DOMA_POLL_API = "https://api-testnet.doma.xyz/v1/poll";
const API_KEY = process.env.DOMA_API_KEY;

// Cache the response for 1 hour to avoid hitting the API on every page load
export const revalidate = 3600; 

export async function GET() {
  console.log("[API /suggestions] Received request.");

  if (!API_KEY) {
    console.error("[API /suggestions] DOMA_API_KEY is not configured on the server.");
    return NextResponse.json({ error: "Server configuration error: Missing Doma API Key." }, { status: 500 });
  }
  console.log("[API /suggestions] Doma API Key found.");

  try {
    const params = new URLSearchParams({
      // THE FIX IS HERE: Changed 'NAME_TOKEN_SOLD' to 'NAME_TOKEN_PURCHASED'
      eventTypes: 'NAME_TOKEN_PURCHASED',
      limit: '100',
      finalizedOnly: 'true',
    });
    
    const fetchUrl = `${DOMA_POLL_API}?${params.toString()}`;
    console.log(`[API /suggestions] Fetching from Doma: ${fetchUrl}`);

    const response = await fetch(fetchUrl, {
      headers: {
        'Api-Key': API_KEY,
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[API /suggestions] Doma API responded with status: ${response.status}`);
      console.error(`[API /suggestions] Doma API error body: ${errorBody}`);
      throw new Error(`Doma API failed with status ${response.status}.`);
    }
    console.log("[API /suggestions] Successfully fetched data from Doma API.");

    const data = await response.json();
    
    const uniqueDomains = new Set<string>();
    
    if (data.events && Array.isArray(data.events)) {
      for (const event of data.events) {
        if (event.name && typeof event.name === 'string') {
          uniqueDomains.add(event.name);
        }
      }
    }
    console.log(`[API /suggestions] Found ${uniqueDomains.size} unique domains.`);

    return NextResponse.json(Array.from(uniqueDomains));

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    console.error(`[API /suggestions] An error occurred in the handler: ${errorMessage}`);
    return NextResponse.json({ error: `Failed to fetch domain suggestions: ${errorMessage}` }, { status: 500 });
  }
}