type Vector = {
  x: number;
  y: number;
};

type Rect = Vector & {
  width: number;
  height: number;
};

type Platform = Rect & {
  ceiling?: boolean;
  fluidBarrier?: boolean;
  kind: "snow" | "ice";
  slope?: {
    startY: number;
    endY: number;
  };
  wall?: boolean;
};

type Fish = Vector & {
  collected: boolean;
  homeX?: number;
  homeY?: number;
  swimPhase?: number;
  swimRange?: number;
  swimSpeed?: number;
};

type Feather = Vector & {
  age: number;
  collected: boolean;
  driftPhase: number;
  floating?: boolean;
  rotation: number;
  underwater?: boolean;
  velocity: Vector;
};

type FlyingFeather = Vector & {
  age: number;
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  rotation: number;
};

type WaterSpit = Rect & {
  life: number;
  velocity: Vector;
};

type Penguin = Rect & {
  alerted: boolean;
  attacking?: boolean;
  charging?: boolean;
  direction: -1 | 1;
  defeated: boolean;
  diveTimer?: number;
  grounded?: boolean;
  hasDived?: boolean;
  hazardTurnCooldown?: number;
  health: number;
  hitCooldown: number;
  lumberjackAttackCooldown?: number;
  isBoss?: boolean;
  isDiver?: boolean;
  isLumberjack?: boolean;
  isMiner?: boolean;
  jumpCooldown?: number;
  maxX: number;
  minX: number;
  pickaxeSwingTimer?: number;
  speed: number;
  summonedByStageBoss?: boolean;
  velocityY?: number;
  waitingToDive?: boolean;
};

type Hazard = Rect & {
  kind: "crevasse" | "lava";
};

type ForestTree = Rect & {
  cut: boolean;
  cutProgress: number;
  direction: -1 | 1;
  falling: boolean;
  fallTimer: number;
  hitPuffin?: boolean;
};

type SplatParticle = Vector & {
  size: number;
  velocity: Vector;
};

type SplatEffect = Vector & {
  age: number;
  duration: number;
  kind: "feather" | "fish" | "penguin" | "penguin-hit" | "splash";
  particles: SplatParticle[];
};

