import { policiesFacade } from "../Facades/policiesFacade.js"
import { readRequestParameters } from './requestManager.js';

export function registerPoliciesEndPoints(app)
{
  app.post('/policies/ByUserName', async (req, res) =>
  {
    const requestData = await readRequestParameters(req);
    
    var responseObject = await policiesFacade.getPoliciesWithClientName(requestData.parameter, requestData.rol);
    
    res.writeHead(responseObject.responseHeader, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(responseObject.content));
  });
}