// OpenAPI route disabled as requested
export async function GET() {
  return Response.json({ success: true, message: 'OpenAPI specification endpoint is disabled.' });
}
