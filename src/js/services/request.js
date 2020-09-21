export default class Request {
  constructor(url, options) {
    this.url = url;
    this.sendingMessage = options.sendingMessage;
    this.successMessage = options.successMessage;
    this.errorMessage = options.errorMessage;
  }

  async getData() {
    const req = await fetch(this.url);

    if (!req.ok) {
      return;
    }

    return await req.json();
  }
}