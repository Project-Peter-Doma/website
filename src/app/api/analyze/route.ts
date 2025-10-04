// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  // Use your Vercel deployment URL here. Store it in .env.local for best practice.
  const peterApiUrl = process.env.PETER_API_URL || "https://peter-api-server.vercel.app/api/analyze";

  try {
    const apiRes = await fetch(`${peterApiUrl}?domain=${domain}`, {
        // Vercel serverless functions can take a while, so set a long timeout
        // This fetch is server-to-server, so it's more reliable.
        next: { revalidate: 0 } // No caching
    });

    if (!apiRes.ok) {
      console.error(`Peter API failed with status: ${apiRes.status}`);
      const errorData = await apiRes.json();
      return NextResponse.json({ error: 'Analysis failed on the backend.', details: errorData }, { status: 500 });
    }

    const data = await apiRes.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Failed to fetch from Peter API:', error);
    return NextResponse.json({ error: 'Internal Server Error when contacting analysis service.' }, { status: 500 });
  }
}