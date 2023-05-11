import { clientsService } from '../Services/clientsService.js';
import { readRequestParameters } from './requestManager.js';

export async function registerClientsEndPoints(app)
{
  app.post('/client/byPolicyNumber', async(req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var client = await clientsService.getClientByPolicyNumber(requestData.parameter);
    res.end(JSON.stringify(client));
  });

  app.post('/client/byId', async (req, res) => 
  {
    const requestData = await readRequestParameters(req);
    var client = await clientsService.getClientBy(clientsService.ID, requestData.parameter);
    res.end(JSON.stringify(client));
  });

  app.post('/client/byUserName', async (req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var client = await clientsService.getClientBy(clientsService.NAME, requestData.parameter);
    res.end(JSON.stringify(client));
  });
}