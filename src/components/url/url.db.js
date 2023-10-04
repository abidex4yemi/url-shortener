class UrlDataStorage {
  constructor() {
    if (!UrlDataStorage.instance) {
      this.db = {};
      UrlDataStorage.instance = this;
    }

    return UrlDataStorage.instance;
  }

  addUrlData({ longUrl, shortUrlId, data }) {
    this.db[longUrl] = { data, shortUrlId };
    return data;
  }

  updateUrlData({ shortUrlId, newData }) {
    for (const key in this.db) {
      if (this.db[key].shortUrlId === shortUrlId || key === shortUrlId) {
        this.db[key].data = newData;
        return newData;
      }
    }
    return false;
  }

  getUrlData(key) {
    for (const longUrl in this.db) {
      if (this.db[longUrl].shortUrlId === key || longUrl === key) {
        return this.db[longUrl].data;
      }
    }
    return null;
  }
}

module.exports = new UrlDataStorage();
