import {HT_IStorageService} from './ht_storage.service.interface';
import {HT_SessionStorageService} from './ht_session.storage.service';
import {HT_TransientStorageService} from "./ht_transient.storage.service";

export class HT_SessionService {

  private _IStorage: HT_IStorageService;

  constructor(nobrowser?: boolean) {
    if ( nobrowser ) {
      this._IStorage = new HT_TransientStorageService();
    } else {
      this._IStorage = new HT_SessionStorageService();
    }
  }

  getItem(key: string) {
    return this._IStorage.getItem(key);
  }

  removeItem(key: string) {
    return this._IStorage.removeItem(key);
  }

  setItem(key: string, value: string) {
    return this._IStorage.setItem(key, value);
  }

  normaliseKeysToLowerCase() {
    return this._IStorage.normaliseKeysToLowerCase();
  }
}
