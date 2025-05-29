import type { APIRoute } from "astro";
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const apiKey = 'AIzaSyDfOFnmu51OzuPG1Tlp3x3OKTjLen-V4ZA';
  const body = await request.json();

  const prompt = body?.prompt || "Default prompt";

  const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!geminiRes.ok) {
    const error = await geminiRes.text();
    return new Response(JSON.stringify({ error }), { status: geminiRes.status });
  }

  const result = await geminiRes.json();

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};