import {HT_IStorageService} from './ht_storage.service.interface';

export class HT_TransientStorageService implements HT_IStorageService {

    private store : any = {};

    getItem(key: string) {
        return this.store[key];
    }
    removeItem(key: string) {
        this.store[key] = undefined;
    }
    setItem(key: string, value: string) {
        this.store[key] = value;
    }
    normaliseKeysToLowerCase() {
        if(this.store) {
            var i:number;
            // Create an array with the key of the elements of the local storage to normalise
            let elementToNormalise = [];
            for(i=0; i<this.store.length; i++) {
                const key = this.store.key(i);
                if(key.startsWith('ht_')) {
                    elementToNormalise.push(key);
                }
            }

            var j:number;
            for(j=0; j<elementToNormalise.length; j++) {
                const oldKey = elementToNormalise[j];
                const data = this.store.getItem(oldKey);
                const newKey = oldKey.toLowerCase();
                this.store.removeItem(oldKey);
                this.store.setItem(newKey, data);
            }
        }
    }
}
