import { dataProvider } from '../dataProvider.js';
import { policiesService } from './policiesService.js';

const CLIENTS_URL = 'https://www.mocky.io/v2/5808862710000087232b75ac';
const CLIENTS_KEY = 'clients';

/**
 * Class to manage all related to client object
 */
export class clientsService
{
    static ID = "id";
    static NAME = "name";
    static EMAIL = "email";
    static ROLE = "role";

    constructor(){}

    /**
     * Check if a property is one of the Client properties.
     * @param {Property to be checked} property 
     * @returns True if the property is one of the Client properties, false otherwise.
     */
    static isClientProperty(property)
    {
        return property === this.ID
            || property === this.NAME
            || property === this.EMAIL
            || property === this.ROLE;
    }

    /**
     * @returns "The all the clients."
     */    
    static async getClientsList()
    {
        const data = await dataProvider.getData(CLIENTS_KEY, CLIENTS_URL);
        return data.clients;
    }

    /**
     * Method to get a client given a property property with specific value
     * @param {"Property name to be searched in the client object"} property 
     * @param {"Value of the property to be found"} value 
     * @returns The client object with the specific property property value.
     */
    static async getClientBy(property, value)
    {
        var resultClient = undefined;
        if (this.isClientProperty(property))
        {
            const clients = await this.getClientsList();

            clients.forEach(client => 
            {
                if (client[property] === value)
                {
                    resultClient = client;
                    return;
                }
            });
        }

        return resultClient;
    }

    /** 
     * Method to get a client linked to a policy with specific policyNumber
     * @param {"Value of the policyNumber property to be found"} policyNumber 
     * @returns The client object related to the policy.
     */
    static async getClientByPolicyNumber(policyNumber)
    {
        const policy = await policiesService.getPolicyBy(this.ID, policyNumber);
        return this.getClientBy(this.ID, policy.clientId);
    }
}