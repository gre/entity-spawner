var PIXI = require("pixi.js");
var requestAnimFrame = require("raf");
var Spawner = require("../../");

var viewport = { x:0, y:0, width:800, height:600 };

function collideRectangle (r1, r2) {
  return !(r2.x > (r1.x + r1.width) ||
      (r2.x + r2.width) < r1.x ||
      r2.y > (r1.y + r1.height) ||
      (r2.y + r2.height) < r1.y);
}

function Particle (draw, random) {
  PIXI.DisplayObjectContainer.call(this);
  draw.call(this, random);
  this.velocity = new PIXI.Point();
}
Particle.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Particle.prototype.constructor = Particle;
Particle.prototype.update = function (t, dt) {
  this.x += this.velocity.x * dt;
  this.y += this.velocity.y * dt;
  if (!collideRectangle(this, viewport)) {
    this.parent.removeChild(this);
  }
};

var particles = new PIXI.DisplayObjectContainer();

function spawnGen (draw) {
  return function (o) {
    var particle = new Particle(draw, o.random);
    particle.position.set.apply(particle.position, o.position);
    particle.velocity.set.apply(particle.velocity, o.velocity);
    particle.rotation = o.angle;
    particle.blendMode = PIXI.blendModes.MULTIPLY;
    particles.addChild(particle);
  };
}

var spawnCircle = spawnGen(function (random) {
  var clr = ~~((0.2 * random()) * 0xFF) << 16 | ~~(random() * 0xFF) << 8 | ~~(0.3*random() * 0xFF);
  var radius = ~~(2 + random() * 2);
  var g = new PIXI.Graphics();
  g.beginFill(clr);
  g.drawCircle(0, 0, radius);
  g.endFill();
  this.addChild(g);
});
var spawnSquare = spawnGen(function (random) {
  var clr = ~~((0.5+0.5*random()) * 0xFF) << 16 | ~~(0.8*random() * 0xFF) << 8 | ~~(0.8*random() * 0xFF);
  var g = new PIXI.Graphics();
  g.beginFill(clr);
  g.drawRect(0, 0, 20, 20);
  g.endFill();
  this.addChild(g);
});

var bunnyTexture = PIXI.Texture.fromImage("./bunny.png");
var spawnBunny = spawnGen(function (random) {
  var bunny = new PIXI.Sprite(bunnyTexture);
  if (random()<0.1) {
    bunny.tint = ~~(random() * 0xFF) << 16 | ~~(random() * 0xFF) << 8 | ~~(random() * 0xFF);
  }
  this.addChild(bunny);
});

var PARAMS = [
  { seed: "a", spawn: spawnBunny, pos: [50, 50], vel: 0.1, speed: 500, pattern: [ 5, -1, 3, -4 ] },
  { seed: "b", spawn: spawnCircle, pos: [150, 300], rot: 3, vel: 0.05, speed: 10, pattern: [20, -80, 50, -100, 50, -150, 100, -200, 200, -200] },
  { seed: "c", spawn: spawnSquare, pos: [650, 400], rot: Math.PI/8, count: 16, vel: 0.08, speed: 1000, front: 40 },
  { seed: "d", spawn: spawnBunny, pos: [50, 500], vel: 0.2, speed: 100, randPos: 50, randAng: 0.1, randVel: 0.2 }
];

var spawners = PARAMS.map(function (spawnerParams) {
  var spawner = new Spawner(spawnerParams);
  spawner.init(Date.now()-5000);
  return spawner;
});

var spawnernames = new PIXI.DisplayObjectContainer();
PARAMS.forEach(function (spawnerParams) {
  var name = new PIXI.Text(spawnerParams.seed, { fill: "#000", font: "normal 20px monospace" });
  name.position.set.apply(name.position, spawnerParams.pos);
  spawnernames.addChild(name);
});

var renderer = PIXI.autoDetectRenderer(viewport.width, viewport.height);

var stage = new PIXI.Stage(0xFFFFFF);
stage.addChild(particles);
stage.addChild(spawnernames);

var lastT;
function loop () {
  requestAnimFrame(loop);

  var t = Date.now();
  if (!lastT) lastT = t;
  var dt = t - lastT;
  lastT = t;

  var i;
  // Update spawners
  for (i=0; i<spawners.length; ++i) {
    spawners[i].update(t, dt);
  }
  // Update particles
  for (i=0; i<particles.children.length; ++i) {
    particles.children[i].update(t, dt);
  }

  renderer.render(stage);
}

requestAnimFrame(loop);


var title = document.createElement("div");
title.style.font = "normal 20px sans-serif";
title.style.color = "#444";
title.innerHTML = '<h1>PIXI.js example of <a href="http://github.com/gre/particle-spawner">particle-spawner</a>.</h1>The spawned particles are determinist for the current time: it means you can open 2 window of this page and you will see exactly the same result. This occurs even if you open the windows at different instants: the particle system is able to catchup past-events (in this example, we will catchup particles created at most 5 seconds ago). For multiplayer purpose, you just have to synchronize the time! <a href="https://github.com/calvinfo/socket-ntp">socket-ntp</a> is a simple way to get that done with socket.io. There is even randomness in the spawner! the determinism is guaranteed by the use of <a href="https://github.com/davidbau/seedrandom">seedrandom</a>.';

var footer = document.createElement("div");
footer.style.font = "normal 10px monospace";
var descHTML = '<h2>Example Parameters:</h2><ul>';
PARAMS.forEach(function (spawnerParams) {
  descHTML += '<li><pre>'+spawnerParams.seed+': '+JSON.stringify(spawnerParams)+'</pre></li>';
});
descHTML += "</ul>";
footer.innerHTML = descHTML;

document.body.appendChild(title);
document.body.appendChild(renderer.view);
document.body.appendChild(footer);
