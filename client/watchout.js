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

var sizes = [5, 5, 5, 6, 7, 8, 10, 10, 11, 12, 15, 18, 20, 24, 25];


var enemies = svg.selectAll("circle")
  .data(sizes)
  .enter()
  .append("circle");

function generateLocation(r, max) {
  var loc = Math.random() * max;
  
  if (loc >= (max - r)) {
    return loc-r;
  } else if (loc <= r) {
    return loc + r;
  }
  
  return loc;

};

enemies.attr("r", function(d) {
  return d;
  })
  .attr("cx", function(d) {
    return generateLocation(d, w)
  })
  .attr("cy", function(d) {
    return generateLocation(d, h)
  })
  .attr("position", 'absolute')
  .attr("class", 'enemies');


var makeEnemies = function() {
  var enemySelector = svg.selectAll('.enemies').data(sizes);

  enemySelector.transition().duration(1000).attr("cx", function(d) {
    return generateLocation(d, w);
  }).attr("cy", function(d) {
    return generateLocation(d, h);
  });

  setTimeout(makeEnemies,1000);
};

//makeEnemies();
  
/*
----Player----
*/

var playerData = [10];

var player = svg.selectAll("circle")
  .data(playerData)
  .enter()
  .append("circle");

player.attr("r", function(d) {
  return d;
  })
  .attr("cx", w/2)
  .attr("cy", h/2)
  .attr("position", 'absolute')
  .attr("class", 'player');