type KeyState = {
  duck: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

type LevelBounds = {
  width: number;
  ceilingY: number;
  groundY: number;
};

const VIEW = {
  width: 960,
  height: 540,
};

const LEVEL = {
  width: 5000,
  ceilingY: 18,
  groundY: 500,
};

const PUFFIN = {
  width: 36,
  height: 46,
  duckHeight: 31,
  runSpeed: 310,
  airSpeed: 255,
  jumpSpeed: 520,
  bossJumpSpeed: 650,
  gravity: 1550,
  flightGravity: 640,
  flightLift: 500,
  fallRecoveryLift: 360,
  highAltitudeLiftScale: 0.28,
  maxFallSpeed: 760,
  maxFlightRiseSpeed: 480,
  minFlightRiseSpeed: 150,
  maxFlight: 5.5,
  flightDrainRate: 1,
  fishFlightBoost: 0.9,
  jumpFlightCost: 0.35,
  peckCooldown: 0.36,
  peckDuration: 0.18,
  peckSlideSpeed: 190,
  peckContactGrace: 0.24,
  startingHealth: 3,
  damageInvulnerability: 0.55,
  damageKnockbackX: 340,
  damageKnockbackY: 360,
  maxOxygen: 100,
  oxygenDrainRate: 10,
  oxygenRefillRate: 45,
  swimGravity: 230,
  swimLift: 780,
  swimFallRecoveryLift: 520,
  maxSwimSpeed: 260,
  maxSinkSpeed: 155,
  deepWaterDrag: 520,
};

const PENGUIN = {
  width: 40,
  height: 52,
};

const FEATHER_DESPAWN_SECONDS = 30;
const NORMAL_PENGUIN_HEALTH = 2;
const LEVEL_THREE_PENGUIN_HEALTH = 1;
const UPGRADE_FIRST_COST = 50;
const UPGRADE_COST_INCREASE = 25;
const FLIGHT_UPGRADE_AMOUNT = 1;
const OXYGEN_UPGRADE_AMOUNT = 10;
const SPEED_UPGRADE_AMOUNT = 18;
const STAGE_COUNT = 2;
const UNLOCK_ALL_LEVELS = true;
const PLAYTEST_INVINCIBLE = false;

const platforms: Platform[] = [
  { x: 0, y: 452, width: 500, height: 54, kind: "snow" },
  { x: 500, y: 408, width: 270, height: 40, kind: "ice" },
  { x: 980, y: 420, width: 300, height: 48, kind: "snow" },
  { x: 1420, y: 392, width: 430, height: 48, kind: "snow", slope: { startY: 430, endY: 376 } },
  { x: 1860, y: 342, width: 390, height: 48, kind: "ice", slope: { startY: 380, endY: 324 } },
  { x: 2325, y: 392, width: 310, height: 40, kind: "ice" },
  { x: 2670, y: 438, width: 300, height: 48, kind: "snow" },
  { x: 3005, y: 444, width: 340, height: 48, kind: "snow" },
  { x: 3525, y: 340, width: 390, height: 48, kind: "ice", slope: { startY: 410, endY: 342 } },
  { x: 3895, y: 360, width: 310, height: 48, kind: "snow" },
  { x: 4180, y: 360, width: 390, height: 48, kind: "snow", slope: { startY: 318, endY: 370 } },
  { x: 4510, y: 370, width: 430, height: 54, kind: "snow" },
];

const startingFish: Fish[] = [
  { x: 575, y: 364, collected: false },
  { x: 1640, y: 346, collected: false },
  { x: 2530, y: 256, collected: false },
  { x: 3460, y: 286, collected: false },
  { x: 4335, y: 310, collected: false },
];

const hazards: Hazard[] = [
  { x: 705, y: 500, width: 58, height: 40, kind: "crevasse" },
  { x: 2390, y: 500, width: 50, height: 40, kind: "crevasse" },
];

const exitHole: Rect = {
  x: LEVEL.width - 190,
  y: LEVEL.groundY,
  width: 92,
  height: 48,
};

const startingPenguins: Penguin[] = [
  {
    x: 565,
    y: 350,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 520,
    maxX: 745,
    speed: 96,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1060,
    y: 362,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1010,
    maxX: 1245,
    speed: 92,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1565,
    y: 352,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1460,
    maxX: 1810,
    speed: 104,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1945,
    y: 292,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1885,
    maxX: 2215,
    speed: 112,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 2395,
    y: 344,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2350,
    maxX: 2605,
    speed: 110,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 3078,
    y: 386,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 3030,
    maxX: 3310,
    speed: 102,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 3575,
    y: 292,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 3545,
    maxX: 3880,
    speed: 108,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 4625,
    y: 288,
    width: 52,
    height: 64,
    minX: 4205,
    maxX: 4910,
    speed: 82,
    direction: -1,
    alerted: false,
    health: 3,
    hitCooldown: 0,
    isBoss: true,
    defeated: false,
  },
];

const LEVEL_TWO: LevelBounds = {
  width: 3200,
  ceilingY: 26,
  groundY: 500,
};

const levelTwoPlatforms: Platform[] = [
  { x: 0, y: 442, width: 520, height: 58, kind: "ice" },
  { x: 690, y: 384, width: 200, height: 44, kind: "snow" },
  { x: 1040, y: 326, width: 190, height: 40, kind: "ice" },
  { x: 1395, y: 318, width: 210, height: 42, kind: "snow" },
  { x: 1740, y: 318, width: 210, height: 42, kind: "ice", slope: { startY: 354, endY: 292 } },
  { x: 2110, y: 292, width: 190, height: 40, kind: "snow" },
  { x: 2335, y: 286, width: 190, height: 40, kind: "ice" },
  { x: 2740, y: 374, width: 460, height: 44, kind: "ice" },
];

const levelTwoFish: Fish[] = [
  { x: 760, y: 338, collected: false },
  { x: 1510, y: 272, collected: false },
  { x: 2190, y: 246, collected: false },
];

const levelTwoHazards: Hazard[] = [
  { x: 0, y: LEVEL_TWO.groundY, width: LEVEL_TWO.width, height: 40, kind: "lava" },
];

const levelTwoExitHole: Rect = {
  x: LEVEL_TWO.width - 74,
  y: 330,
  width: 104,
  height: 58,
};

const levelTwoPenguins: Penguin[] = [
  {
    x: 735,
    y: 334,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 705,
    maxX: 875,
    speed: 82,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1080,
    y: 360,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1060,
    maxX: 1220,
    speed: 112,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 1450,
    y: 280,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1415,
    maxX: 1600,
    speed: 108,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1790,
    y: 330,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1760,
    maxX: 1940,
    speed: 82,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 2150,
    y: 390,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2130,
    maxX: 2295,
    speed: 116,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 2405,
    y: 312,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2355,
    maxX: 2515,
    speed: 110,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 3030,
    y: 298,
    width: 52,
    height: 64,
    minX: 2760,
    maxX: 3200,
    speed: 88,
    direction: -1,
    alerted: false,
    health: 3,
    hitCooldown: 0,
    isBoss: true,
    defeated: false,
  },
];

const LEVEL_THREE: LevelBounds = {
  width: 6000,
  ceilingY: 18,
  groundY: 240,
};

const levelThreePlatforms: Platform[] = [
  { x: 0, y: 198, width: 440, height: 42, kind: "ice" },
  { x: 760, y: 206, width: 250, height: 34, kind: "snow" },
  { x: 1000, y: 168, width: 210, height: 40, kind: "ice" },
  { x: 2140, y: 156, width: 230, height: 38, kind: "ice" },
  { x: 2355, y: 190, width: 250, height: 40, kind: "snow" },
  { x: 3160, y: 184, width: 270, height: 42, kind: "ice" },
  { x: 3405, y: 210, width: 210, height: 32, kind: "snow" },
  { x: 3840, y: 196, width: 330, height: 44, kind: "ice" },
  { x: 4520, y: 174, width: 250, height: 40, kind: "snow" },
  { x: 4760, y: 206, width: 220, height: 34, kind: "ice" },
  { x: 5300, y: 188, width: 250, height: 40, kind: "ice" },
  { x: 5525, y: 214, width: LEVEL_THREE.width - 5525, height: 34, kind: "snow" },
];

const levelThreeFish: Fish[] = [
  { x: 835, y: 300, collected: false },
  { x: 2240, y: 318, collected: false },
  { x: 3540, y: 306, collected: false },
  { x: 4680, y: 300, collected: false },
  { x: 5400, y: 310, collected: false },
];

const levelThreeHazards: Hazard[] = [];

const levelThreeExitHole: Rect = {
  x: LEVEL_THREE.width - 190,
  y: 184,
  width: 120,
  height: 64,
};

const levelThreePenguins: Penguin[] = [
  {
    x: 1110,
    y: 328,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1035,
    maxX: 1270,
    speed: 110,
    direction: -1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 2220,
    y: 334,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2155,
    maxX: 2370,
    speed: 116,
    direction: 1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 2465,
    y: 334,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2375,
    maxX: 2600,
    speed: 108,
    direction: -1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 3250,
    y: 360,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 3185,
    maxX: 3425,
    speed: 112,
    direction: -1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 3500,
    y: 360,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 3410,
    maxX: 3615,
    speed: 114,
    direction: 1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 4640,
    y: 340,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 4535,
    maxX: 4975,
    speed: 112,
    direction: -1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 5360,
    y: 340,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 5320,
    maxX: 5535,
    speed: 116,
    direction: 1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 5630,
    y: 366,
    width: 52,
    height: 64,
    minX: 5530,
    maxX: 5960,
    speed: 90,
    direction: -1,
    alerted: false,
    health: 3,
    hitCooldown: 0,
    isBoss: true,
    defeated: false,
  },
];

const LEVEL_FOUR: LevelBounds = {
  width: 3700,
  ceilingY: -1650,
  groundY: 500,
};

const levelFourPlatforms: Platform[] = [
  { x: 0, y: 450, width: 430, height: 54, kind: "snow" },
  { x: 430, y: 450, width: 1760, height: 1690, kind: "ice", slope: { startY: 470, endY: -1008 } },
  { x: 2165, y: -1008, width: 680, height: 54, kind: "snow" },
  { x: 2845, y: -1008, width: LEVEL_FOUR.width - 2845, height: 54, kind: "ice" },
];

const levelFourFish: Fish[] = [
  { x: 735, y: 170, collected: false },
  { x: 970, y: -30, collected: false },
  { x: 1190, y: -214, collected: false },
  { x: 1650, y: -600, collected: false },
  { x: 2105, y: -982, collected: false },
  { x: 2475, y: -1052, collected: false },
  { x: 3290, y: -1052, collected: false },
];

const levelFourHazards: Hazard[] = [];

const levelFourExitHole: Rect = {
  x: LEVEL_FOUR.width - 104,
  y: -1072,
  width: 112,
  height: 64,
};

const levelFourPenguins: Penguin[] = [
  {
    x: 590,
    y: 382,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 455,
    maxX: 1120,
    speed: 96,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 980,
    y: 126,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 860,
    maxX: 1105,
    speed: 104,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1245,
    y: -22,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1080,
    maxX: 1345,
    speed: 108,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1480,
    y: -176,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1305,
    maxX: 1585,
    speed: 106,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1795,
    y: -478,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1755,
    maxX: 2055,
    speed: 112,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 2325,
    y: -1064,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2185,
    maxX: 2665,
    speed: 112,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 3210,
    y: -1072,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2875,
    maxX: 3335,
    speed: 108,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 3355,
    y: -1072,
    width: 52,
    height: 64,
    minX: 2860,
    maxX: 3625,
    speed: 84,
    direction: -1,
    alerted: false,
    health: 3,
    hitCooldown: 0,
    isBoss: true,
    defeated: false,
  },
];

const LEVEL_FIVE_WATER_END_X = 2710;
const LEVEL_FIVE_WATER_SURFACE_Y = 250;
const LEVEL_FIVE_MINE_WALL_WIDTH = 78;
const LEVEL_FIVE_MINE_LAVA_Y = 320;
const LEVEL_FIVE_SUMMIT_LEFT_X = 8120;
const LEVEL_FIVE_SUMMIT_RIGHT_X = 9520;
const LEVEL_FIVE_BOSS_X = 9000;
const LEVEL_FIVE_BOSS_HEALTH = 18;
const LEVEL_FIVE_BOSS_AGGRO_RANGE = 1500;
const LEVEL_FIVE_BOSS_CHARGE_COOLDOWN = 5.2;
const LEVEL_FIVE_BOSS_CHARGE_GATE_PADDING = 170;
const LEVEL_FIVE_BOSS_CHARGE_SPEED = 1160;
const LEVEL_FIVE_BOSS_CHARGE_DURATION = 1.35;
const STAGE_BOSS_EXPLOSION_FLASH_DURATION = 2;
const STAGE_BOSS_EXPLOSION_BASE_FEATHERS = 50;
const STAGE_BOSS_EXPLOSION_FEATHER_STAGE_BONUS = 25;
const STAGE_BOSS_SUMMON_FISH_DROP_CHANCE = 1 / 25;
const LUMBERJACK_ATTACK_RELOAD = 1.55;

const LEVEL_FIVE: LevelBounds = {
  width: 9600,
  ceilingY: -1900,
  groundY: 500,
};

const levelFivePlatforms: Platform[] = [
  { x: 0, y: 204, width: 430, height: 42, kind: "ice" },
  { x: 660, y: 210, width: 260, height: 36, kind: "snow" },
  { x: 910, y: 168, width: 210, height: 38, kind: "ice" },
  { x: 1450, y: 194, width: 330, height: 42, kind: "ice" },
  { x: 1745, y: 222, width: 250, height: 36, kind: "snow" },
  { x: 2300, y: 242, width: 390, height: 50, kind: "ice" },
  {
    x: LEVEL_FIVE_WATER_END_X,
    y: LEVEL_FIVE_WATER_SURFACE_Y,
    width: LEVEL_FIVE_MINE_WALL_WIDTH,
    height: VIEW.height + LEVEL_FIVE.groundY - LEVEL_FIVE_WATER_SURFACE_Y,
    kind: "ice",
    fluidBarrier: true,
    wall: true,
  },
  { x: 2820, y: -118, width: 420, height: 46, kind: "ice", ceiling: true },
  { x: 3220, y: -164, width: 460, height: 48, kind: "ice", ceiling: true },
  { x: 3650, y: -194, width: 520, height: 50, kind: "ice", ceiling: true },
  { x: 4140, y: -176, width: 470, height: 48, kind: "ice", ceiling: true },
  { x: 4560, y: -136, width: 500, height: 46, kind: "ice", ceiling: true },
  { x: 2860, y: 196, width: 250, height: 42, kind: "snow" },
  { x: 3260, y: 138, width: 220, height: 42, kind: "ice" },
  { x: 3640, y: 82, width: 230, height: 42, kind: "snow" },
  { x: 4050, y: 140, width: 260, height: 42, kind: "ice" },
  { x: 4520, y: 74, width: 240, height: 42, kind: "snow" },
  { x: 4920, y: 194, width: 420, height: 52, kind: "ice" },
  { x: 5480, y: 456, width: 2680, height: 1730, kind: "ice", slope: { startY: 470, endY: -1495 } },
  { x: 8120, y: -1495, width: 780, height: 58, kind: "snow" },
  { x: 8900, y: -1495, width: 620, height: 58, kind: "ice" },
];

const levelFiveFish: Fish[] = [
  { x: 820, y: 310, collected: false },
  { x: 1600, y: 316, collected: false },
  { x: 3380, y: 92, collected: false },
  { x: 4640, y: 28, collected: false },
  { x: 6260, y: -220, collected: false },
  { x: 7200, y: -900, collected: false },
];

const levelFiveHazards: Hazard[] = [
  {
    x: LEVEL_FIVE_WATER_END_X + LEVEL_FIVE_MINE_WALL_WIDTH,
    y: LEVEL_FIVE_MINE_LAVA_Y,
    width: 2692,
    height: VIEW.height + LEVEL_FIVE.groundY - LEVEL_FIVE_MINE_LAVA_Y,
    kind: "lava",
  },
];

const levelFiveExitHole: Rect = {
  x: LEVEL_FIVE.width - 96,
  y: -1540,
  width: 108,
  height: 64,
};

const STAGE_TWO_LEVEL_ONE: LevelBounds = {
  width: 4300,
  ceilingY: 18,
  groundY: 500,
};

const stageTwoLevelOnePlatforms: Platform[] = [
  { x: 0, y: 444, width: STAGE_TWO_LEVEL_ONE.width, height: 56, kind: "snow" },
];

const stageTwoLevelOneFish: Fish[] = [
  { x: 780, y: 400, collected: false },
  { x: 1550, y: 400, collected: false },
  { x: 2480, y: 400, collected: false },
  { x: 3380, y: 400, collected: false },
];

const stageTwoLevelOneHazards: Hazard[] = [];

const stageTwoLevelOneTrees: ForestTree[] = [
  { x: 940, y: 300, width: 46, height: 144, cut: false, cutProgress: 0, direction: 1, falling: false, fallTimer: 0 },
  { x: 1910, y: 286, width: 50, height: 158, cut: false, cutProgress: 0, direction: -1, falling: false, fallTimer: 0 },
  { x: 2920, y: 306, width: 46, height: 138, cut: false, cutProgress: 0, direction: 1, falling: false, fallTimer: 0 },
];

const stageTwoLevelOneExitHole: Rect = {
  x: STAGE_TWO_LEVEL_ONE.width - 96,
  y: 356,
  width: 96,
  height: 56,
};

const stageTwoLevelOnePenguins: Penguin[] = [
  {
    x: 830,
    y: 390,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 140,
    maxX: 1150,
    speed: 116,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isLumberjack: true,
    defeated: false,
  },
  {
    x: 1235,
    y: 390,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 760,
    maxX: 1720,
    speed: 112,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 1735,
    y: 390,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1160,
    maxX: 2180,
    speed: 82,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isLumberjack: true,
    defeated: false,
  },
  {
    x: 2240,
    y: 390,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1850,
    maxX: 2800,
    speed: 110,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 2765,
    y: 390,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2380,
    maxX: 3310,
    speed: 82,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isLumberjack: true,
    defeated: false,
  },
  {
    x: 3360,
    y: 390,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 3000,
    maxX: 3840,
    speed: 114,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 3890,
    y: 380,
    width: 52,
    height: 64,
    minX: 3650,
    maxX: 4240,
    speed: 88,
    direction: -1,
    alerted: false,
    health: 4,
    hitCooldown: 0,
    isBoss: true,
    defeated: false,
  },
];

const levelFivePenguins: Penguin[] = [
  {
    x: 1050,
    y: 306,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 940,
    maxX: 1210,
    speed: 112,
    direction: -1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 1690,
    y: 316,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 1465,
    maxX: 1990,
    speed: 112,
    direction: 1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 2380,
    y: 300,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2310,
    maxX: 2770,
    speed: 116,
    direction: -1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 2580,
    y: 300,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 2410,
    maxX: 2770,
    speed: 118,
    direction: 1,
    alerted: false,
    health: LEVEL_THREE_PENGUIN_HEALTH,
    hitCooldown: 0,
    isDiver: true,
    defeated: false,
  },
  {
    x: 3335,
    y: 290,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 3265,
    maxX: 3480,
    speed: 110,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 3685,
    y: 238,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 3650,
    maxX: 3870,
    speed: 108,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 4140,
    y: 292,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 4065,
    maxX: 4310,
    speed: 114,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 4560,
    y: 226,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 4525,
    maxX: 4760,
    speed: 112,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 5020,
    y: 236,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 4935,
    maxX: 5340,
    speed: 112,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    isMiner: true,
    defeated: false,
  },
  {
    x: 5850,
    y: 160,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 5580,
    maxX: 6250,
    speed: 108,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 6280,
    y: -150,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 6000,
    maxX: 6560,
    speed: 112,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 6710,
    y: -470,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 6480,
    maxX: 7070,
    speed: 112,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 7140,
    y: -786,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 6920,
    maxX: 7420,
    speed: 112,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 7370,
    y: -956,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 7120,
    maxX: 7650,
    speed: 116,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 7580,
    y: -1110,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 7340,
    maxX: 7930,
    speed: 114,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 8290,
    y: -1552,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 8140,
    maxX: 8900,
    speed: 118,
    direction: 1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: 8790,
    y: -1552,
    width: PENGUIN.width,
    height: PENGUIN.height,
    minX: 8140,
    maxX: 9000,
    speed: 116,
    direction: -1,
    alerted: false,
    health: NORMAL_PENGUIN_HEALTH,
    hitCooldown: 0,
    defeated: false,
  },
  {
    x: LEVEL_FIVE_BOSS_X,
    y: -1559,
    width: 64,
    height: 76,
    minX: 8140,
    maxX: 9520,
    speed: 0,
    direction: -1,
    alerted: false,
    health: LEVEL_FIVE_BOSS_HEALTH,
    hitCooldown: 0,
    isBoss: true,
    defeated: false,
  },
];

const ENDLESS_ZONE: LevelBounds = {
  width: 2600,
  ceilingY: 18,
  groundY: 500,
};

const endlessZonePlatforms: Platform[] = [
  { x: 0, y: 410, width: 800, height: 58, kind: "snow" },
  { x: 800, y: 410, width: 800, height: 58, kind: "ice" },
  { x: 1600, y: 410, width: 1000, height: 58, kind: "snow" },
];

const endlessZoneHazards: Hazard[] = [];

const endlessZoneExitHole: Rect = {
  x: ENDLESS_ZONE.width - 96,
  y: ENDLESS_ZONE.groundY,
  width: 96,
  height: 56,
};

export class PuffinGame {
  private readonly context: CanvasRenderingContext2D;
  private readonly keys: KeyState = {
    duck: false,
    left: false,
    right: false,
    jump: false,
  };

  private animationFrame = 0;
  private cameraX = 0;
  private cameraY = 0;
  private facing: -1 | 1 = 1;
  private grounded = false;
  private icebergHopQueued = false;
  private jumpQueued = false;
  private peckCooldown = 0;
  private peckHasHit = false;
  private peckTimer = 0;
  private penguinContactGrace = 0;
  private stompSafetyTimer = 0;
  private bossStompKnockbackTimer = 0;
  private bossStompKnockbackX = 0;
  private bossStompAirLocked = false;
  private stageBossChargeCooldown = LEVEL_FIVE_BOSS_CHARGE_COOLDOWN;
  private stageBossChargeDirection: -1 | 1 = -1;
  private stageBossChargeHitPenguins = new Set<Penguin>();
  private stageBossChargeHitPuffin = false;
  private stageBossChargeTimer = 0;
  private bossWaterSpitCooldown = 1.6;
  private bossDefeatExplosionDone = false;
  private bossDefeatSequenceTimer = 0;
  private bossDefeatPopupTimer = 0;
  private bossDefeatFeathersAwarded = false;
  private explosionFlashTimer = 0;
  private stageBossSummonCooldown = 1.1;
  private stageBossSummonQueue: number[] = [];
  private levelFiveArenaClosed = false;
  private levelFiveGateDustTimer = 0;
  private levelFiveGateTimer = 0;
  private stageComplete = false;
  private damageInvulnerability = 0;
  private exitOpeningTimer = 0;
  private exitWasLocked = true;
  private currentStage = 1;
  private currentLevel = 1;
  private discoveryToastTimer = 0;
  private endlessMode = false;
  private endlessSpawnTimer = 0;
  private levelTitleTimer = 0;
  private previousTime = 0;
  private score = 0;
  private puffinFeathers = 0;
  private penguinKillCount = 0;
  private levelStartFeathers = 0;
  private levelStartPenguinKillCount = 0;
  private readonly completedLevels = new Set<string>();
  private readonly discoveredPenguins = new Set<string>();
  private gameOver = false;
  private menuOpen = true;
  private paused = false;
  private win = false;
  private penguinsDefeated = 0;
  private maxFlight = PUFFIN.maxFlight;
  private flight = PUFFIN.maxFlight;
  private maxHealth = PUFFIN.startingHealth;
  private health = PUFFIN.startingHealth;
  private maxOxygen = PUFFIN.maxOxygen;
  private oxygen = PUFFIN.maxOxygen;
  private flightUpgradeCount = 0;
  private flightUpgradeCost = getUpgradeCost(0);
  private healthUpgradeCount = 0;
  private healthUpgradeCost = getUpgradeCost(0);
  private oxygenUpgradeCount = 0;
  private oxygenUpgradeCost = getUpgradeCost(0);
  private speedBonus = 0;
  private speedUpgradeCount = 0;
  private speedUpgradeCost = getUpgradeCost(0);
  private flying = false;

  private velocity: Vector = {
    x: 0,
    y: 0,
  };

  private puffin: Rect = {
    x: 96,
    y: 300,
    width: PUFFIN.width,
    height: PUFFIN.height,
  };

  private level: LevelBounds = { ...LEVEL };
  private platforms = platforms;
  private hazards = hazards;
  private exitHole = exitHole;
  private splats: SplatEffect[] = [];
  private waterSpits: WaterSpit[] = [];
  private flyingFeathers: FlyingFeather[] = [];
  private feathers: Feather[] = [];
  private forestTrees: ForestTree[] = [];
  private fish: Fish[] = createFish(startingFish, false);
  private penguins: Penguin[] = createPenguinsOnSurfaces(startingPenguins, platforms, LEVEL);
  private readonly deathOverlay = document.querySelector<HTMLElement>("#death-overlay");
  private readonly discoveryName = document.querySelector<HTMLElement>("#discovery-name");
  private readonly discoveryPicture = document.querySelector<HTMLCanvasElement>("#discovery-picture");
  private readonly discoveryToast = document.querySelector<HTMLElement>("#discovery-toast");
  private readonly endlessZoneButton = document.querySelector<HTMLButtonElement>("#endless-zone-button");
  private readonly flightUpgradeButton = document.querySelector<HTMLButtonElement>("#flight-upgrade");
  private readonly flightUpgradeCostLabel = document.querySelector<HTMLElement>("#flight-upgrade-cost");
  private readonly healthUpgradeButton = document.querySelector<HTMLButtonElement>("#health-upgrade");
  private readonly healthUpgradeCostLabel = document.querySelector<HTMLElement>("#health-upgrade-cost");
  private readonly hudFlightFill = document.querySelector<HTMLElement>("#hud-flight-fill");
  private readonly hudHealth = document.querySelector<HTMLElement>("#hud-health");
  private readonly hudControls = document.querySelector<HTMLElement>("#hud-controls");
  private readonly hudInfo = document.querySelector<HTMLElement>(".info-hud");
  private readonly hudMeters = document.querySelector<HTMLElement>(".meter-hud");
  private readonly hudOxygen = document.querySelector<HTMLElement>("#hud-oxygen");
  private readonly hudOxygenFill = document.querySelector<HTMLElement>("#hud-oxygen-fill");
  private readonly hudOxygenValue = document.querySelector<HTMLElement>("#hud-oxygen-value");
  private readonly hudStats = document.querySelector<HTMLElement>("#hud-stats");
  private readonly journalBackButton = document.querySelector<HTMLButtonElement>("#journal-back");
  private readonly journalButton = document.querySelector<HTMLButtonElement>("#journal-button");
  private readonly journalCards = Array.from(document.querySelectorAll<HTMLButtonElement>(".journal-card"));
  private readonly journalDetail = document.querySelector<HTMLElement>("#journal-detail");
  private readonly journalDetailBackButton = document.querySelector<HTMLButtonElement>("#journal-detail-back");
  private readonly journalDetailEntries = Array.from(document.querySelectorAll<HTMLElement>("[data-penguin-detail]"));
  private readonly journalEmpty = document.querySelector<HTMLElement>("#journal-empty");
  private readonly journalGrid = document.querySelector<HTMLElement>(".journal-grid");
  private readonly journalOverlay = document.querySelector<HTMLElement>("#journal-menu");
  private readonly journalPenguinPictures = Array.from(
    document.querySelectorAll<HTMLCanvasElement>(".journal-penguin-picture"),
  );
  private readonly levelButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".level-button"));
  private readonly levelsBackButton = document.querySelector<HTMLButtonElement>("#levels-back");
  private readonly levelsOverlay = document.querySelector<HTMLElement>("#levels-menu");
  private readonly mainMenuButton = document.querySelector<HTMLButtonElement>("#main-menu-button");
  private readonly mainMenuOverlay = document.querySelector<HTMLElement>("#main-menu");
  private readonly pauseButton = document.querySelector<HTMLButtonElement>("#pause-button");
  private readonly pauseMainMenuButton = document.querySelector<HTMLButtonElement>("#pause-main-menu");
  private readonly pauseOverlay = document.querySelector<HTMLElement>("#pause-overlay");
  private readonly playButton = document.querySelector<HTMLButtonElement>("#play-game");
  private readonly oxygenUpgradeButton = document.querySelector<HTMLButtonElement>("#oxygen-upgrade");
  private readonly oxygenUpgradeCostLabel = document.querySelector<HTMLElement>("#oxygen-upgrade-cost");
  private readonly resumeButton = document.querySelector<HTMLButtonElement>("#resume-game");
  private readonly shopBackButton = document.querySelector<HTMLButtonElement>("#shop-back");
  private readonly shopButton = document.querySelector<HTMLButtonElement>("#shop-button");
  private readonly shopFeatherTotal = document.querySelector<HTMLElement>("#shop-feather-total");
  private readonly shopOverlay = document.querySelector<HTMLElement>("#shop-menu");
  private readonly speedUpgradeButton = document.querySelector<HTMLButtonElement>("#speed-upgrade");
  private readonly speedUpgradeCostLabel = document.querySelector<HTMLElement>("#speed-upgrade-cost");
  private readonly stageCompleteMainMenuButton =
    document.querySelector<HTMLButtonElement>("#stage-complete-main-menu");
  private readonly stageCompleteOverlay = document.querySelector<HTMLElement>("#stage-complete-overlay");
  private readonly stageLabel = document.querySelector<HTMLElement>("#stage-label");
  private readonly stageNextButton = document.querySelector<HTMLButtonElement>("#stage-next");
  private readonly stagePreviousButton = document.querySelector<HTMLButtonElement>("#stage-previous");
  private readonly tryAgainButton = document.querySelector<HTMLButtonElement>("#try-again");

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("This browser does not support 2D canvas rendering.");
    }

    this.context = context;
    this.resize();
    this.playButton?.addEventListener("click", this.handlePlay);
    this.endlessZoneButton?.addEventListener("click", this.handleEndlessZone);
    this.levelsBackButton?.addEventListener("click", this.handleLevelsBack);
    for (const levelButton of this.levelButtons) {
      levelButton.addEventListener("click", this.handleLevelSelect);
    }
    this.shopButton?.addEventListener("click", this.handleShop);
    this.shopBackButton?.addEventListener("click", this.handleShopBack);
    this.journalButton?.addEventListener("click", this.handleJournal);
    this.journalBackButton?.addEventListener("click", this.handleJournalBack);
    this.journalDetailBackButton?.addEventListener("click", this.handleJournalDetailBack);
    for (const journalCard of this.journalCards) {
      journalCard.addEventListener("click", this.handleJournalCard);
    }
    this.flightUpgradeButton?.addEventListener("click", this.handleFlightUpgrade);
    this.healthUpgradeButton?.addEventListener("click", this.handleHealthUpgrade);
    this.oxygenUpgradeButton?.addEventListener("click", this.handleOxygenUpgrade);
    this.speedUpgradeButton?.addEventListener("click", this.handleSpeedUpgrade);
    this.stageNextButton?.addEventListener("click", this.handleStageNext);
    this.stagePreviousButton?.addEventListener("click", this.handleStagePrevious);
    this.stageCompleteMainMenuButton?.addEventListener("click", this.handleMainMenu);
    this.mainMenuButton?.addEventListener("click", this.handleMainMenu);
    this.pauseButton?.addEventListener("click", this.handlePause);
    this.pauseMainMenuButton?.addEventListener("click", this.handleMainMenu);
    this.resumeButton?.addEventListener("click", this.handleResume);
    this.tryAgainButton?.addEventListener("click", this.handleTryAgain);
    this.updateShopDisplay();
    this.drawJournalPenguinPictures();
    this.playButton?.focus();
    window.addEventListener("resize", this.resize);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  start(): void {
    this.previousTime = performance.now();
    this.animationFrame = requestAnimationFrame(this.tick);
  }

  stop(): void {
    cancelAnimationFrame(this.animationFrame);
    this.playButton?.removeEventListener("click", this.handlePlay);
    this.endlessZoneButton?.removeEventListener("click", this.handleEndlessZone);
    this.levelsBackButton?.removeEventListener("click", this.handleLevelsBack);
    for (const levelButton of this.levelButtons) {
      levelButton.removeEventListener("click", this.handleLevelSelect);
    }
    this.shopButton?.removeEventListener("click", this.handleShop);
    this.shopBackButton?.removeEventListener("click", this.handleShopBack);
    this.journalButton?.removeEventListener("click", this.handleJournal);
    this.journalBackButton?.removeEventListener("click", this.handleJournalBack);
    this.journalDetailBackButton?.removeEventListener("click", this.handleJournalDetailBack);
    for (const journalCard of this.journalCards) {
      journalCard.removeEventListener("click", this.handleJournalCard);
    }
    this.flightUpgradeButton?.removeEventListener("click", this.handleFlightUpgrade);
    this.healthUpgradeButton?.removeEventListener("click", this.handleHealthUpgrade);
    this.oxygenUpgradeButton?.removeEventListener("click", this.handleOxygenUpgrade);
    this.speedUpgradeButton?.removeEventListener("click", this.handleSpeedUpgrade);
    this.stageNextButton?.removeEventListener("click", this.handleStageNext);
    this.stagePreviousButton?.removeEventListener("click", this.handleStagePrevious);
    this.stageCompleteMainMenuButton?.removeEventListener("click", this.handleMainMenu);
    this.mainMenuButton?.removeEventListener("click", this.handleMainMenu);
    this.pauseButton?.removeEventListener("click", this.handlePause);
    this.pauseMainMenuButton?.removeEventListener("click", this.handleMainMenu);
    this.resumeButton?.removeEventListener("click", this.handleResume);
    this.tryAgainButton?.removeEventListener("click", this.handleTryAgain);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  private tick = (time: number): void => {
    const deltaSeconds = Math.min((time - this.previousTime) / 1000, 0.05);
    this.previousTime = time;

    this.update(deltaSeconds);
    this.render();

    this.animationFrame = requestAnimationFrame(this.tick);
  };

  private update(deltaSeconds: number): void {
    if (this.gameOver || this.menuOpen || this.paused) {
      return;
    }

    this.peckCooldown = Math.max(0, this.peckCooldown - deltaSeconds);
    this.peckTimer = Math.max(0, this.peckTimer - deltaSeconds);
    this.penguinContactGrace = Math.max(0, this.penguinContactGrace - deltaSeconds);
    this.stompSafetyTimer = Math.max(0, this.stompSafetyTimer - deltaSeconds);
    this.bossStompKnockbackTimer = Math.max(0, this.bossStompKnockbackTimer - deltaSeconds);
    if (this.bossStompAirLocked && (this.grounded || this.isUnderwater())) {
      this.bossStompAirLocked = false;
      this.bossStompKnockbackTimer = 0;
      this.bossStompKnockbackX = 0;
    }
    this.damageInvulnerability = Math.max(0, this.damageInvulnerability - deltaSeconds);
    this.explosionFlashTimer = Math.max(0, this.explosionFlashTimer - deltaSeconds);
    this.levelFiveGateDustTimer = Math.max(0, this.levelFiveGateDustTimer - deltaSeconds);
    if (this.levelFiveGateTimer > 0) {
      const previousGateTimer = this.levelFiveGateTimer;
      this.levelFiveGateTimer = Math.max(0, this.levelFiveGateTimer - deltaSeconds);
      if (previousGateTimer > 0 && this.levelFiveGateTimer === 0) {
        this.levelFiveGateDustTimer = 0.55;
      }
    }
    this.exitOpeningTimer = Math.max(0, this.exitOpeningTimer - deltaSeconds);
    this.discoveryToastTimer = Math.max(0, this.discoveryToastTimer - deltaSeconds);
    this.updateDiscoveryToast();
    this.levelTitleTimer = Math.max(0, this.levelTitleTimer - deltaSeconds);
    this.updateDuckState();

    const horizontal = Number(this.keys.right) - Number(this.keys.left);
    const moveSpeed = (this.grounded ? PUFFIN.runSpeed : PUFFIN.airSpeed) + this.speedBonus;

    if (horizontal !== 0) {
      this.facing = horizontal < 0 ? -1 : 1;
    }

    const peckSlide = this.peckTimer > 0 ? this.facing * PUFFIN.peckSlideSpeed : 0;
    this.velocity.x =
      this.bossStompAirLocked || this.bossStompKnockbackTimer > 0
        ? this.bossStompKnockbackX
        : horizontal * moveSpeed + peckSlide;

    if (this.jumpQueued && this.grounded) {
      const jumpSpeed = this.currentLevel === 5 && this.levelFiveArenaClosed
        ? PUFFIN.bossJumpSpeed
        : this.isNearBoss() ? PUFFIN.bossJumpSpeed : PUFFIN.jumpSpeed;
      this.velocity.y = -jumpSpeed;
      if (!PLAYTEST_INVINCIBLE) {
        this.flight = Math.max(0, this.flight - PUFFIN.jumpFlightCost);
      }
      this.grounded = false;
      this.flying = true;
    }

    this.jumpQueued = false;
    this.updateFlight(deltaSeconds);
    if (PLAYTEST_INVINCIBLE) {
      this.health = this.maxHealth;
      this.oxygen = this.maxOxygen;
      this.flight = this.maxFlight;
    }
    if (this.currentLevel === 5 && this.levelFiveArenaClosed) {
      this.flight = this.maxFlight;
    }
    const previousX = this.puffin.x;
    this.puffin.x += this.velocity.x * deltaSeconds;
    this.puffin.x = clamp(this.puffin.x, 0, this.level.width - this.puffin.width);
    this.resolveWallCollisions(previousX);
    this.resolveLevelFiveArenaGates();
    this.checkPeckAttack();

    const previousY = this.puffin.y;
    this.puffin.y += this.velocity.y * deltaSeconds;
    this.resolveCeilingCollision(previousY);
    this.checkPenguins(previousY);
    if (this.gameOver) {
      return;
    }

    this.resolveVerticalCollisions(previousY);
    this.updateLevelFiveArenaGates();
    this.updateOxygen(deltaSeconds);
    if (this.gameOver) {
      return;
    }

    this.updatePenguins(deltaSeconds);
    this.updateForestTrees(deltaSeconds);
    this.updateEndlessSpawns(deltaSeconds);
    this.updateStageBossSummons(deltaSeconds);
    this.updateBossDefeatSequence(deltaSeconds);
    this.updateWaterSpits(deltaSeconds);
    this.updateFish(deltaSeconds);
    this.updateSplats(deltaSeconds);
    this.updateFeathers(deltaSeconds);
    if (this.explosionFlashTimer <= 0) {
      this.updateFlyingFeathers(deltaSeconds);
    }
    this.collectFish();
    this.collectFeathers();
    this.checkHazards();
    if (this.gameOver) {
      return;
    }

    this.updateExitOpening();
    this.updateCamera(deltaSeconds);
    this.markVisiblePenguinsSeen();

    if (this.endlessMode) {
      return;
    }

    if (this.isEnteringExitHole()) {
      if (this.currentStage === 2) {
        this.completedLevels.add(this.getLevelKey());
        this.updateLevelsDisplay();
        this.win = true;
        return;
      }

      if (this.currentLevel === 1) {
        this.completedLevels.add(this.getLevelKey());
        this.updateLevelsDisplay();
        this.startLevelTwo();
        return;
      }

      if (this.currentLevel === 2) {
        this.completedLevels.add(this.getLevelKey());
        this.updateLevelsDisplay();
        this.startLevelThree();
        return;
      }

      if (this.currentLevel === 3) {
        this.completedLevels.add(this.getLevelKey());
        this.updateLevelsDisplay();
        this.startLevelFour();
        return;
      }

      if (this.currentLevel === 4) {
        this.completedLevels.add(this.getLevelKey());
        this.updateLevelsDisplay();
        this.startLevelFive();
        return;
      }

      this.completedLevels.add(this.getLevelKey());
      this.updateLevelsDisplay();
      this.win = true;
    }
  }

  private updateFlight(deltaSeconds: number): void {
    this.flying = false;

    if (this.isUnderwater()) {
      const depth = this.puffin.y + this.puffin.height * 0.45 - this.level.groundY;
      const depthProgress = clamp(depth / 240, 0, 1);

      this.velocity.y += PUFFIN.swimGravity * (1 - depthProgress * 0.72) * deltaSeconds;

      if (this.velocity.y > 0) {
        this.velocity.y -= PUFFIN.deepWaterDrag * depthProgress * deltaSeconds;
      }

      if (this.keys.jump) {
        const fallRecovery = this.velocity.y > 0 ? PUFFIN.swimFallRecoveryLift : 0;
        this.velocity.y -= (PUFFIN.swimLift + fallRecovery) * deltaSeconds;
      }

      this.velocity.y = clamp(this.velocity.y, -PUFFIN.maxSwimSpeed, PUFFIN.maxSinkSpeed);
      return;
    }

    const canFly =
      !this.grounded && this.keys.jump && this.flight > 0 && !this.bossStompAirLocked && this.bossStompKnockbackTimer <= 0;

    if (canFly) {
      const bossArenaJump = this.currentLevel === 5 && this.levelFiveArenaClosed;
      const altitudeProgress = getAltitudeProgress(this.puffin, this.level);
      const liftScale = bossArenaJump ? 1.08 : 1 - altitudeProgress * (1 - PUFFIN.highAltitudeLiftScale);
      const riseSpeedCap =
        bossArenaJump
          ? 500
          : PUFFIN.minFlightRiseSpeed + (1 - altitudeProgress) * (PUFFIN.maxFlightRiseSpeed - PUFFIN.minFlightRiseSpeed);

      this.flying = true;
      if (!PLAYTEST_INVINCIBLE && !bossArenaJump) {
        this.flight = Math.max(0, this.flight - deltaSeconds * PUFFIN.flightDrainRate);
      }
      this.velocity.y += PUFFIN.flightGravity * deltaSeconds;
      this.velocity.y -= (PUFFIN.flightLift * liftScale + (this.velocity.y > 0 ? PUFFIN.fallRecoveryLift : 0)) * deltaSeconds;
      this.velocity.y = Math.max(this.velocity.y, -riseSpeedCap);
    } else {
      this.velocity.y += PUFFIN.gravity * deltaSeconds;
    }

    this.velocity.y = Math.min(this.velocity.y, PUFFIN.maxFallSpeed);
  }

  private updateOxygen(deltaSeconds: number): void {
    if (!this.hasWaterSection()) {
      this.oxygen = this.maxOxygen;
      return;
    }

    if (this.isUnderwater()) {
      this.oxygen = Math.max(0, this.oxygen - PUFFIN.oxygenDrainRate * deltaSeconds);

      if (this.oxygen <= 0) {
        if (PLAYTEST_INVINCIBLE) {
          this.oxygen = this.maxOxygen;
          return;
        }

        this.dieAndShowRetry();
      }

      return;
    }

    this.oxygen = Math.min(this.maxOxygen, this.oxygen + PUFFIN.oxygenRefillRate * deltaSeconds);
  }

  private isUnderwater(): boolean {
    return this.isInWaterSection(this.puffin) && this.puffin.y + this.puffin.height * 0.45 > this.getWaterSurfaceY();
  }

  private isUnderwaterPenguin(penguin: Penguin): boolean {
    return this.isInWaterSection(penguin) && penguin.y + penguin.height * 0.45 > this.getWaterSurfaceY();
  }

  private hasWaterSection(): boolean {
    return this.currentLevel === 3 || this.currentLevel === 5;
  }

  private getWaterSurfaceY(): number {
    return this.currentLevel === 5 ? LEVEL_FIVE_WATER_SURFACE_Y : this.level.groundY;
  }

  private getWaterBottomY(): number {
    return this.currentLevel === 5 ? this.level.groundY : VIEW.height - 8;
  }

  private isInWaterSection(actor: Pick<Vector, "x">): boolean {
    if (this.currentLevel === 3) {
      return true;
    }

    return this.currentLevel === 5 && actor.x < LEVEL_FIVE_WATER_END_X - 18;
  }

  private updateDuckState(): void {
    const wantsDuck = this.keys.duck && this.grounded && !this.isUnderwater();
    const targetHeight = wantsDuck ? PUFFIN.duckHeight : PUFFIN.height;

    if (this.puffin.height === targetHeight) {
      return;
    }

    const footY = this.puffin.y + this.puffin.height;

    if (targetHeight > this.puffin.height && !this.hasStandingRoom(footY, targetHeight)) {
      return;
    }

    this.puffin.height = targetHeight;
    this.puffin.y = footY - this.puffin.height;
  }

  private hasStandingRoom(footY: number, targetHeight: number): boolean {
    const standingBox: Rect = {
      x: this.puffin.x + 4,
      y: footY - targetHeight,
      width: this.puffin.width - 8,
      height: targetHeight,
    };

    return !this.platforms.some((platform) => rectanglesOverlap(standingBox, platform));
  }

  private resolveCeilingCollision(previousY: number): void {
    for (const platform of this.platforms) {
      if (platform.ceiling !== true || this.velocity.y >= 0 || !rectanglesOverlap(this.puffin, platform)) {
        continue;
      }

      const previousHeadY = previousY;
      const ceilingBottom = platform.y + platform.height;

      if (previousHeadY >= ceilingBottom - 2) {
        this.puffin.y = ceilingBottom;
        this.velocity.y = 0;
      }
    }

    if (this.currentLevel === 5 && this.levelFiveArenaClosed) {
      const arenaCeilingY = levelFivePlatforms[19].y - 430;

      if (this.puffin.y < arenaCeilingY) {
        this.puffin.y = arenaCeilingY;

        if (this.velocity.y < 0) {
          this.velocity.y = 0;
        }
      }

      return;
    }

    if (this.puffin.y < this.level.ceilingY) {
      this.puffin.y = this.level.ceilingY;

      if (this.velocity.y < 0) {
        this.velocity.y = 0;
      }
    }
  }

  private resolveVerticalCollisions(previousY: number): void {
    const wasGrounded = this.grounded;
    this.grounded = false;

    for (const platform of this.platforms) {
      if (platform.ceiling) {
        continue;
      }

      const previousFootY = previousY + this.puffin.height;
      const platformTop = getBestPlatformTopY(platform, this.puffin);
      const footY = this.puffin.y + this.puffin.height;
      const wasAbove = platformTop !== null && previousFootY <= platformTop;
      const isLevelFourIceberg = this.isFilledSlopePlatform(platform);
      const canSnapToSlope =
        wasGrounded &&
        platform.slope !== undefined &&
        platformTop !== null &&
        footY >= platformTop - 24 &&
        footY <= platformTop + 34;
      const canSnapToFlat =
        wasGrounded &&
        platform.slope === undefined &&
        platformTop !== null &&
        footY >= platformTop - 24 &&
        footY <= platformTop + 46;
      const isInsideFilledSlope =
        isLevelFourIceberg &&
        platformTop !== null &&
        footY >= platformTop - 24 &&
        this.puffin.y < platformTop + platform.height;

      if (
        this.velocity.y >= 0 &&
        (wasAbove || canSnapToSlope || canSnapToFlat || isInsideFilledSlope) &&
        platformTop !== null &&
        footY >= platformTop - 24 &&
        this.puffin.x + this.puffin.width > platform.x &&
        this.puffin.x < platform.x + platform.width
      ) {
        this.puffin.y = platformTop - this.puffin.height;
        this.velocity.y = 0;
        this.grounded = true;
        this.flying = false;
      }
    }

    for (const tree of this.forestTrees) {
      if (tree.cut || tree.falling) {
        continue;
      }

      const previousFootY = previousY + this.puffin.height;
      const footY = this.puffin.y + this.puffin.height;

      if (
        this.velocity.y >= 0 &&
        previousFootY <= tree.y &&
        footY >= tree.y - 12 &&
        this.puffin.x + this.puffin.width > tree.x &&
        this.puffin.x < tree.x + tree.width
      ) {
        this.puffin.y = tree.y - this.puffin.height;
        this.velocity.y = 0;
        this.grounded = true;
        this.flying = false;
      }
    }

    const wasAboveGround = previousY + this.puffin.height <= this.level.groundY;
    const overGroundHazard = this.hazards.some(
      (hazard) => this.puffin.x < hazard.x + hazard.width && this.puffin.x + this.puffin.width > hazard.x,
    );
    const overExitHole = this.currentLevel === 1 && !this.isBossAlive() && this.isOverExitHole();

    if (
      this.velocity.y >= 0 &&
      this.currentLevel !== 3 &&
      !(this.currentLevel === 5 && this.isInWaterSection(this.puffin)) &&
      wasAboveGround &&
      !overGroundHazard &&
      !overExitHole &&
      this.puffin.y + this.puffin.height >= this.level.groundY
    ) {
      this.puffin.y = this.level.groundY - this.puffin.height;
      this.velocity.y = 0;
      this.grounded = true;
      this.flying = false;
    }

    if (this.currentLevel === 3 && this.puffin.y + this.puffin.height > VIEW.height - 8) {
      this.puffin.y = VIEW.height - 8 - this.puffin.height;
      this.velocity.y = Math.min(this.velocity.y, 0);
    }

    this.resolveWaterLedgeClimb();
  }

  private resolveWallCollisions(previousX: number): void {
    for (const platform of this.platforms) {
      if (platform.wall !== true || !rectanglesOverlap(this.puffin, platform)) {
        continue;
      }

      if (previousX + this.puffin.width <= platform.x) {
        this.puffin.x = platform.x - this.puffin.width;
        this.velocity.x = Math.min(0, this.velocity.x);
      } else if (previousX >= platform.x + platform.width) {
        this.puffin.x = platform.x + platform.width;
        this.velocity.x = Math.max(0, this.velocity.x);
      }
    }

    for (const tree of this.forestTrees) {
      if (tree.cut || tree.falling || !rectanglesOverlap(this.puffin, tree)) {
        continue;
      }

      if (previousX + this.puffin.width <= tree.x) {
        this.puffin.x = tree.x - this.puffin.width;
        this.velocity.x = Math.min(0, this.velocity.x);
      } else if (previousX >= tree.x + tree.width) {
        this.puffin.x = tree.x + tree.width;
        this.velocity.x = Math.max(0, this.velocity.x);
      }
    }
  }

  private updateLevelFiveArenaGates(): void {
    if (this.currentLevel !== 5 || this.levelFiveArenaClosed || this.stageComplete) {
      return;
    }

    const summit = levelFivePlatforms[19];
    const footY = this.puffin.y + this.puffin.height;
    const onSummit =
      this.puffin.x + this.puffin.width > summit.x &&
      this.puffin.x < summit.x + summit.width &&
      Math.abs(footY - summit.y) < 18;

    if (onSummit) {
      this.levelFiveArenaClosed = true;
      this.levelFiveGateTimer = 0.72;
      this.levelFiveGateDustTimer = 0;
      const boss = this.getLivingBoss();
      if (boss) {
        boss.alerted = true;
      }
      this.resolveLevelFiveArenaGates();
    }
  }

  private resolveLevelFiveArenaGates(): void {
    if (this.currentLevel !== 5 || !this.levelFiveArenaClosed || this.stageComplete) {
      return;
    }

    this.puffin.x = clamp(this.puffin.x, LEVEL_FIVE_SUMMIT_LEFT_X, LEVEL_FIVE_SUMMIT_RIGHT_X - this.puffin.width);
  }

  private resolveLevelFivePenguinArenaGates(penguin: Penguin): void {
    if (this.currentLevel !== 5 || !this.levelFiveArenaClosed || this.stageComplete || penguin.isBoss) {
      return;
    }

    penguin.x = clamp(penguin.x, LEVEL_FIVE_SUMMIT_LEFT_X, LEVEL_FIVE_SUMMIT_RIGHT_X - penguin.width);
  }

  private resolveWaterLedgeClimb(): void {
    const wantsIcebergHop = this.icebergHopQueued;
    this.icebergHopQueued = false;

    if (
      !wantsIcebergHop ||
      !this.hasWaterSection() ||
      !this.isInWaterSection(this.puffin) ||
      this.grounded ||
      this.puffin.y + this.puffin.height * 0.7 < this.getWaterSurfaceY()
    ) {
      return;
    }

    const footY = this.puffin.y + this.puffin.height;
    const puffinCenterX = this.puffin.x + this.puffin.width / 2;

    for (const platform of this.platforms) {
      if (platform.ceiling) {
        continue;
      }

      const platformTop = getBestPlatformTopY(platform, this.puffin);
      const closeToPlatformSide = puffinCenterX > platform.x - 28 && puffinCenterX < platform.x + platform.width + 28;

      if (
        platformTop !== null &&
        closeToPlatformSide &&
        footY >= platformTop - 12 &&
        this.puffin.y <= platformTop + 74 &&
        wantsIcebergHop
      ) {
        this.puffin.y = platformTop - this.puffin.height;
        this.velocity.y = 0;
        this.grounded = true;
        this.flying = false;
        return;
      }
    }
  }

  private collectFish(): void {
    for (const fish of this.fish) {
      const fishBox = {
        x: fish.x - 18,
        y: fish.y - 12,
        width: 36,
        height: 24,
      };

      if (!fish.collected && rectanglesOverlap(this.puffin, fishBox)) {
        fish.collected = true;
        this.score += 1;
        this.flight = Math.min(this.maxFlight, this.flight + PUFFIN.fishFlightBoost);
        this.spawnFishSplat(fish.x, fish.y);
      }
    }
  }

  private updateFish(deltaSeconds: number): void {
    if (!this.hasWaterSection()) {
      return;
    }

    for (const fish of this.fish) {
      if (fish.collected) {
        continue;
      }

      if ((fish.swimSpeed ?? 0) <= 0) {
        continue;
      }

      fish.homeX ??= fish.x;
      fish.homeY ??= fish.y;
      fish.swimPhase = (fish.swimPhase ?? 0) + (fish.swimSpeed ?? 1) * deltaSeconds;

      const phase = fish.swimPhase;
      fish.x = fish.homeX + Math.sin(phase) * (fish.swimRange ?? 26);
      fish.y = fish.homeY + Math.sin(phase * 0.7 + fish.homeX * 0.02) * 8;
    }
  }

  private collectFeathers(): void {
    for (const feather of this.feathers) {
      const featherBox = {
        x: feather.x - 13,
        y: feather.y - 13,
        width: 26,
        height: 26,
      };

      if (!feather.collected && rectanglesOverlap(this.puffin, featherBox)) {
        feather.collected = true;
        this.puffinFeathers += 1;
        this.levelStartFeathers = this.puffinFeathers;
        this.updateShopDisplay();
        this.spawnFeatherSplat(feather.x, feather.y);
      }
    }
  }

  private updateFeathers(deltaSeconds: number): void {
    for (const feather of this.feathers) {
      if (feather.collected) {
        continue;
      }

      feather.age += deltaSeconds;
      if (feather.age >= FEATHER_DESPAWN_SECONDS) {
        feather.collected = true;
        continue;
      }

      const previousY = feather.y;
      feather.driftPhase += deltaSeconds * 4.2;

      if (feather.floating === true) {
        feather.velocity.x += Math.sin(feather.driftPhase) * 4 * deltaSeconds;
        feather.velocity.x *= 0.88;
        feather.x += feather.velocity.x * deltaSeconds;
        feather.y = this.getWaterSurfaceY() - 10 + Math.sin(feather.driftPhase * 1.4) * 3;
      } else if (feather.underwater === true) {
        feather.velocity.y = Math.min(feather.velocity.y + 42 * deltaSeconds, -22);
        feather.velocity.x += Math.sin(feather.driftPhase) * 8 * deltaSeconds;
        feather.velocity.x *= 0.92;
        feather.x += feather.velocity.x * deltaSeconds;
        feather.y += feather.velocity.y * deltaSeconds;
      } else {
        feather.velocity.y = Math.min(feather.velocity.y + 520 * deltaSeconds, 310);
        feather.velocity.x += Math.sin(feather.driftPhase) * 12 * deltaSeconds;
        feather.velocity.x *= 0.94;
        feather.x += feather.velocity.x * deltaSeconds;
        feather.y += feather.velocity.y * deltaSeconds;
      }

      feather.rotation = Math.sin(feather.driftPhase) * 0.28;

      if (this.isInWaterSection(feather) && feather.underwater === true && feather.y <= this.getWaterSurfaceY() - 10) {
        feather.y = this.getWaterSurfaceY() - 10;
        feather.velocity.y = 0;
        feather.velocity.x *= 0.45;
        feather.underwater = false;
        feather.floating = true;
      } else if (this.isInWaterSection(feather) && feather.underwater !== true && feather.y >= this.getWaterSurfaceY() - 10) {
        feather.y = this.getWaterSurfaceY() - 10;
        feather.velocity.y = 0;
        feather.velocity.x *= 0.45;
        feather.floating = true;
      }

      if (this.isFeatherInLava(feather)) {
        feather.collected = true;
        this.spawnFeatherSplat(feather.x, feather.y);
        continue;
      }

      this.resolveFeatherPlatformLanding(feather, previousY);

      if (this.isFeatherInLava(feather)) {
        feather.collected = true;
        this.spawnFeatherSplat(feather.x, feather.y);
        continue;
      }

      if (!this.isInWaterSection(feather) && feather.y > this.level.groundY - 14) {
        feather.y = this.level.groundY - 14;
        feather.velocity.y = 0;

        if (this.isFeatherInLava(feather)) {
          feather.collected = true;
          this.spawnFeatherSplat(feather.x, feather.y);
        }
      }
    }
  }

  private updateFlyingFeathers(deltaSeconds: number): void {
    if (this.flyingFeathers.length === 0) {
      return;
    }

    const targetX = this.puffin.x + this.puffin.width / 2;
    const targetY = this.puffin.y + this.puffin.height * 0.32;

    for (const feather of this.flyingFeathers) {
      feather.age += deltaSeconds;

      if (feather.age < feather.delay) {
        feather.y -= 18 * deltaSeconds;
        feather.rotation += 1.8 * deltaSeconds;
        continue;
      }

      const progress = clamp((feather.age - feather.delay) / feather.duration, 0, 1);
      const eased = progress * progress * (3 - 2 * progress);
      const arc = Math.sin(progress * Math.PI) * 46;
      feather.x = feather.startX + (targetX - feather.startX) * eased;
      feather.y = feather.startY + (targetY - feather.startY) * eased - arc;
      feather.rotation += 3.2 * deltaSeconds;
    }

    const arriving: FlyingFeather[] = [];
    this.flyingFeathers = this.flyingFeathers.filter((feather) => {
      if (feather.age < feather.delay + feather.duration) {
        return true;
      }
      arriving.push(feather);
      return false;
    });

    if (arriving.length > 0) {
      this.puffinFeathers += arriving.length;
      this.levelStartFeathers = this.puffinFeathers;
      this.updateShopDisplay();
      this.spawnFeatherSplat(targetX, targetY);
    }
  }

  private updateForestTrees(deltaSeconds: number): void {
    if (!this.isStageTwoForestLevel() || this.forestTrees.length === 0) {
      return;
    }

    for (const tree of this.forestTrees) {
      if (tree.falling) {
        tree.fallTimer += deltaSeconds;

        if (!tree.hitPuffin && rectanglesOverlap(this.getFallingTreeHitbox(tree), this.puffin)) {
          tree.hitPuffin = true;
          this.velocity.y = Math.max(this.velocity.y, 260);
          this.grounded = false;
          this.damagePuffin(this.puffin.x < tree.x ? -1 : 1, 1);
        }

        continue;
      }

      if (tree.cut) {
        continue;
      }

      if (!this.isPuffinOnTree(tree)) {
        tree.cutProgress = Math.max(0, tree.cutProgress - deltaSeconds * 0.65);
        continue;
      }

      const lumberjack = this.penguins.find(
        (penguin) =>
          !penguin.defeated &&
          this.isLumberjackPenguin(penguin) &&
          this.canLumberjackChopTree(penguin, tree),
      );

      if (!lumberjack) {
        tree.cutProgress = Math.max(0, tree.cutProgress - deltaSeconds * 0.3);
        continue;
      }

      lumberjack.alerted = true;
      lumberjack.direction = lumberjack.x + lumberjack.width / 2 < tree.x + tree.width / 2 ? 1 : -1;
      this.swingPickaxe(lumberjack);
      tree.cutProgress += deltaSeconds;

      if (tree.cutProgress >= 1.35) {
        const puffinWasOnTree = this.isPuffinOnTree(tree);
        tree.cut = true;
        tree.falling = true;
        tree.fallTimer = 0;
        tree.direction = lumberjack.direction;
        this.spawnSplat(tree.x + tree.width / 2, tree.y + tree.height);

        if (puffinWasOnTree) {
          tree.hitPuffin = true;
          this.grounded = false;
          this.velocity.y = Math.max(this.velocity.y, 300);
          this.damagePuffin(tree.direction, 1);
        }
      }
    }
  }

  private isPuffinOnTree(tree: ForestTree): boolean {
    const footY = this.puffin.y + this.puffin.height;

    return (
      !tree.cut &&
      !tree.falling &&
      this.puffin.x + this.puffin.width > tree.x &&
      this.puffin.x < tree.x + tree.width &&
      Math.abs(footY - tree.y) < 6
    );
  }

  private canLumberjackChopTree(penguin: Penguin, tree: ForestTree): boolean {
    return (
      Math.abs(penguin.x + penguin.width / 2 - (tree.x + tree.width / 2)) < 140 &&
      Math.abs(penguin.y + penguin.height - (tree.y + tree.height)) < 48
    );
  }

  private isLumberjackChoppingOccupiedTree(penguin: Penguin): boolean {
    return this.forestTrees.some(
      (tree) => !tree.cut && !tree.falling && this.isPuffinOnTree(tree) && this.canLumberjackChopTree(penguin, tree),
    );
  }

  private getFallingTreeHitbox(tree: ForestTree): Rect {
    const progress = clamp(tree.fallTimer / 0.55, 0, 1);
    const width = tree.height * (0.45 + progress * 0.65);
    const height = 34;
    const x = tree.direction > 0 ? tree.x + tree.width / 2 : tree.x + tree.width / 2 - width;
    const y = tree.y + tree.height - height + progress * 12;

    return { x, y, width, height };
  }

  private isFeatherInLava(feather: Feather): boolean {
    const featherLeft = feather.x - 6;
    const featherRight = feather.x + 6;
    const featherBottom = feather.y + 12;

    return this.hazards.some(
      (hazard) =>
        hazard.kind === "lava" &&
        featherRight >= hazard.x &&
        featherLeft <= hazard.x + hazard.width &&
        featherBottom >= hazard.y,
    );
  }

  private resolveFeatherPlatformLanding(feather: Feather, previousY: number): void {
    if (feather.velocity.y < 0) {
      return;
    }

    for (const platform of this.platforms) {
      if (platform.ceiling) {
        continue;
      }

      const platformTops = [feather.x - 9, feather.x, feather.x + 9]
        .map((x) => getPlatformTopY(platform, x))
        .filter((top): top is number => top !== null);
      const isLevelFourIceberg = this.isFilledSlopePlatform(platform);

      if (platformTops.length === 0) {
        continue;
      }

      const platformTop = Math.min(...platformTops);
      const landingY = platformTop - 12;
      const crossedSurface = previousY <= landingY + 8 && feather.y >= landingY - 2;
      const barelyInsidePlatform = feather.y >= landingY && previousY <= platformTop + platform.height + 12;

      if (
        feather.y >= landingY &&
        (crossedSurface || barelyInsidePlatform || isLevelFourIceberg)
      ) {
        feather.y = landingY;
        feather.velocity.x = 0;
        feather.velocity.y = 0;
        feather.rotation = Math.sin(feather.driftPhase) * 0.28;
        return;
      }
    }
  }

  private checkPeckAttack(): void {
    if (this.peckTimer <= 0 || this.peckHasHit) {
      return;
    }

    const attackBox = this.getPeckAttackBox();
    let hitPenguin = false;

    for (const penguin of this.penguins) {
      if (penguin.defeated || !rectanglesOverlap(attackBox, penguin)) {
        continue;
      }

      if (this.damagePenguin(penguin, "peck")) {
        hitPenguin = true;
        penguin.x = clamp(penguin.x + this.facing * 18, 0, this.level.width - penguin.width);
        penguin.direction = this.facing > 0 ? 1 : -1;
      }
    }

    if (hitPenguin) {
      this.peckHasHit = true;
      this.peckTimer = 0;
      this.penguinContactGrace = PUFFIN.peckContactGrace;
      this.puffin.x = clamp(this.puffin.x - this.facing * 8, 0, this.level.width - this.puffin.width);
    }
  }

  private getPeckAttackBox(): Rect {
    const width = 48;
    const height = 30;

    return {
      x: this.facing > 0 ? this.puffin.x + this.puffin.width - 4 : this.puffin.x - width + 4,
      y: this.puffin.y + 14,
      width,
      height,
    };
  }

  private updatePenguins(deltaSeconds: number): void {
    let levelThreeAttackers = this.hasWaterSection() ? this.countLevelThreeAttackers() : 0;

    for (const penguin of this.penguins) {
      if (penguin.defeated) {
        continue;
      }

      penguin.velocityY ??= 0;
      penguin.hazardTurnCooldown = Math.max(0, (penguin.hazardTurnCooldown ?? 0) - deltaSeconds);
      penguin.jumpCooldown = Math.max(0, (penguin.jumpCooldown ?? 0) - deltaSeconds);
      penguin.lumberjackAttackCooldown = Math.max(0, (penguin.lumberjackAttackCooldown ?? 0) - deltaSeconds);
      penguin.hitCooldown = Math.max(0, penguin.hitCooldown - deltaSeconds);
      penguin.pickaxeSwingTimer = Math.max(0, (penguin.pickaxeSwingTimer ?? 0) - deltaSeconds);

      if (this.currentLevel === 5 && penguin.isBoss) {
        this.updateStageBossCharge(penguin, deltaSeconds);
        continue;
      }

      const penguinCenter = penguin.x + penguin.width / 2;
      const puffinCenter = this.puffin.x + this.puffin.width / 2;
      const distanceX = puffinCenter - penguinCenter;
      const levelThreeDiver = this.isDiverPenguin(penguin);
      const penguinUnderwater = this.isUnderwaterPenguin(penguin);
      const aggroRange = penguin.isBoss
        ? this.currentLevel === 5
          ? LEVEL_FIVE_BOSS_AGGRO_RANGE
          : 560
        : levelThreeDiver ? 680 : 250;
      const patrolBuffer = penguin.isBoss ? 180 : 28;
      const puffinInPatrolRange = puffinCenter >= penguin.minX - patrolBuffer && puffinCenter <= penguin.maxX + patrolBuffer;
      const wantsToAttack = Math.abs(distanceX) < aggroRange && (levelThreeDiver || penguin.isBoss || puffinInPatrolRange);

      if (levelThreeDiver && penguin.waitingToDive === true) {
        penguin.diveTimer = Math.max(0, (penguin.diveTimer ?? getPenguinDiveDelay()) - deltaSeconds);

        if (wantsToAttack && levelThreeAttackers < 2 && penguin.diveTimer <= 0) {
          penguin.attacking = true;
          penguin.alerted = true;
          levelThreeAttackers += 1;
          this.startPenguinDive(penguin);
        }

        continue;
      }

      if (levelThreeDiver && penguin.attacking === true && Math.abs(distanceX) > 920) {
        penguin.attacking = false;
        penguin.alerted = false;
        levelThreeAttackers = Math.max(0, levelThreeAttackers - 1);
      }

      if (levelThreeDiver && !penguin.attacking && wantsToAttack && levelThreeAttackers < 2) {
        penguin.attacking = true;
        penguin.alerted = true;
        levelThreeAttackers += 1;

        if (penguin.hasDived !== true) {
          this.startPenguinDive(penguin);
        }
      } else if (!levelThreeDiver) {
        penguin.alerted = penguin.alerted || wantsToAttack;
      }

      if (levelThreeDiver) {
        penguin.diveTimer = Math.max(0, (penguin.diveTimer ?? getPenguinDiveDelay()) - deltaSeconds);

        if (
          penguin.attacking === true &&
          penguin.hasDived !== true &&
          penguin.diveTimer <= 0 &&
          Math.abs(distanceX) < 680
        ) {
          this.startPenguinDive(penguin);
        }
      }

      const chasingPuffin = penguin.alerted || (penguin.attacking === true && penguinUnderwater);
      const puffinIsMostlyAbove = this.puffin.y + this.puffin.height < penguin.y + penguin.height * 0.65;
      const chaseDeadZone = penguin.isBoss ? 56 : puffinIsMostlyAbove ? 86 : 42;
      const turnDeadZone = chaseDeadZone + 28;

      if (chasingPuffin && (penguin.hazardTurnCooldown ?? 0) <= 0 && Math.abs(distanceX) > turnDeadZone) {
        penguin.direction = distanceX < 0 ? -1 : 1;
      }

      const speed = penguinUnderwater && penguin.attacking === true ? penguin.speed * 1.35 : penguin.speed;
      const horizontalSpeed = chasingPuffin && Math.abs(distanceX) <= chaseDeadZone ? 0 : speed;
      const previousX = penguin.x;
      penguin.x += penguin.direction * horizontalSpeed * deltaSeconds;
      penguin.x = clamp(penguin.x, 0, this.level.width - penguin.width);
      if (this.currentLevel === 5 && penguin.isBoss) {
        penguin.x = LEVEL_FIVE_BOSS_X;
      }
      this.resolveLevelFivePenguinArenaGates(penguin);
      this.resolvePenguinWallCollisions(penguin, previousX);

      const staysInArena = !penguin.alerted;

      if (staysInArena && penguin.x <= penguin.minX) {
        penguin.x = penguin.minX;
        penguin.direction = 1;
      }

      if (staysInArena && penguin.x + penguin.width >= penguin.maxX) {
        penguin.x = penguin.maxX - penguin.width;
        penguin.direction = -1;
      }

      if ((penguin.hazardTurnCooldown ?? 0) <= 0 && this.isPenguinFacingHazard(penguin)) {
        penguin.direction *= -1;
        penguin.hazardTurnCooldown = 0.38;

        if (!penguin.isBoss && !levelThreeDiver && penguin.grounded && (penguin.jumpCooldown ?? 0) <= 0) {
          penguin.velocityY = -360;
          penguin.grounded = false;
          penguin.jumpCooldown = 0.65;
        }
      }

      const puffinIsAbove = this.puffin.y + this.puffin.height < penguin.y + penguin.height - 18;

      if (
        penguin.alerted &&
        !levelThreeDiver &&
        !this.isLumberjackChoppingOccupiedTree(penguin) &&
        !(this.currentLevel === 5 && penguin.isBoss) &&
        penguin.grounded &&
        penguin.jumpCooldown <= 0 &&
        puffinIsAbove
      ) {
        penguin.velocityY = penguin.isBoss ? -430 : -500;
        penguin.grounded = false;
        penguin.jumpCooldown = penguin.isBoss ? 1.15 : 0.85;
      }

      const previousY = penguin.y;

      if (penguinUnderwater && penguin.attacking === true) {
        const waterSurfaceY = this.getWaterSurfaceY();
        const puffinOnLand = this.puffin.y + this.puffin.height < waterSurfaceY + 8;
        const puffinMiddleY = puffinOnLand
          ? waterSurfaceY - penguin.height * 0.7
          : Math.min(this.puffin.y + this.puffin.height / 2, waterSurfaceY + 190);
        const penguinMiddleY = penguin.y + penguin.height / 2;
        const swimPull = clamp((puffinMiddleY - penguinMiddleY) * 5, -520, 520);

        penguin.velocityY += swimPull * deltaSeconds;
        penguin.velocityY *= 0.985;
        penguin.velocityY = clamp(penguin.velocityY, -240, 260);
      } else if (penguinUnderwater) {
        penguin.velocityY -= 420 * deltaSeconds;
        penguin.velocityY *= 0.985;
        penguin.velocityY = clamp(penguin.velocityY, -220, 120);
      } else {
        const fallGravity = levelThreeDiver && penguin.attacking === true ? 260 : PUFFIN.gravity;
        penguin.velocityY += fallGravity * deltaSeconds;
        const fallSpeedCap = levelThreeDiver && penguin.attacking === true ? 145 : PUFFIN.maxFallSpeed;
        penguin.velocityY = Math.min(penguin.velocityY, fallSpeedCap);
      }

      penguin.y += penguin.velocityY * deltaSeconds;
      this.resolvePenguinCeilingCollisions(penguin, previousY);

      if (penguinUnderwater && penguin.y + penguin.height > this.getWaterBottomY() - 36) {
        penguin.y = this.getWaterBottomY() - 36 - penguin.height;
        penguin.velocityY = -180;
      }

      const waterSurfaceY = this.getWaterSurfaceY();
      if (
        this.hasWaterSection() &&
        this.isInWaterSection(penguin) &&
        !penguin.isBoss &&
        (penguin.velocityY ?? 0) > 0 &&
        previousY + penguin.height <= waterSurfaceY &&
        penguin.y + penguin.height > waterSurfaceY
      ) {
        this.spawnSplash(penguin.x + penguin.width / 2, waterSurfaceY);
      }

      this.resolvePenguinVerticalCollision(penguin, previousY);
      this.resolvePenguinWaterLedgeClimb(penguin);
      this.checkPenguinHazards(penguin);
    }
  }

  private updateStageBossSummons(deltaSeconds: number): void {
    if (this.currentLevel !== 5) {
      return;
    }

    const boss = this.getLivingBoss();
    const bossCenterX = boss ? boss.x + boss.width / 2 : 0;
    const puffinCenterX = this.puffin.x + this.puffin.width / 2;
    const bossIsInAggro =
      boss !== undefined && boss.alerted && Math.abs(puffinCenterX - bossCenterX) < LEVEL_FIVE_BOSS_AGGRO_RANGE;

    if (!bossIsInAggro) {
      this.stageBossSummonCooldown = Math.min(this.stageBossSummonCooldown, 1.1);
      this.stageBossSummonQueue = [];
      return;
    }

    this.stageBossSummonCooldown = Math.max(0, this.stageBossSummonCooldown - deltaSeconds);
    this.updateStageBossSummonQueue(boss, deltaSeconds);

    if (this.stageBossSummonQueue.length > 0 || this.stageBossSummonCooldown > 0) {
      return;
    }

    this.stageBossSummonQueue = [0, 0.24, 0.48];
    this.stageBossSummonCooldown = 3;
    this.updateStageBossSummonQueue(boss, 0);
  }

  private updateEndlessSpawns(deltaSeconds: number): void {
    if (!this.endlessMode) {
      return;
    }

    this.endlessSpawnTimer = Math.max(0, this.endlessSpawnTimer - deltaSeconds);
    const livingPenguins = this.penguins.filter((penguin) => !penguin.defeated);

    if (this.endlessSpawnTimer > 0 || livingPenguins.length >= 8) {
      return;
    }

    this.spawnEndlessPenguin();
    this.endlessSpawnTimer = 1.15 + Math.random() * 0.75;
  }

  private spawnEndlessPenguin(): void {
    const spawnRoll = Math.random();
    const summonKind: "basic" | "diver" | "lumberjack" | "miner" =
      spawnRoll < 0.25 ? "basic" : spawnRoll < 0.5 ? "diver" : spawnRoll < 0.75 ? "miner" : "lumberjack";
    const isDiver = summonKind === "diver";
    const isMiner = summonKind === "miner";
    const isLumberjack = summonKind === "lumberjack";
    const side: -1 | 1 = Math.random() < 0.5 ? -1 : 1;
    const spawnX = side < 0 ? this.cameraX - PENGUIN.width - 18 : this.cameraX + VIEW.width + 18;
    const clampedX = clamp(spawnX, 0, this.level.width - PENGUIN.width);
    const penguin: Penguin = {
      x: clampedX,
      y: endlessZonePlatforms[1].y - PENGUIN.height,
      width: PENGUIN.width,
      height: PENGUIN.height,
      minX: 0,
      maxX: this.level.width,
      speed: isLumberjack ? 82 : isMiner ? 104 : isDiver ? 126 : 112,
      direction: side < 0 ? 1 : -1,
      alerted: !isDiver,
      attacking: !isDiver,
      health: isDiver ? LEVEL_THREE_PENGUIN_HEALTH : NORMAL_PENGUIN_HEALTH,
      hitCooldown: 0,
      isDiver,
      isLumberjack,
      isMiner,
      defeated: false,
      velocityY: 0,
    };

    if (isDiver) {
      penguin.x = clamp(this.puffin.x + (Math.random() < 0.5 ? -70 : 70), 0, this.level.width - penguin.width);
      penguin.y = this.cameraY + 52;
      penguin.grounded = false;
      penguin.hasDived = true;
      penguin.waitingToDive = false;
      penguin.alerted = true;
      penguin.attacking = true;
      penguin.velocityY = 36;
      penguin.direction = penguin.x + penguin.width / 2 < this.puffin.x + this.puffin.width / 2 ? 1 : -1;
    } else {
      const surfaceY = getPenguinSurfaceY(penguin, this.platforms, this.level);
      penguin.y = surfaceY - penguin.height;
      penguin.grounded = true;
    }

    this.penguins.push(penguin);
  }

  private updateStageBossCharge(boss: Penguin, deltaSeconds: number): void {
    if (!this.levelFiveArenaClosed || this.stageComplete || this.bossDefeatSequenceTimer > 0 || !boss.alerted) {
      boss.charging = false;
      this.stageBossChargeTimer = 0;
      this.stageBossChargeHitPenguins.clear();
      this.stageBossChargeHitPuffin = false;
      this.stageBossChargeCooldown = Math.min(this.stageBossChargeCooldown, LEVEL_FIVE_BOSS_CHARGE_COOLDOWN);
      return;
    }

    const bossCenterX = boss.x + boss.width / 2;
    const puffinCenterX = this.puffin.x + this.puffin.width / 2;

    if (boss.charging === true) {
      const previousX = boss.x;
      const targetX = this.getStageBossChargeTargetX(boss);
      const nextX = boss.x + this.stageBossChargeDirection * LEVEL_FIVE_BOSS_CHARGE_SPEED * deltaSeconds;

      boss.x = this.stageBossChargeDirection > 0 ? Math.min(nextX, targetX) : Math.max(nextX, targetX);
      boss.x = clamp(boss.x, LEVEL_FIVE_SUMMIT_LEFT_X, LEVEL_FIVE_SUMMIT_RIGHT_X - boss.width);
      boss.direction = this.stageBossChargeDirection;
      this.damageStageBossChargeTargets(boss, previousX);
      this.stageBossChargeTimer = Math.max(0, this.stageBossChargeTimer - deltaSeconds);

      if (
        this.stageBossChargeTimer <= 0 ||
        Math.abs(boss.x - targetX) < 1
      ) {
        boss.x = targetX;
        boss.charging = false;
        this.stageBossChargeCooldown = LEVEL_FIVE_BOSS_CHARGE_COOLDOWN;
        this.stageBossChargeHitPenguins.clear();
        this.stageBossChargeHitPuffin = false;
      }

      return;
    }

    this.stageBossChargeCooldown = Math.max(0, this.stageBossChargeCooldown - deltaSeconds);

    if (this.stageBossChargeCooldown <= 0 && this.grounded && Math.abs(puffinCenterX - bossCenterX) > 90) {
      this.stageBossChargeDirection = puffinCenterX < bossCenterX ? -1 : 1;
      const targetX = this.getStageBossChargeTargetX(boss);

      if (Math.abs(targetX - boss.x) < 24) {
        return;
      }

      boss.direction = this.stageBossChargeDirection;
      boss.charging = true;
      this.stageBossChargeTimer = LEVEL_FIVE_BOSS_CHARGE_DURATION;
      this.stageBossChargeHitPenguins.clear();
      this.stageBossChargeHitPuffin = false;
    }
  }

  private getStageBossChargeTargetX(boss: Penguin): number {
    return this.stageBossChargeDirection > 0 ? this.getStageBossRightSpotX(boss) : this.getStageBossLeftSpotX(boss);
  }

  private getStageBossLeftSpotX(boss: Penguin): number {
    return clamp(
      LEVEL_FIVE_SUMMIT_LEFT_X + LEVEL_FIVE_BOSS_CHARGE_GATE_PADDING,
      LEVEL_FIVE_SUMMIT_LEFT_X,
      LEVEL_FIVE_SUMMIT_RIGHT_X - boss.width,
    );
  }

  private getStageBossRightSpotX(boss: Penguin): number {
    return clamp(
      LEVEL_FIVE_SUMMIT_RIGHT_X - boss.width - LEVEL_FIVE_BOSS_CHARGE_GATE_PADDING,
      LEVEL_FIVE_SUMMIT_LEFT_X,
      LEVEL_FIVE_SUMMIT_RIGHT_X - boss.width,
    );
  }

  private damageStageBossChargeTargets(boss: Penguin, previousX: number): void {
    const sweptLeft = Math.min(previousX, boss.x);
    const sweptRight = Math.max(previousX + boss.width, boss.x + boss.width);
    const chargeBox: Rect = {
      x: sweptLeft - 18,
      y: boss.y - 8,
      width: sweptRight - sweptLeft + 36,
      height: boss.height + 18,
    };

    if (!this.stageBossChargeHitPuffin && rectanglesOverlap(this.puffin, chargeBox)) {
      this.stageBossChargeHitPuffin = true;
      this.damagePuffin(this.puffin.x + this.puffin.width / 2 < boss.x + boss.width / 2 ? -1 : 1, 1);
    }

    for (const penguin of this.penguins) {
      if (penguin.isBoss || penguin.defeated || this.stageBossChargeHitPenguins.has(penguin)) {
        continue;
      }

      if (rectanglesOverlap(penguin, chargeBox)) {
        this.stageBossChargeHitPenguins.add(penguin);
        this.damagePenguinFromBossCharge(penguin);
      }
    }
  }

  private damagePenguinFromBossCharge(penguin: Penguin): void {
    penguin.health -= 1;
    penguin.alerted = true;
    penguin.hitCooldown = 0.2;
    penguin.x = clamp(penguin.x + this.stageBossChargeDirection * 34, 0, this.level.width - penguin.width);
    penguin.velocityY = -220;
    penguin.grounded = false;

    if (penguin.health <= 0) {
      penguin.defeated = true;
      penguin.attacking = false;
      this.penguinsDefeated += 1;
      this.spawnSplat(penguin.x + penguin.width / 2, penguin.y + penguin.height);
      return;
    }

    this.spawnPenguinHit(penguin.x + penguin.width / 2, penguin.y + penguin.height * 0.42);
  }

  private updateStageBossSummonQueue(boss: Penguin, deltaSeconds: number): void {
    const readySummons: number[] = [];

    this.stageBossSummonQueue = this.stageBossSummonQueue
      .map((timer) => timer - deltaSeconds)
      .filter((timer) => {
        if (timer <= 0) {
          readySummons.push(timer);
          return false;
        }

        return true;
      });

    for (const _timer of readySummons) {
      this.spawnStageBossSummon(boss);
    }
  }

  private spawnStageBossSummon(boss: Penguin): void {
    const spawnX = clamp(boss.x + boss.width / 2 - PENGUIN.width / 2, LEVEL_FIVE_SUMMIT_LEFT_X, LEVEL_FIVE_SUMMIT_RIGHT_X);
    const summonRoll = Math.random();
    const summonKind: "basic" | "miner" | "diver" =
      summonRoll < 1 / 3 ? "basic" : summonRoll < 2 / 3 ? "miner" : "diver";
    const isMinerSummon = summonKind === "miner";
    const isDiverSummon = summonKind === "diver";
    const penguin: Penguin = {
      x: spawnX,
      y: boss.y - 40,
      width: PENGUIN.width,
      height: PENGUIN.height,
      minX: LEVEL_FIVE_SUMMIT_LEFT_X,
      maxX: LEVEL_FIVE_SUMMIT_RIGHT_X,
      speed: isMinerSummon ? 104 : isDiverSummon ? 122 : 116,
      direction: spawnX < this.puffin.x ? 1 : -1,
      alerted: !isDiverSummon,
      health: isDiverSummon ? LEVEL_THREE_PENGUIN_HEALTH : NORMAL_PENGUIN_HEALTH,
      hitCooldown: 0,
      isDiver: isDiverSummon,
      isMiner: isMinerSummon,
      summonedByStageBoss: true,
      defeated: false,
      velocityY: 0,
    };
    const surfaceY = getPenguinSurfaceY(penguin, this.platforms, this.level);

    if (isDiverSummon) {
      penguin.y = LEVEL_FIVE_WATER_SURFACE_Y - 210;
      penguin.grounded = false;
      penguin.hasDived = false;
      penguin.waitingToDive = true;
      penguin.diveTimer = getPenguinDiveDelay();
    } else {
      penguin.y = surfaceY - penguin.height;
      penguin.grounded = true;
    }
    this.penguins.push(penguin);
  }

  private updateWaterSpits(deltaSeconds: number): void {
    if (this.currentLevel === 3) {
      this.updateLevelThreeBossSpit(deltaSeconds);
    }

    for (const spit of this.waterSpits) {
      spit.x += spit.velocity.x * deltaSeconds;
      spit.y += spit.velocity.y * deltaSeconds;
      spit.life -= deltaSeconds;

      if (spit.life <= 0) {
        continue;
      }

      if (this.isWaterSpitHittingPlatform(spit)) {
        spit.life = 0;
        this.spawnWaterSpitSplash(
          spit.velocity.x >= 0 ? spit.x + spit.width : spit.x,
          spit.y + spit.height / 2,
          spit.velocity.x >= 0 ? 1 : -1,
        );
        continue;
      }

      if (this.damageInvulnerability <= 0 && rectanglesOverlap(this.puffin, spit)) {
        spit.life = 0;
        const puffinCenter = this.puffin.x + this.puffin.width / 2;
        const spitCenter = spit.x + spit.width / 2;
        this.spawnWaterSpitSplash(spitCenter, spit.y + spit.height / 2, spit.velocity.x >= 0 ? 1 : -1);
        this.damagePuffin(puffinCenter < spitCenter ? -1 : 1, 1);
      }
    }

    this.waterSpits = this.waterSpits.filter(
      (spit) =>
        spit.life > 0 &&
        spit.x + spit.width > this.cameraX - 160 &&
        spit.x < this.cameraX + VIEW.width + 160 &&
        spit.y + spit.height > -80 &&
        spit.y < VIEW.height + 120,
    );
  }

  private isWaterSpitHittingPlatform(spit: WaterSpit): boolean {
    return this.platforms.some((platform) => {
      if (spit.x + spit.width < platform.x || spit.x > platform.x + platform.width) {
        return false;
      }

      const sampleXs = [spit.x, spit.x + spit.width / 2, spit.x + spit.width];
      const platformTops = sampleXs
        .map((x) => getPlatformTopY(platform, x))
        .filter((top): top is number => top !== null);

      if (platformTops.length === 0) {
        return false;
      }

      const platformTop = Math.min(...platformTops);
      return spit.y < platformTop + platform.height && spit.y + spit.height > platformTop;
    });
  }

  private updateLevelThreeBossSpit(deltaSeconds: number): void {
    const boss = this.penguins.find((penguin) => penguin.isBoss === true && !penguin.defeated);

    if (!boss) {
      this.bossWaterSpitCooldown = 1.6;
      return;
    }

    if (!boss.alerted) {
      this.bossWaterSpitCooldown = 1.2;
      return;
    }

    this.bossWaterSpitCooldown = Math.max(0, this.bossWaterSpitCooldown - deltaSeconds);

    const bossCenterX = boss.x + boss.width / 2;
    const bossCenterY = boss.y + boss.height * 0.38;
    const puffinCenterX = this.puffin.x + this.puffin.width / 2;
    const distanceX = puffinCenterX - bossCenterX;
    const distance = Math.abs(distanceX);

    if (distance > 880 || this.bossWaterSpitCooldown > 0) {
      return;
    }

    const speed = 390;
    boss.direction = distanceX < 0 ? -1 : 1;
    this.waterSpits.push({
      x: bossCenterX + boss.direction * 24 - 8,
      y: bossCenterY - 8,
      width: 18,
      height: 18,
      life: 2.4,
      velocity: {
        x: boss.direction * speed,
        y: 0,
      },
    });

    this.bossWaterSpitCooldown = 1.45 + Math.random() * 0.65;
  }

  private isPenguinFacingHazard(penguin: Penguin): boolean {
    if (penguin.defeated) {
      return false;
    }

    const probeX = penguin.direction > 0 ? penguin.x + penguin.width + 20 : penguin.x - 20;
    const footY = penguin.y + penguin.height + 8;
    const standingPlatform = this.platforms.some((platform) => {
      if (platform.ceiling || platform.fluidBarrier) {
        return false;
      }

      const topY = getPlatformTopY(platform, probeX);
      const platformTolerance = platform.slope ? (penguin.isBoss ? 96 : 68) : 44;
      return topY !== null && Math.abs(topY - footY) < platformTolerance;
    });

    const hazardAhead = this.hazards.some(
      (hazard) =>
        probeX >= hazard.x - 8 &&
        probeX <= hazard.x + hazard.width + 8 &&
        footY >= hazard.y - 12 &&
        footY <= hazard.y + hazard.height + 54,
    );

    return hazardAhead || (!standingPlatform && this.hazards.some((hazard) => hazard.kind === "lava"));
  }

  private checkPenguinHazards(penguin: Penguin): void {
    if (penguin.defeated) {
      return;
    }

    for (const hazard of this.hazards) {
      if (hazard.kind === "lava" && this.isPenguinInLava(penguin, hazard)) {
        this.defeatPenguinNaturally(penguin);
        return;
      }

      if (hazard.kind === "crevasse" && this.isPenguinInsideCrevasse(penguin, hazard)) {
        this.defeatPenguinNaturally(penguin);
        return;
      }
    }
  }

  private isPenguinInsideCrevasse(penguin: Penguin, hazard: Hazard): boolean {
    const penguinCenter = penguin.x + penguin.width / 2;
    const footY = penguin.y + penguin.height;

    return penguinCenter > hazard.x + 6 && penguinCenter < hazard.x + hazard.width - 6 && footY > hazard.y + 20;
  }

  private isPenguinInLava(penguin: Penguin, hazard: Hazard): boolean {
    const penguinCenter = penguin.x + penguin.width / 2;
    const footY = penguin.y + penguin.height;

    return penguinCenter > hazard.x && penguinCenter < hazard.x + hazard.width && footY >= hazard.y;
  }

  private defeatPenguinNaturally(penguin: Penguin): void {
    penguin.defeated = true;
    penguin.attacking = false;
    this.penguinsDefeated += 1;
    this.spawnSplat(penguin.x + penguin.width / 2, penguin.y + penguin.height);
  }

  private resolvePenguinVerticalCollision(penguin: Penguin, previousY: number): void {
    const wasGrounded = penguin.grounded;
    penguin.grounded = false;

    for (const platform of this.platforms) {
      if (platform.ceiling || platform.fluidBarrier) {
        continue;
      }

      const previousFootY = previousY + penguin.height;
      const platformTop = getPenguinPlatformTopY(platform, penguin);
      const footY = penguin.y + penguin.height;
      const slopeSnapUp = penguin.isBoss ? 42 : 24;
      const slopeSnapDown = penguin.isBoss ? 56 : 34;
      const canSnapToSlope =
        wasGrounded &&
        platform.slope !== undefined &&
        platformTop !== null &&
        footY >= platformTop - slopeSnapUp &&
        footY <= platformTop + slopeSnapDown;
      const canSnapToFlat =
        wasGrounded &&
        platform.slope === undefined &&
        platformTop !== null &&
        footY >= platformTop - slopeSnapUp &&
        footY <= platformTop + slopeSnapDown + 12;

      if (
        (penguin.velocityY ?? 0) >= 0 &&
        platformTop !== null &&
        (previousFootY <= platformTop || canSnapToSlope || canSnapToFlat) &&
        footY >= platformTop - slopeSnapUp &&
        penguin.x + penguin.width > platform.x &&
        penguin.x < platform.x + platform.width
      ) {
        penguin.y = platformTop - penguin.height;
        penguin.velocityY = 0;
        penguin.grounded = true;
        return;
      }
    }

    if (
      this.currentLevel !== 3 &&
      this.currentLevel !== 4 &&
      !(this.currentLevel === 5 && this.isInWaterSection(penguin)) &&
      penguin.y + penguin.height >= this.level.groundY
    ) {
      penguin.y = this.level.groundY - penguin.height;
      penguin.velocityY = 0;
      penguin.grounded = true;
    }
  }

  private resolvePenguinCeilingCollisions(penguin: Penguin, previousY: number): void {
    if ((penguin.velocityY ?? 0) >= 0) {
      return;
    }

    for (const platform of this.platforms) {
      if (platform.ceiling !== true || !rectanglesOverlap(penguin, platform)) {
        continue;
      }

      const ceilingBottom = platform.y + platform.height;

      if (previousY >= ceilingBottom - 2) {
        penguin.y = ceilingBottom;
        penguin.velocityY = 0;
      }
    }
  }

  private resolvePenguinWallCollisions(penguin: Penguin, previousX: number): void {
    for (const platform of this.platforms) {
      if (platform.wall !== true || !rectanglesOverlap(penguin, platform)) {
        continue;
      }

      if (previousX + penguin.width <= platform.x) {
        penguin.x = platform.x - penguin.width;
        penguin.direction = -1;
        penguin.hazardTurnCooldown = 0.38;
      } else if (previousX >= platform.x + platform.width) {
        penguin.x = platform.x + platform.width;
        penguin.direction = 1;
        penguin.hazardTurnCooldown = 0.38;
      }
    }
  }

  private resolvePenguinWaterLedgeClimb(penguin: Penguin): void {
    if (!this.hasWaterSection() || !this.isInWaterSection(penguin) || penguin.isBoss || penguin.grounded) {
      return;
    }

    const footY = penguin.y + penguin.height;
    const penguinCenterX = penguin.x + penguin.width / 2;

    if (penguin.y + penguin.height * 0.55 < this.getWaterSurfaceY()) {
      return;
    }

    for (const platform of this.platforms) {
      if (platform.ceiling || platform.fluidBarrier) {
        continue;
      }

      const platformTop = getBestPlatformTopY(platform, penguin);
      const closeToPlatformSide =
        penguinCenterX > platform.x - 36 && penguinCenterX < platform.x + platform.width + 36;

      if (
        platformTop !== null &&
        closeToPlatformSide &&
        footY >= platformTop - 14 &&
        penguin.y <= platformTop + 86
      ) {
        penguin.y = platformTop - penguin.height;
        penguin.velocityY = 0;
        penguin.grounded = true;
        penguin.jumpCooldown = Math.max(penguin.jumpCooldown ?? 0, 0.35);
        return;
      }
    }
  }

  private startPenguinDive(penguin: Penguin): void {
    const puffinCenter = this.puffin.x + this.puffin.width / 2;
    const activeCameraX = this.cameraX;
    const puffinScreenX = puffinCenter - activeCameraX;
    const side = Math.random() < 0.5 ? -1 : 1;
    const screenX = clamp(puffinScreenX + side * (36 + Math.random() * 32), 90, VIEW.width - 90);

    penguin.x = clamp(activeCameraX + screenX - penguin.width / 2, 0, this.level.width - penguin.width);
    penguin.y = this.cameraY + 72 + Math.random() * 18;
    penguin.velocityY = 32 + Math.random() * 18;
    penguin.grounded = false;
    penguin.hasDived = true;
    penguin.waitingToDive = false;
    penguin.alerted = true;
    penguin.direction = penguin.x + penguin.width / 2 < puffinCenter ? 1 : -1;
    penguin.diveTimer = getPenguinDiveDelay();
  }

  private countLevelThreeAttackers(): number {
    return this.penguins.filter((penguin) => !penguin.defeated && this.isDiverPenguin(penguin) && penguin.attacking === true).length;
  }

  private getLivingBoss(): Penguin | undefined {
    return this.penguins.find((penguin) => penguin.isBoss === true && !penguin.defeated);
  }

  private isNearBoss(): boolean {
    const puffinCenterX = this.puffin.x + this.puffin.width / 2;
    const puffinCenterY = this.puffin.y + this.puffin.height / 2;

    return this.penguins.some((penguin) => {
      if (!penguin.isBoss || penguin.defeated) {
        return false;
      }

      const bossCenterX = penguin.x + penguin.width / 2;
      const bossCenterY = penguin.y + penguin.height / 2;

      return Math.abs(puffinCenterX - bossCenterX) < 440 && Math.abs(puffinCenterY - bossCenterY) < 260;
    });
  }

  private checkHazards(): void {
    if (PLAYTEST_INVINCIBLE) {
      return;
    }

    for (const hazard of this.hazards) {
      if (hazard.kind === "crevasse" && this.isInsideCrevasse(hazard)) {
        this.dieAndShowRetry();
        return;
      }

      if (hazard.kind === "lava" && this.isPuffinInLava(hazard)) {
        this.dieAndShowRetry();
        return;
      }

      if (this.damageInvulnerability > 0) {
        continue;
      }
    }
  }

  private isPuffinInLava(hazard: Hazard): boolean {
    const puffinCenter = this.puffin.x + this.puffin.width / 2;
    const footY = this.puffin.y + this.puffin.height;

    return puffinCenter > hazard.x && puffinCenter < hazard.x + hazard.width && footY >= hazard.y;
  }

  private isInsideCrevasse(hazard: Hazard): boolean {
    const puffinCenter = this.puffin.x + this.puffin.width / 2;
    const footY = this.puffin.y + this.puffin.height;

    return puffinCenter > hazard.x + 6 && puffinCenter < hazard.x + hazard.width - 6 && footY > this.level.groundY + 22;
  }

  private checkPenguins(previousY: number): void {
    for (const penguin of this.penguins) {
      const stompZone = this.getPenguinStompZone(penguin);
      const touchingPenguin = rectanglesOverlap(this.puffin, penguin);
      const touchingStompZone = rectanglesOverlap(this.puffin, stompZone);
      const stompingPenguin = this.isStompingPenguin(penguin, previousY);

      if (penguin.defeated || (!touchingPenguin && !touchingStompZone && !stompingPenguin)) {
        continue;
      }

      if (this.penguinContactGrace > 0) {
        return;
      }

      const stompMargin = penguin.isBoss ? 30 : 22;
      const footY = this.puffin.y + this.puffin.height;
      const previousFootY = previousY + this.puffin.height;
      const crossedTop = previousFootY <= penguin.y + stompMargin && footY >= penguin.y - 10;
      const landingOnTop = footY <= penguin.y + stompMargin && touchingStompZone;
      const isOnBossTop = penguin.isBoss && footY <= penguin.y + 58 && previousFootY <= penguin.y + 64;
      const bossFeetHitHead =
        penguin.isBoss &&
        this.velocity.y > -120 &&
        footY >= penguin.y - 16 &&
        footY <= penguin.y + 66 &&
        this.puffin.x + this.puffin.width > penguin.x - 28 &&
        this.puffin.x < penguin.x + penguin.width + 28;
      const deeplyAboveSide = this.puffin.y + this.puffin.height * 0.55 < penguin.y + penguin.height * 0.35;
      const canStomp = !this.isUnderwater() && !this.hasPlatformBetween(this.puffin, penguin);
      const hasStompMomentum = this.velocity.y >= 0 || bossFeetHitHead;

      if (
        canStomp &&
        hasStompMomentum &&
        (stompingPenguin || crossedTop || landingOnTop || isOnBossTop || bossFeetHitHead || deeplyAboveSide)
      ) {
        const bounceSpeed = PUFFIN.jumpSpeed * (penguin.isBoss ? 1.02 : 0.9);
        const puffinCenter = this.puffin.x + this.puffin.width / 2;
        const penguinCenter = penguin.x + penguin.width / 2;
        const bossBounceDirection = puffinCenter < penguinCenter ? -1 : 1;

        if (penguin.isBoss && penguin.hitCooldown > 0) {
          return;
        }

        this.puffin.y = penguin.y - this.puffin.height;
        if (penguin.isBoss) {
          this.bossStompAirLocked = true;
          this.bossStompKnockbackTimer = 0.58;
          this.bossStompKnockbackX = bossBounceDirection * 360;
          this.puffin.x = clamp(this.puffin.x + bossBounceDirection * 16, 0, this.level.width - this.puffin.width);
          this.velocity.x = this.bossStompKnockbackX;
        }
        this.velocity.y = -bounceSpeed;
        this.penguinContactGrace = penguin.isBoss ? 0.58 : 0.28;
        this.stompSafetyTimer = penguin.isBoss ? 0.58 : 0.32;

        if (penguin.hitCooldown > 0) {
          return;
        }

        this.damagePenguin(penguin, "stomp");

        return;
      }

      if (this.stompSafetyTimer > 0) {
        return;
      }

      const puffinCenter = this.puffin.x + this.puffin.width / 2;
      const penguinCenter = penguin.x + penguin.width / 2;
      const hasPickaxe = this.hasPickaxe(penguin);
      const hasAxe = this.isLumberjackPenguin(penguin);
      const pickaxeHit = hasPickaxe && Math.random() < 1 / 3;
      const lumberjackReady = !hasAxe || (penguin.lumberjackAttackCooldown ?? 0) <= 0;

      if (hasPickaxe || (hasAxe && lumberjackReady)) {
        this.swingPickaxe(penguin);
      }

      if (this.damageInvulnerability > 0 || !lumberjackReady) {
        return;
      }

      if (hasAxe) {
        penguin.lumberjackAttackCooldown = LUMBERJACK_ATTACK_RELOAD;
      }

      this.damagePuffin(puffinCenter < penguinCenter ? -1 : 1, hasAxe || pickaxeHit ? 2 : 1);
      return;
    }
  }

  private isStompingPenguin(penguin: Penguin, previousY: number): boolean {
    if (this.velocity.y < 0 || this.isUnderwater()) {
      return false;
    }

    const horizontalForgiveness = penguin.isBoss ? 30 : 18;
    const topBand = penguin.isBoss ? 70 : 48;
    const footY = this.puffin.y + this.puffin.height;
    const previousFootY = previousY + this.puffin.height;
    const overlapsTopWidth =
      this.puffin.x + this.puffin.width > penguin.x - horizontalForgiveness &&
      this.puffin.x < penguin.x + penguin.width + horizontalForgiveness;
    const footIsInTopBand = footY >= penguin.y - 18 && footY <= penguin.y + topBand;
    const cameFromAbove = previousFootY <= penguin.y + topBand + 8;

    return overlapsTopWidth && footIsInTopBand && cameFromAbove;
  }

  private getPenguinStompZone(penguin: Penguin): Rect {
    const horizontalForgiveness = penguin.isBoss ? 28 : 14;
    const verticalForgiveness = penguin.isBoss ? 52 : 26;

    return {
      x: penguin.x - horizontalForgiveness,
      y: penguin.y - 8,
      width: penguin.width + horizontalForgiveness * 2,
      height: verticalForgiveness,
    };
  }

  private hasPlatformBetween(topActor: Rect, bottomActor: Rect): boolean {
    const corridorLeft = Math.max(topActor.x, bottomActor.x) - 8;
    const corridorRight = Math.min(topActor.x + topActor.width, bottomActor.x + bottomActor.width) + 8;

    if (corridorLeft >= corridorRight) {
      return false;
    }

    const corridorTop = Math.min(topActor.y + topActor.height, bottomActor.y);
    const corridorBottom = Math.max(topActor.y + topActor.height, bottomActor.y);

    return this.platforms.some((platform) => {
      if (platform.ceiling || platform.fluidBarrier) {
        return false;
      }

      const sampleX = (corridorLeft + corridorRight) / 2;
      const platformTop = platform.slope ? getPlatformTopY(platform, sampleX) : platform.y;

      if (platformTop === null) {
        return false;
      }

      const platformBottom = platformTop + platform.height;

      return (
        platform.x < corridorRight &&
        platform.x + platform.width > corridorLeft &&
        platformTop < corridorBottom &&
        platformBottom > corridorTop
      );
    });
  }

  private damagePuffin(knockbackDirection: -1 | 1, amount = 1): void {
    if (PLAYTEST_INVINCIBLE) {
      this.health = this.maxHealth;
      this.damageInvulnerability = PUFFIN.damageInvulnerability;
      this.penguinContactGrace = PUFFIN.damageInvulnerability;
      return;
    }

    if (this.damageInvulnerability > 0) {
      return;
    }

    this.health -= amount;

    if (this.health <= 0) {
      this.dieAndShowRetry();
      return;
    }

    this.damageInvulnerability = PUFFIN.damageInvulnerability;
    this.penguinContactGrace = PUFFIN.damageInvulnerability;
    this.peckTimer = 0;
    this.peckHasHit = true;
    this.velocity.x = knockbackDirection * PUFFIN.damageKnockbackX;
    this.velocity.y = -PUFFIN.damageKnockbackY;
    this.puffin.x = clamp(this.puffin.x + knockbackDirection * 16, 0, this.level.width - this.puffin.width);
    this.flying = false;
    this.grounded = false;
  }

  private dieAndShowRetry(): void {
    if (PLAYTEST_INVINCIBLE) {
      this.health = this.maxHealth;
      this.oxygen = this.maxOxygen;
      this.flight = this.maxFlight;
      return;
    }

    this.health = 0;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.flying = false;
    this.gameOver = true;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.deathOverlay?.removeAttribute("hidden");
    this.tryAgainButton?.focus();
  }

  private showStageComplete(): void {
    this.completedLevels.add(this.getLevelKey(5, 1));
    this.updateLevelsDisplay();
    this.stageComplete = true;
    this.win = true;
    this.menuOpen = true;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.stageCompleteOverlay?.removeAttribute("hidden");
    this.stageCompleteMainMenuButton?.focus();
  }

  private startBossDefeatSequence(): void {
    if (this.bossDefeatSequenceTimer > 0 || this.stageComplete) {
      return;
    }

    this.bossDefeatSequenceTimer = 3.4;
    this.bossDefeatPopupTimer = 1.4;
    this.bossDefeatExplosionDone = false;
    this.bossDefeatFeathersAwarded = false;
    this.stageBossSummonCooldown = 999;
    this.stageBossSummonQueue = [];
    const boss = this.getLivingBoss();
    if (boss) {
      boss.charging = false;
    }
    this.stageBossChargeCooldown = LEVEL_FIVE_BOSS_CHARGE_COOLDOWN;
    this.stageBossChargeHitPenguins.clear();
    this.stageBossChargeHitPuffin = false;
    this.stageBossChargeTimer = 0;
    this.waterSpits = [];
  }

  private updateBossDefeatSequence(deltaSeconds: number): void {
    if (this.bossDefeatSequenceTimer <= 0 && !this.bossDefeatExplosionDone) {
      return;
    }

    if (this.bossDefeatSequenceTimer > 0) {
      this.bossDefeatSequenceTimer = Math.max(0, this.bossDefeatSequenceTimer - deltaSeconds);
    }

    if (!this.bossDefeatExplosionDone && this.bossDefeatSequenceTimer <= this.bossDefeatPopupTimer) {
      this.explodeStageBoss();
      this.bossDefeatExplosionDone = true;
      this.explosionFlashTimer = STAGE_BOSS_EXPLOSION_FLASH_DURATION;
    }

    if (this.bossDefeatExplosionDone && !this.bossDefeatFeathersAwarded && this.flyingFeathers.length === 0) {
      this.bossDefeatFeathersAwarded = true;
      this.bossDefeatSequenceTimer = Math.min(this.bossDefeatSequenceTimer, 0.35);
    }

    if (
      this.bossDefeatExplosionDone &&
      this.bossDefeatFeathersAwarded &&
      this.bossDefeatSequenceTimer <= 0 &&
      this.explosionFlashTimer <= 0
    ) {
      this.showStageComplete();
    }
  }

  private explodeStageBoss(): void {
    const looseFeathers = this.feathers.filter((feather) => !feather.collected);
    let remainingExplosionFeathers = this.getStageBossExplosionFeatherCap();

    for (const penguin of this.penguins) {
      if (penguin.defeated) {
        continue;
      }

      const featherAmount = penguin.isBoss ? 5 : getFeatherDropAmount();
      penguin.defeated = true;
      penguin.attacking = false;
      penguin.alerted = false;
      this.penguinsDefeated += 1;
      this.penguinKillCount += 1;
      this.spawnSplat(penguin.x + penguin.width / 2, penguin.y + penguin.height);
      this.spawnFeatherSplat(penguin.x + penguin.width / 2, penguin.y + 8);
      remainingExplosionFeathers = this.spawnCappedFlyingFeathers(
        penguin.x + penguin.width / 2,
        penguin.y + 8,
        featherAmount,
        remainingExplosionFeathers,
      );
    }

    for (const feather of looseFeathers) {
      remainingExplosionFeathers = this.spawnCappedFlyingFeathers(feather.x, feather.y, 1, remainingExplosionFeathers);
    }

    this.feathers = [];
  }

  private getStageBossExplosionFeatherCap(): number {
    return STAGE_BOSS_EXPLOSION_BASE_FEATHERS + (this.currentStage - 1) * STAGE_BOSS_EXPLOSION_FEATHER_STAGE_BONUS;
  }

  private spawnCappedFlyingFeathers(x: number, y: number, amount: number, remainingAmount: number): number {
    if (remainingAmount <= 0) {
      return 0;
    }

    const spawnedAmount = Math.min(amount, remainingAmount);
    this.spawnFlyingFeathers(x, y, spawnedAmount);
    return remainingAmount - spawnedAmount;
  }

  private spawnFlyingFeathers(x: number, y: number, amount: number): void {
    for (let index = 0; index < amount; index += 1) {
      const offset = (index - (amount - 1) / 2) * 14;
      this.flyingFeathers.push({
        x: x + offset,
        y: y - Math.abs(offset) * 0.3,
        age: 0,
        delay: index * 0.08,
        duration: 1.45 + Math.min(0.4, amount * 0.025),
        startX: x + offset,
        startY: y - Math.abs(offset) * 0.3,
        rotation: (Math.random() - 0.5) * 0.8,
      });
    }
  }

  private damagePenguin(penguin: Penguin, source: "peck" | "stomp"): boolean {
    if (this.bossDefeatSequenceTimer > 0 && this.currentLevel === 5 && penguin.isBoss) {
      return false;
    }

    if (penguin.hitCooldown > 0) {
      return false;
    }

    const hardHatBlockChance = this.getHardHatBlockChance(penguin);

    if (source === "stomp" && hardHatBlockChance > 0 && Math.random() < hardHatBlockChance) {
      penguin.alerted = true;
      penguin.hitCooldown = 0.35;
      this.spawnPenguinHit(penguin.x + penguin.width / 2, penguin.y + penguin.height * 0.24);
      return true;
    }

    penguin.health -= 1;
    penguin.alerted = true;
    penguin.hitCooldown = penguin.isBoss ? 0.75 : 0.12;

    if (penguin.health <= 0 && this.currentLevel === 5 && penguin.isBoss) {
      penguin.health = 0;
      penguin.alerted = false;
      penguin.attacking = false;
      penguin.hitCooldown = 999;
      this.startBossDefeatSequence();
    } else if (penguin.health <= 0) {
      penguin.defeated = true;
      penguin.attacking = false;
      this.penguinsDefeated += 1;
      this.penguinKillCount += 1;
      this.spawnSplat(penguin.x + penguin.width / 2, penguin.y + penguin.height);

      this.dropFeathers(penguin, penguin.isBoss ? 5 : getFeatherDropAmount());
      this.dropFishFromStageBossSummon(penguin);
    } else {
      this.spawnPenguinHit(penguin.x + penguin.width / 2, penguin.y + penguin.height * 0.42);
    }

    return true;
  }

  private isLevelTwoBoss(penguin: Penguin): boolean {
    return this.currentLevel === 2 && penguin.isBoss === true;
  }

  private isLevelTwoMiner(penguin: Penguin): boolean {
    return (this.endlessMode || this.currentLevel === 2 || this.currentLevel === 5) && penguin.isMiner === true;
  }

  private isLumberjackPenguin(penguin: Penguin): boolean {
    return (this.endlessMode || this.currentStage === 2) && penguin.isLumberjack === true;
  }

  private isDiverPenguin(penguin: Penguin): boolean {
    return !penguin.isBoss && (this.currentLevel === 3 || penguin.isDiver === true);
  }

  private hasPickaxe(penguin: Penguin): boolean {
    return this.isLevelTwoBoss(penguin) || this.isLevelTwoMiner(penguin);
  }

  private swingPickaxe(penguin: Penguin): void {
    if ((penguin.pickaxeSwingTimer ?? 0) > 0.06) {
      return;
    }

    penguin.pickaxeSwingTimer = 0.34;
  }

  private getHardHatBlockChance(penguin: Penguin): number {
    if (this.isLevelTwoBoss(penguin)) {
      return 0.8;
    }

    return this.isLevelTwoMiner(penguin) ? 1 / 3 : 0;
  }

  private showLevelTitle(): void {
    this.levelTitleTimer = 1.7;
  }

  private resetPuffinPosition(): void {
    this.puffin.x = 96;
    this.puffin.height = PUFFIN.height;
    if (this.endlessMode) {
      this.puffin.x = ENDLESS_ZONE.width / 2 - this.puffin.width / 2;
      this.puffin.y = endlessZonePlatforms[1].y - this.puffin.height;
    } else if (this.isStageTwoForestLevel()) {
      this.puffin.y = stageTwoLevelOnePlatforms[0].y - this.puffin.height;
    } else if (this.currentLevel === 3) {
      this.puffin.y = levelThreePlatforms[0].y - this.puffin.height;
    } else if (this.currentLevel === 4) {
      this.puffin.y = levelFourPlatforms[0].y - this.puffin.height;
    } else if (this.currentLevel === 5) {
      this.puffin.y = levelFivePlatforms[0].y - this.puffin.height;
    } else {
      this.puffin.y = 300;
    }
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.cameraX = 0;
    this.cameraY = 0;
    this.grounded = false;
    this.flying = false;
    this.icebergHopQueued = false;
    this.flight = this.maxFlight;
    this.oxygen = this.maxOxygen;
    this.peckCooldown = 0;
    this.peckTimer = 0;
    this.peckHasHit = false;
    this.penguinContactGrace = 0;
    this.stompSafetyTimer = 0;
    this.bossStompKnockbackTimer = 0;
    this.bossStompKnockbackX = 0;
    this.bossStompAirLocked = false;
    this.stageBossChargeCooldown = LEVEL_FIVE_BOSS_CHARGE_COOLDOWN;
    this.stageBossChargeDirection = -1;
    this.stageBossChargeHitPenguins.clear();
    this.stageBossChargeHitPuffin = false;
    this.stageBossChargeTimer = 0;
    this.bossWaterSpitCooldown = 1.6;
    this.bossDefeatSequenceTimer = 0;
    this.bossDefeatPopupTimer = 0;
    this.bossDefeatExplosionDone = false;
    this.bossDefeatFeathersAwarded = false;
    this.stageBossSummonCooldown = 1.1;
    this.stageBossSummonQueue = [];
    this.damageInvulnerability = 0;
  }

  private restartCurrentLevel(): void {
    this.gameOver = false;
    this.menuOpen = false;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.deathOverlay?.setAttribute("hidden", "");
    this.stageCompleteOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.levelFiveArenaClosed = false;
    this.stageComplete = false;
    this.forestTrees = [];

    if (this.endlessMode) {
      this.level = { ...ENDLESS_ZONE };
      this.platforms = endlessZonePlatforms;
      this.hazards = endlessZoneHazards;
      this.exitHole = endlessZoneExitHole;
      this.fish = [];
      this.penguins = [];
    } else if (this.isStageTwoForestLevel()) {
      this.level = { ...STAGE_TWO_LEVEL_ONE };
      this.platforms = stageTwoLevelOnePlatforms;
      this.hazards = stageTwoLevelOneHazards;
      this.exitHole = stageTwoLevelOneExitHole;
      this.fish = createFish(stageTwoLevelOneFish, false);
      this.penguins = createPenguinsOnSurfaces(stageTwoLevelOnePenguins, stageTwoLevelOnePlatforms, STAGE_TWO_LEVEL_ONE);
      this.forestTrees = createForestTrees(stageTwoLevelOneTrees);
    } else if (this.currentLevel === 1) {
      this.level = { ...LEVEL };
      this.platforms = platforms;
      this.hazards = hazards;
      this.exitHole = exitHole;
      this.fish = createFish(startingFish, false);
      this.penguins = createPenguinsOnSurfaces(startingPenguins, platforms, LEVEL);
    } else if (this.currentLevel === 2) {
      this.level = { ...LEVEL_TWO };
      this.platforms = levelTwoPlatforms;
      this.hazards = levelTwoHazards;
      this.exitHole = levelTwoExitHole;
      this.fish = createFish(levelTwoFish, false);
      this.penguins = createPenguinsOnSurfaces(levelTwoPenguins, levelTwoPlatforms, LEVEL_TWO);
    } else if (this.currentLevel === 3) {
      this.level = { ...LEVEL_THREE };
      this.platforms = levelThreePlatforms;
      this.hazards = levelThreeHazards;
      this.exitHole = levelThreeExitHole;
      this.fish = createFish(levelThreeFish, true);
      this.penguins = createLevelThreePenguins();
    } else if (this.currentLevel === 4) {
      this.level = { ...LEVEL_FOUR };
      this.platforms = levelFourPlatforms;
      this.hazards = levelFourHazards;
      this.exitHole = levelFourExitHole;
      this.fish = createFish(levelFourFish, false);
      this.penguins = createPenguinsOnSurfaces(levelFourPenguins, levelFourPlatforms, LEVEL_FOUR);
    } else {
      this.level = { ...LEVEL_FIVE };
      this.platforms = levelFivePlatforms;
      this.hazards = levelFiveHazards;
      this.exitHole = levelFiveExitHole;
      this.fish = createLevelFiveFish();
      this.penguins = createLevelFivePenguins();
    }

    this.resetExitOpeningState();

    this.score = 0;
    this.penguinsDefeated = 0;
    this.splats = [];
    this.waterSpits = [];
    this.flyingFeathers = [];
    this.feathers = [];
    this.win = false;
    this.penguinKillCount = this.levelStartPenguinKillCount;
    this.health = this.maxHealth;
    this.updateShopDisplay();
    this.resetPuffinPosition();
    this.showLevelTitle();
  }

  private restartFromLevelOne(): void {
    this.currentLevel = 1;
    this.levelStartFeathers = this.puffinFeathers;
    this.levelStartPenguinKillCount = 0;
    this.penguinKillCount = 0;
    this.restartCurrentLevel();
  }

  private startSelectedLevel(levelNumber: number): void {
    if (!this.canPlayLevel(levelNumber)) {
      return;
    }

    this.endlessMode = false;
    this.currentLevel = this.currentStage === 2 ? 1 : clamp(Math.round(levelNumber), 1, 5);
    this.levelStartFeathers = this.puffinFeathers;
    this.levelStartPenguinKillCount = this.penguinKillCount;
    this.restartCurrentLevel();
  }

  private startEndlessZone(): void {
    this.endlessMode = true;
    this.currentLevel = 1;
    this.gameOver = false;
    this.menuOpen = false;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.deathOverlay?.setAttribute("hidden", "");
    this.stageCompleteOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.levelStartFeathers = this.puffinFeathers;
    this.levelStartPenguinKillCount = this.penguinKillCount;
    this.endlessSpawnTimer = 0.35;
    this.restartCurrentLevel();
  }

  private showMainMenu(): void {
    this.menuOpen = true;
    this.gameOver = false;
    this.stageComplete = false;
    this.endlessMode = false;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.deathOverlay?.setAttribute("hidden", "");
    this.stageCompleteOverlay?.setAttribute("hidden", "");
    this.journalOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.removeAttribute("hidden");
    this.updateShopDisplay();
    this.playButton?.focus();
  }

  private showShop(): void {
    this.menuOpen = true;
    this.gameOver = false;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.deathOverlay?.setAttribute("hidden", "");
    this.stageCompleteOverlay?.setAttribute("hidden", "");
    this.journalOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.removeAttribute("hidden");
    this.updateShopDisplay();
    this.shopBackButton?.focus();
  }

  private showJournal(): void {
    this.menuOpen = true;
    this.gameOver = false;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.deathOverlay?.setAttribute("hidden", "");
    this.stageCompleteOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.showJournalGrid();
    this.updateJournalDisplay();
    this.drawJournalPenguinPictures();
    this.journalOverlay?.removeAttribute("hidden");
    this.journalBackButton?.focus();
  }

  private showJournalGrid(): void {
    this.journalGrid?.removeAttribute("hidden");
    this.journalDetail?.setAttribute("hidden", "");
    this.journalDetailBackButton?.setAttribute("hidden", "");
    this.journalBackButton?.removeAttribute("hidden");
  }

  private showJournalDetail(kind: string): void {
    this.journalGrid?.setAttribute("hidden", "");
    this.journalDetail?.removeAttribute("hidden");
    this.journalBackButton?.setAttribute("hidden", "");
    this.journalDetailBackButton?.removeAttribute("hidden");

    for (const entry of this.journalDetailEntries) {
      entry.toggleAttribute("hidden", entry.dataset.penguinDetail !== kind);
    }

    this.journalDetailBackButton?.focus();
  }

  private updateJournalDisplay(): void {
    let visibleCards = 0;

    for (const card of this.journalCards) {
      const discovered = this.discoveredPenguins.has(card.dataset.penguin ?? "");
      card.toggleAttribute("hidden", !discovered);

      if (discovered) {
        visibleCards += 1;
      }
    }

    this.journalEmpty?.toggleAttribute("hidden", visibleCards > 0);
  }

  private markVisiblePenguinsSeen(): void {
    for (const penguin of this.penguins) {
      if (penguin.defeated || penguin.waitingToDive === true || !this.isRectInView(penguin)) {
        continue;
      }

      const kind = this.getJournalPenguinKind(penguin);

      if (kind && !this.discoveredPenguins.has(kind)) {
        this.discoveredPenguins.add(kind);
        this.showDiscoveryToast(kind);
      }
    }
  }

  private showDiscoveryToast(kind: string): void {
    if (!this.discoveryToast || !this.discoveryPicture || !this.discoveryName) {
      return;
    }

    const context = this.discoveryPicture.getContext("2d");

    this.discoveryName.textContent = getPenguinJournalName(kind);

    if (context) {
      this.drawJournalPenguinPicture(context, kind, this.discoveryPicture.width, this.discoveryPicture.height);
    }

    this.discoveryToastTimer = 2.6;
    this.updateDiscoveryToast();
  }

  private hideDiscoveryToast(): void {
    this.discoveryToastTimer = 0;
    this.discoveryToast?.setAttribute("hidden", "");
  }

  private clearControlKeys(): void {
    this.keys.duck = false;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.jump = false;
    this.jumpQueued = false;
    this.icebergHopQueued = false;
  }

  private closePauseOverlay(): void {
    this.paused = false;
    this.pauseOverlay?.setAttribute("hidden", "");
  }

  private pauseGame(): void {
    if (this.gameOver || this.menuOpen || this.stageComplete || this.paused) {
      return;
    }

    this.paused = true;
    this.clearControlKeys();
    this.hideDiscoveryToast();
    this.pauseOverlay?.removeAttribute("hidden");
    this.resumeButton?.focus();
  }

  private resumeGame(): void {
    if (!this.paused) {
      return;
    }

    this.closePauseOverlay();
    this.pauseButton?.focus();
  }

  private updateDiscoveryToast(): void {
    if (!this.discoveryToast) {
      return;
    }

    this.discoveryToast.toggleAttribute("hidden", this.discoveryToastTimer <= 0);
  }

  private isRectInView(rect: Rect): boolean {
    return (
      rect.x + rect.width > this.cameraX &&
      rect.x < this.cameraX + VIEW.width &&
      rect.y + rect.height > this.cameraY &&
      rect.y < this.cameraY + VIEW.height
    );
  }

  private getJournalPenguinKind(penguin: Penguin): string | null {
    if (this.isLumberjackPenguin(penguin)) {
      return "lumberjack";
    }

    if (this.isLevelTwoMiner(penguin)) {
      return "miner";
    }

    if (this.isDiverPenguin(penguin)) {
      return "diver";
    }

    return penguin.isBoss ? null : "basic";
  }

  private getLevelKey(levelNumber = this.currentLevel, stageNumber = this.currentStage): string {
    return `${stageNumber}-${levelNumber}`;
  }

  private isStageTwoForestLevel(): boolean {
    return !this.endlessMode && this.currentStage === 2 && this.currentLevel === 1;
  }

  private showLevels(): void {
    this.menuOpen = true;
    this.gameOver = false;
    this.closePauseOverlay();
    this.hideDiscoveryToast();
    this.deathOverlay?.setAttribute("hidden", "");
    this.stageCompleteOverlay?.setAttribute("hidden", "");
    this.journalOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.removeAttribute("hidden");
    this.updateLevelsDisplay();
    this.levelButtons[0]?.focus();
  }

  private updateLevelsDisplay(): void {
    const currentUnlockedLevel = this.getCurrentUnlockedLevel();

    if (this.stageLabel) {
      this.stageLabel.textContent = `Stage ${this.currentStage}`;
    }

    if (this.stagePreviousButton) {
      this.stagePreviousButton.disabled = this.currentStage <= 1;
    }

    if (this.stageNextButton) {
      this.stageNextButton.disabled = this.currentStage >= STAGE_COUNT;
    }

    for (const levelButton of this.levelButtons) {
      const levelNumber = Number(levelButton.dataset.level);
      const playable = this.canPlayLevel(levelNumber);
      const completed = this.completedLevels.has(this.getLevelKey(levelNumber));
      const current = this.currentStage === currentUnlockedLevel.stage && levelNumber === currentUnlockedLevel.level && !completed;
      const status = levelButton.querySelector("span");

      levelButton.classList.toggle("completed", completed);
      levelButton.classList.toggle("current-level", current && playable);
      levelButton.classList.toggle("not-completed", !completed && (!current || !playable));
      levelButton.disabled = !playable;

      if (status) {
        status.textContent = !playable ? "Locked" : completed ? "Completed" : current ? "Current" : "Unlocked";
      }
    }
  }

  private getCurrentUnlockedLevel(): { level: number; stage: number } {
    if (!this.completedLevels.has(this.getLevelKey(1, 1))) {
      return { stage: 1, level: 1 };
    }

    if (!this.completedLevels.has(this.getLevelKey(2, 1))) {
      return { stage: 1, level: 2 };
    }

    if (!this.completedLevels.has(this.getLevelKey(3, 1))) {
      return { stage: 1, level: 3 };
    }

    if (!this.completedLevels.has(this.getLevelKey(4, 1))) {
      return { stage: 1, level: 4 };
    }

    if (!this.completedLevels.has(this.getLevelKey(5, 1))) {
      return { stage: 1, level: 5 };
    }

    return { stage: 2, level: 1 };
  }

  private canPlayLevel(levelNumber: number): boolean {
    if (!this.levelExistsInCurrentStage(levelNumber)) {
      return false;
    }

    if (UNLOCK_ALL_LEVELS || PLAYTEST_INVINCIBLE) {
      return true;
    }

    const completed = this.completedLevels.has(this.getLevelKey(levelNumber));
    const currentUnlockedLevel = this.getCurrentUnlockedLevel();
    const current = this.currentStage === currentUnlockedLevel.stage && levelNumber === currentUnlockedLevel.level;

    return completed || current;
  }

  private levelExistsInCurrentStage(levelNumber: number): boolean {
    return this.currentStage === 1 ? levelNumber >= 1 && levelNumber <= 5 : levelNumber === 1;
  }

  private updateShopDisplay(): void {
    if (this.shopFeatherTotal) {
      this.shopFeatherTotal.textContent = `${this.puffinFeathers}`;
    }

    if (this.healthUpgradeCostLabel) {
      this.healthUpgradeCostLabel.textContent = `${this.healthUpgradeCost}`;
    }

    if (this.healthUpgradeButton) {
      this.healthUpgradeButton.disabled = this.puffinFeathers < this.healthUpgradeCost;
    }

    if (this.flightUpgradeCostLabel) {
      this.flightUpgradeCostLabel.textContent = `${this.flightUpgradeCost}`;
    }

    if (this.flightUpgradeButton) {
      this.flightUpgradeButton.disabled = this.puffinFeathers < this.flightUpgradeCost;
    }

    if (this.speedUpgradeCostLabel) {
      this.speedUpgradeCostLabel.textContent = `${this.speedUpgradeCost}`;
    }

    if (this.speedUpgradeButton) {
      this.speedUpgradeButton.disabled = this.puffinFeathers < this.speedUpgradeCost;
    }

    if (this.oxygenUpgradeCostLabel) {
      this.oxygenUpgradeCostLabel.textContent = `${this.oxygenUpgradeCost}`;
    }

    if (this.oxygenUpgradeButton) {
      this.oxygenUpgradeButton.disabled = this.puffinFeathers < this.oxygenUpgradeCost;
    }
  }

  private buyHealthUpgrade(): void {
    if (this.puffinFeathers < this.healthUpgradeCost) {
      return;
    }

    this.puffinFeathers -= this.healthUpgradeCost;
    this.levelStartFeathers = Math.min(this.levelStartFeathers, this.puffinFeathers);
    this.maxHealth += 1;
    this.health = this.maxHealth;
    this.healthUpgradeCount += 1;
    this.healthUpgradeCost = getUpgradeCost(this.healthUpgradeCount);
    this.updateShopDisplay();
  }

  private buyFlightUpgrade(): void {
    if (this.puffinFeathers < this.flightUpgradeCost) {
      return;
    }

    this.puffinFeathers -= this.flightUpgradeCost;
    this.levelStartFeathers = Math.min(this.levelStartFeathers, this.puffinFeathers);
    this.maxFlight += FLIGHT_UPGRADE_AMOUNT;
    this.flight = this.maxFlight;
    this.flightUpgradeCount += 1;
    this.flightUpgradeCost = getUpgradeCost(this.flightUpgradeCount);
    this.updateShopDisplay();
  }

  private buySpeedUpgrade(): void {
    if (this.puffinFeathers < this.speedUpgradeCost) {
      return;
    }

    this.puffinFeathers -= this.speedUpgradeCost;
    this.levelStartFeathers = Math.min(this.levelStartFeathers, this.puffinFeathers);
    this.speedBonus += SPEED_UPGRADE_AMOUNT;
    this.speedUpgradeCount += 1;
    this.speedUpgradeCost = getUpgradeCost(this.speedUpgradeCount);
    this.updateShopDisplay();
  }

  private buyOxygenUpgrade(): void {
    if (this.puffinFeathers < this.oxygenUpgradeCost) {
      return;
    }

    this.puffinFeathers -= this.oxygenUpgradeCost;
    this.levelStartFeathers = Math.min(this.levelStartFeathers, this.puffinFeathers);
    this.maxOxygen += OXYGEN_UPGRADE_AMOUNT;
    this.oxygen = this.maxOxygen;
    this.oxygenUpgradeCount += 1;
    this.oxygenUpgradeCost = getUpgradeCost(this.oxygenUpgradeCount);
    this.updateShopDisplay();
  }

  private startLevelTwo(): void {
    this.currentLevel = 2;
    this.gameOver = false;
    this.menuOpen = false;
    this.closePauseOverlay();
    this.deathOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.levelStartFeathers = this.puffinFeathers;
    this.levelStartPenguinKillCount = this.penguinKillCount;
    this.level = { ...LEVEL_TWO };
    this.platforms = levelTwoPlatforms;
    this.hazards = levelTwoHazards;
    this.exitHole = levelTwoExitHole;
    this.fish = createFish(levelTwoFish, false);
    this.penguins = createPenguinsOnSurfaces(levelTwoPenguins, levelTwoPlatforms, LEVEL_TWO);
    this.resetExitOpeningState();
    this.score = 0;
    this.penguinsDefeated = 0;
    this.splats = [];
    this.waterSpits = [];
    this.flyingFeathers = [];
    this.feathers = [];
    this.win = false;
    this.health = this.maxHealth;
    this.resetPuffinPosition();
    this.puffin.x = 130;
    this.puffin.y = this.level.ceilingY + 8;
    this.velocity.y = 80;
    this.grounded = false;
    this.flying = false;
    this.showLevelTitle();
  }

  private startLevelThree(): void {
    this.currentLevel = 3;
    this.gameOver = false;
    this.menuOpen = false;
    this.closePauseOverlay();
    this.deathOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.levelStartFeathers = this.puffinFeathers;
    this.levelStartPenguinKillCount = this.penguinKillCount;
    this.level = { ...LEVEL_THREE };
    this.platforms = levelThreePlatforms;
    this.hazards = levelThreeHazards;
    this.exitHole = levelThreeExitHole;
    this.fish = createFish(levelThreeFish, true);
    this.penguins = createLevelThreePenguins();
    this.resetExitOpeningState();
    this.score = 0;
    this.penguinsDefeated = 0;
    this.splats = [];
    this.waterSpits = [];
    this.flyingFeathers = [];
    this.feathers = [];
    this.win = false;
    this.health = this.maxHealth;
    this.resetPuffinPosition();
    this.showLevelTitle();
  }

  private startLevelFour(): void {
    this.currentLevel = 4;
    this.gameOver = false;
    this.menuOpen = false;
    this.closePauseOverlay();
    this.deathOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.levelStartFeathers = this.puffinFeathers;
    this.levelStartPenguinKillCount = this.penguinKillCount;
    this.level = { ...LEVEL_FOUR };
    this.platforms = levelFourPlatforms;
    this.hazards = levelFourHazards;
    this.exitHole = levelFourExitHole;
    this.fish = createFish(levelFourFish, false);
    this.penguins = createPenguinsOnSurfaces(levelFourPenguins, levelFourPlatforms, LEVEL_FOUR);
    this.resetExitOpeningState();
    this.score = 0;
    this.penguinsDefeated = 0;
    this.splats = [];
    this.waterSpits = [];
    this.flyingFeathers = [];
    this.feathers = [];
    this.win = false;
    this.health = this.maxHealth;
    this.resetPuffinPosition();
    this.showLevelTitle();
  }

  private startLevelFive(): void {
    this.currentLevel = 5;
    this.gameOver = false;
    this.menuOpen = false;
    this.closePauseOverlay();
    this.deathOverlay?.setAttribute("hidden", "");
    this.stageCompleteOverlay?.setAttribute("hidden", "");
    this.levelsOverlay?.setAttribute("hidden", "");
    this.mainMenuOverlay?.setAttribute("hidden", "");
    this.shopOverlay?.setAttribute("hidden", "");
    this.levelFiveArenaClosed = false;
    this.stageComplete = false;
    this.levelStartFeathers = this.puffinFeathers;
    this.levelStartPenguinKillCount = this.penguinKillCount;
    this.level = { ...LEVEL_FIVE };
    this.platforms = levelFivePlatforms;
    this.hazards = levelFiveHazards;
    this.exitHole = levelFiveExitHole;
    this.fish = createLevelFiveFish();
    this.penguins = createLevelFivePenguins();
    this.resetExitOpeningState();
    this.score = 0;
    this.penguinsDefeated = 0;
    this.splats = [];
    this.waterSpits = [];
    this.flyingFeathers = [];
    this.feathers = [];
    this.win = false;
    this.health = this.maxHealth;
    this.resetPuffinPosition();
    this.showLevelTitle();
  }

  private isOverExitHole(): boolean {
    return this.puffin.x < this.exitHole.x + this.exitHole.width && this.puffin.x + this.puffin.width > this.exitHole.x;
  }

  private isFilledSlopePlatform(platform: Platform): boolean {
    return (
      (this.currentLevel === 4 && platform === levelFourPlatforms[1]) ||
      (this.currentLevel === 5 && platform === levelFivePlatforms[18])
    );
  }

  private resetExitOpeningState(): void {
    this.exitWasLocked = this.isBossAlive();
    this.exitOpeningTimer = 0;
  }

  private updateExitOpening(): void {
    const locked = this.isBossAlive();

    if (this.exitWasLocked && !locked) {
      this.exitOpeningTimer = 0.85;
    }

    this.exitWasLocked = locked;
  }

  private isEnteringExitHole(): boolean {
    if (this.currentLevel === 5) {
      return false;
    }

    if (this.isBossAlive()) {
      return false;
    }

    if (this.isStageTwoForestLevel()) {
      return this.grounded && this.puffin.x + this.puffin.width >= this.level.width - 4;
    }

    if (this.currentLevel === 2 || this.currentLevel === 3 || this.currentLevel === 4) {
      return this.grounded && this.puffin.x + this.puffin.width >= this.level.width - 4;
    }

    if (this.currentLevel !== 1) {
      return rectanglesOverlap(this.puffin, this.exitHole);
    }

    const puffinCenter = this.puffin.x + this.puffin.width / 2;
    const footY = this.puffin.y + this.puffin.height;

    return (
      puffinCenter > this.exitHole.x + 8 &&
      puffinCenter < this.exitHole.x + this.exitHole.width - 8 &&
      footY > this.level.groundY + 22
    );
  }

  private isBossAlive(): boolean {
    return this.penguins.some((penguin) => penguin.isBoss === true && !penguin.defeated);
  }

  private dropFeathers(penguin: Penguin, amount: number): void {
    for (let index = 0; index < amount; index += 1) {
      const spread = (index - (amount - 1) / 2) * 24;
      const direction = amount === 1 ? 0 : index - (amount - 1) / 2;
      const startY = penguin.y + 8;
      const underwater = this.isInWaterSection(penguin) && startY > this.getWaterSurfaceY() - 10;

      this.feathers.push({
        x: penguin.x + penguin.width / 2 + spread,
        y: startY,
        age: 0,
        collected: false,
        driftPhase: Math.random() * Math.PI * 2,
        rotation: 0,
        underwater,
        velocity: {
          x: direction * 46 + (Math.random() - 0.5) * 28,
          y: underwater ? -(58 + Math.random() * 34) : 22 + Math.random() * 32,
        },
      });
    }
  }

  private dropFishFromStageBossSummon(penguin: Penguin): void {
    if (this.currentLevel !== 5 || penguin.summonedByStageBoss !== true || Math.random() >= STAGE_BOSS_SUMMON_FISH_DROP_CHANCE) {
      return;
    }

    const fish: Fish = {
      x: penguin.x + penguin.width / 2,
      y: penguin.y + Math.max(12, penguin.height * 0.36),
      collected: false,
      swimRange: 0,
      swimSpeed: 0,
    };

    this.fish.push(fish);
    this.spawnFishSplat(fish.x, fish.y);
  }

  private updateSplats(deltaSeconds: number): void {
    for (const splat of this.splats) {
      splat.age += deltaSeconds;

      for (const particle of splat.particles) {
        particle.x += particle.velocity.x * deltaSeconds;
        particle.y += particle.velocity.y * deltaSeconds;
        particle.velocity.y += 520 * deltaSeconds;
      }
    }

    this.splats = this.splats.filter((splat) => splat.age < splat.duration);
  }

  private spawnSplat(x: number, y: number): void {
    this.splats.push({
      x,
      y,
      age: 0,
      duration: 0.55,
      kind: "penguin",
      particles: [
        { x: -18, y: -10, size: 8, velocity: { x: -145, y: -190 } },
        { x: -8, y: -16, size: 6, velocity: { x: -70, y: -240 } },
        { x: 5, y: -14, size: 7, velocity: { x: 45, y: -230 } },
        { x: 17, y: -9, size: 8, velocity: { x: 130, y: -175 } },
        { x: -2, y: -6, size: 10, velocity: { x: 10, y: -130 } },
      ],
    });
  }

  private spawnPenguinHit(x: number, y: number): void {
    this.splats.push({
      x,
      y,
      age: 0,
      duration: 0.24,
      kind: "penguin-hit",
      particles: [
        { x: -10, y: -6, size: 5, velocity: { x: -95, y: -120 } },
        { x: 0, y: -10, size: 4, velocity: { x: -10, y: -150 } },
        { x: 11, y: -5, size: 5, velocity: { x: 90, y: -115 } },
      ],
    });
  }

  private spawnFishSplat(x: number, y: number): void {
    this.splats.push({
      x,
      y,
      age: 0,
      duration: 0.45,
      kind: "fish",
      particles: [
        { x: -14, y: -6, size: 7, velocity: { x: -130, y: -160 } },
        { x: -4, y: -10, size: 5, velocity: { x: -35, y: -210 } },
        { x: 7, y: -8, size: 6, velocity: { x: 65, y: -185 } },
        { x: 16, y: -2, size: 7, velocity: { x: 130, y: -120 } },
      ],
    });
  }

  private spawnFeatherSplat(x: number, y: number): void {
    this.splats.push({
      x,
      y,
      age: 0,
      duration: 0.5,
      kind: "feather",
      particles: [
        { x: -12, y: -6, size: 6, velocity: { x: -115, y: -150 } },
        { x: -2, y: -11, size: 5, velocity: { x: -15, y: -205 } },
        { x: 9, y: -5, size: 6, velocity: { x: 105, y: -145 } },
      ],
    });
  }

  private spawnSplash(x: number, y: number): void {
    this.splats.push({
      x,
      y,
      age: 0,
      duration: 0.38,
      kind: "splash",
      particles: [
        { x: -24, y: -3, size: 6, velocity: { x: -170, y: -190 } },
        { x: -12, y: -8, size: 5, velocity: { x: -80, y: -245 } },
        { x: 0, y: -10, size: 6, velocity: { x: 10, y: -265 } },
        { x: 13, y: -8, size: 5, velocity: { x: 90, y: -235 } },
        { x: 25, y: -3, size: 6, velocity: { x: 170, y: -180 } },
      ],
    });
  }

  private spawnWaterSpitSplash(x: number, y: number, direction: -1 | 1): void {
    this.splats.push({
      x,
      y,
      age: 0,
      duration: 0.3,
      kind: "splash",
      particles: [
        { x: -8, y: -8, size: 6, velocity: { x: direction * 210, y: -54 } },
        { x: -3, y: -2, size: 5, velocity: { x: direction * 270, y: 14 } },
        { x: 5, y: -11, size: 6, velocity: { x: direction * 340, y: -28 } },
        { x: 10, y: 2, size: 5, velocity: { x: direction * 400, y: 34 } },
        { x: 18, y: -5, size: 4, velocity: { x: direction * 470, y: -4 } },
      ],
    });
  }

  private updateCamera(deltaSeconds: number): void {
    this.cameraX = this.getTargetCameraX();
    const targetY = this.getTargetCameraY();

    if (this.currentLevel === 1) {
      this.cameraY = targetY;
      return;
    }

    const smoothing = 1 - Math.exp(-deltaSeconds * 5.8);
    this.cameraY += (targetY - this.cameraY) * smoothing;
  }

  private getTargetCameraX(): number {
    const target = this.puffin.x - VIEW.width * 0.42;
    return clamp(target, 0, this.level.width - VIEW.width);
  }

  private getTargetCameraY(): number {
    if (this.currentLevel === 1) {
      return 0;
    }

    const target = this.puffin.y - VIEW.height * 0.46;
    const minY = Math.min(0, this.level.ceilingY);
    const maxY = Math.max(minY, this.level.groundY - VIEW.height + 80);
    return clamp(target, minY, maxY);
  }

  private render(): void {
    this.updateExternalHud();
    this.context.clearRect(0, 0, VIEW.width, VIEW.height);
    this.drawSky();
    this.drawWorld();
    this.drawHud();
    this.drawLevelTitleCard();
    this.drawDamageEdges();
    this.drawExplosionFlash();
  }

  private drawSky(): void {
    if (this.endlessMode) {
      this.drawEndlessSky();
      return;
    }

    if (this.isStageTwoForestLevel()) {
      this.drawForestSky();
      return;
    }

    if (this.currentLevel === 2) {
      this.drawUnderground();
      return;
    }

    if (this.currentLevel === 5 && this.cameraX > LEVEL_FIVE_WATER_END_X) {
      if (this.cameraX < 5400) {
        this.drawLevelFiveMineSky();
        return;
      }

      this.drawMountainSky();
      return;
    }

    if (this.currentLevel === 3) {
      this.drawOceanSky();
      return;
    }

    const gradient = this.context.createLinearGradient(0, 0, 0, VIEW.height);
    gradient.addColorStop(0, "#9bd7ec");
    gradient.addColorStop(0.58, "#4b9ab2");
    gradient.addColorStop(1, "#1e5d70");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);

    this.context.fillStyle = "rgba(255, 255, 255, 0.86)";
    this.drawCloud(116 - this.cameraX * 0.1, 88, 1);
    this.drawCloud(560 - this.cameraX * 0.08, 132, 0.75);
    this.drawCloud(880 - this.cameraX * 0.12, 74, 0.85);

    if (this.currentLevel === 4 || (this.currentLevel === 5 && this.cameraX <= LEVEL_FIVE_WATER_END_X)) {
      return;
    }

    if (this.currentLevel !== 5) {
      this.drawGround();
    }
  }

  private drawEndlessSky(): void {
    const gradient = this.context.createLinearGradient(0, 0, 0, VIEW.height);
    gradient.addColorStop(0, "#7dc7dd");
    gradient.addColorStop(0.56, "#3e8ba2");
    gradient.addColorStop(1, "#17495b");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);

    this.context.fillStyle = "rgba(255, 255, 255, 0.7)";
    this.drawCloud(180 - this.cameraX * 0.08, 82, 0.7);
    this.drawCloud(680 - this.cameraX * 0.06, 126, 0.58);

    this.context.fillStyle = "rgba(247, 251, 255, 0.34)";
    for (let x = -((this.cameraX * 0.38) % 180); x < VIEW.width + 180; x += 180) {
      this.context.fillRect(x, 354, 118, 8);
      this.context.fillRect(x + 44, 380, 82, 6);
    }

    this.drawGround();
  }

  private drawForestSky(): void {
    const gradient = this.context.createLinearGradient(0, 0, 0, VIEW.height);
    gradient.addColorStop(0, "#a8e6b4");
    gradient.addColorStop(0.5, "#5fbf78");
    gradient.addColorStop(1, "#225f3b");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);

    this.context.fillStyle = "rgba(255, 255, 255, 0.42)";
    this.drawCloud(160 - this.cameraX * 0.07, 86, 0.72);
    this.drawCloud(690 - this.cameraX * 0.05, 118, 0.58);

    this.context.fillStyle = "rgba(21, 82, 47, 0.42)";
    for (let x = -((this.cameraX * 0.18) % 240); x < VIEW.width + 240; x += 240) {
      this.context.fillRect(x + 84, 190, 42, 260);
      this.context.beginPath();
      this.context.arc(x + 105, 170, 72, 0, Math.PI * 2);
      this.context.arc(x + 55, 216, 58, 0, Math.PI * 2);
      this.context.arc(x + 155, 224, 62, 0, Math.PI * 2);
      this.context.fill();
    }

    this.drawGround();
  }

  private drawMountainSky(): void {
    const gradient = this.context.createLinearGradient(0, 0, 0, VIEW.height);
    gradient.addColorStop(0, "#bdefff");
    gradient.addColorStop(0.52, "#6fb8d0");
    gradient.addColorStop(1, "#355d71");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);

    this.context.fillStyle = "rgba(255, 255, 255, 0.78)";
    this.drawCloud(210 - this.cameraX * 0.07, 84 - this.cameraY * 0.05, 0.78);
    this.drawCloud(760 - this.cameraX * 0.06, 126 - this.cameraY * 0.04, 0.64);
  }

  private drawLevelFiveMineSky(): void {
    const gradient = this.context.createLinearGradient(0, 0, 0, VIEW.height);
    gradient.addColorStop(0, "#1b252c");
    gradient.addColorStop(0.55, "#263841");
    gradient.addColorStop(1, "#10171b");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);

    this.context.fillStyle = "rgba(135, 205, 218, 0.12)";
    for (let x = -((this.cameraX * 0.22) % 260); x < VIEW.width; x += 260) {
      this.context.fillRect(x + 18, 146 - this.cameraY * 0.08, 124, 10);
      this.context.fillRect(x + 62, 178 - this.cameraY * 0.08, 76, 7);
    }

  }

  private drawOceanSky(): void {
    const gradient = this.context.createLinearGradient(0, 0, 0, VIEW.height);
    gradient.addColorStop(0, "#7dd7ee");
    gradient.addColorStop(0.48, "#2e9bbb");
    gradient.addColorStop(1, "#0f5671");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);

    this.context.fillStyle = "rgba(255, 255, 255, 0.72)";
    this.drawCloud(160 - this.cameraX * 0.08, 78, 0.78);
    this.drawCloud(620 - this.cameraX * 0.1, 118, 0.62);

    this.context.fillStyle = "rgba(230, 252, 255, 0.25)";
    for (let x = -((this.cameraX * 0.45) % 180); x < VIEW.width; x += 180) {
      this.context.fillRect(x, this.level.groundY - 18, 96, 5);
      this.context.fillRect(x + 54, this.level.groundY - 8, 72, 4);
    }

    this.drawGround();
  }

  private drawUnderground(): void {
    const gradient = this.context.createLinearGradient(0, 0, 0, VIEW.height);
    gradient.addColorStop(0, "#16232b");
    gradient.addColorStop(0.52, "#24333a");
    gradient.addColorStop(1, "#10171b");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);

    this.context.fillStyle = "#111a20";
    this.context.fillRect(0, 0, VIEW.width, this.level.ceilingY);

    this.context.fillStyle = "#31464f";
    for (let x = -((this.cameraX * 0.55) % 90); x < VIEW.width; x += 90) {
      this.context.fillRect(x, this.level.ceilingY - 10, 54, 10);
      this.context.beginPath();
      this.context.moveTo(x + 12, this.level.ceilingY);
      this.context.lineTo(x + 28, this.level.ceilingY + 34);
      this.context.lineTo(x + 44, this.level.ceilingY);
      this.context.closePath();
      this.context.fill();
    }

    this.context.fillStyle = "rgba(135, 205, 218, 0.16)";
    for (let x = -((this.cameraX * 0.2) % 260); x < VIEW.width; x += 260) {
      this.context.fillRect(x + 30, 150, 120, 12);
      this.context.fillRect(x + 64, 178, 70, 8);
    }

    this.drawGround();
  }

  private drawGround(): void {
    if (this.isStageTwoForestLevel()) {
      this.context.fillStyle = "#173b25";
      this.context.fillRect(0, this.level.groundY, VIEW.width, VIEW.height - this.level.groundY);

      this.context.fillStyle = "#55b85f";
      this.context.fillRect(0, this.level.groundY, VIEW.width, 12);

      this.context.fillStyle = "#2f7a3f";
      for (let x = -((this.cameraX * 0.8) % 54); x < VIEW.width; x += 54) {
        this.context.fillRect(x, this.level.groundY + 12, 30, 6);
      }

      return;
    }

    if (this.currentLevel === 3) {
      this.context.fillStyle = "#0e6682";
      this.context.fillRect(0, this.level.groundY, VIEW.width, VIEW.height - this.level.groundY);

      this.context.fillStyle = "#9ee8ff";
      this.context.fillRect(0, this.level.groundY, VIEW.width, 7);

      this.context.fillStyle = "rgba(255, 255, 255, 0.35)";
      for (let x = -((this.cameraX * 0.7) % 62); x < VIEW.width; x += 62) {
        this.context.fillRect(x, this.level.groundY + 15, 34, 4);
      }

      return;
    }

    this.context.fillStyle = this.currentLevel === 2 ? "#10171b" : "#234250";
    this.context.fillRect(0, this.level.groundY, VIEW.width, VIEW.height - this.level.groundY);

    this.context.fillStyle = this.currentLevel === 2 ? "#31464f" : "#d8f3f7";
    this.context.fillRect(0, this.level.groundY, VIEW.width, 10);

    this.context.fillStyle = this.currentLevel === 2 ? "#1f3037" : "#8ccbd7";
    for (let x = -((this.cameraX * 0.8) % 46); x < VIEW.width; x += 46) {
      this.context.fillRect(x, this.level.groundY + 10, 28, 5);
    }
  }

  private drawForestTrees(): void {
    if (!this.isStageTwoForestLevel()) {
      return;
    }

    for (const tree of this.forestTrees) {
      this.drawForestTree(tree);
    }
  }

  private drawForestTree(tree: ForestTree): void {
    const progress = tree.falling ? clamp(tree.fallTimer / 0.55, 0, 1) : 0;

    this.context.save();

    if (tree.falling) {
      const pivotX = tree.x + tree.width / 2;
      const pivotY = tree.y + tree.height;
      this.context.translate(pivotX, pivotY);
      this.context.rotate(tree.direction * progress * Math.PI * 0.5);
      this.context.translate(-pivotX, -pivotY);
    }

    this.context.fillStyle = tree.cut ? "#8a5a2c" : "#6b4325";
    this.context.fillRect(tree.x, tree.y, tree.width, tree.height);

    this.context.fillStyle = "#2f7a3f";
    this.context.beginPath();
    this.context.arc(tree.x + tree.width / 2, tree.y - 18, 58, 0, Math.PI * 2);
    this.context.arc(tree.x - 20, tree.y + 24, 46, 0, Math.PI * 2);
    this.context.arc(tree.x + tree.width + 18, tree.y + 22, 48, 0, Math.PI * 2);
    this.context.fill();

    if (!tree.cut && tree.cutProgress > 0) {
      const dentProgress = clamp(tree.cutProgress / 1.35, 0, 1);
      const inward = tree.direction > 0 ? 1 : -1;
      const edgeX = tree.direction > 0 ? tree.x : tree.x + tree.width;
      const dentY = tree.y + tree.height - 48;
      const dentDepth = 6 + dentProgress * 19;
      const dentHeight = 12 + dentProgress * 28;

      this.context.fillStyle = "#3b2518";
      this.context.beginPath();
      this.context.moveTo(edgeX, dentY);
      this.context.lineTo(edgeX + inward * dentDepth, dentY + dentHeight / 2);
      this.context.lineTo(edgeX, dentY + dentHeight);
      this.context.closePath();
      this.context.fill();

      this.context.strokeStyle = "rgba(247, 251, 255, 0.68)";
      this.context.lineWidth = 2;
      this.context.beginPath();
      this.context.moveTo(edgeX + inward * 2, dentY + 4);
      this.context.lineTo(edgeX + inward * (dentDepth - 2), dentY + dentHeight / 2);
      this.context.moveTo(edgeX + inward * 2, dentY + dentHeight - 4);
      this.context.lineTo(edgeX + inward * (dentDepth - 2), dentY + dentHeight / 2);
      this.context.stroke();
    }

    this.context.restore();
  }

  private drawWorld(): void {
    this.context.save();
    this.context.translate(-this.cameraX, -this.cameraY);

    this.drawDistantIce();
    this.drawLevelFiveWater();
    this.drawLevelFiveMineMountain();
    this.drawMountainSummitFill();
    this.drawEndlessSummitFill();

    for (const platform of this.platforms) {
      this.drawPlatform(platform);
    }

    this.drawForestTrees();

    this.drawLevelFiveArenaGates();

    for (const hazard of this.hazards) {
      this.drawHazard(hazard);
    }

    for (const fish of this.fish) {
      if (!fish.collected) {
        this.drawFish(fish);
      }
    }

    for (const feather of this.feathers) {
      if (!feather.collected) {
        this.drawFeather(feather);
      }
    }

    for (const feather of this.flyingFeathers) {
      this.drawFlyingFeather(feather);
    }

    for (const penguin of this.penguins) {
      if (!penguin.defeated && penguin.waitingToDive !== true) {
        this.drawPenguin(penguin);
      }
    }

    for (const spit of this.waterSpits) {
      this.drawWaterSpit(spit);
    }

    for (const splat of this.splats) {
      this.drawSplat(splat);
    }

    this.drawExitHole();
    this.drawPuffin();

    this.context.restore();
  }

  private drawDistantIce(): void {
    if (this.isStageTwoForestLevel()) {
      this.context.fillStyle = "rgba(12, 60, 31, 0.56)";

      for (let x = -160; x < this.level.width; x += 260) {
        const trunkX = x + 96;
        this.context.fillRect(trunkX, 246, 46, this.level.groundY - 246);
        this.context.beginPath();
        this.context.arc(trunkX + 23, 230, 70, 0, Math.PI * 2);
        this.context.arc(trunkX - 34, 282, 54, 0, Math.PI * 2);
        this.context.arc(trunkX + 78, 286, 58, 0, Math.PI * 2);
        this.context.fill();
      }

      return;
    }

    this.context.fillStyle = "rgba(231, 248, 255, 0.48)";

    if (this.currentLevel === 2) {
      this.context.fillStyle = "rgba(11, 18, 22, 0.42)";

      for (let x = -180; x < this.level.width; x += 430) {
        this.context.fillRect(x, 114, 220, 34);
        this.context.fillRect(x + 86, 252, 260, 28);
      }

      return;
    }

    for (let x = -140; x < this.level.width; x += 540) {
      this.context.beginPath();
      this.context.moveTo(x, 428);
      this.context.lineTo(x + 210, 350);
      this.context.lineTo(x + 390, 428);
      this.context.closePath();
      this.context.fill();
    }
  }

  private drawLevelFiveArenaGates(): void {
    if (this.currentLevel !== 5 || !this.levelFiveArenaClosed || this.stageComplete) {
      return;
    }

    const summit = levelFivePlatforms[19];
    const gateTop = summit.y - 620;
    const gateHeight = 620 + summit.height + 120;
    const gateWidth = 30;
    const fallProgress = this.levelFiveGateTimer > 0 ? 1 - this.levelFiveGateTimer / 0.72 : 1;
    const easedFall = 1 - Math.pow(1 - fallProgress, 3);
    const dropOffset = (1 - easedFall) * -760;

    this.drawSummitGate(LEVEL_FIVE_SUMMIT_LEFT_X - gateWidth, gateTop + dropOffset, gateWidth, gateHeight);
    this.drawSummitGate(LEVEL_FIVE_SUMMIT_RIGHT_X, gateTop + dropOffset, gateWidth, gateHeight);

    if (this.levelFiveGateDustTimer > 0) {
      const dustAlpha = clamp(this.levelFiveGateDustTimer / 0.55, 0, 1);
      this.context.fillStyle = `rgba(247, 251, 255, ${0.42 * dustAlpha})`;
      this.context.fillRect(LEVEL_FIVE_SUMMIT_LEFT_X - 54, summit.y + summit.height - 8, 92, 10);
      this.context.fillRect(LEVEL_FIVE_SUMMIT_RIGHT_X - 8, summit.y + summit.height - 8, 92, 10);
      this.context.fillRect(LEVEL_FIVE_SUMMIT_LEFT_X - 76, summit.y + summit.height + 8, 46, 6);
      this.context.fillRect(LEVEL_FIVE_SUMMIT_RIGHT_X + 44, summit.y + summit.height + 8, 46, 6);
    }
  }

  private drawSummitGate(x: number, y: number, width: number, height: number): void {
    this.context.fillStyle = "#6f8790";
    this.context.fillRect(x, y, width, height);

    this.context.fillStyle = "#d8f3f7";
    this.context.fillRect(x + 5, y + 6, width - 10, height - 12);

    this.context.strokeStyle = "#405660";
    this.context.lineWidth = 3;
    for (let lineY = y + 18; lineY < y + height - 10; lineY += 24) {
      this.context.beginPath();
      this.context.moveTo(x + 6, lineY);
      this.context.lineTo(x + width - 6, lineY - 8);
      this.context.stroke();
    }
  }

  private drawExplosionFlash(): void {
    if (this.explosionFlashTimer <= 0) {
      return;
    }

    const alpha = this.explosionFlashTimer > 0.55 ? 1 : clamp(this.explosionFlashTimer / 0.55, 0, 1);
    this.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    this.context.fillRect(0, 0, VIEW.width, VIEW.height);
  }

  private drawLevelFiveWater(): void {
    if (this.currentLevel !== 5) {
      return;
    }

    this.context.fillStyle = "#0e6682";
    this.context.fillRect(
      0,
      LEVEL_FIVE_WATER_SURFACE_Y,
      LEVEL_FIVE_WATER_END_X,
      this.level.groundY - LEVEL_FIVE_WATER_SURFACE_Y + VIEW.height,
    );

    this.context.fillStyle = "#9ee8ff";
    this.context.fillRect(0, LEVEL_FIVE_WATER_SURFACE_Y, LEVEL_FIVE_WATER_END_X, 7);

    this.context.fillStyle = "rgba(255, 255, 255, 0.35)";
    for (let x = 0; x < LEVEL_FIVE_WATER_END_X; x += 62) {
      this.context.fillRect(x, LEVEL_FIVE_WATER_SURFACE_Y + 15, 34, 4);
    }
  }

  private drawLevelFiveMineMountain(): void {
    if (this.currentLevel !== 5) {
      return;
    }

    const mountainBaseY = LEVEL_FIVE_MINE_LAVA_Y + 210;
    const mountainGradient = this.context.createLinearGradient(0, -250, 0, mountainBaseY);
    mountainGradient.addColorStop(0, "#effcff");
    mountainGradient.addColorStop(0.45, "#a9dce8");
    mountainGradient.addColorStop(1, "#3f798f");

    this.context.fillStyle = mountainGradient;
    this.context.beginPath();
    this.context.moveTo(2500, mountainBaseY);
    this.context.lineTo(2840, 34);
    this.context.lineTo(3560, -250);
    this.context.lineTo(4480, -182);
    this.context.lineTo(5425, 30);
    this.context.lineTo(5600, mountainBaseY);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "rgba(255, 255, 255, 0.28)";
    this.context.beginPath();
    this.context.moveTo(2870, 46);
    this.context.lineTo(3560, -238);
    this.context.lineTo(4200, -192);
    this.context.lineTo(3375, 102);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "rgba(46, 109, 132, 0.22)";
    this.context.beginPath();
    this.context.moveTo(4620, -166);
    this.context.lineTo(5425, 30);
    this.context.lineTo(5560, mountainBaseY);
    this.context.lineTo(5060, mountainBaseY);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "#0d1419";
    this.context.beginPath();
    this.context.moveTo(2715, LEVEL_FIVE_MINE_LAVA_Y + 44);
    this.context.lineTo(2940, 136);
    this.context.lineTo(4650, 108);
    this.context.lineTo(5350, LEVEL_FIVE_MINE_LAVA_Y + 44);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "#72a9b6";
    this.context.beginPath();
    this.context.arc(2705, 208, 74, Math.PI * 0.5, Math.PI * 1.5);
    this.context.lineTo(2705, 282);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "#0d1419";
    this.context.beginPath();
    this.context.arc(2720, 210, 54, Math.PI * 0.5, Math.PI * 1.5);
    this.context.lineTo(2720, 264);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "rgba(135, 205, 218, 0.14)";
    for (let x = 2920; x < 5160; x += 330) {
      this.context.fillRect(x, 16 + ((x / 330) % 3) * 24, 160, 10);
      this.context.fillRect(x + 55, 42 + ((x / 330) % 3) * 24, 90, 7);
    }

    this.context.strokeStyle = "rgba(146, 210, 223, 0.65)";
    this.context.lineWidth = 10;
    this.context.beginPath();
    this.context.moveTo(2840, 34);
    this.context.lineTo(3560, -250);
    this.context.lineTo(4480, -182);
    this.context.lineTo(5425, 30);
    this.context.stroke();
  }

  private drawLevelFourIcebergBody(): void {
    if (this.currentLevel !== 4) {
      return;
    }

    const slope = levelFourPlatforms[1];

    if (!slope.slope) {
      return;
    }

    const baseY = this.level.groundY + 180;
    const gradient = this.context.createLinearGradient(0, slope.slope.endY, 0, baseY);
    gradient.addColorStop(0, "#effcff");
    gradient.addColorStop(0.42, "#a9dce8");
    gradient.addColorStop(1, "#3f798f");

    this.context.fillStyle = gradient;
    this.context.beginPath();
    this.context.moveTo(slope.x - 180, baseY);
    this.context.lineTo(slope.x, slope.slope.startY);
    this.context.lineTo(slope.x + slope.width, slope.slope.endY);
    this.context.lineTo(slope.x + slope.width + 480, baseY);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "rgba(255, 255, 255, 0.28)";
    this.context.beginPath();
    this.context.moveTo(slope.x + 125, slope.slope.startY - 8);
    this.context.lineTo(slope.x + slope.width * 0.58, slope.slope.startY + (slope.slope.endY - slope.slope.startY) * 0.58 - 18);
    this.context.lineTo(slope.x + slope.width * 0.34, this.level.groundY + 40);
    this.context.lineTo(slope.x - 35, this.level.groundY + 120);
    this.context.closePath();
    this.context.fill();
  }

  private drawMountainSummitFill(): void {
    if (this.currentLevel !== 4 && this.currentLevel !== 5) {
      return;
    }

    const slope = this.currentLevel === 4 ? levelFourPlatforms[1] : levelFivePlatforms[18];
    const summit = this.currentLevel === 4 ? levelFourPlatforms[2] : levelFivePlatforms[19];

    if (!slope.slope) {
      return;
    }

    const baseY = this.level.groundY + 180;
    const fillStartX = this.currentLevel === 5 ? LEVEL_FIVE_SUMMIT_LEFT_X : summit.x;
    const fillEndX =
      this.currentLevel === 5
        ? LEVEL_FIVE_SUMMIT_RIGHT_X
        : levelFourPlatforms[3].x + levelFourPlatforms[3].width;
    const slopeJoinX = slope.x + slope.width;
    const slopeJoinY = slope.slope.endY;

    this.context.fillStyle = "#f7fbff";
    this.context.beginPath();
    this.context.moveTo(fillStartX, summit.y + summit.height);
    this.context.lineTo(fillStartX, summit.y);
    this.context.lineTo(fillEndX, summit.y);
    this.context.lineTo(fillEndX + 360, baseY);
    this.context.lineTo(fillStartX - 120, baseY);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "rgba(255, 255, 255, 0.32)";
    this.context.beginPath();
    this.context.moveTo(slopeJoinX - 80, slopeJoinY + 40);
    this.context.lineTo(fillEndX - 90, summit.y + 18);
    this.context.lineTo(fillEndX + 80, baseY);
    this.context.lineTo(fillStartX + 40, baseY);
    this.context.closePath();
    this.context.fill();
  }

  private drawEndlessSummitFill(): void {
    if (!this.endlessMode) {
      return;
    }

    const baseY = this.level.groundY + 180;
    const firstPlatform = endlessZonePlatforms[0];
    const lastPlatform = endlessZonePlatforms[endlessZonePlatforms.length - 1];

    this.context.fillStyle = "#f7fbff";
    this.context.beginPath();
    this.context.moveTo(firstPlatform.x, firstPlatform.y + firstPlatform.height);
    this.context.lineTo(firstPlatform.x, firstPlatform.y);
    this.context.lineTo(lastPlatform.x + lastPlatform.width, lastPlatform.y);
    this.context.lineTo(lastPlatform.x + lastPlatform.width + 180, baseY);
    this.context.lineTo(firstPlatform.x - 180, baseY);
    this.context.closePath();
    this.context.fill();

    for (const platform of endlessZonePlatforms) {
      this.context.fillStyle = "rgba(255, 255, 255, 0.32)";
      this.context.beginPath();
      this.context.moveTo(platform.x + platform.width * 0.18, platform.y + 34);
      this.context.lineTo(platform.x + platform.width * 0.84, platform.y + 18);
      this.context.lineTo(platform.x + platform.width + 80, baseY);
      this.context.lineTo(platform.x + platform.width * 0.3, baseY);
      this.context.closePath();
      this.context.fill();
    }
  }

  private drawPlatform(platform: Platform): void {
    if (platform.slope) {
      this.drawSlopedPlatform(platform);
      return;
    }

    if (platform.wall) {
      this.drawIceWall(platform);
      return;
    }

    if (this.isStageTwoForestLevel()) {
      this.context.fillStyle = "#6b4325";
      this.context.beginPath();
      this.context.roundRect(platform.x, platform.y, platform.width, platform.height, 10);
      this.context.fill();

      this.context.fillStyle = "#69c85f";
      this.context.fillRect(platform.x, platform.y, platform.width, 12);

      this.context.fillStyle = "rgba(38, 88, 41, 0.35)";
      for (let x = platform.x + 18; x < platform.x + platform.width - 16; x += 52) {
        this.context.fillRect(x, platform.y + 18, 24, 4);
      }

      this.context.strokeStyle = "rgba(36, 24, 14, 0.24)";
      this.context.lineWidth = 2;
      this.context.strokeRect(platform.x + 10, platform.y + 16, platform.width - 20, platform.height - 24);
      return;
    }

    this.context.fillStyle = platform.kind === "snow" ? "#f7fbff" : "#d8f3f7";
    this.context.beginPath();
    this.context.roundRect(platform.x, platform.y, platform.width, platform.height, 16);
    this.context.fill();

    this.context.fillStyle = platform.kind === "snow" ? "#bde5ee" : "#92d2df";
    this.context.fillRect(platform.x + 18, platform.y + platform.height - 9, platform.width - 36, 6);

    this.context.strokeStyle = "rgba(14, 62, 78, 0.18)";
    this.context.lineWidth = 2;
    this.context.strokeRect(platform.x + 10, platform.y + 8, platform.width - 20, platform.height - 16);
  }

  private drawIceWall(platform: Platform): void {
    this.context.fillStyle = "#d8f3f7";
    this.context.fillRect(platform.x, platform.y, platform.width, platform.height);

    this.context.fillStyle = "#f7fbff";
    this.context.fillRect(platform.x, platform.y, platform.width, 18);

    this.context.fillStyle = "#92d2df";
    this.context.fillRect(platform.x + 8, platform.y, 8, platform.height);
    this.context.fillRect(platform.x + platform.width - 16, platform.y, 8, platform.height);

    this.context.strokeStyle = "rgba(14, 62, 78, 0.22)";
    this.context.lineWidth = 2;
    for (let y = platform.y + 38; y < platform.y + platform.height; y += 64) {
      this.context.beginPath();
      this.context.moveTo(platform.x + 12, y);
      this.context.lineTo(platform.x + platform.width - 12, y - 12);
      this.context.stroke();
    }
  }

  private drawSlopedPlatform(platform: Platform): void {
    if (!platform.slope) {
      return;
    }

    const { startY, endY } = platform.slope;
    const isLevelFourIceberg = this.isFilledSlopePlatform(platform);
    const visibleHeight = isLevelFourIceberg ? 54 : platform.height;
    const bottomStartY = startY + visibleHeight;
    const bottomEndY = endY + visibleHeight;

    if (isLevelFourIceberg) {
      const baseY = this.level.groundY + 180;
      this.context.fillStyle = "#f7fbff";
      this.context.beginPath();
      this.context.moveTo(platform.x - 180, baseY);
      this.context.lineTo(platform.x, startY);
      this.context.lineTo(platform.x + platform.width, endY);
      this.context.lineTo(platform.x + platform.width + 480, baseY);
      this.context.closePath();
      this.context.fill();

      this.context.fillStyle = "#f7fbff";
      this.context.beginPath();
      this.context.moveTo(platform.x, startY);
      this.context.lineTo(platform.x + platform.width, endY);
      this.context.lineTo(platform.x + platform.width, bottomEndY);
      this.context.lineTo(platform.x, bottomStartY);
      this.context.closePath();
      this.context.fill();

      this.context.strokeStyle = "#bde5ee";
      this.context.lineWidth = 8;
      this.context.beginPath();
      this.context.moveTo(platform.x + 12, startY + 5);
      this.context.lineTo(platform.x + platform.width - 12, endY + 5);
      this.context.stroke();
      return;
    }

    this.context.fillStyle = platform.kind === "snow" ? "#f7fbff" : "#d8f3f7";
    this.context.beginPath();
    this.context.moveTo(platform.x, startY);
    this.context.lineTo(platform.x + platform.width, endY);
    this.context.lineTo(platform.x + platform.width, bottomEndY);
    this.context.lineTo(platform.x, bottomStartY);
    this.context.closePath();
    this.context.fill();

    this.context.strokeStyle = platform.kind === "snow" ? "#bde5ee" : "#92d2df";
    this.context.lineWidth = 8;
    this.context.beginPath();
    this.context.moveTo(platform.x + 12, startY + 5);
    this.context.lineTo(platform.x + platform.width - 12, endY + 5);
    this.context.stroke();

    this.context.strokeStyle = "rgba(14, 62, 78, 0.18)";
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(platform.x + 12, startY + 15);
    this.context.lineTo(platform.x + platform.width - 12, endY + 15);
    this.context.lineTo(platform.x + platform.width - 12, bottomEndY - 10);
    this.context.lineTo(platform.x + 12, bottomStartY - 10);
    this.context.closePath();
    this.context.stroke();
  }

  private drawHazard(hazard: Hazard): void {
    if (hazard.kind === "lava") {
      this.drawLava(hazard);
      return;
    }

    this.drawCrevasse(hazard);
  }

  private drawCrevasse(hazard: Rect): void {
    const gradient = this.context.createLinearGradient(0, this.level.groundY, 0, this.level.groundY + hazard.height);
    gradient.addColorStop(0, "#09242f");
    gradient.addColorStop(1, "#02090d");

    this.context.fillStyle = gradient;
    this.context.beginPath();
    this.context.roundRect(hazard.x, this.level.groundY - 2, hazard.width, hazard.height + 42, 6);
    this.context.fill();

    if (this.currentLevel !== 5) {
      this.context.fillStyle = this.currentLevel === 2 ? "#31464f" : "#d8f3f7";
      this.context.fillRect(hazard.x - 5, this.level.groundY, 5, 10);
      this.context.fillRect(hazard.x + hazard.width, this.level.groundY, 5, 10);
    }

    this.context.fillStyle = "rgba(140, 214, 229, 0.34)";
    this.context.fillRect(hazard.x + 8, this.level.groundY + 10, hazard.width - 16, 4);
  }

  private drawLava(hazard: Rect): void {
    const lavaY = hazard.y;
    const flowOffset = (this.previousTime / 28) % 22;
    const glow = this.context.createRadialGradient(
      hazard.x + hazard.width / 2,
      lavaY + hazard.height / 2,
      4,
      hazard.x + hazard.width / 2,
      lavaY + hazard.height / 2,
      hazard.width,
    );
    glow.addColorStop(0, "rgba(255, 210, 64, 0.8)");
    glow.addColorStop(0.45, "rgba(255, 87, 34, 0.72)");
    glow.addColorStop(1, "rgba(122, 20, 16, 0)");

    this.context.fillStyle = glow;
    this.context.fillRect(hazard.x - 28, lavaY - 18, hazard.width + 56, hazard.height + 58);

    const lava = this.context.createLinearGradient(0, lavaY, 0, lavaY + hazard.height);
    lava.addColorStop(0, "#ffd447");
    lava.addColorStop(0.45, "#ff6a2a");
    lava.addColorStop(1, "#9e1d18");

    this.context.fillStyle = lava;
    this.context.beginPath();
    this.context.roundRect(hazard.x, lavaY - 2, hazard.width, hazard.height + 42, 6);
    this.context.fill();

    if (this.currentLevel !== 5) {
      this.context.fillStyle = this.currentLevel === 2 ? "#31464f" : "#d8f3f7";
      this.context.fillRect(hazard.x - 5, lavaY, 5, 10);
      this.context.fillRect(hazard.x + hazard.width, lavaY, 5, 10);
    }

    this.context.strokeStyle = "#5e130f";
    this.context.lineWidth = 3;
    this.context.strokeRect(hazard.x + 4, lavaY + 5, hazard.width - 8, hazard.height + 12);

    this.context.fillStyle = "rgba(255, 245, 124, 0.86)";
    for (let x = hazard.x - 14 + flowOffset; x < hazard.x + hazard.width - 8; x += 22) {
      const y = lavaY + 10 + Math.sin((x + this.previousTime / 12) / 13) * 4;
      const streakX = clamp(x, hazard.x + 7, hazard.x + hazard.width - 22);
      this.context.fillRect(streakX, y, 14, 4);
      this.context.fillRect(streakX, y + 9, 10, 3);
    }
  }

  private drawFish(fish: Fish): void {
    const tailWag = Math.sin((fish.swimPhase ?? 0) * 7) * 3;

    this.context.save();
    this.context.translate(fish.x, fish.y);

    this.context.fillStyle = "#ffbf4f";
    this.context.beginPath();
    this.context.ellipse(0, 0, 18, 10, 0, 0, Math.PI * 2);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(-16, 0);
    this.context.lineTo(-30, -10 + tailWag);
    this.context.lineTo(-30, 10 + tailWag);
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = "#23313a";
    this.context.beginPath();
    this.context.arc(8, -2, 2, 0, Math.PI * 2);
    this.context.fill();

    this.context.restore();
  }

  private drawFeather(feather: Feather): void {
    this.context.save();
    this.context.translate(feather.x, feather.y);
    this.context.rotate(feather.rotation);

    this.context.fillStyle = "rgba(0, 0, 0, 0.18)";
    this.context.fillRect(-7, 10, 16, 3);

    this.context.fillStyle = "#f7fbff";
    this.context.beginPath();
    this.context.ellipse(0, 0, 4, 11, 0.18, 0, Math.PI * 2);
    this.context.fill();

    this.context.strokeStyle = "#7fa8b7";
    this.context.lineWidth = 1.4;
    this.context.beginPath();
    this.context.moveTo(0, -9);
    this.context.lineTo(0, 10);
    this.context.stroke();

    this.context.strokeStyle = "rgba(127, 168, 183, 0.72)";
    this.context.lineWidth = 1;
    for (let y = -6; y <= 5; y += 5) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(y < 0 ? -3 : 3, y + 3);
      this.context.stroke();
    }

    this.context.restore();
  }

  private drawFlyingFeather(feather: FlyingFeather): void {
    if (feather.age < feather.delay) {
      return;
    }

    this.context.save();
    this.context.translate(feather.x, feather.y);
    this.context.rotate(feather.rotation);

    this.context.fillStyle = "rgba(255, 255, 255, 0.34)";
    this.context.beginPath();
    this.context.ellipse(0, 0, 8, 16, 0.18, 0, Math.PI * 2);
    this.context.fill();

    this.context.fillStyle = "#f7fbff";
    this.context.beginPath();
    this.context.ellipse(0, 0, 4, 11, 0.18, 0, Math.PI * 2);
    this.context.fill();

    this.context.strokeStyle = "#7fa8b7";
    this.context.lineWidth = 1.4;
    this.context.beginPath();
    this.context.moveTo(0, -9);
    this.context.lineTo(0, 10);
    this.context.stroke();

    this.context.restore();
  }

  private drawWaterSpit(spit: WaterSpit): void {
    const centerX = spit.x + spit.width / 2;
    const centerY = spit.y + spit.height / 2;
    const speedAngle = Math.atan2(spit.velocity.y, spit.velocity.x);

    this.context.save();
    this.context.translate(centerX, centerY);
    this.context.rotate(speedAngle);

    this.context.fillStyle = "rgba(187, 247, 255, 0.34)";
    this.context.beginPath();
    this.context.ellipse(-5, 0, 18, 8, 0, 0, Math.PI * 2);
    this.context.fill();

    this.context.fillStyle = "#7ee7ff";
    this.context.beginPath();
    this.context.ellipse(2, 0, 10, 7, 0, 0, Math.PI * 2);
    this.context.fill();

    this.context.fillStyle = "#f7feff";
    this.context.beginPath();
    this.context.ellipse(5, -3, 3, 2, 0, 0, Math.PI * 2);
    this.context.fill();

    this.context.restore();
  }

  private drawJournalPenguinPictures(): void {
    for (const picture of this.journalPenguinPictures) {
      const context = picture.getContext("2d");

      if (!context) {
        continue;
      }

      this.drawJournalPenguinPicture(context, picture.dataset.journalPenguin ?? "basic", picture.width, picture.height);
    }
  }

  private drawJournalPenguinPicture(
    context: CanvasRenderingContext2D,
    kind: string,
    width: number,
    height: number,
  ): void {
    const scale = Math.min(width / 96, height / 116);
    const isMiner = kind === "miner";
    const isDiver = kind === "diver";
    const isLumberjack = kind === "lumberjack";

    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2 + 45 * scale);
    context.scale(scale, scale);

    context.fillStyle = "rgba(0, 0, 0, 0.18)";
    context.fillRect(-24, -1, 48, 8);

    context.fillStyle = "#ffb24a";
    context.fillRect(8, -4, 18, 6);
    context.fillRect(-13, -4, 18, 6);

    context.fillStyle = "#20242b";
    context.fillRect(-24, -48, 48, 48);

    if (isDiver) {
      context.fillStyle = "#2d3540";
      context.fillRect(-36, -39, 12, 24);
    }

    context.fillStyle = "#f7fbff";
    context.beginPath();
    context.ellipse(4, -27, 14, 17, 0, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#ff9f32";
    context.fillRect(16, -33, 10, 7);

    context.fillStyle = "#11151a";
    context.fillRect(7, -36, 5, 5);

    context.fillStyle = "#ffffff";
    context.fillRect(9, -35, 1, 1);

    if (isMiner) {
      context.fillStyle = "#f7c948";
      context.fillRect(-18, -53, 36, 8);
      context.fillRect(-11, -60, 22, 9);

      context.save();
      context.translate(-23, -16);
      context.rotate(0.08);
      context.strokeStyle = "#7a5621";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(26, 12);
      context.stroke();

      context.strokeStyle = "#dce8ee";
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(12, 8);
      context.lineTo(34, 15);
      context.stroke();
      context.restore();
    }

    if (isLumberjack) {
      context.save();
      context.translate(-23, -16);
      context.rotate(0.04);
      context.strokeStyle = "#7a5621";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(25, 12);
      context.stroke();

      context.fillStyle = "#dce8ee";
      context.beginPath();
      context.moveTo(23, 0);
      context.lineTo(37, 7);
      context.lineTo(33, 20);
      context.lineTo(20, 22);
      context.closePath();
      context.fill();
      context.restore();
    }

    context.restore();
  }

  private drawPenguin(penguin: Penguin): void {
    const centerX = penguin.x + penguin.width / 2;
    const footY = penguin.y + penguin.height;

    this.context.save();
    this.context.translate(centerX, footY);
    this.context.scale(penguin.direction, 1);
    this.context.scale(penguin.isBoss ? 0.98 : 0.78, penguin.isBoss ? 0.98 : 0.78);

    const bossShining = this.currentLevel === 5 && penguin.isBoss && this.bossDefeatSequenceTimer > this.bossDefeatPopupTimer;

    this.context.fillStyle = "rgba(0, 0, 0, 0.18)";
    this.context.fillRect(-24, -1, 48, 8);

    if (!bossShining && penguin.isBoss && penguin.charging === true) {
      this.context.fillStyle = "rgba(255, 244, 142, 0.72)";
      this.context.fillRect(-86, -42, 64, 7);
      this.context.fillRect(-98, -29, 76, 6);
      this.context.fillRect(-72, -14, 50, 5);
    }

    this.context.fillStyle = bossShining ? "#ffffff" : "#ffb24a";
    this.context.fillRect(8, -4, 18, 6);
    this.context.fillRect(-13, -4, 18, 6);

    this.context.fillStyle = bossShining ? "#ffffff" : "#20242b";
    this.context.fillRect(-24, -48, 48, 48);

    if (bossShining) {
      const pulse = 0.65 + Math.sin(this.bossDefeatSequenceTimer * 12) * 0.22;

      this.context.fillStyle = `rgba(255, 255, 255, ${0.28 + pulse * 0.22})`;
      this.context.beginPath();
      this.context.arc(0, -28, 50 + pulse * 10, 0, Math.PI * 2);
      this.context.fill();

      this.context.strokeStyle = `rgba(255, 255, 255, ${0.7 + pulse * 0.2})`;
      this.context.lineWidth = 5;
      for (let index = 0; index < 12; index += 1) {
        const angle = (Math.PI * 2 * index) / 12 + this.bossDefeatSequenceTimer * 0.45;
        const inner = 42 + pulse * 5;
        const outer = 96 + pulse * 22;

        this.context.beginPath();
        this.context.moveTo(Math.cos(angle) * inner, -28 + Math.sin(angle) * inner);
        this.context.lineTo(Math.cos(angle) * outer, -28 + Math.sin(angle) * outer);
        this.context.stroke();
      }

      this.context.fillStyle = `rgba(255, 255, 255, ${0.38 + pulse * 0.24})`;
      this.context.fillRect(-31, -57, 62, 62);
    }

    if (!bossShining && this.isDiverPenguin(penguin) && penguin.attacking === true && !this.isUnderwaterPenguin(penguin)) {
      this.context.fillStyle = "#2d3540";
      this.context.fillRect(-36, -39, 12, 24);
    }

    this.context.fillStyle = "#f7fbff";
    this.context.beginPath();
    this.context.ellipse(4, -27, 14, 17, 0, 0, Math.PI * 2);
    this.context.fill();

    this.context.fillStyle = bossShining ? "#ffffff" : "#ff9f32";
    this.context.fillRect(16, -33, 10, 7);

    this.context.fillStyle = bossShining ? "#ffffff" : "#11151a";
    this.context.fillRect(7, -36, 5, 5);

    if (!bossShining && penguin.alerted) {
      this.context.fillStyle = "#f04b3e";
      this.context.fillRect(7, -36, 5, 5);
    }

    this.context.fillStyle = "#ffffff";
    this.context.fillRect(9, -35, 1, 1);

    if (this.hasPickaxe(penguin)) {
      const swingProgress = clamp((penguin.pickaxeSwingTimer ?? 0) / 0.34, 0, 1);
      const swingAngle = -0.9 + Math.sin((1 - swingProgress) * Math.PI) * 1.45;

      this.context.fillStyle = "#f7c948";
      this.context.fillRect(-18, -53, 36, 8);
      this.context.fillRect(-11, -60, 22, 9);

      this.context.save();
      this.context.translate(-23, -16);
      this.context.rotate(swingAngle);
      this.context.strokeStyle = "#7a5621";
      this.context.lineWidth = 4;
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(26, 12);
      this.context.stroke();

      this.context.strokeStyle = "#dce8ee";
      this.context.lineWidth = 5;
      this.context.beginPath();
      this.context.moveTo(12, 8);
      this.context.lineTo(34, 15);
      this.context.stroke();
      this.context.restore();
    }

    if (!bossShining && this.isLumberjackPenguin(penguin)) {
      const swingProgress = clamp((penguin.pickaxeSwingTimer ?? 0) / 0.34, 0, 1);
      const swingAngle = -0.82 + Math.sin((1 - swingProgress) * Math.PI) * 1.35;

      this.context.save();
      this.context.translate(-23, -16);
      this.context.rotate(swingAngle);
      this.context.strokeStyle = "#7a5621";
      this.context.lineWidth = 4;
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(25, 12);
      this.context.stroke();

      this.context.fillStyle = "#dce8ee";
      this.context.beginPath();
      this.context.moveTo(23, 0);
      this.context.lineTo(37, 7);
      this.context.lineTo(33, 20);
      this.context.lineTo(20, 22);
      this.context.closePath();
      this.context.fill();
      this.context.restore();
    }

    this.context.restore();
  }

  private drawSplat(splat: SplatEffect): void {
    const progress = splat.age / splat.duration;
    const alpha = 1 - progress;

    this.context.save();
    this.context.globalAlpha = Math.max(0, alpha);
    this.context.translate(splat.x, splat.y);

    if (splat.kind === "fish") {
      this.context.fillStyle = "#ffbf4f";
      this.context.fillRect(-18, -5, 36, 7);

      this.context.fillStyle = "#fff07a";
      this.context.fillRect(-7, -9, 14, 5);
    } else if (splat.kind === "feather") {
      this.context.fillStyle = "#f7fbff";
      this.context.fillRect(-4, -16, 8, 26);

      this.context.fillStyle = "#9fc0cb";
      this.context.fillRect(-1, -14, 2, 28);
    } else if (splat.kind === "penguin-hit") {
      this.context.fillStyle = "#f7fbff";
      this.context.fillRect(-10, -5, 20, 6);

      this.context.fillStyle = "#ff9f32";
      this.context.fillRect(7, -8, 10, 4);
    } else if (splat.kind === "splash") {
      this.context.fillStyle = "#b9f7ff";
      this.context.fillRect(-28, -3, 56, 6);

      this.context.fillStyle = "#ffffff";
      this.context.fillRect(-16, -10, 8, 10);
      this.context.fillRect(4, -14, 7, 14);
      this.context.fillRect(18, -8, 6, 8);
    } else {
      this.context.fillStyle = "#20242b";
      this.context.fillRect(-22, -8, 44, 8);

      this.context.fillStyle = "#f7fbff";
      this.context.fillRect(-12, -11, 24, 5);

      this.context.fillStyle = "#ff9f32";
      this.context.fillRect(10, -12, 14, 5);
    }

    for (const particle of splat.particles) {
      this.context.fillStyle = getSplatParticleColor(splat.kind, particle.size);
      this.context.fillRect(particle.x, particle.y, particle.size, particle.size);
    }

    this.context.restore();
  }

  private drawExitHole(): void {
    if (this.isStageTwoForestLevel()) {
      return;
    }

    if (this.currentLevel !== 1) {
      return;
    }

    const locked = this.isBossAlive();
    const openProgress = locked ? 0 : this.exitOpeningTimer > 0 ? 1 - this.exitOpeningTimer / 0.85 : 1;

    if (this.currentLevel === 1) {
      if (locked) {
        this.drawClosedExit();
        return;
      }

      this.drawCrevasse(this.exitHole);

      if (openProgress < 1) {
        this.drawOpeningCover(openProgress);
      }

      this.context.fillStyle = "rgba(158, 232, 255, 0.28)";
      this.context.fillRect(this.exitHole.x + 12, this.level.groundY + 14, this.exitHole.width - 24, 5);
      return;
    }

    if (locked) {
      this.drawClosedExit();
      return;
    }

    const centerX = this.exitHole.x + this.exitHole.width / 2;
    const centerY = this.exitHole.y + this.exitHole.height / 2;
    const radiusX = Math.max(3, (this.exitHole.width / 2) * openProgress);
    const radiusY = Math.max(3, (this.exitHole.height / 2) * openProgress);

    this.context.save();

    this.context.fillStyle = "rgba(8, 18, 24, 0.28)";
    this.context.beginPath();
    this.context.ellipse(centerX, centerY + 8, radiusX + 16, radiusY + 8, 0, 0, Math.PI * 2);
    this.context.fill();

    this.context.strokeStyle = this.currentLevel === 2 ? "#263b43" : "#bde5ee";
    this.context.lineWidth = 8;
    this.context.beginPath();
    this.context.ellipse(centerX, centerY, radiusX + 4, radiusY + 3, 0, 0, Math.PI * 2);
    this.context.stroke();

    this.context.beginPath();
    this.context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    this.context.clip();

    const tunnel = this.context.createLinearGradient(0, this.exitHole.y, 0, this.exitHole.y + this.exitHole.height);
    tunnel.addColorStop(0, "#17303b");
    tunnel.addColorStop(0.34, "#071219");
    tunnel.addColorStop(1, "#020608");

    this.context.fillStyle = tunnel;
    this.context.fillRect(centerX - radiusX, centerY - radiusY, radiusX * 2, radiusY * 2);

    this.context.fillStyle = "rgba(127, 219, 234, 0.18)";
    this.context.fillRect(centerX - radiusX + 12, centerY - radiusY + 8, Math.max(0, radiusX * 2 - 24), 4);
    this.context.restore();
  }

  private drawClosedExit(): void {
    if (this.currentLevel !== 1) {
      return;
    }

    this.context.fillStyle = "#234250";
    this.context.fillRect(this.exitHole.x - 12, this.exitHole.y - 8, this.exitHole.width + 24, this.exitHole.height + 16);

    this.context.fillStyle = "#d8f3f7";
    this.context.fillRect(this.exitHole.x - 10, this.exitHole.y - 8, this.exitHole.width + 20, 8);
    this.context.fillRect(this.exitHole.x - 10, this.exitHole.y + this.exitHole.height, this.exitHole.width + 20, 8);
  }

  private drawOpeningCover(openProgress: number): void {
    const coverScale = 1 - openProgress;
    const coverWidth = (this.exitHole.width + 24) * coverScale;
    const coverHeight = (this.exitHole.height + 16) * coverScale;

    this.context.fillStyle = this.currentLevel === 2 ? "#10171b" : "#234250";
    this.context.fillRect(
      this.exitHole.x + (this.exitHole.width - coverWidth) / 2,
      this.exitHole.y + (this.exitHole.height - coverHeight) / 2,
      coverWidth,
      coverHeight,
    );
  }

  private drawPuffin(): void {
    const centerX = this.puffin.x + this.puffin.width / 2;
    const footY = this.puffin.y + this.puffin.height - 5;
    const peckReach = this.peckTimer > 0 ? 14 : 0;
    const ducking = this.puffin.height < PUFFIN.height;
    const isDamageFlash =
      this.damageInvulnerability > 0 && Math.floor(this.damageInvulnerability * 14) % 2 === 0;

    this.context.save();
    this.context.globalAlpha = isDamageFlash ? 0.48 : 1;
    this.context.translate(centerX, footY);
    this.context.scale(this.facing, 1);
    this.context.scale(0.68, ducking ? 0.52 : 0.68);

    this.context.fillStyle = "rgba(0, 0, 0, 0.18)";
    this.context.fillRect(-25, 0, 58, 8);

    this.context.fillStyle = "#ffb24a";
    this.context.fillRect(18, -4, 19, 7);
    this.context.fillRect(-8, -4, 19, 7);

    this.context.fillStyle = "#15191f";
    this.context.fillRect(-28, -56, 56, 56);

    if (!this.grounded) {
      this.context.fillStyle = this.flying ? "#2d3540" : "#20262f";
      this.context.fillRect(-42, -43, 14, 25);
    }

    this.context.fillStyle = "#f7fbff";
    this.context.beginPath();
    this.context.arc(4, -32, 18, 0, Math.PI * 2);
    this.context.fill();

    const beakWidth = 18 + peckReach;
    const beakX = 21;
    const beakY = -31;
    const beakHeight = 10;

    this.context.fillStyle = "#f08f3c";
    this.context.beginPath();
    this.context.moveTo(beakX, beakY - beakHeight);
    this.context.ellipse(beakX, beakY, beakWidth, beakHeight, 0, -Math.PI / 2, Math.PI / 2);
    this.context.closePath();
    this.context.fill();

    this.context.save();
    this.context.beginPath();
    this.context.moveTo(beakX, beakY - beakHeight);
    this.context.ellipse(beakX, beakY, beakWidth, beakHeight, 0, -Math.PI / 2, Math.PI / 2);
    this.context.closePath();
    this.context.clip();

    this.context.fillStyle = "#f3d74f";
    this.context.fillRect(beakX + 6, beakY - 3, beakWidth, 4);

    this.context.fillStyle = "#d83a2e";
    this.context.fillRect(beakX, beakY + 2, beakWidth + 2, 8);
    this.context.restore();

    this.context.fillStyle = "#101217";
    this.context.fillRect(10, -42, 5, 5);

    this.context.fillStyle = "#ffffff";
    this.context.fillRect(12, -41, 1, 1);

    if (isDamageFlash) {
      this.context.fillStyle = "rgba(255, 120, 108, 0.48)";
      this.context.fillRect(-30, -58, 62, 62);
    }

    this.context.restore();
  }

  private drawCloud(x: number, y: number, scale: number): void {
    this.context.save();
    this.context.translate(x, y);
    this.context.scale(scale, scale);
    this.context.beginPath();
    this.context.arc(0, 10, 24, 0, Math.PI * 2);
    this.context.arc(28, 2, 30, 0, Math.PI * 2);
    this.context.arc(62, 12, 24, 0, Math.PI * 2);
    this.context.fillRect(-2, 12, 82, 24);
    this.context.fill();
    this.context.restore();
  }

  private drawHud(): void {
    this.drawBossHealthBar();

    if (this.win && !this.stageComplete) {
      this.context.fillStyle = "rgba(247, 251, 255, 0.94)";
      this.context.fillRect(302, 196, 356, 104);

      this.context.fillStyle = "#12303d";
      this.context.font = "800 28px system-ui, sans-serif";
      this.context.fillText("Tunnel cleared!", 384, 246);
    }
  }

  private drawBossHealthBar(): void {
    if (this.currentLevel !== 5 || this.menuOpen || this.stageComplete) {
      return;
    }

    const boss = this.getLivingBoss();

    if (!boss || !this.levelFiveArenaClosed) {
      return;
    }

    const barWidth = 420;
    const barHeight = 18;
    const x = VIEW.width / 2 - barWidth / 2;
    const y = 22;
    const healthPercent = clamp(boss.health / LEVEL_FIVE_BOSS_HEALTH, 0, 1);

    this.context.fillStyle = "rgba(8, 24, 32, 0.86)";
    this.context.fillRect(x - 12, y - 18, barWidth + 24, 48);

    this.context.fillStyle = "#f7fbff";
    this.context.font = "900 14px system-ui, sans-serif";
    this.context.textAlign = "center";
    this.context.fillText("Stage boss", VIEW.width / 2, y - 4);

    this.context.fillStyle = "rgba(255, 255, 255, 0.22)";
    this.context.fillRect(x, y, barWidth, barHeight);

    this.context.fillStyle = healthPercent > 0.45 ? "#ffbf4f" : "#ff6b5f";
    this.context.fillRect(x, y, barWidth * healthPercent, barHeight);

    this.context.strokeStyle = "rgba(255, 255, 255, 0.82)";
    this.context.lineWidth = 2;
    this.context.strokeRect(x, y, barWidth, barHeight);

    this.context.textAlign = "start";
  }

  private updateExternalHud(): void {
    const showingOnlyFeathers = this.menuOpen || this.gameOver;
    const showingPauseButton = !this.menuOpen && !this.gameOver && !this.stageComplete && !this.paused;

    if (this.hudMeters) {
      this.hudMeters.hidden = showingOnlyFeathers;
    }

    if (this.pauseButton) {
      this.pauseButton.hidden = !showingPauseButton;
    }

    if (this.hudControls) {
      this.hudControls.hidden = showingOnlyFeathers;
    }

    this.hudInfo?.classList.toggle("feather-only", showingOnlyFeathers);

    if (this.hudStats) {
      this.hudStats.textContent = showingOnlyFeathers
        ? `Feathers ${this.puffinFeathers}`
        : this.endlessMode
          ? `Endless zone · Penguins ${this.penguinsDefeated} · Feathers ${this.puffinFeathers}`
          : `Stage ${this.currentStage} Level ${this.currentLevel} · Fish ${this.score}/${this.fish.length} · Penguins ${this.penguinsDefeated}/${this.penguins.length} · Feathers ${this.puffinFeathers}`;
    }

    if (showingOnlyFeathers) {
      return;
    }

    if (this.hudFlightFill) {
      const flightPercent = clamp(this.flight / this.maxFlight, 0, 1) * 100;
      this.hudFlightFill.style.width = `${flightPercent}%`;
      this.hudFlightFill.classList.toggle("low", this.flight <= 0.35);
    }

    if (this.hudOxygen && this.hudOxygenFill) {
      this.hudOxygen.hidden = !this.hasWaterSection();
      const oxygenPercent = clamp(this.oxygen / this.maxOxygen, 0, 1) * 100;
      this.hudOxygenFill.style.width = `${oxygenPercent}%`;
      this.hudOxygenFill.classList.toggle("low", this.oxygen <= 25);

      if (this.hudOxygenValue) {
        this.hudOxygenValue.textContent = `${Math.ceil(this.oxygen)}/${this.maxOxygen}`;
        this.hudOxygenValue.classList.toggle("low", this.oxygen <= 25);
      }
    }

    if (this.hudHealth) {
      this.hudHealth.replaceChildren();

      for (let index = 0; index < this.maxHealth; index += 1) {
        const square = document.createElement("span");
        square.className = "health-square";
        square.style.background =
          index < this.health ? getHealthSquareColor(this.health, this.maxHealth) : "rgba(255, 255, 255, 0.22)";
        this.hudHealth.append(square);
      }
    }
  }

  private drawLevelTitleCard(): void {
    if (this.levelTitleTimer <= 0 || this.menuOpen) {
      return;
    }

    const alpha = clamp(this.levelTitleTimer / 0.35, 0, 1);
    const width = VIEW.width * 0.78;
    const height = VIEW.height * 0.58;
    const x = VIEW.width / 2 - width / 2;
    const y = VIEW.height / 2 - height / 2;

    this.context.save();
    this.context.globalAlpha = alpha;
    this.context.fillStyle = "rgba(9, 24, 31, 0.84)";
    this.context.fillRect(x - 8, y - 8, width + 16, height + 16);

    this.context.fillStyle = "#f7fbff";
    this.context.fillRect(x, y, width, height);

    this.context.strokeStyle = "#12303d";
    this.context.lineWidth = 5;
    this.context.strokeRect(x + 3, y + 3, width - 6, height - 6);

    this.context.fillStyle = "#12303d";
    this.context.font = "900 58px system-ui, sans-serif";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      this.endlessMode ? "Endless zone" : `Stage ${this.currentStage} Level ${this.currentLevel}`,
      VIEW.width / 2,
      y + height / 2,
    );
    this.context.restore();
  }

  private drawDamageEdges(): void {
    if (this.damageInvulnerability <= 0 || this.menuOpen) {
      return;
    }

    const edgeSize = 78;
    const alpha = 0.62 * clamp(this.damageInvulnerability / PUFFIN.damageInvulnerability, 0, 1);

    this.context.save();
    this.context.globalAlpha = alpha;

    const top = this.context.createLinearGradient(0, 0, 0, edgeSize);
    top.addColorStop(0, "#ff3b30");
    top.addColorStop(1, "rgba(255, 59, 48, 0)");
    this.context.fillStyle = top;
    this.context.fillRect(0, 0, VIEW.width, edgeSize);

    const bottom = this.context.createLinearGradient(0, VIEW.height, 0, VIEW.height - edgeSize);
    bottom.addColorStop(0, "#ff3b30");
    bottom.addColorStop(1, "rgba(255, 59, 48, 0)");
    this.context.fillStyle = bottom;
    this.context.fillRect(0, VIEW.height - edgeSize, VIEW.width, edgeSize);

    const left = this.context.createLinearGradient(0, 0, edgeSize, 0);
    left.addColorStop(0, "#ff3b30");
    left.addColorStop(1, "rgba(255, 59, 48, 0)");
    this.context.fillStyle = left;
    this.context.fillRect(0, 0, edgeSize, VIEW.height);

    const right = this.context.createLinearGradient(VIEW.width, 0, VIEW.width - edgeSize, 0);
    right.addColorStop(0, "#ff3b30");
    right.addColorStop(1, "rgba(255, 59, 48, 0)");
    this.context.fillStyle = right;
    this.context.fillRect(VIEW.width - edgeSize, 0, edgeSize, VIEW.height);

    this.context.restore();
  }

  private resize = (): void => {
    const scale = window.devicePixelRatio || 1;
    this.canvas.width = VIEW.width * scale;
    this.canvas.height = VIEW.height * scale;
    this.canvas.style.aspectRatio = `${VIEW.width} / ${VIEW.height}`;
    this.context.setTransform(scale, 0, 0, scale, 0, 0);
    this.render();
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (isGameKey(event.key)) {
      event.preventDefault();
    }

    this.setKey(event.key, true);
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    this.setKey(event.key, false);
  };

  private handleTryAgain = (): void => {
    this.restartCurrentLevel();
  };

  private handlePlay = (): void => {
    this.showLevels();
  };

  private handleEndlessZone = (): void => {
    this.startEndlessZone();
  };

  private handleLevelsBack = (): void => {
    this.showMainMenu();
  };

  private handleLevelSelect = (event: MouseEvent): void => {
    const button = event.currentTarget;

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    this.startSelectedLevel(Number(button.dataset.level));
  };

  private handleShop = (): void => {
    this.showShop();
  };

  private handleShopBack = (): void => {
    this.showMainMenu();
  };

  private handleJournal = (): void => {
    this.showJournal();
  };

  private handleJournalBack = (): void => {
    this.showMainMenu();
  };

  private handleJournalDetailBack = (): void => {
    this.showJournalGrid();
    this.journalCards[0]?.focus();
  };

  private handleJournalCard = (event: MouseEvent): void => {
    const button = event.currentTarget;

    if (!(button instanceof HTMLButtonElement) || !button.dataset.penguin) {
      return;
    }

    this.showJournalDetail(button.dataset.penguin);
  };

  private handleHealthUpgrade = (): void => {
    this.buyHealthUpgrade();
  };

  private handleFlightUpgrade = (): void => {
    this.buyFlightUpgrade();
  };

  private handleSpeedUpgrade = (): void => {
    this.buySpeedUpgrade();
  };

  private handleOxygenUpgrade = (): void => {
    this.buyOxygenUpgrade();
  };

  private handleStagePrevious = (): void => {
    this.currentStage = clamp(this.currentStage - 1, 1, STAGE_COUNT);
    this.updateLevelsDisplay();
  };

  private handleStageNext = (): void => {
    this.currentStage = clamp(this.currentStage + 1, 1, STAGE_COUNT);
    this.updateLevelsDisplay();
  };

  private handleMainMenu = (): void => {
    this.showMainMenu();
  };

  private handlePause = (): void => {
    this.pauseGame();
  };

  private handleResume = (): void => {
    this.resumeGame();
  };

  private setKey(key: string, pressed: boolean): void {
    const normalizedKey = key.toLowerCase();

    if (this.paused && normalizedKey !== "p" && normalizedKey !== "escape") {
      return;
    }

    switch (normalizedKey) {
      case "arrowleft":
      case "a":
        this.keys.left = pressed;
        break;
      case "arrowright":
      case "d":
        this.keys.right = pressed;
        break;
      case "arrowdown":
      case "s":
        this.keys.duck = pressed;
        break;
      case "arrowup":
      case "w":
        this.keys.jump = pressed;

        if (pressed) {
          this.jumpQueued = true;
        }

        break;
      case " ":
        if (pressed) {
          this.startPeck();
        }

        break;
      case "r":
        if (pressed && !this.menuOpen && !this.paused) {
          this.restartCurrentLevel();
        }

        break;
      case "p":
      case "escape":
        if (pressed) {
          if (this.paused) {
            this.resumeGame();
          } else {
            this.pauseGame();
          }
        }

        break;
      case "e":
        if (pressed) {
          this.icebergHopQueued = true;
        }

        break;
      default:
        return;
    }
  }

  private startPeck(): void {
    if (this.peckCooldown > 0 || this.peckTimer > 0) {
      return;
    }

    this.peckCooldown = PUFFIN.peckCooldown;
    this.peckTimer = PUFFIN.peckDuration;
    this.peckHasHit = false;
  }
}

