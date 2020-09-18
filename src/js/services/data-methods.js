export default class DataMethods {
  constructor(timestamp) {
    this.timestamp = timestamp;
  }

  convertFromUnix(stamp) {
    return stamp * 1000;
  }

  getDate() {
    return new Date(this.convertFromUnix(this.timestamp));
  }
}