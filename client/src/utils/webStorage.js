export class WebStorage {
    static getLocalStore(keyName) {
      var keyValue = localStorage.getItem(keyName);
      return this.processGetData(keyValue);
    }
  
    static setLocalStore(keyName, keyValue) {
      localStorage.setItem(keyName, this.processSetData(keyValue));
    }
    static removeLocalStore(keyName) {
      localStorage.removeItem(keyName);
    }
    static getSessionStore(keyName) {
      var keyValue = sessionStorage.getItem(keyName);
      return this.processGetData(keyValue);
    }
  
    static setSessionStore(keyName, keyValue) {
      sessionStorage.setItem(keyName, this.processSetData(keyValue));
    }
  
    static processGetData(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    }
  
    static processSetData(value) {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      return value.toString();
    }
  }
  