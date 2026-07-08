import { PuffinGame } from "./puffin-game.js";

const canvas = document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("Game canvas was not found.");
}

const game = new PuffinGame(canvas);
game.start();
