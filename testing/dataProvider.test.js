import { dataProvider } from '../src/dataProvider.js';

describe("dataProvider tests", () => {

    let mockedResult = [],
    mockedKey = "mocked key",
    mockedURL = "mocked url";   

    test('getData must return current cached data of specific key and dont call fetchData method', async () => 
    {
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

    test('getData must call fetchData if getCachedData do not has cached data given a key', async () =>
    {
        dataProvider.getCachedData = jest.fn().mockImplementation((key) => 
        {
            return null;
        });

        dataProvider.fetchData = jest.fn().mockImplementation((url, headers) =>
        {
            if (url == mockedURL)
                return mockedResult;
        })
  
        const result = await dataProvider.getData(mockedKey, mockedURL);

        expect(dataProvider.fetchData).toHaveBeenCalled();
        expect(result).toBe(mockedResult);
    });
});