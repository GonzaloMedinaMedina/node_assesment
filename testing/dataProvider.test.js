import dataProvider from '../src/dataProvider.js';

describe("dataProvider tests", () => {
    
    test('test', async () => 
    {
        let nonExistingKey = null,
        nonExistingUrl = null;
        const undefinedValue = await dataProvider.getData(nonExistingKey, nonExistingUrl);
        expect(undefinedValue).toBe(undefined);
    });
});