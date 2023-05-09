const regularHeaders = 
{
    'Content-Type': 'application/json'
}

export async function fetchData(url, headers = regularHeaders)
{
    let result = undefined;

    await fetch(url,
    {
        headers: headers,
        method: 'GET'       
    })
    .then(response => response.json())
    .then(data => 
    {
        result = data;
    })
    .catch(error => 
    {
        console.error('Error fetching data: ' + error.stack);
        return undefined;
    })

    return result;
}
