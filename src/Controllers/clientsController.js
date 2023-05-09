import { fetchData } from '../dataProvider.js';
const clientsURL = 'https://www.mocky.io/v2/5808862710000087232b75ac';

export async function registerClientsEndPoints(app)
{
  app.get('/clients', async (req, res) => 
  {
    const clients = await fetchData(clientsURL);
    res.send('first client endpoint ' + clients);
  });
}