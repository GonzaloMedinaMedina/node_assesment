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

function createFakeClientList()
{
    return {
        clients: [
            createFakeClient("id1", "name1", "email1", "user"),
            createFakeClient("id2", "name2", "email2", "user"),
            createFakeClient("id3","name3", "email3", "admin")
        ]
    };
}

describe("clientsService tests", () => 
{
    var fakeClientListObject;
    beforeAll (() =>
    {
        fakeClientListObject = createFakeClientList();
        dataProvider.getData = jest.fn().mockReturnValue(fakeClientListObject);
    });

    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    test("getClientsList must return all the clients and call getData method", async () => 
    {
        const resultClientList = await clientsService.getClientsList();

        expect(dataProvider.getData).toHaveBeenCalled();
        expect(resultClientList).toBe(fakeClientListObject.clients);
    });

    test("getClientBy must return specific client given a property name with linked value", async () =>
    {
        const propertyName = "id";
        const propertyValue = "id3";

        const getClientListSpy = jest.spyOn(clientsService, 'getClientsList');
        const isClientProperty = jest.spyOn(clientsService, 'isClientProperty');

        const resultClient = await clientsService.getClientBy(propertyName, propertyValue);
        const expectedClient = fakeClientListObject.clients[2];

        expect(getClientListSpy).toHaveBeenCalled();
        expect(isClientProperty).toHaveBeenCalled();
        expect(resultClient).toBe(expectedClient);     
    });

    test("getClientBy must return undefined if no client is found", async () => 
    {
        const propertyName = "id";
        const propertyValue = "someValue";

        const getClientListSpy = jest.spyOn(clientsService, 'getClientsList');
        const isClientProperty = jest.spyOn(clientsService, 'isClientProperty');

        const resultClient = await clientsService.getClientBy(propertyName, propertyValue);

        expect(getClientListSpy).toHaveBeenCalled();
        expect(isClientProperty).toHaveBeenCalled();
        expect(resultClient).toBe(undefined);     
    });

    test("getClientBy must return undefined if propertyNam is not a client property", async () => 
    {
        const propertyName = "fakeProperty";
        const propertyValue = "someValue"

        const getClientListSpy = jest.spyOn(clientsService, 'getClientsList');
        const isClientProperty = jest.spyOn(clientsService, 'isClientProperty');

        const resultClient = await clientsService.getClientBy(propertyName, propertyValue);

        expect(getClientListSpy).toHaveBeenCalledTimes(0);
        expect(isClientProperty).toHaveBeenCalled();
        expect(resultClient).toBe(undefined);     
    });

    test("getClientByPolicyNumber must return specific client given a policyNumber value", async() =>
    {
        const prolicyNumber = 1234567890;
        const fakePolicy = {
            id: "policyId",
            amountInsured: "amountInsured",
            inceptionDate: "inceptionDate",
            email: "email",
            installmentPayment: "installmentPayment",
            clientId: "id2"
        };

        policiesService.getPolicyBy = jest.fn().mockImplementation((ID, policyNumber) =>
        {
            if (ID == "id" && policyNumber == prolicyNumber)
                return fakePolicy;
            return undefined;
        })

        const resultClient = await clientsService.getClientByPolicyNumber(prolicyNumber);
        expect(resultClient).toBe(fakeClientListObject.clients[1]);
    });

})