function rectanglesOverlap(first: Rect, second: Rect): boolean {
  return (
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y
  );
}

function getPlatformTopY(platform: Platform, x: number): number | null {
  if (x < platform.x || x > platform.x + platform.width) {
    return null;
  }

  if (!platform.slope) {
    return platform.y;
  }

  const progress = (x - platform.x) / platform.width;
  return platform.slope.startY + (platform.slope.endY - platform.slope.startY) * progress;
}

function getBestPlatformTopY(platform: Platform, actor: Rect): number | null {
  const sampleXs = [actor.x + 8, actor.x + actor.width / 2, actor.x + actor.width - 8];
  const tops = sampleXs
    .map((x) => getPlatformTopY(platform, x))
    .filter((top): top is number => top !== null);

  if (tops.length === 0) {
    return null;
  }

  return Math.min(...tops);
}

function getPenguinPlatformTopY(platform: Platform, penguin: Penguin): number | null {
  if (!platform.slope) {
    return getBestPlatformTopY(platform, penguin);
  }

  const centerX = penguin.x + penguin.width / 2;
  const climbingUphill =
    (platform.slope.endY < platform.slope.startY && penguin.direction > 0) ||
    (platform.slope.startY < platform.slope.endY && penguin.direction < 0);
  const footX = climbingUphill
    ? penguin.x + penguin.width * (penguin.direction > 0 ? 0.76 : 0.24)
    : centerX;

  return getPlatformTopY(platform, footX);
}

