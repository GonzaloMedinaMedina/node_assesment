import dataProvider from '../src/dataProvider.js';

describe("dataProvider tests", () => {

    test('getData must return current cached data of specific key and dont call fetchData method', async () => 
    {
        let mockedResult = "mocked result",
            mockedKey = "mocked key";
        dataProvider.getCachedData = jest.fn().mockImplementation((key) => 
        {
            return key == mockedKey ? mockedResult : null;
        });

        const spyfetchData = jest.spyOn(dataProvider, 'fetchData');

        const result = await dataProvider.getData(mockedKey, null);

        expect(dataProvider.getCachedData).toHaveBeenCalled();
        expect(spyfetchData).toHaveBeenCalledTimes(0);
        expect(result).toBe(mockedResult);
    });
});