export default class Request {
  constructor(url, options) {
    this.url = url;
    this.sendingMessage = options.sendingMessage;
    this.successMessage = options.successMessage;
    this.errorMessage = options.errorMessage;
    this.setStatus = options.setStatus;
  }

  async getData() {
    const req = await fetch(this.url);

    if (!req.ok) {
      this.setStatus('error');
      return;
    }

    return await req.json();
  }
}