import { clientsFacade } from '../Facades/clientsFacade.js';
import { readRequestParameters } from './requestManager.js';

export async function registerClientsEndPoints(app)
{
  app.post('/client/byPolicyNumber', async(req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var responseObject = await clientsFacade.getClientByPolicyNumber(requestData.parameter, requestData.rol);
    
    res.writeHead(responseObject.responseHeader, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(responseObject.content));
  });

  app.post('/client/byId', async (req, res) => 
  {
    const requestData = await readRequestParameters(req);
    var responseObject = await clientsFacade.getClientById(requestData.parameter, requestData.rol);
    
    res.writeHead(responseObject.responseHeader, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(responseObject.content));
  });

  app.post('/client/byUserName', async (req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var responseObject = await clientsFacade.getClientByName(requestData.parameter, requestData.rol);
    
    res.writeHead(responseObject.responseHeader, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(responseObject.content));
  });
}