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





