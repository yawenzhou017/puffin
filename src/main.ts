const globalWithBuildVersion = globalThis as typeof globalThis & { __PUFFIN_BUILD_VERSION__?: string };
const buildVersion =
  typeof globalWithBuildVersion.__PUFFIN_BUILD_VERSION__ === "string"
    ? globalWithBuildVersion.__PUFFIN_BUILD_VERSION__
    : Date.now().toString();
const { PuffinGame } = await import(`./puffin-game.js?v=${encodeURIComponent(buildVersion)}`);

const canvas = document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("Game canvas was not found.");
}

const game = new PuffinGame(canvas);
game.start();

export {};
