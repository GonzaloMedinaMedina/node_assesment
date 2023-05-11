export function readRequestParameters(req)
{
  const promise = new Promise((resolve, reject) => 
  {
    let body = '';

    req.on('data', chunk => 
    {
      body += chunk.toString();
    });

    req.on('end', async () => 
    {
      body = JSON.parse(body);
      resolve(body);
    });
  })

  return promise;
}
