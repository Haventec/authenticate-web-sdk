import {HT_IStorageService} from './ht_storage.service.interface';

export class HT_LocalStorageService implements HT_IStorageService {

  private store : any;

  constructor() {
    if ( typeof(window) !== 'undefined' ) {
      this.store = window.localStorage;
    } else {
      throw new Error("window is not defined");
    }
  }

  getItem(key: string) {
    return this.store.getItem(key);
  }
  removeItem(key: string) {
    return this.store.removeItem(key);
  }
  setItem(key: string, value: string) {
    this.store.setItem(key, value);
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
