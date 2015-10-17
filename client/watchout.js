// Data

var w = 960;
var h = 500;
/*
-----SVG-----
*/
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("position", 'relative');

/*
----Enemies-----
*/

var enemyData = [];
var numEnemies = 10;

for (var i =0; i < numEnemies; i++) {
  var enemyObj = {};
  enemyObj.name = 'enemy' + i;
  enemyObj.radius = Math.random() * 20 + 5;
  enemyData.push(enemyObj);
}

var enemies = svg.selectAll("circle")
  .data(enemyData, function(d) {
    return d.name;
  })
  .enter()
  .append("circle");

function generateLocation(radius, max) {
  var loc = Math.random() * max;
  
  if (loc >= (max - radius)) {
    return loc-radius;
  } else if (loc <= radius) {
    return loc + radius;
  }
  
  return loc;

};

enemies.attr("r", function(d) {
  return d.radius;
  })
  .attr("cx", function(d) {
    return generateLocation(d.radius, w)
  })
  .attr("cy", function(d) {
    return generateLocation(d.radius, h)
  })
  .attr("position", 'absolute')
  .attr("class", 'enemies')
  .attr("id", function(d) {
    return d.name;
  })


var makeEnemies = function() {
  var enemySelector = svg.selectAll('.enemies').data(enemyData, function(d) {
    return d.name
  });

  enemySelector.transition().duration(2000).attr("cx", function(d) {
    return generateLocation(d.radius, w);
  }).attr("cy", function(d) {
    return generateLocation(d.radius, h);
  });

  setTimeout(makeEnemies,2000);
};

makeEnemies();
  
/*
----Player----
*/

var playerData = [{radius: 15, name: 'player'}];

var player = svg.selectAll("circle")
  .data(playerData, function(d) { return d.name;})
  .enter()
  .append("circle");

var drag = d3.behavior.drag()
  .on("drag", function(d) {
    player.attr("cx", d3.event.x)
    .attr("cy", d3.event.y)
});

player.attr("r", function(d) {
  return d.radius;
  })
  .attr("cx", w/2)
  .attr("cy", h/2)
  .attr("position", 'absolute')
  .attr("class", 'player')
  .attr("fill","yellow")
  .attr("stroke","orange")
  .attr("stroke-width", function(d) {return d.radius / 2})
  .style("cursor", "pointer")
  .call(drag);
  //.event.on(listeningFor, action)



  /*
  -----collision-----
  */

var score = 0;
var highScore = 0;
var collisions = 0

var checkCollision = function() {
  
  var enemyInfo = {};
  d3.selectAll('.enemies')[0].forEach(function(node) {
    enemyInfo[node.id] = {};
    enemyInfo[node.id].radius = node.r.animVal.value;
    enemyInfo[node.id].cx = node.cx.animVal.value;
    enemyInfo[node.id].cy = node.cy.animVal.value;
  });

  var resetClock = function() {
    if (score > highScore) {
      highScore = score;
      d3.select('.highscore span').text(highScore);
    }

    score = 0;

    collisions++;
    d3.select('.collisions span').text(collisions);
  }

  var findDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
  };

  var playerR;
  d3.selectAll('.player').each(function(d) {playerR = d.radius;});
  var playerX;
  d3.selectAll('.player')[0].forEach(function(node) {playerX = node.cx.animVal.value;})
  var playerY;
  d3.selectAll('.player')[0].forEach(function(node) {playerY = node.cy.animVal.value;})
  
  for (var key in enemyInfo) {
    var totalRadii = enemyInfo[key].radius + playerR;
    var distance = findDistance(enemyInfo[key].cx, enemyInfo[key].cy, playerX, playerY);
    if (totalRadii > distance) {
      resetClock();
      break;
    }
  }

  setTimeout(checkCollision, 50);

}

checkCollision();


var updateCurrentScore = function() {
  score++;
  d3.select('.current span').text(score);
  setTimeout(updateCurrentScore, 100);
}

updateCurrentScore();
  




