var Spawner = require("../");
var assert = require("assert");
var dataset = require("./dataset.js");

function iterateTimeByStep (from, to, step) {
  if (!step) throw new Error("need a step!");
  return function (spawner) {
    spawner.init(from);
    for (var t=from; t<=to; t += step) {
      spawner.update(t);
    }
  };
}
function iterateTimeJump (initTime, endTime) {
  return function (spawner) {
    spawner.init(initTime);
    spawner.update(endTime);
  };
}

function testSpawner (desc, params, expectedSpawns, spawnerTimeIterator) {
  console.log("TEST: "+desc);
  var particles = [];
  params.spawn = function (o) {
    var particle = {};
    for (var k in o) {
      if (k !== "random")
        particle[k] = o[k];
    }
    particle.random1 = o.random();
    particle.random2 = o.random();
    particles.push(particle);
  };
  var spawner = params ? new Spawner(params) : new Spawner();
  spawnerTimeIterator(spawner);
  try {
    assert.deepEqual(particles, expectedSpawns);
  }
  catch (e) {
    console.log(JSON.stringify(particles));
    console.log("");
    throw e;
  }
  return spawner;
}

dataset.forEach(function (dataset) {
  var time = dataset.time;
  var iterator = time.step ? iterateTimeByStep(time.from, time.to, time.step) : iterateTimeJump(time.from, time.to);
  var spawner = testSpawner(dataset.desc, dataset.spawner, dataset.expected, iterator);

  (dataset.heads||[]).forEach(function (headTest) {
    assert.deepEqual(
      spawner.getHeads(headTest.time),
      headTest.result
    );
  });
});
