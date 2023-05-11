import { clientsService } from "../../src/Services/clientsService";
import { policiesService } from '../../src/Services/policiesService.js';
import { dataProvider } from "../../src/dataProvider.js";

function createFakeClient(id, name, email, role)
{
    return {
        id: id,
        name: name,
        email: email,
        role: role
    };
}


function createFakePolicy(id, amountInsured, email, inceptionDate, installmentPayment, clientId)
{
    return {
        id: id,
        amountInsured: amountInsured,
        email: email,
        inceptionDate: inceptionDate,
        installmentPayment: installmentPayment,
        clientId: clientId
    };
}

function createFakePolicyList()
{
    return {
        policies: [
            createFakePolicy("id1", 100, "email1", "inceptionDate1", false, "fakeClientId"),
            createFakePolicy("id2", 200, "email2", "inceptionDate2", true, "fakeClientId"),
            createFakePolicy("id3", 300, "email3", "inceptionDate3", false, "clientId3"),
        ]
    };
}

describe("policiesService tests", () => 
{
    var fakePoliciesListObject;

    beforeEach (() =>
    {
        fakePoliciesListObject = createFakePolicyList();
        dataProvider.getData = jest.fn().mockReturnValue(fakePoliciesListObject);
    });
    
    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    test("getPoliciesList must return all the policies and call getData method", async () => 
    {
        const resultPoliciesList = await policiesService.getPoliciesList();

        expect(dataProvider.getData).toHaveBeenCalled();
        expect(resultPoliciesList).toBe(fakePoliciesListObject.policies);
    });

    test("getPolicyBy must return specific policy given a property name with linked value", async () =>
    {
        const propertyName = "amountInsured";
        const propertyValue = 200;

        const getPoliciesList = jest.spyOn(policiesService, 'getPoliciesList');
        const isPolicyProperty = jest.spyOn(policiesService, 'isPolicyProperty');

        const resultPolicy = await policiesService.getPolicyBy(propertyName, propertyValue);
        const expectedPolicy = fakePoliciesListObject.policies[1];

        expect(getPoliciesList).toHaveBeenCalled();
        expect(isPolicyProperty).toHaveBeenCalled();
        expect(resultPolicy).toBe(expectedPolicy);    
    });

    test("getPolicyBy must return undefined if no policy is found", async () =>
    {
        const propertyName = "amountInsured";
        const propertyValue = 500;

        const getPoliciesList = jest.spyOn(policiesService, 'getPoliciesList');
        const isPolicyProperty = jest.spyOn(policiesService, 'isPolicyProperty');

        const resultPolicy = await policiesService.getPolicyBy(propertyName, propertyValue);

        expect(getPoliciesList).toHaveBeenCalled();
        expect(isPolicyProperty).toHaveBeenCalled();
        expect(resultPolicy).toBe(undefined);    
    });

    test("getPolicyBy must return undefined if propertyName is not a Policy property", async() => 
    {
        const propertyName = "fakeProperty";
        const propertyValue = 500;

        const getPoliciesList = jest.spyOn(policiesService, 'getPoliciesList');
        const isPolicyProperty = jest.spyOn(policiesService, 'isPolicyProperty');

        const resultPolicy = await policiesService.getPolicyBy(propertyName, propertyValue);

        expect(getPoliciesList).toHaveBeenCalledTimes(0);
        expect(isPolicyProperty).toHaveBeenCalled();
        expect(resultPolicy).toBe(undefined);    
    });

    test("getPoliciesBy must return all the Policies with installmentPayment equal to false", async() =>
    {
        const propertyName = "installmentPayment";
        const propertyValue = false;

        const getPoliciesList = jest.spyOn(policiesService, 'getPoliciesList');
        const isPolicyProperty = jest.spyOn(policiesService, 'isPolicyProperty');

        const resultPolicies = await policiesService.getPoliciesBy(propertyName, propertyValue);

        expect(getPoliciesList).toHaveBeenCalled();
        expect(isPolicyProperty).toHaveBeenCalled();
        expect(resultPolicies.length).toBe(2);    
    });

    test("getPoliciesWithClientId must return all the policies with fakeClientId value", async () =>
    {
        const fakeClient = createFakeClient("fakeClientId", "fakeName", "fakeEmail", "fakeRole");

        clientsService.getClientBy = jest.fn().mockImplementation((property, value) =>
        {
            if (property === "id" && value === "fakeClientId")
            {
                return fakeClient;
            }
        });

        const getPoliciesList = jest.spyOn(policiesService, 'getPoliciesList');
        const isPolicyProperty = jest.spyOn(policiesService, 'isPolicyProperty');

        const resultPolicies = await policiesService.getPoliciesWithClientId("fakeClientId");
        expect(getPoliciesList).toHaveBeenCalled();
        expect(isPolicyProperty).toHaveBeenCalled();
        expect(resultPolicies.length).toBe(2);    
    });
});