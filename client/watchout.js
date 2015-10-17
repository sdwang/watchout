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
  .attr("class", 'enemies');


var makeEnemies = function() {
  var enemySelector = svg.selectAll('.enemies').data(enemyData, function(d) {
    return d.name
  });

  enemySelector.transition().duration(1000).attr("cx", function(d) {
    return generateLocation(d.radius, w);
  }).attr("cy", function(d) {
    return generateLocation(d.radius, h);
  });

  setTimeout(makeEnemies,1000);
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

  // var dispatchCollisionEvent = function(doc) {
  //   var eventDetail = {};
  //   var myEvent = doc.defaultView.CustomEvent("collision", eventDetail);
  //   doc.dispatchEvent(myEvent);
  // }

  // dispatchCollisionEvent($('body'));

  var score = 0;
  var highScore = 0;
  var collisions = 0;
  var collisionTimer, moveTimer;
  var collided = false;

  var updateCurrentScore = function() {
    score++;
    d3.select('.current span').text(score);
    setTimeout(updateCurrentScore, 100);
  }

  updateCurrentScore();
  
  // scoreTimer = setInterval(updateCurrentScore, 5);


  // var collisionCheck = function() {
  //  //var distance =
  //   //if sum of 2 radii < distance between 2 radii; collision = true;
  //   if(they collide) {
  //     collided = true;
  //     setTimeout(function() {collided = false;}, 900);
  //   }
  //   score = 0;
  //   collisions++;
  //   d3.select('.highscore span').text(highScore);
  //   if (score > highScore) {
  //     highScore = score;
  //   }  
  //   d3.select('.collisions span').text(collisions);
  // }



  // var collisionStart = function() {
  //   if(!collided) {
  //     enemies.each(function () {
  //       var singleEnemy = d3.select(this);
  //       collisionCheck(singleEnemy.attr('cx'), singleEnemy.attr('cy'));
  //     })
  //   }
  // }

  // collisionTimer = setInterval(collisionStart, 5);
  // player.call(drag);
  // moveTimer = setInterval(move, 1000);
  // */





