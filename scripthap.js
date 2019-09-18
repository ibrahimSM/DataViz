

const width = document.getElementById("container").offsetWidth * 0.95,
height = 700,
legendCellSize = 20,
colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815'];

const svg = d3.select('#map').append("svg")
.attr("id", "svg")
.attr("width", width)
.attr("height", height)
.attr("class", "svg");



    
var missed_data = svg.append("g") // Group for the whole tooltip
    .attr("id", "missed")




missed_data.append('rect')
    .attr( "x","190")
    .attr("y", "50")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", 'black')
    .style("color","black")
    .text("data missed");

    missed_data.append('text')
    .attr( "x","230")
    .attr("y", "60")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", 'black')
    .style("color","black")
    .text("data missed");




// addTooltip

function addTooltip() {
var tooltip = svg.append("g") // Group for the whole tooltip
    .attr("id", "tooltip")
    .style("display", "none");

tooltip.append("polyline") // The rectangle containing the text, it is 210px width and 60 height
    .attr("points","0,0 310,0 310,73 0,73 0,0")
    .style("fill", "#222b1d")
    .style("stroke","black")
    .style("opacity","1")
    .style("stroke-width","1")
    .style("padding", "1em");



tooltip.append("line") // A line inserted between country name and score
    .attr("x1", 40)
    .attr("y1", 25)
    .attr("x2", 160)
    .attr("y2", 25)
    .style("stroke","#929292")
    .style("stroke-width","0.5")
    .attr("transform", "translate(0, 5)");

var text = tooltip.append("text") // Text that will contain all tspan (used for multilines)
    .style("font-size", "13px")
    .style("fill", "#c1d3b8")
    .attr("transform", "translate(0, 20)");

text.append("tspan") // Country name udpated by its id
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 0)
    .attr("id", "tooltip-country")
    .attr("text-anchor", "middle")
    .style("font-weight", "600")
    .style("font-size", "16px");

text.append("tspan") // Fixed text
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .style("fill", "929292")
    .text("Score : ");

text.append("tspan") // Score udpated by its id
    .attr("id", "tooltip-score")
    .style("fill","#c1d3b8")
    .style("font-weight", "bold");


text.append("tspan") // Fixed text
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .style("fill", "929292")
    .text("Family : ");



text.append("tspan") // Score udpated by its family
    .attr("id", "tooltip-family")
    .style("fill","#c1d3b8")
    .style("font-weight", "bold");








// text.append("tspan") // Fixed text
// .attr("x", 105) // ie, tooltip width / 2
// .attr("y", 50)
// .attr("text-anchor", "middle")
// .style("fill", "929292")
// .text("Heath : ");



// text.append("tspan") // Score udpated by its family
// .attr("id", "tooltip-heath")
// .style("fill","#c1d3b8")
// .style("font-weight", "bold");





// text.append("tspan") // Fixed text
// .attr("x", 105) // ie, tooltip width / 2
// .attr("y", 50)
// .attr("text-anchor", "middle")
// .style("fill", "929292")
// .text("GDP : ");



// text.append("tspan") // Score udpated by its family
// .attr("id", "tooltip-gdb")
// .style("fill","#c1d3b8")
// .style("font-weight", "bold");










return tooltip;
}


function shortCountryName(country) {
return country.replace("Démocratique", "Dem.").replace("République", "Rep.");
}

function getColorIndex(color) {
for (var i = 0; i < colors.length; i++) {
    if (colors[i] === color) {
        return i;
    }
}
return -1;
}


// Construction du titre et du sous-titre


svg.append("text")
.attr("x", (width / 2))
.attr("y", 25)
.attr("text-anchor", "middle")
.style("fill", "blue")
.style("font-weight", "300")
.style("font-size", "16px")
.text("Sentiment de Bonheur de chaque pays en 2017");


    

var q = d3.queue()
      .defer(d3.json,"data/word.json")
      .defer(d3.csv,"data/2017_code.csv")       
      .await(ready);



// d3.queue()
// .defer(d3.json,"data/word.json")       
// .await(ready) 


