import { dataProvider } from '../dataProvider.js';
const CLIENTS_URL = 'https://www.mocky.io/v2/5808862710000087232b75ac';
const CLIENTS_KEY = 'clients';

export async function registerClientsEndPoints(app)
{
  app.get('/clients', async (req, res) => 
  {
    const data = await dataProvider.getData(CLIENTS_KEY, CLIENTS_URL);
    res.send('first client endpoint ' + data.clients);
  });
}