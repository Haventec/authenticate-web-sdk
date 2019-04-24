import { HT_Session_Data } from "../model/htsessiondata";


class HT_SessionStorage  {

  private sessionDataMap: Object;

  private store = window.sessionStorage;

  private static _instance: HT_SessionStorage;

  private constructor() {
    this.sessionDataMap = new Object();
  }

  public static get Instance(): HT_SessionStorage {
    return this._instance || (this._instance = new this());
  }

  public getItem(key: string): HT_Session_Data {
    let value  = this.sessionDataMap[key];
    if (value) return value;
    let data = this.store.getItem(key);
    if (data) return JSON.parse(data);
    return;
  }

  public removeItem(key: string): void {
    delete this.sessionDataMap[key];
    this.store.removeItem(key);
  }

  public setItem(key: string, value: HT_Session_Data): void {
    this.sessionDataMap[key] = value;
    this.store.setItem(key, JSON.stringify(value));
  }
  
}

export default HT_SessionStorage.Instance;
