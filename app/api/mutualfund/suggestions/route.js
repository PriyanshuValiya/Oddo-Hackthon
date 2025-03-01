export async function GET() {
    try {
      const response = await fetch('https://api.mfapi.in/mf');
      const funds = await response.json();
  
      return new Response(JSON.stringify(funds), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch suggestions' }), { status: 500 });
    }
  }
  