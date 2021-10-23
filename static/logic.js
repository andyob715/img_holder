$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  

// SANKEY
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv-sankey", am4charts.SankeyDiagram);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = [
  { from: "In-Store Checkout", width: 10, offset: 15 },
  { from: "In-Store Checkout", to: "Discount Coupon Emailed", value: 20 },
  { from: "In-Store Checkout", to: "Mobile Ad Sent", value: 35 },
  { from: "In-Store Checkout", to: "Facebook Ad", value: 30 },
  { from: "In-Store Checkout", to: "Reward Email Sent", value: 10 },
  { from: "In-Store Checkout", to: "VIP Sent", value: 5},
  { from: "Web Checkout", width: 30, offset: 15 },
  { from: "Web Checkout", to: "Discount Coupon Emailed", value: 100 },
  { from: "Web Checkout", to: "Mobile Ad Sent", value: 100 },
  { from: "Web Checkout", to: "Reward Email Sent", value: 75 },
  { from: "Web Checkout", to: "VIP Sent", value: 25},
  { from: "App Checkout", width: 50, offset: 40 },
  { from: "App Checkout", to: "Discount Coupon Emailed", value: 200 },
  { from: "App Checkout", to: "Mobile Ad Sent", value: 140 },
  { from: "App Checkout", to: "Facebook Ad", value: 125 },
  { from: "App Checkout", to: "VIP Sent", value: 35},
  { from: "Discount Coupon Emailed", to: "Website Visit" , value:57},
{ from: "Discount Coupon Emailed", to: "Mobile App Visit" , value:114},
{ from: "Discount Coupon Emailed", to: "Ghosted" , value:34},
{ from: "Mobile Ad Sent", to: "Website Visit" , value:57},
{ from: "Mobile Ad Sent", to: "Mobile App Visit" , value:114},
{ from: "Mobile Ad Sent", to: "Ghosted" , value:36},
{ from: "Facebook Ad", to: "Website Visit" , value:54},
{ from: "Facebook Ad", to: "Mobile App Visit" , value:95},
{ from: "Facebook Ad", to: "Ghosted" , value:37},
{ from: "Reward Email Sent", to: "Website Visit" , value:59},
{ from: "Reward Email Sent", to: "Mobile App Visit" , value:109},
{ from: "Reward Email Sent", to: "Ghosted" , value:34},
{ from: "VIP Sent", to: "Website Visit" , value:33},
{ from: "VIP Sent", to: "Mobile App Visit" , value:43},
{ from: "VIP Sent", to: "Ghosted" , value:24},
{ from: "Website Visit", to: "Item to Cart" , value: 50},
{ from: "Mobile App Visit", to: "Item to Cart" , value: 175},
{ from: "Item to Cart", to: "Cart Purchase" , value: 60},
{ from: "Item to Cart", to: "Cart Abandon" , value: 65},
{ from: "Website Visit", to: "Ghosted" , value: 100},
{ from: "Mobile App Visit", to: "Ghosted" , value: 60},

];

let hoverState = chart.links.template.states.create("hover");
hoverState.properties.fillOpacity = 0.6;

chart.dataFields.fromName = "from";
chart.dataFields.toName = "to";
chart.dataFields.value = "value";

// for right-most label to fit
chart.paddingRight = 120;

// make nodes draggable
var nodeTemplate = chart.nodes.template;
nodeTemplate.width = 20;

nodeTemplate.propertyFields.width = "width";

nodeTemplate.adapter.add("dx", function(dx, target) {
  return target.dataItem ? target.dataItem.dataContext.offset || dx : dx;
})

var tabulate = function (data,columns) {
  var table = d3.select('#table-sankey').append('table').attr("class","table table-sm table-hover")
	var thead = table.append('thead')
	var tbody = table.append('tbody')

	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
	    .text(function (d) { return d })

	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

	var cells = rows.selectAll('td')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })

  return table;
}

d3.csv('Resources/tabledata.csv',function (data) {
	var columns = ["Flow","Intake","Target Action","Customer Response","Customer Action","Customer Terminating Action"]
  tabulate(data,columns)
})

// Update table button based on user click
function confirm() {
  var change = document.getElementById("table-button");
  if (change.innerHTML == "Hide Table")
  {
      change.innerHTML = "Show Table";
  }
  else {
      change.innerHTML = "Hide Table";
  }
}

// Update table button based on user click
function confirm_f() {
  var change2 = document.getElementById("filter-button");
  if (change2.innerHTML == "Hide Filters")
  {
      change2.innerHTML = "Show Filters";
  }
  else {
      change2.innerHTML = "Hide Filters";
  }
}


// Create chart instance
var chart = am4core.create("suedecrocs", am4charts.RadarChart);

