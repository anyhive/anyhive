export async function GET() {
  const body = `User-agent: *\nDisallow: /`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}


