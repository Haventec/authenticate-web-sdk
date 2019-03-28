
import { HT_Data } from "../model/htdata";


class HT_LocalStorage  {

  private localDataMap: Object;

  private store = window.sessionStorage;

  private static _instance: HT_LocalStorage;

  private constructor() {
    this.localDataMap = new Object();
  }

  public static get Instance(): HT_LocalStorage {
    return this._instance || (this._instance = new this());
  }


  public getItem(key: string): HT_Data|string {
    let value  = this.localDataMap[key];
    if (value) return value;
    let data = this.store.getItem(key);
    if (data) return JSON.parse(data);
    return;
  }
  
  public removeItem(key: string): void {
    delete this.localDataMap[key];
    this.store.removeItem(key);
  }

  public setItem(key: string, value:HT_Data|string): void {
    this.localDataMap[key] = value;
    this.store.setItem(key, JSON.stringify(value));
  }
  
}

export default HT_LocalStorage.Instance;
