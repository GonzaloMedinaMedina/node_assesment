import { policiesFacade } from "../Facades/policiesFacade.js"
import { readRequestParameters } from './requestManager.js';

export function registerPoliciesEndPoints(app)
{
  app.post('/policies/ByUserName', async (req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var userPolicies = await policiesFacade.getPoliciesWithClientName(requestData.parameter, requestData.rol);
    res.end(JSON.stringify(userPolicies));
  });
}