// Add data
chart.data = [{
  "category": "MVPs",
  "value": 80,
  "full": 100
}, {
  "category": "Active Customers",
  "value": 35,
  "full": 100
}, {
  "category": "Recent Purchasers",
  "value": 92,
  "full": 100,
}, {
  "category": "App-Fanatics",
  "value": 68,
  "full": 100
}];

// Make chart not full circle
chart.startAngle = -90;
chart.endAngle = 180;
chart.innerRadius = am4core.percent(20);

// Set number format
chart.numberFormatter.numberFormat = "#.#'%'";

// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.fontWeight = 500;
categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
  return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
});
categoryAxis.renderer.minGridDistance = 10;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.max = 100;
valueAxis.strictMinMax = true;

// Create series
var series1 = chart.series.push(new am4charts.RadarColumnSeries());
series1.dataFields.valueX = "full";
series1.dataFields.categoryY = "category";
series1.clustered = false;
series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
series1.columns.template.fillOpacity = 0.08;
series1.columns.template.cornerRadiusTopLeft = 20;
series1.columns.template.strokeWidth = 0;
series1.columns.template.radarColumn.cornerRadius = 20;

var series2 = chart.series.push(new am4charts.RadarColumnSeries());
series2.dataFields.valueX = "value";
series2.dataFields.categoryY = "category";
series2.clustered = false;
series2.columns.template.strokeWidth = 0;
series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
series2.columns.template.radarColumn.cornerRadius = 20;

series2.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});

// Add cursor
chart.cursor = new am4charts.RadarCursor(); 

var chart = am4core.create("suedecrocsfunnel", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

chart.data = [
  {
    "name": "Product Purchased",
    "value": 50
},{
  "name": "Product Added to Cart",
  "value": 180
},{
  "name": "Customer Action",
  "value": 200
},{
  "name": "Activated via Connector",
  "value": 300
},{
    "name": "Total Audience Size",
    "value": 600
}];

var series = chart.series.push(new am4charts.PyramidSeries());
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;
series.valueIs = "height";


function confirm_premium(){
  var change3 = document.getElementById("premium-button");
  if (change3.innerHTML == "Hide Premium")
  {
      change3.innerHTML = "Show Premium";
  }
  else {
      change3.innerHTML = "Hide Premium";
  }
}

// Create chart instance
var chart = am4core.create("chartdiv-XY", am4charts.XYChart);

// Title
var title = chart.titles.push(new am4core.Label());
title.text = "Join/Leave by Audience";
title.fontSize = 25;
title.marginBottom = 15;

// Add data
chart.data = [{
  "category": "App Fanatics",
  "negative1": -0.1,
  "negative2": -0.9,
  "positive1": 5,
  "positive2": 94
}, {
  "category": "MVPs",
  "negative1": -2,
  "negative2": -4,
  "positive1": 19,
  "positive2": 75
}, {
  "category": "Croc Lovers",
  "negative1": -2,
  "negative2": -10,
  "positive1": 46,
  "positive2": 42
}, {
  "category": "Croc Haters",
  "negative1": -2,
  "negative2": -13,
  "positive1": 33,
  "positive2": 52
}, {
  "category": "Recent Purchasers",
  "negative1": -6,
  "negative2": -19,
  "positive1": 34,
  "positive2": 41
}];


// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.axisFills.template.disabled = false;
categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;


var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = -100;
valueAxis.max = 100;
valueAxis.renderer.minGridDistance = 50;
valueAxis.renderer.ticks.template.length = 5;
valueAxis.renderer.ticks.template.disabled = false;
valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text + "%";
})

// Legend
chart.legend = new am4charts.Legend();
chart.legend.position = "right";

// Use only absolute numbers
chart.numberFormatter.numberFormat = "#.#s";

// Create series
function createSeries(field, name, color) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "category";
  series.stacked = true;
  series.name = name;
  series.stroke = color;
  series.fill = color;
  
  var label = series.bullets.push(new am4charts.LabelBullet);
  label.label.text = "{valueX}%";
  label.label.fill = am4core.color("#fff");
  label.label.strokeWidth = 0;
  label.label.truncate = false;
  label.label.hideOversized = true;
  label.locationX = 0.5;
  return series;
}

var interfaceColors = new am4core.InterfaceColorSet();
var positiveColor = interfaceColors.getFor("positive");
var negativeColor = interfaceColors.getFor("negative");

createSeries("negative2", "Unlikely", negativeColor.lighten(0.5));
createSeries("negative1", "Never", negativeColor);
createSeries("positive1", "Sometimes", positiveColor.lighten(0.5));
createSeries("positive2", "Very often", positiveColor);

chart.legend.events.on("layoutvalidated", function(event){
  chart.legend.itemContainers.each((container)=>{
    if(container.dataItem.dataContext.name == "Never"){
      container.toBack();
    }
  })
})