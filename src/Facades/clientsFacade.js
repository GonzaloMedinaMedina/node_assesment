import { clientsService } from '../Services/clientsService.js';
/**
 * Class to manage access to clientsService
 */
export class clientsFacade
{
    constructor(){}

    static async getClientByPolicyNumber(policyNumber, rol)
    {
        if (rol == "admin")
        {
            return await clientsService.getClientByPolicyNumber(policyNumber);
        }

        return undefined;
    }

    static async getClientById(clientId)
    {
        if (rol == "user" || rol == "admin")
        {
            return await clientsService.getClientBy(clientsService.ID, clientId)
        }

        return undefined;
    }

    static async getClientByName(clientName)
    {
        if (rol == "user" || rol == "admin")
        {
            return await clientsService.getClientBy(clientsService.NAME, clientName)
        }

        return undefined;
    }
}