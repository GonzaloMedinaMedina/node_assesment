import { policiesService } from "../Services/policiesService.js";
import { readRequestParameters } from './requestManager.js';

export function registerPoliciesEndPoints(app)
{
  app.post('/policies/ByUserName', async (req, res) =>
  {
    const requestData = await readRequestParameters(req);
    var userPolicies = await policiesService.getPoliciesWithClientName(requestData.parameter);
    res.end(JSON.stringify(userPolicies));
  });
}