function createPenguinsOnSurfaces(sourcePenguins: Penguin[], levelPlatforms: Platform[], level: LevelBounds): Penguin[] {
  return sourcePenguins.map((sourcePenguin) => {
    const penguin = { ...sourcePenguin };
    const surfaceY = getPenguinSurfaceY(penguin, levelPlatforms, level);

    penguin.y = surfaceY - penguin.height;
    penguin.velocityY = 0;
    penguin.grounded = true;

    return penguin;
  });
}

function createLevelThreePenguins(): Penguin[] {
  return createPenguinsOnSurfaces(levelThreePenguins, levelThreePlatforms, LEVEL_THREE).map((penguin) => {
    if (penguin.isBoss) {
      return penguin;
    }

    return {
      ...penguin,
      y: -180,
      velocityY: 0,
      grounded: false,
      hasDived: false,
      waitingToDive: true,
      diveTimer: getPenguinDiveDelay(),
    };
  });
}

function createLevelFivePenguins(): Penguin[] {
  return createPenguinsOnSurfaces(levelFivePenguins, levelFivePlatforms, LEVEL_FIVE).map((penguin) => {
    if (penguin.isDiver !== true) {
      return penguin;
    }

    return {
      ...penguin,
      y: LEVEL_FIVE_WATER_SURFACE_Y - 210,
      velocityY: 0,
      grounded: false,
      hasDived: false,
      waitingToDive: true,
      diveTimer: getPenguinDiveDelay(),
    };
  });
}

