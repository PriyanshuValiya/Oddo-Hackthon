export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const schemeCode = searchParams.get('code');
  
    if (!schemeCode) {
      return new Response(JSON.stringify({ error: 'Scheme code is required' }), { status: 400 });
    }
  
    try {
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
      const data = await response.json();
  
      if (!data || !data.data) {
        throw new Error('Invalid data received');
      }
  
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  