import { dataProvider } from '../dataProvider.js';
import { clientsService } from '../Services/clientsService.js'

const POLICIES_URL = 'https://www.mocky.io/v2/580891a4100000e8242b75c5';
const POLICIES_KEY = 'policies';

/**
 * Class to manage all related to policy object
 */
export class policiesService
{
    static ID = "id";
    static AMOUNT_INSURED = "amountInsured";
    static EMAIL = "email";
    static INCEPTION_DATE = "inceptionDate";
    static INSTALLMENT_PAYMENT = "installmentPayment";
    static CLIENT_ID = "clientId";

    constructor(){}

    /**
     * Check if a property is one of the Policy properties.
     * @param {Property to be checked} property 
     * @returns True if the property is one of the Policy properties, false otherwise.
     */
    static isPolicyProperty(property)
    {
        return property === this.ID 
            || property === this.AMOUNT_INSURED 
            || property === this.EMAIL 
            || property === this.INCEPTION_DATE 
            || property === this.INSTALLMENT_PAYMENT
            || property === this.CLIENT_ID;
    }
    
    /**
     * @returns "The all the policies."
     */ 
    static async getPoliciesList()
    {
        const data = await dataProvider.getData(POLICIES_KEY, POLICIES_URL);
        return data.policies;
    }

    /**
     * Method to get a policy given a property property with specific value
     * @param {"Property name to be searched in the policy object"} property 
     * @param {"Value of the property to be found"} value 
     * @returns The policy object with the specific property property value.
     */
    static async getPolicyBy(property, value)
    {
        var resultPolicy = undefined;

        if (this.isPolicyProperty(property))
        {
            const policies = await this.getPoliciesList();

            policies.forEach(policy => 
            {
                if (policy[property] === value)
                {
                    resultPolicy = policy;
                }
            });
        }

        return resultPolicy;
    }

    /**
     * Method to get a list of policies given a property property with specific value
     * @param {"Property name to be searched in the policy object"} property 
     * @param {"Value of the property to be found"} value 
     * @returns The list of policies with the specific property property value.
     */
    static async getPoliciesBy(property, value)
    {
        var resultPolicies = undefined;
        
        if (this.isPolicyProperty(property))
        {
            resultPolicies = await this.getPoliciesList();
            resultPolicies = resultPolicies.filter(policy => policy[property] === value);
        }

        return resultPolicies;
    }

    /**
     * Method to get all the policies linked to a client
     * @param {"ClientId value to be searched."} clientId 
     * @returns All the Policies with the clientId value.
     */
    static async getPoliciesWithClientId(clientId)
    {
        const client = await clientsService.getClientBy(clientsService.ID, clientId);
        return await this.getPoliciesBy(this.CLIENT_ID, client[clientsService.ID]);
    }
}