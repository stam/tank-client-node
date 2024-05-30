class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async post(url, body) {
    return fetch(`${this.baseUrl}/${url}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async getWorld() {
    const response = await fetch(`${this.baseUrl}/world`);
    return response.json();
  }

  async createTank(name) {
    const response = await this.post("subscribe", {
      name,
    });
    const data = await response.json();

    return data.subscribed;
  }

  async fire(tankId) {
    console.log("Firing");
    return this.post("tank", {
      tankid: tankId,
      command: "fire",
    });
  }

  async move(tankId, direction) {
    console.log("Moving in direction", direction);
    return this.post("tank", {
      tankid: tankId,
      command: direction,
    });
  }
}

module.exports = Api;
