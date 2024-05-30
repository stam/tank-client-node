const Api = require("./api");

const SERVER_URL = "http://localhost:3000";
const TANK_NAME = "my_tank_name";

function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

class Bot {
  turnDelay = 2001;

  constructor() {
    this.api = new Api(SERVER_URL);
  }

  async initializeTank() {
    const world = await this.api.getWorld();
    const existingTank = world.tanks.find((tank) => tank.name === TANK_NAME);

    if (existingTank) {
      console.log(`Found tank with name ${TANK_NAME}`);
      return existingTank.id;
    }

    const newTank = await this.api.createTank(TANK_NAME);
    console.log(`Created tank with name "${TANK_NAME}"`);
    return newTank.id;
  }

  async start() {
    this.tankId = await this.initializeTank();

    console.log("tankId:", this.tankId);

    while (true) {
      await this.doStuff();
      await delay(this.turnDelay);
    }
  }

  async doStuff() {
    const directions = ["north", "east", "south", "west"];

    console.log();

    if (Math.random() > 0.5) {
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      this.api.move(this.tankId, randomDirection);
    } else {
      this.api.fire(this.tankId);
    }
  }
}

const bot = new Bot();
bot.start();
