const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
console.log('--- CONNECTIVITY DIAGNOSTIC ---');
console.log('ACTIVE BACKEND URL:', BACKEND_URL || 'RELATIVE PROXY (Port 3001 via package.json)');
console.log('------------------------------');

export async function generateWebsite(description, onUpdate) {
  try {
    console.log('Sending request to:', `${BACKEND_URL}/api/generate-website`);
    const response = await fetch(`${BACKEND_URL}/api/generate-website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text);
      throw new Error('Network response was not ok');
    }

    await handleStreamingResponse(response, onUpdate);
  } catch (error) {
    console.error('Error calling backend API:', error);
    throw new Error('Failed to generate website: ' + error.message);
  }
}

export async function modifyWebsite(modificationDescription, currentHtml, currentCss, onUpdate) {
  try {
    console.log('Sending request to:', `${BACKEND_URL}/api/modify-website`);
    const response = await fetch(`${BACKEND_URL}/api/modify-website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modificationDescription, currentHtml, currentCss }),
    });

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text);
      throw new Error('Network response was not ok');
    }

    await handleStreamingResponse(response, onUpdate);
  } catch (error) {
    console.error('Error calling backend API:', error);
    throw new Error('Failed to modify website: ' + error.message);
  }
}

async function handleStreamingResponse(response, onUpdate) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop();

      for (const part of parts) {
        const lines = part.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') return;
            if (!data) continue;

            try {
              const parsedData = JSON.parse(data);
              if (parsedData.error) {
                 console.error('SSE Error from backend:', parsedData.error);
                 throw new Error(parsedData.error);
              }
              onUpdate(parsedData);
            } catch (error) {
              console.error('Error parsing JSON or handling SSE error:', error, 'Raw Data:', data);
              if (error.message.includes('Unexpected token')) continue;
              throw error;
            }
          }
        }
      }
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Stream aborted by user/browser');
    } else {
      console.error('Stream read error:', err);
      throw err;
    }
  } finally {
    reader.releaseLock();
  }
}