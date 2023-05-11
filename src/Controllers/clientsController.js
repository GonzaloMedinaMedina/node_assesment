import { clientsFacade } from '../Facades/clientsFacade.js';
import { readRequestParameters } from './requestManager.js';

export async function registerClientsEndPoints(app)
{
  app.post('/client/byPolicyNumber', async(req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var client = await clientsFacade.getClientByPolicyNumber(requestData.parameter, requestData.rol);
    res.end(JSON.stringify(client));
  });

  app.post('/client/byId', async (req, res) => 
  {
    const requestData = await readRequestParameters(req);
    var client = await clientsFacade.getClientById(requestData.parameter);
    res.end(JSON.stringify(client));
  });

  app.post('/client/byUserName', async (req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var client = await clientsFacade.getClientByName(requestData.parameter);
    res.end(JSON.stringify(client));
  });
}