function addLegend()
{
    
const mine = 0 , maxe = 150;

var legend = svg.append('g')
    .attr('transform', 'translate(40, 50)');

    legend.selectAll()
    .data(d3.range(colors.length))
    .enter().append('svg:rect')
        .attr('height', legendCellSize + 'px')
        .attr('width', legendCellSize + 'px')
        .attr('x', 5)
        .attr('y', function(d) { return d * legendCellSize; })
        .style("fill", function(d) { return colors[d]; });


var legendScale = d3.scale.linear()
            .domain([2.69, 7.54])
            .range([0, colors.length * legendCellSize]);



// var axis =  d3.select(".axis")
//     .call(d3.svg.axis()
//     .scale(x)
//     .orient("left"));


            
// legendAxis = legend.append("g")
//     .attr("class", "axis")
//     .call(d3.axisLeft(legendScale));
    

var legendAxis = d3.svg.axis()
    .scale(legendScale)
    .orient('left')
    .ticks(9);

    legendLabels = svg.append('g')
    .attr('transform', 'translate(45, 50)')
    .attr('class', 'axis')
    .call(legendAxis);


legend.selectAll()
.data(d3.range(colors.length))
.enter().append('svg:rect')
    .attr('height', legendCellSize + 'px')
    .attr('width', legendCellSize + 'px')
    .attr('x', 5)
    .attr('y', function(d) { return d * legendCellSize; })
    .style("fill", function(d) { return colors[d]; })
    .on("mouseover", function(d) {
        legend.select("#cursor")
            .attr('transform', 'translate(' + (legendCellSize + 5) + ', ' + (d * legendCellSize) + ')')
            .style("display", null);
        d3.selectAll("path[scorecolor='" + colors[d] + "']")
            .style('fill', "#9966cc");
    })
    .on("mouseout", function(d) {
        legend.select("#cursor")
            .style("display", "none");
        d3.selectAll("path[scorecolor='" + colors[d] + "']")
            .style('fill', colors[d]);
    });


    

}


function ready(error,json,csv){


const geojson =json;
const scores = csv;


const projection = d3.geoNaturalEarth1()
    .scale(1)
    .translate([0, 0]);
    
const path = d3.geoPath()
    .pointRadius(2)
    .projection(projection);
    
const cGroup = svg.append("g");




var b  = path.bounds(geojson),
    s = .80 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

projection
    .scale(s)
    .translate(t);

cGroup.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("id", function(d) {return "code" + d.id; })
    .attr("class", "country");
    
    function shortCountryName(country) {
        return country.replace("United Arab Emirates", "U.Arab Emirates").replace("Congo (Kinshasa)", "RDC").replace("Congo (Brazzaville)", "RPC");
    }
        
    function getColorIndex(color) {
        for (var i = 0; i < colors.length; i++) {
            if (colors[i] === color) {
                return i;
            }
        }
        return -1;
    }
    
    
    const min = d3.min(scores, function(e) { return +e.hapiness_rank; }),
        max = d3.max(scores, function(e) { return +e.hapiness_rank; });
    var quantile = d3.scale.quantile().domain([min, max])
        .range(colors);
            
    var legend = addLegend(min, max);
    var tooltip = addTooltip();


        
    scores.forEach(function(e,i) {
        var countryPath = d3.select("#code" + e.code);
        console.log(e.hapiness_rank)

        countryPath
            .attr("scorecolor", quantile(+e.hapiness_rank))
            .style("fill", function(d) { return quantile(+e.hapiness_rank); })
            .on("mouseover", function(d) {
                countryPath.style("fill", "#9966cc");
                tooltip.style("display", null);
                tooltip.select('#tooltip-country')
                .text(e.country);

                tooltip.select('#tooltip-score')
                    .text(e.hapiness_rank);
                
                tooltip.select('#tooltip-family')
                .text(e.family);

                // tooltip.select('#tooltip-health')
                // .text(e.health);


            tooltip.select('#tooltip-gdp')
            .text(e.pip);

                    
                legend.select("#cursor")
                    .attr('transform', 'translate(' + (legendCellSize + 5) + ', ' + (getColorIndex(quantile(+e.hapiness_rank)) * legendCellSize) + ')')
                    .style("display", null);
            })
            .on("mouseout", function(d) {
                countryPath.style("fill", function(d) { return quantile(+e.hapiness_rank); });
                tooltip.style("display", "none");
                legend.select("#cursor").style("display", "none");
            })
            .on("mousemove", function(d) {
                var mouse = d3.mouse(this);
                tooltip.attr("transform", "translate(" + mouse[0] + "," + (mouse[1] - 75) + ")");
            });
    
    
    
    
    
    
        });







        
    

}




