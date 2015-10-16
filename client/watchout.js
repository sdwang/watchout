// start slingin' some d3 here.

var sizes = [5, 5, 5, 10, 10, 10, 15, 15, 20, 25];

var w = 960;
var h = 500;

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("position", 'relative');

var enemies = svg.selectAll("circle")
  .data(sizes)
  .enter()
  .append("circle");

function generateLocation(d, max) {
  var loc = Math.random() * max;
  
  if (loc >=max) {
    return loc-d;
  } else if (loc <=0) {
    return loc + d;
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


  
//Width and height
// var w = 500;
// var h = 50;

// //Data
// var dataset = [ 5, 10, 15, 20, 25 ];

// //Create SVG element
// var svg = d3.select("body")
//       .append("svg")
//       .attr("width", 500)
//       .attr("height", 50);

// var circles = svg.selectAll("circle")
//     .data(dataset)
//     .enter()
//     .append("");

// circles.attr("cx", function(d, i) {
//       return (i * 50) + 25;
//     })
//      .attr("cy", h/2)
//      .attr("r", function(d) {
//       return d;
//      });