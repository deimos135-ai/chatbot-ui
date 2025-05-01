export async function chatCompletion(requestPayload: any) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    throw new Error('API error');
  }

  return response.json();
}
