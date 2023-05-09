import cache from "memory-cache";

const THIRTY_MINUTES_IN_MS = 1800000;
const REGULAR_HEADERS = 
{
    'Content-Type': 'application/json'
}

/**
 * Class to provide requested user data.
 */
export default class dataProvider
{
    constructor(){}

    /**
     * Returns the cached data given a specific key.
     * @param {"They key to be checked in cache"} key
     * @returns "The cached data."
     */
    static getCachedData(key)
    {
        return cache.get(key);
    }

    /**
     * Method to return the desired data collection idetifiend by a key name."
     * @param {"The key of the desired data collection to be managed through cache"} key 
     * @param {"The url of the data provider if no data is currently cached."} url 
     * @returns "The desired data collection."
     */
    static async getData(key, url)
    {
        let cachedData = getCachedData(key);
        
        if (cachedData === null || cachedData === undefined)
        {
            cachedData = await this.fetchData(url);
            if (cachedData !== null && cachedData !== undefined)
            {
                let cacheObject = { key: cachedData };
                cache.put(key, cacheObject, THIRTY_MINUTES_IN_MS);
            }
        }

        return cachedData;
    }

    /**
     * Method that fetch data from a provider given a url
     * @param {"The url to make the request."} url 
     * @param {"The specific header object."} headers 
     * @returns "The data in a json object."
     */
    static async fetchData(url, headers = REGULAR_HEADERS)
    {
        let result = undefined;

        await fetch(url,
        {
            headers: headers,
            method: 'GET'       
        })
        .then(response => response.json())
        .then(data => 
        {
            result = data;
        })
        .catch(error => 
        {
            console.error('Error fetching data: ' + error.stack);
            return undefined;
        })

        return result;
    }
}