function createFish(sourceFish: Fish[], swimming: boolean): Fish[] {
  return sourceFish.map((fish, index) => ({
    ...fish,
    homeX: fish.x,
    homeY: fish.y,
    swimPhase: swimming ? index * 1.7 + fish.x * 0.01 : 0,
    swimRange: swimming ? 18 + (index % 3) * 8 : 0,
    swimSpeed: swimming ? 0.9 + (index % 4) * 0.18 : 0,
  }));
}

function createForestTrees(sourceTrees: ForestTree[]): ForestTree[] {
  return sourceTrees.map((tree) => ({ ...tree }));
}

function createLevelFiveFish(): Fish[] {
  return levelFiveFish.map((fish, index) => {
    const swimming = fish.x < LEVEL_FIVE_WATER_END_X;

    return {
      ...fish,
      homeX: fish.x,
      homeY: fish.y,
      swimPhase: swimming ? index * 1.7 + fish.x * 0.01 : 0,
      swimRange: swimming ? 18 + (index % 3) * 8 : 0,
      swimSpeed: swimming ? 0.9 + (index % 4) * 0.18 : 0,
    };
  });
}

function getPenguinSurfaceY(penguin: Rect, levelPlatforms: Platform[], level: LevelBounds): number {
  const platformTops = levelPlatforms
    .filter((platform) => !platform.ceiling && !platform.fluidBarrier)
    .map((platform) => getBestPlatformTopY(platform, penguin))
    .filter((top): top is number => top !== null);

  if (platformTops.length === 0) {
    return level.groundY;
  }

  return Math.min(...platformTops);
}

