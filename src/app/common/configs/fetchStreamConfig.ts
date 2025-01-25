type FetchStreamParams<T, B> = {
  params?: T,
  methode?: string,
  body?: B
}
async function fetchStream<T, U, B>(urlString: string, params?: FetchStreamParams<T, B>): Promise<U[]> {
    const url = new URL(urlString);
    if (params?.params) {
        url.search = new URLSearchParams(params?.params).toString();
    }

    const response = await fetch(url, {
      method: params?.methode || 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: params?.body ? JSON.stringify(params.body) : undefined,

    });
    const responseJson: Array<U> = [];

    if (!response.body) {
        return responseJson;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        buffer += decoder.decode(value, { stream: true });
  
        let boundary = buffer.indexOf('\n');
        while (boundary !== -1) {
          const line = buffer.slice(0, boundary).trim();
          buffer = buffer.slice(boundary + 1);
  
          if (line.startsWith('data:')) {
            const jsonData = line.replace('data:', '').trim();
            const parsedData = JSON.parse(jsonData);
            responseJson.push(parsedData);
          }
  
          boundary = buffer.indexOf('\n');
        }
    }    
    
    return responseJson;
}

export default fetchStream;