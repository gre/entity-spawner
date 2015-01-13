var seedrandom = require("seedrandom");

var DOUBLE_PI = 2*Math.PI;

function lazySeedrandom (seed) {
  var rng;
  return function () {
    if (!rng) rng = seedrandom(seed);
    return rng();
  };
}

/**
 * A Spawner is a 2D entity emitter which calls a `spawn` function recurrently based on various parameters.
 *
 * Usage:
 * var spawner = new Spawner(...)
 * spawner.init(startTime) // optional call
 * function gameLoop (time) {
 *   ...
 *   spawner.update(time); // Call that ASAP to have a better spawning refresh rate (and avoid occasional lags)
 * }
 */
function Spawner (parameters) {
  for (var k in parameters)
    this[k] = parameters[k];

  if (this.speed <= 0) throw new Error("speed must be non null positive.");
  if (typeof this.spawn !== "function") throw new Error("spawn must be a function.");

  this.lastti = null;
}

Spawner.prototype = {

  //// DEFAULTS parameters of Spawner ////

  /**
   * a function which creates a PIXI object to use for the spawing object.
   * params is an object with: {
   *   position: [x, y],
   *   velocity: [vx, vy],
   *   angle: radian,
   *   direction: [dx, dy], // The vector of length 1 oriented through angle
   *   random: aDeterministRandomFunction,
   *   timeIndex: Int,
   *   countIndex: Int
   * }
   * It is your responsability to create, update, destroy the entity depending on your needs.
   */
  spawn: function (params) { console.log("NOT IMPLEMENTED: Spawner#spawn", params); },

  // The duration interval in ms between each entity tick
  speed: 1000,

  // How much entities should be spawned per entity tick
  count: 1,
  
  // angle in radians the spawner will rotate for each entity tick
  rot: 0,

  // Spawner position = Particle initial position
  pos: [0,0],

  // Spawner initial angle at initial time
  ang: 0,

  // Spawner entity velocity
  vel: 0,

  // front pixel distance
  front: 0,

  /**
   * an optional array to describe a pattern to loop on when spawing.
   * e.g: [ 2, -1, 3, -2 ] // 2 bullets followed by 1 hole, followed by 3 bullets, followed by 2 holes
   */
  pattern: null,
  patternMask: null, // Alternatively you can use a mask: an array of 1 (bullet) and 0 (hole)

  // The initial absolute time on which the spawner determinism is based on.
  initialTime: 0,

  // Determinist Randomness
  randPos: 0,
  randAng: 0,
  randVel: 0,
  seed: "",

  // The maximum number of entities to catchup after a lag (typically the app running in background in another tab)
  maxCatchup: 1000,
  // The maxium number of entities to trigger in an update loop: N.B. an update loop usually run at max 60fps, so be sure this value is enough high to not limit the spawner's speed, but enough low to not increase a lag (typically when catching up).
  maxPerLoop: 100
};

Object.defineProperty(Spawner.prototype, "pattern", {
  set: function (pattern) {
    this._pattern = pattern;
    if (pattern) {
      var seqlength = pattern.reduce(function (acc, n) { return acc + Math.abs(n); }, 0);
      var patternMask = new Uint8Array(seqlength);
      var p = 0;
      for (var i=0; i<pattern.length; ++i) {
        var v = pattern[i];
        var maskValue = v > 0 ? 1 : 0;
        var abs = Math.abs(v);
        for (var j=0; j<abs; ++j)
          patternMask[p++] = maskValue;
      }
      this.patternMask = patternMask;
    }
  },
  get: function () {
    return this._pattern;
  }
});

/**
 * init the spawner from a given time
 * it can be used to trigger a lot of bullets from the past.
 * Example:
 * spawner.init(Date.now() - 5000); // Catchup for past 5 seconds
 */
Spawner.prototype.init = function (currentTime) {
  var ti = Math.floor(((currentTime - this.initialTime) / this.speed));
  
  if (this.patternMask) {
    var ipattern = (ti * this.count) % this.patternMask.length;
    this._ip = ipattern;
  }

  this.lastti = ti;
};

// Compute the current rotation position of "heads" useful for drawing rotating weapons.
Spawner.prototype.getHeads = function (currentTime) {
  var ti = (currentTime - this.initialTime) / this.speed;
  var tifrom = Math.floor(ti);
  var p = ti - tifrom;

  var heads;
  if (this._cacheHeads && this._cacheHeads.tifrom === tifrom) {
    heads = this._cacheHeads;
  }
  else {
    this._cacheHeads = heads = [];
  }

  for (var j=0; j<this.count; ++j) {
    var obj = heads[j];
    if (!obj) {
      var fromIndex = this.count * tifrom + j;
      var toIndex = fromIndex + this.count;
      var trigger =
        !this.patternMask ||
        this.patternMask[fromIndex % this.patternMask.length] !== 0;
      var angleFrom = (this.rot * fromIndex + this.ang + DOUBLE_PI) % DOUBLE_PI;
      var angleTo = (this.rot * toIndex + this.ang + DOUBLE_PI) % DOUBLE_PI;
      if (angleFrom > angleTo + Math.PI) angleFrom -= DOUBLE_PI;
      if (angleTo > angleFrom + Math.PI) angleTo -= DOUBLE_PI;
      obj = {
        trigger: trigger,
        angleFrom: angleFrom,
        angleTo: angleTo,
        tifrom: tifrom,
        p: p
      };
    }
    obj.angle = obj.angleFrom * (1 - p) + obj.angleTo * p;
    heads[j] = obj;
  }
  

  return heads;
};

Spawner.prototype.update = function (currentTime) {
  // In case the spawner was not initialized, we use currentTime (means no catchup)
  if (this.lastti === null) this.init(currentTime);

  var currentti = Math.floor(((currentTime - this.initialTime) / this.speed));
  var deltai = currentti - this.lastti;

  if (deltai > this.maxCatchup) { // Avoid overflow of entities
    console.log("Spawner: "+deltai+" entities to catchup. maximized to "+this.maxCatchup+" and lost some.");
    this.lastti = currentti -  this.maxCatchup;
  }

  // Trigger all missing entities from last tick (if any)
  for (var i=0; this.lastti < currentti && i < this.maxPerLoop; ++i) {
    var ti = ++this.lastti;

    var delta = currentTime - ti * this.speed;
    var random = lazySeedrandom(this.seed + "@" + ti); // A lazy version is used to not seedrandom() if there is no need for random() at all (because seedrandom might be a bottleneck when using a lot of entities)

    for (var j=0; j<this.count; ++j) {
      if (this.patternMask) {
        var shouldSkip = this.patternMask[this._ip] === 0;
        this._ip = this._ip >= this.patternMask.length - 1 ? 0 : this._ip + 1;
        if (shouldSkip) continue;
      }
      var angle = this.ang + this.randAng * (random() - 0.5) + (this.rot * (this.count * ti + j)) % (2*Math.PI);
      var direction = [ Math.cos(angle), Math.sin(angle) ];
      var vel = this.vel + this.randVel * (random() - 0.5);
      var velocity = [ vel * direction[0], vel * direction[1] ];
      var position = [
        this.pos[0] + this.randPos * (random() - 0.5) + velocity[0] * delta + this.front * direction[0],
        this.pos[1] + this.randPos * (random() - 0.5) + velocity[1] * delta + this.front * direction[1]
      ];

      this.spawn({
        random: random,
        timeIndex: ti,
        countIndex: j,
        angle: angle,
        position: position,
        velocity: velocity,
        direction: direction
      });
    }
  }

};

module.exports = Spawner;