function getAltitudeProgress(actor: Rect, level: LevelBounds): number {
  const flyableHeight = level.groundY - level.ceilingY - actor.height;
  const distanceFromGround = level.groundY - actor.height - actor.y;

  if (flyableHeight <= 0) {
    return 1;
  }

  return clamp(distanceFromGround / flyableHeight, 0, 1);
}

function getSplatParticleColor(kind: SplatEffect["kind"], size: number): string {
  if (kind === "fish") {
    return size > 6 ? "#ffbf4f" : "#fff07a";
  }

  if (kind === "feather") {
    return size > 5 ? "#f7fbff" : "#9fc0cb";
  }

  if (kind === "penguin-hit") {
    return size > 4 ? "#f7fbff" : "#ff9f32";
  }

  if (kind === "splash") {
    return size > 5 ? "#b9f7ff" : "#ffffff";
  }

  return size > 7 ? "#20242b" : "#f7fbff";
}

function getHealthSquareColor(health: number, maxHealth: number): string {
  if (maxHealth === 3) {
    if (health <= 1) {
      return "#ff4f45";
    }

    if (health === 2) {
      return "#ffbf4f";
    }

    return "#7ee081";
  }

  const healthPercent = health / maxHealth;

  if (healthPercent <= 0.25) {
    return "#ff4f45";
  }

  if (healthPercent <= 0.5) {
    return "#ffbf4f";
  }

  return "#7ee081";
}

function getPenguinJournalName(kind: string): string {
  switch (kind) {
    case "miner":
      return "Miner penguin";
    case "diver":
      return "Diver penguin";
    case "lumberjack":
      return "Lumberjack penguin";
    default:
      return "Basic penguin";
  }
}

function getPenguinDiveDelay(): number {
  return 1.2 + Math.random() * 1.8;
}

function getFeatherDropAmount(): number {
  const roll = Math.random();

  if (roll < 0.2) {
    return 1;
  }

  if (roll < 0.8) {
    return 2;
  }

  return 3;
}

function getUpgradeCost(upgradeCount: number): number {
  return UPGRADE_FIRST_COST + upgradeCount * UPGRADE_COST_INCREASE;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isGameKey(key: string): boolean {
  return ["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "s", "w", " ", "r", "e", "p", "escape"].includes(
    key.toLowerCase(),
  );
}
