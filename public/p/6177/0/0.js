var st=0

d3.xml("/p/6177/0/0.svg",  
  function(err,xml) {  
    document.getElementById('w').appendChild(xml.documentElement);  
	var svg = d3.select("svg")
	            .attr("width","100%")
	            .attr("height","100%")
    var data0 = svg.select("#data0").select("tspan")
    setInterval(()=>{
      st++
      data0.text(function(d, i) {
        return st;
      })
    },1000)

  }
);


/*
console.log(d3.select("svg"))

var circleRadii = [40,20,10];
var svgContainer = d3.select("svg")
var circles = svgContainer.selectAll("circle")
.data(circleRadii)
.enter()
.append("circle");


var w = 500;
var h = 500;
var svg = d3.select("#w")
            .append("svg")
            .attr("width", w) // 设置高宽
            .attr("height", h);

var dataset = [ 5, 10, 15, 20, 25 ];

var circles = svg.selectAll("circle")
                 .data(dataset)
                 .enter()
                 .append("circle");

circles.attr("cx", function(d, i) {
        return (i * 50) + 25;
    })
   .attr("cy", h/2)
   .attr("r", function(d) {
        return d;
   });
 */