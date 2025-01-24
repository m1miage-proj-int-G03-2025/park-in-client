async function fetchStream<T, U>(urlString: string, params?: T): Promise<U[]> {
    const url = new URL(urlString);

    if (params) {
        url.search = new URLSearchParams(params).toString();
    }

    const response = await fetch(url);
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