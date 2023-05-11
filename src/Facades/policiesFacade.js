import { policiesService } from "../Services/policiesService.js"
import { getResponseObject } from "../Controllers/requestManager.js";
/**
 * Class to manage access to policiesService
 */
export class policiesFacade
{
    constructor(){}
    static async getPoliciesWithClientName(clientName, rol)
    {
        var responseObject = getResponseObject();

        if(rol == "admin")
        {
            responseObject.content = await policiesService.getPoliciesWithClientName(clientName);
            return responseObject
        }

        responseObject.responseHeader = 403;
        responseObject.content = "Access Denied";

        return responseObject;
    } 
}