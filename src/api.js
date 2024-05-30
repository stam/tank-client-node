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
