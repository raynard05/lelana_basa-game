import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const lang = searchParams.get("lang") || "jw";

  if (!text) {
    return NextResponse.json({ error: "Text parameter is required" }, { status: 400 });
  }

  // Google Translate TTS endpoint with legacy code 'jw' for Javanese
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      console.error(`Google Translate TTS returned status ${response.status}`);
      return NextResponse.json({ error: `Google Translate TTS failed with status ${response.status}` }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error: any) {
    console.error("Error fetching Google Translate TTS:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch audio" }, { status: 500 });
  }
}
