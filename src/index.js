const Api = require("./api");

const SERVER_URL = "http://localhost:3000";
let TANK_ID = 1;

function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

class Bot {
  turnDelay = 2001;

  constructor() {
    this.api = new Api(SERVER_URL);
  }

  async start() {
    // TODO: CHECK IF TANK EXISTS
    while (true) {
      await this.doStuff();
      await delay(this.turnDelay);
    }
  }

  async doStuff() {
    const directions = ["north", "east", "south", "west"];

    if (Math.random() > 0.5) {
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      this.api.move(TANK_ID, randomDirection);
    } else {
      this.api.fire(TANK_ID);
    }
  }
}

const bot = new Bot();
bot.start();
