import { clientsService } from '../Services/clientsService.js';
import { getResponseObject } from "../Controllers/requestManager.js";

/**
 * Class to manage access to clientsService
 */
export class clientsFacade
{
    constructor(){}

    static async getClientByPolicyNumber(policyNumber, rol)
    {
        var responseObject = getResponseObject();

        if (rol == "admin")
        {
            responseObject.content = await clientsService.getClientByPolicyNumber(policyNumber);
            return responseObject;
        }

        responseObject.responseHeader = 403;
        responseObject.content = "Access Denied";

        return responseObject;
    }

    static async getClientById(clientId, rol)
    {
        var responseObject = getResponseObject();
     
        if (rol == "user" || rol == "admin")
        {
            responseObject.content = await clientsService.getClientBy(clientsService.ID, clientId)
            return responseObject;
        }

        responseObject.responseHeader = 403;
        responseObject.content = "Access Denied";

        return responseObject;
    }

    static async getClientByName(clientName, rol)
    {
        var responseObject = getResponseObject();

        if (rol == "user" || rol == "admin")
        {
            responseObject.content = await clientsService.getClientBy(clientsService.NAME, clientName)
            return responseObject;
        }

        responseObject.responseHeader = 403;
        responseObject.content = "Access Denied";

        return responseObject;
    }
}