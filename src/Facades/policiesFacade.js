import { policiesService } from "../Services/policiesService"
/**
 * Class to manage access to policiesService
 */
export class policiesFacade
{
    constructor(){}
    static async getPoliciesWithClientName(clientName, rol)
    {
        if(rol == "admin")
        {
            return await policiesService.getPoliciesWithClientName(clientName);
        }
        
        return undefined;
    } 
}