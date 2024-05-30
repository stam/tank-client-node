const SERVER_URL = "http://localhost:3000";
const DIRECTIONS = ["north", "east", "south", "west"];
const TURN_DELAY = 2001;
let TANK_ID = 1;
let TURN_INDEX = 0;

function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

async function post(url, body) {
  return fetch(`${SERVER_URL}/${url}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function fire() {
  console.log("> firing");
  await post("tank", {
    tankid: TANK_ID,
    command: "fire",
  });
}

async function move(direction) {
  console.log("> moving in direction", direction);
  await post("tank", {
    tankid: TANK_ID,
    command: direction,
  });
}

async function run() {
  console.log("\n ---- TURN", TURN_INDEX);

  if (Math.random() > 0.5) {
    // const randomDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    const direction = DIRECTIONS[TURN_INDEX % DIRECTIONS.length];
    move(direction);
  } else {
    fire();
  }

  await delay(TURN_DELAY);
}

async function start() {
  while (true) {
    await run();
    TURN_INDEX++;
  }
}

start();
