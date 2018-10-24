export interface HT_IStorageService {

    /*
     * Get an item from the given storage type
     */
    getItem(key: string);

    /*
     * Get an item from the given storage type
     */
    removeItem(key: string);

    /*
     * Set an item in the given storage type
     */
    setItem(key: string, value: string);

    /*
     * It put all the keys in lower case
     */
    normaliseKeysToLowerCase();
}
